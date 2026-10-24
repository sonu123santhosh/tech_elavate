import { CONDUCTOMETRIC_EXPERIMENT_METADATA } from './conductometricData.js';
import { calculateConductometricEquivalence } from './conductometricCalculations.js';
import { ConductometricChartRenderer } from './conductometricChartRenderer.js';

export class ConductometricView {
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.currentStep = 0;
    this.readings = [];
    this.unit = 'µS/cm';
    this.chartRenderer = null;
    this.isSampleLoaded = false;
  }

  mount() {
    this.container.innerHTML = this.renderTemplate();
    this.initChart();
    this.attachEventListeners();
    this.updateCalculation();
  }

  destroy() {
    this.container.innerHTML = '';
  }

  saveProgress() {
    try {
      const totalSteps = CONDUCTOMETRIC_EXPERIMENT_METADATA.steps.length; // 6
      const completedSteps = Math.min(totalSteps, Math.max(this.currentStep + 1, this.readings.length > 0 ? 3 : 1));
      const isFinished = this.currentStep >= totalSteps - 1 && this.readings.length >= 4;
      const payload = {
        completedSteps,
        totalSteps,
        isFinished,
        stepIndices: Array.from({ length: completedSteps }, (_, i) => i),
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem('vlab_progress_conductometric-titration', JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not save conductometric progress', e);
    }
  }

  renderTemplate() {
    const meta = CONDUCTOMETRIC_EXPERIMENT_METADATA;

    return `
      <div class="experiment-container animate-fade-in">
        <!-- Top Sticky Navigation Bar -->
        <div class="vlab-detail-top-nav">
          <button class="btn btn-outline btn-sm" id="btn-back-to-vlab">
            ← Back to All Experiments
          </button>
          <div class="detail-nav-middle">
            <span class="vlab-num-pill">EXPERIMENT #09</span>
            <span class="vlab-category-badge cat-instrumental">Interactive Conductometry Simulator</span>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-view-manual">
            📖 View Lab Manual & Quiz →
          </button>
        </div>

        <!-- Breadcrumb & Top Bar -->
        <div class="exp-header">
          <div class="exp-badge">Experiment 09 • Instrumental Chemistry</div>
          <h1 class="exp-title">${meta.title} (Conductometric Simulator)</h1>
          <p class="exp-subtitle">${meta.objective}</p>
        </div>

        <!-- Supervisor Warning Banner -->
        <div class="supervisor-banner">
          <div class="banner-icon">⚠️</div>
          <div class="banner-content">
            <strong>LABORATORY SUPERVISOR CHECKPOINT</strong>
            <p>${meta.supervisorReminder}</p>
          </div>
        </div>

        <!-- Theory & Equipment Card -->
        <div class="card card-accordion">
          <div class="card-header" id="cond-theory-toggle">
            <div class="card-title-group">
              <span class="card-icon">⚡</span>
              <h2 class="card-title">Conductometric Theory, Reagents & Instrumentation</h2>
            </div>
            <button class="btn-icon" id="cond-toggle-theory-btn" aria-label="Toggle Conductometric Theory">▼</button>
          </div>
          <div class="card-body" id="cond-theory-content">
            <div class="theory-text">
              <p>${meta.theory}</p>
            </div>

            <div class="instruments-grid">
              <div class="equipment-col">
                <h3 class="col-title">🧪 Reagents & Electrolytes</h3>
                <ul class="item-list">
                  ${meta.chemicals
                    .map(
                      (c) => `
                    <li class="item-card">
                      <div class="item-name">${c.name}</div>
                      <div class="item-purpose">${c.purpose}</div>
                      <div class="item-hazard"><span class="badge-hazard">Hazard:</span> ${c.hazards}</div>
                    </li>
                  `
                    )
                    .join('')}
                </ul>
              </div>

              <div class="equipment-col">
                <h3 class="col-title">🔬 Instruments & Electrodes</h3>
                <ul class="item-list">
                  ${meta.instruments
                    .map(
                      (inst) => `
                    <li class="item-card">
                      <div class="item-name">${inst.name}</div>
                      <div class="item-purpose">${inst.purpose}</div>
                    </li>
                  `
                    )
                    .join('')}
                </ul>
              </div>
            </div>

            <!-- Safety Precautions List -->
            <div class="safety-box">
              <h3 class="safety-title">🛡️ Safety Precautions</h3>
              <ul class="safety-list">
                ${meta.safetyPrecautions.map((p) => `<li>${p}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <!-- Step-by-Step Procedure Wizard -->
        <div class="card procedure-card">
          <div class="procedure-header">
            <div class="step-indicator">
              Step <span id="cond-step-num">1</span> of ${meta.steps.length}
            </div>
            <div class="procedure-nav">
              <button class="btn btn-secondary btn-sm" id="cond-prev-step-btn" disabled>← Previous Step</button>
              <button class="btn btn-secondary btn-sm" id="cond-next-step-btn">Next Step →</button>
            </div>
          </div>
          <div class="step-content">
            <h3 class="step-title" id="cond-step-title">${meta.steps[0].title}</h3>
            <p class="step-desc" id="cond-step-desc">${meta.steps[0].description}</p>
          </div>
          <div class="step-progress-bar">
            <div class="progress-fill" id="cond-step-progress" style="width: ${100 / meta.steps.length}%"></div>
          </div>
        </div>

        <!-- Main Workspace: Data Table & Interactive Graph -->
        <div class="experiment-workspace">
          <!-- Left Column: Data Table -->
          <div class="workspace-col data-col">
            <div class="card h-full">
              <div class="table-toolbar">
                <div>
                  <h2 class="card-title">Conductance Readings</h2>
                  <p class="card-desc">Volume of 0.1 M NaOH added (mL) vs Conductance</p>
                </div>
                <div class="btn-group">
                  <select id="cond-unit-select" class="select-input" title="Conductance Unit">
                    <option value="µS/cm" selected>µS/cm</option>
                    <option value="mS/cm">mS/cm</option>
                  </select>
                  <button class="btn btn-primary btn-sm" id="cond-add-row-btn">+ Add Reading</button>
                  <button class="btn btn-outline btn-sm" id="cond-load-demo-btn">Load Demo Data</button>
                  <button class="btn btn-ghost btn-sm text-danger" id="cond-clear-btn" title="Clear table">Clear</button>
                </div>
              </div>

              <div id="cond-demo-notice" class="demo-badge hidden">
                ⚡ <strong>DEMONSTRATION SAMPLE DATA ACTIVE</strong>: These readings are for illustrative educational purposes only and are NOT real laboratory measurements.
              </div>

              <div class="table-responsive">
                <table class="data-table" id="cond-readings-table">
                  <thead>
                    <tr>
                      <th style="width: 45px;">#</th>
                      <th>NaOH Vol (mL)</th>
                      <th>Conductance (<span class="unit-display">${this.unit}</span>)</th>
                      <th style="width: 60px;">Action</th>
                    </tr>
                  </thead>
                  <tbody id="cond-table-body">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive Graph & Analysis -->
          <div class="workspace-col chart-col">
            <div class="card h-full">
              <div class="chart-toolbar">
                <div>
                  <h2 class="card-title">Conductometric Titration Curve</h2>
                  <p class="card-desc">Fitted regression branches & intersection point estimation</p>
                </div>
              </div>

              <div class="canvas-wrapper">
                <canvas id="cond-chart-canvas" width="600" height="340"></canvas>
              </div>

              <!-- Real-time Equivalence Results & Trendlines -->
              <div id="cond-results-container" class="results-panel">
                <!-- Populated dynamically -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initChart() {
    const canvas = this.container.querySelector('#cond-chart-canvas');
    if (canvas) {
      this.chartRenderer = new ConductometricChartRenderer(canvas);
      window.addEventListener('resize', () => this.chartRenderer.render());
    }
  }

  attachEventListeners() {
    const root = this.container;

    // Top Navigation to Dashboard & Manual
    const backBtn = root.querySelector('#btn-back-to-vlab');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (typeof this.callbacks.onBackToDashboard === 'function') {
          this.callbacks.onBackToDashboard();
        } else {
          window.location.hash = 'experiments';
        }
      });
    }

    const manualBtn = root.querySelector('#btn-view-manual');
    if (manualBtn) {
      manualBtn.addEventListener('click', () => {
        if (typeof this.callbacks.onViewManual === 'function') {
          this.callbacks.onViewManual();
        }
      });
    }

    // Wizard Navigation
    const prevBtn = root.querySelector('#cond-prev-step-btn');
    const nextBtn = root.querySelector('#cond-next-step-btn');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => this.goToStep(this.currentStep - 1));
      nextBtn.addEventListener('click', () => this.goToStep(this.currentStep + 1));
    }

    // Theory Toggle
    const theoryToggle = root.querySelector('#cond-theory-toggle');
    const theoryContent = root.querySelector('#cond-theory-content');
    const toggleBtn = root.querySelector('#cond-toggle-theory-btn');
    if (theoryToggle && theoryContent) {
      theoryToggle.addEventListener('click', () => {
        const isCollapsed = theoryContent.classList.toggle('collapsed');
        if (toggleBtn) toggleBtn.textContent = isCollapsed ? '▶' : '▼';
      });
    }

    // Unit Selector
    const unitSelect = root.querySelector('#cond-unit-select');
    if (unitSelect) {
      unitSelect.addEventListener('change', (e) => {
        this.unit = e.target.value;
        const displays = root.querySelectorAll('.unit-display');
        displays.forEach((d) => (d.textContent = this.unit));
        this.updateCalculation();
      });
    }

    // Add Row
    const addBtn = root.querySelector('#cond-add-row-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.addRow());
    }

    // Load Demo Data
    const demoBtn = root.querySelector('#cond-load-demo-btn');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => this.loadDemoData());
    }

    // Clear Table
    const clearBtn = root.querySelector('#cond-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearReadings());
    }
  }

  goToStep(index) {
    const steps = CONDUCTOMETRIC_EXPERIMENT_METADATA.steps;
    if (index < 0 || index >= steps.length) return;

    this.currentStep = index;
    const titleEl = this.container.querySelector('#cond-step-title');
    const descEl = this.container.querySelector('#cond-step-desc');
    const numEl = this.container.querySelector('#cond-step-num');
    const progressEl = this.container.querySelector('#cond-step-progress');
    const prevBtn = this.container.querySelector('#cond-prev-step-btn');
    const nextBtn = this.container.querySelector('#cond-next-step-btn');

    if (titleEl) titleEl.textContent = steps[index].title;
    if (descEl) descEl.textContent = steps[index].description;
    if (numEl) numEl.textContent = index + 1;
    if (progressEl) progressEl.style.width = `${((index + 1) / steps.length) * 100}%`;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === steps.length - 1;

    this.saveProgress();
  }

  addRow(volume = '', conductivity = '') {
    const lastRow = this.readings[this.readings.length - 1];
    let defaultVol = volume;
    if (defaultVol === '' && lastRow && !isNaN(Number(lastRow.volume))) {
      defaultVol = (Number(lastRow.volume) + 2.0).toFixed(1);
    } else if (defaultVol === '') {
      defaultVol = '0.0';
    }

    this.readings.push({ volume: defaultVol, conductivity: conductivity });
    this.renderTable();
    this.updateCalculation();
  }

  removeRow(index) {
    this.readings.splice(index, 1);
    this.isSampleLoaded = false;
    this.renderTable();
    this.updateCalculation();
  }

  updateRow(index, field, value) {
    if (this.readings[index]) {
      this.readings[index][field] = value;
      this.isSampleLoaded = false;
      this.updateCalculation();
    }
  }

  loadDemoData() {
    this.readings = CONDUCTOMETRIC_EXPERIMENT_METADATA.sampleData.map((d) => ({
      volume: d.volume.toString(),
      conductivity: d.conductivity.toString(),
    }));
    this.isSampleLoaded = true;
    this.renderTable();
    this.updateCalculation();
  }

  clearReadings() {
    this.readings = [];
    this.isSampleLoaded = false;
    this.renderTable();
    this.updateCalculation();
  }

  renderTable() {
    const tbody = this.container.querySelector('#cond-table-body');
    const demoNotice = this.container.querySelector('#cond-demo-notice');

    if (demoNotice) {
      demoNotice.classList.toggle('hidden', !this.isSampleLoaded);
    }

    if (!tbody) return;

    if (this.readings.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" class="empty-table-msg">
            No readings recorded yet. Click <strong>+ Add Reading</strong> or <strong>Load Demo Data</strong>.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.readings
      .map(
        (row, idx) => `
        <tr class="table-row">
          <td class="cell-idx">${idx + 1}</td>
          <td>
            <input 
              type="number" 
              step="0.1" 
              min="0" 
              max="100" 
              class="input-cell" 
              value="${row.volume}" 
              placeholder="0.0" 
              data-index="${idx}" 
              data-field="volume"
            />
          </td>
          <td>
            <input 
              type="number" 
              step="1" 
              min="0" 
              class="input-cell" 
              value="${row.conductivity}" 
              placeholder="120" 
              data-index="${idx}" 
              data-field="conductivity"
            />
          </td>
          <td class="text-center">
            <button class="btn-del-row" data-index="${idx}" title="Delete row">✕</button>
          </td>
        </tr>
      `
      )
      .join('');

    // Attach inputs listeners
    tbody.querySelectorAll('.input-cell').forEach((input) => {
      input.addEventListener('input', (e) => {
        const idx = Number(e.target.dataset.index);
        const field = e.target.dataset.field;
        this.updateRow(idx, field, e.target.value);
      });
    });

    tbody.querySelectorAll('.btn-del-row').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.target.dataset.index);
        this.removeRow(idx);
      });
    });
  }

  updateCalculation() {
    const result = calculateConductometricEquivalence(this.readings, this.unit, 20.0, 0.1);
    const resultsContainer = this.container.querySelector('#cond-results-container');

    if (this.chartRenderer) {
      this.chartRenderer.setData(
        result.isValid ? result.readings : [],
        result.isValid ? result : null,
        this.unit
      );
    }

    if (!resultsContainer) return;

    if (!result.isValid) {
      resultsContainer.innerHTML = `
        <div class="result-alert alert-warning">
          <div class="alert-icon">ℹ️</div>
          <div class="alert-text">
            <strong>Trendline Fitting Notice</strong>: ${result.error}
          </div>
        </div>
      `;
      return;
    }

    const eq = result.equivalencePoint;
    const st = result.stoichiometry;
    const b1 = result.branch1;
    const b2 = result.branch2;

    resultsContainer.innerHTML = `
      <div class="result-card-success">
        <div class="result-grid">
          <div class="metric-box">
            <div class="metric-label">Estimated Equivalence Volume (V_eq)</div>
            <div class="metric-val text-emerald">${eq.volumeMl} <span class="metric-unit">mL</span></div>
            <div class="metric-sub">${eq.method}</div>
          </div>

          <div class="metric-box">
            <div class="metric-label">Conductance at Equivalence</div>
            <div class="metric-val text-sky">${eq.conductivity} <span class="metric-unit">${this.unit}</span></div>
            <div class="metric-sub">Intersection of Trendlines</div>
          </div>

          <div class="metric-box">
            <div class="metric-label">Acetic Acid Molarity (CH₃COOH)</div>
            <div class="metric-val text-amber">${st.calculatedMolarity} <span class="metric-unit">${st.unit}</span></div>
            <div class="metric-sub">Aliquot: ${st.analyteVolumeMl} mL • Titrant: ${st.titrantMolarity} M</div>
          </div>
        </div>

        <div class="trendlines-spec">
          <div class="trendline-row">
            <span class="trendline-badge badge-blue">Branch 1 (Pre-Equivalence)</span>
            <span class="trendline-eq font-mono">${b1.equation}</span>
            <span class="trendline-r2">R² = ${b1.r2}</span>
          </div>
          <div class="trendline-row">
            <span class="trendline-badge badge-purple">Branch 2 (Post-Equivalence)</span>
            <span class="trendline-eq font-mono">${b2.equation}</span>
            <span class="trendline-r2">R² = ${b2.r2}</span>
          </div>
        </div>

        <div class="explanation-box">
          <div class="exp-title">🔬 Scientific Explanation</div>
          <p>${result.explanation}</p>
        </div>
      </div>
    `;
  }
}
