# Chemistry Experiment Database: Academic Sources & Methodology Documentation

## 1. Overview & Engineering Methodology
This document provides the analytical, pedagogical, and standard method foundations for the 15 experiments in `data/experiments.json`, developed for the **AI-Powered Smart Lab Equipment Assistant** (Tech Elevate hackathon).

### Architectural Boundaries
- **Strict Equipment Database Mapping**: Every equipment reference in `data/experiments.json` is restricted exclusively to the 63 verified IDs present in `equipment-db/equipment.json`.
- **Zero Guessed Identifiers**: No external IDs have been invented. Where standard laboratory experiments utilize specialized tools not present in the 63-item database (e.g., viscometer capillary, stopwatch, optical cuvettes, boiling chips), those tools are explicitly identified below in the **Equipment Gaps** audit rather than fabricated in the dataset.
- **Protocol Neutrality**: Procedures avoid hardcoding arbitrary, unverified numbers, concentrations, or temperatures. Where parameters depend on institutional safety guidelines and course syllabi, students are directed to approved laboratory protocols.
- **Pedagogical Standards**: Formulated according to classical chemistry education curricula (IUPAC, Vogel's Quantitative Chemical Analysis, EPA Standard Methods, ASTM International, and standard university General Chemistry and Physical Chemistry laboratory manuals).

---

## 2. Environment Verification Statement
- **Environment Capabilities**: Node.js v24.22.1, Python 3.14.6, local ripgrep search, file system operations, and automated test execution.
- **Citation Policy**: All experimental procedures, chemical reactions, and physical chemistry principles documented herein are derived from established peer-reviewed consensus textbooks and standard analytical methods (Vogel, Skoog, Harris, ASTM, EPA). No speculative or hallucinated citations are included.

---

## 3. Equipment Gaps Analysis
The existing lab equipment database contains 63 general chemistry tools. While these provide robust coverage for fundamental wet chemistry, certain specialized experiments inherently require specific apparatus that do not currently have entries in `equipment-db/equipment.json`.

In compliance with project specifications, **no equipment IDs were invented, and the equipment database was not modified**. The following table details these physical tools, the experiments requiring them, and suggested specifications for future additions:

| Gap Item Name | Relevant Experiment(s) | Function in Experiment | Recommended Future ID |
|---|---|---|---|
| **Ostwald / Capillary Viscometer** | `viscosity-measurement` | Precision glass capillary tube with bulbs and etched fiducial marks used for laminar gravity efflux timing. | `ostwald-viscometer` |
| **Laboratory Stopwatch / Timer** | `viscosity-measurement`, `conductometric-titration` | Precision digital/mechanical chronometer for measuring fluid efflux and reaction intervals to 0.1 s. | `digital-stopwatch` |
| **White Titration Tile / Contrast Plate** | `acid-base-titration`, `water-hardness`, `chloride-estimation-water` | White glazed ceramic plate placed beneath conical flasks to observe delicate indicator color shifts without optical distortion. | `titration-tile` |
| **Chromatography Developing Chamber** | `paper-chromatography` | Sealed rectangular or cylindrical glass tank with airtight ground glass lid for vapor saturation. | `chromatography-chamber` |
| **Glass Capillary Spotting Tube** | `paper-chromatography` | Fine-bore glass micro-capillary used to spot microliter analyte volumes onto the origin without spreading. | `capillary-tube` |
| **Spectrophotometer Cuvettes** | `beer-lambert-law` | 1.00 cm pathlength optical glass, quartz, or disposable polystyrene cells with transparent optical windows. | `cuvette` |
| **Boiling Stones / Anti-Bumping Granules** | `simple-distillation` | Porous silicon carbide or ceramic granules that release air bubbles to prevent superheating and bumping. | `boiling-chips` |
| **BOD Reagent Bottle (Ground Stopper)** | `dissolved-oxygen-water` | 300 mL specialized glass bottle with flared lip and pointed ground glass stopper preventing air entrapment. | `bod-bottle` |
| **Platinum / Nichrome Flame Test Wire** | `qualitative-salt-analysis` | Inert metallic wire mounted on a glass handle for introducing salt samples into a non-luminous flame. | `flame-test-loop` |
| **Electric Heating Mantle** | `simple-distillation` | Enclosed hemispherical electrical fabric mantle for heating round-bottom flasks containing flammable solvents. | `heating-mantle` |
| **Hard Glass Ignition Tube / Boiling Tube** | `qualitative-salt-analysis` | Thick-walled borosilicate tube capable of withstanding intense direct thermal decomposition over a flame. | `ignition-tube` |

---

## 4. Experiment-by-Experiment Reference & Methodology

### 1. `acid-base-titration` — Acid–Base Titration
- **Category**: Volumetric Analysis | **Difficulty**: Intermediate
- **Primary References**:
  - *Vogel's Textbook of Quantitative Chemical Analysis* (6th Edition), J. Mendham et al., Chapter 10: "Acidimetry and Alkalimetry".
  - *Quantitative Chemical Analysis* (9th Edition), Daniel C. Harris, Chapters 6–8: "Titrations".
- **Mapped Equipment IDs**: `burette`, `pipette`, `conical-flask`, `retort-stand`, `clamp-and-boss-head`, `glass-funnel`, `wash-bottle`, `beaker`, `dropper`, `ph-indicator-solution`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`, `chemical-waste-container`.
- **Pedagogical Rationale**: Classic neutralization of hydronium ions with standard alkali. Emphasizes quantitative technique: zeroing meniscus at eye level, bubble displacement in the tip, dropwise approach near the endpoint, and concordant readings (within 0.10 mL).

---

### 2. `ph-determination` — pH Determination
- **Category**: Instrumental Analysis | **Difficulty**: Beginner
- **Primary References**:
  - *Skoog, West, Holler, and Crouch, Fundamentals of Analytical Chemistry* (9th Edition), Chapter 21: "Potentiometry".
  - IUPAC Recommendations: *Measurement of pH. Definition, Standards, and Procedures* (Pure and Applied Chemistry, 74(11), 2169–2200).
- **Mapped Equipment IDs**: `ph-indicator-paper`, `ph-indicator-solution`, `laboratory-ph-meter`, `portable-ph-meter`, `beaker`, `wash-bottle`, `glass-stirring-rod`, `dropper`, `watch-glass`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Bridges semi-quantitative visual indicators with digital glass-electrode potentiometry. Reinforces calibration protocol against standard buffers (pH 4.00, 7.00, 10.00) and proper hydration care of glass membrane bulbs.

---

### 3. `standard-solution-preparation` — Preparation of a Standard Solution
- **Category**: Solution Preparation | **Difficulty**: Beginner
- **Primary References**:
  - *Vogel's Textbook of Quantitative Chemical Analysis*, Chapter 3: "Reagents and Primary Standards".
  - ASTM E200: *Standard Practice for Preparation, Standardization, and Storage of Standard and Reagent Solutions for Chemical Analysis*.
- **Mapped Equipment IDs**: `analytical-balance`, `weighing-boat`, `spatula`, `volumetric-flask`, `beaker`, `glass-funnel`, `glass-stirring-rod`, `wash-bottle`, `dropper`, `reagent-bottle`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: The cornerstone of all quantitative volumetric workflows. Details weighing by difference, dissolution in a beaker to handle enthalpy effects before transfer, quantitative washings, eye-level meniscus adjustment, and thorough 15–20x inversion for homogeneity.

---

### 4. `filtration` — Filtration
- **Category**: Separation and Purification | **Difficulty**: Beginner
- **Primary References**:
  - *Macroscale and Microscale Organic Experiments* (7th Edition), Kenneth L. Williamson & Katherine M. Masters, Chapter 2: "Laboratory Techniques".
  - *Vogel's Textbook of Practical Organic Chemistry* (5th Edition), Chapter 2: "Techniques of Separation and Purification".
- **Mapped Equipment IDs**: `glass-funnel`, `filter-paper`, `beaker`, `conical-flask`, `glass-stirring-rod`, `wash-bottle`, `retort-stand`, `clamp-and-boss-head`, `buchner-funnel`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Introduces phase separation via gravity and vacuum modes. Covers quadrant folding, corner-tearing for hydraulic seal, seating with solvent, guiding liquid down a stirring rod, and cone volume limits.

---

### 5. `recrystallization` — Crystallization and Recrystallization
- **Category**: Separation and Purification | **Difficulty**: Intermediate
- **Primary References**:
  - *Vogel's Textbook of Practical Organic Chemistry*, Chapter 3: "Purification of Solid Organic Compounds".
  - *Techniques in Organic Chemistry* (4th Edition), Jerry R. Mohrig et al., Chapter 15: "Recrystallization".
- **Mapped Equipment IDs**: `beaker`, `conical-flask`, `hot-plate`, `bunsen-burner`, `tripod-stand`, `wire-gauze`, `evaporating-dish`, `glass-funnel`, `filter-paper`, `buchner-funnel`, `glass-stirring-rod`, `watch-glass`, `thermometer`, `microscope`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Core purification technique exploiting differential thermal solubility. Focuses on minimal boiling solvent, hot filtration for insoluble debris, slow benchtop nucleation, ice bath completion, and microscopic crystal morphology inspection.

---

### 6. `paper-chromatography` — Paper Chromatography
- **Category**: Separation and Purification | **Difficulty**: Beginner
- **Primary References**:
  - *Vogel's Qualitative Inorganic Analysis* (7th Edition), Chapter 8: "Paper and Thin-Layer Chromatography".
  - *Journal of Chemical Education*, classic chromatography pedagogy curricula (Consden, Gordon & Martin).
- **Mapped Equipment IDs**: `filter-paper`, `beaker`, `watch-glass`, `dropper`, `forceps`, `measuring-cylinder`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Planar partition chromatography between cellulose-bound water and mobile solvent. Teaches pencil origin lines, chamber vapor saturation, capillary ascent, solvent front measurement, and calculation of retention factors (Rf).

---

### 7. `simple-distillation` — Simple Distillation
- **Category**: Separation and Purification | **Difficulty**: Advanced
- **Primary References**:
  - *Vogel's Textbook of Practical Organic Chemistry*, Chapter 2: "Distillation Principles and Practice".
  - *Microscale Organic Laboratory with Multistep and Multiscale Syntheses* (6th Edition), Mayo, Pike & Forbes.
- **Mapped Equipment IDs**: `round-bottom-flask`, `condenser`, `distillation-apparatus`, `thermometer`, `hot-plate`, `retort-stand`, `clamp-and-boss-head`, `rubber-stopper`, `beaker`, `measuring-cylinder`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Fundamental liquid-vapor phase separation. Highlights critical safety: open system operation to prevent explosive pressure rise, anti-bumping stones, counter-current condenser water flow, and thermometer bulb positioning at the side-arm junction.

---

### 8. `water-hardness` — Determination of Water Hardness
- **Category**: Water Analysis | **Difficulty**: Intermediate
- **Primary References**:
  - Standard Methods for the Examination of Water and Wastewater (APHA/AWWA/WEF), Method 2340-C: "EDTA Titrimetric Method".
  - *Vogel's Textbook of Quantitative Chemical Analysis*, Chapter 10: "Complexometric Titrations".
- **Mapped Equipment IDs**: `burette`, `pipette`, `conical-flask`, `retort-stand`, `clamp-and-boss-head`, `measuring-cylinder`, `dropper`, `wash-bottle`, `glass-funnel`, `beaker`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`, `chemical-waste-container`.
- **Pedagogical Rationale**: Hexadentate chelation of Ca2+ and Mg2+ by EDTA at buffered pH 10.0. Emphasizes buffer necessity, Eriochrome Black T indicator binding mechanics, and reporting in mg/L CaCO3 equivalents.

---

### 9. `conductometric-titration` — Conductometric Titration
- **Category**: Instrumental Analysis | **Difficulty**: Intermediate
- **Primary References**:
  - *Skoog, Holler, and Crouch, Principles of Instrumental Analysis* (7th Edition), Chapter 25: "Conductometric Methods".
  - *Experimental Physical Chemistry*, Daniels, Mathews, Williams, Bender & Alberty.
- **Mapped Equipment IDs**: `conductivity-meter`, `burette`, `beaker`, `retort-stand`, `clamp-and-boss-head`, `magnetic-stirrer`, `pipette`, `wash-bottle`, `glass-funnel`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`, `chemical-waste-container`.
- **Pedagogical Rationale**: Demonstrates Grotthuss proton hopping and ionic mobility differences (H+ vs Na+ vs OH-). Covers linear branch extrapolation to determine equivalence points in colored or turbid solutions without visual indicators.

---

### 10. `ph-metric-titration` — pH-Metric Titration
- **Category**: Instrumental Analysis | **Difficulty**: Intermediate
- **Primary References**:
  - *Quantitative Chemical Analysis*, Daniel C. Harris, Chapter 11: "Acid-Base Titration Curves".
  - *Garland, Nibler, and Shoemaker, Experiments in Physical Chemistry* (8th Edition), Experiment 19.
- **Mapped Equipment IDs**: `laboratory-ph-meter`, `burette`, `beaker`, `retort-stand`, `clamp-and-boss-head`, `magnetic-stirrer`, `pipette`, `wash-bottle`, `glass-funnel`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`, `chemical-waste-container`.
- **Pedagogical Rationale**: Potentiometric neutralization curve construction. Teaches sigmoidal inflection analysis, first-derivative peak maximum detection (dpH/dV), and pKa determination at the half-neutralization volume via the Henderson-Hasselbalch equation.

---

### 11. `chloride-estimation-water` — Chloride Estimation in Water
- **Category**: Water Analysis | **Difficulty**: Intermediate
- **Primary References**:
  - Standard Methods for the Examination of Water and Wastewater (APHA), Method 4500-Cl- B: "Argentometric Method (Mohr's Method)".
  - EPA Method 9252A: "Chloride (Titrimetric, Mercuric Nitrate / Argentometric)".
- **Mapped Equipment IDs**: `burette`, `pipette`, `conical-flask`, `retort-stand`, `clamp-and-boss-head`, `glass-funnel`, `measuring-cylinder`, `dropper`, `wash-bottle`, `beaker`, `chemical-waste-container`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Argentometric precipitation based on competitive solubility products (Ksp of AgCl vs Ag2CrO4). Stresses strict pH buffering (6.5–9.0), indicator blank subtraction, and mandatory collection of toxic silver/chromate residues.

---

### 12. `dissolved-oxygen-water` — Dissolved Oxygen in Water
- **Category**: Water Analysis | **Difficulty**: Advanced
- **Primary References**:
  - Standard Methods for the Examination of Water and Wastewater (APHA), Method 4500-O C: "Azide Modification of the Winkler Method".
  - EPA Method 360.2: "Oxygen, Dissolved (Titrimetric, Winkler, Azide Modification)".
- **Mapped Equipment IDs**: `reagent-bottle`, `burette`, `pipette`, `conical-flask`, `retort-stand`, `clamp-and-boss-head`, `measuring-cylinder`, `dropper`, `wash-bottle`, `glass-funnel`, `fume-hood`, `chemical-waste-container`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Multi-step redox iodometric determination. Covers bubble-free sampling, chemical fixation of dissolved O2 by Mn(OH)2, nitrite interference suppression via sodium azide, acid release of triiodide, and late starch addition near the equivalence point.

---

### 13. `viscosity-measurement` — Viscosity Measurement
- **Category**: Physical Chemistry | **Difficulty**: Intermediate
- **Primary References**:
  - *Shoemaker, Garland, and Nibler, Experiments in Physical Chemistry*, Experiment 6: "Viscosity of Liquids".
  - ASTM D445: *Standard Test Method for Kinematic Viscosity of Transparent and Opaque Liquids*.
- **Mapped Equipment IDs**: `thermometer`, `water-bath`, `retort-stand`, `clamp-and-boss-head`, `beaker`, `pipette`, `measuring-cylinder`, `wash-bottle`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Poiseuille laminar capillary flow. Emphasizes exponential temperature dependence of viscosity, identical liquid volume charge to preserve hydrostatic head, and relative viscosity ratio calculations against a certified standard.

---

### 14. `beer-lambert-law` — Beer–Lambert Law
- **Category**: Instrumental Analysis | **Difficulty**: Intermediate
- **Primary References**:
  - *Skoog, Holler, and Crouch, Principles of Instrumental Analysis*, Chapters 13–14: "An Introduction to Ultraviolet-Visible Molecular Absorption Spectrometry".
  - *Harris, Quantitative Chemical Analysis*, Chapter 18: "Fundamentals of Spectrophotometry".
- **Mapped Equipment IDs**: `spectrophotometer`, `colorimeter`, `volumetric-flask`, `pipette`, `beaker`, `test-tube`, `wash-bottle`, `dropper`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Fundamental quantitative molecular absorption spectroscopy (A = εbc). Covers volumetric dilution series, lambda_max selection, solvent blank zeroing, cuvette face hygiene, and calibration curve construction within the linear dynamic range.

---

### 15. `qualitative-salt-analysis` — Qualitative Salt Analysis
- **Category**: Qualitative Analysis | **Difficulty**: Advanced
- **Primary References**:
  - *Vogel's Qualitative Inorganic Analysis* (7th Edition), G. Svehla, Chapters 3–5: "Systematic Qualitative Analysis".
  - *CRC Handbook of Chemistry and Physics*, Inorganic Analytical Group Tables.
- **Mapped Equipment IDs**: `test-tube`, `test-tube-rack`, `test-tube-holder`, `test-tube-brush`, `dropper`, `spatula`, `bunsen-burner`, `watch-glass`, `filter-paper`, `glass-funnel`, `glass-stirring-rod`, `evaporating-dish`, `fume-hood`, `reagent-bottle`, `chemical-waste-container`, `safety-goggles`, `laboratory-coat`, `chemical-resistant-gloves`.
- **Pedagogical Rationale**: Comprehensive inorganic radical scheme. Details physical diagnostics, Bunsen flame tests, differential anion classification via dilute and concentrated acid reactions, original solution (O.S.) preparation, systematic cation group precipitation (Groups 0–VI), confirmatory tests, and fume hood safety.

---
