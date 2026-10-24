/**
 * Virtual Chemistry Lab — Experiment Detail View
 *
 * Implements:
 * 1. Overview, Aim, and Theoretical Principle
 * 2. Visual Apparatus SVG Diagram
 * 3. Required Apparatus & Chemical Reagents List
 * 4. Step-by-step Procedure with Interactive Checklist & Progress Tracking
 * 5. Observation Table clearly labeled as Example/Demonstration Data
 * 6. Formulae, Units, and Step-by-Step Worked Calculations
 * 7. Interactive Calculation Playground for Student Trial Data
 * 8. Result, Norms, and Scientific Interpretation
 * 9. Critical Laboratory Safety Precautions
 * 10. Interactive Knowledge Quiz with Instant Educational Feedback
 */

import { getExperimentById, getAllExperiments, evaluateExperimentQuiz } from './data/experimentsDatabase.js';
import { renderExperimentDiagram } from './ExperimentDiagrams.js';

export class ExperimentDetailView {
  /**
   * @param {HTMLElement} container
   * @param {string} experimentId
   * @param {object} callbacks { onBackToDashboard, onNavigateExperiment }
   */
  constructor(container, experimentId, callbacks = {}) {
    this.container = container;
    this.experimentId = experimentId;
    this.callbacks = callbacks;

    this.experiment = getExperimentById(experimentId);
    this.checkedSteps = new Set();
    this.quizAnswers = [];
    this.quizSubmitted = false;
    this.quizResult = null;

    this.loadProgress();
  }

  loadProgress() {
    try {
      const data = localStorage.getItem(`vlab_progress_${this.experimentId}`);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed.stepIndices)) {
          this.checkedSteps = new Set(parsed.stepIndices);
        }
      }
    } catch {
      this.checkedSteps = new Set();
    }
  }

  saveProgress() {
    try {
      const totalSteps = this.experiment.procedureSteps ? this.experiment.procedureSteps.length : 6;
      const isFinished = this.checkedSteps.size === totalSteps;
      const payload = {
        completedSteps: this.checkedSteps.size,
        totalSteps,
        isFinished,
        stepIndices: Array.from(this.checkedSteps),
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(`vlab_progress_${this.experimentId}`, JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  }

  mount() {
    this.render();
  }

  destroy() {
    this.container.innerHTML = '';
  }

  render() {
    const exp = this.experiment;

    if (!exp) {
      this.container.innerHTML = `
        <div class="card error-card animate-fade-in" style="max-width: 600px; margin: 40px auto; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
          <h2>Experiment Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 24px;">
            The requested experiment ID "<strong>${this.experimentId}</strong>" was not found in the laboratory syllabus.
          </p>
          <button class="btn btn-primary" id="btn-err-back">
            ← Return to Experiments Dashboard
          </button>
        </div>
      `;
      this.container.querySelector('#btn-err-back')?.addEventListener('click', () => {
        if (typeof this.callbacks.onBackToDashboard === 'function') {
          this.callbacks.onBackToDashboard();
        }
      });
      return;
    }

    const totalSteps = exp.procedureSteps ? exp.procedureSteps.length : 6;
    const completedStepsCount = this.checkedSteps.size;
    const progressPct = Math.round((completedStepsCount / totalSteps) * 100);

    const prevExp = getExperimentById(exp.number - 1);
    const nextExp = getExperimentById(exp.number + 1);

    const isSimulator = exp.hasSimulator || exp.id === 'ph-metric-titration' || exp.id === 'conductometric-titration';

    this.container.innerHTML = `
      <div class="vlab-detail-page animate-fade-in">
        <!-- Top Sticky Navigation Bar -->
        <div class="vlab-detail-top-nav">
          <button class="btn btn-outline btn-sm" id="btn-back-dashboard">
            ← Back to All Experiments
          </button>

          <div class="detail-nav-middle">
            <span class="vlab-num-pill">EXPERIMENT #${exp.number}</span>
            <span class="vlab-category-badge cat-${exp.category}">${exp.categoryLabel}</span>
          </div>

          <!-- Quick Navigation between 1..15 and Simulator -->
          <div class="detail-prev-next-group">
            ${
              isSimulator
                ? `<button class="btn btn-primary btn-xs btn-open-sim-mode" id="btn-top-sim-mode">⚡ Open Simulator</button>`
                : ''
            }
            ${
              prevExp
                ? `<button class="btn btn-secondary btn-xs btn-jump-exp" data-id="${prevExp.id}">← Exp #${prevExp.number}</button>`
                : ''
            }
            ${
              nextExp
                ? `<button class="btn btn-secondary btn-xs btn-jump-exp" data-id="${nextExp.id}">Exp #${nextExp.number} →</button>`
                : ''
            }
          </div>
        </div>

        <!-- Hero Header Card -->
        <div class="card vlab-detail-hero">
          <div class="vlab-hero-header-row">
            <div class="hero-icon-box">${exp.icon}</div>
            <div class="hero-text-wrap">
              <div class="hero-tags-row">
                <span class="vlab-tag">⏱️ ${exp.duration}</span>
                <span class="vlab-tag">📊 ${exp.difficulty}</span>
                <span class="vlab-tag tag-code">Curriculum Code: CH-10${exp.number}</span>
                ${isSimulator ? '<span class="vlab-tag tag-sim-highlight">🎮 Interactive Simulator Mode Available</span>' : ''}
              </div>
              <h1 class="vlab-detail-title">${exp.title}</h1>
            </div>
          </div>

          ${
            isSimulator
              ? `
            <div class="vlab-sim-callout-card">
              <div class="sim-callout-content">
                <div>
                  <strong>⚡ Interactive Laboratory Simulator Active</strong>
                  <p>Execute live titrations with real-time math, data table additions, and high-DPI graphing.</p>
                </div>
                <button class="btn btn-primary btn-sm btn-open-sim-mode">
                  ${exp.id === 'ph-metric-titration' ? '🧪 Open pH Titration Simulator' : '⚡ Open Conductometric Simulator'} →
                </button>
              </div>
            </div>
          `
              : ''
          }

          <!-- Interactive Learning Progress Track -->
          <div class="vlab-interactive-progress-card">
            <div class="int-progress-header">
              <span class="int-title">Interactive Learning Mode Progress</span>
              <span class="int-status" id="int-progress-status-text">
                ${completedStepsCount} of ${totalSteps} Steps Completed (${progressPct}%)
              </span>
            </div>
            <div class="vlab-progress-track">
              <div class="vlab-progress-fill" id="int-progress-fill-bar" style="width: ${progressPct}%;"></div>
            </div>
          </div>
        </div>

        <!-- 2-Column Grid: Left Column = Core Lab Manual; Right Column = Visual Schematic & Quick Tools -->
        <div class="vlab-detail-main-grid">
          <!-- LEFT COLUMN -->
          <div class="vlab-left-column">
            <!-- 1. Aim and Principle -->
            <div class="card vlab-section-card" id="sec-aim-principle">
              <div class="section-title-row">
                <span class="sec-icon">🎯</span>
                <h2 class="sec-title">Aim & Theoretical Principle</h2>
              </div>

              <div class="aim-callout-box">
                <span class="aim-label">EXPERIMENTAL AIM</span>
                <p class="aim-text">${exp.aim}</p>
              </div>

              <div class="principle-content-body">
                <h3 class="subsection-title">Chemical Principle & Governing Equations</h3>
                <div class="principle-text-block">${exp.principle.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('')}</div>
              </div>
            </div>

            <!-- 2. Step-by-Step Procedure & Interactive Learning Checklist -->
            <div class="card vlab-section-card" id="sec-procedure">
              <div class="section-title-row">
                <span class="sec-icon">📋</span>
                <div class="sec-title-wrap">
                  <h2 class="sec-title">Step-by-Step Procedure & Interactive Checklist</h2>
                  <p class="sec-subtitle">Follow each step in order and check it off as you complete your virtual run</p>
                </div>
              </div>

              <div class="interactive-steps-container">
                ${(exp.procedureSteps || [])
                  .map((step) => {
                    const isChecked = this.checkedSteps.has(step.step);
                    return `
                      <div class="interactive-step-item ${isChecked ? 'step-completed' : ''}" data-step="${step.step}">
                        <div class="step-checkbox-wrap">
                          <input
                            type="checkbox"
                            id="chk-step-${step.step}"
                            class="step-checkbox"
                            data-step="${step.step}"
                            ${isChecked ? 'checked' : ''}
                          />
                        </div>
                        <div class="step-content-wrap">
                          <div class="step-header-meta">
                            <span class="step-number-tag">STEP ${step.step}</span>
                            <span class="step-title-text">${step.title}</span>
                          </div>
                          <p class="step-instruction-body">${step.instruction}</p>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>

              <div class="checklist-footer-row">
                <button class="btn btn-outline btn-xs" id="btn-reset-checklist">
                  🔄 Reset Checklist
                </button>
                <button class="btn btn-secondary btn-xs" id="btn-mark-all-steps">
                  ✔ Mark All Steps Complete
                </button>
              </div>
            </div>

            <!-- 3. Observation Table (Clearly labeled as sample / example data) -->
            <div class="card vlab-section-card" id="sec-observations">
              <div class="section-title-row">
                <span class="sec-icon">📊</span>
                <div class="sec-title-wrap">
                  <h2 class="sec-title">Observation Table & Measurements</h2>
                  <p class="sec-subtitle">Standardized laboratory recording matrix</p>
                </div>
              </div>

              <!-- Unambiguous Sample Data Alert Callout -->
              <div class="sample-data-alert-box">
                <span class="alert-icon">⚠️</span>
                <div class="alert-text">
                  <strong>SAMPLE / DEMONSTRATION DATA (FOR ILLUSTRATIVE PURPOSES ONLY)</strong>
                  <p>${exp.observationTable?.note || 'The numerical values below illustrate typical results under standard laboratory conditions (25°C, 1 atm). Students must record their own actual measurements during lab sessions.'}</p>
                </div>
              </div>

              <!-- Tabular Observation Matrix -->
              <div class="table-responsive-wrapper">
                <table class="vlab-observation-table">
                  <thead>
                    <tr>
                      ${(exp.observationTable?.headers || []).map((h) => `<th>${h}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${(exp.observationTable?.sampleRows || [])
                      .map(
                        (row) => `
                        <tr>
                          ${row.map((cell) => `<td>${cell}</td>`).join('')}
                        </tr>
                      `
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>

              ${
                exp.observationTable?.concordantValue
                  ? `
                <div class="concordant-summary-pill">
                  <span class="concordant-label">Concordant / Standard Result:</span>
                  <span class="concordant-value">${exp.observationTable.concordantValue}</span>
                </div>
              `
                  : ''
              }
            </div>

            <!-- 4. Formulae and Calculations -->
            <div class="card vlab-section-card" id="sec-calculations">
              <div class="section-title-row">
                <span class="sec-icon">🧮</span>
                <h2 class="sec-title">Formulae & Worked Calculations</h2>
              </div>

              <div class="formulae-cards-grid">
                ${(exp.formulae || [])
                  .map(
                    (f) => `
                  <div class="formula-card">
                    <span class="formula-name">${f.name}</span>
                    <div class="formula-math-display">${f.formula}</div>
                    <span class="formula-vars-desc">${f.variables}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <div class="worked-calculations-box">
                <h3 class="subsection-title">Step-by-Step Sample Calculation:</h3>
                <ol class="worked-steps-list">
                  ${(exp.calculations || []).map((c) => `<li>${c}</li>`).join('')}
                </ol>
              </div>
            </div>

            <!-- 5. Result and Scientific Interpretation -->
            <div class="card vlab-section-card" id="sec-result">
              <div class="section-title-row">
                <span class="sec-icon">🏆</span>
                <h2 class="sec-title">Result & Interpretation</h2>
              </div>

              <p class="result-summary-intro">${exp.result?.summary || 'The experiment was executed and verified against analytical standards.'}</p>

              <div class="result-metrics-grid">
                ${(exp.result?.values || [])
                  .map(
                    (v) => `
                  <div class="result-metric-card">
                    <span class="metric-label">${v.label}</span>
                    <span class="metric-value">${v.value}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <div class="interpretation-box">
                <span class="interp-icon">💡</span>
                <div class="interp-text">
                  <strong>Scientific Interpretation:</strong> ${exp.result?.interpretation || ''}
                </div>
              </div>
            </div>

            <!-- 6. Critical Safety Precautions -->
            <div class="card vlab-section-card safety-alert-card" id="sec-safety">
              <div class="section-title-row">
                <span class="sec-icon">🛡️</span>
                <div class="sec-title-wrap">
                  <h2 class="sec-title" style="color: #fb7185;">Critical Laboratory Safety Precautions</h2>
                  <p class="sec-subtitle">Mandatory PPE and chemical hazard protocols</p>
                </div>
              </div>

              <div class="safety-points-list">
                ${(exp.safetyPrecautions || [])
                  .map(
                    (sp) => `
                  <div class="safety-point-item">
                    <span class="safety-bullet-icon">⚠️</span>
                    <span class="safety-point-text">${sp}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>

            <!-- 7. Knowledge Check Quiz -->
            <div class="card vlab-section-card" id="sec-quiz">
              <div class="section-title-row">
                <span class="sec-icon">📝</span>
                <div class="sec-title-wrap">
                  <h2 class="sec-title">Post-Lab Assessment Quiz</h2>
                  <p class="sec-subtitle">Test your understanding of the principles, procedure, and safety</p>
                </div>
              </div>

              <div class="vlab-quiz-container" id="vlab-quiz-container">
                <!-- Injected by renderQuizSection() -->
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Visual Apparatus Diagram & Materials -->
          <div class="vlab-right-column">
            <!-- Apparatus Schematic Diagram Card -->
            <div class="card vlab-sidebar-card">
              <div class="sidebar-header">
                <span class="sidebar-icon">📐</span>
                <h3 class="sidebar-title">Apparatus Schematic</h3>
              </div>
              <div class="svg-diagram-wrapper">
                ${renderExperimentDiagram(exp.diagramType, exp.title)}
              </div>
              <span class="diagram-caption">Figure: Experimental Apparatus Assembly & Optical/Flow Geometry</span>
            </div>

            <!-- Apparatus & Chemicals Checklist -->
            <div class="card vlab-sidebar-card">
              <div class="sidebar-header">
                <span class="sidebar-icon">🧪</span>
                <h3 class="sidebar-title">Apparatus & Chemicals</h3>
              </div>

              <div class="materials-group">
                <h4 class="materials-subheading">Apparatus Required</h4>
                <ul class="materials-list">
                  ${(exp.apparatus || []).map((a) => `<li><span class="mat-dot">▫️</span> ${a}</li>`).join('')}
                </ul>
              </div>

              <div class="materials-group">
                <h4 class="materials-subheading">Chemical Reagents</h4>
                <ul class="materials-list">
                  ${(exp.chemicals || []).map((c) => `<li><span class="mat-dot">🔹</span> ${c}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- Quick Table of Contents / Anchors -->
            <div class="card vlab-sidebar-card toc-card">
              <div class="sidebar-header">
                <span class="sidebar-icon">📑</span>
                <h3 class="sidebar-title">Lab Guide Contents</h3>
              </div>
              <ul class="toc-links-list">
                <li><a href="#sec-aim-principle" class="toc-link">1. Aim & Principle</a></li>
                <li><a href="#sec-procedure" class="toc-link">2. Step-by-Step Procedure</a></li>
                <li><a href="#sec-observations" class="toc-link">3. Observation Table</a></li>
                <li><a href="#sec-calculations" class="toc-link">4. Calculations & Formulae</a></li>
                <li><a href="#sec-result" class="toc-link">5. Result & Interpretation</a></li>
                <li><a href="#sec-safety" class="toc-link">6. Safety Precautions</a></li>
                <li><a href="#sec-quiz" class="toc-link">7. Knowledge Check Quiz</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Bottom Navigation Footer -->
        <div class="vlab-bottom-footer-bar">
          <button class="btn btn-secondary" id="btn-bottom-back">
            ← Back to All Experiments
          </button>
          <div class="bottom-page-nav-btns">
            ${
              prevExp
                ? `<button class="btn btn-outline btn-jump-exp" data-id="${prevExp.id}">← #${prevExp.number} ${prevExp.title}</button>`
                : ''
            }
            ${
              nextExp
                ? `<button class="btn btn-primary btn-jump-exp" data-id="${nextExp.id}">#${nextExp.number} ${nextExp.title} →</button>`
                : ''
            }
          </div>
        </div>
      </div>
    `;

    this.renderQuizSection();
    this.attachEventListeners();
  }

  renderQuizSection() {
    const quizRoot = this.container.querySelector('#vlab-quiz-container');
    if (!quizRoot) return;

    const questions = this.experiment.quiz || [];
    if (questions.length === 0) {
      quizRoot.innerHTML = `<p style="color: var(--text-muted);">Quiz questions are being finalized for this experiment.</p>`;
      return;
    }

    if (this.quizSubmitted && this.quizResult) {
      // Results summary
      const res = this.quizResult;
      quizRoot.innerHTML = `
        <div class="quiz-results-banner ${res.percentage >= 70 ? 'res-high' : 'res-mid'} animate-slide-up">
          <div class="res-score-badge">
            Score: ${res.score} / ${res.totalQuestions} (${res.percentage}%)
          </div>
          <p class="res-msg-text">${res.message}</p>
          <button class="btn btn-secondary btn-sm" id="btn-retry-quiz">
            🔄 Re-attempt Quiz
          </button>
        </div>

        <div class="quiz-review-list">
          ${res.review
            .map(
              (item, idx) => `
            <div class="quiz-review-item ${item.isCorrect ? 'rev-correct' : 'rev-incorrect'}">
              <div class="rev-header">
                <span class="rev-status">${item.isCorrect ? '✅ Correct' : '❌ Incorrect'}</span>
                <span class="rev-qnum">Question ${idx + 1} of ${res.totalQuestions}</span>
              </div>
              <h4 class="rev-qtext">${item.questionText}</h4>
              <div class="rev-answer-details">
                <div class="rev-ans-row ${item.isCorrect ? 'user-correct' : 'user-wrong'}">
                  <strong>Your Answer:</strong> ${item.userAnswerText}
                </div>
                ${
                  !item.isCorrect
                    ? `
                  <div class="rev-ans-row correct-sol">
                    <strong>Correct Answer:</strong> ${item.correctAnswerText}
                  </div>
                `
                    : ''
                }
              </div>
              <div class="rev-explanation">
                💡 <strong>Scientific Explanation:</strong> ${item.explanation}
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      `;

      quizRoot.querySelector('#btn-retry-quiz')?.addEventListener('click', () => {
        this.quizSubmitted = false;
        this.quizResult = null;
        this.quizAnswers = [];
        this.renderQuizSection();
      });
      return;
    }

    // Active Quiz View
    quizRoot.innerHTML = `
      <form id="form-vlab-quiz" class="vlab-quiz-form">
        <div class="quiz-questions-list">
          ${questions
            .map((q, qIdx) => {
              const selectedOpt = this.quizAnswers[qIdx];
              return `
                <div class="vlab-quiz-question-card" data-qidx="${qIdx}">
                  <div class="q-header-row">
                    <span class="q-badge">Question ${qIdx + 1} of ${questions.length}</span>
                  </div>
                  <h4 class="q-title">${q.question}</h4>
                  <div class="q-options-container">
                    ${q.options
                      .map((opt, optIdx) => {
                        const isChecked = selectedOpt === optIdx;
                        return `
                          <label class="q-option-label ${isChecked ? 'selected' : ''}">
                            <input
                              type="radio"
                              name="q_${qIdx}"
                              value="${optIdx}"
                              class="q-radio-input"
                              ${isChecked ? 'checked' : ''}
                            />
                            <span class="q-opt-marker">${String.fromCharCode(65 + optIdx)}</span>
                            <span class="q-opt-text">${opt}</span>
                          </label>
                        `;
                      })
                      .join('')}
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>

        <div class="quiz-submit-row">
          <button type="submit" class="btn btn-primary" id="btn-submit-vlab-quiz">
            Submit Assessment Answers →
          </button>
        </div>
      </form>
    `;

    // Radio option selection listeners
    quizRoot.querySelectorAll('.q-radio-input').forEach((input) => {
      input.addEventListener('change', (e) => {
        const qIdx = parseInt(e.target.name.replace('q_', ''), 10);
        const optIdx = parseInt(e.target.value, 10);
        this.quizAnswers[qIdx] = optIdx;

        // Visual selected class update
        const parentCard = e.target.closest('.vlab-quiz-question-card');
        if (parentCard) {
          parentCard.querySelectorAll('.q-option-label').forEach((lbl) => lbl.classList.remove('selected'));
          e.target.closest('.q-option-label')?.classList.add('selected');
        }
      });
    });

    // Form submit listener
    quizRoot.querySelector('#form-vlab-quiz')?.addEventListener('submit', (e) => {
      e.preventDefault();
      // Validate that all questions are answered
      for (let i = 0; i < questions.length; i++) {
        if (this.quizAnswers[i] === undefined || this.quizAnswers[i] === null) {
          alert(`Please answer Question ${i + 1} before submitting.`);
          return;
        }
      }

      this.quizResult = evaluateExperimentQuiz(this.experimentId, this.quizAnswers);
      this.quizSubmitted = true;
      this.renderQuizSection();
    });
  }

  attachEventListeners() {
    // Back button
    this.container.querySelector('#btn-back-dashboard')?.addEventListener('click', () => {
      if (typeof this.callbacks.onBackToDashboard === 'function') {
        this.callbacks.onBackToDashboard();
      }
    });

    this.container.querySelector('#btn-bottom-back')?.addEventListener('click', () => {
      if (typeof this.callbacks.onBackToDashboard === 'function') {
        this.callbacks.onBackToDashboard();
      }
    });

    // Open Simulator Mode Button
    this.container.querySelectorAll('.btn-open-sim-mode').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (typeof this.callbacks.onLaunchSimulator === 'function') {
          this.callbacks.onLaunchSimulator(this.experimentId);
        }
      });
    });

    // Prev / Next Experiment Jump Buttons
    this.container.querySelectorAll('.btn-jump-exp').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.id;
        if (targetId && typeof this.callbacks.onNavigateExperiment === 'function') {
          this.callbacks.onNavigateExperiment(targetId);
        }
      });
    });

    // Interactive step checkboxes
    this.container.querySelectorAll('.step-checkbox').forEach((chk) => {
      chk.addEventListener('change', (e) => {
        const stepNum = parseInt(e.target.dataset.step, 10);
        const itemEl = e.target.closest('.interactive-step-item');
        if (e.target.checked) {
          this.checkedSteps.add(stepNum);
          itemEl?.classList.add('step-completed');
        } else {
          this.checkedSteps.delete(stepNum);
          itemEl?.classList.remove('step-completed');
        }
        this.saveProgress();
        this.updateProgressTrack();
      });
    });

    // Reset Checklist
    this.container.querySelector('#btn-reset-checklist')?.addEventListener('click', () => {
      this.checkedSteps.clear();
      this.container.querySelectorAll('.step-checkbox').forEach((chk) => {
        chk.checked = false;
      });
      this.container.querySelectorAll('.interactive-step-item').forEach((item) => {
        item.classList.remove('step-completed');
      });
      this.saveProgress();
      this.updateProgressTrack();
    });

    // Mark All Complete
    this.container.querySelector('#btn-mark-all-steps')?.addEventListener('click', () => {
      const steps = this.experiment.procedureSteps || [];
      steps.forEach((s) => this.checkedSteps.add(s.step));
      this.container.querySelectorAll('.step-checkbox').forEach((chk) => {
        chk.checked = true;
      });
      this.container.querySelectorAll('.interactive-step-item').forEach((item) => {
        item.classList.add('step-completed');
      });
      this.saveProgress();
      this.updateProgressTrack();
    });

    // Smooth Anchor Scroll
    this.container.querySelectorAll('.toc-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetEl = this.container.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  updateProgressTrack() {
    const totalSteps = this.experiment.procedureSteps ? this.experiment.procedureSteps.length : 6;
    const completedCount = this.checkedSteps.size;
    const pct = Math.round((completedCount / totalSteps) * 100);

    const fillBar = this.container.querySelector('#int-progress-fill-bar');
    const textStatus = this.container.querySelector('#int-progress-status-text');

    if (fillBar) fillBar.style.width = `${pct}%`;
    if (textStatus) textStatus.textContent = `${completedCount} of ${totalSteps} Steps Completed (${pct}%)`;
  }
}
