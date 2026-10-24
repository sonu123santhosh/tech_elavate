/**
 * Interactive Quiz View: Renders modern science-themed question layout,
 * 4 interactive clickable option cards (A, B, C, D), dynamic progress bar,
 * immediate "Check Answer" feedback with educational explanations,
 * answer locking to prevent score manipulation, and a comprehensive
 * final performance summary with detailed question review.
 */

import { QuizEngine } from './QuizEngine.js';

export class QuizView {
  /**
   * @param {HTMLElement} container
   * @param {string} equipmentId
   * @param {object} callbacks { onBackToInstructions, onScanAnother }
   */
  constructor(container, equipmentId, callbacks = {}) {
    this.container = container;
    this.equipmentId = equipmentId;
    this.callbacks = callbacks;
    this.engine = new QuizEngine(equipmentId);
  }

  mount() {
    this.render();
  }

  destroy() {
    this.container.innerHTML = '';
  }

  getEquipmentIcon(id, category) {
    const iconMap = {
      beaker: '',
      'test-tube': '',
      'measuring-cylinder': '',
      'conical-flask': '',
      'volumetric-flask': '',
      pipette: '',
      burette: '',
      'glass-funnel': '',
      'glass-stirring-rod': '',
      'watch-glass': '',
      'reagent-bottle': '',
      dropper: '',
      'wash-bottle': '',
      'test-tube-rack': '',
      'test-tube-holder': '',
      spatula: '',
      'mortar-and-pestle': '',
      'weighing-boat': '',
      'filter-paper': '',
      'evaporating-dish': '',
      'bunsen-burner': '',
      'hot-plate': '',
      thermometer: '',
      'analytical-balance': '',
      'top-pan-balance': '',
      'retort-stand': '',
      'clamp-and-boss-head': '',
      'tripod-stand': '',
      'wire-gauze': '',
      'crucible-tongs': '',
      'separating-funnel': '',
      'buchner-funnel': '',
      'round-bottom-flask': '',
      condenser: '',
      'distillation-apparatus': '',
      crucible: '',
      'clay-triangle': '',
      'water-bath': '',
      'magnetic-stirrer': '',
      desiccator: '',
      'safety-goggles': '',
      'laboratory-coat': '',
      'chemical-resistant-gloves': '',
      'fume-hood': '',
      'eyewash-station': '',
      'safety-shower': '',
      'fire-extinguisher': '',
      'first-aid-kit': '',
      'chemical-waste-container': '',
      'ph-indicator-paper': '',
      centrifuge: '',
      'ph-indicator-solution': '',
      'conductivity-meter': '',
      colorimeter: '',
      spectrophotometer: '',
      hydrometer: '',
      refractometer: '',
      forceps: '',
      'test-tube-brush': '',
      'rubber-stopper': '',
      'laboratory-ph-meter': '',
      'digital-portable-ph-meter': '',
      microscope: '',
    };
    return iconMap[id] || (category === 'glassware' ? '' : category === 'heating-handling' ? '' : '');
  }

  formatCategory(category) {
    const catMap = {
      glassware: 'Glassware & Basics',
      'heating-handling': 'Heating, Handling & Separation',
      'safety-measurement': 'Safety, Measurement & Accessories',
      'ph-instruments': 'pH Instruments & Electrochemistry',
      accessories: 'Laboratory Accessories & Handling',
    };
    return catMap[category] || 'Laboratory Equipment';
  }

  render() {
    if (this.engine.isSubmitted && this.engine.evaluationResult) {
      this.renderResults();
    } else {
      this.renderQuestion();
    }
  }

  renderQuestion() {
    const q = this.engine.getCurrentQuestion();
    const currIdx = this.engine.getCurrentIndex();
    const totalQ = this.engine.getTotalQuestions();
    const progress = this.engine.getProgressPercentage();
    const selectedAns = this.engine.getSelectedAnswer();
    const isChecked = this.engine.isAnswerChecked(currIdx);
    const isLast = this.engine.isLastQuestion();
    const canBack = this.engine.canGoBack();
    const eq = this.engine.equipment;
    const isCorrect = isChecked && selectedAns === q.correctAnswer;
    const optionLabels = ['A', 'B', 'C', 'D'];

    this.container.innerHTML = `
      <div class="quiz-wrapper animate-fade-in">
        <!-- Modern Science Quiz Top Navigation & Progress Bar -->
        <div class="quiz-header-card">
          <div class="quiz-meta-row">
            <div class="quiz-category-badge-group">
              <span class="badge-quiz-target">
                <span class="badge-icon"></span>
                Laboratory Equipment • ${this.formatCategory(eq.category)}
              </span>
              <span class="badge-equipment-title">${eq.name}</span>
            </div>
            <div class="quiz-progress-stats">
              <span class="quiz-step-count">Question <strong>${currIdx + 1}</strong> of ${totalQ}</span>
              <span class="quiz-pct-pill">${progress}% Completed</span>
            </div>
          </div>

          <div class="quiz-progress-track" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
            <div class="quiz-progress-bar" style="width: ${progress}%;"></div>
          </div>
        </div>

        <!-- Interactive Question Card -->
        <div class="card quiz-card modern-quiz-card">
          <div class="question-header">
            <div class="question-number-tag">
              <span class="q-tag-num">Q${currIdx + 1}</span>
              <span class="q-tag-label">MULTIPLE CHOICE</span>
            </div>
            <h2 class="question-text">${q.question}</h2>
          </div>

          <!-- Neat Equipment Visual / Image Display -->
          ${
            eq.imageUrl || eq.image
              ? `
            <div class="quiz-equipment-media-wrap">
              <img src="${eq.imageUrl || eq.image}" alt="${eq.name}" class="quiz-equipment-image" />
            </div>
          `
              : `
            <div class="quiz-equipment-media-wrap">
              <div class="quiz-equipment-visual-card">
                <div class="eq-visual-icon-box">${this.getEquipmentIcon(eq.id, eq.category)}</div>
                <div class="eq-visual-info">
                  <div class="eq-visual-kicker">LAB SPECIMEN #${eq.number} • ${eq.name}</div>
                  <p class="eq-visual-desc"><span class="eq-label">Primary Application:</span> ${eq.mainUse}</p>
                </div>
                <span class="eq-visual-category-tag">${this.formatCategory(eq.category)}</span>
              </div>
            </div>
          `
          }

          <!-- Validation Error Alert -->
          <div id="quiz-error-banner" class="alert-inline alert-danger hidden animate-shake">
             Please select an answer option (A, B, C, or D) before checking.
          </div>

          <!-- Redesigned Clickable Answer Option Cards -->
          <div class="options-container" role="radiogroup" aria-label="Question answer options">
            ${q.options
              .map((opt, idx) => {
                const isSelected = selectedAns === idx;
                let cardClass = '';
                let statusBadge = '';

                if (!isChecked) {
                  if (isSelected) cardClass = 'is-selected';
                } else {
                  if (isSelected && isCorrect) {
                    cardClass = 'is-checked-correct';
                    statusBadge = `<span class="opt-status-pill pill-correct"> Correct Choice</span>`;
                  } else if (isSelected && !isCorrect) {
                    cardClass = 'is-checked-incorrect';
                    statusBadge = `<span class="opt-status-pill pill-incorrect"> Your Selection</span>`;
                  } else if (!isSelected && idx === q.correctAnswer) {
                    cardClass = 'is-actual-correct';
                    statusBadge = `<span class="opt-status-pill pill-actual"> Correct Solution</span>`;
                  } else {
                    cardClass = 'is-dimmed';
                  }
                }

                return `
                  <button 
                    type="button" 
                    class="option-card ${cardClass}" 
                    data-option-index="${idx}"
                    ${isChecked ? 'disabled' : ''}
                    role="radio"
                    aria-checked="${isSelected ? 'true' : 'false'}"
                  >
                    <div class="option-indicator">${optionLabels[idx]}</div>
                    <div class="option-content">
                      <span class="option-text">${opt}</span>
                    </div>
                    ${statusBadge}
                  </button>
                `;
              })
              .join('')}
          </div>

          <!-- Immediate Educational Explanation Banner (Revealed on Check Answer) -->
          ${
            isChecked
              ? `
            <div class="quiz-feedback-banner ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'} animate-pop-in">
              <div class="feedback-status-row">
                <span class="feedback-badge">
                  ${isCorrect ? ' Correct Answer!' : ' Not Quite Right'}
                </span>
                <span class="feedback-tagline">
                  ${isCorrect ? 'Outstanding laboratory knowledge.' : 'Review the verified scientific principle below:'}
                </span>
              </div>
              <div class="feedback-explanation-body">
                <span class="feedback-icon"></span>
                <div class="feedback-text">
                  <strong>Scientific Explanation:</strong> ${q.explanation}
                </div>
              </div>
            </div>
          `
              : ''
          }

          <!-- Interactive Action & Navigation Footer -->
          <div class="quiz-footer-nav">
            <button 
              type="button" 
              class="btn btn-secondary btn-nav-prev" 
              id="quiz-prev-btn" 
              ${!canBack ? 'disabled' : ''}
            >
              ← Previous
            </button>

            <button 
              type="button" 
              class="btn btn-outline btn-sm btn-nav-instructions" 
              id="quiz-back-instructions-btn"
            >
               View Equipment Guide
            </button>

            ${
              !isChecked
                ? `
              <button 
                type="button" 
                class="btn btn-primary btn-check-action" 
                id="quiz-check-btn"
              >
                <span class="btn-icon"></span> Check Answer
              </button>
            `
                : `
              <button 
                type="button" 
                class="btn btn-primary btn-next-action ${isLast ? 'btn-celebrate' : ''}" 
                id="quiz-next-btn"
              >
                ${isLast ? 'See Final Results ' : 'Next Question →'}
              </button>
            `
            }
          </div>
        </div>
      </div>
    `;

    this.attachQuestionListeners();
  }

  attachQuestionListeners() {
    const root = this.container;
    const errorBanner = root.querySelector('#quiz-error-banner');
    const optionCards = root.querySelectorAll('.option-card');

    // Option selection
    optionCards.forEach((card) => {
      card.addEventListener('click', () => {
        // If already checked, prevent altering answer
        if (this.engine.isAnswerChecked()) return;

        const idx = Number(card.dataset.optionIndex);
        this.engine.selectAnswer(idx);
        if (errorBanner) errorBanner.classList.add('hidden');

        optionCards.forEach((c) => {
          c.classList.remove('is-selected');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('is-selected');
        card.setAttribute('aria-checked', 'true');
      });
    });

    // Check Answer Button
    const checkBtn = root.querySelector('#quiz-check-btn');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        if (this.engine.getSelectedAnswer() === null) {
          if (errorBanner) {
            errorBanner.textContent = ' Please select an answer option (A, B, C, or D) before checking.';
            errorBanner.classList.remove('hidden');
          }
          return;
        }

        const checkRes = this.engine.checkAnswer();
        if (checkRes.success) {
          this.render();
        } else if (errorBanner) {
          errorBanner.textContent = ` ${checkRes.error}`;
          errorBanner.classList.remove('hidden');
        }
      });
    }

    // Next / Submit Results Button
    const nextBtn = root.querySelector('#quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.engine.isLastQuestion()) {
          const subRes = this.engine.submitQuiz();
          if (subRes.success) {
            this.render();
          } else if (errorBanner) {
            errorBanner.textContent = ` ${subRes.error}`;
            errorBanner.classList.remove('hidden');
          }
        } else {
          const advRes = this.engine.nextQuestion();
          if (advRes.success) {
            this.render();
          }
        }
      });
    }

    // Previous Button
    const prevBtn = root.querySelector('#quiz-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const res = this.engine.prevQuestion();
        if (res.success) {
          this.render();
        }
      });
    }

    // Back to Instructions Button
    const backInstBtn = root.querySelector('#quiz-back-instructions-btn');
    if (backInstBtn && typeof this.callbacks.onBackToInstructions === 'function') {
      backInstBtn.addEventListener('click', () => {
        this.callbacks.onBackToInstructions(this.equipmentId);
      });
    }
  }

  renderResults() {
    const res = this.engine.evaluationResult;
    const eq = this.engine.equipment;

    let scoreClass = 'score-mid';
    let tierTitle = 'Proficient • Senior Lab Analyst';
    let tierBadge = ' PROFICIENT';

    if (res.score >= 5) {
      scoreClass = 'score-high';
      tierTitle = 'Distinction • Master Laboratory Chemist';
      tierBadge = ' DISTINCTION';
    } else if (res.score === 4) {
      scoreClass = 'score-high';
      tierTitle = 'Proficient • Senior Lab Analyst';
      tierBadge = ' PROFICIENT';
    } else if (res.score >= 3) {
      scoreClass = 'score-mid';
      tierTitle = 'Competent • Developing Chemist';
      tierBadge = ' COMPETENT';
    } else {
      scoreClass = 'score-low';
      tierTitle = 'Needs Practice • Apprentice';
      tierBadge = ' NEEDS PRACTICE';
    }

    this.container.innerHTML = `
      <div class="results-wrapper animate-fade-in">
        <!-- Results Summary Card -->
        <div class="card results-summary-card">
          <div class="results-badge-row">
            <span class="results-badge">${tierBadge}</span>
            <span class="results-cat-tag">Laboratory Equipment • ${this.formatCategory(eq.category)}</span>
          </div>

          <h1 class="results-title">${res.equipmentName} Knowledge Assessment</h1>
          <p class="results-tier-subtitle">${tierTitle}</p>

          <!-- Circular / Numeric Score Box -->
          <div class="score-display-box ${scoreClass}">
            <div class="score-number">${res.score} <span class="score-total">/ ${res.totalQuestions}</span></div>
            <div class="score-percentage">${res.percentage}% Final Score</div>
          </div>

          <p class="results-feedback-message">${res.message}</p>

          <!-- Performance Metric Chips -->
          <div class="performance-metrics-grid">
            <div class="metric-chip">
              <span class="metric-label">Total Questions</span>
              <span class="metric-val">${res.totalQuestions}</span>
            </div>
            <div class="metric-chip chip-correct">
              <span class="metric-label">Correct Answers</span>
              <span class="metric-val">${res.score}</span>
            </div>
            <div class="metric-chip chip-incorrect">
              <span class="metric-label">Incorrect Answers</span>
              <span class="metric-val">${res.totalQuestions - res.score}</span>
            </div>
            <div class="metric-chip chip-accuracy">
              <span class="metric-label">Accuracy</span>
              <span class="metric-val">${res.percentage}%</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="results-action-buttons">
            <button class="btn btn-primary" id="btn-retry-quiz">
               Re-attempt Quiz
            </button>
            <button class="btn btn-secondary" id="btn-back-instructions">
               View Equipment Guide
            </button>
            <button class="btn btn-outline" id="btn-scan-another">
               Scan Another Equipment
            </button>
          </div>
        </div>

        <!-- Detailed Question Breakdown & Explanations -->
        <div class="card review-card">
          <div class="review-header-row">
            <div>
              <h2 class="card-title">Comprehensive Question Review</h2>
              <p class="card-desc">Review your verified answers and scientific explanations for every question</p>
            </div>
            <span class="review-count-badge">${res.totalQuestions} Questions Evaluated</span>
          </div>

          <div class="review-list">
            ${res.review
              .map(
                (item, idx) => `
              <div class="review-item ${item.isCorrect ? 'review-correct' : 'review-incorrect'}">
                <div class="review-item-header">
                  <span class="review-status-icon">${item.isCorrect ? ' Correct (+1 pt)' : ' Incorrect (0 pts)'}</span>
                  <span class="review-q-num">Question ${idx + 1} of ${res.totalQuestions}</span>
                </div>
                <h3 class="review-question-text">${item.questionText}</h3>

                <div class="review-answers-grid">
                  <div class="review-answer-cell ${item.isCorrect ? 'user-was-correct' : 'user-was-wrong'}">
                    <span class="cell-label">Your Answer:</span>
                    <span class="cell-val">${item.userAnswerText}</span>
                  </div>

                  ${
                    !item.isCorrect
                      ? `
                    <div class="review-answer-cell correct-solution">
                      <span class="cell-label">Verified Correct Solution:</span>
                      <span class="cell-val">${item.correctAnswerText}</span>
                    </div>
                  `
                      : ''
                  }
                </div>

                <div class="review-explanation-box">
                  <span class="exp-icon"></span>
                  <div class="exp-text">
                    <strong>Scientific Explanation:</strong> ${item.explanation}
                  </div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    this.attachResultsListeners();
  }

  attachResultsListeners() {
    const root = this.container;

    // Retry Quiz
    const retryBtn = root.querySelector('#btn-retry-quiz');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.engine.reset();
        this.render();
      });
    }

    // Back to Instructions
    const backBtn = root.querySelector('#btn-back-instructions');
    if (backBtn && typeof this.callbacks.onBackToInstructions === 'function') {
      backBtn.addEventListener('click', () => {
        this.callbacks.onBackToInstructions(this.equipmentId);
      });
    }

    // Scan Another
    const scanBtn = root.querySelector('#btn-scan-another');
    if (scanBtn && typeof this.callbacks.onScanAnother === 'function') {
      scanBtn.addEventListener('click', () => {
        this.callbacks.onScanAnother();
      });
    }
  }
}
