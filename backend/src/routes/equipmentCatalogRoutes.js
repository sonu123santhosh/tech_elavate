/**
 * Equipment Catalog & Simulator Routes
 */

import { Router } from 'express';
import {
  handleGetEquipmentCatalog,
  handleGetEquipmentToolById,
  handleGetSimulatorExperiments,
} from '../controllers/equipmentCatalogController.js';

const router = Router();

// 62-tool ground truth database with photos & technical specs
router.get('/equipment-catalog', handleGetEquipmentCatalog);
router.get('/equipment-catalog/:id', handleGetEquipmentToolById);

// 8 interactive simulator experiments metadata
router.get('/simulator/experiments', handleGetSimulatorExperiments);

export default router;
