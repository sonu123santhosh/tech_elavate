/**
 * Equipment Catalog & Simulator Experiments Controller
 * Provides authoritative access to the 62 Ground Truth Laboratory Tools and 8 Simulator Experiments.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to data
const EQUIPMENT_JSON_PATH = path.resolve(__dirname, '../../../equipment-db/equipment.json');
const CATEGORIES_JSON_PATH = path.resolve(__dirname, '../../../equipment-db/categories.json');
const EXPERIMENTS_JSON_PATH = path.resolve(__dirname, '../../../data/experiments.json');

let cachedEquipment = null;
let cachedCategories = null;
let cachedExperiments = null;

function loadEquipmentData() {
  if (!cachedEquipment) {
    try {
      if (fs.existsSync(EQUIPMENT_JSON_PATH)) {
        const raw = fs.readFileSync(EQUIPMENT_JSON_PATH, 'utf-8');
        cachedEquipment = JSON.parse(raw);
      } else {
        cachedEquipment = [];
      }
    } catch (err) {
      console.error('Failed to load equipment.json:', err);
      cachedEquipment = [];
    }
  }
  return cachedEquipment;
}

function loadCategoriesData() {
  if (!cachedCategories) {
    try {
      if (fs.existsSync(CATEGORIES_JSON_PATH)) {
        const raw = fs.readFileSync(CATEGORIES_JSON_PATH, 'utf-8');
        cachedCategories = JSON.parse(raw);
      } else {
        cachedCategories = [];
      }
    } catch (err) {
      console.error('Failed to load categories.json:', err);
      cachedCategories = [];
    }
  }
  return cachedCategories;
}

function loadExperimentsData() {
  if (!cachedExperiments) {
    try {
      if (fs.existsSync(EXPERIMENTS_JSON_PATH)) {
        const raw = fs.readFileSync(EXPERIMENTS_JSON_PATH, 'utf-8');
        cachedExperiments = JSON.parse(raw);
      } else {
        cachedExperiments = [];
      }
    } catch (err) {
      console.error('Failed to load experiments.json:', err);
      cachedExperiments = [];
    }
  }
  return cachedExperiments;
}

/**
 * GET /api/equipment-catalog
 * Returns all 62 equipment items with search and category filtering.
 */
export function handleGetEquipmentCatalog(req, res) {
  try {
    const equipment = loadEquipmentData();
    const categories = loadCategoriesData();
    const { category, search, limit } = req.query;

    let filtered = equipment;

    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      filtered = filtered.filter((item) => (item.category || '').toLowerCase() === catLower);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((item) => {
        const name = (item.name || '').toLowerCase();
        const id = (item.id || '').toLowerCase();
        const purpose = (item.purpose || '').toLowerCase();
        const altNames = (item.alternativeNames || []).join(' ').toLowerCase();
        return name.includes(q) || id.includes(q) || purpose.includes(q) || altNames.includes(q);
      });
    }

    if (limit && !isNaN(parseInt(limit, 10))) {
      filtered = filtered.slice(0, parseInt(limit, 10));
    }

    res.status(200).json({
      success: true,
      totalCount: equipment.length,
      matchedCount: filtered.length,
      categories: categories,
      data: filtered,
    });
  } catch (err) {
    console.error('Error in handleGetEquipmentCatalog:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve equipment catalog.',
    });
  }
}

/**
 * GET /api/equipment-catalog/:id
 * Returns deep specifications for a single equipment tool.
 */
export function handleGetEquipmentToolById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Missing equipment ID parameter.' });
    }

    const equipment = loadEquipmentData();
    const tool = equipment.find((item) => item.id.toLowerCase() === id.toLowerCase());

    if (!tool) {
      return res.status(404).json({
        success: false,
        error: `Equipment tool with ID "${id}" was not found in the 62-tool catalog.`,
      });
    }

    res.status(200).json({
      success: true,
      data: tool,
    });
  } catch (err) {
    console.error(`Error in handleGetEquipmentToolById for "${req.params.id}":`, err);
    res.status(500).json({
      success: false,
      error: 'Internal error retrieving equipment tool.',
    });
  }
}

/**
 * GET /api/simulator/experiments
 * Returns the 8 interactive 2D simulation experiment configurations.
 */
export function handleGetSimulatorExperiments(req, res) {
  try {
    const experiments = loadExperimentsData();
    res.status(200).json({
      success: true,
      count: experiments.length,
      data: experiments,
    });
  } catch (err) {
    console.error('Error in handleGetSimulatorExperiments:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve simulator experiments.',
    });
  }
}
