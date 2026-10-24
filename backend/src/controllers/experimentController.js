/**
 * Virtual Chemistry Lab — Experiments Controller
 * Provides RESTful access to the 15 virtual chemistry experiments
 * and handles authoritative server-side quiz evaluations.
 */

import {
  getAllExperiments,
  getExperimentById,
  evaluateExperimentQuiz,
} from '../../../frontend/src/features/virtual-lab/data/experimentsDatabase.js';

/**
 * GET /api/virtual-lab/experiments
 * Returns summary list of all 15 experiments.
 */
export function handleGetAllExperiments(req, res) {
  try {
    const all = getAllExperiments();
    const summaries = all.map((exp) => ({
      id: exp.id,
      number: exp.number,
      title: exp.title,
      category: exp.category,
      categoryLabel: exp.categoryLabel,
      duration: exp.duration,
      difficulty: exp.difficulty,
      icon: exp.icon,
      aim: exp.aim,
      stepsCount: exp.procedureSteps ? exp.procedureSteps.length : 0,
      quizQuestionsCount: exp.quiz ? exp.quiz.length : 0,
    }));

    res.status(200).json({
      success: true,
      count: summaries.length,
      data: summaries,
    });
  } catch (err) {
    console.error('Error in handleGetAllExperiments:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve experiments list.',
    });
  }
}

/**
 * GET /api/virtual-lab/experiments/:id
 * Returns complete laboratory manual for a single experiment (with sanitized quiz answers).
 */
export function handleGetExperimentById(req, res) {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid experiment ID parameter.',
      });
    }

    const exp = getExperimentById(id.trim());
    if (!exp) {
      return res.status(404).json({
        success: false,
        error: `Experiment "${id}" was not found in the laboratory curriculum.`,
      });
    }

    // Sanitize quiz questions so correct answers are not leaked before submission
    const sanitizedQuiz = (exp.quiz || []).map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
    }));

    res.status(200).json({
      success: true,
      data: {
        id: exp.id,
        number: exp.number,
        title: exp.title,
        category: exp.category,
        categoryLabel: exp.categoryLabel,
        duration: exp.duration,
        difficulty: exp.difficulty,
        icon: exp.icon,
        aim: exp.aim,
        principle: exp.principle,
        apparatus: exp.apparatus,
        chemicals: exp.chemicals,
        diagramType: exp.diagramType,
        procedureSteps: exp.procedureSteps,
        observationTable: exp.observationTable,
        formulae: exp.formulae,
        calculations: exp.calculations,
        result: exp.result,
        safetyPrecautions: exp.safetyPrecautions,
        quizQuestions: sanitizedQuiz,
      },
    });
  } catch (err) {
    console.error(`Error in handleGetExperimentById for "${req.params.id}":`, err);
    res.status(500).json({
      success: false,
      error: 'Internal server error retrieving experiment details.',
    });
  }
}

/**
 * POST /api/virtual-lab/quiz/evaluate
 * Server-side evaluation of experiment quiz answers.
 */
export function handleEvaluateExperimentQuiz(req, res) {
  try {
    const { experimentId, answers } = req.body || {};

    if (!experimentId || typeof experimentId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid "experimentId" field in request body.',
      });
    }

    const exp = getExperimentById(experimentId.trim());
    if (!exp) {
      return res.status(404).json({
        success: false,
        error: `Experiment "${experimentId}" does not exist.`,
      });
    }

    const expectedQuestions = exp.quiz || [];
    if (!Array.isArray(answers) || answers.length !== expectedQuestions.length) {
      return res.status(400).json({
        success: false,
        error: `The "answers" field must be an array of exactly ${expectedQuestions.length} answer indices.`,
      });
    }

    const evaluation = evaluateExperimentQuiz(experimentId, answers);

    if (!evaluation.isValid) {
      return res.status(400).json({
        success: false,
        error: evaluation.error,
      });
    }

    res.status(200).json({
      success: true,
      evaluation,
    });
  } catch (err) {
    console.error('Error evaluating experiment quiz:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to evaluate experiment quiz submission.',
    });
  }
}
