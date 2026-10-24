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
            <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(56, 189, 248, 0.15); border-radius: 6px; color: #38bdf8;">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19 19c0 .55-.45 1-1 1s-1-.45-1-1v-4.18l-3.32-5.54C13.24 9.55 13 8.79 13 8V4h1c.55 0 1-.45 1-1s-.45-1-1-1H10c-.55 0-1 .45-1 1s.45 1 1 1h1v4c0 .79-.24 1.55-.68 2.28L7 14.82V19c0 .55-.45 1-1 1s-1-.45-1-1c0-.28.11-.53.29-.71l4.42-7.37C10.23 9.94 10.5 8.99 10.5 8V4h3v4c0 .99.27 1.94.79 2.92l4.42 7.37c.18.18.29.43.29.71z"/>
              </svg>
            </div>
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
              View Equipment Specs
            </button>
            <button class="btn btn-secondary btn-xs" id="btn-toggle-fullscreen" title="Toggle Fullscreen Mode">
              Fullscreen
            </button>
            <a href="/simulator.html" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-xs" style="text-decoration: none;">
              Open in New Window
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
