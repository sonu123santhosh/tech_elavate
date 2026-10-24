import { PH_EXPERIMENT_METADATA } from './phData.js';
import { calculatePhEquivalence } from './phCalculations.js';
import { PhChartRenderer } from './phChartRenderer.js';

export class PhTitrationView {
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.currentStep = 0;
    this.readings = [];
    this.showDerivative = false;
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
      const totalSteps = PH_EXPERIMENT_METADATA.steps.length; // 6
      const completedSteps = Math.min(totalSteps, Math.max(this.currentStep + 1, this.readings.length > 0 ? 3 : 1));
      const isFinished = this.currentStep >= totalSteps - 1 && this.readings.length >= 3;
      const payload = {
        completedSteps,
        totalSteps,
        isFinished,
        stepIndices: Array.from({ length: completedSteps }, (_, i) => i),
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem('vlab_progress_ph-metric-titration', JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not save pH titration progress', e);
    }
  }

  renderTemplate() {
    const meta = PH_EXPERIMENT_METADATA;

    return `
      <div class="experiment-container animate-fade-in">
        <!-- Top Sticky Navigation Bar -->
        <div class="vlab-detail-top-nav">
          <button class="btn btn-outline btn-sm" id="btn-back-to-vlab">
            ← Back to All Experiments
          </button>
          <div class="detail-nav-middle">
            <span class="vlab-num-pill">EXPERIMENT #10</span>
            <span class="vlab-category-badge cat-instrumental">Interactive Titration Simulator</span>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-view-manual">
             View Lab Manual & Quiz →
          </button>
        </div>

        <!-- Breadcrumb & Top Bar -->
        <div class="exp-header">
          <div class="exp-badge">Experiment 10 • Instrumental Chemistry</div>
          <h1 class="exp-title">${meta.title} (pH Titration Simulator)</h1>
          <p class="exp-subtitle">${meta.objective}</p>
        </div>

        <!-- Supervisor Warning Banner -->
        <div class="supervisor-banner">
          <div class="banner-icon"></div>
          <div class="banner-content">
            <strong>LABORATORY SUPERVISOR CHECKPOINT</strong>
            <p>${meta.supervisorReminder}</p>
          </div>
        </div>

        <!-- Theory & Equipment Card -->
        <div class="card card-accordion">
          <div class="card-header" id="ph-theory-toggle">
            <div class="card-title-group">
              <span class="card-icon"></span>
              <h2 class="card-title">Scientific Theory, Reagents & Instrumentation</h2>
            </div>
            <button class="btn-icon" id="ph-toggle-theory-btn" aria-label="Toggle Theory Details">▼</button>
          </div>
          <div class="card-body" id="ph-theory-content">
            <div class="theory-text">
              <p>${meta.theory}</p>
            </div>

            <div class="instruments-grid">
              <div class="equipment-col">
                <h3 class="col-title"> Chemicals & Solutions</h3>
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
                <h3 class="col-title"> Apparatus & Instruments</h3>
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
              <h3 class="safety-title"> Safety Precautions</h3>
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
              Step <span id="ph-step-num">1</span> of ${meta.steps.length}
            </div>
            <div class="procedure-nav">
              <button class="btn btn-secondary btn-sm" id="ph-prev-step-btn" disabled>← Previous Step</button>
              <button class="btn btn-secondary btn-sm" id="ph-next-step-btn">Next Step →</button>
            </div>
          </div>
          <div class="step-content">
            <h3 class="step-title" id="ph-step-title">${meta.steps[0].title}</h3>
            <p class="step-desc" id="ph-step-desc">${meta.steps[0].description}</p>
          </div>
          <div class="step-progress-bar">
            <div class="progress-fill" id="ph-step-progress" style="width: ${100 / meta.steps.length}%"></div>
          </div>
        </div>

        <!-- Main Experiment Workspace: Data Table & Interactive Graph -->
        <div class="experiment-workspace">
          <!-- Left Column: Data Entry Table -->
          <div class="workspace-col data-col">
            <div class="card h-full">
              <div class="table-toolbar">
                <div>
                  <h2 class="card-title">Titration Readings</h2>
                  <p class="card-desc">Volume of 0.1 M NaOH added (mL) vs measured pH</p>
                </div>
                <div class="btn-group">
                  <button class="btn btn-primary btn-sm" id="ph-add-row-btn">+ Add Reading</button>
                  <button class="btn btn-outline btn-sm" id="ph-load-demo-btn">Load Demo Data</button>
                  <button class="btn btn-ghost btn-sm text-danger" id="ph-clear-btn" title="Clear table">Clear</button>
                </div>
              </div>

              <div id="ph-demo-notice" class="demo-badge hidden">
                 <strong>DEMONSTRATION SAMPLE DATA ACTIVE</strong>: These readings are for illustrative educational purposes only and are NOT real laboratory measurements.
              </div>

              <div class="table-responsive">
                <table class="data-table" id="ph-readings-table">
                  <thead>
                    <tr>
                      <th style="width: 45px;">#</th>
                      <th>NaOH Vol (mL)</th>
                      <th>Measured pH</th>
                      <th style="width: 60px;">Action</th>
                    </tr>
                  </thead>
                  <tbody id="ph-table-body">
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
                  <h2 class="card-title">pH Titration Curve</h2>
                  <p class="card-desc">pH vs Titrant Volume with derivative peak detection</p>
                </div>
                <div class="chart-actions">
                  <label class="toggle-label">
                    <input type="checkbox" id="ph-toggle-derivative">
                    <span class="toggle-text">Show ΔpH/ΔV Overlay</span>
                  </label>
                </div>
              </div>

              <div class="canvas-wrapper">
                <canvas id="ph-chart-canvas" width="600" height="340"></canvas>
              </div>

              <!-- Real-time Equivalence Results & Calculations -->
              <div id="ph-results-container" class="results-panel">
                <!-- Populated dynamically -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initChart() {
    const canvas = this.container.querySelector('#ph-chart-canvas');
    if (canvas) {
      this.chartRenderer = new PhChartRenderer(canvas);
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

    // Step Wizard Navigation
    const prevBtn = root.querySelector('#ph-prev-step-btn');
    const nextBtn = root.querySelector('#ph-next-step-btn');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => this.goToStep(this.currentStep - 1));
      nextBtn.addEventListener('click', () => this.goToStep(this.currentStep + 1));
    }

    // Theory Toggle
    const theoryToggle = root.querySelector('#ph-theory-toggle');
    const theoryContent = root.querySelector('#ph-theory-content');
    const toggleBtn = root.querySelector('#ph-toggle-theory-btn');
    if (theoryToggle && theoryContent) {
      theoryToggle.addEventListener('click', () => {
        const isCollapsed = theoryContent.classList.toggle('collapsed');
        if (toggleBtn) toggleBtn.textContent = isCollapsed ? '▶' : '▼';
      });
    }

    // Add Row
    const addBtn = root.querySelector('#ph-add-row-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.addRow());
    }

    // Load Demo Data
    const demoBtn = root.querySelector('#ph-load-demo-btn');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => this.loadDemoData());
    }

    // Clear Table
    const clearBtn = root.querySelector('#ph-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearReadings());
    }

    // Derivative Overlay Checkbox
    const derivToggle = root.querySelector('#ph-toggle-derivative');
    if (derivToggle) {
      derivToggle.addEventListener('change', (e) => {
        this.showDerivative = e.target.checked;
        this.updateCalculation();
      });
    }
  }

  goToStep(index) {
    const steps = PH_EXPERIMENT_METADATA.steps;
    if (index < 0 || index >= steps.length) return;

    this.currentStep = index;
    const titleEl = this.container.querySelector('#ph-step-title');
    const descEl = this.container.querySelector('#ph-step-desc');
    const numEl = this.container.querySelector('#ph-step-num');
    const progressEl = this.container.querySelector('#ph-step-progress');
    const prevBtn = this.container.querySelector('#ph-prev-step-btn');
    const nextBtn = this.container.querySelector('#ph-next-step-btn');

    if (titleEl) titleEl.textContent = steps[index].title;
    if (descEl) descEl.textContent = steps[index].description;
    if (numEl) numEl.textContent = index + 1;
    if (progressEl) progressEl.style.width = `${((index + 1) / steps.length) * 100}%`;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === steps.length - 1;

    this.saveProgress();
  }

  addRow(volume = '', ph = '') {
    const lastRow = this.readings[this.readings.length - 1];
    let defaultVol = volume;
    if (defaultVol === '' && lastRow && !isNaN(Number(lastRow.volume))) {
      defaultVol = (Number(lastRow.volume) + 1.0).toFixed(1);
    } else if (defaultVol === '') {
      defaultVol = '0.0';
    }

    this.readings.push({ volume: defaultVol, ph: ph });
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
    this.readings = PH_EXPERIMENT_METADATA.sampleData.map((d) => ({
      volume: d.volume.toString(),
      ph: d.ph.toString(),
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
    const tbody = this.container.querySelector('#ph-table-body');
    const demoNotice = this.container.querySelector('#ph-demo-notice');

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
              step="0.01" 
              min="0" 
              max="14" 
              class="input-cell" 
              value="${row.ph}" 
              placeholder="7.00" 
              data-index="${idx}" 
              data-field="ph"
            />
          </td>
          <td class="text-center">
            <button class="btn-del-row" data-index="${idx}" title="Delete row"></button>
          </td>
        </tr>
      `
      )
      .join('');

    // Attach input listeners
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
    const result = calculatePhEquivalence(this.readings, 20.0, 0.1);
    const resultsContainer = this.container.querySelector('#ph-results-container');

    if (this.chartRenderer) {
      this.chartRenderer.setData(
        result.isValid ? result.readings : [],
        result.isValid ? result.equivalencePoint : null,
        result.isValid ? result.firstDerivative : [],
        this.showDerivative
      );
    }

    if (!resultsContainer) return;

    if (!result.isValid) {
      resultsContainer.innerHTML = `
        <div class="result-alert alert-warning">
          <div class="alert-icon">ℹ</div>
          <div class="alert-text">
            <strong>Calculation Notice</strong>: ${result.error}
          </div>
        </div>
      `;
      return;
    }

    const eq = result.equivalencePoint;
    const st = result.stoichiometry;

    resultsContainer.innerHTML = `
      <div class="result-card-success">
        <div class="result-grid">
          <div class="metric-box">
            <div class="metric-label">Estimated Equivalence Volume</div>
            <div class="metric-val text-emerald">${eq.volumeMl} <span class="metric-unit">mL</span></div>
            <div class="metric-sub">${eq.method}</div>
          </div>

          <div class="metric-box">
            <div class="metric-label">Estimated Equivalence pH</div>
            <div class="metric-val text-sky">${eq.ph} <span class="metric-unit">pH</span></div>
            <div class="metric-sub">Basic due to CH₃COO⁻ hydrolysis</div>
          </div>

          <div class="metric-box">
            <div class="metric-label">Acetic Acid Molarity (CH₃COOH)</div>
            <div class="metric-val text-amber">${st.calculatedMolarity} <span class="metric-unit">${st.unit}</span></div>
            <div class="metric-sub">Aliquot: ${st.analyteVolumeMl} mL • Titrant: ${st.titrantMolarity} M</div>
          </div>
        </div>

        <div class="explanation-box">
          <div class="exp-title"> Scientific Explanation</div>
          <p>${result.explanation}</p>
        </div>
      </div>
    `;
  }
}
