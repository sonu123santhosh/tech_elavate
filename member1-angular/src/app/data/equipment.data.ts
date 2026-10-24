import { Equipment } from '../models/equipment.model';

export const EQUIPMENT_CATALOG: Equipment[] = [
  // =========================================================================
  // 1. VOLUMETRIC & PRECISION PIPETTING (10 items)
  // =========================================================================
  {
    id: 'burette',
    name: 'Burette',
    alternateNames: ['Buret', 'Volumetric Burette', 'Titration Burette'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Vertical calibrated glass column with PTFE stopcock for titrant delivery',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46 12H54V76L48 84L48 92" stroke="#0891b2" stroke-width="3" stroke-linecap="round"/><line x1="48" y1="20" x2="52" y2="20" stroke="#0891b2" stroke-width="2"/><line x1="46" y1="26" x2="54" y2="26" stroke="#0891b2" stroke-width="2.5"/><line x1="48" y1="32" x2="52" y2="32" stroke="#0891b2" stroke-width="2"/><line x1="46" y1="38" x2="54" y2="38" stroke="#0891b2" stroke-width="2.5"/><rect x="42" y="78" width="16" height="5" rx="2.5" fill="#f59e0b"/></svg>`,
    description: 'A precision graduated glass tube with uniform internal bore and a PTFE flow-control stopcock. Used in quantitative analytical titrations to deliver measured aliquots of standard solution.',
    commonUses: ['Acid-base neutralization titrations', 'Redox and complexometric titrations', 'Controlled fractional dropwise reagent delivery'],
    specifications: [
      { label: 'Nominal Capacity (Example)', value: '50.00 mL (0.10 mL subdivisions)', isExample: true },
      { label: 'Class / Tolerance (Example)', value: 'Class A: ±0.05 mL (ISO 385)', isExample: true },
      { label: 'Stopcock Type', value: 'Straight-bore PTFE self-lubricating plug', isExample: true }
    ],
    operatingInstructions: ['Rinse twice with 5 mL portions of titrant before filling.', 'Fill above 0.00 mL using a small funnel, then remove the funnel immediately.', 'Expel trapped air bubbles from jet tip into waste before setting meniscus.'],
    safetyPrecautions: ['Lower burette to chest level when filling to avoid pouring caustic reagents overhead.', 'Clamp gently using padded burette clamps.'],
    commonMistakes: ['Leaving an air bubble in the jet tip during titration.', 'Leaving the filling funnel in the top during delivery.'],
    relatedEquipmentIds: ['conical-flask', 'funnel', 'volumetric-flask', 'pipette'],
    standardMaterial: 'Class A Borosilicate Glass 3.3',
    cleaningAndStorage: 'Drain immediately after use, rinse with distilled water, store inverted with stopcock open.',
    accuracyLevel: 'High Analytical (Class A)'
  },
  {
    id: 'volumetric-flask',
    name: 'Volumetric Flask',
    alternateNames: ['Measuring Flask', 'Standard Flask', 'Graduated Flask'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Flat-bottom pear-shaped flask calibrated To Contain exact volume at reference temperature',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46 12H54V42C54 42 68 56 68 74C68 82 62 88 50 88C38 88 32 82 32 74C32 56 46 42 46 42V12Z" stroke="#0891b2" stroke-width="3.5"/><line x1="44" y1="28" x2="56" y2="28" stroke="#e11d48" stroke-width="2.5"/><path d="M35 74C35 80 41 84 50 84C59 84 65 80 65 74C65 64 54 52 50 52C46 52 35 64 35 74Z" fill="#06b6d4" fill-opacity="0.3"/></svg>`,
    description: 'A piece of laboratory glassware calibrated to contain (TC / In) an exact volume of liquid at 20°C. Characterized by a bulbous lower body and a slender neck with a single etched ring mark.',
    commonUses: ['Preparing primary standard molar solutions', 'Precise serial dilution of analytical stock solutions', 'Trace spectroscopic calibration standard preparation'],
    specifications: [
      { label: 'Nominal Volume (Example)', value: '250.0 mL (Standard range: 5 mL to 2000 mL)', isExample: true },
      { label: 'Tolerance (Example)', value: 'Class A: ±0.15 mL (DIN EN ISO 1042)', isExample: true },
      { label: 'Stopper Standard', value: 'NS 14/23 Ground glass or polyethylene stopper', isExample: true }
    ],
    operatingInstructions: ['Dissolve solid solute in a beaker first, then quantitatively transfer with funnel.', 'Fill to 80%, swirl to dissolve, then use a dropper to bring meniscus bottom to the etched ring.', 'Stopper and invert 15–20 times for complete homogeneity.'],
    safetyPrecautions: ['Never heat a volumetric flask; thermal glass expansion ruins precision calibration permanently.', 'Never perform exothermic dissolutions directly inside the flask.'],
    commonMistakes: ['Overfilling past the graduation mark (cannot be poured back).', 'Failing to invert the stoppered flask after bringing to volume.'],
    relatedEquipmentIds: ['electronic-balance', 'pipette', 'funnel', 'beaker'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Rinse with solvent and deionized water. Air-dry inverted on drying racks.',
    accuracyLevel: 'Class A Primary Standard'
  },
  {
    id: 'pipette',
    name: 'Volumetric Transfer Pipette',
    alternateNames: ['Bulb Pipette', 'One-Mark Pipette', 'Transfer Pipette'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Narrow calibrated glass tube with central bulb designed To Deliver single exact volume',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48 8H52V36C52 36 57 40 57 50C57 60 52 64 52 64V86L50 92L48 86V64C48 64 43 60 43 50C43 40 48 36 48 36V8Z" stroke="#0891b2" stroke-width="3"/><line x1="47" y1="24" x2="53" y2="24" stroke="#e11d48" stroke-width="2"/><ellipse cx="50" cy="50" rx="5" ry="10" fill="#22d3ee" fill-opacity="0.3"/></svg>`,
    description: 'A calibrated glass tube with a central reservoir bulb designed to deliver (TD / Ex) a fixed volume of liquid with high analytical accuracy.',
    commonUses: ['Transferring exact aliquot volumes (e.g. 25.00 mL) into titration flasks', 'Delivering accurate analyte samples for gravimetric analysis', 'Standard curve sample preparation'],
    specifications: [
      { label: 'Calibrated Volume (Example)', value: '25.00 mL (Single-mark transfer pipette)', isExample: true },
      { label: 'Tolerance (Example)', value: 'Class A: ±0.03 mL at 20°C', isExample: true },
      { label: 'Calibration Type', value: 'TD / Ex (To Deliver via gravity flow)', isExample: true }
    ],
    operatingInstructions: ['Always use a mechanical pipette filler or suction bulb. NEVER mouth pipette.', 'Wipe liquid off exterior tip with a lint-free tissue before setting meniscus.', 'Allow free drainage by gravity. Touch tip against vessel wall for 3 seconds.'],
    safetyPrecautions: ['Mouth pipetting is strictly prohibited under all circumstances.', 'Do not force pipette into bulbs; excessive force can snap glass.'],
    commonMistakes: ['Blowing out the retained droplet in the tip of a TD transfer pipette.', 'Allowing liquid to be aspirated into the rubber bulb.'],
    relatedEquipmentIds: ['burette', 'conical-flask', 'volumetric-flask'],
    standardMaterial: 'Class A Soda-Lime or Borosilicate Glass',
    cleaningAndStorage: 'Rinse with distilled water; store horizontally in velvet/plastic drawers or carousel racks.',
    accuracyLevel: 'Highest Pipetting Precision'
  },
  {
    id: 'measuring-cylinder',
    name: 'Graduated Measuring Cylinder',
    alternateNames: ['Measuring Cylinder', 'Graduated Cylinder'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Vertical calibrated glass or plastic cylinder for moderate volume aliquots',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 14H60M42 14V80H58V14M32 86H68V80H32V86Z" stroke="#0891b2" stroke-width="3.5"/><line x1="44" y1="28" x2="52" y2="28" stroke="#0891b2" stroke-width="2"/><line x1="44" y1="40" x2="54" y2="40" stroke="#0891b2" stroke-width="2.5"/><line x1="44" y1="52" x2="52" y2="52" stroke="#0891b2" stroke-width="2"/></svg>`,
    description: 'A tall cylindrical vessel with uniform volume markings along its height and a pour spout. Offers higher precision than beakers but lower precision than volumetric flasks.',
    commonUses: ['Measuring reagents for preparative syntheses', 'Dispensing solvents and buffer mixtures', 'Volume measurement via liquid displacement'],
    specifications: [
      { label: 'Capacity (Example)', value: '100 mL (with 1.0 mL graduations)', isExample: true },
      { label: 'Tolerance (Example)', value: 'Class B: ±1.0 mL (Class A: ±0.5 mL)', isExample: true },
      { label: 'Base Style', value: 'Hexagonal non-roll anti-tip base', isExample: true }
    ],
    operatingInstructions: ['Place on a flat, level benchtop.', 'Align eye horizontally with liquid surface to eliminate parallax error.', 'Read lowest point of concave meniscus.'],
    safetyPrecautions: ['Keep the protective polyethylene bumper ring positioned near the top rim.', 'Never heat directly over a Bunsen flame.'],
    commonMistakes: ['Viewing meniscus from an angle above or below eye level.', 'Using for analytical titrations requiring high precision.'],
    relatedEquipmentIds: ['beaker', 'pipette', 'funnel'],
    standardMaterial: 'Borosilicate Glass 3.3 or Polypropylene (PP)',
    cleaningAndStorage: 'Clean with cylinder brush; dry upright on bench or peg rack.',
    accuracyLevel: 'Moderate Semi-Quantitative'
  },
  {
    id: 'mohr-pipette',
    name: 'Mohr Graduated Pipette',
    alternateNames: ['Graduated Pipette', 'Measuring Pipette'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Straight calibrated pipette with volume graduations along the entire stem',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M47 10H53V82L50 90L47 82V10Z" stroke="#0891b2" stroke-width="3"/><line x1="48" y1="25" x2="52" y2="25" stroke="#0891b2" stroke-width="2"/><line x1="47" y1="35" x2="53" y2="35" stroke="#0891b2" stroke-width="2"/><line x1="48" y1="45" x2="52" y2="45" stroke="#0891b2" stroke-width="2"/><line x1="47" y1="55" x2="53" y2="55" stroke="#0891b2" stroke-width="2"/></svg>`,
    description: 'A straight glass tube calibrated with graduation marks along its length, allowing variable liquid volumes to be measured and dispensed.',
    commonUses: ['Delivering variable fractional volumes of liquid (e.g. 3.4 mL or 7.8 mL)', 'Enzyme kinetic reaction aliquots', 'Preparation of fractional stock solutions'],
    specifications: [
      { label: 'Total Volume (Example)', value: '10.0 mL (with 0.1 mL subdivisions)', isExample: true },
      { label: 'Tolerance (Example)', value: 'Class B: ±0.08 mL', isExample: true },
      { label: 'Type', value: 'Calibrated to baseline before delivery jet', isExample: true }
    ],
    operatingInstructions: ['Aspirate solution using a pipette pump or 3-valve bulb.', 'Adjust meniscus to initial mark, deliver required increment, and stop at target line.'],
    safetyPrecautions: ['Never mouth pipette. Handle slender glass body gently.'],
    commonMistakes: ['Draining past the lowest calibration line on a Mohr-type pipette.'],
    relatedEquipmentIds: ['pipette', 'test-tube', 'beaker'],
    standardMaterial: 'Class B Soda-Lime or Borosilicate Glass',
    cleaningAndStorage: 'Rinse with deionized water; store flat in lined trays.'
  },
  {
    id: 'micropipette',
    name: 'Adjustable Micropipette',
    alternateNames: ['Automatic Pipette', 'Eppendorf Pipette', 'Air Displacement Pipette'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Precision mechanical piston instrument for dispensing microliter volumes',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="44" y="8" width="12" height="42" rx="3" stroke="#0891b2" stroke-width="3" fill="#ffffff"/><path d="M48 50L46 80L50 88L54 80L52 50" stroke="#0891b2" stroke-width="2.5"/><rect x="42" y="16" width="16" height="12" fill="#0f172a"/><circle cx="50" cy="8" r="4" fill="#06b6d4"/></svg>`,
    description: 'An ergonomic air-displacement hand-held instrument with a digital counter for dispensing micro-volumes of liquid into microcentrifuge tubes or well plates.',
    commonUses: ['Molecular biology assays (PCR, DNA/RNA extraction)', 'Enzyme and protein quantification', 'Micro-titrations and biochemical additions'],
    specifications: [
      { label: 'Volume Range (Example)', value: '100 µL to 1000 µL (P1000)', isExample: true },
      { label: 'Inaccuracy / Precision', value: '±0.6% systematic, ±0.2% random error', isExample: true },
      { label: 'Tip Type', value: 'Disposable polypropylene aerosol-barrier tips', isExample: true }
    ],
    operatingInstructions: ['Set target volume on digital micrometer within rated range.', 'Depress plunger to first stop, immerse tip 2–3 mm in fluid, and release slowly.', 'Dispense by depressing to second stop (blowout position).'],
    safetyPrecautions: ['Never invert or lay a micropipette flat with liquid inside the tip.', 'Always use fresh filter tips to prevent internal piston corrosion.'],
    commonMistakes: ['Winding dial outside minimum or maximum volume rating.', 'Releasing plunger rapidly, drawing liquid up into internal shaft.'],
    relatedEquipmentIds: ['centrifuge-tube', 'pasteur-pipette'],
    standardMaterial: 'PVDF and chemical-resistant polymers with stainless steel piston',
    cleaningAndStorage: 'Store vertically on carousel stand; clean nose cone with 70% isopropanol.'
  },
  {
    id: 'pasteur-pipette',
    name: 'Pasteur Pipette',
    alternateNames: ['Dropping Pipette', 'Transfer Dropper', 'Glass Dropper'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Disposable glass tube with constricted capillary tip and rubber teat',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M47 24H53V62L49 88L47 88L47 24Z" stroke="#0891b2" stroke-width="2.5"/><ellipse cx="50" cy="16" rx="6" ry="8" fill="#f59e0b"/></svg>`,
    description: 'A slender uncalibrated glass tube with an elongated tapered capillary tip. Fitted with a rubber bulb teat for transferring small unmeasured dropwise quantities of liquid.',
    commonUses: ['Transferring liquid reagents dropwise', 'Adding indicator drops to titration flasks', 'Removing supernatants from centrifuged precipitates'],
    specifications: [
      { label: 'Length (Example)', value: '150 mm or 230 mm long capillary form', isExample: true },
      { label: 'Capacity', value: 'Approx. 2.0 mL uncalibrated transfer', isExample: true },
      { label: 'Tip Style', value: 'Fine drawn capillary jet', isExample: true }
    ],
    operatingInstructions: ['Fit rubber bulb securely on open glass mouth without tearing.', 'Squeeze bulb before entering liquid to prevent bubble ejection.'],
    safetyPrecautions: ['Capillary tip is fragile and snaps under lateral force. Discard chipped glass.'],
    commonMistakes: ['Inverting pipette so liquid enters and contaminates the rubber teat.'],
    relatedEquipmentIds: ['test-tube', 'conical-flask', 'beaker'],
    standardMaterial: 'Soda-Lime Glass or Polyethylene',
    cleaningAndStorage: 'Glass versions are commonly disposable or cleaned in pipette washers.'
  },
  {
    id: 'bottle-top-dispenser',
    name: 'Bottle-Top Dispenser',
    alternateNames: ['Reagent Dispenser', 'Repetitive Dispenser'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Piston pump mounted directly onto reagent bottles for rapid repetitive aliquots',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="42" y="14" width="16" height="40" rx="3" stroke="#0891b2" stroke-width="3"/><path d="M58 32H76V42" stroke="#0891b2" stroke-width="3" fill="none"/><rect x="36" y="54" width="28" height="12" rx="2" fill="#0f172a"/><path d="M40 66V88H60V66" stroke="#94a3b8" stroke-width="2.5"/></svg>`,
    description: 'A bottle-mounted mechanical piston dispenser that draws and discharges fixed or adjustable liquid aliquots directly from reagent storage bottles.',
    commonUses: ['Repetitive dispensing of acids, bases, or buffer solutions', 'Rapid aliquot distribution to test tube arrays', 'Minimizing hazardous vapor exposure during routine transfers'],
    specifications: [
      { label: 'Dispense Range (Example)', value: '2.5 mL to 25.0 mL (0.5 mL increments)', isExample: true },
      { label: 'Accuracy', value: '±0.5% (ISO 8655)', isExample: true },
      { label: 'Valve System', value: 'Ceramic / PFA inert check valves', isExample: true }
    ],
    operatingInstructions: ['Set volume slider and tighten lock screw.', 'Prime unit 2–3 times into a waste container to expel all air bubbles.'],
    safetyPrecautions: ['Ensure discharge spout cap is opened before pumping.', 'Match cylinder material to solvent (e.g. platinum-iridium for HF).'],
    commonMistakes: ['Pumping vigorously, creating aerosol sprays.'],
    relatedEquipmentIds: ['volumetric-flask', 'measuring-cylinder', 'beaker'],
    standardMaterial: 'Borosilicate 3.3, PTFE, ETFE, FEP, and Alumina ceramic valves',
    cleaningAndStorage: 'Flush thoroughly with solvent and water prior to switching reagent bottles.'
  },
  {
    id: 'gas-tight-syringe',
    name: 'Gas-Tight Syringe',
    alternateNames: ['Analytical Syringe', 'Microliter Syringe', 'Hamilton Syringe'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Precision micro-bore glass syringe with PTFE plunger for gas or liquid sampling',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="44" width="46" height="12" rx="2" stroke="#0891b2" stroke-width="2.5"/><line x1="76" y1="50" x2="94" y2="50" stroke="#0891b2" stroke-width="2"/><line x1="12" y1="50" x2="30" y2="50" stroke="#94a3b8" stroke-width="3"/></svg>`,
    description: 'A precision glass syringe equipped with a PTFE plunger tip that provides an airtight seal for both volatile liquids and headspace gas samples.',
    commonUses: ['Gas chromatography (GC) and HPLC sample injection', 'Transferring air-sensitive reagents via septa', 'Quantitative headspace vapor sampling'],
    specifications: [
      { label: 'Capacity (Example)', value: '10 µL / 100 µL / 1000 µL', isExample: true },
      { label: 'Needle Type', value: 'Point Style 2 (beveled GC) or Point Style 3 (HPLC flat)', isExample: true },
      { label: 'Leak Rate', value: 'Gas-tight up to 6 bar pressure', isExample: true }
    ],
    operatingInstructions: ['Verify needle connection is leak-free.', 'Pump plunger smoothly 2–3 times in sample to clear bubbles.'],
    safetyPrecautions: ['Take extreme care with sharp needles; use needle guards and sharps disposal containers.'],
    commonMistakes: ['Bending the delicate tungsten plunger wire during rapid stroke.'],
    relatedEquipmentIds: ['schlenk-flask', 'micropipette'],
    standardMaterial: 'Precision Borosilicate glass, PTFE seal, 304 Stainless steel needle',
    cleaningAndStorage: 'Rinse with acetone and dry with vacuum aspirator. Store in dedicated velvet case.'
  },
  {
    id: 'dropping-bottle',
    name: 'Dropping Bottle',
    alternateNames: ['Indicator Bottle', 'Eye Dropper Bottle', 'Barnes Bottle'],
    category: 'volumetric',
    categoryLabel: 'Volumetric & Pipetting',
    tagline: 'Small glass bottle fitted with a dropper pipette stopper for dispensing indicators',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="36" y="34" width="28" height="48" rx="4" stroke="#0891b2" stroke-width="3"/><rect x="42" y="24" width="16" height="10" stroke="#0891b2" stroke-width="2.5"/><ellipse cx="50" cy="16" rx="5" ry="7" fill="#f59e0b"/></svg>`,
    description: 'A glass bottle with a ground glass or screw-neck closure containing an integrated glass pipette and rubber teat, ideal for storing and dispensing indicator solutions.',
    commonUses: ['Storing and dispensing acid-base indicators (phenolphthalein, methyl orange)', 'Microscopic staining dye solutions', 'Dispensing test reagents dropwise'],
    specifications: [
      { label: 'Volume (Example)', value: '30 mL or 60 mL capacity', isExample: true },
      { label: 'Glass Color', value: 'Amber (actinic-protected) or clear flint glass', isExample: true },
      { label: 'Drop Volume', value: 'Approx. 0.04 mL to 0.05 mL per drop', isExample: true }
    ],
    operatingInstructions: ['Keep amber glass bottles out of direct sunlight for light-sensitive indicators.', 'Hold dropper vertically to maintain consistent droplet volume.'],
    safetyPrecautions: ['Do not touch the dropper tip to receiving vessel walls to prevent stock cross-contamination.'],
    commonMistakes: ['Resting the dropper on bench surfaces, contaminating reagent bottle.'],
    relatedEquipmentIds: ['conical-flask', 'pasteur-pipette'],
    standardMaterial: 'Amber or Clear Soda-Lime Glass with rubber bulb',
    cleaningAndStorage: 'Keep tightly stoppered to avoid solvent evaporation and indicator concentration drift.'
  },

  // =========================================================================
  // 2. REACTION VESSELS & FLASKS (12 items)
  // =========================================================================
  {
    id: 'beaker',
    name: 'Griffin Beaker',
    alternateNames: ['Beaker', 'Laboratory Beaker'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Standard flat-bottom cylindrical glass vessel with pour spout for mixing and heating',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 20H78M25 20V80C25 84.4 28.6 88 33 88H67C71.4 88 75 84.4 75 80V20" stroke="#0891b2" stroke-width="4"/><line x1="32" y1="40" x2="44" y2="40" stroke="#94a3b8" stroke-width="2.5"/><line x1="32" y1="52" x2="48" y2="52" stroke="#94a3b8" stroke-width="2.5"/><line x1="32" y1="64" x2="44" y2="64" stroke="#94a3b8" stroke-width="2.5"/></svg>`,
    description: 'A cylindrical container with a flat bottom and pouring spout. Designed for holding, mixing, and heating solutions. Graduations are approximate only.',
    commonUses: ['Holding liquids and performing general chemical reactions', 'Dissolving solid reagents with a glass rod', 'Collecting filtrates beneath funnels'],
    specifications: [
      { label: 'Standard Capacity (Example)', value: '250 mL / 500 mL (Available: 50 mL to 5000 mL)', isExample: true },
      { label: 'Graduation Tolerance', value: '±5% to ±10% (Approximate, NOT analytical)', isExample: true },
      { label: 'Thermal Resistance', value: 'Up to 500°C annealing point', isExample: true }
    ],
    operatingInstructions: ['Check for star cracks before heating.', 'Always place on wire gauze on ring stands when heating with flame.'],
    safetyPrecautions: ['Use heat-resistant beaker tongs when handling hot glassware.', 'Never heat to dryness.'],
    commonMistakes: ['Using beaker markings for volumetric quantitative measurements.'],
    relatedEquipmentIds: ['conical-flask', 'glass-rod', 'measuring-cylinder'],
    standardMaterial: 'Borosilicate Glass 3.3 (DIN ISO 3819)',
    cleaningAndStorage: 'Wash with neutral detergent and rinse with deionized water; dry on peg racks.'
  },
  {
    id: 'conical-flask',
    name: 'Erlenmeyer Conical Flask',
    alternateNames: ['Conical Flask', 'Titration Flask'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Tapered body and narrow neck designed for vigorous swirling without splashing',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 18H56M46 18V32L26 78C24.5 81.5 27 86 31 86H69C73 86 75.5 81.5 74 78L54 32V18" stroke="#0891b2" stroke-width="4"/><path d="M33 72L42 50C45 49 48 51 51 50C54 49 57 51 61 50L68 72C69 75 67 78 64 78H37C34 78 32 75 33 72Z" fill="#14b8a6" fill-opacity="0.25"/></svg>`,
    description: 'A flat-bottomed flask with a conical body and cylindrical neck. Enables continuous circular swirling without splashing, making it the ideal vessel for volumetric titrations.',
    commonUses: ['Volumetric titrations beneath burettes', 'Recrystallization of organic solids', 'Microbial broth culture incubation'],
    specifications: [
      { label: 'Volume (Example)', value: '250 mL wide neck (Range: 25 mL to 3000 mL)', isExample: true },
      { label: 'Neck Outer Diameter', value: '34 mm (standard stopper size #6)', isExample: true }
    ],
    operatingInstructions: ['Swirl smoothly in horizontal circular motions while operating burette stopcock.', 'Position on white tile to detect faint indicator endpoints.'],
    safetyPrecautions: ['Do not stopper tightly during vigorous gas evolution reactions.'],
    commonMistakes: ['Swirling with vertical shaking, creating airborne droplets.'],
    relatedEquipmentIds: ['burette', 'pipette', 'funnel', 'beaker'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Rinse with distilled water; store inverted in clean cabinets.'
  },
  {
    id: 'test-tube',
    name: 'Standard Test Tube',
    alternateNames: ['Sample Tube', 'Culture Tube'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Finger-like clear glass tube with rounded bottom for micro-scale reactions',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 16H58M45 16V74C45 78.4 47.2 84 50 84C52.8 84 55 78.4 55 74V16" stroke="#0891b2" stroke-width="4"/></svg>`,
    description: 'A slender cylindrical glass container with a rounded U-shaped bottom. Ideal for observing qualitative reactions, precipitate formation, and small-scale heating.',
    commonUses: ['Qualitative chemical identification tests', 'Precipitation and colorimetric observations', 'Holding small reaction aliquots'],
    specifications: [
      { label: 'Dimensions (Example)', value: '16 mm OD × 150 mm length', isExample: true },
      { label: 'Capacity (Example)', value: 'Approx. 20 mL capacity', isExample: true }
    ],
    operatingInstructions: ['Grip upper third with wooden test tube holder.', 'Angle at 45° and point mouth away from all personnel when heating.', 'Move constantly through flame.'],
    safetyPrecautions: ['Never point the open mouth toward yourself or peers; boiling liquid can bump explosively.'],
    commonMistakes: ['Holding tube stationary over hot flame, causing flash-boiling ejection.'],
    relatedEquipmentIds: ['test-tube-rack', 'test-tube-holder', 'bunsen-burner'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Clean with slim nylon brush; store upright or inverted in test tube racks.'
  },
  {
    id: 'boiling-tube',
    name: 'Boiling Tube',
    alternateNames: ['Heavy-Duty Tube', 'Combustion Tube'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Wide, heavy-walled glass tube designed specifically for heating liquids strongly',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 14H62M42 14V72C42 78 46 84 50 84C54 84 58 78 58 72V14" stroke="#0891b2" stroke-width="4.5"/></svg>`,
    description: 'A larger, thicker-walled version of a test tube designed to withstand vigorous boiling and thermal shock during intense heating of solutions.',
    commonUses: ['Boiling solutions strongly over direct flames', 'Conducting organic synthesis tests at boiling point', 'Sublimation and thermal decomposition demonstrations'],
    specifications: [
      { label: 'Dimensions (Example)', value: '25 mm OD × 150 mm or 200 mm length', isExample: true },
      { label: 'Capacity (Example)', value: 'Approx. 55 mL', isExample: true }
    ],
    operatingInstructions: ['Add boiling chips or porcelain fragments before heating to promote smooth boiling.'],
    safetyPrecautions: ['Always hold with a large boiling tube clamp; point open top toward splash shield.'],
    commonMistakes: ['Filling past one-third full when boiling vigorously.'],
    relatedEquipmentIds: ['test-tube', 'bunsen-burner', 'test-tube-holder'],
    standardMaterial: 'Extra-Heavy Borosilicate 3.3 Glass',
    cleaningAndStorage: 'Clean with wide cylinder brush; cool on ceramic pads.'
  },
  {
    id: 'round-bottom-flask',
    name: 'Round Bottom Flask (Single Neck)',
    alternateNames: ['RBF', 'Distillation Flask', 'Spherical Flask'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Spherical flask with standard ground joint for uniform heating under vacuum or reflux',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46 12H54V34C54 34 72 44 72 66C72 78 62 88 50 88C38 88 28 78 28 66C28 44 46 34 46 34V12Z" stroke="#0891b2" stroke-width="3.5"/></svg>`,
    description: 'A spherical reaction flask with a ground glass joint. The spherical shape eliminates corners, providing optimal thermal flux distribution and resistance to implosion under high vacuum.',
    commonUses: ['Organic reflux reactions with condensers', 'Rotary evaporation solvent removal', 'Vacuum distillation of chemical fractions'],
    specifications: [
      { label: 'Capacity (Example)', value: '250 mL (Range: 25 mL to 5000 mL)', isExample: true },
      { label: 'Ground Joint', value: 'Standard Taper ST 24/40 or 19/26', isExample: true }
    ],
    operatingInstructions: ['Support with cork ring or clamp to retort stand (will roll on flat surfaces).', 'Heat using heating mantle, oil bath, or water bath (never direct flame without gauze).'],
    safetyPrecautions: ['Check for micro-fractures before applying vacuum to prevent implosions.'],
    commonMistakes: ['Placing round bottom directly onto bench, causing it to tip over.'],
    relatedEquipmentIds: ['heating-mantle', 'liebig-condenser', 'retort-stand'],
    standardMaterial: 'Heavy-Wall Borosilicate 3.3 Glass',
    cleaningAndStorage: 'Rest on cork support rings; clean ground glass joints with solvent.'
  },
  {
    id: 'three-neck-flask',
    name: 'Three-Neck Round Bottom Flask',
    alternateNames: ['Multi-Neck Flask', 'Reaction Flask'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Spherical flask with central and angled side necks for complex multi-port reactions',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46 12H54V30M32 20L38 34M68 20L62 34M28 64C28 76 38 86 50 86C62 86 72 76 72 64C72 48 54 36 50 34C46 36 28 48 28 64Z" stroke="#0891b2" stroke-width="3"/></svg>`,
    description: 'A spherical flask with multiple ground glass joints permitting simultaneous attachment of a condenser, addition funnel, thermometer, or gas inlet adapter.',
    commonUses: ['Inert atmosphere reactions (nitrogen/argon purge)', 'Reactions requiring controlled dropwise addition while monitoring temperature', 'Reflux with mechanical stirring'],
    specifications: [
      { label: 'Capacity (Example)', value: '500 mL', isExample: true },
      { label: 'Joints', value: 'Center 24/40, Side necks 24/40 or 19/22', isExample: true }
    ],
    operatingInstructions: ['Lightly grease ground glass joints with fluorosilicone grease or use PTFE sleeves.'],
    safetyPrecautions: ['Ensure pressure equalization during reagent additions.'],
    commonMistakes: ['Over-greasing joints, contaminating the chemical reaction mixture.'],
    relatedEquipmentIds: ['round-bottom-flask', 'separating-funnel', 'liebig-condenser'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Clean joints with hydrocarbon solvent; store unstoppered.'
  },
  {
    id: 'florence-flask',
    name: 'Florence Boiling Flask',
    alternateNames: ['Flat Bottom Boiling Flask'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Round body with small flat base combining uniform boiling with freestanding stability',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M45 12H55V36C55 36 70 48 70 66C70 78 62 86 54 86H46C38 86 30 78 30 66C30 48 45 36 45 36V12Z" stroke="#0891b2" stroke-width="3.5"/></svg>`,
    description: 'Combines the thermal uniformity of a round body with a flattened base that allows the flask to stand upright on laboratory benches without rings.',
    commonUses: ['General chemical boiling and heating', 'Holding liquids during medium-duration distillations', 'Preparing and cooling heated reagents'],
    specifications: [
      { label: 'Capacity (Example)', value: '500 mL (Available: 100 mL to 2000 mL)', isExample: true }
    ],
    operatingInstructions: ['Heat evenly on ceramic wire gauze or mantle.'],
    safetyPrecautions: ['The flat base creates a stress point; not rated for full vacuum distillation.'],
    commonMistakes: ['Subjecting flat-bottom flasks to high vacuum (risk of implosion).'],
    relatedEquipmentIds: ['round-bottom-flask', 'beaker', 'conical-flask'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Wash with laboratory detergent, rinse, and store upright.'
  },
  {
    id: 'kjeldahl-flask',
    name: 'Kjeldahl Flask',
    alternateNames: ['Nitrogen Digestion Flask'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Pear-shaped flask with long extended neck for digesting organic nitrogen compounds',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46 8H54V48C54 48 68 60 68 76C68 84 60 90 50 90C40 90 32 84 32 76C32 60 46 48 46 48V8Z" stroke="#0891b2" stroke-width="3"/></svg>`,
    description: 'Features a round bottom and an unusually long neck. Designed specifically for acid digestion of organic materials (Kjeldahl method for protein/nitrogen determination), where the long neck acts as an internal air condenser.',
    commonUses: ['Kjeldahl total nitrogen and protein determination', 'Sulfuric acid digestion of biological samples', 'Oxidative mineralization'],
    specifications: [
      { label: 'Volume (Example)', value: '500 mL or 800 mL capacity', isExample: true },
      { label: 'Neck Length', value: 'Approx. 200 mm extended vapor condensing neck', isExample: true }
    ],
    operatingInstructions: ['Position in specialized Kjeldahl digestion rack angled at 45° with fume aspiration manifold.'],
    safetyPrecautions: ['Involves concentrated hot sulfuric acid; perform strictly inside fume hood.'],
    commonMistakes: ['Heating without proper fume exhaust, releasing hazardous sulfur dioxide fumes.'],
    relatedEquipmentIds: ['fume-hood', 'heating-mantle'],
    standardMaterial: 'Thermal Shock Borosilicate 3.3',
    cleaningAndStorage: 'Clean immediately with hot water after digestion cake cools.'
  },
  {
    id: 'schlenk-flask',
    name: 'Schlenk Flask',
    alternateNames: ['Vacuum Gas Flask', 'Inert Atmosphere Tube'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Reaction flask with high-vacuum sidearm stopcock for air- and moisture-sensitive chemistry',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46 12H54V40C54 40 68 50 68 70C68 80 60 88 50 88C40 88 32 80 32 70C32 50 46 40 46 40V12Z" stroke="#0891b2" stroke-width="3"/><path d="M54 28H74V22" stroke="#0891b2" stroke-width="2.5"/><circle cx="74" cy="22" r="3" fill="#f59e0b"/></svg>`,
    description: 'A round-bottom flask equipped with a high-vacuum sidearm stopcock. Used on Schlenk lines to perform reactions under inert gas (argon/nitrogen) by evacuating and back-filling.',
    commonUses: ['Organometallic synthesis and catalysis', 'Handling pyrophoric and moisture-sensitive reagents', 'Freeze-pump-thaw degassing of solvents'],
    specifications: [
      { label: 'Capacity (Example)', value: '100 mL or 250 mL', isExample: true },
      { label: 'Sidearm Valve', value: 'High-vacuum PTFE or ground-glass plug', isExample: true }
    ],
    operatingInstructions: ['Perform 3 cycles of vacuum evacuation and argon back-fill before introducing reagents.'],
    safetyPrecautions: ['Use protective plastic safety tape or blast shields when under high vacuum.'],
    commonMistakes: ['Allowing air ingress by failing to seal septa properly.'],
    relatedEquipmentIds: ['gas-tight-syringe', 'round-bottom-flask'],
    standardMaterial: 'Heavy-Wall Borosilicate 3.3 Glass',
    cleaningAndStorage: 'Oven-dry at 120°C and cool under vacuum before sensitive runs.'
  },
  {
    id: 'retort-flask',
    name: 'Traditional Retort Flask',
    alternateNames: ['Glass Retort', 'Distillation Retort'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Classic spherical flask with long downward-curving condensing neck for dry distillation',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="62" r="24" stroke="#0891b2" stroke-width="3"/><path d="M44 42C48 30 64 24 88 48" stroke="#0891b2" stroke-width="3" fill="none"/></svg>`,
    description: 'An integral historical distillation apparatus consisting of a bulbous vessel with a long neck pointing downward. Vapors produced in the bulb condense along the neck and drip into a receiver.',
    commonUses: ['Educational demonstrations of classic distillation', 'Pyrolysis of solid biomass or coal', 'Preparation of volatile inorganic acids'],
    specifications: [
      { label: 'Capacity (Example)', value: '250 mL or 500 mL', isExample: true }
    ],
    operatingInstructions: ['Support bulb firmly in clamp and direct long delivery beak into receiving flask.'],
    safetyPrecautions: ['Has no jointed safety relief; monitor internal pressure closely.'],
    commonMistakes: ['Rapid heating causing boiling slurry to splash over the beak.'],
    relatedEquipmentIds: ['bunsen-burner', 'conical-flask'],
    standardMaterial: 'Heavy Borosilicate Glass',
    cleaningAndStorage: 'Clean with specialized curved brushes.'
  },
  {
    id: 'crucible',
    name: 'Porcelain Crucible & Lid',
    alternateNames: ['Crucible with Cover', 'Gooch Crucible'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'High-alumina porcelain cup capable of enduring direct furnace temperatures exceeding 1000°C',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 32H70L64 80H36L30 32Z" stroke="#0891b2" stroke-width="3.5" fill="#f8fafc"/><path d="M26 28H74V32H26V28Z" fill="#0891b2"/><circle cx="50" cy="22" r="3" stroke="#0891b2" stroke-width="2"/></svg>`,
    description: 'A small heat-resistant cup made of glazed porcelain or platinum. Used for heating chemicals to extreme temperatures for ashing, gravimetric decomposition, or metal fusion.',
    commonUses: ['Gravimetric analysis (ignition to constant mass)', 'Ash content determination of organic samples', 'High-temperature thermal decomposition'],
    specifications: [
      { label: 'Capacity (Example)', value: '30 mL (Tall or medium form)', isExample: true },
      { label: 'Max Temperature', value: 'Up to 1150°C (Glazed porcelain)', isExample: true }
    ],
    operatingInstructions: ['Ignite empty crucible and lid to constant mass before sample weighing.', 'Heat supported in a pipeclay triangle over Bunsen or in muffle furnace.', 'Cool in a desiccator before final balance weighing.'],
    safetyPrecautions: ['Handle strictly with stainless steel crucible tongs.', 'Never place hot crucible on cold bench surfaces (cracks immediately).'],
    commonMistakes: ['Weighing crucible while still warm; convection currents ruin gravimetric mass readings.'],
    relatedEquipmentIds: ['crucible-tongs', 'pipeclay-triangle', 'desiccator', 'electronic-balance'],
    standardMaterial: 'High-Grade Glazed Laboratory Porcelain',
    cleaningAndStorage: 'Soak in dilute acid if mineral residues remain; store dry in desiccator cabinets.'
  },
  {
    id: 'evaporating-dish',
    name: 'Porcelain Evaporating Basin',
    alternateNames: ['Evaporating Dish', 'Crystallizing Basin'],
    category: 'reaction',
    categoryLabel: 'Flasks & Reaction Vessels',
    tagline: 'Shallow wide-diameter glazed porcelain dish with pouring lip for solution concentration',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 42C22 66 34 78 50 78C66 78 78 66 78 42H22Z" stroke="#0891b2" stroke-width="3.5" fill="#f8fafc"/><path d="M22 42L18 38" stroke="#0891b2" stroke-width="3"/></svg>`,
    description: 'A shallow dish with a large surface area and small pouring lip. Encourages rapid vapor evaporation to concentrate solutions and crystallize dissolved salts.',
    commonUses: ['Evaporating solvents to isolate dissolved salts', 'Concentration of aqueous mixtures over boiling water baths', 'Drying wet chemical precipitates'],
    specifications: [
      { label: 'Diameter (Example)', value: '80 mm / 100 mm (Capacity ~100 mL)', isExample: true },
      { label: 'Finish', value: 'Internally glazed with spout; unglazed exterior base', isExample: true }
    ],
    operatingInstructions: ['Place over a boiling water bath for gentle, controlled evaporation.', 'Avoid direct high flame to prevent solute spattering.'],
    safetyPrecautions: ['Hot evaporating dishes retain thermal energy for a long time; handle with tongs.'],
    commonMistakes: ['Heating violently to dryness, causing crystals to crack and spit out.'],
    relatedEquipmentIds: ['crucible', 'water-bath', 'wire-gauze'],
    standardMaterial: 'Thermal Resistant Glazed Porcelain',
    cleaningAndStorage: 'Scrape dry salts gently; wash with warm water and dry stacked.'
  },

  // =========================================================================
  // 3. SEPARATION, FILTRATION & PURIFICATION (10 items)
  // =========================================================================
  {
    id: 'funnel',
    name: 'Conical Filter Funnel',
    alternateNames: ['Filter Funnel', 'Standard Glass Funnel'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Wide 60-degree cone with narrow beveled stem for channeled pouring and gravity filtration',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 22H78L54 58V84L46 88V58L22 22Z" stroke="#0891b2" stroke-width="4"/></svg>`,
    description: 'A 60-degree conical glass funnel with a slender beveled stem. Used for gravity filtration with folded filter paper and pouring fluids safely into narrow containers.',
    commonUses: ['Gravity filtration of crystalline precipitates', 'Pouring reagents cleanly into burettes and flasks', 'Solid-liquid qualitative separation'],
    specifications: [
      { label: 'Top Diameter (Example)', value: '65 mm / 75 mm (60° cone angle)', isExample: true },
      { label: 'Stem Style', value: 'Beveled 45° tip for rapid drainage column', isExample: true }
    ],
    operatingInstructions: ['Fold filter paper in quarters, tear outer corner, moisten with solvent to create hydraulic seal.', 'Pour solution down a glass stirring rod directed into cone.'],
    safetyPrecautions: ['Do not overfill above the top edge of the filter paper.'],
    commonMistakes: ['Leaving funnel in the top of a burette while performing titrations.'],
    relatedEquipmentIds: ['burette', 'beaker', 'conical-flask', 'glass-rod'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Clean stem with pipe cleaner brush; dry stacked on peg racks.'
  },
  {
    id: 'separating-funnel',
    name: 'Separating Funnel',
    alternateNames: ['Sep Funnel', 'Separatory Funnel', 'Extraction Funnel'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Pear-shaped vessel with ground stopper and bottom stopcock for liquid-liquid extraction',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 14H56M46 14V24C46 24 68 34 68 56C68 70 54 82 54 82V90" stroke="#0891b2" stroke-width="3.5"/><rect x="42" y="76" width="16" height="5" rx="2" fill="#f59e0b"/></svg>`,
    description: 'A pear-shaped glass vessel featuring an upper stopper and lower stopcock. Used in liquid-liquid extraction to separate immiscible liquids of differing densities.',
    commonUses: ['Organic-aqueous partition extractions', 'Washing organic layers with brine or sodium bicarbonate', 'Partition coefficient determination'],
    specifications: [
      { label: 'Capacity (Example)', value: '250 mL or 500 mL', isExample: true },
      { label: 'Stopcock Type', value: 'PTFE non-lubricated stopcock plug', isExample: true }
    ],
    operatingInstructions: ['Invert funnel with stopper held firmly in palm and vent vapor pressure via stopcock.', 'Mount in iron ring clamp and allow phases to cleanly resolve before draining lower layer.'],
    safetyPrecautions: ['Always vent frequently during shaking, especially when washing with sodium bicarbonate.'],
    commonMistakes: ['Forgetting to remove top stopper before opening stopcock (creates vacuum preventing drainage).'],
    relatedEquipmentIds: ['retort-stand', 'conical-flask', 'beaker'],
    standardMaterial: 'Borosilicate Glass 3.3 with PTFE stopcock',
    cleaningAndStorage: 'Rinse with solvent and water; store unstoppered with stopcock open.'
  },
  {
    id: 'buchner-funnel',
    name: 'Büchner Funnel',
    alternateNames: ['Vacuum Funnel', 'Suction Funnel'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Perforated porcelain cylindrical funnel for high-speed vacuum filtration',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 20H74V48H56V84H44V48H26V20Z" stroke="#0891b2" stroke-width="3.5" fill="#f8fafc"/><line x1="30" y1="48" x2="70" y2="48" stroke="#0891b2" stroke-width="3"/></svg>`,
    description: 'A porcelain funnel featuring a flat perforated plate base. Fitted with flat circular filter paper and mounted on a filter flask connected to a vacuum aspirator.',
    commonUses: ['Rapid vacuum filtration of synthesized crystals', 'Washing and drying organic precipitates', 'Collecting recrystallized organic compounds'],
    specifications: [
      { label: 'Diameter (Example)', value: '90 mm / 110 mm plate diameter', isExample: true },
      { label: 'Filter Paper Match', value: 'Standard circular qualitative/quantitative paper', isExample: true }
    ],
    operatingInstructions: ['Seat flat filter paper over perforations and wet with solvent to create vacuum seal.', 'Apply suction before pouring slurry.'],
    safetyPrecautions: ['Use thick-walled vacuum tubing and heavy-walled filter flasks to prevent vacuum implosion.'],
    commonMistakes: ['Pouring slurry before vacuum is applied, letting solids slip under paper edges.'],
    relatedEquipmentIds: ['buchner-flask', 'hirsch-funnel'],
    standardMaterial: 'Glazed Chemical Porcelain',
    cleaningAndStorage: 'Clean perforations with toothbrush; dry stacked.'
  },
  {
    id: 'buchner-flask',
    name: 'Büchner Filter Flask',
    alternateNames: ['Suction Flask', 'Filter Flask', 'Kitasato Flask'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Heavy-walled Erlenmeyer flask with barbed side-arm tubulation for vacuum suction',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 14H56V28L74 78C75.5 82 73 86 69 86H31C27 86 24.5 82 26 78L44 28V14Z" stroke="#0891b2" stroke-width="4"/><path d="M54 22H66V28" stroke="#0891b2" stroke-width="3" fill="none"/></svg>`,
    description: 'A conical flask constructed from thick, heavy-gauge borosilicate glass featuring a barbed glass sidearm for connecting vacuum suction tubing.',
    commonUses: ['Receiving filtrate during vacuum suction filtration', 'Vacuum degassing of HPLC mobile phases', 'Moisture and vacuum trap assembly'],
    specifications: [
      { label: 'Volume (Example)', value: '500 mL or 1000 mL heavy-wall', isExample: true },
      { label: 'Vacuum Rating', value: 'Rated for full vacuum (-1 bar / 100 kPa)', isExample: true }
    ],
    operatingInstructions: ['Fit rubber cone collar / adapter into neck to seal Büchner funnel.', 'Connect thick vacuum rubber tubing to sidearm.'],
    safetyPrecautions: ['Never use regular thin-walled Erlenmeyer flasks for vacuum filtration.'],
    commonMistakes: ['Disconnecting vacuum at pump while under suction, causing water back-siphon.'],
    relatedEquipmentIds: ['buchner-funnel', 'hirsch-funnel'],
    standardMaterial: 'Heavy-Duty Borosilicate 3.3 Glass',
    cleaningAndStorage: 'Wash with detergent, inspect for star cracks before every vacuum run.'
  },
  {
    id: 'hirsch-funnel',
    name: 'Hirsch Funnel',
    alternateNames: ['Micro-Büchner Funnel', 'Small Vacuum Funnel'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Small conical porcelain funnel with perforated plate for micro-scale vacuum filtration',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 24H68L56 50V84H44V50L32 24Z" stroke="#0891b2" stroke-width="3" fill="#f8fafc"/></svg>`,
    description: 'A miniature variant of the Büchner funnel with sloping conical sides and a small perforated plate. Specially designed for collecting milligram-scale precipitates.',
    commonUses: ['Micro-scale recrystallization yields (10 mg to 500 mg)', 'Filtration of NMR or analytical samples', 'Handling high-value active pharmaceutical precipitates'],
    specifications: [
      { label: 'Top Diameter (Example)', value: '42 mm (with 12 mm perforated plate)', isExample: true }
    ],
    operatingInstructions: ['Cut circular filter disc to exact size of perforated plate.', 'Wet with single drop of chilled solvent to seal.'],
    safetyPrecautions: ['Handle small porcelain stem gently in rubber adapters.'],
    commonMistakes: ['Using oversized filter paper that folds up the sides, allowing slurry to bypass.'],
    relatedEquipmentIds: ['buchner-flask', 'buchner-funnel'],
    standardMaterial: 'Chemical Glazed Porcelain',
    cleaningAndStorage: 'Rinse with acetone; dry on towel.'
  },
  {
    id: 'sintered-glass-funnel',
    name: 'Sintered Glass Fritted Funnel',
    alternateNames: ['Fritted Glass Funnel', 'Gooch Glass Crucible'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Glass funnel with integrated porous fritted glass disc requiring no filter paper',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 20H70V48H56V84H44V48H30V20Z" stroke="#0891b2" stroke-width="3.5"/><rect x="34" y="44" width="32" height="6" fill="#94a3b8"/></svg>`,
    description: 'Features a porous fused borosilicate glass disc (frit) sealed directly into the funnel body, eliminating the need for paper filters.',
    commonUses: ['Filtering solutions containing corrosive acids (concentrated HNO3, H2SO4) that dissolve paper', 'Quantitative gravimetric precipitate drying', 'Fine particulate clarification'],
    specifications: [
      { label: 'Porosity Grade (Example)', value: 'Grade G3 (16–40 µm) or G4 (10–16 µm)', isExample: true }
    ],
    operatingInstructions: ['Apply gentle vacuum and wash precipitate directly on the fritted disc.', 'Dry directly in oven at 110°C.'],
    safetyPrecautions: ['Do not use strong alkaline solutions (NaOH) which dissolve silica frits.'],
    commonMistakes: ['Filtering gelatinous precipitates (like Al(OH)3) that permanently clog glass pores.'],
    relatedEquipmentIds: ['buchner-flask', 'desiccator'],
    standardMaterial: 'Borosilicate 3.3 with porous fused glass disc',
    cleaningAndStorage: 'Clean immediately with reverse vacuum flush using hot nitric acid or solvent.'
  },
  {
    id: 'liebig-condenser',
    name: 'Liebig Condenser',
    alternateNames: ['Straight Condenser', 'Water Condenser'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Straight inner tube surrounded by outer cooling water jacket for distillation condensation',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="36" y="24" width="28" height="52" rx="2" stroke="#0891b2" stroke-width="3"/><line x1="50" y1="12" x2="50" y2="88" stroke="#0891b2" stroke-width="3"/><path d="M64 32H74M64 68H74" stroke="#0891b2" stroke-width="2.5"/></svg>`,
    description: 'The standard laboratory condenser consisting of a straight inner glass tube surrounded by an outer glass jacket through which cooling water circulates.',
    commonUses: ['Simple and fractional distillation setups', 'Condensing vapors into liquid distillate receiver', 'Solvent recovery procedures'],
    specifications: [
      { label: 'Jacket Length (Example)', value: '300 mm / 400 mm', isExample: true },
      { label: 'Joints', value: 'Standard Taper ST 24/40 or 19/26', isExample: true }
    ],
    operatingInstructions: ['Connect water supply to the BOTTOM inlet and drain from TOP outlet (counter-current cooling ensuring bubble-free jacket).'],
    safetyPrecautions: ['Secure hose barbs with plastic zip ties or clamps to prevent tubing blow-off flooding.'],
    commonMistakes: ['Connecting cooling water supply to the top nozzle, creating air pockets and poor cooling.'],
    relatedEquipmentIds: ['round-bottom-flask', 'retort-stand', 'allihn-condenser'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Drain water completely after use to prevent bacterial slime growth in jacket.'
  },
  {
    id: 'graham-condenser',
    name: 'Graham Coiled Condenser',
    alternateNames: ['Coiled Condenser', 'Spiral Condenser'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Condenser with spiral glass coil inside water jacket for high-surface-area vapor cooling',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="36" y="22" width="28" height="56" rx="2" stroke="#0891b2" stroke-width="3"/><path d="M50 12V24C44 32 56 40 50 48C44 56 56 64 50 72V88" stroke="#0891b2" stroke-width="2.5" fill="none"/></svg>`,
    description: 'Contains a spiral glass coil running through the outer water jacket, providing significantly greater surface area for condensing volatile organic vapors.',
    commonUses: ['Distillation of low-boiling volatile solvents (diethyl ether, pentane)', 'Vacuum distillation vapor condensing'],
    specifications: [
      { label: 'Jacket Length (Example)', value: '300 mm spiral', isExample: true }
    ],
    operatingInstructions: ['Position vertically to allow condensate to drain freely through coil.'],
    safetyPrecautions: ['Do not use for reflux reactions where high boiling surges can flood coil.'],
    commonMistakes: ['Using in horizontal orientation (condensate collects in lower loops of coil).'],
    relatedEquipmentIds: ['liebig-condenser', 'allihn-condenser'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Rinse coil with ethanol and flush jacket with compressed air.'
  },
  {
    id: 'allihn-condenser',
    name: 'Allihn Reflux Condenser',
    alternateNames: ['Bulb Condenser', 'Reflux Condenser'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Bulbed inner tube condenser designed for vertical reflux synthesis without flooding',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="34" y="22" width="32" height="56" rx="2" stroke="#0891b2" stroke-width="3"/><circle cx="50" cy="36" r="6" stroke="#0891b2" stroke-width="2"/><circle cx="50" cy="50" r="6" stroke="#0891b2" stroke-width="2"/><circle cx="50" cy="64" r="6" stroke="#0891b2" stroke-width="2"/><path d="M50 12V30M50 70V88" stroke="#0891b2" stroke-width="2.5"/></svg>`,
    description: 'Features a series of glass bulbs along its inner tube that increase cooling surface area while allowing condensed liquid to drip back smoothly into the reaction flask.',
    commonUses: ['Vertical organic reflux reactions at boiling point', 'Soxhlet extraction cooling', 'Esterifications and saponifications'],
    specifications: [
      { label: 'Bulb Count (Example)', value: '4 to 6 bulb configurations', isExample: true }
    ],
    operatingInstructions: ['Mount strictly vertically over reflux flask.', 'Ensure top opening remains unsealed or fitted with a drying tube.'],
    safetyPrecautions: ['NEVER seal the top of a reflux condenser (heating a closed system results in explosion).'],
    commonMistakes: ['Stoppered top of condenser creating dangerous over-pressure.'],
    relatedEquipmentIds: ['round-bottom-flask', 'heating-mantle', 'soxhlet-extractor'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Rinse bulbs with acetone; store vertically in padded cabinet.'
  },
  {
    id: 'dean-stark-trap',
    name: 'Dean-Stark Trap Apparatus',
    alternateNames: ['Azeotropic Distillation Trap', 'Water Estimator'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Calibrated side-arm receiver for collecting and measuring water during azeotropic reflux',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 14V86H58V32H70V24H50" stroke="#0891b2" stroke-width="3"/><rect x="52" y="78" width="12" height="4" rx="1.5" fill="#f59e0b"/></svg>`,
    description: 'A specialized distillation receiver used to remove water continuously from reactions (e.g. esterifications) using a water-immiscible azeotropic solvent like toluene.',
    commonUses: ['Fischer esterifications driven to completion by water removal', 'Measuring moisture content in petroleum and food products', 'Azeotropic drying'],
    specifications: [
      { label: 'Trap Capacity (Example)', value: '10 mL or 25 mL graduated stem (0.1 mL subdivisions)', isExample: true }
    ],
    operatingInstructions: ['Pre-fill trap arm with organic solvent before heating.', 'Water condenses, separates into lower layer in graduated stem, and volume is read directly.'],
    safetyPrecautions: ['Use non-flammable thermal sources when heating flammable toluene azeotropes.'],
    commonMistakes: ['Failing to prime the trap with organic solvent prior to starting reflux.'],
    relatedEquipmentIds: ['round-bottom-flask', 'allihn-condenser', 'heating-mantle'],
    standardMaterial: 'Borosilicate Glass 3.3 with PTFE stopcock',
    cleaningAndStorage: 'Clean graduated barrel with wire brush; dry with nitrogen.'
  },

  // =========================================================================
  // 4. EXTRACTION, PURIFICATION & GAS HANDLING (8 items)
  // =========================================================================
  {
    id: 'soxhlet-extractor',
    name: 'Soxhlet Extraction Apparatus',
    alternateNames: ['Continuous Extractor', 'Percolation Extractor'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Percolating glass extractor with automatic siphon tube for continuous solid-liquid extraction',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="38" y="26" width="24" height="48" rx="2" stroke="#0891b2" stroke-width="3"/><path d="M38 68H28V36H38" stroke="#0891b2" stroke-width="2.5" fill="none"/><path d="M62 70C68 70 72 60 72 48C72 36 62 26 62 26" stroke="#0891b2" stroke-width="2.5" fill="none"/></svg>`,
    description: 'An apparatus designed for continuous automated extraction of lipids, natural products, or organic compounds from solid matrices using repeated solvent percolation and siphon cycles.',
    commonUses: ['Extracting fat content from food matrices (crude fat determination)', 'Extracting essential oils and botanical active compounds', 'Leaching organic pollutants from environmental soils'],
    specifications: [
      { label: 'Thimble Size (Example)', value: '33 mm ID × 80 mm length cellulose thimble', isExample: true },
      { label: 'Flask Volume', value: '250 mL or 500 mL boiling flask', isExample: true }
    ],
    operatingInstructions: ['Pack sample in porous cellulose thimble.', 'As solvent boils and refluxes, chamber fills until siphon empties solution back into boiling flask.'],
    safetyPrecautions: ['Ensure water flow to reflux condenser is continuous to prevent solvent vapor release.'],
    commonMistakes: ['Overfilling thimble above siphon arm height, carrying solid into boiling flask.'],
    relatedEquipmentIds: ['allihn-condenser', 'round-bottom-flask', 'heating-mantle'],
    standardMaterial: 'Precision Borosilicate Glass 3.3',
    cleaningAndStorage: 'Clean siphon tube carefully with acetone; protect delicate glass side-loops.'
  },
  {
    id: 'rotary-evaporator-flask',
    name: 'Rotary Evaporator Flask',
    alternateNames: ['Rotovap Flask', 'Evaporation Bulb'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Pear-shaped heavy-wall flask designed for dynamic rotation in warm water baths',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46 12H54V28L68 64C72 74 64 86 50 86C36 86 28 74 32 64L46 28V12Z" stroke="#0891b2" stroke-width="3.5"/></svg>`,
    description: 'A pear-shaped flask designed to mount on the vapor duct of a rotary evaporator. Rotation creates a thin liquid film over the glass, dramatically accelerating evaporation under gentle vacuum.',
    commonUses: ['Rapid removal of volatile reaction solvents', 'Concentrating synthetic organic yields', 'Gentle drying of heat-sensitive compounds'],
    specifications: [
      { label: 'Capacity (Example)', value: '250 mL or 500 mL pear form', isExample: true },
      { label: 'Joint', value: 'NS 29/32 standard ground taper joint', isExample: true }
    ],
    operatingInstructions: ['Secure with Keck clip onto rotovap vapor duct.', 'Spin at 100–150 rpm in warm water bath while gradually applying vacuum.'],
    safetyPrecautions: ['Always release vacuum before unclipping flask from rotary drive.'],
    commonMistakes: ['Applying full vacuum instantly, causing solution to bump into rotovap condenser.'],
    relatedEquipmentIds: ['round-bottom-flask', 'water-bath'],
    standardMaterial: 'Heavy-Wall Borosilicate Glass 3.3',
    cleaningAndStorage: 'Rinse with acetone; grease joint lightly with vacuum grease.'
  },
  {
    id: 'chromatography-column',
    name: 'Flash Chromatography Column',
    alternateNames: ['Glass Column', 'Separation Column'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Precision bore vertical glass column with fritted disc and stopcock for silica gel separation',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="42" y="14" width="16" height="66" stroke="#0891b2" stroke-width="3"/><line x1="42" y1="70" x2="58" y2="70" stroke="#0891b2" stroke-width="3"/><path d="M50 80V92" stroke="#0891b2" stroke-width="2.5"/></svg>`,
    description: 'A vertical glass tube fitted with a porous sintered glass frit at the base and a PTFE stopcock. Packed with stationary phase (silica gel or alumina) to separate complex chemical mixtures.',
    commonUses: ['Purification of reaction products by flash column chromatography', 'Fractionation of natural plant extract fractions', 'Removal of baseline polar impurities'],
    specifications: [
      { label: 'Internal Diameter (Example)', value: '25 mm ID × 400 mm effective length', isExample: true },
      { label: 'Pressure Rating', value: 'Up to 0.5 bar for air-assisted flash flow', isExample: true }
    ],
    operatingInstructions: ['Slurry-pack silica gel with eluent solvent.', 'Never let the solvent level drop below the top of the silica bed.'],
    safetyPrecautions: ['Silica gel powder is an inhalation hazard (silicosis); pack inside fume hood.'],
    commonMistakes: ['Allowing the column bed to run dry, creating air channels that ruin separation.'],
    relatedEquipmentIds: ['test-tube', 'beaker', 'fume-hood'],
    standardMaterial: 'Heavy-Wall Borosilicate 3.3 Glass with PTFE stopcock',
    cleaningAndStorage: 'Extrude spent silica with air pressure; wash frit with polar solvent.'
  },
  {
    id: 'desiccator',
    name: 'Vacuum Glass Desiccator',
    alternateNames: ['Desiccator Cabinet', 'Drying Chamber'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Heavy glass sealable enclosure with perforated plate and desiccant for moisture-free storage',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 46C22 30 34 22 50 22C66 22 78 30 78 46H22Z" stroke="#0891b2" stroke-width="3.5" fill="#f8fafc"/><rect x="24" y="46" width="52" height="40" rx="3" stroke="#0891b2" stroke-width="3.5"/><circle cx="50" cy="16" r="4" fill="#0891b2"/></svg>`,
    description: 'A heavy-walled sealable enclosure containing a bottom compartment for drying agents (silica gel or phosphorus pentoxide) and a perforated porcelain plate for holding samples in dry air.',
    commonUses: ['Cooling heated crucibles and weighing bottles without moisture absorption', 'Long-term storage of hygroscopic analytical standards', 'Vacuum drying of solid samples'],
    specifications: [
      { label: 'Internal Diameter (Example)', value: '200 mm or 250 mm chamber', isExample: true },
      { label: 'Flange Seal', value: 'Precision ground glass flange with silicone vacuum grease', isExample: true }
    ],
    operatingInstructions: ['Slide the lid horizontally to open; do not attempt to lift directly against vacuum.', 'Maintain blue indicator silica gel in bottom basin.'],
    safetyPrecautions: ['Release vacuum slowly via stopcock to avoid air turbulence blowing powders out.'],
    commonMistakes: ['Lifting the lid vertically instead of sliding, breaking the vacuum seal flange.'],
    relatedEquipmentIds: ['crucible', 'electronic-balance'],
    standardMaterial: 'Heavy Molded Borosilicate Glass with porcelain plate',
    cleaningAndStorage: 'Regenerate pink hydrated silica gel in oven at 120°C until cobalt-blue.'
  },
  {
    id: 'gas-washing-bottle',
    name: 'Gas Washing Bottle',
    alternateNames: ['Drechsel Bottle', 'Gas Bubbler', 'Gas Scrubber'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Cylindrical bottle with long dip tube to bubble gases through liquid washing reagents',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="34" y="30" width="32" height="56" rx="4" stroke="#0891b2" stroke-width="3"/><path d="M50 14V78M38 18H50" stroke="#0891b2" stroke-width="2.5"/><path d="M50 24H62V18" stroke="#0891b2" stroke-width="2.5"/></svg>`,
    description: 'A bottle fitted with an inlet dip tube extending near the bottom and a short outlet tube. Gas bubbles through liquid scrubbing reagents to remove impurities, acidic vapors, or moisture.',
    commonUses: ['Drying gases by bubbling through concentrated sulfuric acid', 'Removing acidic impurities (HCl/SO2) by bubbling through sodium hydroxide', 'Monitoring inert gas flow rates'],
    specifications: [
      { label: 'Capacity (Example)', value: '250 mL or 500 mL', isExample: true },
      { label: 'Dispersion Type', value: 'Open dip tube or sintered glass frit bubbler', isExample: true }
    ],
    operatingInstructions: ['Connect gas source to the LONG dip tube and outlet to receiver.'],
    safetyPrecautions: ['Ensure a safety empty trap bottle is placed before and after to prevent liquid back-siphon.'],
    commonMistakes: ['Connecting gas source to the short outlet tube, blowing liquid out the dip tube.'],
    relatedEquipmentIds: ['u-tube', 'pneumatic-trough'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Neutralize scrubbing solutions before disposal; rinse with water.'
  },
  {
    id: 'pneumatic-trough',
    name: 'Pneumatic Trough & Gas Jar',
    alternateNames: ['Gas Collection Trough', 'Beehive Shelf Setup'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Water basin with perforated beehive shelf and glass jar for collecting insoluble gases',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="52" width="64" height="34" rx="4" stroke="#0891b2" stroke-width="3"/><rect x="42" y="16" width="16" height="42" stroke="#0891b2" stroke-width="2.5"/><line x1="20" y1="62" x2="80" y2="62" stroke="#22d3ee" stroke-width="2" stroke-dasharray="3 3"/></svg>`,
    description: 'A water bath containing a submerged perforated beehive shelf. A water-filled gas jar is inverted over the shelf, allowing gas generated from a reaction to displace water and fill the jar.',
    commonUses: ['Collecting water-insoluble gases (hydrogen, oxygen, methane)', 'Gas volume displacement experiments', 'Qualitative gas combustion testing'],
    specifications: [
      { label: 'Trough Material', value: 'Molded transparent polypropylene or glass', isExample: true },
      { label: 'Gas Jar Volume', value: 'Approx. 250 mL heavy flint glass jar', isExample: true }
    ],
    operatingInstructions: ['Fill gas jar completely with water, cover with glass cover slip, invert underwater over shelf.'],
    safetyPrecautions: ['Disconnect delivery tube before turning off heat to prevent suck-back of cold water.'],
    commonMistakes: ['Attempting to collect water-soluble gases (like ammonia or hydrogen chloride) over water.'],
    relatedEquipmentIds: ['test-tube', 'delivery-tube'],
    standardMaterial: 'Heavy Glass or High-Density Polypropylene',
    cleaningAndStorage: 'Dry gas jars and store inverted on shelf.'
  },
  {
    id: 'hofmann-voltameter',
    name: 'Hofmann Voltameter',
    alternateNames: ['Water Electrolysis Apparatus'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Three-limbed graduated glass apparatus with platinum electrodes for water electrolysis',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 16V80M50 24V88M70 16V80M30 80H70" stroke="#0891b2" stroke-width="3"/><rect x="28" y="76" width="4" height="8" fill="#f59e0b"/><rect x="68" y="76" width="4" height="8" fill="#f59e0b"/></svg>`,
    description: 'An apparatus consisting of three joined vertical glass tubes with platinum electrodes at the base and stopcocks at the top. Used to electrolyze acidified water into stoichiometric H2 and O2 gases.',
    commonUses: ['Demonstrating Faraday laws of electrolysis', 'Verifying the 2:1 volume ratio of hydrogen to oxygen in water', 'Electrochemical gas generation'],
    specifications: [
      { label: 'Limbs Capacity (Example)', value: '50 mL graduated side limbs (0.2 mL graduations)', isExample: true },
      { label: 'Electrodes', value: 'High-purity Platinum foils sealed in glass', isExample: true }
    ],
    operatingInstructions: ['Fill with 0.1 M dilute sulfuric acid electrolyte via center reservoir funnel.', 'Connect 12V DC power supply and measure gas volumes produced at cathode and anode.'],
    safetyPrecautions: ['Hydrogen gas evolved at cathode is highly explosive; keep flames away from open stopcock.'],
    commonMistakes: ['Using alternating current (AC) instead of direct current (DC).'],
    relatedEquipmentIds: ['burette', 'power-supply'],
    standardMaterial: 'Borosilicate Glass 3.3 with Platinum Electrodes',
    cleaningAndStorage: 'Rinse with distilled water; store upright on wooden support board.'
  },
  {
    id: 'u-tube',
    name: 'Drying U-Tube',
    alternateNames: ['Calcium Chloride Tube', 'Absorption U-Tube'],
    category: 'separation',
    categoryLabel: 'Separation & Distillation',
    tagline: 'U-shaped glass tube with side-arms packed with solid desiccant to dry gas streams',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 20V60C36 72 42 78 50 78C58 78 64 72 64 60V20" stroke="#0891b2" stroke-width="3.5" fill="none"/><line x1="26" y1="30" x2="36" y2="30" stroke="#0891b2" stroke-width="2.5"/><line x1="64" y1="30" x2="74" y2="30" stroke="#0891b2" stroke-width="2.5"/></svg>`,
    description: 'A U-shaped glass tube with side-arm connections packed with granular drying agent (anhydrous CaCl2 or soda lime) to absorb moisture or carbon dioxide from passing gas.',
    commonUses: ['Drying gas streams before quantitative reactions', 'Elemental carbon-hydrogen analysis absorption trains', 'Protecting moisture-sensitive reactions from atmospheric humidity'],
    specifications: [
      { label: 'Length (Example)', value: '100 mm / 150 mm limb height with glass stoppers', isExample: true }
    ],
    operatingInstructions: ['Pack with granular anhydrous calcium chloride plugged at ends with glass wool.'],
    safetyPrecautions: ['Ensure gas passes freely without excessive back-pressure.'],
    commonMistakes: ['Packing drying agent so tightly that gas flow is blocked.'],
    relatedEquipmentIds: ['gas-washing-bottle', 'schlenk-flask'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Empty spent clumping desiccant; rinse with water and dry.'
  },

  // =========================================================================
  // 5. HEATING, IGNITION & THERMAL CONTROL (8 items)
  // =========================================================================
  {
    id: 'bunsen-burner',
    name: 'Bunsen Burner',
    alternateNames: ['Tirrill Burner', 'Laboratory Gas Burner', 'Meker Burner'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal Control',
    tagline: 'Metallic gas burner with adjustable air collar for producing hot non-luminous flame',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="44" y="32" width="12" height="46" fill="#64748b"/><rect x="42" y="60" width="16" height="8" rx="2" fill="#0891b2"/><rect x="28" y="78" width="44" height="10" rx="3" fill="#0f172a"/><path d="M44 32C44 20 50 8 50 8C50 8 56 20 56 32Z" fill="#38bdf8"/></svg>`,
    description: 'A laboratory gas burner combining flammable gas with adjustable air influx through an adjustable collar. Produces an intense, clean, non-luminous blue flame up to 1500°C.',
    commonUses: ['Heating non-flammable solutions in beakers and flasks', 'Sterilizing inoculating loops in microbiology', 'Glass working and fire-polishing tube ends'],
    specifications: [
      { label: 'Flame Temperature', value: 'Up to 1500°C (Non-luminous blue flame)', isExample: true },
      { label: 'Gas Compatibility', value: 'Natural gas (methane) or LPG (propane/butane)', isExample: true }
    ],
    operatingInstructions: ['Close air collar before lighting to produce yellow safety flame.', 'Open collar gradually to achieve roaring blue flame with sharp inner cone.'],
    safetyPrecautions: ['NEVER use a Bunsen burner near volatile flammable organic solvents (ether, acetone, hexane).', 'Tie back long hair and wear safety glasses.'],
    commonMistakes: ['Lighting burner with air collar open, causing strike-back inside barrel.'],
    relatedEquipmentIds: ['tripod-stand', 'wire-gauze', 'pipeclay-triangle', 'crucible'],
    standardMaterial: 'Nickel-plated brass barrel with heavy die-cast zinc base',
    cleaningAndStorage: 'Clean gas orifice pin; store with rubber tubing coiled loosely.'
  },
  {
    id: 'spirit-lamp',
    name: 'Spirit Alcohol Lamp',
    alternateNames: ['Alcohol Burner', 'Spirit Burner'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal Control',
    tagline: 'Glass container with cotton wick burning denatured ethanol for gentle flame heating',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 46C34 38 42 34 50 34C58 34 66 38 66 46V76C66 82 58 86 50 86C42 86 34 82 34 76V46Z" stroke="#0891b2" stroke-width="3.5"/><rect x="46" y="24" width="8" height="10" fill="#cbd5e1"/><path d="M46 24C46 14 50 6 50 6C50 6 54 14 54 24Z" fill="#f59e0b"/></svg>`,
    description: 'A compact glass reservoir fitted with a braided cotton wick. Burns denatured ethanol to produce a low-temperature flame where piped gas is unavailable.',
    commonUses: ['Low-temperature flame heating', 'Field laboratory sterilizations', 'Bending micro glass capillaries'],
    specifications: [
      { label: 'Capacity (Example)', value: '100 mL or 150 mL reservoir', isExample: true },
      { label: 'Flame Temperature', value: 'Approx. 500°C to 800°C', isExample: true }
    ],
    operatingInstructions: ['Fill reservoir to 70% with 95% denatured ethanol.', 'Extinguish by placing cap over wick; NEVER blow on an alcohol flame.'],
    safetyPrecautions: ['Never refill a spirit lamp while it is lit or still hot.'],
    commonMistakes: ['Blowing on the flame to extinguish it, which can splatter burning alcohol.'],
    relatedEquipmentIds: ['test-tube', 'tripod-stand'],
    standardMaterial: 'Molded Soda-Lime Glass with brass collar and cotton wick',
    cleaningAndStorage: 'Keep cap tightly on when stored to prevent ethanol evaporation.'
  },
  {
    id: 'heating-mantle',
    name: 'Electric Heating Mantle',
    alternateNames: ['Mantle Heater', 'Spherical Heating Mantle'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal Control',
    tagline: 'Knitted fiber heating element shaped to conform snugly around round bottom flasks',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="44" width="56" height="42" rx="8" stroke="#0891b2" stroke-width="3" fill="#ffffff"/><path d="M30 44C30 62 40 70 50 70C60 70 70 62 70 44H30Z" fill="#0f172a"/><circle cx="50" cy="78" r="4" fill="#f43f5e"/></svg>`,
    description: 'An electric heating device with a flexible knitted glass-fiber nest shaped to hug round-bottom flasks. Provides uniform, spark-free heating without open flames.',
    commonUses: ['Heating flammable solvents during organic reflux reactions', 'Rotary and fractional distillation setups', 'Safe evaporation without open flame ignition risk'],
    specifications: [
      { label: 'Flask Matching', value: 'Fitted specifically for 250 mL / 500 mL / 1000 mL flasks', isExample: true },
      { label: 'Max Temperature', value: 'Up to 450°C controlled via stepless rheostat', isExample: true }
    ],
    operatingInstructions: ['Ensure flask matches the exact size cavity of the mantle.', 'Control temperature via external rheostat or integrated dial.'],
    safetyPrecautions: ['Never spill liquids into the fabric mantle cavity; liquid ingress risks electrical short.'],
    commonMistakes: ['Placing an undersized flask into a large mantle, causing localized burnout.'],
    relatedEquipmentIds: ['round-bottom-flask', 'allihn-condenser', 'retort-stand'],
    standardMaterial: 'Insulated Glass-Fiber Nest in Powder-Coated Metal Casing',
    cleaningAndStorage: 'Keep fabric dry and free of chemical spills; store with cord wrapped.'
  },
  {
    id: 'hot-plate-stirrer',
    name: 'Hot Plate & Magnetic Stirrer',
    alternateNames: ['Magnetic Stirrer', 'Ceramic Hotplate', 'Stir Plate'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal Control',
    tagline: 'Ceramic heating plate combined with rotating internal magnets for simultaneous heating and stirring',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="48" width="64" height="38" rx="6" stroke="#0891b2" stroke-width="3.5" fill="#ffffff"/><rect x="24" y="38" width="52" height="10" rx="2" fill="#cbd5e1"/><circle cx="36" cy="68" r="6" stroke="#0891b2" stroke-width="2"/><circle cx="64" cy="68" r="6" stroke="#0891b2" stroke-width="2"/></svg>`,
    description: 'An instrument with a chemical-resistant ceramic top plate and dual controls for surface heating and magnetic stirring via PTFE-coated stir bars.',
    commonUses: ['Dissolving solids with continuous stirring and gentle heating', 'Chemical syntheses requiring continuous agitation', 'Titrations with automated magnetic stirring'],
    specifications: [
      { label: 'Temp Range', value: 'Ambient +5°C up to 380°C or 500°C', isExample: true },
      { label: 'Speed Range', value: '100 to 1500 RPM', isExample: true },
      { label: 'Top Plate', value: 'Solid white chemical-resistant ceramic plate', isExample: true }
    ],
    operatingInstructions: ['Drop a clean PTFE stir bar into the beaker.', 'Increase stirring speed gradually from zero to prevent stir bar decouplings ("spinning out").'],
    safetyPrecautions: ['Ceramic plate stays dangerously hot after turning off; look for the "HOT" warning LED.'],
    commonMistakes: ['Cranking stirring dial instantly to maximum speed, dislodging the stir bar.'],
    relatedEquipmentIds: ['beaker', 'conical-flask'],
    standardMaterial: 'Die-cast aluminum base with solid ceramic work surface',
    cleaningAndStorage: 'Wipe ceramic plate clean with damp sponge once cooled.'
  },
  {
    id: 'water-bath',
    name: 'Thermostatic Water Bath',
    alternateNames: ['Constant Temperature Bath', 'Serological Water Bath'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal Control',
    tagline: 'Microprocessor-controlled heated water tank for uniform temperature incubation up to 100°C',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="38" width="68" height="46" rx="6" stroke="#0891b2" stroke-width="3.5" fill="#ffffff"/><rect x="22" y="44" width="56" height="20" fill="#22d3ee" fill-opacity="0.3"/><line x1="28" y1="74" x2="44" y2="74" stroke="#0891b2" stroke-width="3"/></svg>`,
    description: 'A stainless-steel heated water reservoir with digital temperature regulation. Used to warm chemical reactions or incubate biological samples at steady temperatures up to 100°C.',
    commonUses: ['Gentle evaporation of volatile solvent solutions', 'Enzyme kinetic digestions at 37°C', 'Refluxing reactions below 100°C safely'],
    specifications: [
      { label: 'Temperature Range', value: 'Ambient +5°C to 99.9°C (±0.1°C precision)', isExample: true },
      { label: 'Tank Material', value: 'Deep-drawn seamless 304 Stainless Steel', isExample: true }
    ],
    operatingInstructions: ['Fill with distilled or deionized water to minimum level before powering on.', 'Cover with gabled lid to reduce evaporation.'],
    safetyPrecautions: ['Never operate water bath dry (heaters burn out instantly).'],
    commonMistakes: ['Using tap water, leading to mineral scale buildup on heating coils.'],
    relatedEquipmentIds: ['test-tube', 'evaporating-dish'],
    standardMaterial: 'Stainless Steel 304 with powder-coated outer chassis',
    cleaningAndStorage: 'Drain and descale monthly with citric acid solution.'
  },
  {
    id: 'wire-gauze',
    name: 'Ceramic-Centered Wire Gauze',
    alternateNames: ['Wire Gauze Mat', 'Asbestos-Free Gauze'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal Control',
    tagline: 'Woven wire mesh with heat-resistant ceramic center to disperse thermal flux evenly',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="60" rx="4" stroke="#0891b2" stroke-width="3"/><circle cx="50" cy="50" r="18" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/><line x1="24" y1="36" x2="76" y2="36" stroke="#94a3b8" stroke-width="1.5"/><line x1="24" y1="64" x2="76" y2="64" stroke="#94a3b8" stroke-width="1.5"/></svg>`,
    description: 'A sheet of woven galvanized iron wire mesh with a circular ceramic center. Placed on top of a tripod stand to spread thermal heat flux evenly under glassware.',
    commonUses: ['Supporting beakers and flasks on tripods over Bunsen burners', 'Preventing direct flame hotspots from thermal-cracking glassware', 'Distributing heat flux evenly'],
    specifications: [
      { label: 'Dimensions (Example)', value: '150 mm × 150 mm woven mesh', isExample: true },
      { label: 'Center Material', value: 'Non-asbestos ceramic composition disc', isExample: true }
    ],
    operatingInstructions: ['Place ceramic disc face-up on tripod ring stand.', 'Rest glassware in center of ceramic circle.'],
    safetyPrecautions: ['Discard frayed wire gauzes with missing ceramic centers.'],
    commonMistakes: ['Heating glassware on bare wire mesh without ceramic center, causing point cracking.'],
    relatedEquipmentIds: ['tripod-stand', 'bunsen-burner', 'beaker'],
    standardMaterial: 'Galvanized iron wire with refractory ceramic core',
    cleaningAndStorage: 'Store flat; keep dry to prevent iron rust.'
  },
  {
    id: 'pipeclay-triangle',
    name: 'Pipeclay Triangle',
    alternateNames: ['Clay Triangle', 'Crucible Triangle'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal Control',
    tagline: 'High-temperature ceramic clay sleeves on twisted iron wire for holding crucibles over flame',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 18L80 72H20L50 18Z" stroke="#0891b2" stroke-width="4" stroke-linejoin="round" fill="none"/></svg>`,
    description: 'Three ceramic clay cylinders strung on twisted galvanized iron wire formed into an equilateral triangle. Rests on tripod stands to cradle crucibles over direct flame.',
    commonUses: ['Supporting crucibles and covers during intense heating to red heat', 'Supporting small evaporating dishes over Bunsen burners'],
    specifications: [
      { label: 'Pipeclay Length (Example)', value: '50 mm or 65 mm ceramic sleeves', isExample: true },
      { label: 'Max Temperature', value: 'Up to 1100°C direct flame', isExample: true }
    ],
    operatingInstructions: ['Place across the ring of a tripod stand.', 'Seat crucible so that the bottom third sits securely inside triangle.'],
    safetyPrecautions: ['Ensure crucible size fits securely; an undersized crucible can fall through.'],
    commonMistakes: ['Using a cracked clay triangle that can snap under crucible weight.'],
    relatedEquipmentIds: ['crucible', 'tripod-stand', 'crucible-tongs'],
    standardMaterial: 'Refractory pipeclay ceramic and galvanized steel wire',
    cleaningAndStorage: 'Brush off soot once cooled; store hung on pegboard.'
  },
  {
    id: 'tripod-stand',
    name: 'Cast Iron Tripod Stand',
    alternateNames: ['Lab Tripod', 'Burner Tripod'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal Control',
    tagline: 'Three-legged cast iron support ring for holding apparatus over laboratory burners',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="30" r="22" stroke="#0891b2" stroke-width="4" fill="none"/><line x1="32" y1="36" x2="22" y2="86" stroke="#0891b2" stroke-width="4"/><line x1="68" y1="36" x2="78" y2="86" stroke="#0891b2" stroke-width="4"/><line x1="50" y1="52" x2="50" y2="88" stroke="#0891b2" stroke-width="4"/></svg>`,
    description: 'A sturdy three-legged support stand featuring a circular or triangular cast-iron ring. Provides stable support for wire gauzes, triangles, and glassware over burners.',
    commonUses: ['Supporting wire gauze and beakers during boiling', 'Supporting pipeclay triangles during crucible heating', 'Elevating vessels to optimum burner flame height'],
    specifications: [
      { label: 'Ring Diameter (Example)', value: '125 mm circular ring', isExample: true },
      { label: 'Height (Example)', value: '200 mm tall legs', isExample: true }
    ],
    operatingInstructions: ['Place on level benchtop with burner centered directly beneath ring.'],
    safetyPrecautions: ['Legs and ring become extremely hot during extended heating; do not touch with bare hands.'],
    commonMistakes: ['Using on an uneven surface causing boiling glassware to wobble.'],
    relatedEquipmentIds: ['bunsen-burner', 'wire-gauze', 'pipeclay-triangle'],
    standardMaterial: 'Heavy Cast Iron Ring with Zinc-Plated Steel Legs',
    cleaningAndStorage: 'Allow to cool completely before moving; store stacked.'
  },

  // =========================================================================
  // 6. MEASUREMENT, ANALYTICS & PHYSICAL SENSORS (8 items)
  // =========================================================================
  {
    id: 'electronic-balance',
    name: 'Precision Analytical Balance',
    alternateNames: ['Electronic Balance', 'Analytical Scale', 'Digital Balance'],
    category: 'measurement',
    categoryLabel: 'Measurement & Analytics',
    tagline: 'High-sensitivity electromagnetic balance with glass draft shield measuring to 0.0001 g',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="52" width="56" height="34" rx="6" stroke="#0891b2" stroke-width="4" fill="#ffffff"/><rect x="32" y="38" width="36" height="10" rx="3" fill="#cbd5e1"/><rect x="30" y="62" width="40" height="14" rx="2" fill="#0f172a"/><text x="35" y="73" fill="#22d3ee" font-family="monospace" font-size="9" font-weight="bold">0.000 g</text></svg>`,
    description: 'An electromagnetic force restoration instrument capable of weighing samples to 0.1 mg (0.0001 g). Features glass draft shield doors to prevent air currents from disrupting measurements.',
    commonUses: ['Weighing primary standards for volumetric solutions', 'Gravimetric determination of precipitate mass', 'Quantitative chemical percent yield calculations'],
    specifications: [
      { label: 'Readability', value: '0.0001 g (0.1 mg analytical precision)', isExample: true },
      { label: 'Capacity (Example)', value: '220 g maximum capacity', isExample: true },
      { label: 'Draft Shield', value: 'Three-door sliding glass draft chamber', isExample: true }
    ],
    operatingInstructions: ['Level instrument using bubble spirit indicator at rear.', 'Tare weighing boat, close draft doors, wait for stability asterisk before recording mass.'],
    safetyPrecautions: ['Never place chemical powders directly on stainless steel pan.', 'Brush off any stray powder immediately with camel hair brush.'],
    commonMistakes: ['Weighing warm objects (convection currents cause false low readings).', 'Leaving draft doors open while recording mass.'],
    relatedEquipmentIds: ['volumetric-flask', 'spatula'],
    standardMaterial: 'Electromagnetic load cell, stainless steel pan, glass enclosure',
    cleaningAndStorage: 'Clean with soft camel hair brush; cover with anti-static dust shroud.'
  },
  {
    id: 'top-loading-balance',
    name: 'Top-Loading Precision Balance',
    alternateNames: ['Bench Balance', 'Top-Pan Balance', 'Milligram Balance'],
    category: 'measurement',
    categoryLabel: 'Measurement & Analytics',
    tagline: 'General-purpose open-pan balance measuring up to several kilograms to 0.01 g',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="24" y="48" width="52" height="38" rx="5" stroke="#0891b2" stroke-width="3.5" fill="#ffffff"/><ellipse cx="50" cy="44" rx="20" ry="6" fill="#cbd5e1" stroke="#0891b2" stroke-width="2"/></svg>`,
    description: 'An open-pan digital balance with larger weighing capacity (e.g. 1 kg to 6 kg) and readability to 0.01 g or 0.1 g, used for preparative reagents and bulk solutions.',
    commonUses: ['Weighing bulk buffer salts and preparative reagents', 'Measuring large solid sample masses', 'General non-micro analytical weighing'],
    specifications: [
      { label: 'Readability (Example)', value: '0.01 g or 0.001 g', isExample: true },
      { label: 'Capacity (Example)', value: '1200 g capacity', isExample: true }
    ],
    operatingInstructions: ['Place container on pan and press "Tare" to zero.', 'Add chemical using spatula without overloading.'],
    safetyPrecautions: ['Avoid dropping heavy objects onto pan; shock loading destroys calibration sensors.'],
    commonMistakes: ['Using for analytical micro-titration primary standards requiring 0.1 mg precision.'],
    relatedEquipmentIds: ['electronic-balance', 'beaker', 'spatula'],
    standardMaterial: 'Strain gauge / electromagnetic sensor with stainless steel top pan',
    cleaningAndStorage: 'Wipe pan clean; keep on vibration-free bench.'
  },
  {
    id: 'thermometer',
    name: 'Laboratory Thermometer',
    alternateNames: ['Red Spirit Thermometer', 'Immersion Thermometer'],
    category: 'measurement',
    categoryLabel: 'Measurement & Analytics',
    tagline: 'Partial-immersion calibrated glass thermometer with non-toxic red spirit fluid',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="46" y="14" width="8" height="60" rx="4" stroke="#0891b2" stroke-width="3"/><circle cx="50" cy="80" r="10" stroke="#0891b2" stroke-width="3" fill="#f43f5e"/><rect x="48" y="42" width="4" height="32" fill="#f43f5e"/></svg>`,
    description: 'An annealed glass capillary tube containing colored petroleum spirit (non-toxic alternative to mercury) calibrated to measure solution temperatures.',
    commonUses: ['Monitoring exothermic and endothermic reaction heats', 'Measuring boiling points and distillation head temperatures', 'Calibrating constant-temperature water baths'],
    specifications: [
      { label: 'Range (Example)', value: '-10°C to +110°C (1.0°C graduations)', isExample: true },
      { label: 'Immersion Line', value: '76 mm partial immersion standard mark', isExample: true }
    ],
    operatingInstructions: ['Immerse bulb in liquid center without touching bottom or walls.', 'Wait 60 seconds for equilibrium before reading at eye level.'],
    safetyPrecautions: ['NEVER use a glass thermometer as a stirring rod; the bulb glass is thin and shatters.'],
    commonMistakes: ['Resting bulb on the hot bottom of a heated beaker.'],
    relatedEquipmentIds: ['beaker', 'round-bottom-flask', 'glass-rod'],
    standardMaterial: 'Capillary Glass with dyed hydrocarbon spirit',
    cleaningAndStorage: 'Rinse with distilled water; store vertically in padded protective case.'
  },
  {
    id: 'ph-meter',
    name: 'Digital pH Meter & Electrode',
    alternateNames: ['pH Meter', 'Glass Combination Electrode', 'pH Probe'],
    category: 'measurement',
    categoryLabel: 'Measurement & Analytics',
    tagline: 'Potentiometric voltmeter with glass electrode measuring hydrogen ion activity to 0.01 pH',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="40" width="40" height="48" rx="6" stroke="#0891b2" stroke-width="3" fill="#ffffff"/><path d="M50 14V36" stroke="#0891b2" stroke-width="4"/><circle cx="50" cy="14" r="5" fill="#06b6d4"/></svg>`,
    description: 'An electrochemical instrument consisting of a high-impedance voltmeter and a combination glass electrode that measures solution pH from 0.00 to 14.00.',
    commonUses: ['Measuring solution acidity/alkalinity in biochemical buffers', 'Potentiometric pH titrations', 'Quality control of water purity'],
    specifications: [
      { label: 'Range', value: '0.00 to 14.00 pH (Resolution ±0.01 pH)', isExample: true },
      { label: 'Calibration', value: 'Automatic 2-point or 3-point buffer calibration (pH 4.01, 7.00, 10.01)', isExample: true }
    ],
    operatingInstructions: ['Rinse electrode with deionized water and blot dry with lint-free tissue (do not rub).', 'Submerge bulb in buffer, calibrate, then measure test sample with continuous gentle stirring.'],
    safetyPrecautions: ['Electrode glass membrane must NEVER dry out; always store in 3M KCl storage solution.'],
    commonMistakes: ['Wiping glass bulb vigorously with tissues, creating electrostatic charges that drift readings.', 'Storing electrode in deionized pure water (leeches electrolyte).'],
    relatedEquipmentIds: ['beaker', 'conductivity-meter'],
    standardMaterial: 'Electrode Glass bulb with Ag/AgCl reference and plastic meter chassis',
    cleaningAndStorage: 'Store bulb submerged in 3M KCl electrode storage solution.'
  },
  {
    id: 'conductivity-meter',
    name: 'Electrical Conductivity Meter',
    alternateNames: ['EC Meter', 'Conductivity Probe', 'TDS Meter'],
    category: 'measurement',
    categoryLabel: 'Measurement & Analytics',
    tagline: 'Conductivity cell probe measuring electrolytic ion conduction in aqueous solutions',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="32" y="38" width="36" height="50" rx="5" stroke="#0891b2" stroke-width="3" fill="#ffffff"/><line x1="44" y1="14" x2="44" y2="38" stroke="#0891b2" stroke-width="3"/><line x1="56" y1="14" x2="56" y2="38" stroke="#0891b2" stroke-width="3"/></svg>`,
    description: 'Measures the electrical conductance of a solution via alternating current passed between two platinum electrodes, indicating total dissolved ion concentration.',
    commonUses: ['Verifying deionized water purity', 'Conductometric titrations', 'Salinity and total dissolved solids (TDS) environmental monitoring'],
    specifications: [
      { label: 'Measurement Range', value: '0.01 µS/cm to 200 mS/cm', isExample: true },
      { label: 'Cell Constant', value: 'k = 1.0 cm⁻¹ platinized electrodes', isExample: true }
    ],
    operatingInstructions: ['Calibrate with standard 0.01 M KCl reference solution.', 'Immerse probe ensuring no trapped air bubbles on electrode surfaces.'],
    safetyPrecautions: ['Do not scratch the delicate platinized black coating on electrode plates.'],
    commonMistakes: ['Allowing air bubbles to cling to the electrodes during measurement.'],
    relatedEquipmentIds: ['ph-meter', 'beaker'],
    standardMaterial: 'Platinized Platinum or Graphite electrodes in epoxy body',
    cleaningAndStorage: 'Rinse with pure deionized water; store dry or in deionized water as specified.'
  },
  {
    id: 'thiele-tube',
    name: 'Thiele Melting Point Tube',
    alternateNames: ['Thiele Tube', 'Capillary Melting Apparatus'],
    category: 'measurement',
    categoryLabel: 'Measurement & Analytics',
    tagline: 'Specialized glass tube with triangular side-arm for generating convection currents during melting point tests',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 16V84H58V16M58 40H74L66 70H58" stroke="#0891b2" stroke-width="3.5" fill="none"/></svg>`,
    description: 'A glass tube with an integrated triangular loop side-arm. When the side loop is heated, natural convection currents circulate warm oil smoothly around the central tube.',
    commonUses: ['Accurate determination of organic solid melting points', 'Boiling point determination of micro liquid samples', 'Verifying purity of synthesized recrystallized compounds'],
    specifications: [
      { label: 'Bath Fluid', value: 'Mineral oil / High-temp silicone oil (up to 250°C)', isExample: true }
    ],
    operatingInstructions: ['Fill with silicone oil to level above top side-arm junction.', 'Attach sample capillary to thermometer with rubber band positioned well above oil level.', 'Heat the triangular side-loop gently with a small micro-flame.'],
    safetyPrecautions: ['Hot oil splashes cause severe thermal burns. Ensure no water droplets enter oil bath (causes violent steam spattering).'],
    commonMistakes: ['Heating the main vertical tube instead of the side loop (breaks convection circulation).', 'Submerging the rubber band in hot oil.'],
    relatedEquipmentIds: ['thermometer', 'bunsen-burner'],
    standardMaterial: 'Thermal Shock Resistant Borosilicate Glass 3.3',
    cleaningAndStorage: 'Drain oil once cooled; degrease with hexane or dishwashing detergent.'
  },
  {
    id: 'pycnometer',
    name: 'Specific Gravity Bottle (Pycnometer)',
    alternateNames: ['Pycnometer', 'Density Bottle'],
    category: 'measurement',
    categoryLabel: 'Measurement & Analytics',
    tagline: 'Vessel with precision capillary stopper for determining liquid and solid density',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="62" r="24" stroke="#0891b2" stroke-width="3" fill="#ffffff"/><path d="M46 16H54V38H46V16Z" stroke="#0891b2" stroke-width="2.5"/><line x1="50" y1="16" x2="50" y2="44" stroke="#e11d48" stroke-width="1.5"/></svg>`,
    description: 'A glass flask equipped with a ground glass stopper having an exact capillary bore. Used to measure liquid density and specific gravity with high gravimetric precision.',
    commonUses: ['High-precision liquid density measurements', 'Specific gravity verification of petroleum products and solvents', 'Determining powder true particle density'],
    specifications: [
      { label: 'Calibrated Volume (Example)', value: '25.000 mL or 50.000 mL at 20°C (engraved on glass)', isExample: true }
    ],
    operatingInstructions: ['Weigh empty clean dry bottle with stopper.', 'Fill with liquid, insert capillary stopper allowing surplus liquid to expel via capillary, wipe exterior dry, and weigh.'],
    safetyPrecautions: ['Do not warm bottle with bare hands while wiping (thermal expansion forces liquid out capillary).'],
    commonMistakes: ['Touching with bare warm fingers after final wipe before weighing.'],
    relatedEquipmentIds: ['electronic-balance', 'thermometer'],
    standardMaterial: 'Borosilicate Glass 3.3',
    cleaningAndStorage: 'Clean meticulously; dry inside capillary with compressed air.'
  },
  {
    id: 'microscope',
    name: 'Compound Optical Microscope',
    alternateNames: ['Light Microscope', 'Biological Microscope'],
    category: 'optics',
    categoryLabel: 'Observation & Optics',
    tagline: 'Multi-lens optical instrument for high-magnification observation of crystals and micro-samples',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 16L56 16M49 16L58 40" stroke="#0891b2" stroke-width="4"/><circle cx="58" cy="56" r="8" stroke="#0891b2" stroke-width="3"/><path d="M38 52H68" stroke="#0f172a" stroke-width="4"/><path d="M42 42C34 46 30 56 30 68C30 78 36 84 46 84H68" stroke="#0891b2" stroke-width="4"/><path d="M26 88H74" stroke="#0f172a" stroke-width="5"/></svg>`,
    description: 'An optical instrument combining objective and eyepiece lenses to magnify specimens from 40x to 1000x for crystal structure, precipitation morphology, and biological observation.',
    commonUses: ['Examining crystallization morphology and habit', 'Microchemical crystal precipitation tests', 'Biological smear and culture inspection'],
    specifications: [
      { label: 'Magnification', value: '40x, 100x, 400x, 1000x (oil immersion)', isExample: true },
      { label: 'Condenser', value: 'Abbe Condenser NA 1.25 with iris diaphragm', isExample: true }
    ],
    operatingInstructions: ['Always start focusing with lowest power objective (4x).', 'Use fine focus knob only on higher magnifications.', 'Clean 100x oil objective immediately with lens paper.'],
    safetyPrecautions: ['Carry with two hands: one gripping arm, one supporting base.'],
    commonMistakes: ['Wiping delicate optical lenses with abrasive paper towels.'],
    relatedEquipmentIds: ['test-tube', 'beaker'],
    standardMaterial: 'Aluminum alloy chassis with precision optical glass',
    cleaningAndStorage: 'Clean optical surfaces with lens paper and isopropanol; keep dust shroud on.'
  },

  // =========================================================================
  // 7. HARDWARE, CLAMPING & SUPPORT TOOLS (9 items)
  // =========================================================================
  {
    id: 'retort-stand',
    name: 'Retort Support Stand',
    alternateNames: ['Ring Stand', 'Laboratory Stand', 'Base and Rod'],
    category: 'clamping',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Heavy cast iron rectangular base with vertical steel rod for mounting clamps and glassware',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="78" width="64" height="12" rx="2" fill="#0f172a"/><line x1="32" y1="78" x2="32" y2="12" stroke="#64748b" stroke-width="5"/></svg>`,
    description: 'A heavy rectangular cast-iron base fitted with a vertical zinc-plated steel rod. Serves as the central backbone to which clamps, rings, and glassware assemblies are anchored.',
    commonUses: ['Holding burettes for titrations', 'Supporting distillation and reflux glassware columns', 'Suspending thermometers and addition funnels'],
    specifications: [
      { label: 'Base Dimensions (Example)', value: '200 mm × 125 mm heavy cast iron (~1.5 kg)', isExample: true },
      { label: 'Rod Dimensions', value: '12 mm diameter × 600 mm / 750 mm length', isExample: true }
    ],
    operatingInstructions: ['Position clamp overhang directly over the heavy base plate to avoid tipping.'],
    safetyPrecautions: ['Always ensure center of gravity of attached glassware remains over base plate.'],
    commonMistakes: ['Clamping heavy apparatus facing away from the base, creating a top-heavy tip hazard.'],
    relatedEquipmentIds: ['burette-clamp', 'utility-clamp', 'bosshead', 'burette'],
    standardMaterial: 'Cast Iron Base with Zinc-Plated Stainless Steel Rod',
    cleaningAndStorage: 'Wipe rod clean; grease base threads lightly to prevent oxidation.'
  },
  {
    id: 'retort-ring-clamp',
    name: 'Retort Support Ring',
    alternateNames: ['Iron Ring Clamp', 'Extension Ring'],
    category: 'clamping',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Circular steel ring with integral bosshead for supporting wire gauzes, funnels, and mantles',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="62" cy="50" r="20" stroke="#0891b2" stroke-width="4" fill="none"/><line x1="42" y1="50" x2="22" y2="50" stroke="#64748b" stroke-width="4"/><rect x="16" y="44" width="12" height="12" rx="2" fill="#0f172a"/></svg>`,
    description: 'A circular steel ring attached to an extension rod or integral bosshead clamp. Clamped to retort stands to support separatory funnels or wire gauzes.',
    commonUses: ['Holding separatory funnels during liquid-liquid extractions', 'Supporting wire gauze and beakers during heating', 'Holding filtration funnels'],
    specifications: [
      { label: 'Ring Diameter (Example)', value: '75 mm / 100 mm / 125 mm internal diameter', isExample: true }
    ],
    operatingInstructions: ['Tighten bosshead thumbscrew securely onto vertical support rod.'],
    safetyPrecautions: ['Verify clamp thumbscrew is tight before placing heavy liquid-filled glassware on ring.'],
    commonMistakes: ['Using an oversized ring without gauze, letting beakers slip through.'],
    relatedEquipmentIds: ['retort-stand', 'separating-funnel', 'wire-gauze'],
    standardMaterial: 'Forged Cast Iron or Plated Mild Steel',
    cleaningAndStorage: 'Wipe clean; protect thumbscrews from chemical corrosion.'
  },
  {
    id: 'burette-clamp',
    name: 'Burette Clamp',
    alternateNames: ['Double Burette Clamp', 'Butterfly Clamp'],
    category: 'clamping',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Spring-loaded dual jaw clamp holding one or two burettes vertically without obscuring graduations',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="36" y="44" width="28" height="12" rx="3" fill="#0f172a"/><path d="M22 36C22 52 28 64 28 64M78 36C78 52 72 64 72 64" stroke="#0891b2" stroke-width="4"/></svg>`,
    description: 'A specialized clamp featuring spring-loaded rubber-lined jaws that securely grip burettes vertically without cracking fragile glass or obscuring volume markings.',
    commonUses: ['Holding burettes vertically during titrations', 'Holding two burettes simultaneously for acid/base comparative titrations'],
    specifications: [
      { label: 'Capacity', value: 'Holds single or dual burettes (10 mL to 100 mL)', isExample: true }
    ],
    operatingInstructions: ['Compress spring arms, insert burette barrel, and release to secure.'],
    safetyPrecautions: ['Ensure rubber grips are present; bare metal contact can crack glass under pressure.'],
    commonMistakes: ['Clamping burette over graduation numbers or too tightly over stopcock joint.'],
    relatedEquipmentIds: ['burette', 'retort-stand'],
    standardMaterial: 'Die-cast aluminum with chemical-resistant rubber gripping pads',
    cleaningAndStorage: 'Keep spring mechanism clean and lightly lubricated.'
  },
  {
    id: 'utility-clamp',
    name: 'Three-Finger Swivel Utility Clamp',
    alternateNames: ['3-Finger Clamp', 'Universal Clamp'],
    category: 'clamping',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Adjustable three-prong clamp with rubber-coated jaws for holding irregular glassware',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 50H50M50 50L76 34M50 50L78 50M50 50L76 66" stroke="#0891b2" stroke-width="4"/></svg>`,
    description: 'A versatile clamp featuring three independently adjustable rubber-coated fingers that swivel 360 degrees to grip distillation necks, condensers, and irregular vessels.',
    commonUses: ['Holding distillation condensers at variable angles', 'Securing multi-neck reaction flasks to retort stands', 'Suspending probes and filtration columns'],
    specifications: [
      { label: 'Grip Span (Example)', value: '0 to 85 mm opening capacity', isExample: true },
      { label: 'Jaw Coating', value: 'High-temperature red silicone or PVC sleeves', isExample: true }
    ],
    operatingInstructions: ['Turn thumbscrew to adjust jaw span around glassware neck.', 'Tighten until firm; do not overtighten glass joints.'],
    safetyPrecautions: ['Do not use vinyl-coated jaws above 100°C (vinyl melts onto hot glassware).'],
    commonMistakes: ['Overtightening screws against borosilicate glass joints, causing fracture.'],
    relatedEquipmentIds: ['retort-stand', 'bosshead', 'liebig-condenser'],
    standardMaterial: 'Die-cast zinc alloy with vinyl/silicone jaw sleeves',
    cleaningAndStorage: 'Replace worn rubber sleeves; inspect swivel screws.'
  },
  {
    id: 'bosshead',
    name: 'Laboratory Bosshead Clamp Holder',
    alternateNames: ['Clamp Holder', 'Right-Angle Clamp'],
    category: 'clamping',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Right-angle connector with dual thumbscrews joining utility clamps to support rods',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="34" y="34" width="32" height="32" rx="4" stroke="#0891b2" stroke-width="4" fill="#ffffff"/><circle cx="50" cy="50" r="6" fill="#0f172a"/></svg>`,
    description: 'A heavy metal block featuring two perpendicular V-grooves and heavy thumbscrews. Joins extension clamps and rings to vertical retort stand rods.',
    commonUses: ['Connecting utility clamps to retort stands at arbitrary heights and angles', 'Fixing ring clamps securely to laboratory scaffolding'],
    specifications: [
      { label: 'Rod Capacity', value: 'Accepts rods up to 16 mm diameter', isExample: true }
    ],
    operatingInstructions: ['Slide onto stand rod with V-groove facing rod, tighten lower screw, then insert clamp arm and tighten upper screw.'],
    safetyPrecautions: ['Always orient bosshead with the open side of the V-groove facing UPWARD so weight pushes into support.'],
    commonMistakes: ['Mounting bosshead upside down; weight can cause clamp to slip downward.'],
    relatedEquipmentIds: ['retort-stand', 'utility-clamp'],
    standardMaterial: 'Cast Alloy or Aluminum with solid brass/steel T-screws',
    cleaningAndStorage: 'Lubricate screw threads periodically to prevent thread seizure.'
  },
  {
    id: 'test-tube-rack',
    name: 'Test Tube Rack',
    alternateNames: ['Test Tube Stand', 'Drying Rack'],
    category: 'clamping',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Multi-tiered polypropylene or wooden rack for holding rows of test tubes upright',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="34" width="64" height="48" rx="4" stroke="#0891b2" stroke-width="3.5" fill="#ffffff"/><circle cx="32" cy="48" r="6" fill="#0891b2"/><circle cx="50" cy="48" r="6" fill="#0891b2"/><circle cx="68" cy="48" r="6" fill="#0891b2"/></svg>`,
    description: 'A multi-aperture rack with vertical pins and tiered holes designed to organize, store, and dry multiple test tubes simultaneously on the laboratory bench.',
    commonUses: ['Holding qualitative reaction test tube series', 'Air-drying clean washed test tubes inverted on drying pins', 'Organizing colorimetric comparison trials'],
    specifications: [
      { label: 'Hole Count (Example)', value: '6, 12, or 24 tube positions (for 16 mm to 25 mm tubes)', isExample: true },
      { label: 'Material', value: 'Autoclavable chemical-resistant polypropylene or hardwood', isExample: true }
    ],
    operatingInstructions: ['Place tubes upright during experiments; invert over drying pegs after washing.'],
    safetyPrecautions: ['Do not place red-hot boiling tubes into plastic racks.'],
    commonMistakes: ['Overloading rack with oversized tubes that stick or tip.'],
    relatedEquipmentIds: ['test-tube', 'boiling-tube', 'test-tube-holder'],
    standardMaterial: 'Molded Polypropylene or Hardwood',
    cleaningAndStorage: 'Wash with warm soapy water; polypropylene models are fully autoclavable at 121°C.'
  },
  {
    id: 'test-tube-holder',
    name: 'Wooden Test Tube Holder',
    alternateNames: ['Test Tube Clamp', 'Tube Tong'],
    category: 'clamping',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Spring-loaded wooden or wire tongs for securely holding test tubes while heating over flame',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 36L48 50L82 36M18 64L48 50L82 64" stroke="#0891b2" stroke-width="4"/></svg>`,
    description: 'A spring-action wooden clamp with extended jaws designed to hold test tubes securely without transferring heat to the analyst’s fingers during flame heating.',
    commonUses: ['Holding test tubes over Bunsen burner flames', 'Transporting hot test tubes from boiling water baths to racks'],
    specifications: [
      { label: 'Jaw Span', value: 'Accepts tubes from 12 mm to 25 mm diameter', isExample: true }
    ],
    operatingInstructions: ['Squeeze spring to open jaws, position around upper third of test tube, and release.'],
    safetyPrecautions: ['Do not clamp too close to bottom where direct flame can scorch the wooden jaws.'],
    commonMistakes: ['Clamping bottom of tube, exposing holder to flame and burning wood.'],
    relatedEquipmentIds: ['test-tube', 'bunsen-burner', 'boiling-tube'],
    standardMaterial: 'Natural Hardwood with steel spring wire',
    cleaningAndStorage: 'Store dry away from open sink water.'
  },
  {
    id: 'crucible-tongs',
    name: 'Crucible Tongs',
    alternateNames: ['Crucible Pincers', 'Ashing Tongs'],
    category: 'clamping',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Scissor-style tongs with serrated bowed tips designed for handling red-hot crucibles',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 24L50 50L76 24M24 76L50 50L76 76" stroke="#0891b2" stroke-width="3.5"/><circle cx="50" cy="50" r="3" fill="#0f172a"/></svg>`,
    description: 'Scissor-action stainless steel tongs with curved, serrated tips. Designed specifically for picking up and transferring hot crucibles, lids, and evaporating dishes.',
    commonUses: ['Placing and removing crucibles into 1000°C muffle furnaces', 'Lifting crucible lids to check ashing progress', 'Transferring hot vessels into desiccators'],
    specifications: [
      { label: 'Length (Example)', value: '200 mm or 250 mm length', isExample: true },
      { label: 'Jaws', value: 'Bowed tips with corrugated non-slip grip', isExample: true }
    ],
    operatingInstructions: ['Grip crucible rim firmly using the curved bow tips.', 'Warm tong tips in flame slightly before touching hot porcelain to avoid thermal shock.'],
    safetyPrecautions: ['Verify firm grip before lifting; dropping a glowing red crucible can cause severe fires and burns.'],
    commonMistakes: ['Touching cold metal tong tips to a glowing hot crucible, inducing thermal crack.'],
    relatedEquipmentIds: ['crucible', 'pipeclay-triangle', 'desiccator'],
    standardMaterial: 'High-Grade Stainless Steel',
    cleaningAndStorage: 'Wipe clean; keep hinge joint free of grit.'
  },
  {
    id: 'beaker-tongs',
    name: 'Silicone-Sleeved Beaker Tongs',
    alternateNames: ['Beaker Pincers', 'Flask Tongs'],
    category: 'clamping',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Wide curved scissor tongs with silicone rubber sleeves for carrying hot glass beakers',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 24L50 50L76 24M24 76L50 50L76 76" stroke="#0891b2" stroke-width="3.5"/><rect x="70" y="20" width="16" height="8" rx="2" fill="#f43f5e"/><rect x="70" y="72" width="16" height="8" rx="2" fill="#f43f5e"/></svg>`,
    description: 'Heavy-duty scissor tongs with wide curved jaws coated with heat-resistant silicone or rubber. Designed to wrap around the cylindrical perimeter of hot beakers.',
    commonUses: ['Safely lifting and carrying hot beakers from hot plates', 'Pouring hot solutions from beakers without thermal contact'],
    specifications: [
      { label: 'Capacity', value: 'Grips beakers from 100 mL to 1000 mL diameter', isExample: true },
      { label: 'Jaw Coating', value: 'High-temperature red silicone sleeves (up to 250°C)', isExample: true }
    ],
    operatingInstructions: ['Open jaws wide, encircle center body of beaker, and squeeze handles firmly while transporting.'],
    safetyPrecautions: ['Do not use over direct Bunsen burner flames (flame burns silicone rubber sleeves).'],
    commonMistakes: ['Gripping beaker only by upper rim rather than encircling body.'],
    relatedEquipmentIds: ['beaker', 'hot-plate-stirrer'],
    standardMaterial: 'Plated Steel with Vulcanized Silicone Sleeves',
    cleaningAndStorage: 'Replace worn sleeves; hang on tool rack.'
  },

  // =========================================================================
  // 8. SAMPLE HANDLING, TRANSFER & SAFETY (8 items)
  // =========================================================================
  {
    id: 'spatula',
    name: 'Chattaway Laboratory Spatula',
    alternateNames: ['Micro Spatula', 'Scoopula', 'Chemical Spoon'],
    category: 'general',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Stainless steel tool with flat blade and bent spoon end for transferring solid reagents',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 48L64 48L84 42L84 54L64 48" stroke="#0891b2" stroke-width="3" fill="#cbd5e1"/><rect x="14" y="44" width="24" height="8" rx="2" fill="#64748b"/></svg>`,
    description: 'A multi-purpose chemical transfer tool made of inert stainless steel. Features a flat blade on one end for scraping and a rounded scoop/bent spoon on the other for sampling powders.',
    commonUses: ['Transferring crystalline chemicals onto balance weighing boats', 'Scraping precipitates from filter papers', 'Sampling solid reagents from stock bottles'],
    specifications: [
      { label: 'Length (Example)', value: '150 mm / 200 mm length', isExample: true },
      { label: 'Blade Styles', value: 'Flat square end and bent rounded spoon end', isExample: true }
    ],
    operatingInstructions: ['Wipe clean with tissue between different reagents to avoid cross-contamination.'],
    safetyPrecautions: ['Never return excess unused chemical from a spatula back into the original reagent stock bottle.'],
    commonMistakes: ['Using a contaminated spatula, ruining entire reagent stock jars.'],
    relatedEquipmentIds: ['electronic-balance', 'watch-glass', 'weighing-boat'],
    standardMaterial: 'AISI 304 / 316 Acid-Resistant Stainless Steel',
    cleaningAndStorage: 'Wash with detergent and ethanol; wipe dry immediately to prevent spotting.'
  },
  {
    id: 'mortar-and-pestle',
    name: 'Mortar and Pestle',
    alternateNames: ['Agate Mortar', 'Porcelain Grinder'],
    category: 'general',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Heavy ceramic or agate bowl and club-shaped pestle for pulverizing solids into fine powder',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 46C22 70 34 82 50 82C66 82 78 70 78 46H22Z" stroke="#0891b2" stroke-width="4" fill="#f8fafc"/><path d="M46 16L54 48" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/></svg>`,
    description: 'A heavy porcelain or agate bowl (mortar) paired with a heavy club-shaped bat (pestle). Used to grind coarse chemical crystals and plant material into homogenous fine powders.',
    commonUses: ['Grinding coarse chemical crystals to accelerate dissolution rates', 'Preparing homogenous solid powder mixtures for solid-state reactions', 'Pulverizing biological samples for extraction'],
    specifications: [
      { label: 'Diameter (Example)', value: '100 mm / 130 mm bowl diameter', isExample: true },
      { label: 'Grinding Surface', value: 'Unglazed coarse interior bowl and pestle head', isExample: true }
    ],
    operatingInstructions: ['Grind using firm circular downward pressure.', 'Do not strike or hammer the mortar like an anvil.'],
    safetyPrecautions: ['NEVER grind strong oxidizers (e.g. KClO3, KMnO4) with sulfur or organic material (causes explosive detonation).'],
    commonMistakes: ['Pounding violently with pestle, cracking the porcelain bowl.'],
    relatedEquipmentIds: ['spatula', 'watch-glass'],
    standardMaterial: 'Heavy Glazed Porcelain with unglazed grinding surfaces (or Brazilian Agate)',
    cleaningAndStorage: 'Clean thoroughly with water and scouring powder; dry before storage.'
  },
  {
    id: 'glass-rod',
    name: 'Glass Stirring Rod with Rubber Policeman',
    alternateNames: ['Stirring Rod', 'Glass Policeman', 'Stir Rod'],
    category: 'general',
    categoryLabel: 'Separation & Distillation',
    tagline: 'Solid cylindrical borosilicate glass rod with fire-polished tips and flexible rubber scraper',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 84L70 16" stroke="#0891b2" stroke-width="6" stroke-linecap="round"/><circle cx="31" cy="82" r="3" fill="#0d9488"/></svg>`,
    description: 'A solid cylindrical borosilicate rod with fire-polished ends. Often fitted with a flexible rubber policeman paddle on one end for quantitative scraping of precipitates.',
    commonUses: ['Homogenizing chemical mixtures and dissolving solutes in beakers', 'Guiding smooth decanting of liquids into funnels without wall running', 'Transferring single drops to pH indicator test strips'],
    specifications: [
      { label: 'Dimensions (Example)', value: '6 mm diameter × 200 mm length', isExample: true },
      { label: 'Ends', value: 'Both ends smoothly fire-polished to prevent scratching glassware', isExample: true }
    ],
    operatingInstructions: ['Stir gently in circular patterns; avoid striking glass bottom.', 'Pour liquids down the rod into funnels to prevent splashing.'],
    safetyPrecautions: ['Discard chipped or fractured rods immediately; sharp glass edges cut skin easily.'],
    commonMistakes: ['Vigorously banging rod against beaker bottom, puncturing glassware.'],
    relatedEquipmentIds: ['beaker', 'funnel', 'conical-flask'],
    standardMaterial: 'Solid Borosilicate 3.3 Glass with natural gum rubber paddle',
    cleaningAndStorage: 'Rinse with solvent, wipe dry, store flat in benchtop organizers.'
  },
  {
    id: 'deflagrating-spoon',
    name: 'Deflagrating Combustion Spoon',
    alternateNames: ['Combustion Spoon', 'Gas Deflagration Spoon'],
    category: 'general',
    categoryLabel: 'Heating & Thermal Control',
    tagline: 'Long-handled metal spoon with heat shield for combusting phosphorus or sulfur in gas jars',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 14V76L64 76" stroke="#0891b2" stroke-width="3"/><rect x="36" y="32" width="28" height="6" rx="2" fill="#0f172a"/><circle cx="68" cy="76" r="6" fill="#f59e0b"/></svg>`,
    description: 'A small cup on an extended long metal shaft fitted with an adjustable circular heat shield collar. Used to lower burning substances into gas jars filled with oxygen or chlorine.',
    commonUses: ['Combustion of sulfur, phosphorus, or sodium in oxygen jars', 'Demonstrating vigorous oxidation and acid oxide gas generation'],
    specifications: [
      { label: 'Length (Example)', value: '300 mm or 400 mm long stainless steel / brass shaft', isExample: true }
    ],
    operatingInstructions: ['Place chemical in cup, ignite over burner, and lower through collar into gas jar.'],
    safetyPrecautions: ['Perform inside fume hood; toxic sulfur dioxide and phosphorus pentoxide fumes are produced.'],
    commonMistakes: ['Lowering burning sample too close to glass jar walls, cracking the gas jar.'],
    relatedEquipmentIds: ['pneumatic-trough', 'bunsen-burner', 'fume-hood'],
    standardMaterial: 'Stainless Steel or Plated Brass with ceramic protective disc',
    cleaningAndStorage: 'Clean slag out of cup after cooling with steel wool.'
  },
  {
    id: 'wash-bottle',
    name: 'LDPE Squeeze Wash Bottle',
    alternateNames: ['Wash Bottle', 'Dispensing Squeeze Bottle', 'Solvent Bottle'],
    category: 'general',
    categoryLabel: 'Support, Clamps & Hardware',
    tagline: 'Flexible low-density polyethylene bottle with fine directional jet nozzle for rinsing',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="32" y="34" width="36" height="52" rx="6" stroke="#0891b2" stroke-width="3.5" fill="#ffffff"/><path d="M50 34V16L72 16" stroke="#0891b2" stroke-width="3" fill="none"/></svg>`,
    description: 'A flexible squeeze bottle with an internal draw tube and fine directional jet nozzle. Used to direct a fine stream of solvent to rinse precipitates, burette walls, and glassware.',
    commonUses: ['Rinsing precipitates from beakers into filter funnels', 'Washing down droplets clinging to flask necks during titrations', 'Dispensing deionized water or acetone'],
    specifications: [
      { label: 'Volume (Example)', value: '500 mL capacity (Color-coded caps: Blue=Water, Red=Acetone)', isExample: true }
    ],
    operatingInstructions: ['Squeeze flexible body smoothly to generate continuous directional laminar jet.'],
    safetyPrecautions: ['Clearly label bottle contents. Never use unlabelled bottles for flammable solvents.'],
    commonMistakes: ['Mouth-blowing into nozzle or contaminating nozzle tip by touching beakers.'],
    relatedEquipmentIds: ['conical-flask', 'burette', 'funnel'],
    standardMaterial: 'Low-Density Polyethylene (LDPE) with Polypropylene closure',
    cleaningAndStorage: 'Keep dedicated to single solvent (e.g. DI water); store on reagent shelf.'
  },
  {
    id: 'safety-goggles',
    name: 'Chemical Splash Goggles (PPE)',
    alternateNames: ['Safety Goggles', 'Eye Protection Goggles', 'Lab Goggles'],
    category: 'safety',
    categoryLabel: 'Safety & PPE Equipment',
    tagline: 'ANSI Z87.1 / EN166 certified full-seal eye protection with indirect ventilation against chemical splashes',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="34" width="64" height="32" rx="10" stroke="#0891b2" stroke-width="4" fill="#ecfeff"/><circle cx="36" cy="50" r="10" stroke="#0891b2" stroke-width="2.5"/><circle cx="64" cy="50" r="10" stroke="#0891b2" stroke-width="2.5"/></svg>`,
    description: 'Personal protective eyewear designed to seal completely against the face with indirect ventilation ports. Protects against chemical splashes, flying glass shards, and aerosol vapors.',
    commonUses: ['Mandatory eye protection in all chemical laboratories', 'Protection during acid-base dilutions, heating, and vacuum work'],
    specifications: [
      { label: 'Certification', value: 'ANSI Z87.1+ / EN166 Class 3 (Liquid droplets/splashes)', isExample: true },
      { label: 'Lens', value: 'High-impact anti-fog polycarbonate with UV400 block', isExample: true }
    ],
    operatingInstructions: ['Adjust elastic strap for a snug facial seal before entering the active laboratory zone.'],
    safetyPrecautions: ['Regular prescription glasses are NOT a substitute for chemical splash goggles.'],
    commonMistakes: ['Wearing goggles on the forehead or neck instead of over the eyes.'],
    relatedEquipmentIds: ['fume-hood', 'eyewash-station'],
    standardMaterial: 'Soft PVC Frame with Polycarbonate Lens and Neoprene Strap',
    cleaningAndStorage: 'Clean with optical lens wipes; store in clean cubby.'
  },
  {
    id: 'fume-hood',
    name: 'Laboratory Chemical Fume Hood',
    alternateNames: ['Fume Cupboard', 'Exhaust Hood', 'Chemical Fume Hood'],
    category: 'safety',
    categoryLabel: 'Safety & PPE Equipment',
    tagline: 'Ventilated containment cabinet with sliding sash for safe handling of hazardous vapors and fumes',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="16" width="60" height="68" stroke="#0891b2" stroke-width="3.5" fill="#ffffff"/><rect x="24" y="20" width="52" height="32" fill="#22d3ee" fill-opacity="0.2"/><line x1="20" y1="52" x2="80" y2="52" stroke="#0f172a" stroke-width="4"/></svg>`,
    description: 'A large ventilated enclosure equipped with a movable transparent glass sash. Draws air inward through an exhaust blower to capture and expel toxic vapors, gases, and dusts.',
    commonUses: ['Manipulating toxic, noxious, volatile, or carcinogen reagents', 'Acid digestions and brominations', 'Vacuum distillations of smelly thiols and amines'],
    specifications: [
      { label: 'Face Velocity', value: '0.4 m/s to 0.5 m/s (80–100 FPM at working sash height)', isExample: true },
      { label: 'Sash Glass', value: 'Laminated tempered safety glass', isExample: true }
    ],
    operatingInstructions: ['Position sash at or below marked working arrow (approx. 30 cm height).', 'Work at least 15 cm (6 inches) inside the hood face to maintain containment.'],
    safetyPrecautions: ['Never stick your head inside the fume hood while reactions are running.'],
    commonMistakes: ['Cluttering hood with excess chemical bottles, disrupting airflow baffles.'],
    relatedEquipmentIds: ['safety-goggles', 'eyewash-station'],
    standardMaterial: 'Phenolic Resin Worktop with Stainless Steel or Polypropylene Liners',
    cleaningAndStorage: 'Wipe down work surface daily; check airflow monitor before use.'
  },
  {
    id: 'eyewash-station',
    name: 'Emergency Eyewash & Safety Shower',
    alternateNames: ['Eyewash Station', 'Drench Shower', 'Safety Station'],
    category: 'safety',
    categoryLabel: 'Safety & PPE Equipment',
    tagline: 'Emergency plumbing station delivering aerated tepid water to flush chemical ocular splashes',
    iconSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 14V36M40 36H60M36 46C36 40 44 36 50 36C56 36 64 40 64 46" stroke="#0891b2" stroke-width="3.5"/><circle cx="44" cy="48" r="3" fill="#10b981"/><circle cx="56" cy="48" r="3" fill="#10b981"/><path d="M30 78H70" stroke="#0f172a" stroke-width="4"/></svg>`,
    description: 'An emergency decontamination fixture providing a continuous flow of tepid aerated water to flush eyes and skin following corrosive chemical contact.',
    commonUses: ['Immediate first aid for ocular chemical splashes (acid, base, solvents)', 'Full-body emergency chemical drench flushing'],
    specifications: [
      { label: 'Standard', value: 'ANSI/ISEA Z358.1 compliant', isExample: true },
      { label: 'Flow Rate', value: 'Minimum 1.5 L/min for eyewash; 75 L/min for drench shower', isExample: true },
      { label: 'Duration', value: 'Minimum 15 minutes continuous hands-free operation', isExample: true }
    ],
    operatingInstructions: ['Push actuator paddle to initiate continuous flow.', 'Hold eyelids open with fingers and roll eyeballs in water stream for 15 full minutes.'],
    safetyPrecautions: ['Keep path to emergency eyewash completely clear of carts and obstructions.'],
    commonMistakes: ['Flushing for only 1–2 minutes; chemical burns require 15 full minutes of irrigation.'],
    relatedEquipmentIds: ['safety-goggles', 'fume-hood'],
    standardMaterial: 'Corrosion-Resistant Yellow Polyethylene Basin with Stainless Steel Piping',
    cleaningAndStorage: 'Flush and test weekly; record inspection on inspection tag.'
  }
];
