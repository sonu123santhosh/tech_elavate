/**
 * Comprehensive Automated Test Suite for 62 Chemistry Lab Tools Database & Viewer
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "equipment-db", "equipment.json");
const indexPath = path.join(__dirname, "equipment-db", "equipment.index.json");
const mapPath = path.join(__dirname, "equipment-db", "recognition-map.json");
const categoriesPath = path.join(__dirname, "equipment-db", "categories.json");

console.log("=== RUNNING SUITE OF AUTOMATED TESTS ===");

const rawDb = fs.readFileSync(dbPath, "utf8");
const database = JSON.parse(rawDb);
const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const recognitionMap = JSON.parse(fs.readFileSync(mapPath, "utf8"));
const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${testName}`);
    failedCount++;
  }
}

// 1. Database Integrity & Count
console.log("\n1. Testing Record Count & Unique IDs:");
assert(database.length === 62, "Database contains exactly 62 records");
assert(index.length === 62, "Index contains exactly 62 entries");
const uniqueIds = new Set(database.map(d => d.id));
assert(uniqueIds.size === 62, "All 62 records have distinct IDs");

// 2. getEquipmentById API simulation
console.log("\n2. Testing getEquipmentById API & Edge Cases:");
function getEquipmentById(id) {
  if (!id) return null;
  const canonicalId = String(id).trim().toLowerCase();
  return database.find(item => item.id === canonicalId) || null;
}

assert(getEquipmentById("beaker") !== null, "Known ID 'beaker' returns record #1");
assert(getEquipmentById("BEAKER") !== null, "Case-insensitive lookup for 'BEAKER' works");
assert(getEquipmentById("unknown-tool-xyz") === null, "Unknown ID 'unknown-tool-xyz' correctly returns null");
assert(getEquipmentById("") === null, "Empty ID lookup correctly returns null");
assert(getEquipmentById(null) === null, "Null ID lookup correctly returns null");

// 3. Search Simulation
console.log("\n3. Testing Search Capabilities:");
function searchTools(query) {
  const q = query.toLowerCase().trim();
  return database.filter(tool => {
    const matchName = tool.name.toLowerCase().includes(q);
    const matchId = tool.id.toLowerCase().includes(q);
    const matchPurpose = tool.purpose.toLowerCase().includes(q);
    const matchNum = String(tool.pdfNumber).includes(q);
    const matchAlt = tool.alternativeNames && tool.alternativeNames.some(a => a.toLowerCase().includes(q));
    return matchName || matchId || matchPurpose || matchNum || matchAlt;
  });
}

const beakerSearch = searchTools("beaker");
assert(beakerSearch.some(t => t.id === "beaker"), "Search for 'beaker' finds Beaker");

const erlenmeyerSearch = searchTools("erlenmeyer");
assert(erlenmeyerSearch.some(t => t.id === "conical-flask"), "Search for alternative name 'erlenmeyer' finds Conical Flask");

const titrationSearch = searchTools("titration");
assert(titrationSearch.length >= 2, `Search for purpose keyword 'titration' finds ${titrationSearch.length} items (expected at least 2: burette & conical flask)`);

// 4. Category and PDF Group Filtering
console.log("\n4. Testing Category and PDF Group Filters:");
categories.categories.forEach(catObj => {
  const cat = catObj.name;
  const filtered = database.filter(t => t.category === cat);
  assert(filtered.length > 0, `Category '${cat}' has ${filtered.length} associated tools`);
});

categories.pdfGroups.forEach(grp => {
  const filtered = database.filter(t => t.pdfGroup === grp);
  assert(filtered.length > 0, `PDF Group '${grp}' has ${filtered.length} associated tools`);
});

// 5. One Detail Page Verified per Category (all 9 categories)
console.log("\n5. Testing Detail Page Content for 1 Tool per Category (All 9 Categories):");
const sampleToolsPerCategory = {
  "Glassware": "beaker",
  "Basic Tools and Consumables": "spatula",
  "Heating Equipment": "bunsen-burner",
  "Support Equipment": "retort-stand",
  "Separation Equipment": "separating-funnel",
  "Measuring Instruments": "analytical-balance",
  "Safety Equipment": "safety-goggles",
  "Cleaning and Storage": "test-tube-brush",
  "pH and Analytical Instruments": "laboratory-ph-meter"
};

for (const [cat, toolId] of Object.entries(sampleToolsPerCategory)) {
  const tool = getEquipmentById(toolId);
  const hasSections = (
    tool &&
    tool.name &&
    tool.purpose &&
    tool.description &&
    tool.specifications &&
    tool.specifications.material.length > 0 &&
    tool.specifications.capacity &&
    tool.specifications.partsAndFunctions.length > 0 &&
    tool.operatingInstructions.steps.length >= 3 &&
    tool.safetyPrecautions.hazards.length > 0 &&
    tool.safetyPrecautions.requiredPPE.length > 0 &&
    tool.maintenanceAndTroubleshooting.cleaningSteps.length > 0 &&
    tool.maintenanceAndTroubleshooting.troubleshooting.length >= 1 &&
    tool.maintenanceAndTroubleshooting.commonMistakes.length >= 1 &&
    tool.relatedEquipment.length > 0 &&
    tool.metadata.references.length > 0
  );
  assert(hasSections, `Full detail structure complete for Category '${cat}' (tool: ${toolId})`);
}

// 6. Related Link Navigation Integrity
console.log("\n6. Testing Related Equipment Links Integrity (No dead links or self-links):");
let deadLinks = 0;
let selfLinks = 0;
database.forEach(tool => {
  tool.relatedEquipment.forEach(rel => {
    if (rel.equipmentId === tool.id) selfLinks++;
    if (!uniqueIds.has(rel.equipmentId)) deadLinks++;
  });
});
assert(deadLinks === 0, `Zero dead related equipment links found across all 62 tools`);
assert(selfLinks === 0, `Zero self-links found across all 62 tools`);

// 7. Missing Image and Missing 3D Model Fallback
console.log("\n7. Testing Asset Fallbacks (Missing images / 3D models):");
const missingImages = database.filter(t => t.image.status === "fallback");
const missing3dModels = database.filter(t => t.ar.modelStatus === "missing");
assert(missingImages.length === 62, `All 62 tools gracefully declare image fallback status`);
assert(missing3dModels.length === 62, `All 62 tools gracefully declare 3D model missing/fallback status`);

// 8. Scanner Contract & Low-Confidence / Unknown Handling
console.log("\n8. Testing AI Scanner Contract & Unknown/Low-Confidence Fallbacks:");
assert(recognitionMap.supportedModelClasses.length === 0, "Vision model active classes is 0 (as user left prompt list blank)");
assert(recognitionMap.fallbackWorkflow.unrecognizedClass.action === "ROUTE_TO_MANUAL_SEARCH", "Unrecognized classes route to manual search");
assert(recognitionMap.confidenceThresholds.fallbackBehavior === "manual-search-selection", "Low-confidence queries fallback to manual selection");

console.log("\n=========================================");
console.log(`TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
if (failedCount > 0) {
  process.exit(1);
} else {
  console.log("ALL TESTS COMPLETED SUCCESSFULLY ✅");
}
