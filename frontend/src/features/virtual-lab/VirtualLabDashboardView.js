/**
 * Virtual Chemistry Lab — Dashboard View
 * Displays 15 interactive experiment cards with search, category filtering,
 * completion progress tracking, and direct access to experiment detail views.
 */

import {
  getAllExperiments,
  searchExperiments,
  getExperimentsByCategory,
} from './data/experimentsDatabase.js';

export class VirtualLabDashboardView {
  /**
   * @param {HTMLElement} container
   * @param {object} callbacks { onSelectExperiment }
   */
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.selectedCategory = 'all';
    this.searchQuery = '';
  }

  mount() {
    this.render();
  }

  destroy() {
    this.container.innerHTML = '';
  }

  getSavedProgress(experimentId) {
    try {
      const data = localStorage.getItem(`vlab_progress_${experimentId}`);
      if (!data) return { completedSteps: 0, totalSteps: 6, isFinished: false, quizScore: null };
      return JSON.parse(data);
    } catch {
      return { completedSteps: 0, totalSteps: 6, isFinished: false, quizScore: null };
    }
  }

  getTotalCompletedCount() {
    const all = getAllExperiments();
    let completed = 0;
    for (const exp of all) {
      const p = this.getSavedProgress(exp.id);
      if (p.isFinished) completed++;
    }
    return completed;
  }

  render() {
    const totalExperiments = 15;
    const completedCount = this.getTotalCompletedCount();
    const progressPercent = Math.round((completedCount / totalExperiments) * 100);

    this.container.innerHTML = `
      <div class="virtual-lab-dashboard animate-fade-in">
        <!-- Hero Header Banner -->
        <div class="vlab-hero-card card">
          <div class="vlab-hero-content">
            <div class="vlab-hero-badge">
              <span class="vlab-pulse-dot"></span>
              <span>ENGINEERING CHEMISTRY CURRICULUM</span>
            </div>
            <h1 class="vlab-hero-title">Virtual Chemistry Lab — Experiments</h1>
            <p class="vlab-hero-desc">
              Comprehensive interactive lab manuals, apparatus schematics, step-by-step interactive procedures,
              real-world observation tables, calculations, and knowledge quizzes for 15 essential laboratory experiments.
            </p>

            <!-- Overall Lab Progress Track -->
            <div class="vlab-overall-progress-box">
              <div class="progress-labels-row">
                <span class="progress-title">Overall Lab Progress</span>
                <span class="progress-stats"><strong>${completedCount}</strong> of ${totalExperiments} Experiments Mastered (${progressPercent}%)</span>
              </div>
              <div class="vlab-progress-track">
                <div class="vlab-progress-fill" style="width: ${progressPercent}%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Search and Category Filter Toolbar -->
        <div class="card vlab-filter-card">
          <div class="vlab-search-row">
            <div class="vlab-search-input-wrap">
              <span class="vlab-search-icon">🔍</span>
              <input
                type="text"
                id="vlab-search-input"
                class="vlab-search-input"
                placeholder="Search 15 experiments by title, chemical reagents, apparatus, or analytical method..."
                value="${this.searchQuery}"
              />
              ${this.searchQuery ? '<button id="btn-vlab-clear-search" class="btn-clear">✕</button>' : ''}
            </div>
          </div>

          <!-- Category Filter Pills -->
          <div class="vlab-category-pills">
            <button class="vlab-cat-pill ${this.selectedCategory === 'all' ? 'active' : ''}" data-cat="all">
              All Experiments (15)
            </button>
            <button class="vlab-cat-pill ${this.selectedCategory === 'titrimetric' ? 'active' : ''}" data-cat="titrimetric">
              Titrimetric Analysis (5)
            </button>
            <button class="vlab-cat-pill ${this.selectedCategory === 'instrumental' ? 'active' : ''}" data-cat="instrumental">
              Instrumental & Physical (5)
            </button>
            <button class="vlab-cat-pill ${this.selectedCategory === 'separation' ? 'active' : ''}" data-cat="separation">
              Separation & Purification (4)
            </button>
            <button class="vlab-cat-pill ${this.selectedCategory === 'qualitative' ? 'active' : ''}" data-cat="qualitative">
              Qualitative Salt Analysis (1)
            </button>
          </div>
        </div>

        <!-- Active Filter Status -->
        <div class="vlab-status-bar">
          <span id="vlab-items-count">Loading experiments...</span>
        </div>

        <!-- 15 Experiment Cards Grid -->
        <div class="vlab-cards-grid" id="vlab-cards-grid">
          <!-- Injected dynamically -->
        </div>
      </div>
    `;

    this.renderExperimentCards();
    this.attachEventListeners();
  }

  renderExperimentCards() {
    const grid = this.container.querySelector('#vlab-cards-grid');
    const countEl = this.container.querySelector('#vlab-items-count');
    if (!grid) return;

    let items = searchExperiments(this.searchQuery);

    if (this.selectedCategory !== 'all') {
      items = items.filter((exp) => exp.category === this.selectedCategory);
    }

    if (countEl) {
      countEl.textContent = `Showing ${items.length} of 15 Chemistry Laboratory Experiments`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="vlab-empty-state card">
          <span style="font-size: 3rem;">🔍</span>
          <h3>No Experiments Found</h3>
          <p>No experiments matched your search query "<strong>${this.searchQuery}</strong>".</p>
          <button class="btn btn-primary btn-sm" id="btn-vlab-reset-filters">Reset Search & Filters</button>
        </div>
      `;
      grid.querySelector('#btn-vlab-reset-filters')?.addEventListener('click', () => {
        this.searchQuery = '';
        this.selectedCategory = 'all';
        this.render();
      });
      return;
    }

    grid.innerHTML = items
      .map((exp) => {
        const progress = this.getSavedProgress(exp.id);
        const isDone = progress.isFinished;
        const totalSteps = exp.procedureSteps ? exp.procedureSteps.length : 6;
        const doneSteps = progress.completedSteps || 0;
        const stepPct = Math.round((doneSteps / totalSteps) * 100);

        const isSimulator = exp.hasSimulator || exp.id === 'ph-metric-titration' || exp.id === 'conductometric-titration';
        const isPhDetermination = exp.id === 'ph-determination';

        let actionBtnText = isDone ? '📖 Review Experiment' : '🔬 Start Experiment';
        if (isSimulator) {
          actionBtnText = isDone ? '⚡ Launch Simulator (Completed)' : '⚡ Launch Interactive Simulator';
        }

        return `
          <div class="card vlab-experiment-card animate-fade-in ${isDone ? 'card-completed' : ''} ${isSimulator ? 'card-has-simulator' : ''}" data-id="${exp.id}">
            <!-- Top Card Header -->
            <div class="vlab-card-top">
              <div class="vlab-exp-num-badge">
                <span class="num-hash">EXP</span>
                <span class="num-val">#${exp.number}</span>
              </div>
              <div class="vlab-badges-group">
                ${isSimulator ? `<span class="vlab-sim-badge">🎮 Interactive Simulator</span>` : ''}
                ${isPhDetermination ? `<span class="vlab-distinction-badge">pH Paper & Buffers</span>` : ''}
                <span class="vlab-category-badge cat-${exp.category}">
                  ${exp.categoryLabel}
                </span>
              </div>
            </div>

            <!-- Title & Icon -->
            <div class="vlab-card-title-row">
              <span class="vlab-card-icon">${exp.icon}</span>
              <div>
                <h3 class="vlab-card-title">${exp.title}</h3>
                ${
                  isSimulator
                    ? `<div class="vlab-card-sim-tag">${exp.simulatorTitle || 'Includes Live Calculations & Graphs'}</div>`
                    : isPhDetermination
                    ? `<div class="vlab-card-distinction-tag">General pH measurement & calibration (Non-titrimetric)</div>`
                    : ''
                }
              </div>
            </div>

            <!-- Metadata Meta Tags -->
            <div class="vlab-card-meta-tags">
              <span class="meta-tag">⏱️ ${exp.duration}</span>
              <span class="meta-tag">📊 ${exp.difficulty}</span>
              ${isSimulator ? '<span class="meta-tag tag-sim">📈 Live Graph & Math</span>' : ''}
              ${isDone ? '<span class="meta-tag tag-done">✅ Completed</span>' : `<span class="meta-tag tag-progress">${doneSteps}/${totalSteps} Steps</span>`}
            </div>

            <!-- Aim Snippet -->
            <p class="vlab-card-aim-snippet">
              <strong>Aim:</strong> ${exp.aim}
            </p>

            <!-- Card Interactive Step Progress -->
            <div class="vlab-card-step-progress">
              <div class="card-progress-bar-track">
                <div class="card-progress-bar-fill" style="width: ${stepPct}%;"></div>
              </div>
              <div class="card-progress-footer-labels">
                <span>Interactive Progress</span>
                <span>${stepPct}%</span>
              </div>
            </div>

            <!-- Action Button -->
            <div class="vlab-card-action">
              <button class="btn ${isSimulator ? 'btn-primary btn-sim-action' : 'btn-primary'} btn-open-exp" data-id="${exp.id}">
                ${actionBtnText} →
              </button>
            </div>
          </div>
        `;
      })
      .join('');

    // Attach click listeners to cards and action buttons
    grid.querySelectorAll('.btn-open-exp').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        if (id && typeof this.callbacks.onSelectExperiment === 'function') {
          this.callbacks.onSelectExperiment(id);
        }
      });
    });

    grid.querySelectorAll('.vlab-experiment-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        // If clicked on button or child of button, ignore since handled above
        if (e.target.closest('.btn-open-exp')) return;
        const id = card.dataset.id;
        if (id && typeof this.callbacks.onSelectExperiment === 'function') {
          this.callbacks.onSelectExperiment(id);
        }
      });
    });
  }

  attachEventListeners() {
    // Search input
    const searchInput = this.container.querySelector('#vlab-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderExperimentCards();
      });
    }

    // Clear search button
    this.container.querySelector('#btn-vlab-clear-search')?.addEventListener('click', () => {
      this.searchQuery = '';
      this.render();
    });

    // Category pills
    this.container.querySelectorAll('.vlab-cat-pill').forEach((pill) => {
      pill.addEventListener('click', (e) => {
        this.selectedCategory = e.currentTarget.dataset.cat;
        this.container.querySelectorAll('.vlab-cat-pill').forEach((p) => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.renderExperimentCards();
      });
    });
  }
}
