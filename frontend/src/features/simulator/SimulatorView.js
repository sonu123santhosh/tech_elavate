/**
 * Virtual Chemistry Lab — 2D Interactive Simulator View
 * Embeds and coordinates the 8 playable simulation experiments inside the Vite SPA
 */

export class SimulatorView {
  /**
   * @param {HTMLElement} container
   * @param {string|null} initialExperimentId
   * @param {object} callbacks { onNavigateTab }
   */
  constructor(container, initialExperimentId = null, callbacks = {}) {
    this.container = container;
    this.currentExperiment = initialExperimentId || 'acid-base-titration';
    this.callbacks = callbacks;
    this.iframeEl = null;

    this.experiments = [
      { id: 'acid-base-titration', name: 'Acid–Base Titration (Volumetric)', group: 'Volumetric Analysis' },
      { id: 'standard-solution-preparation', name: 'Preparation of a Standard Solution', group: 'Solution Preparation' },
      { id: 'simple-distillation', name: 'Simple Distillation Apparatus', group: 'Separation & Purification' },
      { id: 'recrystallization', name: 'Crystallization & Recrystallization', group: 'Separation & Purification' },
      { id: 'filtration', name: 'Filtration (Gravity & Buchner)', group: 'Separation & Purification' },
      { id: 'paper-chromatography', name: 'Paper Chromatography (Rf Analysis)', group: 'Separation & Purification' },
      { id: 'ph-determination', name: 'pH Determination (Indicators & Meter)', group: 'Instrumental Analysis' },
      { id: 'ph-metric-titration', name: 'pH-Metric Titration (Potentiometric)', group: 'Instrumental Analysis' },
    ];
  }

  mount() {
    this.render();
  }

  destroy() {
    this.container.innerHTML = '';
  }

  setExperiment(expId) {
    if (!expId) return;
    this.currentExperiment = expId;
    const select = this.container.querySelector('#sim-exp-select');
    if (select) {
      select.value = expId;
    }
    this.updateIframeSource();
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-embed-container animate-fade-in">
        <!-- Top Toolbar -->
        <header class="sim-embed-topbar">
          <div class="sim-exp-select-wrap">
            <span style="font-size: 1.35rem;">⚗️</span>
            <div>
              <label for="sim-exp-select">Active 2D Simulation:</label>
              <select id="sim-exp-select" class="sim-exp-select" aria-label="Select 2D simulation experiment">
                <optgroup label="Volumetric Analysis">
                  <option value="acid-base-titration" ${this.currentExperiment === 'acid-base-titration' ? 'selected' : ''}>Acid–Base Titration</option>
                </optgroup>
                <optgroup label="Solution Preparation">
                  <option value="standard-solution-preparation" ${this.currentExperiment === 'standard-solution-preparation' ? 'selected' : ''}>Preparation of a Standard Solution</option>
                </optgroup>
                <optgroup label="Separation & Purification">
                  <option value="simple-distillation" ${this.currentExperiment === 'simple-distillation' ? 'selected' : ''}>Simple Distillation</option>
                  <option value="recrystallization" ${this.currentExperiment === 'recrystallization' ? 'selected' : ''}>Crystallization and Recrystallization</option>
                  <option value="filtration" ${this.currentExperiment === 'filtration' ? 'selected' : ''}>Filtration (Gravity & Buchner)</option>
                  <option value="paper-chromatography" ${this.currentExperiment === 'paper-chromatography' ? 'selected' : ''}>Paper Chromatography</option>
                </optgroup>
                <optgroup label="Instrumental Analysis">
                  <option value="ph-determination" ${this.currentExperiment === 'ph-determination' ? 'selected' : ''}>pH Determination</option>
                  <option value="ph-metric-titration" ${this.currentExperiment === 'ph-metric-titration' ? 'selected' : ''}>pH-Metric Titration</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div class="sim-actions-group">
            <button class="btn btn-outline btn-xs" id="btn-jump-equipment-catalog" title="Look up apparatus in 62-tool catalog">
              🔍 View Equipment Specs
            </button>
            <button class="btn btn-secondary btn-xs" id="btn-toggle-fullscreen" title="Toggle Fullscreen Mode">
              ⛶ Fullscreen
            </button>
            <a href="/simulator.html" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-xs" style="text-decoration: none;">
              ↗ Open in New Window
            </a>
          </div>
        </header>

        <!-- Simulation Workspace Frame -->
        <div class="sim-frame-wrap" id="sim-frame-wrapper">
          <iframe 
            id="sim-active-iframe" 
            class="sim-iframe" 
            src="/simulator.html" 
            title="2D Chemistry Lab Simulator"
            allow="fullscreen; camera; microphone"
          ></iframe>
        </div>
      </div>
    `;

    this.iframeEl = this.container.querySelector('#sim-active-iframe');
    this.attachEvents();
  }

  attachEvents() {
    const select = this.container.querySelector('#sim-exp-select');
    if (select) {
      select.addEventListener('change', (e) => {
        this.currentExperiment = e.target.value;
        this.updateIframeSource();
      });
    }

    const fsBtn = this.container.querySelector('#btn-toggle-fullscreen');
    const frameWrap = this.container.querySelector('#sim-frame-wrapper');
    if (fsBtn && frameWrap) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          frameWrap.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      });
    }

    const eqBtn = this.container.querySelector('#btn-jump-equipment-catalog');
    if (eqBtn) {
      eqBtn.addEventListener('click', () => {
        window.location.hash = 'equipment';
      });
    }

    // Set initial experiment inside iframe once loaded
    if (this.iframeEl) {
      this.iframeEl.addEventListener('load', () => {
        this.sendExperimentToIframe(this.currentExperiment);
      });
    }
  }

  updateIframeSource() {
    if (!this.iframeEl) return;
    this.sendExperimentToIframe(this.currentExperiment);
  }

  sendExperimentToIframe(expId) {
    try {
      if (this.iframeEl && this.iframeEl.contentWindow) {
        const selectInside = this.iframeEl.contentDocument?.getElementById('experiment-select');
        if (selectInside) {
          selectInside.value = expId;
          selectInside.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    } catch {
      // In case of cross-origin or delayed frame load
    }
  }
}
