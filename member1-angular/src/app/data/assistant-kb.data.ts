import { AssistantKnowledgeEntry } from '../models/assistant.model';

export const ASSISTANT_KNOWLEDGE_BASE: AssistantKnowledgeEntry[] = [
  {
    keywords: ['burette', 'meniscus', 'read burette', 'reading', 'parallax', 'eye level', 'volume'],
    question: 'How do I read a burette correctly?',
    answer: 'To read a burette accurately:\n1. Ensure your eye is horizontally level with the liquid surface to prevent parallax error.\n2. For colorless or clear liquids (such as aqueous HCl or NaOH), read the very bottom of the concave meniscus.\n3. Interpolate between graduations: on a standard 50 mL burette with 0.10 mL markings, estimate to the nearest ±0.02 mL (e.g., 23.45 mL).\n4. A white card with a bold black horizontal line held slightly below the meniscus can help sharpen the liquid boundary for high-contrast viewing.',
    relatedEquipmentId: 'burette',
    category: 'Volumetric Technique'
  },
  {
    keywords: ['acid', 'spill', 'chemical burn', 'first aid', 'wash hands', 'skin'],
    question: 'What should I do if acid or base spills on skin or clothing?',
    answer: '🚨 Immediate Action Protocol:\n1. Alert your lab partner and instructor immediately.\n2. Wash the affected skin area immediately under copious running cold water for at least 15 minutes.\n3. Remove contaminated clothing or jewelry while flushing.\n4. For eye splashes, go directly to the emergency eyewash station, hold eyelids open with fingers, and rinse continuously for 15 full minutes.\n5. Do NOT attempt to neutralize an acid burn with strong base on skin—the heat of neutralization (exothermic) causes severe thermal and chemical tissue damage.',
    relatedEquipmentId: 'beaker',
    category: 'Safety & Emergency'
  },
  {
    keywords: ['acid to water', 'water to acid', 'dilution', 'exothermic', 'heat', 'diluting'],
    question: 'Why do we always add acid to water and never water to acid?',
    answer: 'When concentrated acid dissolves in water, an immense amount of hydration energy is released (highly exothermic reaction).\n\nIf you pour water into concentrated acid, the first few drops of water are surrounded by pure acid, boil instantaneously, and violently spray concentrated boiling acid onto your face and clothing.\n\nConversely, when adding acid dropwise into water, the large volume of water safely absorbs and dissipates the thermal energy generated. Remember: "Do what you oughta, add acid to the water!"',
    relatedEquipmentId: 'beaker',
    category: 'Safety & Emergency'
  },
  {
    keywords: ['air bubble', 'tip', 'jet', 'burette tip', 'bubble'],
    question: 'How do I get rid of an air bubble trapped in a burette tip?',
    answer: 'To remove an air bubble from the burette jet tip:\n1. Position a waste beaker directly underneath the burette.\n2. Open the stopcock completely and let a rapid burst of titrant rush through the jet.\n3. If the bubble is stubborn, gently tap the tip of the glass barrel with your finger or a rubber tube while the liquid is actively flowing.\n4. Once all bubbles are cleared, close the stopcock, refill to or below 0.00 mL, and record your initial reading.',
    relatedEquipmentId: 'burette',
    category: 'Volumetric Technique'
  },
  {
    keywords: ['beaker vs conical', 'erlenmeyer vs beaker', 'flask or beaker', 'difference'],
    question: 'What is the main difference between a beaker and a conical (Erlenmeyer) flask?',
    answer: 'While both are reaction vessels made of heat-resistant borosilicate glass:\n• Beakers have straight cylindrical walls and a wide opening with a pouring spout. They are ideal for general mixing, holding liquids, heating, and dissolving solids with a stirring rod.\n• Conical (Erlenmeyer) flasks have sloping, tapered walls and a narrow neck. This geometry allows vigorous circular swirling without splashing liquids out, making it the standard receiving vessel for titrations.\nNote: Neither vessel should ever be used for measuring precise analytical volumes.',
    relatedEquipmentId: 'conical-flask',
    category: 'Apparatus Comparison'
  },
  {
    keywords: ['endpoint', 'phenolphthalein', 'color change', 'titration', 'pink', 'equivalence point'],
    question: 'What is the true endpoint color for phenolphthalein in an acid-base titration?',
    answer: 'The true stoichiometric endpoint with phenolphthalein is a persistent faint pale pink blush that remains visible against a white tile for at least 30 seconds.\n\n• In acidic solution (excess HCl): completely colorless.\n• At true endpoint (pH ~8.2–8.4): faint, barely visible pale pink.\n• Over-titrated (excess NaOH): vivid magenta or deep purple. If your flask turns deep purple, you have overshot the endpoint and added too much base!',
    relatedEquipmentId: 'conical-flask',
    category: 'Analytical Chemistry'
  },
  {
    keywords: ['tare', 'zero', 'balance', 'electronic balance', 'scale', 'weighing'],
    question: 'How do I properly tare and use an analytical electronic balance?',
    answer: 'Standard weighing procedure:\n1. Check the spirit level bubble on the balance to verify it is centered.\n2. Ensure the pan is clean and brush away any dust with a camel hair brush.\n3. Close the glass draft doors and press "Tare" or "Zero" (wait for 0.0000 g).\n4. Place your clean weighing boat or watch glass in the center of the pan.\n5. Press "Tare" again to zero out the container weight.\n6. Add sample carefully without spilling outside the boat, close doors, and record mass only after the stability indicator (e.g. circle or asterisk) appears.',
    relatedEquipmentId: 'electronic-balance',
    category: 'Physical Measurement'
  },
  {
    keywords: ['accuracy', 'accurate', 'measuring cylinder', 'pipette', '25 ml', 'volumetric'],
    question: 'Which glassware is most accurate for measuring 25.0 mL of liquid?',
    answer: 'The Class A Volumetric Transfer Pipette (or a 25 mL Class A Volumetric Flask) is by far the most accurate, with a typical calibration tolerance of only ±0.03 mL.\n\nIn comparison:\n• 25 mL Class A Burette: ±0.05 mL\n• 25 mL Measuring Cylinder: ±0.25 mL to ±0.5 mL\n• 50 mL Beaker markings: ±5% (approx. ±2.5 mL error!)\nFor exact analytical aliquots, always choose a volumetric transfer pipette.',
    relatedEquipmentId: 'pipette',
    category: 'Volumetric Technique'
  },
  {
    keywords: ['cleaning', 'clean glassware', 'wash', 'grease', 'storage'],
    question: 'How should laboratory glassware be cleaned and stored?',
    answer: 'Standard cleaning protocol:\n1. Rinse glassware promptly after use before residues bake on or dry.\n2. Wash using warm water and a neutral laboratory detergent (like Decon 90 or Alconox) with an appropriately sized brush.\n3. Rinse three times with tap water, followed by two thorough rinses with deionized or distilled water.\n4. Air dry inverted on clean drying racks or in a drying oven at 60°C.\nNote: Precision volumetric glassware (pipettes, burettes, volumetric flasks) must NEVER be baked in high-temperature ovens as glass expansion alters calibration volumes.',
    relatedEquipmentId: 'beaker',
    category: 'Maintenance & Care'
  },
  {
    keywords: ['microscope', 'oil immersion', '100x', 'objective', 'cleaning lens'],
    question: 'How do I use and clean the 100x oil immersion objective on a microscope?',
    answer: 'Oil Immersion Guide:\n1. Focus your specimen first under the 40x high-dry objective.\n2. Rotate the nosepiece halfway between the 40x and 100x lenses.\n3. Place a single tiny drop of Type A or B immersion oil directly onto the cover slip over the light beam.\n4. Click the 100x oil objective into place (it will submerge directly into the oil drop).\n5. Use ONLY the fine focus knob to resolve the image.\n6. Cleaning: Immediately after viewing, wipe the lens with optical lens paper moistened with a drop of lens cleaner or isopropanol. Never leave oil to harden on objectives!',
    relatedEquipmentId: 'microscope',
    category: 'Optics'
  }
];

export const ASSISTANT_SUGGESTED_PROMPTS: string[] = [
  'How do I read a burette correctly?',
  'What should I do if acid spills on my skin?',
  'Why do we add acid to water and not water to acid?',
  'What is the true endpoint color for phenolphthalein?',
  'What is the difference between a beaker and a conical flask?',
  'Which glassware is most accurate for measuring 25.0 mL?'
];

export const ASSISTANT_DEFAULT_FALLBACK = (query: string): string => {
  return `ℹ️ **Demo Knowledge Base Mode (SmartLab AI — UNEMPLOYED 004)**

I couldn't find an exact match for **"${query}"** in our local demo offline knowledge base.

Currently, SmartLab AI is operating in **Pre-configured Demo Mode** to demonstrate application functionality without requiring active external API keys.

In the next hackathon integration phase, this interface will connect directly to the **Google Gemini API** (gemini-1.5-pro / gemini-1.5-flash), enabling real-time laboratory reasoning, protocol validation, and chemical safety analysis for thousands of reagents and apparatus!

**Try asking about:**
• How to read a burette meniscus
• First-aid for chemical acid spills
• Why we add acid to water
• Titration endpoint identification
• Measuring cylinder vs volumetric pipette`;
};
