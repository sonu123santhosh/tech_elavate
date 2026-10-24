/**
 * Equipment & Quiz Controller
 *
 * Provides RESTful access to the 63 laboratory equipment items and
 * performs authoritative server-side quiz evaluation.
 */

import {
  getAllEquipment,
  getEquipmentById,
  evaluateQuiz,
} from '../../../frontend/src/features/ar-quiz/equipmentDatabase.js';

/**
 * GET /api/equipment
 * Returns summary list of all 63 equipment items (without leaking quiz answers).
 */
export function handleGetAllEquipment(req, res) {
  try {
    const all = getAllEquipment();
    const summaries = all.map((item) => ({
      id: item.id,
      number: item.number,
      name: item.name,
      category: item.category,
      mainUse: item.mainUse,
    }));

    res.status(200).json({
      success: true,
      count: summaries.length,
      data: summaries,
    });
  } catch (err) {
    console.error('Error in handleGetAllEquipment:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve equipment database.',
    });
  }
}

/**
 * GET /api/equipment/:id
 * Returns complete equipment instructions and quiz questions (with sanitized answers).
 */
export function handleGetEquipmentById(req, res) {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing equipment ID parameter.',
      });
    }

    const item = getEquipmentById(id.trim());
    if (!item) {
      return res.status(404).json({
        success: false,
        error: `Equipment with ID "${id}" was not found in the laboratory database.`,
      });
    }

    // Sanitize quiz questions to avoid leaking correctAnswer indices before submission
    const sanitizedQuestions = (item.quiz || []).map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
    }));

    res.status(200).json({
      success: true,
      data: {
        id: item.id,
        number: item.number,
        name: item.name,
        category: item.category,
        mainUse: item.mainUse,
        operatingInstructions: item.operatingInstructions,
        handlingGuidance: item.handlingGuidance,
        safetyPrecautions: item.safetyPrecautions,
        quizQuestions: sanitizedQuestions,
      },
    });
  } catch (err) {
    console.error(`Error in handleGetEquipmentById for "${req.params.id}":`, err);
    res.status(500).json({
      success: false,
      error: 'Internal error retrieving equipment record.',
    });
  }
}

/**
 * POST /api/quiz/evaluate
 * Evaluates submitted student answers authoritatively on the server.
 * Never trusts client-provided scores.
 */
export function handleEvaluateQuiz(req, res) {
  try {
    const { equipmentId, answers } = req.body || {};

    if (!equipmentId || typeof equipmentId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid "equipmentId" field in submission.',
      });
    }

    const item = getEquipmentById(equipmentId.trim());
    if (!item) {
      return res.status(404).json({
        success: false,
        error: `Equipment item "${equipmentId}" does not exist.`,
      });
    }

    if (!Array.isArray(answers) || answers.length !== 5) {
      return res.status(400).json({
        success: false,
        error: 'The "answers" field must be an array of exactly 5 answer indices.',
      });
    }

    // Validate that each answer is either an integer between 0 and 3 or null
    for (let i = 0; i < answers.length; i++) {
      const a = answers[i];
      if (a !== null && (!Number.isInteger(a) || a < 0 || a > 3)) {
        return res.status(400).json({
          success: false,
          error: `Answer index at position ${i} is invalid. Must be 0, 1, 2, 3, or null.`,
        });
      }
    }

    // Authoritative evaluation
    const evaluation = evaluateQuiz(equipmentId, answers);

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
    console.error('Error evaluating quiz submission:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to evaluate quiz submission.',
    });
  }
}
