const fs = require('fs');
const path = require('path');

const expDb = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/experiments.json'), 'utf8'));
const simJsPath = path.join(__dirname, '../simulator.js');
let simJs = fs.readFileSync(simJsPath, 'utf8');

// Target experiment IDs
const newExpIds = [
  'ph-determination',
  'standard-solution-preparation',
  'simple-distillation',
  'recrystallization',
  'ph-metric-titration'
];

// Extract experiment objects
const newExps = {};
newExpIds.forEach(id => {
  const e = expDb.find(x => x.id === id);
  if (!e) throw new Error('Experiment not found in DB: ' + id);
  newExps[id] = e;
});

// Load content files
const phDetContent = JSON.parse(fs.readFileSync(path.join(__dirname, '../simulator/content/phDeterminationContent.json'), 'utf8'));
const stdSolContent = JSON.parse(fs.readFileSync(path.join(__dirname, '../simulator/content/standardSolutionContent.json'), 'utf8'));
const distContent = JSON.parse(fs.readFileSync(path.join(__dirname, '../simulator/content/distillationContent.json'), 'utf8'));
const recrystContent = JSON.parse(fs.readFileSync(path.join(__dirname, '../simulator/content/recrystallizationContent.json'), 'utf8'));
const phMetricContent = JSON.parse(fs.readFileSync(path.join(__dirname, '../simulator/content/phMetricContent.json'), 'utf8'));

// 1. INJECT INTO SIMULATOR_EXPERIMENTS (at end of paper-chromatography)
let expsJsonStr = '';
newExpIds.forEach(id => {
  expsJsonStr += `,\n  "${id}": ` + JSON.stringify(newExps[id], null, 2);
});

// Find insertion point in SIMULATOR_EXPERIMENTS
const expAnchor = '    ]\n  }\n};';
if (!simJs.includes(expAnchor)) {
  throw new Error('Could not find SIMULATOR_EXPERIMENTS closing anchor');
}
simJs = simJs.replace(expAnchor, `    ]\n  }${expsJsonStr}\n};`);
console.log('1. Injected 5 experiments into SIMULATOR_EXPERIMENTS.');

// 2. INJECT INTO APPARATUS_METADATA
const metaAnchor = '      "safety": "Never use ink pens; commercial pen inks contain soluble dyes that will dissolve in developing solvents and ruin the chromatogram."\n    }\n  }\n};';
if (!simJs.includes(metaAnchor)) {
  throw new Error('Could not find APPARATUS_METADATA closing anchor');
}

const newApparatusMeta = `,\n  "ph-determination": {
    "ph-indicator-paper": {
      "name": "pH Indicator Paper",
      "dbId": "ph-indicator-paper",
      "isProp": false,
      "purpose": "Impregnated paper strips that change color depending on solution acidity or alkalinity for rapid semi-quantitative pH testing.",
      "role": "Provides quick estimation of solution pH by matching strip color against standard calibrated reference chart.",
      "safety": "Handle strips with dry forceps or by clean dry edges; never touch wet chemical paper with bare fingers."
    },
    "ph-indicator-solution": {
      "name": "pH Indicator Solution",
      "dbId": "ph-indicator-solution",
      "isProp": false,
      "purpose": "Aqueous or alcoholic dye mixtures exhibiting distinct color transitions across defined pH ranges.",
      "role": "Added in small drop quantities to sample solutions to visually identify acid/base transitions.",
      "safety": "Keep indicator bottles tightly capped away from open flames and heat sources."
    },
    "laboratory-ph-meter": {
      "name": "Laboratory pH Meter",
      "dbId": "laboratory-ph-meter",
      "isProp": false,
      "purpose": "High-precision benchtop potentiometric instrument measuring hydronium ion activity with a glass combination electrode.",
      "role": "Provides exact electrometric pH readings following standard two-point buffer calibration.",
      "safety": "Keep glass electrode bulb hydrated in 3M KCl storage solution; never allow membrane to dry out."
    },
    "beaker": {
      "name": "Sample Beaker",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Holds illustrative sample solution (Sample A) for pH determination and testing.",
      "safety": "Inspect glassware for cracks; dispose of tested samples into designated chemical waste."
    },
    "wash-bottle": {
      "name": "Wash Bottle",
      "dbId": "wash-bottle",
      "isProp": false,
      "purpose": "Dispenses controlled streams of distilled water to rinse glassware walls, burette tips, and electrodes.",
      "role": "Rinses combination glass electrode thoroughly between calibration buffers and samples to prevent cross-contamination.",
      "safety": "Fill only with pure deionized or distilled water; never use wash bottles for chemical reagents."
    },
    "glass-stirring-rod": {
      "name": "Glass Stirring Rod",
      "dbId": "glass-stirring-rod",
      "isProp": false,
      "purpose": "Stirs liquid solutions, induces crystallization, and guides liquid streams during decantation.",
      "role": "Transfers single droplets of sample solution onto indicator paper strips without immersing the stock.",
      "safety": "Wipe clean between samples; do not use chipped or scratched glass rods."
    }
  },

  "standard-solution-preparation": {
    "analytical-balance": {
      "name": "Analytical Balance",
      "dbId": "analytical-balance",
      "isProp": false,
      "purpose": "Measures solid primary standard mass with high analytical precision inside an enclosed draft shield.",
      "role": "Weighs primary standard solid accurately to ±0.0001 g on tared weighing boat.",
      "safety": "Keep draft shield doors closed during reading; clean balance pan immediately if chemicals spill."
    },
    "weighing-boat": {
      "name": "Weighing Boat",
      "dbId": "weighing-boat",
      "isProp": false,
      "purpose": "Holds solid chemical samples securely during balance weighing, preventing reagent contact with the pan.",
      "role": "Contains primary standard solid during weighing and facilitates smooth pour transfer into dissolution beaker.",
      "safety": "Handle by the rim; never reuse contaminated disposable boats for different chemical reagents."
    },
    "spatula": {
      "name": "Spatula",
      "dbId": "spatula",
      "isProp": false,
      "purpose": "Transfers small crystalline solid portions into the weighing boat during mass adjustment.",
      "role": "Transfers solid reagent crystals in small controlled increments into the weighing boat.",
      "safety": "Use clean, dry stainless steel spatulas; do not return excess reagent from boat back into stock bottle."
    },
    "beaker": {
      "name": "Dissolution Beaker",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Dissolves primary standard solid completely in minimal solvent before quantitative flask transfer.",
      "safety": "Stir gently with glass rod; ensure solid is 100% dissolved before pouring into volumetric flask."
    },
    "glass-funnel": {
      "name": "Glass Funnel",
      "dbId": "glass-funnel",
      "isProp": false,
      "purpose": "Channels liquids into narrow openings and supports filter paper during gravity filtration.",
      "role": "Guides dissolved standard solution into narrow volumetric flask neck without loss.",
      "safety": "Rinse funnel interior with wash bottle into flask during quantitative transfer."
    },
    "glass-stirring-rod": {
      "name": "Glass Stirring Rod",
      "dbId": "glass-stirring-rod",
      "isProp": false,
      "purpose": "Stirs liquid solutions, induces crystallization, and guides liquid streams during decantation.",
      "role": "Directs solution stream into funnel and stirs solid in beaker to accelerate dissolution.",
      "safety": "Rinse rod with wash bottle into flask before removing to prevent analyte loss."
    },
    "volumetric-flask": {
      "name": "Volumetric Flask (250 mL)",
      "dbId": "volumetric-flask",
      "isProp": false,
      "purpose": "Calibrated to contain an exact volume of solution at 20°C when filled to the engraved neck meniscus ring mark.",
      "role": "Accurately defines the final standard solution volume (250.0 mL ± 0.15 mL) at 20°C.",
      "safety": "Never heat volumetric flasks; thermal expansion alters calibrated volume permanently."
    },
    "wash-bottle": {
      "name": "Wash Bottle",
      "dbId": "wash-bottle",
      "isProp": false,
      "purpose": "Dispenses controlled streams of distilled water to rinse glassware walls, burette tips, and electrodes.",
      "role": "Provides quantitative rinsings and fills volumetric flask up to ~1 cm below calibration mark.",
      "safety": "Control jet pressure to prevent splashing drops out of the flask neck."
    },
    "dropper": {
      "name": "Dropper (Fine Meniscus Adjustment)",
      "dbId": "dropper",
      "isProp": false,
      "purpose": "Adds or transfers small liquid quantities drop by drop for tests, indicator dispensing, and volume adjustments.",
      "role": "Adds final solvent drops drop-by-drop until bottom of curved meniscus aligns with calibration line at eye level.",
      "safety": "Deliver drops into center of neck without wetting walls above the calibration mark."
    }
  },

  "simple-distillation": {
    "round-bottom-flask": {
      "name": "Round-Bottom Boiling Flask",
      "dbId": "round-bottom-flask",
      "isProp": false,
      "purpose": "Holds boiling liquid mixtures during distillation, ensuring uniform heat distribution without hot spots.",
      "role": "Contains distillation mixture and boiling chips directly above the hot plate heating surface.",
      "safety": "Never fill past half to two-thirds capacity; always add boiling chips before heating begins."
    },
    "distillation-apparatus": {
      "name": "Distillation Head & Adapter",
      "dbId": "distillation-apparatus",
      "isProp": false,
      "purpose": "Integrated glassware system comprising distillation head, condenser, and vacuum adapter for fractional or simple separations.",
      "role": "Channels ascending hot vapors toward the condenser and provides open vent adapter to atmosphere.",
      "safety": "Ensure system is OPEN to atmosphere at receiving adapter; heating a closed system causes explosive rupture!"
    },
    "condenser": {
      "name": "Liebig Condenser",
      "dbId": "condenser",
      "isProp": false,
      "purpose": "Cools ascending vapor into liquid distillate using a counter-current cooling water jacket.",
      "role": "Condenses hot vapors into liquid distillate via counter-current water flow (water in bottom, out top).",
      "safety": "Secure hose clamps firmly to prevent water hoses slipping off and flooding the laboratory bench."
    },
    "thermometer": {
      "name": "Laboratory Thermometer",
      "dbId": "thermometer",
      "isProp": false,
      "purpose": "Monitors vapor temperature at the side-arm outlet to detect constant-boiling fractions.",
      "role": "Measures distilling vapor temperature; bulb must sit directly at or below side-arm takeoff.",
      "safety": "Insert through rubber stopper using lubricant; never force glass thermometer stems with bare hands."
    },
    "hot-plate": {
      "name": "Hot Plate Heat Source",
      "dbId": "hot-plate",
      "isProp": false,
      "purpose": "Provides controllable, flameless electrical heat for boiling mixtures, dissolving solids, and gentle evaporations.",
      "role": "Supplies safe flameless heating to vaporize the lower-boiling liquid component.",
      "safety": "Never touch hot plate top; keep electrical cords away from hot heating surfaces."
    },
    "retort-stand": {
      "name": "Retort Stand & 3-Finger Clamps",
      "dbId": "retort-stand",
      "isProp": false,
      "purpose": "Provides a heavy, stable base and vertical rod for mounting laboratory equipment and glassware assemblies.",
      "role": "Secures distillation boiling flask and condenser assembly firmly at proper incline angle.",
      "safety": "Support both boiling flask neck and condenser jacket with separate secure clamps."
    },
    "conical-flask": {
      "name": "Receiving Flask (Distillate Collector)",
      "dbId": "conical-flask",
      "isProp": false,
      "purpose": "Facilitates splash-free manual swirling, titration receptions, and boiling with its flat base and tapered neck.",
      "role": "Collects purified condensed liquid distillate drops from the condenser delivery adapter.",
      "safety": "Ensure receiver rests firmly on bench or lab jack below delivery adapter."
    }
  },

  "recrystallization": {
    "conical-flask": {
      "name": "Erlenmeyer Dissolution Flask",
      "dbId": "conical-flask",
      "isProp": false,
      "purpose": "Facilitates splash-free manual swirling, titration receptions, and boiling with its flat base and tapered neck.",
      "role": "Contains crude solid and solvent on hot plate, swirling to dissolve solute in minimal boiling liquid.",
      "safety": "Use flask tongs or heat-resistant gloves when handling hot Erlenmeyer flasks."
    },
    "hot-plate": {
      "name": "Hot Plate",
      "dbId": "hot-plate",
      "isProp": false,
      "purpose": "Provides controllable, flameless electrical heat for boiling mixtures, dissolving solids, and gentle evaporations.",
      "role": "Heats solvent and solution to boiling point safely without open gas flames.",
      "safety": "Operate inside fume hood when heating flammable organic recrystallization solvents."
    },
    "glass-funnel": {
      "name": "Glass Funnel (Hot Filtration)",
      "dbId": "glass-funnel",
      "isProp": false,
      "purpose": "Channels liquids into narrow openings and supports filter paper during gravity filtration.",
      "role": "Supports pre-warmed fluted filter paper to quickly separate insoluble dust before cooling.",
      "safety": "Pre-warm funnel with hot solvent vapor to prevent premature crystal crystallization in the stem."
    },
    "filter-paper": {
      "name": "Fluted Filter Paper",
      "dbId": "filter-paper",
      "isProp": false,
      "purpose": "Separates suspended insoluble solid particles from liquids during gravity or suction filtration.",
      "role": "Fluted accordion folds maximize surface area for rapid hot gravity filtration.",
      "safety": "Do not tear paper folds; keep hot liquid level below paper rim."
    },
    "buchner-funnel": {
      "name": "Büchner Funnel & Suction Flask",
      "dbId": "buchner-funnel",
      "isProp": false,
      "purpose": "Ceramic perforated plate funnel used in vacuum filtration for rapid liquid-solid separation.",
      "role": "Isolates purified recrystallized solid under gentle vacuum suction from cold mother liquor.",
      "safety": "Inspect thick-walled vacuum receiving flask for hairline stars before applying suction."
    },
    "beaker": {
      "name": "Ice-Water Cooling Bath",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Contains ice-water slurry to chill recrystallization flask after slow room-temp cooling to maximize crystal yield.",
      "safety": "Never plunge boiling hot glassware directly into ice; allow room-temp cooling first to avoid thermal shattering."
    },
    "watch-glass": {
      "name": "Watch Glass (Drying Dish)",
      "dbId": "watch-glass",
      "isProp": false,
      "purpose": "Holds small solid samples, covers beakers to reduce evaporation, and acts as an evaporating dish.",
      "role": "Holds moist isolated crystals for final air-drying or desiccator storage.",
      "safety": "Avoid scraping porcelain or glass surfaces vigorously with metal spatulas."
    },
    "microscope": {
      "name": "Laboratory Microscope",
      "dbId": "microscope",
      "isProp": false,
      "purpose": "Magnifies crystal habits and face morphologies to evaluate purity and crystalline structure.",
      "role": "Allows inspection of sharp prismatic crystal habits to verify purity and crystallinity.",
      "safety": "Handle glass slides by the edges; lower objective lens carefully to avoid cracking cover slips."
    }
  },

  "ph-metric-titration": {
    "burette": {
      "name": "Burette (Titrant Delivery)",
      "dbId": "burette",
      "isProp": false,
      "purpose": "Dispenses precise, variable volumes of titrant solution controlled by a stopcock valve for volumetric titrations.",
      "role": "Delivers standard titrant in controlled 2.0 mL and dropwise 0.2 mL increments into analyte beaker.",
      "safety": "Expel air bubbles from tip before starting titration; read meniscus at eye level."
    },
    "laboratory-ph-meter": {
      "name": "pH Meter & Combination Glass Electrode",
      "dbId": "laboratory-ph-meter",
      "isProp": false,
      "purpose": "High-precision benchtop potentiometric instrument measuring hydronium ion activity with a glass combination electrode.",
      "role": "Measures solution pH potentiometrically after each incremental titrant addition, plotting the sigmoidal curve.",
      "safety": "Ensure spinning magnetic stir bar does not strike the thin glass bulb of the electrode."
    },
    "magnetic-stirrer": {
      "name": "Magnetic Stirrer & Teflon Stir Bar",
      "dbId": "magnetic-stirrer",
      "isProp": false,
      "purpose": "Rotates an internal Teflon-coated magnetic stir bar to provide continuous uniform agitation without manual swirling.",
      "role": "Provides smooth, continuous mixing of titrant and analyte without manual flask swirling.",
      "safety": "Center beaker on stirrer plate before turning on speed dial; adjust rotation to avoid vigorous splashing vortex."
    },
    "beaker": {
      "name": "Analyte Titration Beaker",
      "dbId": "beaker",
      "isProp": false,
      "purpose": "Holds, mixes, and heats liquids during bench-scale chemical preparations.",
      "role": "Contains measured acid analyte volume, magnetic stir bar, and immersed pH electrode.",
      "safety": "Position burette tip directly inside beaker lip without touching the glass wall."
    },
    "retort-stand": {
      "name": "Retort Stand & Electrode Clamp",
      "dbId": "retort-stand",
      "isProp": false,
      "purpose": "Provides a heavy, stable base and vertical rod for mounting laboratory equipment and glassware assemblies.",
      "role": "Supports burette and electrode holder at adjustable heights above the magnetic stirrer.",
      "safety": "Tighten boss head firmly to prevent sudden slipping of electrode into beaker."
    },
    "wash-bottle": {
      "name": "Wash Bottle (Electrode Rinsing)",
      "dbId": "wash-bottle",
      "isProp": false,
      "purpose": "Dispenses controlled streams of distilled water to rinse glassware walls, burette tips, and electrodes.",
      "role": "Rinses combination glass electrode before immersion into analyte solution.",
      "safety": "Catch rinse effluent into a designated waste beaker."
    }
  }`;

simJs = simJs.replace(metaAnchor, `      "safety": "Never use ink pens; commercial pen inks contain soluble dyes that will dissolve in developing solvents and ruin the chromatogram."\n    }\n  }${newApparatusMeta}\n};`);
console.log('2. Injected 5 experiments into APPARATUS_METADATA.');

// 3. INJECT INTO EXPERIMENT_CONTENT
const contentAnchor = '        targetElement: "filter-paper",\n        feedback: "Solvent front marked! Illustrative Rf values: Blue = 0.82, Red = 0.55, Yellow = 0.28. Great job!"\n      }\n    ]\n  }\n};';
if (!simJs.includes(contentAnchor)) {
  throw new Error('Could not find EXPERIMENT_CONTENT closing anchor');
}

const newContentMeta = `,\n  "ph-determination": ` + JSON.stringify(phDetContent, null, 2) +
`,\n  "standard-solution-preparation": ` + JSON.stringify(stdSolContent, null, 2) +
`,\n  "simple-distillation": ` + JSON.stringify(distContent, null, 2) +
`,\n  "recrystallization": ` + JSON.stringify(recrystContent, null, 2) +
`,\n  "ph-metric-titration": ` + JSON.stringify(phMetricContent, null, 2);

simJs = simJs.replace(contentAnchor, `        targetElement: "filter-paper",\n        feedback: "Solvent front marked! Illustrative Rf values: Blue = 0.82, Red = 0.55, Yellow = 0.28. Great job!"\n      }\n    ]\n  }${newContentMeta}\n};`);
console.log('3. Injected 5 experiments into EXPERIMENT_CONTENT.');

// 4. INJECT INTO gameState
const gameStateAnchor = `  // Experiment 3 State
  chromatography: {
    chosenTool: "pencil", // 'pencil' | 'pen'
    baselineDrawn: false,
    spotPlaced: false,
    solventDepth: "safe", // 'safe' | 'excess'
    chamberCovered: false,
    separationProgress: 0.0,
    frontMarked: false
  }
};`;

if (!simJs.includes(gameStateAnchor)) {
  throw new Error('Could not find gameState closing anchor');
}

const newGameState = `  // Experiment 3 State
  chromatography: {
    chosenTool: "pencil", // 'pencil' | 'pen'
    baselineDrawn: false,
    spotPlaced: false,
    solventDepth: "safe", // 'safe' | 'excess'
    chamberCovered: false,
    separationProgress: 0.0,
    frontMarked: false
  },
  // Experiment 4 State
  phDetermination: {
    method: "paper", // 'paper' | 'meter'
    sampleDropletPlaced: false,
    matchedPh: null,
    meterCalibrated: false,
    electrodeRinsed: false,
    digitalReading: null
  },
  // Experiment 5 State
  standardSolution: {
    boatOnBalance: true,
    balanceTared: false,
    solidWeighed: false,
    massValue: "0.0000",
    dissolvedInBeaker: false,
    funnelSeated: false,
    quantitativelyTransferred: false,
    filledNearMark: false,
    meniscusZoom: false,
    meniscusLevel: 0.85,
    meniscusLocked: false,
    stoppered: false,
    invertedCount: 0
  },
  // Experiment 6 State
  distillation: {
    assembled: false,
    openSystemVerified: false,
    waterConnected: false,
    waterFlow: "correct", // 'correct' | 'wrong'
    heatingActive: false,
    tempC: 24,
    vaporRising: false,
    distillateDrops: 0,
    stoppedBeforeDryness: false,
    shutdownComplete: false
  },
  // Experiment 7 State
  recrystallization: {
    solventPortion: "minimal", // 'minimal' | 'excess'
    solidDissolved: false,
    hotFiltered: false,
    coolingMode: "slow", // 'slow' | 'flash_ice'
    slowCoolingComplete: false,
    iceBathChilled: false,
    vacuumFiltered: false,
    coldWashed: false,
    crystalsObserved: false
  },
  // Experiment 8 State
  phMetric: {
    calibrated: false,
    electrodePositioned: false,
    volumeAdded: 0.0,
    currentPh: 2.80,
    dataPoints: [{ v: 0.0, ph: 2.80 }],
    steepDropwise: true,
    equivalenceMarked: false
  }
};`;

simJs = simJs.replace(gameStateAnchor, newGameState);
console.log('4. Injected 5 experiments into gameState.');

// 5. INJECT INTO resetGameState()
const resetAnchor = `  gameState.chromatography.separationProgress = 0.0;
  gameState.chromatography.frontMarked = false;`;

if (!simJs.includes(resetAnchor)) {
  throw new Error('Could not find resetGameState anchor');
}

const newResetState = `  gameState.chromatography.separationProgress = 0.0;
  gameState.chromatography.frontMarked = false;

  // Reset Experiment 4
  gameState.phDetermination.method = "paper";
  gameState.phDetermination.sampleDropletPlaced = false;
  gameState.phDetermination.matchedPh = null;
  gameState.phDetermination.meterCalibrated = false;
  gameState.phDetermination.electrodeRinsed = false;
  gameState.phDetermination.digitalReading = null;

  // Reset Experiment 5
  gameState.standardSolution.boatOnBalance = true;
  gameState.standardSolution.balanceTared = false;
  gameState.standardSolution.solidWeighed = false;
  gameState.standardSolution.massValue = "0.0000";
  gameState.standardSolution.dissolvedInBeaker = false;
  gameState.standardSolution.funnelSeated = false;
  gameState.standardSolution.quantitativelyTransferred = false;
  gameState.standardSolution.filledNearMark = false;
  gameState.standardSolution.meniscusZoom = false;
  gameState.standardSolution.meniscusLevel = 0.85;
  gameState.standardSolution.meniscusLocked = false;
  gameState.standardSolution.stoppered = false;
  gameState.standardSolution.invertedCount = 0;

  // Reset Experiment 6
  gameState.distillation.assembled = false;
  gameState.distillation.openSystemVerified = false;
  gameState.distillation.waterConnected = false;
  gameState.distillation.waterFlow = "correct";
  gameState.distillation.heatingActive = false;
  gameState.distillation.tempC = 24;
  gameState.distillation.vaporRising = false;
  gameState.distillation.distillateDrops = 0;
  gameState.distillation.stoppedBeforeDryness = false;
  gameState.distillation.shutdownComplete = false;

  // Reset Experiment 7
  gameState.recrystallization.solventPortion = "minimal";
  gameState.recrystallization.solidDissolved = false;
  gameState.recrystallization.hotFiltered = false;
  gameState.recrystallization.coolingMode = "slow";
  gameState.recrystallization.slowCoolingComplete = false;
  gameState.recrystallization.iceBathChilled = false;
  gameState.recrystallization.vacuumFiltered = false;
  gameState.recrystallization.coldWashed = false;
  gameState.recrystallization.crystalsObserved = false;

  // Reset Experiment 8
  gameState.phMetric.calibrated = false;
  gameState.phMetric.electrodePositioned = false;
  gameState.phMetric.volumeAdded = 0.0;
  gameState.phMetric.currentPh = 2.80;
  gameState.phMetric.dataPoints = [{ v: 0.0, ph: 2.80 }];
  gameState.phMetric.steepDropwise = true;
  gameState.phMetric.equivalenceMarked = false;`;

simJs = simJs.replace(resetAnchor, newResetState);
console.log('5. Injected 5 experiments into resetGameState().');

// 6. INJECT INTO handleGameAction dispatcher
const handleActionAnchor = `  } else if (activeExperimentId === "paper-chromatography") {
    handleChromatographyAction(actionId, isMatch);
  }`;

if (!simJs.includes(handleActionAnchor)) {
  throw new Error('Could not find handleGameAction anchor');
}

const newHandleAction = `  } else if (activeExperimentId === "paper-chromatography") {
    handleChromatographyAction(actionId, isMatch);
  } else if (activeExperimentId === "ph-determination") {
    handlePhDeterminationAction(actionId, isMatch);
  } else if (activeExperimentId === "standard-solution-preparation") {
    handleStandardSolutionAction(actionId, isMatch);
  } else if (activeExperimentId === "simple-distillation") {
    handleDistillationAction(actionId, isMatch);
  } else if (activeExperimentId === "recrystallization") {
    handleRecrystallizationAction(actionId, isMatch);
  } else if (activeExperimentId === "ph-metric-titration") {
    handlePhMetricAction(actionId, isMatch);
  }`;

simJs = simJs.replace(handleActionAnchor, newHandleAction);
console.log('6. Injected 5 experiments into handleGameAction().');

// 7. INJECT INTO renderSceneControls
const renderControlsAnchor = `      <button id="btn-mark-front" class="btn-scene-action-sm" onclick="handleGameAction('mark_solvent_front')">
        📐 Mark Solvent Front
      </button>
    \`;
  }`;

if (!simJs.includes(renderControlsAnchor)) {
  throw new Error('Could not find renderSceneControls anchor');
}

const newRenderControls = `      <button id="btn-mark-front" class="btn-scene-action-sm" onclick="handleGameAction('mark_solvent_front')">
        📐 Mark Solvent Front
      </button>
    \`;
  } else if (expId === "ph-determination") {
    renderPhDeterminationControls(container);
  } else if (expId === "standard-solution-preparation") {
    renderStandardSolutionControls(container);
  } else if (expId === "simple-distillation") {
    renderDistillationControls(container);
  } else if (expId === "recrystallization") {
    renderRecrystallizationControls(container);
  } else if (expId === "ph-metric-titration") {
    renderPhMetricControls(container);
  }`;

simJs = simJs.replace(renderControlsAnchor, newRenderControls);
console.log('7. Injected 5 experiments into renderSceneControls().');

// 8. INJECT INTO applyAnimationProgress
const animAnchor = `  } else if (expId === "paper-chromatography") {
    applyChromatographyVisuals(clamped);
  }`;

if (!simJs.includes(animAnchor)) {
  throw new Error('Could not find applyAnimationProgress anchor');
}

const newAnimProgress = `  } else if (expId === "paper-chromatography") {
    applyChromatographyVisuals(clamped);
  } else if (expId === "ph-determination") {
    applyPhDeterminationVisuals(clamped);
  } else if (expId === "standard-solution-preparation") {
    applyStandardSolutionVisuals(clamped);
  } else if (expId === "simple-distillation") {
    applyDistillationVisuals(clamped);
  } else if (expId === "recrystallization") {
    applyRecrystallizationVisuals(clamped);
  } else if (expId === "ph-metric-titration") {
    applyPhMetricVisuals(clamped);
  }`;

simJs = simJs.replace(animAnchor, newAnimProgress);
console.log('8. Injected 5 experiments into applyAnimationProgress().');

// Write updated code back to simulator.js
fs.writeFileSync(simJsPath, simJs, 'utf8');
console.log('Updated simulator.js with core registrations.');
