import fs from 'fs';
import path from 'path';

const EXPERIMENTS_PATH = path.resolve('data/experiments.json');
const EQUIPMENT_PATH = path.resolve('equipment-db/equipment.json');

const EXPECTED_EXPERIMENTS = [
  { id: 'acid-base-titration', name: 'Acid–Base Titration' },
  { id: 'ph-determination', name: 'pH Determination' },
  { id: 'standard-solution-preparation', name: 'Preparation of a Standard Solution' },
  { id: 'filtration', name: 'Filtration' },
  { id: 'recrystallization', name: 'Crystallization and Recrystallization' },
  { id: 'paper-chromatography', name: 'Paper Chromatography' },
  { id: 'simple-distillation', name: 'Simple Distillation' },
  { id: 'water-hardness', name: 'Determination of Water Hardness' },
  { id: 'conductometric-titration', name: 'Conductometric Titration' },
  { id: 'ph-metric-titration', name: 'pH-Metric Titration' },
  { id: 'chloride-estimation-water', name: 'Chloride Estimation in Water' },
  { id: 'dissolved-oxygen-water', name: 'Dissolved Oxygen in Water' },
  { id: 'viscosity-measurement', name: 'Viscosity Measurement' },
  { id: 'beer-lambert-law', name: 'Beer–Lambert Law' },
  { id: 'qualitative-salt-analysis', name: 'Qualitative Salt Analysis' }
];

const ALLOWED_CATEGORIES = new Set([
  'Volumetric Analysis',
  'Instrumental Analysis',
  'Separation and Purification',
  'Solution Preparation',
  'Water Analysis',
  'Physical Chemistry',
  'Qualitative Analysis'
]);

const ALLOWED_DIFFICULTIES = new Set(['Beginner', 'Intermediate', 'Advanced']);

const EXACT_TOP_LEVEL_KEYS = [
  'id',
  'name',
  'category',
  'difficulty',
  'objective',
  'principle',
  'equipment',
  'procedure',
  'safety',
  'quiz'
].sort();

const EXACT_QUIZ_KEYS = ['question', 'options', 'correct_answer', 'explanation'].sort();

function runValidation() {
  console.log('🧪 Starting validation of Chemistry Experiment Database...\n');

  if (!fs.existsSync(EXPERIMENTS_PATH)) {
    console.error(`❌ Missing file: ${EXPERIMENTS_PATH}`);
    process.exit(1);
  }

  if (!fs.existsSync(EQUIPMENT_PATH)) {
    console.error(`❌ Missing equipment database: ${EQUIPMENT_PATH}`);
    process.exit(1);
  }

  const equipmentData = JSON.parse(fs.readFileSync(EQUIPMENT_PATH, 'utf8'));
  const validEquipmentIds = new Set(equipmentData.map(e => e.id));
  console.log(`✓ Loaded equipment database with ${validEquipmentIds.size} unique IDs.`);

  let experiments;
  try {
    experiments = JSON.parse(fs.readFileSync(EXPERIMENTS_PATH, 'utf8'));
  } catch (err) {
    console.error(`❌ Failed to parse ${EXPERIMENTS_PATH}:`, err.message);
    process.exit(1);
  }

  const errors = [];
  const warnings = [];

  // Check total count
  if (!Array.isArray(experiments) || experiments.length !== 15) {
    errors.push(`Expected exactly 15 experiments, found ${experiments ? experiments.length : 0}`);
  }

  const seenIds = new Set();
  const allUsedEquipment = new Set();

  experiments.forEach((exp, idx) => {
    const expLabel = `Experiment #${idx + 1} (${exp.id || 'unknown'})`;

    // Order and ID matching
    const expected = EXPECTED_EXPERIMENTS[idx];
    if (expected) {
      if (exp.id !== expected.id) {
        errors.push(`${expLabel}: Expected id "${expected.id}", got "${exp.id}"`);
      }
      if (exp.name !== expected.name) {
        errors.push(`${expLabel}: Expected name "${expected.name}", got "${exp.name}"`);
      }
    }

    if (seenIds.has(exp.id)) {
      errors.push(`${expLabel}: Duplicate experiment ID "${exp.id}"`);
    }
    seenIds.add(exp.id);

    // Exact top-level fields
    const actualKeys = Object.keys(exp).sort();
    if (JSON.stringify(actualKeys) !== JSON.stringify(EXACT_TOP_LEVEL_KEYS)) {
      errors.push(`${expLabel}: Top-level fields do not match schema. Expected: [${EXACT_TOP_LEVEL_KEYS.join(', ')}], Found: [${actualKeys.join(', ')}]`);
    }

    // Category
    if (!ALLOWED_CATEGORIES.has(exp.category)) {
      errors.push(`${expLabel}: Invalid category "${exp.category}". Allowed: ${Array.from(ALLOWED_CATEGORIES).join(', ')}`);
    }

    // Difficulty
    if (!ALLOWED_DIFFICULTIES.has(exp.difficulty)) {
      errors.push(`${expLabel}: Invalid difficulty "${exp.difficulty}". Allowed: ${Array.from(ALLOWED_DIFFICULTIES).join(', ')}`);
    }

    // Objective
    if (typeof exp.objective !== 'string' || exp.objective.trim().length === 0) {
      errors.push(`${expLabel}: "objective" must be a non-empty string.`);
    }

    // Principle
    if (typeof exp.principle !== 'string' || exp.principle.trim().length === 0) {
      errors.push(`${expLabel}: "principle" must be a non-empty string.`);
    }

    // Equipment validation
    if (!Array.isArray(exp.equipment) || exp.equipment.length === 0) {
      errors.push(`${expLabel}: "equipment" must be a non-empty array.`);
    } else {
      const eqSet = new Set();
      exp.equipment.forEach(eqId => {
        if (!validEquipmentIds.has(eqId)) {
          errors.push(`${expLabel}: Unknown equipment ID "${eqId}" not found in equipment.json.`);
        }
        if (eqSet.has(eqId)) {
          errors.push(`${expLabel}: Duplicate equipment ID "${eqId}" in equipment list.`);
        }
        eqSet.add(eqId);
        allUsedEquipment.add(eqId);
      });
    }

    // Procedure validation
    if (!Array.isArray(exp.procedure)) {
      errors.push(`${expLabel}: "procedure" must be an array.`);
    } else {
      if (exp.procedure.length < 6 || exp.procedure.length > 12) {
        errors.push(`${expLabel}: "procedure" must have between 6 and 12 steps (got ${exp.procedure.length}).`);
      }
      exp.procedure.forEach((step, sIdx) => {
        if (typeof step !== 'string' || step.trim().length === 0) {
          errors.push(`${expLabel}: Procedure step ${sIdx + 1} must be a non-empty string.`);
        } else if (/^\d+[\.\)\s]/.test(step.trim())) {
          errors.push(`${expLabel}: Procedure step ${sIdx + 1} starts with a number. Numbers must be omitted.`);
        }
      });
    }

    // Safety validation
    if (!Array.isArray(exp.safety)) {
      errors.push(`${expLabel}: "safety" must be an array.`);
    } else {
      if (exp.safety.length < 4 || exp.safety.length > 8) {
        errors.push(`${expLabel}: "safety" must have between 4 and 8 items (got ${exp.safety.length}).`);
      }
      exp.safety.forEach((rule, rIdx) => {
        if (typeof rule !== 'string' || rule.trim().length === 0) {
          errors.push(`${expLabel}: Safety item ${rIdx + 1} must be a non-empty string.`);
        }
      });
    }

    // Quiz validation
    if (!Array.isArray(exp.quiz) || exp.quiz.length < 3) {
      errors.push(`${expLabel}: "quiz" must be an array with at least 3 questions.`);
    } else {
      exp.quiz.forEach((q, qIdx) => {
        const qLabel = `${expLabel} Quiz Q#${qIdx + 1}`;
        const qKeys = Object.keys(q).sort();
        if (JSON.stringify(qKeys) !== JSON.stringify(EXACT_QUIZ_KEYS)) {
          errors.push(`${qLabel}: Quiz question keys do not match schema. Expected: [${EXACT_QUIZ_KEYS.join(', ')}], Found: [${qKeys.join(', ')}]`);
        }
        if (typeof q.question !== 'string' || q.question.trim().length === 0) {
          errors.push(`${qLabel}: "question" must be a non-empty string.`);
        }
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          errors.push(`${qLabel}: "options" must be an array of exactly 4 strings.`);
        } else {
          q.options.forEach((opt, oIdx) => {
            if (typeof opt !== 'string' || opt.trim().length === 0) {
              errors.push(`${qLabel}: Option #${oIdx + 1} is empty or not a string.`);
            }
          });
          if (!q.options.includes(q.correct_answer)) {
            errors.push(`${qLabel}: "correct_answer" ("${q.correct_answer}") is not present in options.`);
          }
        }
        if (typeof q.explanation !== 'string' || q.explanation.trim().length === 0) {
          errors.push(`${qLabel}: "explanation" must be a non-empty string.`);
        }
      });
    }
  });

  console.log('\n================ VALIDATION REPORT ================');
  console.log(`Total Experiments Audited: ${experiments.length} / 15`);
  console.log(`Unique Equipment Tools Referenced: ${allUsedEquipment.size} / ${validEquipmentIds.size}`);
  
  if (warnings.length > 0) {
    console.log(`\n⚠️  Warnings (${warnings.length}):`);
    warnings.forEach(w => console.log('  - ' + w));
  }

  if (errors.length > 0) {
    console.error(`\n❌  Errors Found (${errors.length}):`);
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
  } else {
    console.log('\n✅ ALL 15 EXPERIMENT RECORDS ARE 100% VALID AND COMPLIANT!');
    console.log(' - Schema adherence: PERFECT');
    console.log(' - Equipment IDs: ALL VERIFIED AGAINST equipment.json');
    console.log(' - No duplicate equipment inside any experiment');
    console.log(' - Categories: STRICTLY MATCH 7 ALLOWED VALUES');
    console.log(' - Quiz structure & options: VERIFIED');
    process.exit(0);
  }
}

runValidation();
