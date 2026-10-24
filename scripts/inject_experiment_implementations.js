const fs = require('fs');
const path = require('path');

const simJsPath = path.join(__dirname, '../simulator.js');
let simJs = fs.readFileSync(simJsPath, 'utf8');

// 1. Hook the 5 cases into renderWorkbenchApparatus
const apparatusSwitchAnchor = `    stage.innerHTML = \`
      <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">`;

if (!simJs.includes('if (expId === "acid-base-titration")')) {
  throw new Error('Could not find renderWorkbenchApparatus acid-base-titration condition');
}

// Check where chromatography finishes in renderWorkbenchApparatus
const chromEndAnchor = `          <text x="75" y="340" fill="#38bdf8" font-weight="600">Spotter Dropper [Click]</text>
        </g>
      </svg>
    \`;
  }`;

if (!simJs.includes(chromEndAnchor)) {
  throw new Error('Could not find chromatography end anchor in renderWorkbenchApparatus');
}

const newWorkbenchCases = `          <text x="75" y="340" fill="#38bdf8" font-weight="600">Spotter Dropper [Click]</text>
        </g>
      </svg>
    \`;
  } else if (expId === "ph-determination") {
    renderPhDeterminationSVG(stage);
  } else if (expId === "standard-solution-preparation") {
    renderStandardSolutionSVG(stage);
  } else if (expId === "simple-distillation") {
    renderDistillationSVG(stage);
  } else if (expId === "recrystallization") {
    renderRecrystallizationSVG(stage);
  } else if (expId === "ph-metric-titration") {
    renderPhMetricSVG(stage);
  }`;

simJs = simJs.replace(chromEndAnchor, newWorkbenchCases);
console.log('1. Wired 5 new experiment branches into renderWorkbenchApparatus().');

// 2. Implementation blocks for all 5 new experiments
const implementationsCode = `

// ==============================================================================
// EXPERIMENT 4: pH DETERMINATION IMPLEMENTATION
// ==============================================================================

function setPhMethod(method) {
  gameState.phDetermination.method = method;
  renderSceneControls(activeExperimentId);
}

function handlePhDeterminationAction(actionId, isMatch) {
  const g = gameState.phDetermination;

  if (actionId === "btn-method-paper" || actionId === "select_method") {
    setPhMethod("paper");
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "btn-method-meter") {
    setPhMethod("meter");
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "dip_test_paper" || actionId === "glass-stirring-rod" || actionId === "btn-dip-paper") {
    g.sampleDropletPlaced = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 1) advanceGameStep();
  } else if (actionId === "btn-dunk-stock" || actionId === "ph-indicator-paper") {
    if (!g.sampleDropletPlaced && gameState.stepIndex <= 1) {
      showMistake("Contamination mistake: Never immerse test paper strips directly into the main sample bottle! Transfer a droplet using a clean glass rod.");
    } else {
      selectApparatus("ph-indicator-paper");
    }
  } else if (actionId.startsWith("swatch-") || actionId === "match_color_chart") {
    const chosenVal = parseInt(actionId.replace("swatch-", ""), 10) || 3;
    if (chosenVal === 3 || chosenVal === 2 || chosenVal === 4) {
      g.matchedPh = 3.0;
      renderWorkbenchApparatus(activeExperimentId);
      if (gameState.stepIndex === 2) advanceGameStep();
    } else {
      showMistake(\`Color mismatch: Strip color is orange-red (~pH 3.0, acidic), whereas swatch \${chosenVal} represents a different pH band.\`);
    }
  } else if (actionId === "calibrate_meter" || actionId === "btn-calibrate-meter") {
    g.meterCalibrated = true;
    g.electrodeRinsed = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 3) advanceGameStep();
  } else if (actionId === "btn-skip-cal-test") {
    showMistake("Analytical error: Attempting to measure sample pH without first calibrating the meter against standard buffers yields uncalibrated, inaccurate readings.");
  } else if (actionId === "rinse_and_measure" || actionId === "btn-measure-sample" || actionId === "laboratory-ph-meter") {
    if (!g.meterCalibrated) {
      showMistake("Analytical error: Calibrate the pH meter with standard buffer solution first!");
    } else {
      g.digitalReading = 2.85;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 4) advanceGameStep();
    }
  } else if (actionId === "beaker") {
    selectApparatus("beaker");
  } else if (actionId === "wash-bottle") {
    selectApparatus("wash-bottle");
  }
}

function renderPhDeterminationControls(container) {
  const isPaper = (gameState.phDetermination.method === "paper");
  const samplePlaced = gameState.phDetermination.sampleDropletPlaced;
  const isCal = gameState.phDetermination.meterCalibrated;
  container.innerHTML = \`
    <div style="display:inline-flex; align-items:center; gap:0.4rem;">
      <button id="btn-method-paper" class="btn-scene-action-sm \${isPaper ? 'active' : ''}" onclick="setPhMethod('paper')">📄 Indicator Paper</button>
      <button id="btn-method-meter" class="btn-scene-action-sm \${!isPaper ? 'active' : ''}" onclick="setPhMethod('meter')">⚡ pH Meter</button>
    </div>
    \${isPaper ? \`
      <button id="btn-dip-paper" class="btn-scene-action" onclick="handleGameAction('dip_test_paper')">
        \${samplePlaced ? '✓ Sample Droplet Placed' : '🧪 Touch Droplet to Paper'}
      </button>
      <button id="btn-dunk-stock" class="btn-scene-action-sm" onclick="handleGameAction('btn-dunk-stock')" title="Test dunking whole strip">
        ⚠️ Dunk Strip in Stock
      </button>
      <div class="color-chart-strip" title="Click matching color band to estimate pH">
        <span style="font-size:0.75rem; color:#94a3b8; font-weight:600;">Chart:</span>
        \${[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(ph => {
          const colors = ['#ef4444','#f87171','#fb923c','#fbbf24','#fde047','#a3e635','#4ade80','#2dd4bf','#38bdf8','#60a5fa','#818cf8','#a78bfa','#c084fc','#a855f7'];
          const c = colors[ph-1];
          return \`<button class="chart-swatch" style="background:\${c};" onclick="handleGameAction('swatch-\${ph}')">\${ph}</button>\`;
        }).join('')}
      </div>
    \` : \`
      <button id="btn-calibrate-meter" class="btn-scene-action" onclick="handleGameAction('calibrate_meter')">
        \${isCal ? '✓ Electrode Calibrated (pH 7.0)' : '💧 Rinse & Calibrate Electrode'}
      </button>
      <button id="btn-measure-sample" class="btn-scene-action" onclick="handleGameAction('rinse_and_measure')">
        📊 Rinse & Measure Sample A
      </button>
      <button id="btn-skip-cal-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-skip-cal-test')">
        ⚠️ Measure Without Cal
      </button>
      <span class="digital-readout-pill" id="ph-digital-pill">pH: \${gameState.phDetermination.digitalReading ? gameState.phDetermination.digitalReading.toFixed(2) : (isCal ? '7.00 CAL' : '--.--')} (Illustrative)</span>
    \`}
  \`;
}

function renderPhDeterminationSVG(stage) {
  const g = gameState.phDetermination;
  const paperColor = g.sampleDropletPlaced ? "#fb923c" : "#fef08a";
  const meterVal = g.digitalReading ? g.digitalReading.toFixed(2) : (g.meterCalibrated ? "7.00" : "--.--");

  stage.innerHTML = \`
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <defs>
        <linearGradient id="beakerGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.35"/>
        </linearGradient>
      </defs>

      <!-- COLOR CHART HEADER (Interactive) -->
      <g transform="translate(140, 20)">
        <rect x="0" y="0" width="320" height="36" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <text x="10" y="22" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#94a3b8">Standard pH Chart (Estimate Only):</text>
        \${[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((ph, idx) => {
          const colors = ['#ef4444','#f87171','#fb923c','#fbbf24','#fde047','#a3e635','#4ade80','#2dd4bf','#38bdf8','#60a5fa','#818cf8','#a78bfa','#c084fc','#a855f7'];
          return \`<rect x="\${170 + idx * 10}" y="8" width="9" height="20" rx="1" fill="\${colors[idx]}" stroke="#1e293b"/>\`;
        }).join('')}
      </g>

      <!-- WATCH GLASS & TEST PAPER STRIP (Clickable) -->
      <g class="interactive-apparatus" data-item="ph-indicator-paper" onclick="onApparatusClick('ph-indicator-paper')" role="button" tabindex="0" aria-label="pH Indicator Paper">
        <ellipse cx="90" cy="360" rx="50" ry="16" fill="rgba(255,255,255,0.06)" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Indicator Paper Strip -->
        <rect id="anim-ph-paper-strip" x="75" y="320" width="28" height="70" rx="2" fill="\${paperColor}" stroke="#ca8a04" stroke-width="1"/>
        <text x="89" y="358" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#0f172a" text-anchor="middle">\${g.matchedPh ? '~3.0' : 'pH'}</text>
      </g>

      <!-- SAMPLE BEAKER (Clickable) -->
      <g class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Sample Beaker">
        <rect x="180" y="240" width="110" height="135" rx="4" fill="url(#beakerGrad)" stroke="#38bdf8" stroke-width="2"/>
        <rect x="183" y="275" width="104" height="97" fill="#38bdf8" opacity="0.4"/>
        <text x="235" y="325" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#f8fafc" text-anchor="middle">Sample A</text>
        <text x="235" y="340" font-family="Inter, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle">(Illustrative)</text>
      </g>

      <!-- GLASS STIRRING ROD (Clickable) -->
      <g class="interactive-apparatus" data-item="glass-stirring-rod" onclick="onApparatusClick('glass-stirring-rod')" role="button" tabindex="0" aria-label="Glass Stirring Rod">
        <line x1="160" y1="210" x2="220" y2="330" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
        <line x1="160" y1="210" x2="220" y2="330" stroke="#f8fafc" stroke-width="1.5" stroke-linecap="round"/>
      </g>

      <!-- LABORATORY pH METER BASE (Clickable) -->
      <g class="interactive-apparatus" data-item="laboratory-ph-meter" onclick="onApparatusClick('laboratory-ph-meter')" role="button" tabindex="0" aria-label="Laboratory pH Meter">
        <rect x="360" y="230" width="130" height="90" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <rect x="375" y="245" width="100" height="35" rx="3" fill="#020617" stroke="#334155"/>
        <text id="anim-ph-meter-display" x="425" y="268" font-family="Courier New, monospace" font-size="16" font-weight="700" fill="#38bdf8" text-anchor="middle">\${meterVal}</text>
        <circle cx="390" cy="298" r="6" fill="#22c55e"/>
        <circle cx="410" cy="298" r="6" fill="#0284c7"/>
        <text x="445" y="302" font-family="Inter, sans-serif" font-size="9" fill="#94a3b8">Cal / Mode</text>
      </g>

      <!-- COMBINATION ELECTRODE & STAND -->
      <g transform="translate(320, 180)">
        <rect x="0" y="0" width="8" height="150" rx="2" fill="#64748b"/>
        <line x1="-30" y1="40" x2="10" y2="40" stroke="#475569" stroke-width="4"/>
        <!-- Glass Electrode Body -->
        <rect x="-34" y="35" width="8" height="95" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
        <circle cx="-30" cy="132" r="4.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
      </g>

      <!-- WASH BOTTLE (Clickable) -->
      <g class="interactive-apparatus" data-item="wash-bottle" onclick="onApparatusClick('wash-bottle')" role="button" tabindex="0" aria-label="Wash Bottle">
        <rect x="510" y="260" width="45" height="110" rx="10" fill="#f8fafc" opacity="0.8" stroke="#94a3b8" stroke-width="1.5"/>
        <path d="M 525 260 L 525 235 Q 525 220 540 220 L 550 220" fill="none" stroke="#94a3b8" stroke-width="3"/>
      </g>

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="89" y="405" text-anchor="middle" fill="#facc15" font-weight="600">Indicator Paper</text>
        <text x="235" y="390" text-anchor="middle" fill="#38bdf8" font-weight="600">Sample Beaker</text>
        <text x="425" y="335" text-anchor="middle" fill="#2dd4bf" font-weight="600">Digital pH Meter</text>
        <text x="532" y="390" text-anchor="middle" fill="#94a3b8">Wash Bottle</text>
      </g>
    </svg>
  \`;
}

function applyPhDeterminationVisuals(p) {
  // Driven directly by state
}


// ==============================================================================
// EXPERIMENT 5: STANDARD SOLUTION PREPARATION IMPLEMENTATION
// ==============================================================================

function handleStandardSolutionAction(actionId, isMatch) {
  const g = gameState.standardSolution;

  if (actionId === "btn-tare-balance" || actionId === "analytical-balance") {
    g.balanceTared = true;
    g.massValue = "0.0000";
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
  } else if (actionId === "weigh_primary_standard" || actionId === "spatula" || actionId === "weighing-boat") {
    if (!g.balanceTared) {
      showMistake("Measurement error: Solid was added to the weighing boat without pressing Tare, introducing boat weight error.");
    } else {
      g.solidWeighed = true;
      g.massValue = "2.1200";
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 0) advanceGameStep();
    }
  } else if (actionId === "dissolve_in_beaker" || actionId === "beaker" || actionId === "glass-stirring-rod") {
    if (!g.solidWeighed) {
      showMistake("Weigh the solid on the analytical balance first!");
    } else {
      g.dissolvedInBeaker = true;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 1) advanceGameStep();
    }
  } else if (actionId === "btn-pour-direct-flask") {
    showMistake("Technique error: Never pour dry solid directly into a volumetric flask! Solid cakes in the narrow neck. Always dissolve in a beaker first.");
  } else if (actionId === "quantitative_transfer" || actionId === "volumetric-flask" || actionId === "glass-funnel") {
    if (!g.dissolvedInBeaker) {
      showMistake("Dissolve the solid completely in the beaker before transferring!");
    } else {
      g.funnelSeated = true;
      g.quantitativelyTransferred = true;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 2) advanceGameStep();
    }
  } else if (actionId === "fill_near_mark" || actionId === "wash-bottle") {
    if (!g.quantitativelyTransferred) {
      showMistake("Perform quantitative transfer of the dissolved solution first!");
    } else {
      g.filledNearMark = true;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 3) advanceGameStep();
    }
  } else if (actionId === "meniscus_drop" || actionId === "dropper") {
    g.meniscusLevel += 0.04;
    if (g.meniscusLevel > 1.05) {
      showMistake("Irreversible error: Meniscus rose above the etched calibration mark! The solution is over-diluted and concentration is ruined.");
    }
    renderWorkbenchApparatus(activeExperimentId);
  } else if (actionId === "meniscus_adjustment" || actionId === "btn-meniscus-lock") {
    if (g.meniscusLevel >= 0.94 && g.meniscusLevel <= 1.04) {
      g.meniscusLocked = true;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 4) advanceGameStep();
    } else if (g.meniscusLevel < 0.94) {
      showMistake("Keep adding drops! Meniscus has not yet reached the ring calibration line.");
    } else {
      showMistake("Meniscus overshot calibration mark! Discard and restart in real practice.");
    }
  } else if (actionId === "stopper_and_invert" || actionId === "btn-stopper-invert") {
    g.stoppered = true;
    g.invertedCount = Math.min(3, g.invertedCount + 1);
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (g.invertedCount >= 3 && gameState.stepIndex === 5) {
      advanceGameStep();
    }
  }
}

function renderStandardSolutionControls(container) {
  const g = gameState.standardSolution;
  container.innerHTML = \`
    <span class="digital-readout-pill" id="balance-mass-pill">Mass: \${g.massValue} g (Illustrative)</span>
    <button id="btn-tare-balance" class="btn-scene-action-sm \${g.balanceTared ? 'active' : ''}" onclick="handleGameAction('btn-tare-balance')">
      ⚖️ Tare Balance
    </button>
    <button id="btn-add-solid" class="btn-scene-action" onclick="handleGameAction('weigh_primary_standard')">
      🥄 Weigh Solid on Boat
    </button>
    <button id="btn-dissolve-beaker" class="btn-scene-action" onclick="handleGameAction('dissolve_in_beaker')">
      🥣 Dissolve in Beaker First
    </button>
    <button id="btn-pour-direct-flask" class="btn-scene-action-sm" onclick="handleGameAction('btn-pour-direct-flask')">
      ⚠️ Pour Solid into Flask
    </button>
    <button id="btn-quant-transfer" class="btn-scene-action" onclick="handleGameAction('quantitative_transfer')">
      🧪 Quantitative Transfer
    </button>
    <button id="btn-fill-near-mark" class="btn-scene-action-sm" onclick="handleGameAction('fill_near_mark')">
      💧 Fill Near Mark (~1 cm)
    </button>
    <button id="btn-meniscus-drop" class="btn-scene-action-sm" onclick="handleGameAction('meniscus_drop')">
      🔬 Add Drops
    </button>
    <button id="btn-meniscus-lock" class="btn-scene-action-sm" onclick="handleGameAction('meniscus_adjustment')">
      🎯 Align at Mark
    </button>
    <button id="btn-stopper-invert" class="btn-scene-action" onclick="handleGameAction('stopper_and_invert')">
      🔄 Stopper & Invert (\${g.invertedCount}/3)
    </button>
  \`;
}

function renderStandardSolutionSVG(stage) {
  const g = gameState.standardSolution;
  const flaskLiquidH = g.meniscusLocked ? 130 : (g.filledNearMark ? 115 : (g.quantitativelyTransferred ? 60 : 0));

  stage.innerHTML = \`
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <defs>
        <linearGradient id="flaskGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4"/>
        </linearGradient>
      </defs>

      <!-- ANALYTICAL BALANCE (Clickable) -->
      <g class="interactive-apparatus" data-item="analytical-balance" onclick="onApparatusClick('analytical-balance')" role="button" tabindex="0" aria-label="Analytical Balance">
        <rect x="40" y="210" width="140" height="160" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        <rect x="55" y="225" width="110" height="100" fill="rgba(56, 189, 248, 0.05)" stroke="#64748b"/>
        <!-- Balance Pan -->
        <rect x="85" y="305" width="50" height="6" rx="2" fill="#94a3b8"/>
        <!-- Digital Mass LED -->
        <rect x="55" y="335" width="110" height="24" rx="3" fill="#020617"/>
        <text x="110" y="352" font-family="Courier New, monospace" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">\${g.massValue} g</text>
        <!-- Weighing boat on pan -->
        <polygon points="92,305 128,305 133,296 87,296" fill="#f8fafc" opacity="0.9"/>
        \${g.solidWeighed ? \`<circle cx="110" cy="301" r="5" fill="#facc15"/>\` : ''}
      </g>

      <!-- SPATULA -->
      <g class="interactive-apparatus" data-item="spatula" onclick="onApparatusClick('spatula')" role="button" tabindex="0" aria-label="Spatula">
        <line x1="25" y1="365" x2="65" y2="365" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
        <polygon points="25,363 15,365 25,367" fill="#64748b"/>
      </g>

      <!-- DISSOLUTION BEAKER (Clickable) -->
      <g class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Dissolution Beaker">
        <rect x="210" y="260" width="95" height="110" rx="3" fill="url(#flaskGrad)" stroke="#38bdf8" stroke-width="2"/>
        \${g.dissolvedInBeaker ? \`<rect x="212" y="310" width="91" height="58" fill="#38bdf8" opacity="0.35"/>\` : ''}
        <!-- Glass stirring rod in beaker -->
        <line x1="230" y1="230" x2="275" y2="350" stroke="#f8fafc" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      </g>

      <!-- VOLUMETRIC FLASK (250 mL) (Clickable) -->
      <g class="interactive-apparatus" data-item="volumetric-flask" onclick="onApparatusClick('volumetric-flask')" role="button" tabindex="0" aria-label="Volumetric Flask">
        <!-- Neck -->
        <rect x="365" y="170" width="20" height="110" fill="url(#flaskGrad)" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Etched calibration mark at y=225 -->
        <line x1="362" y1="225" x2="388" y2="225" stroke="#ef4444" stroke-width="2"/>
        <!-- Pear-shaped bulb base -->
        <path d="M 365 280 C 340 310, 330 360, 345 370 L 405 370 C 420 360, 410 310, 385 280 Z" fill="url(#flaskGrad)" stroke="#38bdf8" stroke-width="2"/>
        <!-- Liquid in flask -->
        \${flaskLiquidH > 0 ? \`<path d="M 366 280 C 345 310, 335 360, 348 368 L 402 368 C 415 360, 405 310, 384 280 Z" fill="#38bdf8" opacity="0.4"/>\` : ''}
        \${flaskLiquidH >= 115 ? \`<rect x="367" y="\${370 - flaskLiquidH}" width="16" height="\${flaskLiquidH - 90}" fill="#38bdf8" opacity="0.45"/>\` : ''}
        <!-- Stopper -->
        \${g.stoppered ? \`<polygon points="370,170 380,170 383,150 367,150" fill="#94a3b8" stroke="#475569"/>\` : ''}
      </g>

      <!-- ZOOMED MENISCUS INSET (Visible during meniscus adjustment) -->
      <g transform="translate(430, 60)">
        <rect x="0" y="0" width="140" height="110" rx="5" fill="#090d16" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="70" y="18" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#38bdf8" text-anchor="middle">Meniscus View (Eye Level)</text>
        <!-- Zoomed neck walls -->
        <line x1="45" y1="28" x2="45" y2="100" stroke="#64748b" stroke-width="3"/>
        <line x1="95" y1="28" x2="95" y2="100" stroke="#64748b" stroke-width="3"/>
        <!-- Calibration Ring Mark -->
        <line x1="38" y1="65" x2="102" y2="65" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="3 2"/>
        <text x="105" y="68" font-family="Inter, sans-serif" font-size="8" fill="#ef4444">Mark</text>
        <!-- Curved Concave Meniscus -->
        <path d="M 45 \${85 - g.meniscusLevel * 20} Q 70 \${92 - g.meniscusLevel * 20} 95 \${85 - g.meniscusLevel * 20}" fill="none" stroke="#38bdf8" stroke-width="3"/>
      </g>

      <!-- DROPPER (Clickable) -->
      <g class="interactive-apparatus" data-item="dropper" onclick="onApparatusClick('dropper')" role="button" tabindex="0" aria-label="Dropper">
        <g transform="translate(450, 240) rotate(-30)">
          <rect x="0" y="15" width="7" height="50" rx="1" fill="#f8fafc" opacity="0.8" stroke="#38bdf8"/>
          <rect x="-2" y="0" width="11" height="16" rx="4" fill="#ef4444"/>
        </g>
      </g>

      <!-- WASH BOTTLE -->
      <g class="interactive-apparatus" data-item="wash-bottle" onclick="onApparatusClick('wash-bottle')" role="button" tabindex="0" aria-label="Wash Bottle">
        <rect x="515" y="270" width="45" height="100" rx="8" fill="#f8fafc" opacity="0.8" stroke="#94a3b8" stroke-width="1.5"/>
      </g>

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="110" y="388" text-anchor="middle" fill="#38bdf8" font-weight="600">Analytical Balance</text>
        <text x="257" y="388" text-anchor="middle" fill="#2dd4bf" font-weight="600">Dissolution Beaker</text>
        <text x="375" y="388" text-anchor="middle" fill="#facc15" font-weight="600">Volumetric Flask (250 mL)</text>
      </g>
    </svg>
  \`;
}

function applyStandardSolutionVisuals(p) {
  // Driven directly by state
}


// ==============================================================================
// EXPERIMENT 6: SIMPLE DISTILLATION IMPLEMENTATION
// ==============================================================================

function handleDistillationAction(actionId, isMatch) {
  const d = gameState.distillation;

  if (actionId === "assemble_glassware" || actionId === "distillation-apparatus" || actionId === "round-bottom-flask") {
    d.assembled = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "verify_open_system" || actionId === "thermometer") {
    d.openSystemVerified = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 1) advanceGameStep();
  } else if (actionId === "btn-seal-system-test") {
    showMistake("CATASTROPHIC HAZARD: Attempted to heat a closed/sealed distillation assembly! Thermal expansion will generate severe internal pressure and cause explosive glassware rupture.");
  } else if (actionId === "connect_cooling_water" || actionId === "condenser") {
    d.waterConnected = true;
    d.waterFlow = "correct";
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 2) advanceGameStep();
  } else if (actionId === "btn-water-wrong") {
    showMistake("Cooling defect: Connecting water in at the top causes water to run down one side leaving a large air pocket, drastically reducing condensation efficiency.");
  } else if (actionId === "apply_heat" || actionId === "hot-plate") {
    if (!d.waterConnected) {
      showMistake("Connect cooling water hoses before heating the distillation flask!");
    } else {
      d.heatingActive = true;
      d.tempC = 78;
      d.vaporRising = true;
      d.distillateDrops = 25;
      renderWorkbenchApparatus(activeExperimentId);
      renderSceneControls(activeExperimentId);
      if (gameState.stepIndex === 3) advanceGameStep();
    }
  } else if (actionId === "stop_before_dryness" || actionId === "btn-stop-heat") {
    d.heatingActive = false;
    d.stoppedBeforeDryness = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 4) advanceGameStep();
  } else if (actionId === "btn-dryness-test") {
    showMistake("Thermal hazard: Distilling to dryness causes severe overheating of the empty flask bottom, risking glass cracking and thermal ignition of concentrated peroxide residues.");
  } else if (actionId === "shutdown_sequence" || actionId === "btn-shutdown") {
    d.shutdownComplete = true;
    d.tempC = 25;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 5) advanceGameStep();
  }
}

function renderDistillationControls(container) {
  const d = gameState.distillation;
  container.innerHTML = \`
    <span class="temperature-readout-pill" id="distill-temp-pill">🌡️ \${d.tempC}°C (Illustrative)</span>
    <button id="btn-assemble-rig" class="btn-scene-action" onclick="handleGameAction('assemble_glassware')">
      🔧 \${d.assembled ? '✓ Rig Assembled' : 'Assemble Glassware & Stand'}
    </button>
    <button id="btn-check-open-vent" class="btn-scene-action-sm" onclick="handleGameAction('verify_open_system')">
      🔍 Verify Open Vent & Bulb
    </button>
    <button id="btn-seal-system-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-seal-system-test')">
      ⚠️ Seal Receiver Vent
    </button>
    <button id="btn-water-correct" class="btn-scene-action-sm \${d.waterConnected && d.waterFlow === 'correct' ? 'active' : ''}" onclick="handleGameAction('connect_cooling_water')">
      🌊 Water: In Bottom / Out Top
    </button>
    <button id="btn-water-wrong" class="btn-scene-action-sm" onclick="handleGameAction('btn-water-wrong')">
      ⚠️ Water: In Top / Out Bottom
    </button>
    <button id="btn-apply-heat" class="btn-scene-action" onclick="handleGameAction('apply_heat')">
      \${d.heatingActive ? '🔥 Heating Active (~78°C)' : '🔥 Turn On Hot Plate'}
    </button>
    <button id="btn-stop-heat" class="btn-scene-action-sm" onclick="handleGameAction('stop_before_dryness')">
      🛑 Stop Heat (~5 mL Left)
    </button>
    <button id="btn-dryness-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-dryness-test')">
      ⚠️ Distill to Complete Dryness
    </button>
    <button id="btn-shutdown" class="btn-scene-action-sm" onclick="handleGameAction('shutdown_sequence')">
      ❄️ Cool & Shutdown
    </button>
  \`;
}

function renderDistillationSVG(stage) {
  const d = gameState.distillation;

  stage.innerHTML = \`
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <defs>
        <linearGradient id="distillGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.35"/>
        </linearGradient>
      </defs>

      <!-- HOT PLATE BASE (Clickable) -->
      <g class="interactive-apparatus" data-item="hot-plate" onclick="onApparatusClick('hot-plate')" role="button" tabindex="0" aria-label="Hot Plate">
        <rect x="70" y="330" width="140" height="40" rx="4" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <rect x="75" y="325" width="130" height="8" rx="2" fill="\${d.heatingActive ? '#ef4444' : '#64748b'}"/>
        <circle cx="100" cy="350" r="7" fill="#020617"/>
        <circle cx="120" cy="350" r="4" fill="\${d.heatingActive ? '#ef4444' : '#334155'}"/>
      </g>

      <!-- ROUND-BOTTOM FLASK (Clickable) -->
      <g class="interactive-apparatus" data-item="round-bottom-flask" onclick="onApparatusClick('round-bottom-flask')" role="button" tabindex="0" aria-label="Round-Bottom Flask">
        <!-- Bulb -->
        <circle cx="140" cy="285" r="40" fill="url(#distillGlass)" stroke="#38bdf8" stroke-width="2"/>
        <!-- Liquid in flask -->
        <path d="M 103 295 A 40 40 0 0 0 177 295 Z" fill="#38bdf8" opacity="0.45"/>
        <!-- Boiling chips -->
        <circle cx="130" cy="315" r="3" fill="#0f172a"/>
        <circle cx="145" cy="318" r="2.5" fill="#0f172a"/>
        <circle cx="152" cy="312" r="3" fill="#0f172a"/>
        <!-- Flask neck -->
        <rect x="131" y="210" width="18" height="40" fill="url(#distillGlass)" stroke="#38bdf8" stroke-width="1.5"/>
      </g>

      <!-- DISTILLATION HEAD (Clickable) -->
      <g class="interactive-apparatus" data-item="distillation-apparatus" onclick="onApparatusClick('distillation-apparatus')" role="button" tabindex="0" aria-label="Distillation Apparatus">
        <path d="M 131 210 L 131 150 L 149 150 L 149 175 L 200 200 L 195 210 L 149 187 L 149 210 Z" fill="url(#distillGlass)" stroke="#38bdf8" stroke-width="1.5"/>
      </g>

      <!-- THERMOMETER (Clickable) -->
      <g class="interactive-apparatus" data-item="thermometer" onclick="onApparatusClick('thermometer')" role="button" tabindex="0" aria-label="Thermometer">
        <rect x="137" y="90" width="6" height="85" rx="3" fill="#f8fafc" opacity="0.9" stroke="#94a3b8"/>
        <!-- Red Mercury / Alcohol Column -->
        <line x1="140" y1="175" x2="140" y2="\${d.heatingActive ? '110' : '160'}" stroke="#ef4444" stroke-width="2"/>
        <circle cx="140" cy="175" r="3.5" fill="#ef4444"/>
      </g>

      <!-- LIEBIG CONDENSER (Clickable) -->
      <g class="interactive-apparatus" data-item="condenser" onclick="onApparatusClick('condenser')" role="button" tabindex="0" aria-label="Liebig Condenser">
        <!-- Outer Jacket -->
        <polygon points="198,198 335,275 345,260 208,183" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- Inner Vapor Tube -->
        <line x1="195" y1="205" x2="350" y2="290" stroke="#f8fafc" stroke-width="5" opacity="0.6"/>
        <!-- Water Nipple IN (Bottom, at x=330, y=285) -->
        <rect x="325" y="280" width="12" height="15" rx="2" fill="#0284c7"/>
        <text x="320" y="305" font-family="Inter, sans-serif" font-size="8" fill="#38bdf8">Water IN</text>
        <!-- Water Nipple OUT (Top, at x=210, y=175) -->
        <rect x="210" y="170" width="12" height="15" rx="2" fill="#0284c7"/>
        <text x="210" y="165" font-family="Inter, sans-serif" font-size="8" fill="#38bdf8">Water OUT</text>
      </g>

      <!-- VACUUM TAKEOFF ADAPTER WITH OPEN VENT -->
      <g transform="translate(345, 280)">
        <polygon points="0,5 20,20 12,25 0,12" fill="#38bdf8" opacity="0.3"/>
        <!-- Open Vent Nipple -->
        <line x1="8" y1="8" x2="15" y2="0" stroke="#38bdf8" stroke-width="2.5"/>
        <text x="18" y="2" font-family="Inter, sans-serif" font-size="8" fill="#22c55e" font-weight="700">Open Vent (Safe)</text>
      </g>

      <!-- RECEIVING CONICAL FLASK (Clickable) -->
      <g class="interactive-apparatus" data-item="conical-flask" onclick="onApparatusClick('conical-flask')" role="button" tabindex="0" aria-label="Receiving Flask">
        <polygon points="360,305 375,305 400,365 335,365" fill="url(#distillGlass)" stroke="#38bdf8" stroke-width="1.5"/>
        \${d.distillateDrops > 0 ? \`<polygon points="345,365 390,365 385,350 350,350" fill="#38bdf8" opacity="0.4"/>\` : ''}
      </g>

      <!-- VAPOR & CONDENSATE ANIMATION -->
      \${d.heatingActive ? \`
        <circle cx="140" cy="235" r="2" fill="#bae6fd" opacity="0.8"/>
        <circle cx="142" cy="190" r="2.5" fill="#bae6fd" opacity="0.8"/>
        <circle cx="240" cy="225" r="2" fill="#38bdf8" opacity="0.8"/>
        <circle cx="310" cy="265" r="2.5" fill="#38bdf8" opacity="0.8"/>
        <circle cx="367" cy="325" r="2" fill="#38bdf8"/>
      \` : ''}

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="140" y="388" text-anchor="middle" fill="#ef4444" font-weight="600">Boiling Flask on Hot Plate</text>
        <text x="270" y="225" text-anchor="middle" fill="#38bdf8" font-weight="600">Liebig Condenser</text>
        <text x="368" y="388" text-anchor="middle" fill="#2dd4bf" font-weight="600">Receiving Flask</text>
      </g>
    </svg>
  \`;
}

function applyDistillationVisuals(p) {
  // Driven directly by state
}


// ==============================================================================
// EXPERIMENT 7: RECRYSTALLIZATION IMPLEMENTATION
// ==============================================================================

function handleRecrystallizationAction(actionId, isMatch) {
  const r = gameState.recrystallization;

  if (actionId === "dissolve_minimal_solvent" || actionId === "conical-flask" || actionId === "hot-plate") {
    r.solventPortion = "minimal";
    r.solidDissolved = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "btn-solvent-excess-test") {
    showMistake("Dilution error: Adding too much solvent prevents saturation upon cooling! Crystals will fail to nucleate or yield will be severely compromised.");
  } else if (actionId === "hot_filtration" || actionId === "glass-funnel" || actionId === "filter-paper") {
    r.hotFiltered = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 1) advanceGameStep();
  } else if (actionId === "slow_cooling" || actionId === "btn-slow-cooling") {
    r.coolingMode = "slow";
    r.slowCoolingComplete = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 2) advanceGameStep();
  } else if (actionId === "btn-ice-plunge-test") {
    showMistake("Crystallization defect: Plunging hot solution directly into ice induces flash precipitation, trapping impure mother liquor in tiny irregular crystal aggregates.");
  } else if (actionId === "ice_bath_chill" || actionId === "beaker") {
    r.iceBathChilled = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 3) advanceGameStep();
  } else if (actionId === "vacuum_filtration_wash" || actionId === "buchner-funnel") {
    r.vacuumFiltered = true;
    r.coldWashed = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 4) advanceGameStep();
  } else if (actionId === "microscope_observation" || actionId === "microscope" || actionId === "watch-glass") {
    r.crystalsObserved = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 5) advanceGameStep();
  }
}

function renderRecrystallizationControls(container) {
  const r = gameState.recrystallization;
  container.innerHTML = \`
    <button id="btn-dissolve-minimal" class="btn-scene-action" onclick="handleGameAction('dissolve_minimal_solvent')">
      ☕ Dissolve in Minimal Hot Solvent
    </button>
    <button id="btn-solvent-excess-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-solvent-excess-test')">
      ⚠️ Add Excess Solvent
    </button>
    <button id="btn-hot-filter" class="btn-scene-action-sm" onclick="handleGameAction('hot_filtration')">
      ☕ Hot Gravity Filtration
    </button>
    <button id="btn-slow-cooling" class="btn-scene-action" onclick="handleGameAction('slow_cooling')">
      ⏳ Slow Cooling (Room Temp)
    </button>
    <button id="btn-ice-plunge-test" class="btn-scene-action-sm" onclick="handleGameAction('btn-ice-plunge-test')">
      ⚠️ Plunge Hot Flask into Ice
    </button>
    <button id="btn-ice-chill" class="btn-scene-action-sm" onclick="handleGameAction('ice_bath_chill')">
      🧊 Ice-Bath Chill (Max Yield)
    </button>
    <button id="btn-vacuum-filter" class="btn-scene-action" onclick="handleGameAction('vacuum_filtration_wash')">
      🌀 Suction Filter & Cold Wash
    </button>
    <button id="btn-view-microscope" class="btn-scene-action-sm" onclick="handleGameAction('microscope_observation')">
      🔬 Examine Crystal Habit
    </button>
  \`;
}

function renderRecrystallizationSVG(stage) {
  const r = gameState.recrystallization;

  stage.innerHTML = \`
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <!-- HOT PLATE & DISSOLUTION FLASK -->
      <g class="interactive-apparatus" data-item="hot-plate" onclick="onApparatusClick('hot-plate')" role="button" tabindex="0" aria-label="Hot Plate">
        <rect x="40" y="330" width="110" height="35" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
        <rect x="45" y="325" width="100" height="6" fill="#f59e0b"/>
      </g>
      <g class="interactive-apparatus" data-item="conical-flask" onclick="onApparatusClick('conical-flask')" role="button" tabindex="0" aria-label="Conical Dissolution Flask">
        <polygon points="80,240 110,240 135,325 55,325" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/>
        <polygon points="63,325 127,325 120,295 70,295" fill="#facc15" opacity="0.4"/>
      </g>

      <!-- HOT GRAVITY FILTRATION FUNNEL -->
      <g class="interactive-apparatus" data-item="glass-funnel" onclick="onApparatusClick('glass-funnel')" role="button" tabindex="0" aria-label="Hot Filtration Funnel">
        <polygon points="170,230 220,230 198,270 192,270" fill="rgba(255,255,255,0.15)" stroke="#38bdf8" stroke-width="1.5"/>
        <rect x="193" y="270" width="4" height="25" fill="#38bdf8" opacity="0.6"/>
        <!-- Fluted filter paper inside -->
        <polygon points="175,233 215,233 195,268" fill="#f8fafc" opacity="0.8"/>
      </g>

      <!-- ICE BATH BEAKER -->
      <g class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Ice Bath Beaker">
        <rect x="250" y="270" width="100" height="100" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="2"/>
        <rect x="253" y="295" width="94" height="72" fill="#bae6fd" opacity="0.45"/>
        <!-- Floating ice cubes -->
        <rect x="260" y="298" width="14" height="14" rx="2" fill="#f8fafc" stroke="#38bdf8"/>
        <rect x="285" y="302" width="15" height="15" rx="2" fill="#f8fafc" stroke="#38bdf8"/>
        <rect x="315" y="296" width="14" height="14" rx="2" fill="#f8fafc" stroke="#38bdf8"/>
      </g>

      <!-- BUCHNER FUNNEL & SUCTION FLASK -->
      <g class="interactive-apparatus" data-item="buchner-funnel" onclick="onApparatusClick('buchner-funnel')" role="button" tabindex="0" aria-label="Büchner Funnel">
        <polygon points="390,265 410,265 435,365 365,365" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/>
        <!-- Porcelain Buchner top cylinder -->
        <rect x="375" y="215" width="50" height="30" rx="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="375,245 425,245 403,265 397,265" fill="#f8fafc" stroke="#cbd5e1"/>
        <!-- Crystal cake on filter disc -->
        \${r.vacuumFiltered ? \`<rect x="380" y="238" width="40" height="6" fill="#fef08a"/>\` : ''}
      </g>

      <!-- MICROSCOPE OBSERVATION VIEWPORT (Top right) -->
      <g class="interactive-apparatus" data-item="microscope" onclick="onApparatusClick('microscope')" role="button" tabindex="0" aria-label="Microscope">
        <rect x="460" y="60" width="125" height="125" rx="6" fill="#020617" stroke="#38bdf8" stroke-width="2"/>
        <text x="522" y="80" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#38bdf8" text-anchor="middle">Microscope Field</text>
        <circle cx="522" cy="120" r="35" fill="#090d16" stroke="#475569"/>
        <!-- Pure sharp prismatic crystal needles -->
        \${r.slowCoolingComplete ? \`
          <polygon points="505,115 535,110 537,114 507,119" fill="#f8fafc" stroke="#38bdf8"/>
          <polygon points="515,100 528,135 531,134 518,99" fill="#f8fafc" stroke="#38bdf8"/>
          <polygon points="510,128 538,126 539,129 511,131" fill="#f8fafc" stroke="#38bdf8"/>
        \` : \`
          <circle cx="520" cy="118" r="3" fill="#facc15"/>
          <circle cx="525" cy="123" r="2.5" fill="#facc15"/>
        \`}
      </g>

      <!-- WATCH GLASS DRYING DISH -->
      <g class="interactive-apparatus" data-item="watch-glass" onclick="onApparatusClick('watch-glass')" role="button" tabindex="0" aria-label="Watch Glass">
        <ellipse cx="510" cy="345" rx="45" ry="14" fill="rgba(255,255,255,0.08)" stroke="#38bdf8" stroke-width="1.5"/>
        \${r.vacuumFiltered ? \`<ellipse cx="510" cy="343" rx="20" ry="6" fill="#fef08a"/>\` : ''}
      </g>

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="95" y="385" text-anchor="middle" fill="#facc15" font-weight="600">Dissolution Flask</text>
        <text x="195" y="385" text-anchor="middle" fill="#38bdf8">Hot Filtration</text>
        <text x="300" y="385" text-anchor="middle" fill="#2dd4bf" font-weight="600">Ice Bath</text>
        <text x="400" y="385" text-anchor="middle" fill="#f8fafc" font-weight="600">Büchner Funnel</text>
      </g>
    </svg>
  \`;
}

function applyRecrystallizationVisuals(p) {
  // Driven directly by state
}


// ==============================================================================
// EXPERIMENT 8: pH-METRIC TITRATION IMPLEMENTATION
// ==============================================================================

function handlePhMetricAction(actionId, isMatch) {
  const p = gameState.phMetric;

  if (actionId === "calibrate_and_assemble" || actionId === "laboratory-ph-meter" || actionId === "btn-calibrate-electrode") {
    p.calibrated = true;
    p.electrodePositioned = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 0) advanceGameStep();
  } else if (actionId === "record_initial_ph" || actionId === "btn-baseline-ph") {
    p.volumeAdded = 0.0;
    p.currentPh = 2.80;
    p.dataPoints = [{ v: 0.0, ph: 2.80 }];
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 1) advanceGameStep();
  } else if (actionId === "titrate_buffer_region" || actionId === "btn-add-2ml") {
    p.volumeAdded = Math.min(18.0, p.volumeAdded + 2.0);
    // Sigmoidal buffer formula: pH rises gently from 2.80 to ~4.80
    p.currentPh = 2.80 + (p.volumeAdded / 22.4) * 2.2;
    p.dataPoints.push({ v: p.volumeAdded, ph: p.currentPh });
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (p.volumeAdded >= 16.0 && gameState.stepIndex === 2) {
      advanceGameStep();
    }
  } else if (actionId === "dropwise_steep_region" || actionId === "btn-add-02ml") {
    p.volumeAdded = Math.min(26.0, p.volumeAdded + 0.5);
    // Steep sigmoidal transition
    const sigmoid = 1 / (1 + Math.exp(-(p.volumeAdded - 22.4) * 1.8));
    p.currentPh = 3.5 + sigmoid * 7.5;
    p.dataPoints.push({ v: p.volumeAdded, ph: p.currentPh });
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (p.volumeAdded >= 23.5 && gameState.stepIndex === 3) {
      advanceGameStep();
    }
  } else if (actionId === "btn-add-5ml-jump") {
    showMistake("Analytical flaw: Delivered a large 5.0 mL jump directly across the steep inflection region! In pH-metric titration, large increments obscure the inflection point, making accurate equivalence volume determination impossible.");
  } else if (actionId === "identify_equivalence_point" || actionId === "btn-mark-eq" || actionId === "ph-curve-graph") {
    p.equivalenceMarked = true;
    renderWorkbenchApparatus(activeExperimentId);
    renderSceneControls(activeExperimentId);
    if (gameState.stepIndex === 4) advanceGameStep();
  } else if (actionId === "burette" || actionId === "beaker" || actionId === "magnetic-stirrer") {
    selectApparatus(actionId);
  }
}

function renderPhMetricControls(container) {
  const p = gameState.phMetric;
  container.innerHTML = \`
    <span class="digital-readout-pill" id="ph-metric-pill">pH: \${p.currentPh.toFixed(2)} | V: \${p.volumeAdded.toFixed(1)} mL (Illustrative)</span>
    <button id="btn-calibrate-electrode" class="btn-scene-action" onclick="handleGameAction('calibrate_and_assemble')">
      ⚡ \${p.calibrated ? '✓ Calibrated & Lowered' : 'Calibrate & Position Electrode'}
    </button>
    <button id="btn-baseline-ph" class="btn-scene-action-sm" onclick="handleGameAction('record_initial_ph')">
      📍 Record Baseline (0.0 mL)
    </button>
    <button id="btn-add-2ml" class="btn-scene-action" onclick="handleGameAction('titrate_buffer_region')">
      💧 Add 2.0 mL (Buffer Zone)
    </button>
    <button id="btn-add-02ml" class="btn-scene-action" onclick="handleGameAction('dropwise_steep_region')">
      💧 Add 0.5 mL (Dropwise Steep Zone)
    </button>
    <button id="btn-add-5ml-jump" class="btn-scene-action-sm" onclick="handleGameAction('btn-add-5ml-jump')">
      ⚠️ Add 5.0 mL Jump in Steep Zone
    </button>
    <button id="btn-mark-eq" class="btn-scene-action" onclick="handleGameAction('identify_equivalence_point')">
      🎯 Mark Equivalence Point
    </button>
  \`;
}

function renderPhMetricSVG(stage) {
  const p = gameState.phMetric;

  // Generate SVG path for live titration curve
  const pointsStr = p.dataPoints.map(pt => {
    const x = 360 + (pt.v / 30.0) * 190;
    const y = 200 - (pt.ph / 14.0) * 140;
    return \`\${x.toFixed(1)},\${y.toFixed(1)}\`;
  }).join(' ');

  stage.innerHTML = \`
    <svg viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="touch-action: none;">
      <!-- BURETTE & RETORT STAND (Left) -->
      <g class="interactive-apparatus" data-item="retort-stand" onclick="onApparatusClick('retort-stand')" role="button" tabindex="0" aria-label="Retort Stand">
        <rect x="40" y="360" width="140" height="25" rx="3" fill="#475569" stroke="#334155"/>
        <rect x="80" y="40" width="10" height="320" rx="2" fill="#64748b"/>
      </g>
      <g class="interactive-apparatus" data-item="burette" onclick="onApparatusClick('burette')" role="button" tabindex="0" aria-label="Burette">
        <rect x="140" y="60" width="18" height="200" rx="3" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="1.5"/>
        <rect x="142" y="80" width="14" height="175" fill="#38bdf8" opacity="0.6"/>
        <circle cx="149" cy="265" r="4" fill="#0284c7"/>
      </g>

      <!-- MAGNETIC STIRRER & BEAKER -->
      <g class="interactive-apparatus" data-item="magnetic-stirrer" onclick="onApparatusClick('magnetic-stirrer')" role="button" tabindex="0" aria-label="Magnetic Stirrer">
        <rect x="100" y="340" width="120" height="35" rx="4" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <circle cx="120" cy="358" r="6" fill="#020617"/>
      </g>
      <g class="interactive-apparatus" data-item="beaker" onclick="onApparatusClick('beaker')" role="button" tabindex="0" aria-label="Analyte Beaker">
        <rect x="110" y="260" width="100" height="80" rx="3" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="2"/>
        <rect x="113" y="285" width="94" height="53" fill="#38bdf8" opacity="0.35"/>
        <!-- Spinning stir bar -->
        <rect x="148" y="332" width="24" height="4" rx="2" fill="#f8fafc" stroke="#64748b"/>
      </g>

      <!-- GLASS pH ELECTRODE SUSPENDED IN BEAKER -->
      <g class="interactive-apparatus" data-item="laboratory-ph-meter" onclick="onApparatusClick('laboratory-ph-meter')" role="button" tabindex="0" aria-label="pH Electrode">
        <rect x="175" y="190" width="7" height="120" rx="2" fill="#e2e8f0" stroke="#64748b"/>
        <circle cx="178.5" cy="312" r="4.5" fill="#38bdf8" stroke="#0284c7"/>
      </g>

      <!-- DIGITAL pH METER CONSOLE (Center-bottom) -->
      <g transform="translate(230, 310)">
        <rect x="0" y="0" width="100" height="65" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <rect x="10" y="10" width="80" height="25" rx="2" fill="#020617"/>
        <text x="50" y="27" font-family="Courier New, monospace" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">\${p.currentPh.toFixed(2)}</text>
        <text x="50" y="52" font-family="Inter, sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle">pH Meter</text>
      </g>

      <!-- LIVE TITRATION CURVE GRAPH (Top-right) -->
      <g id="ph-curve-graph" onclick="handleGameAction('identify_equivalence_point')" style="cursor:pointer;">
        <!-- Graph Box -->
        <rect x="340" y="45" width="240" height="185" rx="5" fill="#090d16" stroke="#1e293b" stroke-width="1.5"/>
        <text x="460" y="62" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">Live Sigmoidal pH Curve</text>
        <!-- Axes -->
        <line x1="360" y1="200" x2="560" y2="200" stroke="#475569" stroke-width="1.5"/>
        <line x1="360" y1="200" x2="360" y2="70" stroke="#475569" stroke-width="1.5"/>
        <!-- Labels -->
        <text x="560" y="214" font-family="Inter, sans-serif" font-size="8" fill="#94a3b8" text-anchor="end">Volume (mL)</text>
        <text x="355" y="75" font-family="Inter, sans-serif" font-size="8" fill="#94a3b8" text-anchor="end">pH 14</text>
        <text x="355" y="135" font-family="Inter, sans-serif" font-size="8" fill="#94a3b8" text-anchor="end">pH 7</text>
        <!-- pH 7 Neutral Guideline -->
        <line x1="360" y1="130" x2="560" y2="130" stroke="#334155" stroke-dasharray="2 2"/>
        
        <!-- Plotted Curve -->
        \${p.dataPoints.length > 1 ? \`<polyline points="\${pointsStr}" fill="none" stroke="#38bdf8" stroke-width="2.5"/>\` : ''}

        <!-- Plotted Points -->
        \${p.dataPoints.map(pt => {
          const x = 360 + (pt.v / 30.0) * 190;
          const y = 200 - (pt.ph / 14.0) * 140;
          return \`<circle cx="\${x.toFixed(1)}" cy="\${y.toFixed(1)}" r="3" fill="#2dd4bf"/>\`;
        }).join('')}

        <!-- Equivalence Point Marker -->
        \${p.equivalenceMarked ? \`
          <circle cx="502" cy="116" r="6" fill="#f43f5e" stroke="#fff" stroke-width="2"/>
          <text x="502" y="105" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#f43f5e" text-anchor="middle">V_eq (22.4 mL)</text>
        \` : ''}
      </g>

      <!-- LABELS -->
      <g font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">
        <text x="149" y="45" text-anchor="middle" fill="#38bdf8" font-weight="600">Burette Titrant</text>
        <text x="160" y="388" text-anchor="middle" fill="#2dd4bf" font-weight="600">Stirred Analyte</text>
      </g>
    </svg>
  \`;
}

function applyPhMetricVisuals(p) {
  // Driven directly by state
}
`;

simJs += implementationsCode;

fs.writeFileSync(simJsPath, simJs, 'utf8');
console.log('Successfully injected all 5 experiment scenes, action handlers, controls, and SVG renderers into simulator.js!');
