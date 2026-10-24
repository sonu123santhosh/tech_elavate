/**
 * Master Experiments Database for Virtual Chemistry Lab
 * Consolidates all 15 engineering chemistry experiments.
 */

import { EXPERIMENTS_1_TO_5 } from './exp1_to_5.js';
import { EXPERIMENTS_6_TO_10 } from './exp6_to_10.js';
import { EXPERIMENTS_11_TO_15 } from './exp11_to_15.js';

export const EXPERIMENTS_DATABASE = [
  ...EXPERIMENTS_1_TO_5,
  ...EXPERIMENTS_6_TO_10,
  ...EXPERIMENTS_11_TO_15,
];

/**
 * Returns all 15 experiment records.
 */
export function getAllExperiments() {
  return EXPERIMENTS_DATABASE;
}

/**
 * Retrieves a single experiment by unique ID or numeric index (1–15).
 * @param {string|number} idOrNumber
 */
export function getExperimentById(idOrNumber) {
  if (!idOrNumber) return null;
  const str = String(idOrNumber).trim().toLowerCase();
  return (
    EXPERIMENTS_DATABASE.find(
      (exp) => exp.id.toLowerCase() === str || String(exp.number) === str
    ) || null
  );
}

/**
 * Filters experiments by category.
 * @param {string} category 'all' | 'titrimetric' | 'instrumental' | 'separation' | 'qualitative'
 */
export function getExperimentsByCategory(category) {
  if (!category || category === 'all') return EXPERIMENTS_DATABASE;
  return EXPERIMENTS_DATABASE.filter((exp) => exp.category === category);
}

/**
 * Searches experiments by title, keywords, aim, or chemicals.
 * @param {string} query
 */
export function searchExperiments(query) {
  if (!query || !query.trim()) return EXPERIMENTS_DATABASE;
  const q = query.trim().toLowerCase();
  return EXPERIMENTS_DATABASE.filter(
    (exp) =>
      exp.title.toLowerCase().includes(q) ||
      (exp.simulatorTitle && exp.simulatorTitle.toLowerCase().includes(q)) ||
      exp.aim.toLowerCase().includes(q) ||
      exp.categoryLabel.toLowerCase().includes(q) ||
      (exp.keywords && exp.keywords.some((k) => k.toLowerCase().includes(q))) ||
      (exp.chemicals && exp.chemicals.some((c) => c.toLowerCase().includes(q))) ||
      (exp.apparatus && exp.apparatus.some((a) => a.toLowerCase().includes(q)))
  );
}

/**
 * Evaluates submitted quiz answers for a given experiment.
 * @param {string} experimentId
 * @param {Array<number>} submittedAnswers
 */
export function evaluateExperimentQuiz(experimentId, submittedAnswers) {
  const exp = getExperimentById(experimentId);
  if (!exp) {
    return {
      isValid: false,
      error: `Experiment "${experimentId}" not found.`,
    };
  }

  const questions = exp.quiz || [];
  let correctCount = 0;

  const review = questions.map((q, idx) => {
    const userAns = Array.isArray(submittedAnswers) ? submittedAnswers[idx] : null;
    const isAnswered = userAns !== null && userAns !== undefined && userAns >= 0;
    const isCorrect = isAnswered && userAns === q.correctAnswer;

    if (isCorrect) correctCount++;

    return {
      questionId: q.id,
      questionText: q.question,
      options: q.options,
      userAnswerIndex: userAns,
      userAnswerText: isAnswered && q.options[userAns] ? q.options[userAns] : 'Not answered',
      correctAnswerIndex: q.correctAnswer,
      correctAnswerText: q.options[q.correctAnswer],
      isCorrect,
      explanation: q.explanation,
    };
  });

  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);

  let message = 'Great job! Keep reviewing the lab concepts.';
  if (percentage === 100) {
    message = '🌟 Perfect Score! You have mastered the theory, procedure, and safety protocols for this experiment.';
  } else if (percentage >= 65) {
    message = '👍 Good understanding! Review the scientific explanations below to clarify key principles.';
  } else {
    message = '📚 Review Recommended: Read the experiment principle, procedure, and safety notes before re-attempting.';
  }

  return {
    isValid: true,
    experimentId: exp.id,
    experimentTitle: exp.title,
    score: correctCount,
    totalQuestions: total,
    percentage,
    message,
    review,
  };
}
