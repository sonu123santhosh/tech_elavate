/**
 * Master Controller for the Smart AR Chemistry Lab Assistant & Equipment Quizzes
 *
 * Manages the state machine:
 * - SCANNER: Live camera reticle scanning & 63-item searchable catalog fallback
 * - INSTRUCTIONS: Equipment purpose, operating steps, handling, safety alerts, and Attempt Quiz CTA
 * - QUIZ: Equipment-associated 5-question interactive multiple-choice quiz and results analysis
 */

import { ArScannerView } from './ArScannerView.js';
import { EquipmentInstructionsView } from './EquipmentInstructionsView.js';
import { QuizView } from './QuizView.js';

export class ArQuizController {
  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.container = container;

    // View states: 'SCANNER' | 'INSTRUCTIONS' | 'QUIZ'
    this.currentState = 'SCANNER';
    this.currentEquipmentId = 'beaker'; // default initial selection
    this.activeSubView = null;
  }

  mount() {
    this.renderState();
  }

  destroy() {
    if (this.activeSubView && typeof this.activeSubView.destroy === 'function') {
      this.activeSubView.destroy();
    }
    this.container.innerHTML = '';
  }

  /**
   * State transitions
   */
  goToScanner() {
    this.currentState = 'SCANNER';
    this.renderState();
  }

  goToInstructions(equipmentId) {
    if (equipmentId) {
      this.currentEquipmentId = equipmentId;
    }
    this.currentState = 'INSTRUCTIONS';
    this.renderState();
  }

  goToQuiz(equipmentId) {
    if (equipmentId) {
      this.currentEquipmentId = equipmentId;
    }
    this.currentState = 'QUIZ';
    this.renderState();
  }

  renderState() {
    // Teardown previous subview
    if (this.activeSubView && typeof this.activeSubView.destroy === 'function') {
      this.activeSubView.destroy();
      this.activeSubView = null;
    }

    this.container.innerHTML = '';

    if (this.currentState === 'SCANNER') {
      this.activeSubView = new ArScannerView(this.container, {
        onSelectEquipment: (eqId) => {
          this.goToInstructions(eqId);
        },
      });
      this.activeSubView.mount();
    } else if (this.currentState === 'INSTRUCTIONS') {
      this.activeSubView = new EquipmentInstructionsView(this.container, this.currentEquipmentId, {
        onStartQuiz: (eqId) => {
          this.goToQuiz(eqId);
        },
        onBackToScanner: () => {
          this.goToScanner();
        },
      });
      this.activeSubView.mount();
    } else if (this.currentState === 'QUIZ') {
      this.activeSubView = new QuizView(this.container, this.currentEquipmentId, {
        onBackToInstructions: (eqId) => {
          this.goToInstructions(eqId);
        },
        onScanAnother: () => {
          this.goToScanner();
        },
      });
      this.activeSubView.mount();
    }
  }
}
