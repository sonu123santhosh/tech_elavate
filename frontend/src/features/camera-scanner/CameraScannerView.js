/**
 * AI Camera & Document Equipment Scanner View
 * Integrates Google Teachable Machine AI Model (https://teachablemachine.withgoogle.com/models/BlF4tNf8j/)
 * Maps detected apparatus directly to the 62 Equipment Ground Truth Database and 2D Simulator
 */

const MODEL_BASE_URL = 'https://teachablemachine.withgoogle.com/models/BlF4tNf8j/';

const TM_TO_EQUIPMENT_MAP = {
  burette: 'burette',
  pipette: 'pipette',
  conical_flask: 'conical-flask',
  phmeter: 'laboratory-ph-meter',
  Beaker: 'beaker',
  Test_Tube: 'test-tube',
  watch_glass: 'watch-glass',
  test_tube_rack: 'test-tube-rack',
  spatula: 'spatula',
  Bunsen_Burner: 'bunsen-burner',
  Thermometer: 'thermometer',
  'Magnetic Stirrer': 'magnetic-stirrer',
  Spectrophotometer: 'spectrophotometer',
  'Wash bottles': 'wash-bottle',
  'Reagent bottles': 'reagent-bottle',
  ' tongs': 'crucible-tongs',
  'Spot plate': 'watch-glass',
  'mortar and pestle': 'mortar-and-pestle',
  microscope: 'microscope',
  'safety equipments': 'safety-goggles',
  tripod: 'tripod-stand',
  'wire gauze': 'wire-gauze',
  'Screw Gauge': 'measuring-cylinder',
};

export class CameraScannerView {
  /**
   * @param {HTMLElement} container
   * @param {object} callbacks { onOpenSimulator, onOpenEquipmentDetail, onOpenQuiz }
   */
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;

    this.activeMode = 'camera'; // 'camera' | 'upload'
    this.model = null;
    this.modelStatus = 'INITIALIZING'; // 'INITIALIZING' | 'READY' | 'ERROR'
    this.equipmentCatalog = [];

    // Camera state
    this.mediaStream = null;
    this.isCameraRunning = false;
    this.facingMode = 'environment';
    this.isContinuous = false;
    this.animationFrameId = null;

    // Detection output
    this.currentPredictions = [];
    this.matchedEquipment = null;
    this.uploadedImageSrc = null;
  }

  async mount() {
    this.render();
    await Promise.all([this.loadEquipmentData(), this.initTeachableMachine()]);
  }

  destroy() {
    this.stopCamera();
    this.container.innerHTML = '';
  }

  async loadEquipmentData() {
    try {
      let res = await fetch('/api/equipment-catalog');
      if (!res.ok) res = await fetch('/equipment-db/equipment.json');
      const data = await res.json();
      this.equipmentCatalog = Array.isArray(data) ? data : (data.data || []);
    } catch (err) {
      console.warn('Could not load equipment catalog for scanner:', err);
    }
  }

  async initTeachableMachine() {
    this.modelStatus = 'INITIALIZING';
    this.updateStatusBadge();

    try {
      // Ensure tfjs and tmImage are loaded on the window
      await this.ensureScriptsLoaded();

      const modelURL = MODEL_BASE_URL + 'model.json';
      const metadataURL = MODEL_BASE_URL + 'metadata.json';

      this.model = await window.tmImage.load(modelURL, metadataURL);
      this.modelStatus = 'READY';
      this.updateStatusBadge();

      // If in camera mode and user already mounted, show ready
      this.showToast('AI Model Loaded Successfully! Model: BlF4tNf8j', 'success');
    } catch (err) {
      console.error('Failed to load Teachable Machine model:', err);
      this.modelStatus = 'ERROR';
      this.updateStatusBadge();
      this.showToast('Error loading AI model. Check network connection.', 'error');
    }
  }

  async ensureScriptsLoaded() {
    if (window.tmImage && window.tf) return;

    if (!window.tf) {
      await this.loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js');
    }
    if (!window.tmImage) {
      await this.loadScript('https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js');
    }
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  render() {
    this.container.innerHTML = `
      <div class="scanner-page-container animate-fade-in">
        <!-- Hero Header -->
        <section class="scanner-hero">
          <div class="scanner-hero-info">
            <div class="scanner-hero-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <div>
              <h1 class="scanner-hero-title">AI Equipment Scanner</h1>
              <p class="scanner-hero-desc">
                Identify laboratory equipment in real time via live camera or uploaded photos using custom Google Teachable Machine AI.
              </p>
            </div>
          </div>

          <div class="scanner-model-pill">
            <div class="scanner-model-status">
              <span class="scanner-status-dot ${this.getStatusClass()}" id="scanner-status-dot"></span>
              <span id="scanner-status-text">${this.getStatusText()}</span>
            </div>
            <span style="font-size: 0.72rem; color: var(--text-dim); font-family: var(--font-mono);">
              Model ID: BlF4tNf8j (23 Classes)
            </span>
          </div>
        </section>

        <!-- Mode Switcher -->
        <div class="scanner-mode-tabs">
          <button class="scanner-mode-btn ${this.activeMode === 'camera' ? 'active' : ''}" data-mode="camera" id="btn-mode-camera">
            Live Camera Scan
          </button>
          <button class="scanner-mode-btn ${this.activeMode === 'upload' ? 'active' : ''}" data-mode="upload" id="btn-mode-upload">
            Browse & Upload Image
          </button>
        </div>

        <!-- Main Workspace -->
        <div class="scanner-workspace-grid">
          <!-- Left: Viewport Panel -->
          <div class="scanner-viewport-panel" id="scanner-viewport-panel">
            ${this.renderViewportContent()}
          </div>

          <!-- Right: Detection Results Panel -->
          <div class="scanner-results-panel" id="scanner-results-panel">
            ${this.renderResultsContent()}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderViewportContent() {
    if (this.activeMode === 'camera') {
      return `
        <div class="scanner-view-frame" id="camera-frame">
          <video id="scanner-video" class="scanner-video" autoplay playsinline muted style="display: ${this.isCameraRunning ? 'block' : 'none'};"></video>
          
          <!-- AR Reticle Overlay -->
          <div class="scanner-ar-reticle" id="scanner-reticle" style="display: ${this.isCameraRunning ? 'block' : 'none'};">
            <div class="scanner-reticle-corner reticle-tl"></div>
            <div class="scanner-reticle-corner reticle-tr"></div>
            <div class="scanner-reticle-corner reticle-bl"></div>
            <div class="scanner-reticle-corner reticle-br"></div>
            <div class="scanner-scan-laser"></div>
          </div>

          <div class="scanner-placeholder" id="camera-placeholder" style="display: ${this.isCameraRunning ? 'none' : 'flex'};">
            <div class="scanner-placeholder-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <h3 style="color: var(--text-main);">Camera Ready</h3>
            <p style="font-size: 0.85rem; max-width: 320px;">
              Click "Start Camera" to activate your device's webcam or mobile camera for real-time equipment detection.
            </p>
            <button class="btn btn-primary btn-sm" id="btn-start-camera" style="margin-top: 0.5rem;">
              Start Camera
            </button>
          </div>
        </div>

        <!-- Camera Toolbar -->
        <div class="scanner-action-bar">
          <div class="scanner-btn-group">
            ${
              this.isCameraRunning
                ? `
              <button class="btn btn-danger btn-sm" id="btn-stop-camera">Stop Camera</button>
              <button class="btn btn-primary btn-sm" id="btn-capture-detect">Snap & Detect</button>
              <button class="btn btn-outline btn-sm" id="btn-flip-camera" title="Switch front/back camera">Flip Camera</button>
            `
                : ''
            }
          </div>

          ${
            this.isCameraRunning
              ? `
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--text-muted); cursor: pointer;">
              <input type="checkbox" id="chk-continuous" ${this.isContinuous ? 'checked' : ''} />
              Continuous Real-Time Detection
            </label>
          `
              : ''
          }
        </div>
      `;
    } else {
      // Document / Browse mode
      return `
        <div class="scanner-view-frame" id="upload-frame">
          ${
            this.uploadedImageSrc
              ? `
            <img src="${this.uploadedImageSrc}" alt="Uploaded apparatus" class="scanner-preview-img" id="uploaded-preview-img" />
            <div class="scanner-ar-reticle">
              <div class="scanner-reticle-corner reticle-tl"></div>
              <div class="scanner-reticle-corner reticle-tr"></div>
              <div class="scanner-reticle-corner reticle-bl"></div>
              <div class="scanner-reticle-corner reticle-br"></div>
              <div class="scanner-scan-laser"></div>
            </div>
          `
              : `
            <div class="scanner-dropzone" id="scanner-dropzone">
              <input type="file" id="file-input-apparatus" accept="image/*" />
              <div class="scanner-placeholder-icon">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 style="color: var(--text-main); margin-top: 0.5rem;">Upload or Drag Equipment Image</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
                Select a photo from your documents or gallery (JPG, PNG, WEBP)
              </p>
              <span class="btn btn-outline btn-sm" style="margin-top: 1rem; pointer-events: none;">
                Browse Files
              </span>
            </div>
          `
          }
        </div>

        <div class="scanner-action-bar">
          ${
            this.uploadedImageSrc
              ? `
            <button class="btn btn-outline btn-sm" id="btn-upload-another">
              Choose Another Image
            </button>
            <button class="btn btn-primary btn-sm" id="btn-re-detect">
              Re-Detect Image
            </button>
          `
              : ''
          }
        </div>

        <!-- Quick Sample Testing Thumbnails -->
        <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">
            Quick Sample Tests (Click to test AI model instantly):
          </span>
          <div class="scanner-sample-tests">
            <button class="scanner-sample-pill" data-src="/assets/equipment/beaker.jpg" data-name="Beaker">Beaker</button>
            <button class="scanner-sample-pill" data-src="/assets/equipment/burette.jpg" data-name="Burette">Burette</button>
            <button class="scanner-sample-pill" data-src="/assets/equipment/conical-flask.jpg" data-name="Conical Flask">Conical Flask</button>
            <button class="scanner-sample-pill" data-src="/assets/equipment/bunsen-burner.jpg" data-name="Bunsen Burner">Bunsen Burner</button>
            <button class="scanner-sample-pill" data-src="/assets/equipment/pipette.jpg" data-name="Pipette">Pipette</button>
            <button class="scanner-sample-pill" data-src="/assets/equipment/microscope.jpg" data-name="Microscope">Microscope</button>
            <button class="scanner-sample-pill" data-src="/assets/equipment/thermometer.jpg" data-name="Thermometer">Thermometer</button>
            <button class="scanner-sample-pill" data-src="/assets/equipment/magnetic-stirrer.jpg" data-name="Magnetic Stirrer">Magnetic Stirrer</button>
          </div>
        </div>
      `;
    }
  }

  renderResultsContent() {
    if (!this.currentPredictions || this.currentPredictions.length === 0) {
      return `
        <div class="scanner-match-card" style="text-align: center; padding: 3rem 1.5rem; color: var(--text-muted);">
          <div style="font-size: 2.75rem; margin-bottom: 0.5rem; opacity: 0.6;">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto;">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3 style="color: var(--text-main);">Awaiting Equipment Scan</h3>
          <p style="font-size: 0.88rem; margin-top: 0.4rem; line-height: 1.4;">
            Point your camera at a laboratory apparatus or choose a photo. The AI will classify the equipment and pull full specifications from the 62-tool database.
          </p>
        </div>
      `;
    }

    const top = this.currentPredictions[0];
    const topPercent = (top.probability * 100).toFixed(1);
    const eq = this.matchedEquipment;

    return `
      <div class="scanner-match-card animate-fade-in">
        <!-- Match Header -->
        <div class="scanner-match-header">
          <div class="scanner-match-name">
            ${this.formatLabel(top.className)}
          </div>
          <span class="scanner-match-confidence-badge">
            ${topPercent}% Match
          </span>
        </div>

        <!-- Matched Equipment Details from Database -->
        ${
          eq
            ? `
          <div class="scanner-equipment-detail">
            <div class="scanner-eq-hero-row">
              <img 
                src="${this.resolveEquipmentImage(eq)}" 
                alt="${eq.name}" 
                class="scanner-eq-img" 
                onerror="this.src='/assets/equipment/beaker.jpg';"
              />
              <div class="scanner-eq-summary">
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span class="badge badge-cyan" style="font-size: 0.72rem;">PDF #${eq.pdfNumber || eq.number || '•'}</span>
                  <span class="badge badge-teal" style="font-size: 0.72rem;">${eq.category || 'Apparatus'}</span>
                </div>
                <div style="font-weight: 700; color: var(--text-main); font-size: 1.05rem; margin-top: 0.2rem;">${eq.name}</div>
                <p class="scanner-eq-purpose">${eq.purpose || eq.pdfMainUse || eq.mainUse || 'Laboratory apparatus'}</p>
              </div>
            </div>

            <!-- Key Specs & Safety Snippets -->
            ${
              eq.specifications?.material
                ? `
              <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; gap: 0.4rem; flex-wrap: wrap;">
                <span class="badge badge-cyan">Material: ${eq.specifications.material[0]}</span>
                ${eq.specifications?.measurementAccuracy?.value ? `<span class="badge badge-cyan">Accuracy: ${eq.specifications.measurementAccuracy.value}</span>` : ''}
              </div>
            `
                : ''
            }

            ${
              eq.safetyPrecautions?.warnings
                ? `
              <div style="background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; color: #fda4af;">
                 <strong>Safety Warning:</strong> ${eq.safetyPrecautions.warnings[0]}
              </div>
            `
                : ''
            }

            <!-- CTA Actions -->
            <div class="scanner-cta-group" style="margin-top: 0.4rem;">
              <button class="btn btn-outline btn-xs btn-open-eq-modal" data-id="${eq.id}">
                 Full Specifications
              </button>
              ${
                this.isUsedInSimulator(eq.id)
                  ? `
                <button class="btn btn-primary btn-xs btn-jump-sim-from-scan" data-id="${eq.id}">
                   Open in 2D Simulator
                </button>
              `
                  : ''
              }
              <button class="btn btn-secondary btn-xs btn-jump-quiz-from-scan" data-id="${eq.id}">
                 Equipment Quiz
              </button>
            </div>
          </div>
        `
            : `
          <div style="padding: 0.75rem; background: rgba(8, 14, 26, 0.6); border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-muted);">
            Detected class: <strong>${this.formatLabel(top.className)}</strong>. Ground truth lookup matches related apparatus.
          </div>
        `
        }

        <!-- Top Probability Distribution -->
        <div class="scanner-probs-list">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">
             Top AI Class Probabilities
          </div>
          ${this.currentPredictions
            .slice(0, 5)
            .map((pred, i) => {
              const pct = (pred.probability * 100).toFixed(1);
              return `
              <div class="scanner-prob-item">
                <div class="scanner-prob-label-row">
                  <span style="${i === 0 ? 'font-weight: 700; color: #38bdf8;' : ''}">${this.formatLabel(pred.className)}</span>
                  <span>${pct}%</span>
                </div>
                <div class="scanner-prob-bar-bg">
                  <div class="scanner-prob-bar-fill ${i === 0 ? 'top-rank' : ''}" style="width: ${pct}%;"></div>
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Mode switch
    this.container.querySelector('#btn-mode-camera')?.addEventListener('click', () => {
      this.switchMode('camera');
    });

    this.container.querySelector('#btn-mode-upload')?.addEventListener('click', () => {
      this.switchMode('upload');
    });

    // Camera actions
    this.container.querySelector('#btn-start-camera')?.addEventListener('click', () => {
      this.startCamera();
    });

    this.container.querySelector('#btn-stop-camera')?.addEventListener('click', () => {
      this.stopCamera();
    });

    this.container.querySelector('#btn-capture-detect')?.addEventListener('click', () => {
      this.captureAndPredict();
    });

    this.container.querySelector('#btn-flip-camera')?.addEventListener('click', () => {
      this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
      this.startCamera();
    });

    const chkContinuous = this.container.querySelector('#chk-continuous');
    if (chkContinuous) {
      chkContinuous.addEventListener('change', (e) => {
        this.isContinuous = e.target.checked;
        if (this.isContinuous) {
          this.runContinuousLoop();
        } else if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
      });
    }

    // Document / Browse actions
    const fileInput = this.container.querySelector('#file-input-apparatus');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          this.handleFileUpload(file);
        }
      });
    }

    const dropzone = this.container.querySelector('#scanner-dropzone');
    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          this.handleFileUpload(e.dataTransfer.files[0]);
        }
      });
    }

    this.container.querySelector('#btn-upload-another')?.addEventListener('click', () => {
      this.uploadedImageSrc = null;
      this.currentPredictions = [];
      this.matchedEquipment = null;
      this.refreshViewport();
      this.refreshResults();
    });

    this.container.querySelector('#btn-re-detect')?.addEventListener('click', () => {
      const img = this.container.querySelector('#uploaded-preview-img');
      if (img) this.predictFromImageElement(img);
    });

    // Sample test pills
    this.container.querySelectorAll('.scanner-sample-pill').forEach((pill) => {
      pill.addEventListener('click', (e) => {
        const src = e.currentTarget.dataset.src;
        this.loadSampleImage(src);
      });
    });

    this.attachResultActions();
  }

  attachResultActions() {
    // Jump to Simulator
    this.container.querySelectorAll('.btn-jump-sim-from-scan').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const eqId = e.currentTarget.dataset.id;
        const simExpId = this.mapEquipmentToSimulator(eqId);
        if (typeof this.callbacks.onOpenSimulator === 'function') {
          this.callbacks.onOpenSimulator(simExpId);
        } else {
          window.location.hash = `simulator?exp=${simExpId}`;
        }
      });
    });

    // Open Full Specs Modal
    this.container.querySelectorAll('.btn-open-eq-modal').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const eqId = e.currentTarget.dataset.id;
        window.location.hash = `equipment`;
      });
    });

    // Open Quiz
    this.container.querySelectorAll('.btn-jump-quiz-from-scan').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        window.location.hash = 'ar-quiz';
      });
    });
  }

  switchMode(mode) {
    if (this.activeMode === mode) return;
    if (this.activeMode === 'camera') {
      this.stopCamera();
    }
    this.activeMode = mode;
    this.currentPredictions = [];
    this.matchedEquipment = null;

    // Update active tab buttons
    this.container.querySelector('#btn-mode-camera')?.classList.toggle('active', mode === 'camera');
    this.container.querySelector('#btn-mode-upload')?.classList.toggle('active', mode === 'upload');

    this.refreshViewport();
    this.refreshResults();
  }

  async startCamera() {
    this.stopCamera();

    try {
      const constraints = {
        video: {
          facingMode: this.facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      };

      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.isCameraRunning = true;
      this.refreshViewport();

      const video = this.container.querySelector('#scanner-video');
      if (video) {
        video.srcObject = this.mediaStream;
        await video.play();

        if (this.isContinuous) {
          this.runContinuousLoop();
        }
      }
    } catch (err) {
      console.error('Failed to start camera:', err);
      this.isCameraRunning = false;
      this.showToast('Camera access denied or unavailable. You can use Browse Image mode instead.', 'error');
      this.refreshViewport();
    }
  }

  stopCamera() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }

    this.isCameraRunning = false;
  }

  async captureAndPredict() {
    const video = this.container.querySelector('#scanner-video');
    if (!video || !this.model) return;

    try {
      const predictions = await this.model.predict(video);
      this.handlePredictionOutput(predictions);
    } catch (err) {
      console.error('Error during prediction:', err);
    }
  }

  runContinuousLoop() {
    if (!this.isCameraRunning || !this.isContinuous) return;

    const loop = async () => {
      const video = this.container.querySelector('#scanner-video');
      if (video && video.readyState >= 2 && this.model) {
        try {
          const predictions = await this.model.predict(video);
          this.handlePredictionOutput(predictions);
        } catch {}
      }
      if (this.isCameraRunning && this.isContinuous) {
        this.animationFrameId = requestAnimationFrame(loop);
      }
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  handleFileUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
      this.showToast('Please upload a valid image file (PNG, JPG, WEBP).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedImageSrc = e.target.result;
      this.refreshViewport();

      const img = this.container.querySelector('#uploaded-preview-img');
      if (img) {
        img.onload = () => this.predictFromImageElement(img);
      }
    };
    reader.readAsDataURL(file);
  }

  loadSampleImage(src) {
    this.uploadedImageSrc = src;
    this.refreshViewport();

    const img = this.container.querySelector('#uploaded-preview-img');
    if (img) {
      img.onload = () => this.predictFromImageElement(img);
    }
  }

  async predictFromImageElement(imgElement) {
    if (!this.model) {
      this.showToast('AI Model is still initializing. Please wait a moment...', 'warning');
      return;
    }

    try {
      const predictions = await this.model.predict(imgElement);
      this.handlePredictionOutput(predictions);
    } catch (err) {
      console.error('Failed to classify image:', err);
      this.showToast('Failed to classify image with model.', 'error');
    }
  }

  handlePredictionOutput(predictions) {
    // Sort descending by probability
    predictions.sort((a, b) => b.probability - a.probability);
    this.currentPredictions = predictions;

    const top = predictions[0];
    if (top && top.probability >= 0.15) {
      const mappedId = TM_TO_EQUIPMENT_MAP[top.className] || TM_TO_EQUIPMENT_MAP[top.className.trim()];
      this.matchedEquipment = this.equipmentCatalog.find((eq) => eq.id === mappedId) || null;
    } else {
      this.matchedEquipment = null;
    }

    this.refreshResults();
  }

  refreshViewport() {
    const panel = this.container.querySelector('#scanner-viewport-panel');
    if (panel) {
      panel.innerHTML = this.renderViewportContent();
      this.attachEvents();
    }
  }

  refreshResults() {
    const panel = this.container.querySelector('#scanner-results-panel');
    if (panel) {
      panel.innerHTML = this.renderResultsContent();
      this.attachResultActions();
    }
  }

  updateStatusBadge() {
    const dot = this.container.querySelector('#scanner-status-dot');
    const text = this.container.querySelector('#scanner-status-text');
    if (dot && text) {
      dot.className = `scanner-status-dot ${this.getStatusClass()}`;
      text.textContent = this.getStatusText();
    }
  }

  getStatusClass() {
    if (this.modelStatus === 'READY') return 'ready';
    if (this.modelStatus === 'INITIALIZING') return 'loading';
    return 'error';
  }

  getStatusText() {
    if (this.modelStatus === 'READY') return 'AI Model Active (Teachable Machine)';
    if (this.modelStatus === 'INITIALIZING') return 'Loading Teachable Machine AI...';
    return 'AI Model Offline';
  }

  formatLabel(className) {
    if (!className) return 'Unknown Apparatus';
    return className
      .trim()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  resolveEquipmentImage(eq) {
    if (eq.image?.src) {
      return eq.image.src.startsWith('/') ? eq.image.src : `/${eq.image.src}`;
    }
    return `/assets/equipment/${eq.id}.jpg`;
  }

  isUsedInSimulator(toolId) {
    const simTools = [
      'burette',
      'pipette',
      'conical-flask',
      'beaker',
      'bunsen-burner',
      'retort-stand',
      'clamp-and-boss-head',
      'dropper',
      'glass-funnel',
      'buchner-funnel',
      'filter-paper',
      'glass-stirring-rod',
      'thermometer',
      'magnetic-stirrer',
      'spectrophotometer',
      'wash-bottle',
      'reagent-bottle',
    ];
    return simTools.includes(toolId);
  }

  mapEquipmentToSimulator(toolId) {
    if (toolId.includes('burette') || toolId.includes('conical-flask') || toolId.includes('pipette')) {
      return 'acid-base-titration';
    }
    if (toolId.includes('distillation') || toolId.includes('condenser')) {
      return 'simple-distillation';
    }
    if (toolId.includes('filtration') || toolId.includes('buchner') || toolId.includes('filter')) {
      return 'filtration';
    }
    return 'acid-base-titration';
  }

  showToast(message, type = 'info') {
    const existing = document.getElementById('scanner-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'scanner-toast';
    const bg = type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#38bdf8';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: ${bg};
      color: #090d16;
      font-weight: 700;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      z-index: 9999;
      font-size: 0.88rem;
      animation: fadeIn 0.2s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}
