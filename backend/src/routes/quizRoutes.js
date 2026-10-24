/**
 * Equipment & Quiz API Routes
 */

import { Router } from 'express';
import {
  handleGetAllEquipment,
  handleGetEquipmentById,
  handleEvaluateQuiz,
} from '../controllers/quizController.js';

const router = Router();

// Retrieve all 63 items
router.get('/equipment', handleGetAllEquipment);

// Retrieve single item by ID
router.get('/equipment/:id', handleGetEquipmentById);

// Authoritative quiz answer evaluation
router.post('/quiz/evaluate', handleEvaluateQuiz);

export default router;
