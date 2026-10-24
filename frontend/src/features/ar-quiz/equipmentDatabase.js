/**
 * Master Equipment Database & Helper Functions for the Smart AR Chemistry Lab Assistant.
 *
 * Consolidates all 63 items across:
 * - Part 1: Items 1–20 (Glassware & Basics)
 * - Part 2: Items 21–40 (Heating, Handling & Separation)
 * - Part 3: Items 41–60 (Safety, Measurement & Accessories)
 * - Part 4: Items 61–63 (pH Instruments & Microscope)
 */

import { PART1_EQUIPMENT } from './data/part1_glassware.js';
import { PART2_EQUIPMENT } from './data/part2_heating.js';
import { PART3_EQUIPMENT } from './data/part3_safety.js';
import { PART4_EQUIPMENT } from './data/part4_ph_microscope.js';

export const EQUIPMENT_DATABASE = [
  ...PART1_EQUIPMENT,
  ...PART2_EQUIPMENT,
  ...PART3_EQUIPMENT,
  ...PART4_EQUIPMENT,
];

/**
 * Returns all 63 equipment records.
 */
export function getAllEquipment() {
  return EQUIPMENT_DATABASE;
}

/**
 * Retrieves a single equipment record by its unique ID.
 * @param {string} id
 */
export function getEquipmentById(id) {
  if (!id) return null;
  return EQUIPMENT_DATABASE.find((item) => item.id.toLowerCase() === id.toLowerCase()) || null;
}

/**
 * Filters equipment by category ('glassware', 'heating-handling', 'safety-measurement', 'ph-instruments', 'accessories').
 * @param {string} category
 */
export function getEquipmentByCategory(category) {
  if (!category || category === 'all') return EQUIPMENT_DATABASE;
  return EQUIPMENT_DATABASE.filter((item) => item.category === category);
}

/**
 * Searches equipment by name, ID, or main use keyword.
 * @param {string} query
 */
export function searchEquipment(query) {
  if (!query || !query.trim()) return EQUIPMENT_DATABASE;
  const q = query.trim().toLowerCase();
  return EQUIPMENT_DATABASE.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.mainUse.toLowerCase().includes(q)
  );
}

/**
 * Evaluates submitted quiz answers for an equipment item.
 * @param {string} equipmentId
 * @param {Array<number>} submittedAnswers Array of 5 chosen option indices (0-3)
 * @returns {object} Score, percentage, summary, and question-by-question review
 */
export function evaluateQuiz(equipmentId, submittedAnswers) {
  const equipment = getEquipmentById(equipmentId);
  if (!equipment) {
    return {
      isValid: false,
      error: `Equipment item "${equipmentId}" not found in database.`,
    };
  }

  const questions = equipment.quiz || [];
  if (questions.length !== 5) {
    return {
      isValid: false,
      error: `Equipment "${equipment.name}" does not have exactly 5 questions.`,
    };
  }

  let correctCount = 0;
  const review = questions.map((q, idx) => {
    const userAnswerIndex = Array.isArray(submittedAnswers) ? submittedAnswers[idx] : null;
    const isAnswered = userAnswerIndex !== null && userAnswerIndex !== undefined && userAnswerIndex >= 0;
    const isCorrect = isAnswered && userAnswerIndex === q.correctAnswer;

    if (isCorrect) correctCount++;

    return {
      questionId: q.id,
      questionText: q.question,
      options: q.options,
      userAnswerIndex,
      userAnswerText: isAnswered && q.options[userAnswerIndex] ? q.options[userAnswerIndex] : 'Not answered',
      correctAnswerIndex: q.correctAnswer,
      correctAnswerText: q.options[q.correctAnswer],
      isCorrect,
      explanation: q.explanation,
    };
  });

  const totalQuestions = 5;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  let message = '';
  if (correctCount === 5) {
    message = ' Perfect Score! You have mastered the purpose, operation, and safety of this equipment.';
  } else if (correctCount >= 4) {
    message = ' Excellent work! You demonstrated strong knowledge of this laboratory instrument.';
  } else if (correctCount >= 3) {
    message = ' Good job! You passed the quiz. Review the explanations below to cement your understanding.';
  } else if (correctCount >= 2) {
    message = ' Keep practicing! Re-read the equipment instructions and retry the quiz to improve your score.';
  } else {
    message = '️ Needs review. Carefully study the operating guidelines and safety precautions before retrying.';
  }

  return {
    isValid: true,
    equipmentId: equipment.id,
    equipmentName: equipment.name,
    score: correctCount,
    totalQuestions,
    percentage,
    message,
    review,
  };
}
