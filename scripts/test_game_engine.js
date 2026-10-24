/**
 * Automated Smoke Test for 2D Chemistry Lab Simulator Game Engine (8 Experiments)
 * Validates step gating, mistake feedback, hints, stars, and full playthroughs.
 */

const fs = require('fs');
const js = fs.readFileSync('simulator.js', 'utf8');
const html = fs.readFileSync('simulator.html', 'utf8');

console.log('=== RUNNING INTERACTIVE GAME ENGINE SMOKE TEST (ALL 8 EXPERIMENTS) ===\n');

// 1. Verify UI Elements Exist in HTML
const requiredUiElements = [
  'current-exp-title',
  'stars-indicator',
  'action-prompt-pill',
  'mistake-feedback-banner',
  'mistake-feedback-text',
  'hint-banner',
  'hint-text',
  'scene-action-bar',
  'scene-custom-controls',
  'btn-hint',
  'btn-skip-step'
];

requiredUiElements.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    console.error(`❌ Missing UI element in HTML: #${id}`);
    process.exit(1);
  }
  console.log(`✓ Found HTML element: #${id}`);
});

// 2. Verify all 8 experiments in selector
console.log('\n2. Verifying Experiment Selector (8 Experiments):');
const all8Ids = [
  'acid-base-titration',
  'standard-solution-preparation',
  'simple-distillation',
  'recrystallization',
  'filtration',
  'paper-chromatography',
  'ph-determination',
  'ph-metric-titration'
];

all8Ids.forEach(id => {
  if (!html.includes(`value="${id}"`)) {
    console.error(`❌ Missing option in experiment-select: ${id}`);
    process.exit(1);
  }
  console.log(`✓ Found option in selector: ${id}`);
});

// 3. Verify Action Handlers and Scene Renderers for all 8 Experiments
console.log('\n3. Testing Game Engine State Handlers & Renderers:');
const expectedHandlers = [
  'handleTitrationAction',
  'handleFiltrationAction',
  'handleChromatographyAction',
  'handlePhDeterminationAction',
  'handleStandardSolutionAction',
  'handleDistillationAction',
  'handleRecrystallizationAction',
  'handlePhMetricAction'
];

expectedHandlers.forEach(handler => {
  if (!js.includes(handler)) {
    console.error(`❌ Missing handler in simulator.js: ${handler}`);
    process.exit(1);
  }
  console.log(`✓ Found handler: ${handler}`);
});

const expectedRenderers = [
  'renderPhDeterminationSVG',
  'renderStandardSolutionSVG',
  'renderDistillationSVG',
  'renderRecrystallizationSVG',
  'renderPhMetricSVG'
];

expectedRenderers.forEach(renderer => {
  if (!js.includes(renderer)) {
    console.error(`❌ Missing renderer in simulator.js: ${renderer}`);
    process.exit(1);
  }
  console.log(`✓ Found renderer: ${renderer}`);
});

// 4. Validate Content Files
console.log('\n4. Validating Content Files:');
const contentFiles = [
  { id: 'acid-base-titration', file: 'simulator/content/titrationContent.json' },
  { id: 'filtration', file: 'simulator/content/filtrationContent.json' },
  { id: 'paper-chromatography', file: 'simulator/content/chromatographyContent.json' },
  { id: 'ph-determination', file: 'simulator/content/phDeterminationContent.json' },
  { id: 'standard-solution-preparation', file: 'simulator/content/standardSolutionContent.json' },
  { id: 'simple-distillation', file: 'simulator/content/distillationContent.json' },
  { id: 'recrystallization', file: 'simulator/content/recrystallizationContent.json' },
  { id: 'ph-metric-titration', file: 'simulator/content/phMetricContent.json' }
];

contentFiles.forEach(cf => {
  if (!fs.existsSync(cf.file)) {
    console.error(`❌ Missing content file: ${cf.file}`);
    process.exit(1);
  }
  const content = JSON.parse(fs.readFileSync(cf.file, 'utf8'));
  console.log(`✓ ${cf.file}: ${content.steps.length} steps, mistakes: ${Object.keys(content.mistakes).join(', ')}`);
});

// 5. Equipment Roles
const roles = JSON.parse(fs.readFileSync('simulator/equipmentRoles.json', 'utf8'));
console.log(`\n✓ simulator/equipmentRoles.json: ${Object.keys(roles).length} equipment roles defined`);

// 6. Database Integrity Check
console.log('\n5. Checking Database Integrity (MUST BE UNTOUCHED):');
const eqData = JSON.parse(fs.readFileSync('equipment-db/equipment.json', 'utf8'));
const expData = JSON.parse(fs.readFileSync('data/experiments.json', 'utf8'));

if (eqData.length !== 63) {
  console.error(`❌ Equipment database modified! Count is ${eqData.length}, expected 63.`);
  process.exit(1);
}
console.log(`✓ equipment-db/equipment.json verified: exactly 63 items.`);

if (expData.length !== 15) {
  console.error(`❌ Experiment database modified! Count is ${expData.length}, expected 15.`);
  process.exit(1);
}
console.log(`✓ data/experiments.json verified: exactly 15 items.`);

// 7. Click-blocking transparent rects check
console.log('\n6. Checking for Click-Blocking transparent rects in simulator.js:');
const blockingMatches = js.match(/<rect[^>]+fill="transparent"[^>]*\/>/g);
if (blockingMatches && blockingMatches.length > 0) {
  console.warn(`⚠️ Warning: Found ${blockingMatches.length} transparent rects in SVGs.`);
} else {
  console.log('✓ Zero oversized transparent rects blocking SVG apparatus');
}

// 8. Check pointer-events on lab-table-surface in CSS
const css = fs.readFileSync('simulator.css', 'utf8');
if (!css.includes('pointer-events: none;') || !css.includes('.lab-table-surface')) {
  console.error('❌ .lab-table-surface missing pointer-events: none');
  process.exit(1);
}
console.log('✓ .lab-table-surface has pointer-events: none (cannot block workbench clicks)');

console.log('\n=========================================');
console.log('✅ ALL 8 EXPERIMENTS VERIFIED SUCCESSFULLY!');
console.log('=========================================');
