import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Authoritative ground truth table from PDF
export const PDF_GROUND_TRUTH = {
  1: { id: "beaker", pdfNumber: 1, pdfName: "Beaker", pdfMainUse: "Holding and mixing liquids", pdfGroup: "Essential glassware and basics" },
  2: { id: "test-tube", pdfNumber: 2, pdfName: "Test Tube", pdfMainUse: "Small-scale chemical reactions", pdfGroup: "Essential glassware and basics" },
  3: { id: "measuring-cylinder", pdfNumber: 3, pdfName: "Measuring Cylinder", pdfMainUse: "Measuring liquid volume", pdfGroup: "Essential glassware and basics" },
  4: { id: "conical-flask", pdfNumber: 4, pdfName: "Conical Flask", pdfMainUse: "Mixing solutions and titration", pdfGroup: "Essential glassware and basics" },
  5: { id: "volumetric-flask", pdfNumber: 5, pdfName: "Volumetric Flask", pdfMainUse: "Preparing solutions to a precise volume", pdfGroup: "Essential glassware and basics" },
  6: { id: "pipette", pdfNumber: 6, pdfName: "Pipette", pdfMainUse: "Transferring measured liquid", pdfGroup: "Essential glassware and basics" },
  7: { id: "burette", pdfNumber: 7, pdfName: "Burette", pdfMainUse: "Delivering liquid during titration", pdfGroup: "Essential glassware and basics" },
  8: { id: "glass-funnel", pdfNumber: 8, pdfName: "Glass Funnel", pdfMainUse: "Pouring and filtration", pdfGroup: "Essential glassware and basics" },
  9: { id: "glass-stirring-rod", pdfNumber: 9, pdfName: "Glass Stirring Rod", pdfMainUse: "Stirring solutions", pdfGroup: "Essential glassware and basics" },
  10: { id: "watch-glass", pdfNumber: 10, pdfName: "Watch Glass", pdfMainUse: "Holding small samples and evaporation", pdfGroup: "Essential glassware and basics" },
  11: { id: "reagent-bottle", pdfNumber: 11, pdfName: "Reagent Bottle", pdfMainUse: "Storing chemical reagents", pdfGroup: "Essential glassware and basics" },
  12: { id: "dropper", pdfNumber: 12, pdfName: "Dropper", pdfMainUse: "Adding liquids drop by drop", pdfGroup: "Essential glassware and basics" },
  13: { id: "wash-bottle", pdfNumber: 13, pdfName: "Wash Bottle", pdfMainUse: "Rinsing equipment", pdfGroup: "Essential glassware and basics" },
  14: { id: "test-tube-rack", pdfNumber: 14, pdfName: "Test Tube Rack", pdfMainUse: "Holding test tubes upright", pdfGroup: "Essential glassware and basics" },
  15: { id: "test-tube-holder", pdfNumber: 15, pdfName: "Test Tube Holder", pdfMainUse: "Holding test tubes safely", pdfGroup: "Essential glassware and basics" },
  16: { id: "spatula", pdfNumber: 16, pdfName: "Spatula", pdfMainUse: "Transferring solid chemicals", pdfGroup: "Essential glassware and basics" },
  17: { id: "mortar-and-pestle", pdfNumber: 17, pdfName: "Mortar and Pestle", pdfMainUse: "Grinding solids into powder", pdfGroup: "Essential glassware and basics" },
  18: { id: "weighing-boat", pdfNumber: 18, pdfName: "Weighing Boat", pdfMainUse: "Holding solids during weighing", pdfGroup: "Essential glassware and basics" },
  19: { id: "filter-paper", pdfNumber: 19, pdfName: "Filter Paper", pdfMainUse: "Separating solids from liquids", pdfGroup: "Essential glassware and basics" },
  20: { id: "evaporating-dish", pdfNumber: 20, pdfName: "Evaporating Dish", pdfMainUse: "Evaporating solvents", pdfGroup: "Essential glassware and basics" },
  21: { id: "bunsen-burner", pdfNumber: 21, pdfName: "Bunsen Burner", pdfMainUse: "Heating substances using a flame", pdfGroup: "Heating, handling and separation" },
  22: { id: "hot-plate", pdfNumber: 22, pdfName: "Hot Plate", pdfMainUse: "Heating solutions without a direct flame", pdfGroup: "Heating, handling and separation" },
  23: { id: "thermometer", pdfNumber: 23, pdfName: "Thermometer", pdfMainUse: "Measuring temperature", pdfGroup: "Heating, handling and separation" },
  24: { id: "analytical-balance", pdfNumber: 24, pdfName: "Analytical Balance", pdfMainUse: "Measuring mass precisely", pdfGroup: "Heating, handling and separation" },
  25: { id: "top-pan-balance", pdfNumber: 25, pdfName: "Top-pan Balance", pdfMainUse: "Measuring general sample mass", pdfGroup: "Heating, handling and separation" },
  26: { id: "retort-stand", pdfNumber: 26, pdfName: "Retort Stand", pdfMainUse: "Supporting laboratory apparatus", pdfGroup: "Heating, handling and separation" },
  27: { id: "clamp-and-boss-head", pdfNumber: 27, pdfName: "Clamp and Boss Head", pdfMainUse: "Securing apparatus to a stand", pdfGroup: "Heating, handling and separation" },
  28: { id: "tripod-stand", pdfNumber: 28, pdfName: "Tripod Stand", pdfMainUse: "Supporting vessels during heating", pdfGroup: "Heating, handling and separation" },
  29: { id: "wire-gauze", pdfNumber: 29, pdfName: "Wire Gauze", pdfMainUse: "Supporting glassware and distributing heat", pdfGroup: "Heating, handling and separation" },
  30: { id: "crucible-tongs", pdfNumber: 30, pdfName: "Crucible Tongs", pdfMainUse: "Handling compatible hot equipment", pdfGroup: "Heating, handling and separation" },
  31: { id: "separating-funnel", pdfNumber: 31, pdfName: "Separating Funnel", pdfMainUse: "Separating immiscible liquids", pdfGroup: "Heating, handling and separation" },
  32: { id: "buchner-funnel", pdfNumber: 32, pdfName: "Büchner Funnel", pdfMainUse: "Vacuum filtration", pdfGroup: "Heating, handling and separation" },
  33: { id: "round-bottom-flask", pdfNumber: 33, pdfName: "Round-bottom Flask", pdfMainUse: "Heating, reflux, and distillation", pdfGroup: "Heating, handling and separation" },
  34: { id: "condenser", pdfNumber: 34, pdfName: "Condenser", pdfMainUse: "Cooling vapor into liquid", pdfGroup: "Heating, handling and separation" },
  35: { id: "distillation-apparatus", pdfNumber: 35, pdfName: "Distillation Apparatus", pdfMainUse: "Separating substances based on volatility", pdfGroup: "Heating, handling and separation" },
  36: { id: "crucible", pdfNumber: 36, pdfName: "Crucible", pdfMainUse: "Heating solid samples at high temperatures", pdfGroup: "Heating, handling and separation" },
  37: { id: "clay-triangle", pdfNumber: 37, pdfName: "Clay Triangle", pdfMainUse: "Supporting a crucible during heating", pdfGroup: "Heating, handling and separation" },
  38: { id: "water-bath", pdfNumber: 38, pdfName: "Water Bath", pdfMainUse: "Providing controlled gentle heating", pdfGroup: "Heating, handling and separation" },
  39: { id: "magnetic-stirrer", pdfNumber: 39, pdfName: "Magnetic Stirrer", pdfMainUse: "Mixing solutions automatically", pdfGroup: "Heating, handling and separation" },
  40: { id: "desiccator", pdfNumber: 40, pdfName: "Desiccator", pdfMainUse: "Keeping samples dry", pdfGroup: "Heating, handling and separation" },
  41: { id: "safety-goggles", pdfNumber: 41, pdfName: "Safety Goggles", pdfMainUse: "Protecting eyes from splashes", pdfGroup: "Safety, measurement and accessories" },
  42: { id: "laboratory-coat", pdfNumber: 42, pdfName: "Laboratory Coat", pdfMainUse: "Protecting skin and clothing", pdfGroup: "Safety, measurement and accessories" },
  43: { id: "chemical-resistant-gloves", pdfNumber: 43, pdfName: "Chemical-resistant Gloves", pdfMainUse: "Protecting hands", pdfGroup: "Safety, measurement and accessories" },
  44: { id: "fume-hood", pdfNumber: 44, pdfName: "Fume Hood", pdfMainUse: "Controlling hazardous vapors when used correctly", pdfGroup: "Safety, measurement and accessories" },
  45: { id: "eyewash-station", pdfNumber: 45, pdfName: "Eyewash Station", pdfMainUse: "Flushing exposed eyes", pdfGroup: "Safety, measurement and accessories" },
  46: { id: "safety-shower", pdfNumber: 46, pdfName: "Safety Shower", pdfMainUse: "Rinsing chemical spills from the body", pdfGroup: "Safety, measurement and accessories" },
  47: { id: "fire-extinguisher", pdfNumber: 47, pdfName: "Fire Extinguisher", pdfMainUse: "Responding to suitable fires", pdfGroup: "Safety, measurement and accessories" },
  48: { id: "first-aid-kit", pdfNumber: 48, pdfName: "First-aid Kit", pdfMainUse: "Providing basic first aid", pdfGroup: "Safety, measurement and accessories" },
  49: { id: "chemical-waste-container", pdfNumber: 49, pdfName: "Chemical Waste Container", pdfMainUse: "Collecting chemical waste", pdfGroup: "Safety, measurement and accessories" },
  50: { id: "ph-indicator-paper", pdfNumber: 50, pdfName: "pH Indicator Paper", pdfMainUse: "Estimating acidity or alkalinity", pdfGroup: "Safety, measurement and accessories" },
  51: { id: "centrifuge", pdfNumber: 51, pdfName: "Centrifuge", pdfMainUse: "Separating components by spinning", pdfGroup: "Safety, measurement and accessories" },
  52: { id: "ph-indicator-solution", pdfNumber: 52, pdfName: "pH Indicator Solution", pdfMainUse: "Indicating acidity or alkalinity by color", pdfGroup: "Safety, measurement and accessories" },
  53: { id: "conductivity-meter", pdfNumber: 53, pdfName: "Conductivity Meter", pdfMainUse: "Measuring electrical conductivity", pdfGroup: "Safety, measurement and accessories" },
  54: { id: "colorimeter", pdfNumber: 54, pdfName: "Colorimeter", pdfMainUse: "Measuring color intensity", pdfGroup: "Safety, measurement and accessories" },
  55: { id: "spectrophotometer", pdfNumber: 55, pdfName: "Spectrophotometer", pdfMainUse: "Measuring light absorbance", pdfGroup: "Safety, measurement and accessories" },
  56: { id: "hydrometer", pdfNumber: 56, pdfName: "Hydrometer", pdfMainUse: "Measuring liquid relative density", pdfGroup: "Safety, measurement and accessories" },
  57: { id: "refractometer", pdfNumber: 57, pdfName: "Refractometer", pdfMainUse: "Measuring refractive index", pdfGroup: "Safety, measurement and accessories" },
  58: { id: "forceps", pdfNumber: 58, pdfName: "Forceps", pdfMainUse: "Picking up small objects", pdfGroup: "Safety, measurement and accessories" },
  59: { id: "test-tube-brush", pdfNumber: 59, pdfName: "Test Tube Brush", pdfMainUse: "Cleaning test tubes", pdfGroup: "Safety, measurement and accessories" },
  60: { id: "rubber-stopper", pdfNumber: 60, pdfName: "Rubber Stopper", pdfMainUse: "Closing compatible flasks and test tubes", pdfGroup: "Safety, measurement and accessories" },
  61: { id: "laboratory-ph-meter", pdfNumber: 61, pdfName: "Laboratory pH Meter", pdfMainUse: "Measuring solution pH using an electrode", pdfGroup: "pH measurement instruments" },
  62: { id: "portable-ph-meter", pdfNumber: 62, pdfName: "Digital / Portable pH Meter", pdfMainUse: "Portable electronic measurement of solution pH", pdfGroup: "pH measurement instruments" }
};

export const VALID_CATEGORIES = [
  "Glassware",
  "Basic Tools and Consumables",
  "Heating Equipment",
  "Support Equipment",
  "Separation Equipment",
  "Measuring Instruments",
  "Safety Equipment",
  "Cleaning and Storage",
  "pH and Analytical Instruments",
  "Observation and Optical Instruments"
];

export const VALID_PDF_GROUPS = [
  "Essential glassware and basics",
  "Heating, handling and separation",
  "Safety, measurement and accessories",
  "pH measurement instruments",
  "Added beyond PDF"
];

export function validateRecord(rec, options = { checkRelations: true, allIds: null }) {
  const errors = [];
  const warnings = [];

  if (!rec || typeof rec !== 'object') {
    return { valid: false, errors: ['Record must be a non-null object'], warnings };
  }

  // 1. Identification & PDF ground truth / Origin
  if (!rec.id || typeof rec.id !== 'string') {
    errors.push('Missing or invalid id string');
  } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(rec.id)) {
    errors.push(`ID "${rec.id}" is not valid kebab-case`);
  }

  const origin = rec.origin || (rec.pdfNumber !== null ? 'pdf' : 'added-by-user');
  if (origin !== 'pdf' && origin !== 'added-by-user') {
    errors.push(`Invalid origin "${rec.origin}". Must be "pdf" or "added-by-user"`);
  }

  if (origin === 'added-by-user') {
    if (rec.pdfNumber !== null) {
      errors.push(`pdfNumber must be null for added-by-user record (got ${rec.pdfNumber})`);
    }
    if (rec.pdfName !== null) {
      errors.push(`pdfName must be null for added-by-user record (got ${rec.pdfName})`);
    }
    if (rec.pdfMainUse !== null) {
      errors.push(`pdfMainUse must be null for added-by-user record (got ${rec.pdfMainUse})`);
    }
    if (rec.pdfGroup !== 'Added beyond PDF') {
      errors.push(`pdfGroup must be "Added beyond PDF" for added-by-user record (got "${rec.pdfGroup}")`);
    }
    if (!rec.addedMainUse || typeof rec.addedMainUse !== 'string' || rec.addedMainUse.trim().length === 0) {
      errors.push('addedMainUse must be a non-empty string for added-by-user record');
    }
  } else {
    // origin === 'pdf'
    const num = rec.pdfNumber;
    if (typeof num !== 'number' || num < 1 || num > 62) {
      errors.push(`pdfNumber must be an integer between 1 and 62 (got ${num})`);
    } else {
      const truth = PDF_GROUND_TRUTH[num];
      if (truth) {
        if (rec.id !== truth.id) {
          errors.push(`ID mismatch for #${num}: expected "${truth.id}", got "${rec.id}"`);
        }
        if (rec.pdfName !== truth.pdfName) {
          errors.push(`pdfName mismatch for #${num}: expected "${truth.pdfName}", got "${rec.pdfName}"`);
        }
        if (rec.pdfMainUse !== truth.pdfMainUse) {
          errors.push(`pdfMainUse mismatch for #${num}: expected "${truth.pdfMainUse}", got "${rec.pdfMainUse}"`);
        }
        if (rec.pdfGroup !== truth.pdfGroup) {
          errors.push(`pdfGroup mismatch for #${num}: expected "${truth.pdfGroup}", got "${rec.pdfGroup}"`);
        }
      }
    }
  }

  if (!rec.name || typeof rec.name !== 'string' || rec.name.trim().length === 0) {
    errors.push('Missing or empty display name');
  }

  if (!VALID_CATEGORIES.includes(rec.category)) {
    errors.push(`Invalid category "${rec.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (!rec.purpose || typeof rec.purpose !== 'string' || rec.purpose.trim().length === 0) {
    errors.push('Missing or empty purpose');
  }

  // 2. Image and AR
  if (!rec.image || typeof rec.image !== 'object') {
    errors.push('Missing image object');
  } else {
    if (!['available', 'fallback'].includes(rec.image.status)) {
      errors.push(`Invalid image.status "${rec.image.status}". Must be 'available' or 'fallback'`);
    }
    if (!rec.image.src || typeof rec.image.src !== 'string') {
      errors.push('image.src must be a non-empty string');
    } else if (rec.image.status === 'available') {
      const ext = path.extname(rec.image.src).toLowerCase();
      const validExts = ['.jpg', '.jpeg', '.png', '.webp'];
      if (!validExts.includes(ext)) {
        errors.push(`image.src format "${ext}" is not supported. Must be one of: ${validExts.join(', ')}`);
      }
      const fullImgPath = path.resolve(__dirname, '..', rec.image.src);
      if (!fs.existsSync(fullImgPath)) {
        errors.push(`image.src file does not exist on disk: ${rec.image.src}`);
      }
      const src = rec.image.source;
      if (!src || typeof src !== 'object') {
        errors.push('image.source object is required for available images');
      } else {
        if (!src.pageUrl || typeof src.pageUrl !== 'string') errors.push('image.source.pageUrl must be a non-empty string');
        if (!src.creator || typeof src.creator !== 'string') errors.push('image.source.creator must be a non-empty string');
        if (!src.license || typeof src.license !== 'string') errors.push('image.source.license must be a non-empty string');
        if (!src.licenseUrl || typeof src.licenseUrl !== 'string') errors.push('image.source.licenseUrl must be a non-empty string');
      }
    }
    if (!rec.image.alt || typeof rec.image.alt !== 'string' || rec.image.alt.trim().length === 0) {
      errors.push('image.alt must be a non-empty string');
    }
    if (!rec.image.credit || typeof rec.image.credit !== 'string' || rec.image.credit.trim().length === 0) {
      errors.push('image.credit must be a non-empty string');
    }
  }

  if (!rec.ar || typeof rec.ar !== 'object') {
    errors.push('Missing ar object');
  } else {
    if (!['available', 'missing'].includes(rec.ar.modelStatus)) {
      errors.push(`Invalid ar.modelStatus "${rec.ar.modelStatus}". Must be 'available' or 'missing'`);
    }
    if (!Array.isArray(rec.ar.interactions)) {
      errors.push('ar.interactions must be an array');
    }
  }

  // 3. Text & Arrays
  if (!rec.description || typeof rec.description !== 'string' || rec.description.trim().length < 15) {
    errors.push('description must be a substantive string (at least 15 chars)');
  }

  if (!Array.isArray(rec.alternativeNames)) errors.push('alternativeNames must be an array');
  if (!Array.isArray(rec.commonUses) || rec.commonUses.length === 0) errors.push('commonUses must be a non-empty array');
  if (!Array.isArray(rec.types) || rec.types.length === 0) errors.push('types must be a non-empty array');

  // 4. Specifications
  const specs = rec.specifications;
  if (!specs || typeof specs !== 'object') {
    errors.push('Missing specifications object');
  } else {
    if (!Array.isArray(specs.material) || specs.material.length === 0) errors.push('specifications.material must be a non-empty array');
    if (!specs.capacity || typeof specs.capacity !== 'object') {
      errors.push('Missing specifications.capacity object');
    } else {
      if (typeof specs.capacity.value !== 'string' || typeof specs.capacity.unit !== 'string' || typeof specs.capacity.notes !== 'string') {
        errors.push('specifications.capacity must have string properties value, unit, and notes');
      }
    }
    if (typeof specs.dimensions !== 'string' || specs.dimensions.trim().length === 0) {
      errors.push('specifications.dimensions must be a non-empty string');
    }
    if (!Array.isArray(specs.mainParts) || specs.mainParts.length === 0) {
      errors.push('specifications.mainParts must be a non-empty array');
    }
    if (!Array.isArray(specs.partsAndFunctions) || specs.partsAndFunctions.length === 0) {
      errors.push('specifications.partsAndFunctions must be a non-empty array');
    } else {
      specs.partsAndFunctions.forEach((p, idx) => {
        if (!p.partName || !p.function || !p.handlingNotes) {
          errors.push(`specifications.partsAndFunctions[${idx}] missing partName, function, or handlingNotes`);
        }
      });
    }
    if (!specs.measurementAccuracy || typeof specs.measurementAccuracy !== 'object') {
      errors.push('Missing specifications.measurementAccuracy object');
    } else {
      if (specs.measurementAccuracy.value !== null && typeof specs.measurementAccuracy.value !== 'number') {
        errors.push('specifications.measurementAccuracy.value must be a number or null');
      }
      if (typeof specs.measurementAccuracy.notes !== 'string' || specs.measurementAccuracy.notes.trim().length === 0) {
        errors.push('specifications.measurementAccuracy.notes must be a non-empty string explaining accuracy or why N/A');
      }
    }
    if (!Array.isArray(specs.limitations) || specs.limitations.length === 0) {
      errors.push('specifications.limitations must be a non-empty array');
    }
  }

  // 5. Operating Instructions
  const ops = rec.operatingInstructions;
  if (!ops || typeof ops !== 'object') {
    errors.push('Missing operatingInstructions object');
  } else {
    if (!Array.isArray(ops.preparation) || ops.preparation.length === 0) errors.push('operatingInstructions.preparation must be a non-empty array');
    if (!Array.isArray(ops.steps) || ops.steps.length === 0) {
      errors.push('operatingInstructions.steps must be a non-empty array');
    } else {
      ops.steps.forEach((s, idx) => {
        if (typeof s.step !== 'number' || !s.title || !s.instruction) {
          errors.push(`operatingInstructions.steps[${idx}] missing valid step number, title, or instruction`);
        }
      });
    }
    if (!Array.isArray(ops.handlingTips) || ops.handlingTips.length === 0) errors.push('operatingInstructions.handlingTips must be a non-empty array');
    if (!Array.isArray(ops.shutdown) || ops.shutdown.length === 0) errors.push('operatingInstructions.shutdown must be a non-empty array');
  }

  // 6. Safety Precautions
  const safe = rec.safetyPrecautions;
  if (!safe || typeof safe !== 'object') {
    errors.push('Missing safetyPrecautions object');
  } else {
    if (!Array.isArray(safe.requiredPPE) || safe.requiredPPE.length === 0) errors.push('safetyPrecautions.requiredPPE must be non-empty');
    if (!Array.isArray(safe.hazards) || safe.hazards.length === 0) errors.push('safetyPrecautions.hazards must be non-empty');
    if (!Array.isArray(safe.warnings) || safe.warnings.length === 0) errors.push('safetyPrecautions.warnings must be non-empty');
    if (!Array.isArray(safe.actionsToAvoid) || safe.actionsToAvoid.length === 0) errors.push('safetyPrecautions.actionsToAvoid must be non-empty');
    if (!Array.isArray(safe.emergencyGuidance) || safe.emergencyGuidance.length === 0) errors.push('safetyPrecautions.emergencyGuidance must be non-empty');
  }

  // 7. Maintenance and Troubleshooting
  const maint = rec.maintenanceAndTroubleshooting;
  if (!maint || typeof maint !== 'object') {
    errors.push('Missing maintenanceAndTroubleshooting object');
  } else {
    if (!Array.isArray(maint.cleaningSteps) || maint.cleaningSteps.length === 0) errors.push('maint.cleaningSteps must be non-empty');
    if (!Array.isArray(maint.storageInstructions) || maint.storageInstructions.length === 0) errors.push('maint.storageInstructions must be non-empty');
    if (!Array.isArray(maint.maintenanceChecks) || maint.maintenanceChecks.length === 0) errors.push('maint.maintenanceChecks must be non-empty');
    if (!Array.isArray(maint.troubleshooting) || maint.troubleshooting.length === 0) {
      errors.push('maint.troubleshooting must be non-empty');
    } else {
      maint.troubleshooting.forEach((t, idx) => {
        if (!t.problem || !Array.isArray(t.possibleCauses) || t.possibleCauses.length === 0 ||
            !Array.isArray(t.solution) || t.solution.length === 0 ||
            !Array.isArray(t.prevention) || t.prevention.length === 0 ||
            typeof t.requiresSupervisor !== 'boolean') {
          errors.push(`maint.troubleshooting[${idx}] missing problem, causes, solution, prevention, or requiresSupervisor boolean`);
        }
      });
    }
    if (!Array.isArray(maint.commonMistakes) || maint.commonMistakes.length === 0) {
      errors.push('maint.commonMistakes must be non-empty');
    } else {
      maint.commonMistakes.forEach((m, idx) => {
        if (!m.mistake || !m.whyItMatters || !m.howToAvoid) {
          errors.push(`maint.commonMistakes[${idx}] missing mistake, whyItMatters, or howToAvoid`);
        }
      });
    }
  }

  // 8. Related Equipment
  if (!Array.isArray(rec.relatedEquipment) || rec.relatedEquipment.length === 0) {
    errors.push('relatedEquipment must be a non-empty array');
  } else {
    rec.relatedEquipment.forEach((rel, idx) => {
      if (!rel.equipmentId || !rel.relationship || !rel.reason || !rel.difference) {
        errors.push(`relatedEquipment[${idx}] missing equipmentId, relationship, reason, or difference`);
      }
      if (rel.equipmentId === rec.id) {
        errors.push(`relatedEquipment[${idx}] cannot link to itself (${rec.id})`);
      }
      if (!['similar', 'complementary', 'alternative'].includes(rel.relationship)) {
        errors.push(`relatedEquipment[${idx}] invalid relationship "${rel.relationship}". Must be similar, complementary, or alternative`);
      }
      if (options.checkRelations && options.allIds && !options.allIds.has(rel.equipmentId)) {
        errors.push(`relatedEquipment[${idx}] references unknown equipmentId "${rel.equipmentId}"`);
      }
    });
  }

  // 9. Metadata
  const meta = rec.metadata;
  if (!meta || typeof meta !== 'object') {
    errors.push('Missing metadata object');
  } else {
    if (!['Beginner', 'Intermediate', 'Advanced'].includes(meta.difficultyLevel)) {
      errors.push(`Invalid metadata.difficultyLevel "${meta.difficultyLevel}"`);
    }
    if (!['needs-review', 'partially-verified', 'verified'].includes(meta.reviewStatus)) {
      errors.push(`Invalid metadata.reviewStatus "${meta.reviewStatus}"`);
    }
    if (meta.reviewStatus === 'needs-review' && meta.lastReviewed && meta.lastReviewed.length > 0) {
      errors.push('metadata.lastReviewed should be empty string when reviewStatus is "needs-review"');
    }
    if (meta.lastReviewed && !/^\d{4}-\d{2}-\d{2}$/.test(meta.lastReviewed)) {
      errors.push('metadata.lastReviewed must be empty or format YYYY-MM-DD');
    }
    if (!meta.completeness || typeof meta.completeness !== 'object') {
      errors.push('Missing metadata.completeness object');
    } else {
      if (!['unchecked', 'valid', 'invalid'].includes(meta.completeness.schema)) {
        errors.push(`Invalid completeness.schema "${meta.completeness.schema}"`);
      }
      if (!['incomplete', 'complete-applicable'].includes(meta.completeness.content)) {
        errors.push(`Invalid completeness.content "${meta.completeness.content}"`);
      }
      if (!['unverified', 'partially-verified', 'verified'].includes(meta.completeness.evidence)) {
        errors.push(`Invalid completeness.evidence "${meta.completeness.evidence}"`);
      }
    }
    if (!Array.isArray(meta.references) || meta.references.length === 0) {
      errors.push('metadata.references must be a non-empty array');
    } else {
      meta.references.forEach((ref, idx) => {
        if (!ref.title || typeof ref.title !== 'string') {
          errors.push(`metadata.references[${idx}] missing valid title`);
        }
        if (typeof ref.urlChecked !== 'boolean') {
          errors.push(`metadata.references[${idx}] urlChecked must be boolean`);
        }
        if (!ref.sourceType || typeof ref.sourceType !== 'string') {
          errors.push(`metadata.references[${idx}] missing sourceType`);
        }
        if (!Array.isArray(ref.supports) || ref.supports.length === 0) {
          errors.push(`metadata.references[${idx}] supports must be non-empty array of claims`);
        }
      });
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateAll(records, options = { checkRelations: true, expectedPdfCount: 62, expectedAdditions: ['microscope'] }) {
  const summary = {
    totalRecords: records.length,
    pdfRecordsCount: 0,
    addedRecordsCount: 0,
    validRecords: 0,
    invalidRecords: 0,
    uniqueIds: new Set(),
    duplicateIds: [],
    missingPdfNumbers: [],
    duplicateTextCollisions: [],
    errorsByRecord: {},
    passed: false
  };

  const allIds = new Set(records.map(r => r?.id).filter(Boolean));
  const textRegistry = new Map();

  const seenIds = new Set();
  const pdfRecords = [];
  const addedRecords = [];

  records.forEach((rec, idx) => {
    const id = rec?.id || `[record_${idx}]`;
    if (seenIds.has(id)) {
      summary.duplicateIds.push(id);
    }
    seenIds.add(id);
    summary.uniqueIds.add(id);

    const origin = rec?.origin || (rec?.pdfNumber !== null ? 'pdf' : 'added-by-user');
    if (origin === 'added-by-user') {
      addedRecords.push(rec);
    } else {
      pdfRecords.push(rec);
    }

    if (rec?.description) {
      const cleanDesc = rec.description.trim().toLowerCase();
      if (!textRegistry.has(cleanDesc)) textRegistry.set(cleanDesc, []);
      textRegistry.get(cleanDesc).push(`description of ${id}`);
    }
  });

  summary.pdfRecordsCount = pdfRecords.length;
  summary.addedRecordsCount = addedRecords.length;

  // Check missing PDF numbers if expectedPdfCount is active
  if (options.expectedPdfCount) {
    const foundNums = new Set(pdfRecords.map(r => r?.pdfNumber));
    for (let i = 1; i <= options.expectedPdfCount; i++) {
      if (!foundNums.has(i)) {
        summary.missingPdfNumbers.push(i);
      }
    }
  }

  // Check text duplicates across different records
  for (const [text, occurrences] of textRegistry.entries()) {
    if (occurrences.length > 1) {
      summary.duplicateTextCollisions.push({
        textSnippet: text.slice(0, 60) + '...',
        occurrences
      });
    }
  }

  // Validate each record
  records.forEach((rec, idx) => {
    const recId = rec?.id || `record_${idx + 1}`;
    const result = validateRecord(rec, {
      checkRelations: options.checkRelations,
      allIds
    });
    if (result.valid) {
      summary.validRecords++;
    } else {
      summary.invalidRecords++;
      summary.errorsByRecord[recId] = result.errors;
    }
  });

  const pdfCountOk = options.expectedPdfCount ? pdfRecords.length === options.expectedPdfCount : true;
  summary.passed = pdfCountOk &&
    summary.invalidRecords === 0 &&
    summary.duplicateIds.length === 0 &&
    summary.missingPdfNumbers.length === 0 &&
    summary.duplicateTextCollisions.length === 0;

  return summary;
}

// Standalone CLI execution
if (process.argv[1] && process.argv[1].endsWith('validate.mjs')) {
  const targetArg = process.argv[2] || path.join(__dirname, 'equipment.json');
  console.log(`Running Equipment Validator on: ${targetArg}`);

  if (!fs.existsSync(targetArg)) {
    console.error(`ERROR: Target file does not exist: ${targetArg}`);
    process.exit(1);
  }

  let content;
  try {
    content = JSON.parse(fs.readFileSync(targetArg, 'utf8'));
  } catch (err) {
    console.error(`ERROR: Failed to parse JSON in ${targetArg}: ${err.message}`);
    process.exit(1);
  }

  const records = Array.isArray(content) ? content : (content.records || [content]);
  const isSingleBatch = records.length < 62;
  const result = validateAll(records, {
    checkRelations: !isSingleBatch,
    expectedPdfCount: isSingleBatch ? null : 62,
    expectedAdditions: ['microscope']
  });

  console.log('--- VALIDATION SUMMARY ---');
  console.log(`Total records checked: ${result.totalRecords} (${result.pdfRecordsCount} PDF records + ${result.addedRecordsCount} added records)`);
  console.log(`Valid records: ${result.validRecords}`);
  console.log(`Invalid records: ${result.invalidRecords}`);
  console.log(`Duplicate IDs: ${result.duplicateIds.length ? result.duplicateIds.join(', ') : 'None'}`);
  console.log(`Duplicate text collisions: ${result.duplicateTextCollisions.length}`);

  if (result.missingPdfNumbers.length > 0) {
    console.log(`Missing PDF numbers: ${result.missingPdfNumbers.join(', ')}`);
  }

  if (result.duplicateTextCollisions.length > 0) {
    console.log('Duplicates:');
    result.duplicateTextCollisions.forEach(d => console.log(`  - [${d.occurrences.join(', ')}]: ${d.textSnippet}`));
  }

  if (result.invalidRecords > 0) {
    console.log('\n--- ERRORS DETAIL ---');
    for (const [id, errors] of Object.entries(result.errorsByRecord)) {
      console.log(`Record [${id}]:`);
      errors.forEach(e => console.log(`  - ${e}`));
    }
  }

  console.log('\nRESULT:', result.passed ? 'PASSED ✅' : 'FAILED ❌');
  process.exit(result.passed ? 0 : 1);
}

