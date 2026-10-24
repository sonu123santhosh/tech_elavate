import './styles/main.css';
import './styles/experiments.css';
import './styles/chat.css';
import './styles/arQuiz.css';
import './styles/virtualLab.css';

import { PhTitrationView } from './features/ph-titration/PhTitrationView.js';
import { ConductometricView } from './features/conductometric-titration/ConductometricView.js';
import { ChatAssistantView } from './features/ai-assistant/ChatAssistantView.js';
import { ArQuizController } from './features/ar-quiz/ArQuizController.js';
import { VirtualLabController } from './features/virtual-lab/VirtualLabController.js';

class SmartLabApp {
  constructor() {
    this.currentView = null;
    this.currentTab = 'experiments';
    this.container = document.getElementById('view-root');
    this.tabs = {
      experiments: VirtualLabController,
      'ar-quiz': ArQuizController,
      chat: ChatAssistantView,
    };
  }

  init() {
    this.attachNavListeners();

    // Check initial hash
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash === 'ph' || initialHash === 'ph-metric-titration') {
      this.switchTab('experiments', 'ph-metric-titration');
    } else if (initialHash === 'conductometric' || initialHash === 'conductometric-titration') {
      this.switchTab('experiments', 'conductometric-titration');
    } else if (this.tabs[initialHash]) {
      this.switchTab(initialHash);
    } else {
      this.switchTab('experiments');
    }

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'ph' || hash === 'ph-metric-titration') {
        this.switchTab('experiments', 'ph-metric-titration');
      } else if (hash === 'conductometric' || hash === 'conductometric-titration') {
        this.switchTab('experiments', 'conductometric-titration');
      } else if (this.tabs[hash] && hash !== this.currentTab) {
        this.switchTab(hash);
      }
    });
  }

  attachNavListeners() {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const tabKey = e.currentTarget.dataset.tab;
        if (tabKey && this.tabs[tabKey]) {
          window.location.hash = tabKey;
          this.switchTab(tabKey);
        }
      });
    });
  }

  switchTab(tabKey, initialExperimentId = null) {
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
    this.currentView = new ViewClass(this.container, initialExperimentId);
    this.currentView.mount();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new SmartLabApp();
  app.init();
});
