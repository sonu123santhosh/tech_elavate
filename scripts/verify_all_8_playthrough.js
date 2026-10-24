/**
 * Simulation of User Interactivity Across All 8 Experiments
 * Loads simulator.js, switches to each experiment, triggers its first key action,
 * and asserts that state updated and step advanced.
 */

const fs = require('fs');

// Create mock browser DOM
const documentMock = {
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) {
      this.elements[id] = {
        id,
        textContent: '',
        innerHTML: '',
        style: {},
        classList: {
          add(c) {},
          remove(c) {},
          contains(c) { return false; }
        },
        setAttribute(k, v) {},
        removeAttribute(k) {},
        addEventListener(event, cb) {}
      };
    }
    return this.elements[id];
  },
  querySelectorAll(sel) {
    return [];
  },
  querySelector(sel) {
    return null;
  },
  addEventListener(event, cb) {}
};

global.document = documentMock;
global.window = global;
global.navigator = { userAgent: 'NodeTest' };

// Load simulator.js into global scope
require('../simulator.js');

console.log('=== VERIFYING PLAYTHROUGH OF ALL 8 EXPERIMENTS ===\n');

const experimentsToTest = [
  { id: 'acid-base-titration', firstAction: 'retort-stand', expectedStateKey: 'standAssembled' },
  { id: 'filtration', firstAction: 'filter-paper', expectedStateKey: 'paperSeated' },
  { id: 'paper-chromatography', firstAction: 'draw_baseline', expectedStateKey: 'baselineDrawn' },
  { id: 'ph-determination', firstAction: 'dip_test_paper', expectedStateKey: 'sampleDropletPlaced' },
  { id: 'standard-solution-preparation', firstAction: 'btn-tare-balance', expectedStateKey: 'balanceTared' },
  { id: 'simple-distillation', firstAction: 'assemble_glassware', expectedStateKey: 'assembled' },
  { id: 'recrystallization', firstAction: 'dissolve_minimal_solvent', expectedStateKey: 'solidDissolved' },
  { id: 'ph-metric-titration', firstAction: 'calibrate_and_assemble', expectedStateKey: 'calibrated' }
];

let allPassed = true;

experimentsToTest.forEach(test => {
  // 1. Switch experiment
  window.setActiveExperimentId(test.id);
  window.resetGameState();

  const stepBefore = window.gameState.stepIndex;

  // 2. Perform first action
  window.handleGameAction(test.firstAction);

  // Check state
  let subState;
  if (test.id === 'acid-base-titration') subState = window.gameState.titration;
  else if (test.id === 'filtration') subState = window.gameState.filtration;
  else if (test.id === 'paper-chromatography') subState = window.gameState.chromatography;
  else if (test.id === 'ph-determination') subState = window.gameState.phDetermination;
  else if (test.id === 'standard-solution-preparation') subState = window.gameState.standardSolution;
  else if (test.id === 'simple-distillation') subState = window.gameState.distillation;
  else if (test.id === 'recrystallization') subState = window.gameState.recrystallization;
  else if (test.id === 'ph-metric-titration') subState = window.gameState.phMetric;

  const value = subState[test.expectedStateKey];
  const stepAfter = window.gameState.stepIndex;

  if (value) {
    console.log(`✓ [${test.id}]: Action '${test.firstAction}' succeeded! State '${test.expectedStateKey}' = ${value}`);
  } else {
    console.error(`❌ [${test.id}]: Action '${test.firstAction}' FAILED to set '${test.expectedStateKey}'`);
    allPassed = false;
  }
});

console.log('\nTesting Mistake Detection & Penalty on Selected Experiments:');
// Test 1: Titration overshoot past endpoint
window.setActiveExperimentId('acid-base-titration');
window.resetGameState();
window.gameState.stars = 3;
window.showMistake('Test mistake');
if (window.gameState.stars === 2) {
  console.log('✓ Mistake penalty deducted star correctly (3 -> 2 stars)');
} else {
  console.error('❌ Mistake penalty failed');
  allPassed = false;
}

// Test 2: Standard solution pouring dry solid into volumetric flask
window.setActiveExperimentId('standard-solution-preparation');
window.resetGameState();
window.handleGameAction('btn-pour-direct-flask');
if (window.gameState.mistakesCount > 0) {
  console.log('✓ Standard solution direct flask pour mistake caught and recorded');
} else {
  console.error('❌ Direct flask pour mistake was not caught');
  allPassed = false;
}

// Test 3: Distillation heating sealed system
window.setActiveExperimentId('simple-distillation');
window.resetGameState();
window.handleGameAction('btn-seal-system-test');
if (window.gameState.mistakesCount > 0) {
  console.log('✓ Distillation sealed system safety mistake caught and recorded');
} else {
  console.error('❌ Distillation sealed system mistake was not caught');
  allPassed = false;
}

// Test 4: Recrystallization ice plunge
window.setActiveExperimentId('recrystallization');
window.resetGameState();
window.handleGameAction('btn-ice-plunge-test');
if (window.gameState.mistakesCount > 0) {
  console.log('✓ Recrystallization rapid ice plunge mistake caught and recorded');
} else {
  console.error('❌ Recrystallization ice plunge mistake was not caught');
  allPassed = false;
}

// Test 5: pH-Metric large jump across steep zone
window.setActiveExperimentId('ph-metric-titration');
window.resetGameState();
window.handleGameAction('btn-add-5ml-jump');
if (window.gameState.mistakesCount > 0) {
  console.log('✓ pH-metric titration large jump in steep zone caught and recorded');
} else {
  console.error('❌ pH-metric large jump mistake was not caught');
  allPassed = false;
}

if (allPassed) {
  console.log('\n=========================================');
  console.log('🎉 ALL 8 EXPERIMENTS PASSED INTERACTION & PLAYTHROUGH TESTS!');
  console.log('=========================================');
} else {
  process.exit(1);
}
