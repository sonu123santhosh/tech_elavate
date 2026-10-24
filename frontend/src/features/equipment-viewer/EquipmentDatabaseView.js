/**
 * Smart Lab Equipment Assistant — 62 Tools Database & AI Scanner View
 * Unified Component for Vite SPA
 */

export class EquipmentDatabaseView {
  /**
   * @param {HTMLElement} container
   * @param {object} callbacks { onOpenSimulator }
   */
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.equipmentList = [];
    this.categories = [];
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.selectedTool = null;
    this.isLoading = true;
    this.scannerSelectedTool = 'burette';
    this.scannerResult = null;
  }

  async mount() {
    this.container.innerHTML = `
      <div class="eq-view-container animate-fade-in">
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;"></div>
          Loading Top 62 Chemistry Lab Tools Database...
        </div>
      </div>
    `;

    await this.fetchData();
    this.render();
  }

  destroy() {
    this.closeModal();
    this.container.innerHTML = '';
  }

  async fetchData() {
    try {
      // Try backend catalog API, fallback to static equipment.json
      let res = await fetch('/api/equipment-catalog');
      if (!res.ok) {
        res = await fetch('/equipment-db/equipment.json');
      }
      const data = await res.json();
      this.equipmentList = Array.isArray(data) ? data : (data.data || []);
      
      // Extract unique categories
      const catMap = new Map();
      this.equipmentList.forEach((item) => {
        if (item.category) {
          catMap.set(item.category, (catMap.get(item.category) || 0) + 1);
        }
      });
      this.categories = Array.from(catMap.entries()).map(([name, count]) => ({ name, count }));
      this.isLoading = false;
    } catch (err) {
      console.error('Failed to load equipment catalog:', err);
      this.isLoading = false;
    }
  }

  render() {
    const filtered = this.getFilteredEquipment();

    this.container.innerHTML = `
      <div class="eq-view-container animate-fade-in">
        <!-- AI Vision Scanner Simulation Banner -->
        <section class="eq-scanner-banner" aria-label="AI Vision Equipment Scanner">
          <div class="eq-scanner-header">
            <div class="eq-scanner-title-box">
              <div class="eq-scanner-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div>
                <div class="eq-scanner-title">
                  AI Vision Scanner Integration
                  <span class="badge badge-cyan" style="font-size: 0.75rem; padding: 0.15rem 0.5rem;">AR Core v2.4</span>
                </div>
                <div class="eq-scanner-desc">Simulate camera equipment identification, bounding box classification, and confidence scoring.</div>
              </div>
            </div>

            <div class="eq-scanner-controls">
              <select id="eq-scanner-select" class="eq-scanner-select" aria-label="Select tool to scan">
                <option value="burette">Burette (Volumetric Analysis)</option>
                <option value="conical-flask">Conical Flask (Titration)</option>
                <option value="bunsen-burner">Bunsen Burner (Heating)</option>
                <option value="beaker">Beaker (General Glassware)</option>
                <option value="buchner-funnel">Büchner Funnel (Vacuum Filtration)</option>
                <option value="pipette">Volumetric Pipette (Precision)</option>
                <option value="separating-funnel">Separating Funnel (Extraction)</option>
                <option value="magnetic-stirrer">Magnetic Stirrer (Agitation)</option>
              </select>
              <button id="eq-scanner-trigger-btn" class="eq-scanner-btn">
                Scan & Identify
              </button>
            </div>
          </div>

          <div id="eq-scanner-result-box" class="eq-scanner-result" style="display: ${this.scannerResult ? 'flex' : 'none'};">
            ${this.renderScannerFeedback()}
          </div>
        </section>

        <!-- Search & Category Filters Toolbar -->
        <section class="eq-toolbar">
          <div class="eq-search-wrapper">
            <span class="eq-search-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input 
              type="text" 
              id="eq-search-input" 
              class="eq-search-input" 
              placeholder="Search by tool name, alias (e.g. Erlenmeyer, Griffin), formula, or use..." 
              value="${this.escapeHtml(this.searchQuery)}"
            />
          </div>

          <div class="eq-filter-chips">
            <button class="eq-chip-btn ${this.selectedCategory === 'all' ? 'active' : ''}" data-cat="all">
              All Tools <span style="opacity: 0.7;">(${this.equipmentList.length})</span>
            </button>
            ${this.categories
              .map(
                (cat) => `
              <button class="eq-chip-btn ${this.selectedCategory === cat.name ? 'active' : ''}" data-cat="${this.escapeHtml(cat.name)}">
                ${this.escapeHtml(cat.name)} <span style="opacity: 0.7;">(${cat.count})</span>
              </button>
            `
              )
              .join('')}
            <span class="eq-results-count">Showing ${filtered.length} of ${this.equipmentList.length} Tools</span>
          </div>
        </section>

        <!-- Equipment Cards Grid -->
        <section class="eq-grid" id="eq-grid-container">
          ${
            filtered.length > 0
              ? filtered.map((item) => this.renderCard(item)).join('')
              : `
              <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;"></div>
                <h3>No equipment matched "${this.escapeHtml(this.searchQuery)}"</h3>
                <p style="margin-top: 0.5rem;">Try adjusting your search terms or selecting "All Tools".</p>
              </div>
            `
          }
        </section>
      </div>

      <!-- Detail Modal Mount Point -->
      <div id="eq-modal-root"></div>
    `;

    this.attachEvents();
  }

  renderScannerFeedback() {
    if (!this.scannerResult) return '';
    const { tool, confidence, latency } = this.scannerResult;
    return `
      <div>
        <strong> Identified:</strong> <span style="color: #38bdf8; font-weight: 700;">${this.escapeHtml(tool.name)}</span>
        <span style="color: var(--text-muted); font-size: 0.8rem; margin-left: 0.5rem;">(PDF #${tool.pdfNumber || 'N/A'})</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span class="eq-scanner-badge-match">Match Confidence: ${confidence}%</span>
        <span style="color: var(--text-dim); font-size: 0.8rem;"> ${latency}ms inference</span>
        <button class="btn btn-primary btn-xs btn-inspect-tool" data-id="${tool.id}" style="padding: 0.25rem 0.65rem;">
          Inspect Tool
        </button>
      </div>
    `;
  }

  renderCard(item) {
    const imgSrc = this.resolveImageSrc(item);
    const hasSim = this.isUsedInSimulator(item.id);

    return `
      <article class="eq-card" data-id="${item.id}">
        <div class="eq-card-img-wrap">
          <img 
            src="${imgSrc}" 
            alt="${this.escapeHtml(item.name)}" 
            class="eq-card-img" 
            loading="lazy" 
            onerror="this.onerror=null; this.src='/assets/equipment/beaker.jpg';"
          />
          <span class="eq-card-num-badge">#${item.pdfNumber || item.number || '•'}</span>
          <span class="eq-card-category-badge">${this.escapeHtml(item.category || 'Apparatus')}</span>
        </div>

        <div class="eq-card-body">
          <h3 class="eq-card-title">${this.escapeHtml(item.name)}</h3>
          <p class="eq-card-purpose">${this.escapeHtml(item.purpose || item.pdfMainUse || item.mainUse || 'Laboratory apparatus')}</p>

          <div class="eq-card-specs-tags">
            ${item.specifications?.material ? `<span class="eq-spec-tag">${item.specifications.material[0]}</span>` : ''}
            ${item.specifications?.measurementAccuracy?.value ? `<span class="eq-spec-tag">${item.specifications.measurementAccuracy.value}</span>` : ''}
            ${hasSim ? `<span class="eq-spec-tag" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.3);"> 2D Sim</span>` : ''}
          </div>

          <div class="eq-card-actions">
            <button class="eq-btn-inspect btn-inspect-tool" data-id="${item.id}">
               Technical Specs
            </button>
            ${
              hasSim
                ? `
              <button class="eq-btn-sim btn-jump-sim" data-tool-id="${item.id}" title="Launch interactive 2D simulation with this apparatus">
                 Simulate
              </button>
            `
                : ''
            }
          </div>
        </div>
      </article>
    `;
  }

  attachEvents() {
    // Search input
    const searchInput = this.container.querySelector('#eq-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderFilteredGrid();
      });
    }

    // Category chips
    this.container.querySelectorAll('.eq-chip-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.dataset.cat;
        this.selectedCategory = cat;
        this.container.querySelectorAll('.eq-chip-btn').forEach((b) => b.classList.toggle('active', b.dataset.cat === cat));
        this.renderFilteredGrid();
      });
    });

    // Scanner trigger
    const scanBtn = this.container.querySelector('#eq-scanner-trigger-btn');
    const scanSelect = this.container.querySelector('#eq-scanner-select');
    if (scanBtn && scanSelect) {
      scanBtn.addEventListener('click', () => {
        const toolId = scanSelect.value;
        const tool = this.equipmentList.find((t) => t.id === toolId) || this.equipmentList[0];
        const confidence = (98.2 + Math.random() * 1.6).toFixed(1);
        const latency = Math.floor(18 + Math.random() * 12);
        this.scannerResult = { tool, confidence, latency };
        const resultBox = this.container.querySelector('#eq-scanner-result-box');
        if (resultBox) {
          resultBox.innerHTML = this.renderScannerFeedback();
          resultBox.style.display = 'flex';
          this.attachCardActions(resultBox);
        }
      });
    }

    this.attachCardActions(this.container);
  }

  attachCardActions(scopeEl) {
    // Inspect tool buttons
    scopeEl.querySelectorAll('.btn-inspect-tool').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const tool = this.equipmentList.find((t) => t.id === id);
        if (tool) {
          this.openModal(tool);
        }
      });
    });

    // Simulator jump buttons
    scopeEl.querySelectorAll('.btn-jump-sim').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const toolId = e.currentTarget.dataset.toolId;
        const expId = this.mapToolToExperiment(toolId);
        if (typeof this.callbacks.onOpenSimulator === 'function') {
          this.callbacks.onOpenSimulator(expId);
        } else {
          window.location.hash = `simulator?exp=${expId}`;
        }
      });
    });
  }

  renderFilteredGrid() {
    const filtered = this.getFilteredEquipment();
    const gridEl = this.container.querySelector('#eq-grid-container');
    const countEl = this.container.querySelector('.eq-results-count');

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${this.equipmentList.length} Tools`;
    }

    if (gridEl) {
      if (filtered.length > 0) {
        gridEl.innerHTML = filtered.map((item) => this.renderCard(item)).join('');
        this.attachCardActions(gridEl);
      } else {
        gridEl.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;"></div>
            <h3>No equipment matched "${this.escapeHtml(this.searchQuery)}"</h3>
            <p style="margin-top: 0.5rem;">Try adjusting your search terms or selecting "All Tools".</p>
          </div>
        `;
      }
    }
  }

  openModal(tool) {
    this.selectedTool = tool;
    const modalRoot = this.container.querySelector('#eq-modal-root');
    if (!modalRoot) return;

    const imgSrc = this.resolveImageSrc(tool);
    const hasSim = this.isUsedInSimulator(tool.id);
    const simExpId = this.mapToolToExperiment(tool.id);

    modalRoot.innerHTML = `
      <div class="eq-modal-backdrop" id="modal-backdrop">
        <div class="eq-modal" role="dialog" aria-modal="true">
          <!-- Modal Header -->
          <div class="eq-modal-header">
            <div class="eq-modal-header-text">
              <span class="badge badge-cyan">#${tool.pdfNumber || tool.number || '•'}</span>
              <h2 class="eq-modal-title">${this.escapeHtml(tool.name)}</h2>
              <span class="badge badge-teal">${this.escapeHtml(tool.category || 'Apparatus')}</span>
            </div>
            <button class="eq-modal-close-btn" id="btn-modal-close" aria-label="Close dialog"></button>
          </div>

          <!-- Modal Body -->
          <div class="eq-modal-body">
            <!-- Hero Grid -->
            <div class="eq-modal-hero-grid">
              <div class="eq-modal-img-box">
                <img src="${imgSrc}" alt="${this.escapeHtml(tool.name)}" onerror="this.src='/assets/equipment/beaker.jpg';" />
              </div>
              <div class="eq-modal-hero-info">
                <h4 style="color: #38bdf8; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">Core Laboratory Function</h4>
                <p class="eq-modal-desc">${this.escapeHtml(tool.purpose || tool.description || tool.mainUse || 'Standard chemistry apparatus')}</p>
                
                ${
                  tool.alternativeNames && tool.alternativeNames.length > 0
                    ? `
                  <div>
                    <strong style="font-size: 0.82rem; color: var(--text-muted);">Alternative Names:</strong>
                    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.25rem;">
                      ${tool.alternativeNames.map((alt) => `<span class="badge badge-cyan" style="font-size: 0.75rem;">${this.escapeHtml(alt)}</span>`).join('')}
                    </div>
                  </div>
                `
                    : ''
                }

                ${
                  tool.commonUses && tool.commonUses.length > 0
                    ? `
                  <div style="margin-top: 0.5rem;">
                    <strong style="font-size: 0.82rem; color: var(--text-muted);">Typical Applications:</strong>
                    <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-main); margin-top: 0.25rem; display: flex; flex-direction: column; gap: 0.2rem;">
                      ${tool.commonUses.slice(0, 3).map((use) => `<li>${this.escapeHtml(use)}</li>`).join('')}
                    </ul>
                  </div>
                `
                    : ''
                }
              </div>
            </div>

            <!-- Technical Specifications -->
            <div>
              <div class="eq-modal-section-title"> Technical Specifications & Limits</div>
              <table class="eq-modal-specs-table">
                <tbody>
                  ${
                    tool.specifications?.material
                      ? `<tr><th>Material Construction</th><td>${tool.specifications.material.join(', ')}</td></tr>`
                      : ''
                  }
                  ${
                    tool.specifications?.dimensions
                      ? `<tr><th>Dimensions / Size</th><td>${tool.specifications.dimensions}</td></tr>`
                      : ''
                  }
                  ${
                    tool.specifications?.capacity?.value
                      ? `<tr><th>Nominal Capacity</th><td>${tool.specifications.capacity.value} ${tool.specifications.capacity.unit || ''}</td></tr>`
                      : ''
                  }
                  ${
                    tool.specifications?.measurementAccuracy?.value
                      ? `<tr><th>Measurement Accuracy</th><td>${tool.specifications.measurementAccuracy.value} ${tool.specifications.measurementAccuracy.notes ? `(${tool.specifications.measurementAccuracy.notes})` : ''}</td></tr>`
                      : ''
                  }
                  ${
                    tool.temperatureLimits?.maxOperationalTemp
                      ? `<tr><th>Thermal Tolerance</th><td>Max ${tool.temperatureLimits.maxOperationalTemp}</td></tr>`
                      : ''
                  }
                </tbody>
              </table>
            </div>

            <!-- Safety Precautions -->
            ${
              tool.safetyPrecautions
                ? `
              <div class="eq-modal-alert danger">
                <strong style="color: #fda4af;"> Critical Safety Precautions & PPE:</strong>
                <div>${tool.safetyPrecautions.warnings ? tool.safetyPrecautions.warnings.join(' • ') : 'Always wear protective safety goggles and lab coat when operating.'}</div>
                ${
                  tool.safetyPrecautions.requiredPPE
                    ? `<div style="margin-top: 0.25rem; font-size: 0.8rem; opacity: 0.9;">Required PPE: ${tool.safetyPrecautions.requiredPPE.join(', ')}</div>`
                    : ''
                }
              </div>
            `
                : ''
            }

            <!-- Maintenance & Common Errors -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
              <div class="eq-modal-alert info">
                <strong> Maintenance & Cleaning:</strong>
                <p style="font-size: 0.82rem; margin-top: 0.25rem; line-height: 1.4;">
                  ${tool.maintenanceAndTroubleshooting?.cleaningSteps ? tool.maintenanceAndTroubleshooting.cleaningSteps[0] : 'Rinse with distilled water immediately following use. Invert on drying pegboard.'}
                </p>
              </div>

              <div class="eq-modal-alert warning">
                <strong> Common Errors to Avoid:</strong>
                <p style="font-size: 0.82rem; margin-top: 0.25rem; line-height: 1.4;">
                  ${tool.maintenanceAndTroubleshooting?.commonMistakes ? tool.maintenanceAndTroubleshooting.commonMistakes[0].mistake + ' — ' + tool.maintenanceAndTroubleshooting.commonMistakes[0].howToAvoid : 'Never subject glassware to rapid temperature differentials or direct heating without wire gauze.'}
                </p>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="eq-modal-footer">
            <span style="font-size: 0.8rem; color: var(--text-dim);">Ground Truth Reference • Verified ISO/Lab Standard</span>
            <div style="display: flex; gap: 0.75rem;">
              ${
                hasSim
                  ? `
                <button class="btn btn-primary btn-sm btn-modal-launch-sim" data-tool-id="${tool.id}">
                   Launch in 2D Simulator
                </button>
              `
                  : ''
              }
              <button class="btn btn-outline btn-sm" id="btn-modal-close-footer">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Modal close events
    const closeBtn = modalRoot.querySelector('#btn-modal-close');
    const closeFooter = modalRoot.querySelector('#btn-modal-close-footer');
    const backdrop = modalRoot.querySelector('#modal-backdrop');

    const handleClose = () => this.closeModal();
    if (closeBtn) closeBtn.addEventListener('click', handleClose);
    if (closeFooter) closeFooter.addEventListener('click', handleClose);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) handleClose();
      });
    }

    const launchSimBtn = modalRoot.querySelector('.btn-modal-launch-sim');
    if (launchSimBtn) {
      launchSimBtn.addEventListener('click', () => {
        this.closeModal();
        if (typeof this.callbacks.onOpenSimulator === 'function') {
          this.callbacks.onOpenSimulator(simExpId);
        } else {
          window.location.hash = `simulator?exp=${simExpId}`;
        }
      });
    }
  }

  closeModal() {
    const modalRoot = this.container.querySelector('#eq-modal-root');
    if (modalRoot) modalRoot.innerHTML = '';
    this.selectedTool = null;
  }

  getFilteredEquipment() {
    return this.equipmentList.filter((item) => {
      // Category match
      if (this.selectedCategory !== 'all') {
        if ((item.category || '').toLowerCase() !== this.selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Search match
      if (this.searchQuery && this.searchQuery.trim()) {
        const q = this.searchQuery.trim().toLowerCase();
        const name = (item.name || '').toLowerCase();
        const id = (item.id || '').toLowerCase();
        const purpose = (item.purpose || item.pdfMainUse || item.mainUse || '').toLowerCase();
        const alt = (item.alternativeNames || []).join(' ').toLowerCase();
        if (!name.includes(q) && !id.includes(q) && !purpose.includes(q) && !alt.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }

  resolveImageSrc(item) {
    if (item.image?.src) {
      return item.image.src.startsWith('/') ? item.image.src : `/${item.image.src}`;
    }
    return `/assets/equipment/${item.id}.jpg`;
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
      'ph-indicator-solution',
      'condenser',
      'round-bottom-flask',
      'distillation-apparatus',
      'measuring-cylinder',
      'volumetric-flask',
      'evaporating-dish',
      'wash-bottle',
      'spatula',
      'magnetic-stirrer',
      'conductivity-meter',
      'laboratory-ph-meter',
    ];
    return simTools.includes(toolId);
  }

  mapToolToExperiment(toolId) {
    if (toolId.includes('burette') || toolId.includes('conical-flask') || toolId.includes('pipette')) {
      return 'acid-base-titration';
    }
    if (toolId.includes('condenser') || toolId.includes('distillation') || toolId.includes('round-bottom')) {
      return 'simple-distillation';
    }
    if (toolId.includes('buchner') || toolId.includes('filter')) {
      return 'filtration';
    }
    if (toolId.includes('chromatography')) {
      return 'paper-chromatography';
    }
    if (toolId.includes('volumetric-flask')) {
      return 'standard-solution-preparation';
    }
    if (toolId.includes('ph-meter') || toolId.includes('indicator')) {
      return 'ph-metric-titration';
    }
    return 'acid-base-titration';
  }

  getCategoryIcon(catName) {
    const icons = {
      Glassware: '',
      'Heating & Thermal': '',
      'Measurement & Volumetric': '',
      'Separation & Filtration': '',
      'Safety & PPE': '',
      'General Handling': '',
    };
    return icons[catName] || '';
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
