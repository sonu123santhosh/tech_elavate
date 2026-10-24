/**
 * Equipment Instructions View: Displays purpose, operating steps,
 * handling guidance, safety precautions, and the prominent Attempt Quiz button.
 */

import { getEquipmentById } from './equipmentDatabase.js';

export class EquipmentInstructionsView {
  /**
   * @param {HTMLElement} container
   * @param {string} equipmentId
   * @param {object} callbacks { onStartQuiz, onBackToScanner }
   */
  constructor(container, equipmentId, callbacks = {}) {
    this.container = container;
    this.equipmentId = equipmentId;
    this.callbacks = callbacks;
  }

  mount() {
    this.render();
  }

  destroy() {
    this.container.innerHTML = '';
  }

  getEquipmentIcon(id, category) {
    const iconMap = {
      beaker: '🧪',
      'test-tube': '🧪',
      'measuring-cylinder': '📏',
      'conical-flask': '⚗️',
      'volumetric-flask': '🍶',
      pipette: '💧',
      burette: '📐',
      'glass-funnel': '🔻',
      'glass-stirring-rod': '🥢',
      'watch-glass': '🔍',
      'reagent-bottle': '🧴',
      dropper: '💧',
      'wash-bottle': '🚿',
      'test-tube-rack': '🪜',
      'test-tube-holder': '🗜️',
      spatula: '🥄',
      'mortar-and-pestle': '🥣',
      'weighing-boat': '🚤',
      'filter-paper': '📄',
      'evaporating-dish': '🍲',
      'bunsen-burner': '🔥',
      'hot-plate': '♨️',
      thermometer: '🌡️',
      'analytical-balance': '⚖️',
      'top-pan-balance': '⚖️',
      'retort-stand': '🏗️',
      'clamp-and-boss-head': '🗜️',
      'tripod-stand': '📐',
      'wire-gauze': '🕸️',
      'crucible-tongs': '🥢',
      'separating-funnel': '⏳',
      'buchner-funnel': '🌪️',
      'round-bottom-flask': '🔮',
      condenser: '🧊',
      'distillation-apparatus': '⚗️',
      crucible: '🏺',
      'clay-triangle': '🔺',
      'water-bath': '🛁',
      'magnetic-stirrer': '🌀',
      desiccator: '📦',
      'safety-goggles': '🥽',
      'laboratory-coat': '🥼',
      'chemical-resistant-gloves': '🧤',
      'fume-hood': '💨',
      'eyewash-station': '👁️',
      'safety-shower': '🚿',
      'fire-extinguisher': '🧯',
      'first-aid-kit': '🩹',
      'chemical-waste-container': '☣️',
      'ph-indicator-paper': '🏷️',
      centrifuge: '🔄',
      'ph-indicator-solution': '🧪',
      'conductivity-meter': '⚡',
      colorimeter: '🌈',
      spectrophotometer: '📊',
      hydrometer: '🌊',
      refractometer: '💎',
      forceps: '🤏',
      'test-tube-brush': '🪥',
      'rubber-stopper': '🛑',
      'laboratory-ph-meter': '🔬',
      'digital-portable-ph-meter': '📱',
      microscope: '🔬',
    };
    return iconMap[id] || (category === 'glassware' ? '🧪' : category === 'heating' ? '🔥' : '⚗️');
  }

  render() {
    const eq = getEquipmentById(this.equipmentId);

    if (!eq) {
      this.container.innerHTML = `
        <div class="card error-card animate-fade-in" style="max-width: 600px; margin: 40px auto; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
          <h2>Equipment Not Found</h2>
          <p style="color: var(--color-text-muted); margin-bottom: 24px;">
            The requested equipment ID "<strong>${this.equipmentId}</strong>" was not found in the laboratory database.
          </p>
          <button class="btn btn-primary" id="btn-err-back">
            ← Return to Scanner & Catalog
          </button>
        </div>
      `;
      const backBtn = this.container.querySelector('#btn-err-back');
      if (backBtn && typeof this.callbacks.onBackToScanner === 'function') {
        backBtn.addEventListener('click', () => this.callbacks.onBackToScanner());
      }
      return;
    }

    const icon = this.getEquipmentIcon(eq.id, eq.category);
    const categoryName = (eq.category || 'General Laboratory').toUpperCase();

    this.container.innerHTML = `
      <div class="instructions-wrapper animate-fade-in">
        <!-- Top Navigation Bar -->
        <div class="instructions-top-bar">
          <button class="btn btn-outline btn-sm" id="btn-back-scanner" title="Return to Scanner">
            ← Back to Scanner & Catalog
          </button>
          <div class="equipment-index-pill">
            <span class="pill-number">#${eq.number}</span>
            <span class="pill-category">${categoryName}</span>
          </div>
        </div>

        <!-- Equipment Hero Presentation Card -->
        <div class="card equipment-hero-card">
          <div class="hero-left">
            <div class="ar-equipment-avatar">
              <span class="equipment-avatar-icon">${icon}</span>
              <div class="ar-hud-badge">AR VERIFIED</div>
            </div>
          </div>
          <div class="hero-right">
            <div class="hero-header-meta">
              <span class="ar-indicator-dot"></span>
              <span class="ar-status-text">Identified Equipment Record</span>
            </div>
            <h1 class="hero-equipment-name">${eq.name}</h1>
            <div class="hero-main-use-box">
              <span class="use-tag">Main Use</span>
              <p class="use-content">${eq.mainUse}</p>
            </div>
          </div>
        </div>

        <!-- Prominent Attempt Quiz Callout Banner -->
        <div class="card quiz-cta-card">
          <div class="cta-content">
            <div class="cta-icon">🎯</div>
            <div class="cta-text">
              <h3>Ready to Test Your Knowledge on ${eq.name}?</h3>
              <p>5 interactive questions designed specifically for this equipment covering identification, usage, handling, and safety.</p>
            </div>
          </div>
          <button class="btn btn-primary btn-attempt-quiz" id="btn-attempt-quiz">
            <span>📝</span> Attempt Quiz Now
          </button>
        </div>

        <!-- Two Column Content Grid -->
        <div class="instructions-grid">
          <!-- Column 1: Operating Instructions -->
          <div class="card instruction-panel">
            <div class="panel-header">
              <span class="panel-icon">📋</span>
              <h2 class="panel-title">Basic Operating Instructions</h2>
            </div>
            <ol class="steps-list">
              ${(eq.operatingInstructions || [])
                .map(
                  (step) => `
                <li class="step-item">
                  <span class="step-text">${step}</span>
                </li>
              `
                )
                .join('')}
            </ol>
          </div>

          <!-- Column 2: Handling & Care -->
          <div class="card instruction-panel">
            <div class="panel-header">
              <span class="panel-icon">🧤</span>
              <h2 class="panel-title">Correct Handling Guidelines</h2>
            </div>
            <ul class="guidelines-list">
              ${(eq.handlingGuidance || [])
                .map(
                  (guide) => `
                <li class="guide-item">
                  <span class="guide-bullet">✔</span>
                  <span class="guide-text">${guide}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>

        <!-- Full Width Safety Precautions Alert Card -->
        <div class="card safety-precautions-card">
          <div class="safety-header">
            <span class="safety-icon">⚠️</span>
            <h2 class="safety-title">Critical Laboratory Safety Precautions</h2>
          </div>
          <div class="safety-list">
            ${(eq.safetyPrecautions || [])
              .map(
                (precaution) => `
              <div class="safety-item">
                <span class="safety-item-icon">🛡️</span>
                <span class="safety-item-text">${precaution}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Bottom Quiz CTA Footer -->
        <div class="instructions-bottom-bar">
          <button class="btn btn-secondary" id="btn-bottom-back">
            ← Scan Another Equipment
          </button>
          <button class="btn btn-primary btn-attempt-quiz" id="btn-bottom-attempt-quiz">
            <span>📝</span> Attempt ${eq.name} Quiz →
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Attempt Quiz buttons (top and bottom)
    const quizButtons = this.container.querySelectorAll('.btn-attempt-quiz');
    quizButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (typeof this.callbacks.onStartQuiz === 'function') {
          this.callbacks.onStartQuiz(this.equipmentId);
        }
      });
    });

    // Back to Scanner buttons
    const backBtn = this.container.querySelector('#btn-back-scanner');
    if (backBtn && typeof this.callbacks.onBackToScanner === 'function') {
      backBtn.addEventListener('click', () => {
        this.callbacks.onBackToScanner();
      });
    }

    const bottomBackBtn = this.container.querySelector('#btn-bottom-back');
    if (bottomBackBtn && typeof this.callbacks.onBackToScanner === 'function') {
      bottomBackBtn.addEventListener('click', () => {
        this.callbacks.onBackToScanner();
      });
    }
  }
}
