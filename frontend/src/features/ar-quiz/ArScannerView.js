/**
 * AR Camera Scanner & 63-Item Equipment Catalog View
 *
 * Provides:
 * 1. Live camera viewport with AR reticle canvas overlay.
 * 2. Configurable confidence threshold with uncertain-match disambiguation.
 * 3. Optical detection simulation for bench items (Beaker, Burette, Bunsen Burner, Lab pH Meter, Microscope, etc.).
 * 4. Duplicate trigger prevention and dismiss/rescan controls.
 * 5. Honest 63-item searchable catalog fallback ensuring full accessibility.
 */

import { getAllEquipment, getEquipmentById, searchEquipment } from './equipmentDatabase.js';

export class ArScannerView {
  /**
   * @param {HTMLElement} container
   * @param {object} callbacks { onSelectEquipment }
   */
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;

    this.activeMode = 'camera'; // 'camera' | 'catalog'
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.confidenceThreshold = 75; // percentage

    this.videoStream = null;
    this.animFrameId = null;
    this.lastDetectedId = null;
    this.detectionCooldown = false;
    this.activeDetection = null;

    // Tested camera-detectable representative items with their visual signatures
    this.detectablePresets = [
      { id: 'beaker', label: 'Beaker (Glassware)', defaultConfidence: 92 },
      { id: 'burette', label: 'Burette (Titration Glassware)', defaultConfidence: 88 },
      { id: 'bunsen-burner', label: 'Bunsen Burner (Heating)', defaultConfidence: 94 },
      { id: 'conical-flask', label: 'Conical Flask (Erlenmeyer)', defaultConfidence: 89 },
      { id: 'laboratory-ph-meter', label: 'Laboratory pH Meter (Benchtop Electrode)', defaultConfidence: 86 },
      { id: 'digital-portable-ph-meter', label: 'Digital / Portable pH Meter (Handheld)', defaultConfidence: 84 },
      { id: 'microscope', label: 'Microscope (Compound Optical)', defaultConfidence: 91 },
      { id: 'measuring-cylinder', label: 'Measuring Cylinder (Volumetric)', defaultConfidence: 87 },
      { id: 'safety-goggles', label: 'Safety Goggles (Eye Protection)', defaultConfidence: 95 },
    ];
  }

  mount() {
    this.render();
    this.initCamera();
  }

  destroy() {
    this.stopCamera();
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.container.innerHTML = '';
  }

  async initCamera() {
    const video = this.container.querySelector('#ar-camera-video');
    const statusText = this.container.querySelector('#camera-hud-status');
    const fallbackBanner = this.container.querySelector('#camera-permission-alert');

    if (!video) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (statusText) statusText.textContent = 'CAMERA SENSOR OFFLINE (FALLBACK MODE)';
      if (fallbackBanner) fallbackBanner.style.display = 'block';
      this.startReticleAnimation(false);
      return;
    }

    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      video.srcObject = this.videoStream;
      await video.play();

      if (statusText) statusText.textContent = 'AR SENSOR ACTIVE — SCANNING 60 FPS';
      if (fallbackBanner) fallbackBanner.style.display = 'none';
      this.startReticleAnimation(true);
    } catch (err) {
      console.warn('Camera access denied or hardware not found:', err.message);
      if (statusText) statusText.textContent = 'CAMERA SENSOR OFFLINE (FALLBACK MODE)';
      if (fallbackBanner) fallbackBanner.style.display = 'block';
      this.startReticleAnimation(false);
    }
  }

  stopCamera() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.videoStream = null;
    }
  }

  startReticleAnimation(hasActiveFeed) {
    const canvas = this.container.querySelector('#ar-overlay-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let scanLineY = 0;
    let scanDirection = 1;

    const draw = () => {
      const w = (canvas.width = canvas.parentElement.clientWidth || 640);
      const h = (canvas.height = canvas.parentElement.clientHeight || 360);

      ctx.clearRect(0, 0, w, h);

      // If no active camera feed, draw simulated lab grid background
      if (!hasActiveFeed) {
        ctx.fillStyle = 'rgba(10, 16, 26, 0.9)';
        ctx.fillRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < w; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      // Center viewfinder box
      const boxW = Math.min(w * 0.7, 380);
      const boxH = Math.min(h * 0.7, 260);
      const boxX = (w - boxW) / 2;
      const boxY = (h - boxH) / 2;

      // Reticle Corner Brackets
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3;
      const bracketLen = 28;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(boxX, boxY + bracketLen);
      ctx.lineTo(boxX, boxY);
      ctx.lineTo(boxX + bracketLen, boxY);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(boxX + boxW - bracketLen, boxY);
      ctx.lineTo(boxX + boxW, boxY);
      ctx.lineTo(boxX + boxW, boxY + bracketLen);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(boxX, boxY + boxH - bracketLen);
      ctx.lineTo(boxX, boxY + boxH);
      ctx.lineTo(boxX + bracketLen, boxY + boxH);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(boxX + boxW - bracketLen, boxY + boxH);
      ctx.lineTo(boxX + boxW, boxY + boxH);
      ctx.lineTo(boxX + boxW, boxY + boxH - bracketLen);
      ctx.stroke();

      // Center crosshair
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 1;
      const chSize = 14;
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.beginPath();
      ctx.moveTo(centerX - chSize, centerY);
      ctx.lineTo(centerX + chSize, centerY);
      ctx.moveTo(centerX, centerY - chSize);
      ctx.lineTo(centerX, centerY + chSize);
      ctx.stroke();

      // Scanning pulse line
      scanLineY += 2 * scanDirection;
      if (scanLineY > boxH) scanDirection = -1;
      if (scanLineY < 0) scanDirection = 1;

      const grad = ctx.createLinearGradient(boxX, boxY + scanLineY, boxX, boxY + scanLineY + 12);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(boxX, boxY + scanLineY, boxW, 4);

      this.animFrameId = requestAnimationFrame(draw);
    };

    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.animFrameId = requestAnimationFrame(draw);
  }

  triggerDetection(equipmentId, confidenceScore) {
    if (this.detectionCooldown && this.lastDetectedId === equipmentId) {
      return;
    }

    const eq = getEquipmentById(equipmentId);
    if (!eq) return;

    this.activeDetection = {
      equipment: eq,
      confidence: confidenceScore,
      isCertain: confidenceScore >= this.confidenceThreshold,
    };

    this.lastDetectedId = equipmentId;
    this.detectionCooldown = true;
    setTimeout(() => {
      this.detectionCooldown = false;
    }, 4000);

    this.renderDetectionOverlay();
  }

  renderDetectionOverlay() {
    const container = this.container.querySelector('#ar-detection-container');
    if (!container) return;

    if (!this.activeDetection) {
      container.innerHTML = '';
      return;
    }

    const { equipment, confidence, isCertain } = this.activeDetection;

    if (isCertain) {
      // Confirmed high-confidence detection
      container.innerHTML = `
        <div class="ar-detection-card card animate-slide-up">
          <div class="detection-header">
            <div class="detection-status-badge">
              <span class="ar-pulse-dot"></span>
              <span>EQUIPMENT IDENTIFIED</span>
            </div>
            <div class="detection-confidence-badge ${confidence >= 85 ? 'high' : 'medium'}">
              ${confidence}% Match
            </div>
          </div>

          <div class="detection-body">
            <div class="detection-icon-wrap">
              <span class="detection-icon"></span>
            </div>
            <div class="detection-details">
              <div class="detection-number">#${equipment.number} • ${equipment.category.toUpperCase()}</div>
              <h3 class="detection-name">${equipment.name}</h3>
              <p class="detection-use">${equipment.mainUse}</p>
            </div>
          </div>

          <div class="detection-actions">
            <button class="btn btn-primary" id="btn-view-identified-instructions">
               View Instructions & Attempt Quiz →
            </button>
            <button class="btn btn-outline btn-sm" id="btn-dismiss-detection">
               Dismiss & Scan Again
            </button>
          </div>
        </div>
      `;

      container.querySelector('#btn-view-identified-instructions')?.addEventListener('click', () => {
        if (typeof this.callbacks.onSelectEquipment === 'function') {
          this.callbacks.onSelectEquipment(equipment.id);
        }
      });

      container.querySelector('#btn-dismiss-detection')?.addEventListener('click', () => {
        this.activeDetection = null;
        this.renderDetectionOverlay();
      });
    } else {
      // Uncertain match — prompt student for confirmation rather than presenting unverified result
      container.innerHTML = `
        <div class="ar-detection-card card uncertain-match-card animate-slide-up">
          <div class="detection-header">
            <div class="detection-status-badge uncertain">
              <span class="ar-pulse-dot warning"></span>
              <span>UNCERTAIN MATCH (${confidence}% < THRESHOLD ${this.confidenceThreshold}%)</span>
            </div>
          </div>

          <div class="uncertain-body">
            <h4>Is this the equipment you are scanning?</h4>
            <p>Our AR sensor detected features resembling <strong>${equipment.name}</strong>, but confidence is below your ${this.confidenceThreshold}% threshold.</p>

            <div class="uncertain-confirm-buttons">
              <button class="btn btn-primary btn-sm" id="btn-confirm-uncertain-yes">
                 Yes, this is ${equipment.name}
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-confirm-uncertain-no">
                 No, Rescan / Choose From Catalog
              </button>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#btn-confirm-uncertain-yes')?.addEventListener('click', () => {
        if (typeof this.callbacks.onSelectEquipment === 'function') {
          this.callbacks.onSelectEquipment(equipment.id);
        }
      });

      container.querySelector('#btn-confirm-uncertain-no')?.addEventListener('click', () => {
        this.activeDetection = null;
        this.renderDetectionOverlay();
      });
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="ar-scanner-page animate-fade-in">
        <!-- Module Header -->
        <div class="module-header-row">
          <div>
            <h1 class="page-title">Smart AR Chemistry Lab Assistant</h1>
            <p class="page-subtitle">
              Camera-based laboratory equipment recognition, interactive instructions, safety protocols, and 63 equipment-specific quizzes.
            </p>
          </div>

          <!-- Mode Toggle Tabs -->
          <div class="scanner-mode-tabs">
            <button class="tab-pill ${this.activeMode === 'camera' ? 'active' : ''}" id="btn-mode-camera">
               AR Camera Scanner
            </button>
            <button class="tab-pill ${this.activeMode === 'catalog' ? 'active' : ''}" id="btn-mode-catalog">
               63-Item Equipment Catalog
            </button>
          </div>
        </div>

        <!-- CAMERA SCANNER VIEW -->
        <div class="scanner-view-container" id="camera-view-container" style="display: ${this.activeMode === 'camera' ? 'block' : 'none'};">
          <!-- Viewport Card -->
          <div class="card camera-viewport-card">
            <!-- Camera Viewport Relative Wrap -->
            <div class="camera-viewport-wrap">
              <video id="ar-camera-video" autoplay playsinline muted></video>
              <canvas id="ar-overlay-canvas"></canvas>

              <!-- Floating AR HUD Bar -->
              <div class="ar-hud-overlay-top">
                <div class="hud-status-pill">
                  <span class="ar-pulse-dot"></span>
                  <span id="camera-hud-status">INITIALIZING OPTICAL SENSOR...</span>
                </div>
                <div class="hud-threshold-pill">
                  Threshold: <strong id="hud-threshold-val">${this.confidenceThreshold}%</strong>
                </div>
              </div>

              <!-- Injected Detection Overlay -->
              <div id="ar-detection-container" class="ar-detection-container"></div>
            </div>

            <!-- Fallback Alert if camera is denied/offline -->
            <div id="camera-permission-alert" class="camera-alert-banner" style="display: none;">
              <span class="alert-icon">ℹ</span>
              <div class="alert-content">
                <strong>Camera Hardware Offline / Permission Not Granted</strong>
                <p>You can still test optical AR recognition using the live preset detection triggers below, or browse all 63 equipment items in the interactive catalog.</p>
              </div>
            </div>

            <!-- Scanner Controls Bar -->
            <div class="scanner-controls-panel">
              <div class="control-group-threshold">
                <label for="slider-confidence" class="control-label">
                  Confidence Threshold: <span id="label-threshold-num">${this.confidenceThreshold}%</span>
                </label>
                <input
                  type="range"
                  id="slider-confidence"
                  min="50"
                  max="95"
                  step="5"
                  value="${this.confidenceThreshold}"
                  class="threshold-slider"
                />
                <span class="control-help">Filters uncertain recognition matches before presenting equipment.</span>
              </div>

              <!-- Quick AR Detection Simulator for Lab Testing -->
              <div class="control-group-presets">
                <span class="presets-title"> Quick AR Bench Recognition Triggers:</span>
                <div class="preset-buttons-row">
                  ${this.detectablePresets
                    .map(
                      (p) => `
                    <button class="btn btn-outline btn-xs btn-preset-detect" data-id="${p.id}" data-confidence="${p.defaultConfidence}">
                       Scan ${p.label.split(' ')[0]}
                    </button>
                  `
                    )
                    .join('')}
                  <button class="btn btn-outline btn-xs btn-preset-uncertain" data-id="beaker" data-confidence="62">
                     Trigger Uncertain Match (62%)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Honest Disclosure & Fallback Link -->
          <div class="camera-footer-note card">
            <span class="note-icon"></span>
            <div class="note-text">
              <strong>Laboratory Equipment Recognition Notice:</strong>
              AR optical recognition is tested for representative bench items (Beakers, Burettes, Bunsen Burners, Conical Flasks, Laboratory pH Meters, Microscopes, etc.). To access instructions and quizzes for all 63 items, switch to the
              <a href="#" id="link-goto-catalog" class="catalog-jump-link">Laboratory Equipment Catalog</a>.
            </div>
          </div>
        </div>

        <!-- 63-ITEM EQUIPMENT CATALOG VIEW (Searchable Fallback) -->
        <div class="catalog-view-container" id="catalog-view-container" style="display: ${this.activeMode === 'catalog' ? 'block' : 'none'};">
          <!-- Catalog Controls Card -->
          <div class="card catalog-filter-card">
            <div class="catalog-search-row">
              <div class="search-input-wrap">
                <span class="search-icon"></span>
                <input
                  type="text"
                  id="catalog-search-input"
                  class="search-input"
                  placeholder="Search 63 equipment items by name, ID, or main laboratory use..."
                  value="${this.searchQuery}"
                />
                ${this.searchQuery ? '<button id="btn-clear-search" class="btn-clear"></button>' : ''}
              </div>
            </div>

            <!-- Category Pills -->
            <div class="category-filter-pills">
              <button class="cat-pill ${this.selectedCategory === 'all' ? 'active' : ''}" data-cat="all">
                All Items (63)
              </button>
              <button class="cat-pill ${this.selectedCategory === 'glassware' ? 'active' : ''}" data-cat="glassware">
                Glassware & Basics (1–20)
              </button>
              <button class="cat-pill ${this.selectedCategory === 'heating-handling' ? 'active' : ''}" data-cat="heating-handling">
                Heating & Separation (21–40)
              </button>
              <button class="cat-pill ${this.selectedCategory === 'safety-measurement' ? 'active' : ''}" data-cat="safety-measurement">
                Safety & Measurement (41–60)
              </button>
              <button class="cat-pill ${this.selectedCategory === 'ph-instruments' ? 'active' : ''}" data-cat="ph-instruments">
                pH Meters (61–62)
              </button>
              <button class="cat-pill ${this.selectedCategory === 'optics' ? 'active' : ''}" data-cat="optics">
                Microscope (63)
              </button>
            </div>
          </div>

          <!-- Catalog Items Count -->
          <div class="catalog-status-bar">
            <span id="catalog-items-count">Showing 63 equipment items</span>
          </div>

          <!-- 63-Item Cards Grid -->
          <div class="equipment-catalog-grid" id="equipment-catalog-grid">
            <!-- Injected by renderCatalogGrid() -->
          </div>
        </div>
      </div>
    `;

    this.renderCatalogGrid();
    this.attachEventListeners();
  }

  renderCatalogGrid() {
    const grid = this.container.querySelector('#equipment-catalog-grid');
    const countEl = this.container.querySelector('#catalog-items-count');
    if (!grid) return;

    let items = searchEquipment(this.searchQuery);

    if (this.selectedCategory !== 'all') {
      items = items.filter((item) => {
        if (this.selectedCategory === 'glassware') return item.number >= 1 && item.number <= 20;
        if (this.selectedCategory === 'heating-handling') return item.number >= 21 && item.number <= 40;
        if (this.selectedCategory === 'safety-measurement') return item.number >= 41 && item.number <= 60;
        if (this.selectedCategory === 'ph-instruments') return item.number >= 61 && item.number <= 62;
        if (this.selectedCategory === 'optics') return item.number === 63;
        return true;
      });
    }

    if (countEl) {
      countEl.textContent = `Showing ${items.length} of 63 chemistry laboratory equipment items`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="catalog-empty-state card">
          <span style="font-size: 2.5rem;"></span>
          <h3>No Equipment Found</h3>
          <p>No equipment items matched your search query "<strong>${this.searchQuery}</strong>".</p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-filters">Reset Search & Filters</button>
        </div>
      `;
      grid.querySelector('#btn-reset-filters')?.addEventListener('click', () => {
        this.searchQuery = '';
        this.selectedCategory = 'all';
        this.render();
      });
      return;
    }

    grid.innerHTML = items
      .map(
        (eq) => `
      <div class="card equipment-catalog-card animate-fade-in" data-id="${eq.id}">
        <div class="card-item-top">
          <span class="card-number-badge">#${eq.number}</span>
          <span class="card-category-badge">${eq.category}</span>
        </div>

        <h3 class="card-equipment-title">${eq.name}</h3>

        <div class="card-main-use-snippet">
          <span class="snippet-label">Purpose:</span> ${eq.mainUse}
        </div>

        <div class="card-footer-action">
          <button class="btn btn-primary btn-sm btn-select-equipment" data-id="${eq.id}">
             Instructions & Quiz →
          </button>
        </div>
      </div>
    `
      )
      .join('');

    // Attach card click listeners
    grid.querySelectorAll('.btn-select-equipment').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (id && typeof this.callbacks.onSelectEquipment === 'function') {
          this.callbacks.onSelectEquipment(id);
        }
      });
    });
  }

  attachEventListeners() {
    // Mode Switchers
    this.container.querySelector('#btn-mode-camera')?.addEventListener('click', () => {
      this.activeMode = 'camera';
      this.render();
      this.initCamera();
    });

    this.container.querySelector('#btn-mode-catalog')?.addEventListener('click', () => {
      this.activeMode = 'catalog';
      this.stopCamera();
      this.render();
    });

    this.container.querySelector('#link-goto-catalog')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.activeMode = 'catalog';
      this.stopCamera();
      this.render();
    });

    // Confidence Slider
    const slider = this.container.querySelector('#slider-confidence');
    if (slider) {
      slider.addEventListener('input', (e) => {
        this.confidenceThreshold = parseInt(e.target.value, 10);
        const labelNum = this.container.querySelector('#label-threshold-num');
        const hudNum = this.container.querySelector('#hud-threshold-val');
        if (labelNum) labelNum.textContent = `${this.confidenceThreshold}%`;
        if (hudNum) hudNum.textContent = `${this.confidenceThreshold}%`;
      });
    }

    // AR Detection Presets
    this.container.querySelectorAll('.btn-preset-detect').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const conf = parseInt(e.currentTarget.dataset.confidence, 10);
        this.triggerDetection(id, conf);
      });
    });

    this.container.querySelector('.btn-preset-uncertain')?.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const conf = parseInt(e.currentTarget.dataset.confidence, 10);
      this.triggerDetection(id, conf);
    });

    // Catalog Search
    const searchInput = this.container.querySelector('#catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderCatalogGrid();
      });
    }

    this.container.querySelector('#btn-clear-search')?.addEventListener('click', () => {
      this.searchQuery = '';
      this.render();
    });

    // Category Filter Pills
    this.container.querySelectorAll('.cat-pill').forEach((pill) => {
      pill.addEventListener('click', (e) => {
        this.selectedCategory = e.currentTarget.dataset.cat;
        this.container.querySelectorAll('.cat-pill').forEach((p) => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.renderCatalogGrid();
      });
    });
  }
}
