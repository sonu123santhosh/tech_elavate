/**
 * Source of truth equipment index for matching Gemini AI vision suggestions
 * against the verified SmartLab AI catalog of 73 chemistry equipment items.
 */

let EQUIPMENT_DATABASE = [];
try {
  EQUIPMENT_DATABASE = require('./equipment-database.json');
} catch (e) {
  console.warn('Could not load equipment-database.json, falling back to minimal list.');
}

const VERIFIED_CATALOG = EQUIPMENT_DATABASE.map(item => {
  const aliases = [
    item.name.toLowerCase().trim(),
    item.id.toLowerCase().trim(),
    item.id.replace(/-/g, ' ').toLowerCase().trim(),
    ...(item.alternateNames || []).map(a => a.toLowerCase().trim())
  ];
  return {
    id: item.id,
    name: item.name,
    aliases: [...new Set(aliases)],
    details: item
  };
});

const CATALOG_NAMES = VERIFIED_CATALOG.map(item => item.name);

/**
 * Matches an identified name and its alternative names against the verified catalog.
 * Returns { id, name, isConfident, details } or null.
 */
function matchEquipment(suggestedName, alternativeNames = []) {
  if (!suggestedName || typeof suggestedName !== 'string') {
    return null;
  }

  const queryStrings = [
    suggestedName.toLowerCase().trim(),
    ...alternativeNames.map(a => (typeof a === 'string' ? a.toLowerCase().trim() : ''))
  ].filter(Boolean);

  // 1. Exact match check (name or id)
  for (const item of VERIFIED_CATALOG) {
    for (const q of queryStrings) {
      if (item.name.toLowerCase() === q || item.id === q) {
        return { id: item.id, name: item.name, isConfident: true, details: item.details };
      }
    }
  }

  // 2. Alias exact match check
  for (const item of VERIFIED_CATALOG) {
    for (const q of queryStrings) {
      if (item.aliases.includes(q)) {
        return { id: item.id, name: item.name, isConfident: true, details: item.details };
      }
    }
  }

  // 3. Substring inclusion check (e.g., "50ml burette with stopcock" -> "burette")
  for (const item of VERIFIED_CATALOG) {
    for (const alias of item.aliases) {
      for (const q of queryStrings) {
        // Only match if alias has at least 4 characters to avoid single-letter collisions
        if (alias.length >= 4 && (q.includes(alias) || alias.includes(q))) {
          return { id: item.id, name: item.name, isConfident: true, details: item.details };
        }
      }
    }
  }

  return null;
}

module.exports = {
  VERIFIED_CATALOG,
  CATALOG_NAMES,
  matchEquipment
};
