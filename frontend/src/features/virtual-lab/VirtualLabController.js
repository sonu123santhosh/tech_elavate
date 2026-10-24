/**
 * Virtual Chemistry Lab — Master Controller
 *
 * Manages the state machine:
 * - DASHBOARD: 15-experiment grid, category filtering, search, and overall progress
 * - PH_SIMULATOR: Interactive pH-Metric Titration Simulator (Exp #10)
 * - CONDUCTOMETRIC_SIMULATOR: Interactive Conductometric Titration Simulator (Exp #9)
 * - DETAIL: Comprehensive laboratory manual & quiz for any chosen experiment
 */

import { VirtualLabDashboardView } from './VirtualLabDashboardView.js';
import { ExperimentDetailView } from './ExperimentDetailView.js';
import { PhTitrationView } from '../ph-titration/PhTitrationView.js';
import { ConductometricView } from '../conductometric-titration/ConductometricView.js';

export class VirtualLabController {
  /**
   * @param {HTMLElement} container
   * @param {string|null} initialExperimentId
   */
  constructor(container, initialExperimentId = null) {
    this.container = container;
    this.currentExperimentId = initialExperimentId || 'acid-base-titration';
    this.currentState = initialExperimentId ? this.resolveStateForExperiment(initialExperimentId) : 'DASHBOARD';
    this.activeSubView = null;
  }

  resolveStateForExperiment(experimentId) {
    if (experimentId === 'ph-metric-titration' || experimentId === 'ph') {
      return 'PH_SIMULATOR';
    }
    if (experimentId === 'conductometric-titration' || experimentId === 'conductometric') {
      return 'CONDUCTOMETRIC_SIMULATOR';
    }
    return 'DETAIL';
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

  goToDashboard() {
    this.currentState = 'DASHBOARD';
    this.renderState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToExperiment(experimentId) {
    if (experimentId) {
      this.currentExperimentId = experimentId;
    }
    this.currentState = this.resolveStateForExperiment(experimentId);
    this.renderState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToManual(experimentId) {
    if (experimentId) {
      this.currentExperimentId = experimentId;
    }
    this.currentState = 'DETAIL';
    this.renderState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderState() {
    if (this.activeSubView && typeof this.activeSubView.destroy === 'function') {
      this.activeSubView.destroy();
      this.activeSubView = null;
    }

    this.container.innerHTML = '';

    if (this.currentState === 'DASHBOARD') {
      this.activeSubView = new VirtualLabDashboardView(this.container, {
        onSelectExperiment: (expId) => {
          this.goToExperiment(expId);
        },
      });
      this.activeSubView.mount();
    } else if (this.currentState === 'PH_SIMULATOR') {
      this.activeSubView = new PhTitrationView(this.container, {
        onBackToDashboard: () => this.goToDashboard(),
        onViewManual: () => this.goToManual('ph-metric-titration'),
      });
      this.activeSubView.mount();
    } else if (this.currentState === 'CONDUCTOMETRIC_SIMULATOR') {
      this.activeSubView = new ConductometricView(this.container, {
        onBackToDashboard: () => this.goToDashboard(),
        onViewManual: () => this.goToManual('conductometric-titration'),
      });
      this.activeSubView.mount();
    } else if (this.currentState === 'DETAIL') {
      this.activeSubView = new ExperimentDetailView(this.container, this.currentExperimentId, {
        onBackToDashboard: () => {
          this.goToDashboard();
        },
        onNavigateExperiment: (nextExpId) => {
          this.goToExperiment(nextExpId);
        },
        onLaunchSimulator: (expId) => {
          this.goToExperiment(expId);
        },
      });
      this.activeSubView.mount();
    }
  }
}
