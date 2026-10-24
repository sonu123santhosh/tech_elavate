import './styles/main.css';
import './styles/experiments.css';
import './styles/chat.css';
import './styles/arQuiz.css';
import './styles/virtualLab.css';
import './styles/equipmentViewer.css';
import './styles/scanner.css';

import { PhTitrationView } from './features/ph-titration/PhTitrationView.js';
import { ConductometricView } from './features/conductometric-titration/ConductometricView.js';
import { ChatAssistantView } from './features/ai-assistant/ChatAssistantView.js';
import { ArQuizController } from './features/ar-quiz/ArQuizController.js';
import { VirtualLabController } from './features/virtual-lab/VirtualLabController.js';
import { EquipmentDatabaseView } from './features/equipment-viewer/EquipmentDatabaseView.js';
import { SimulatorView } from './features/simulator/SimulatorView.js';
import { CameraScannerView } from './features/camera-scanner/CameraScannerView.js';

class SmartLabApp {
  constructor() {
    this.currentView = null;
    this.currentTab = 'experiments';
    this.container = document.getElementById('view-root');
    this.tabs = {
      experiments: VirtualLabController,
      scanner: CameraScannerView,
      simulator: SimulatorView,
      equipment: EquipmentDatabaseView,
      'ar-quiz': ArQuizController,
      chat: ChatAssistantView,
    };
  }

  init() {
    this.attachNavListeners();

    // Check initial hash route
    this.handleRoute();

    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });
  }

  handleRoute() {
    const rawHash = window.location.hash.replace('#', '') || 'experiments';
    const [tabKey, queryStr] = rawHash.split('?');
    const params = new URLSearchParams(queryStr || '');
    const expParam = params.get('exp');

    if (tabKey === 'ph' || tabKey === 'ph-metric-titration') {
      this.switchTab('experiments', 'ph-metric-titration');
    } else if (tabKey === 'conductometric' || tabKey === 'conductometric-titration') {
      this.switchTab('experiments', 'conductometric-titration');
    } else if (tabKey === 'simulator') {
      this.switchTab('simulator', expParam || 'acid-base-titration');
    } else if (tabKey === 'ai-scanner' || tabKey === 'camera-scanner' || tabKey === 'scanner') {
      this.switchTab('scanner');
    } else if (this.tabs[tabKey]) {
      this.switchTab(tabKey, expParam);
    } else {
      this.switchTab('experiments');
    }
  }

  attachNavListeners() {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const tabKey = e.currentTarget.dataset.tab;
        if (tabKey && this.tabs[tabKey]) {
          window.location.hash = tabKey;
        }
      });
    });
  }

  switchTab(tabKey, initialParam = null) {
    if (!this.tabs[tabKey]) return;

    // Update active tab button
    document.querySelectorAll('.nav-tab-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });

    // Destroy existing view
    if (this.currentView && typeof this.currentView.destroy === 'function') {
      this.currentView.destroy();
    }

    // Mount new view
    this.currentTab = tabKey;
    const ViewClass = this.tabs[tabKey];

    const callbacks = {
      onOpenSimulator: (expId) => {
        window.location.hash = `simulator?exp=${expId || 'acid-base-titration'}`;
      },
      onNavigateTab: (targetTab, targetExp = null) => {
        window.location.hash = targetExp ? `${targetTab}?exp=${targetExp}` : targetTab;
      },
    };

    if (tabKey === 'simulator') {
      this.currentView = new ViewClass(this.container, initialParam || 'acid-base-titration', callbacks);
    } else if (tabKey === 'equipment' || tabKey === 'scanner') {
      this.currentView = new ViewClass(this.container, callbacks);
    } else {
      this.currentView = new ViewClass(this.container, initialParam);
    }

    this.currentView.mount();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new SmartLabApp();
  app.init();
});
