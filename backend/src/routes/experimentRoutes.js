/**
 * Virtual Chemistry Lab API Routes
 */

import { Router } from 'express';
import {
  handleGetAllExperiments,
  handleGetExperimentById,
  handleEvaluateExperimentQuiz,
} from '../controllers/experimentController.js';

const router = Router();

// Retrieve all 15 experiments
router.get('/experiments', handleGetAllExperiments);

// Retrieve single experiment by ID or number
router.get('/experiments/:id', handleGetExperimentById);

// Authoritative quiz answer evaluation
router.post('/quiz/evaluate', handleEvaluateExperimentQuiz);

export default router;
