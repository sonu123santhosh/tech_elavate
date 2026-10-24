# -*- coding: utf-8 -*-
"""
Batch 2 Items 31-40:
31. separating-funnel
32. buchner-funnel
33. round-bottom-flask
34. condenser
35. distillation-apparatus
36. crucible
37. clay-triangle
38. water-bath
39. magnetic-stirrer
40. desiccator
"""

ITEMS_31_TO_40 = [
    # 31. Separating Funnel
    {
        "id": "separating-funnel",
        "pdfNumber": 31,
        "pdfName": "Separating Funnel",
        "pdfMainUse": "Separating immiscible liquids",
        "pdfGroup": "Heating, handling and separation",
        "name": "Separating Funnel",
        "category": "Separation Equipment",
        "purpose": "Separates immiscible liquid layers based on density differences during liquid-liquid extractions.",
        "image": {
            "src": "assets/images/equipment/separating-funnel.svg",
            "alt": "Pear-shaped glass separating funnel with PTFE stopcock valve, ground glass stopper, and delivery stem",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/separating-funnel.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A pear-shaped or conical borosilicate glass vessel fitted with a ground-glass stopper at the top and a precision stopcock valve above a narrow drainage stem at the bottom. The fundamental tool for liquid-liquid extraction, partitioning chemical solutes between immiscible aqueous and organic solvent phases.",
        "alternativeNames": ["Separatory funnel", "Sep funnel", "Extraction funnel"],
        "commonUses": [
            "Extracting organic reaction products from aqueous mixtures into organic solvents (e.g. diethyl ether, ethyl acetate)",
            "Washing organic extracts with brine, sodium bicarbonate, or dilute acid to remove impurities",
            "Separating immiscible aqueous and organic phases cleanly by gravity draining",
            "Dropping liquid reagents slowly into closed reaction flasks (when used as a dropping funnel)"
        ],
        "types": [
            "Pear-shaped separating funnel (narrow tapered bottom maximizes precision when draining phase interface)",
            "Cylindrical separating funnel (graduated barrel for measuring added volumes)",
            "Pressure-equalizing dropping funnel (features side vapor bypass tube for additions under inert gas)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "PTFE (stopcock plug)", "Polyethylene / ground-glass stopper"],
            "capacity": {
                "value": "250 to 500",
                "unit": "mL",
                "notes": "250 mL and 500 mL are standard bench sizes; capacities range from 50 mL to 2000 mL."
            },
            "dimensions": "Overall length ~320 mm, Max bulb diameter ~85 mm, Stem length ~70 mm (250 mL size)",
            "mainParts": ["Ground-glass or plastic stopper", "Pear-shaped bulb reservoir", "PTFE stopcock valve", "Narrow drainage stem"],
            "partsAndFunctions": [
                {
                    "partName": "Ground-glass or plastic stopper",
                    "function": "Seals top opening during vigorous shaking and inversion",
                    "handlingNotes": "Hold firmly seated with index finger during shaking; remove before draining."
                },
                {
                    "partName": "Pear-shaped bulb reservoir",
                    "function": "Allows large contact surface during shaking and narrows at base to sharpen meniscus visibility",
                    "handlingNotes": "Support in a padded iron ring."
                },
                {
                    "partName": "PTFE stopcock valve",
                    "function": "Regulates draining of lower dense liquid phase and vents internal gas pressure during shaking",
                    "handlingNotes": "Invert funnel and point stem into fume hood while venting."
                },
                {
                    "partName": "Narrow drainage stem",
                    "function": "Transfers drained lower phase cleanly into collection flask without splashing",
                    "handlingNotes": "Touch tip against receiver wall to collect final drops."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring phase separation apparatus (some cylindrical versions have approximate volume markings)."
            },
            "limitations": [
                "Shaking generates dangerous internal vapor pressure with volatile solvents (ether, DCM) if not vented frequently",
                "Heavy when full; easily topples if supported on an unpadded or oversized ring",
                "Emulsions can form between organic and aqueous layers, slowing phase separation"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect stopcock and stopper for tight liquid seal using a small volume of water",
                "Place separating funnel securely in an iron support ring on a sturdy retort stand",
                "Ensure stopcock is CLOSED before pouring in any liquid"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Loading Phases",
                    "instruction": "Pour aqueous mixture and organic extraction solvent into the funnel using a glass funnel, keeping total volume below two-thirds capacity."
                },
                {
                    "step": 2,
                    "title": "Initial Venting",
                    "instruction": "Insert the stopper firmly. Invert the funnel once while holding the stopper tightly, point the stem upward into the back of the fume hood, and immediately open the stopcock to vent initial vapor pressure."
                },
                {
                    "step": 3,
                    "title": "Shaking and Venting",
                    "instruction": "Close stopcock and shake smoothly for 3 to 5 seconds. Invert and vent through the stopcock. Repeat shaking and venting 4-5 times until pressure no longer builds."
                },
                {
                    "step": 4,
                    "title": "Phase Separation and Draining",
                    "instruction": "Return funnel upright to the support ring, REMOVE THE STOPPER, and wait for phases to separate cleanly. Slowly open stopcock to drain the lower phase into an Erlenmeyer flask, closing stopcock precisely as interface reaches the bore."
                }
            ],
            "handlingTips": [
                "ALWAYS vent the funnel immediately upon the very first inversion; volatile solvent vapors build up rapidly",
                "NEVER forget to remove the top stopper before opening the stopcock to drain; leaving the stopper in creates a vacuum that halts flow"
            ],
            "shutdown": [
                "Pour the top organic phase out through the TOP mouth of the funnel into a separate flask (never drain through stopcock)",
                "Rinse funnel with solvent, wash with detergent, rinse with DI water, and store upright on a stand with stopcock open",
                "Separate stopper to prevent glass seizure"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Fume hood ventilation"],
            "hazards": ["Violent stopper ejection from unvented vapor pressure", "Corrosive chemical spraying during venting", "Glass breakage spills"],
            "warnings": [
                "ALWAYS point the stem tip away from yourself, lab partners, and open flames when opening the stopcock to vent",
                "Vent every 3-5 seconds when working with volatile solvents like diethyl ether or dichloromethane"
            ],
            "actionsToAvoid": [
                "Do not attempt to drain liquid with the top stopper still inserted in the neck",
                "Do not drain the upper layer through the bottom stopcock (contaminates with lower layer residue)"
            ],
            "emergencyGuidance": [
                "If pressurized solvent sprays into eyes or face, immediately flush at eyewash station for 15 minutes",
                "If an organic solvent spill occurs, extinguish nearby ignition sources and deploy chemical absorbent pads"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Rinse residual organic solvent into waste receptacle with acetone or ethanol",
                "Wash with warm water and laboratory glassware detergent using a soft bottle brush",
                "Rinse four times with tap water, finish with deionized water, and allow to air dry inverted"
            ],
            "storageInstructions": [
                "Store mounted upright in a support ring or in dedicated padded glassware cabinets",
                "Insert a strip of paper between ground-glass stopper and socket; loosen PTFE stopcock nut to prevent binding"
            ],
            "maintenanceChecks": [
                "Inspect PTFE stopcock plug for scoring, wear, or loose retaining nuts",
                "Check ground-glass top neck for chips that prevent airtight stopper sealing"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid refuses to drain when the stopcock is opened",
                    "possibleCauses": ["The top stopper was left inserted in the neck, creating an internal partial vacuum"],
                    "solution": ["Simply remove the top stopper from the neck; atmospheric pressure will restore flow immediately"],
                    "prevention": ["Always remove the top stopper the moment the funnel is returned to the support ring"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "A cloudy, milky emulsion forms between the two layers that will not separate",
                    "possibleCauses": ["Vigorous shaking emulsified immiscible droplets; presence of colloidal particulate"],
                    "solution": ["Add a few milliliters of saturated brine (NaCl solution), swirl gently, or filter through a coarse pad"],
                    "prevention": ["Swirl gently rather than violently shaking when working with emulsion-prone mixtures"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Liquid leaks from the stopcock during standing",
                    "possibleCauses": ["PTFE tension nut is loose, or grit is trapped in the valve barrel"],
                    "solution": ["Tighten the stopcock retaining nut a quarter turn; if grit is present, drain, disassemble, and clean"],
                    "prevention": ["Test stopcock with water before loading valuable reaction mixtures"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Failing to vent the separating funnel during shaking",
                    "whyItMatters": "Vapor pressure forces the glass stopper to blast out like a bullet, spraying flammable, corrosive solvents into eyes and face",
                    "howToAvoid": "Invert and vent through the stopcock within 2 seconds of the first shake, and repeat every few seconds"
                },
                {
                    "mistake": "Draining the upper organic layer out through the bottom stopcock",
                    "whyItMatters": "The upper layer picks up residual droplets of the dirty lower aqueous phase clinging to the stopcock bore and stem",
                    "howToAvoid": "Drain lower layer out through the stopcock; pour the upper layer out through the top neck"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "conical-flask",
                "relationship": "complementary",
                "reason": "Conical flasks receive the separated lower and upper phases drained from the separating funnel.",
                "difference": "The separating funnel performs the phase separation; the conical flask collects and stores the fractions."
            },
            {
                "equipmentId": "retort-stand",
                "relationship": "complementary",
                "reason": "A retort stand fitted with an iron ring supports the separating funnel hands-free during phase settling.",
                "difference": "The stand provides structural support; the separating funnel contains the two-phase mixture."
            },
            {
                "equipmentId": "clamp-and-boss-head",
                "relationship": "complementary",
                "reason": "Used to clamp the upper neck of the separating funnel to prevent tipping during draining.",
                "difference": "The clamp stabilizes the apparatus; the separating funnel performs the extraction."
            }
        ],
        "metadata": {
            "difficultyLevel": "Intermediate",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ISO 4800 - Laboratory glassware: Separating funnels and dropping funnels",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Funnel dimensions, stopcock specifications, stem dimensions"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Liquid-liquid extraction protocols, venting safety, emulsion breaking"]
                }
            ]
        }
    },

    # 32. Büchner Funnel
    {
        "id": "buchner-funnel",
        "pdfNumber": 32,
        "pdfName": "Büchner Funnel",
        "pdfMainUse": "Vacuum filtration",
        "pdfGroup": "Heating, handling and separation",
        "name": "Büchner Funnel",
        "category": "Separation Equipment",
        "purpose": "Collects solid precipitates and crystals rapidly using vacuum-assisted filtration.",
        "image": {
            "src": "assets/images/equipment/buchner-funnel.svg",
            "alt": "Glazed white porcelain cylindrical Büchner funnel with perforated flat plate and drainage stem",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/buchner-funnel.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A cylindrical porcelain, polypropylene, or glass funnel containing an integral flat, perforated plate that supports a circular sheet of filter paper. Connected to a heavy-walled filter flask under vacuum (aspirator or pump), it pulls liquids through rapidly, leaving a dry crystal cake.",
        "alternativeNames": ["Buchner funnel", "Vacuum filtration funnel", "Suction funnel", "Hirsch funnel (smaller conical variant)"],
        "commonUses": [
            "Rapid filtration of crystallized organic compounds and synthetic precipitates",
            "Drying solid crystal cakes by pulling ambient air through the cake under vacuum",
            "Washing recrystallized products with ice-cold solvents",
            "Collecting gravimetric precipitates quickly without slow gravity drainage"
        ],
        "types": [
            "Glazed porcelain Büchner funnel (classic heavy laboratory standard; chemically inert)",
            "Polypropylene 2-piece Büchner funnel (unbreakable, disassembles for thorough cleaning)",
            "Fritted glass Büchner funnel (features porous sintered glass disc requiring no paper)"
        ],
        "specifications": {
            "material": ["Glazed chemical porcelain", "Polypropylene (plastic variants)", "Borosilicate glass (fritted variants)"],
            "capacity": {
                "value": "100 to 300",
                "unit": "mL",
                "notes": "Internal cylindrical volume typically 100 mL to 300 mL (plate diameter ~70 mm to 90 mm); sizes range from 30 mL to 2000 mL."
            },
            "dimensions": "Plate diameter ~90 mm, Total height ~145 mm, Stem outer diameter ~18 mm",
            "mainParts": ["Cylindrical upper bowl", "Flat perforated ceramic plate with drainage holes", "Narrow cylindrical beveled stem", "Rubber cone adapter collar"],
            "partsAndFunctions": [
                {
                    "partName": "Cylindrical upper bowl",
                    "function": "Holds slurry suspension and crystal cake during vacuum filtration",
                    "handlingNotes": "Inspect glazed interior for chips or hairline cracks."
                },
                {
                    "partName": "Flat perforated ceramic plate",
                    "function": "Supports circular filter paper disc flat across its surface without sagging under vacuum",
                    "handlingNotes": "Paper must lie completely flat, covering all holes without riding up sidewalls."
                },
                {
                    "partName": "Narrow cylindrical beveled stem",
                    "function": "Inserts through rubber adapter into filter flask to deliver filtrate",
                    "handlingNotes": "Beveled tip points away from the flask vacuum side-arm."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring vacuum-assisted solid-liquid separation apparatus."
            },
            "limitations": [
                "Requires a vacuum source (water aspirator or vacuum pump) and heavy-walled filter flask (suction flask)",
                "Never connect to a standard thin-walled Erlenmeyer flask (catastrophic vacuum implosion hazard)",
                "Filter paper that is too large or rides up walls allows slurry to bypass filtration"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Select filter paper circle that covers all perforated plate holes completely while lying flat without touching the vertical sidewalls",
                "Insert rubber adapter collar into the neck of a heavy-walled filter flask clamped to a retort stand",
                "Insert the Büchner funnel stem firmly into the rubber collar"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Paper Seating",
                    "instruction": "Place the filter paper disc flat on the perforated plate. Turn on the vacuum aspirator slightly and wet the paper with clean solvent to suck it flat and seal all edges."
                },
                {
                    "step": 2,
                    "title": "Slurry Pouring",
                    "instruction": "Swirl the reaction mixture and pour the slurry steadily onto the center of the paper, keeping the vacuum on full."
                },
                {
                    "step": 3,
                    "title": "Washing",
                    "instruction": "Rinse remaining crystals from the beaker with minimal ice-cold solvent, pouring directly onto the crystal cake."
                },
                {
                    "step": 4,
                    "title": "Air Drying and Breaking Vacuum",
                    "instruction": "Allow air to be drawn through the crystal bed for 2-5 minutes to pull out residual liquid. BEFORE turning off the vacuum source, disconnect the vacuum hose from the flask side-arm to prevent water back-siphonage."
                }
            ],
            "handlingTips": [
                "ALWAYS disconnect the vacuum hose from the side-arm before turning off a water aspirator; otherwise water sucks back into your filtrate",
                "Press the crystal cake gently with a clean flat glass stopper to squeeze out residual mother liquor"
            ],
            "shutdown": [
                "Turn off vacuum pump after disconnecting hose",
                "Invert funnel over a clean watch glass or use a microspatula to lift out the filter paper and crystal cake",
                "Wash funnel with hot water, brush through perforated holes, and dry"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Flask implosion under vacuum", "Water aspirator back-siphonage contaminating product", "Solvent aerosol vapors"],
            "warnings": [
                "NEVER apply vacuum to a standard thin-walled Erlenmeyer flask; use ONLY thick-walled heavy filter flasks (vacuum implosion hazard)",
                "Always wrap large glass vacuum filter flasks with tape or place behind a safety shield"
            ],
            "actionsToAvoid": [
                "Do not turn off water aspirator while vacuum tubing is still connected to the flask",
                "Do not fold the filter paper (must lie completely flat on the perforated plate)"
            ],
            "emergencyGuidance": [
                "In case of vacuum glassware implosion, cut power, step back, and report immediately to supervisor",
                "Sweep broken glass with broom and dustpan into sharps receptacle"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Remove spent filter paper and residual solids",
                "Soak in warm water with laboratory detergent; scrub perforated holes with a stiff nylon brush",
                "Rinse with running tap water to flush holes, finish with deionized water, and dry in an oven up to 100 °C"
            ],
            "storageInstructions": [
                "Store on clean shelves grouped by diameter size",
                "Keep rubber adapter cones clean and store loosely in tool drawers"
            ],
            "maintenanceChecks": [
                "Inspect perforated plate to ensure all holes are open and free of dried crystals",
                "Check porcelain glaze for micro-fissures or chips around the rim"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid fails to filter; no suction is pulling liquid through",
                    "possibleCauses": ["Rubber adapter cone does not seal against flask neck", "Vacuum source valve closed or aspirator clogged"],
                    "solution": ["Press down gently on the funnel to seat the rubber collar; verify water flow rate through aspirator"],
                    "prevention": ["Ensure correct rubber cone size is selected for flask neck"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Filtrate passes through cloudy and contains solid crystals",
                    "possibleCauses": ["Filter paper was too large and creased up sidewalls, allowing slurry to bypass behind it", "Paper tore"],
                    "solution": ["Re-filter the cloudy filtrate using a correctly sized filter paper disc that lies perfectly flat"],
                    "prevention": ["Always check that paper covers all holes while lying flat without folding up walls"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Water from aspirator backs up and floods into the filter flask",
                    "possibleCauses": ["Water tap was turned off while the vacuum hose was still connected to the flask"],
                    "solution": ["If filtrate contains valuable product, evaporate water or re-extract; clean and reset apparatus"],
                    "prevention": ["ALWAYS pull vacuum tubing off the side-arm before turning off the water faucet"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Turning off the water aspirator faucet before pulling the vacuum hose off the filter flask",
                    "whyItMatters": "The sudden loss of water pressure causes tap water to violently back-siphon into the flask, ruining the pure filtrate",
                    "howToAvoid": "Always disconnect the vacuum hose from the flask side-arm first, then turn off the water faucet"
                },
                {
                    "mistake": "Folding the filter paper into quarters like a gravity filtration paper",
                    "whyItMatters": "Büchner funnels require a single flat circular disc; folded paper creates gaps where vacuum pulls unfiltered slurry directly into the flask",
                    "howToAvoid": "Lay a single flat round filter paper disc directly over the perforated plate"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "filter-paper",
                "relationship": "complementary",
                "reason": "Circular filter paper discs are placed flat on the perforated plate to trap crystals.",
                "difference": "The Büchner funnel provides the vacuum-supported rigid framework; the paper is the filter medium."
            },
            {
                "equipmentId": "glass-funnel",
                "relationship": "alternative",
                "reason": "Büchner funnels perform rapid vacuum filtration; glass funnels perform slow gravity filtration.",
                "difference": "A Büchner funnel uses vacuum suction; a glass funnel relies on gravity alone."
            },
            {
                "equipmentId": "retort-stand",
                "relationship": "complementary",
                "reason": "The heavy-walled filter flask supporting the Büchner funnel must be clamped to a retort stand to prevent tipping.",
                "difference": "The retort stand provides physical anchoring; the Büchner funnel performs the filtration."
            }
        ],
        "metadata": {
            "difficultyLevel": "Intermediate",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ISO 6486 - Laboratory porcelain: Büchner funnels",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Perforated plate specifications, dimensional standards, porcelain quality"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Vacuum filtration setups, back-siphonage prevention, crystal drying"]
                }
            ]
        }
    },

    # 33. Round-bottom Flask
    {
        "id": "round-bottom-flask",
        "pdfNumber": 33,
        "pdfName": "Round-bottom Flask",
        "pdfMainUse": "Heating, reflux, and distillation",
        "pdfGroup": "Heating, handling and separation",
        "name": "Round-bottom Flask",
        "category": "Glassware",
        "purpose": "Contains reaction mixtures subjected to direct heating, reflux boiling, or vacuum distillation.",
        "image": {
            "src": "assets/images/equipment/round-bottom-flask.svg",
            "alt": "Spherical borosilicate round-bottom flask with ground glass standard taper joint neck",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/round-bottom-flask.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A spherical borosilicate glass flask with a cylindrical neck featuring a ground-glass standard taper joint. The spherical shape eliminates sharp internal stress points and corners, providing exceptional resistance to thermal shock and vacuum pressure during boiling, reflux, and distillation.",
        "alternativeNames": ["RBF", "Boiling flask", "Spherical flask", "Distillation flask"],
        "commonUses": [
            "Boiling reaction mixtures under reflux with an attached condenser",
            "Serving as the boiling pot (distilland reservoir) in distillation apparatus",
            "Evaporating volatile solvents on rotary evaporators (rotavaps)",
            "Conducting chemical reactions under vacuum or positive inert gas atmosphere"
        ],
        "types": [
            "Single-neck round-bottom flask (standard reaction and distillation format)",
            "Two- or three-neck round-bottom flask (allows simultaneous insertion of condenser, thermometer, and addition funnel)",
            "Pear-shaped flask (tapered bottom designed for microscale reactions and easy product recovery)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3"],
            "capacity": {
                "value": "250",
                "unit": "mL",
                "notes": "250 mL is standard; common capacities include 50 mL, 100 mL, 500 mL, 1000 mL, and 2000 mL."
            },
            "dimensions": "Spherical bulb diameter ~85 mm, Total height ~140 mm, Neck joint size 24/40 or 24/29",
            "mainParts": ["Ground-glass standard taper socket neck (e.g. 24/29)", "Reinforced rim", "Spherical glass body", "Hemispherical curved base"],
            "partsAndFunctions": [
                {
                    "partName": "Ground-glass standard taper socket neck",
                    "function": "Forms airtight, grease-free or lightly greased seals with condensers, adapters, and stoppers",
                    "handlingNotes": "Inspect ground joint for chips before assembly; secure with Keck clip."
                },
                {
                    "partName": "Spherical glass body",
                    "function": "Distributes heat evenly and withstands uniform external vacuum pressure without implosion",
                    "handlingNotes": "Never fill past half capacity when boiling under reflux."
                },
                {
                    "partName": "Hemispherical curved base",
                    "function": "Eliminates corners where solids could lodge and promotes smooth thermal convection",
                    "handlingNotes": "Cannot stand upright on a flat bench; must rest in a cork ring or clamp."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: ungraduated reaction and distillation vessel."
            },
            "limitations": [
                "Cannot stand upright on a flat benchtop without a cork ring or support clamp",
                "Cannot be heated on a flat hot plate without an aluminum heating block or oil bath",
                "Heating a closed, unvented flask will cause catastrophic explosive rupture"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect spherical body under bright light for star cracks, scratches, or thermal flaws",
                "Rest the flask in a cork support ring on the bench while loading chemicals",
                "Add 2 to 3 boiling stones or a PTFE magnetic stir bar BEFORE heating begins"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Loading Reactants",
                    "instruction": "Pour reactants and solvent into the flask through a funnel, filling to no more than one-half total capacity."
                },
                {
                    "step": 2,
                    "title": "Clamping into Assembly",
                    "instruction": "Clamp the flask securely around the upper neck just below the ground joint using a utility clamp attached to a sturdy retort stand."
                },
                {
                    "step": 3,
                    "title": "Heat Source Placement",
                    "instruction": "Position a heating mantle, oil bath, or water bath underneath the flask so the heating element cradles the bottom hemisphere."
                },
                {
                    "step": 4,
                    "title": "Attachment and Heating",
                    "instruction": "Connect condenser or distillation head, secure joint with a Keck clip, ensure the system is vented to the atmosphere, and apply heat gradually."
                }
            ],
            "handlingTips": [
                "Always support a round-bottom flask in a cork ring whenever setting it on the bench",
                "Secure ground glass joints to attached adapters using plastic Keck clips or joint springs"
            ],
            "shutdown": [
                "Lower and remove the heat source, allowing the flask to cool gradually to room temperature",
                "Disconnect joint clips and remove flask to a cork ring",
                "Wash with solvent and laboratory detergent, rinse with DI water, and dry"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Face shield (if operating under vacuum)"],
            "hazards": ["Explosion if heated in a sealed closed system", "Vacuum implosion", "Severe thermal burns from boiling reaction liquids"],
            "warnings": [
                "NEVER heat a completely closed or tightly stoppered round-bottom flask; explosive pressure will build up",
                "Never add boiling stones to a liquid that is already hot or near its boiling point (triggers explosive boiling)"
            ],
            "actionsToAvoid": [
                "Do not fill beyond half capacity when setting up a boiling or reflux reaction",
                "Do not place a round-bottom flask unsupported on a flat benchtop (it will roll off and shatter)"
            ],
            "emergencyGuidance": [
                "In case of joint leak or vapor escape, immediately remove heat source and increase fume hood sash draft",
                "Treat boiling liquid splashes on skin by flushing under safety shower for 15 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Rinse immediately with compatible organic solvent to remove tarry reaction residues",
                "Wash with warm water and detergent using a curved spherical flask brush",
                "Rinse four times with tap water, finish with deionized water, and dry in an oven or air rack"
            ],
            "storageInstructions": [
                "Store in designated glassware shelving resting in cork rings or suspended from joint racks",
                "Do not stack round-bottom flasks inside each other"
            ],
            "maintenanceChecks": [
                "Check ground glass joint for smooth sealing, chips, or grease residue",
                "Inspect spherical body under polarized light or strong illumination for micro-fractures"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid bumps violently and shoots up the neck into the condenser",
                    "possibleCauses": ["Forgot to add boiling stones or activate magnetic stirring before heating"],
                    "solution": ["Immediately remove heat source and let cool below boiling before adding boiling chips or stir bar"],
                    "prevention": ["Always add boiling chips or stir bar to cold reaction mixture prior to heating"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Ground glass joint freezes and cannot be separated after cooling",
                    "possibleCauses": ["Reagent or grease carbonized inside joint; joint cooled under partial vacuum"],
                    "solution": ["Apply warm water or gentle heat gun to outer socket, or tap gently with a wooden block; ask supervisor"],
                    "prevention": ["Lightly grease joints with high-vacuum grease or use PTFE joint sleeves"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Flask cracks during heating",
                    "possibleCauses": ["Pre-existing star crack; uneven heating on flat hot plate without mantle"],
                    "solution": ["Turn off heat source immediately, drop heating mantle away, and contain spilled mixture"],
                    "prevention": ["Never heat round-bottom flasks on flat hot plates without a contoured heating block or bath"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Setting up a reflux reaction in a completely sealed, stoppered flask",
                    "whyItMatters": "Vapors cannot escape or expand; the flask becomes a bomb that violently explodes, showering shrapnel and boiling acid",
                    "howToAvoid": "Always ensure the top of the reflux condenser remains open to the atmosphere (or vented via drying tube)"
                },
                {
                    "mistake": "Adding boiling stones to a solution that is already near its boiling point",
                    "whyItMatters": "Instantly triggers explosive violent flash boiling, shooting scalding chemical foam out of the neck",
                    "howToAvoid": "Always drop boiling stones in while the solution is cold before turning on the heat"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "condenser",
                "relationship": "complementary",
                "reason": "Condensers attach directly to the neck of round-bottom flasks to cool vapors back into liquid.",
                "difference": "The round-bottom flask contains the boiling liquid; the condenser cools the vapor."
            },
            {
                "equipmentId": "distillation-apparatus",
                "relationship": "complementary",
                "reason": "Round-bottom flasks serve as both boiling flask and receiving flask in distillation setups.",
                "difference": "The flask is the containment vessel; the distillation apparatus is the complete separation system."
            },
            {
                "equipmentId": "clamp-and-boss-head",
                "relationship": "complementary",
                "reason": "Used to clamp the neck of the round-bottom flask securely to a retort stand.",
                "difference": "The clamp provides physical mounting; the flask holds the reaction mixture."
            }
        ],
        "metadata": {
            "difficultyLevel": "Intermediate",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ISO 1773 - Laboratory glassware: Boiling flasks (Round-bottom)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Standard spherical dimensions, wall thickness, thermal shock limits"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Reflux setups, ground joint handling, anti-bumping techniques"]
                }
            ]
        }
    },

    # 34. Condenser
    {
        "id": "condenser",
        "pdfNumber": 34,
        "pdfName": "Condenser",
        "pdfMainUse": "Cooling vapor into liquid",
        "pdfGroup": "Heating, handling and separation",
        "name": "Condenser",
        "category": "Glassware",
        "purpose": "Cools hot vaporized solvent or distillate back into liquid during reflux and distillation.",
        "image": {
            "src": "assets/images/equipment/condenser.svg",
            "alt": "Liebig borosilicate glass condenser with central inner tube, cooling water jacket, and hose barbs",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/condenser.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A specialized double-walled glass heat-exchanger featuring an internal vapor tube surrounded by a sealed outer cooling jacket with water inlet and outlet hose barbs. Circulating cold water through the jacket absorbs latent heat, condensing vapors into liquid droplets.",
        "alternativeNames": ["Liebig condenser", "Reflux condenser", "Allihn condenser", "Graham condenser", "Dimroth condenser"],
        "commonUses": [
            "Refluxing reaction mixtures to boil continuously without solvent loss",
            "Condensing distilled vapors into liquid distillate during simple and fractional distillation",
            "Recovering extracted solvents in Soxhlet extraction assemblies",
            "Trapping volatile organic emissions from heated reactions"
        ],
        "types": [
            "Liebig condenser (straight inner tube; standard for distillation at inclined angles)",
            "Allihn condenser (bulb-shaped inner tube providing greater surface area; strictly for vertical reflux)",
            "Graham condenser (coiled inner tube; high surface area for volatile distillations)",
            "Dimroth condenser (internal coiled coolant tube; exceptional heat transfer efficiency for low-boiling solvents)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3"],
            "capacity": {
                "value": "Jacket length ~300",
                "unit": "mm",
                "notes": "Effective cooling jacket length typically 200 mm to 400 mm (300 mm is standard laboratory size)."
            },
            "dimensions": "Overall length ~420 mm, Jacket outer diameter ~40 mm, Ground joints 24/40 or 24/29",
            "mainParts": ["Upper ground glass socket joint", "Central internal vapor/condensate tube", "Sealed outer water jacket", "Lower and upper serrated hose barbs", "Lower ground glass cone joint"],
            "partsAndFunctions": [
                {
                    "partName": "Central internal vapor/condensate tube",
                    "function": "Channels hot vapor and allows condensed liquid droplets to drain downward",
                    "handlingNotes": "Keep clean and free of organic residues."
                },
                {
                    "partName": "Sealed outer water jacket",
                    "function": "Encloses continuous stream of cold cooling water surrounding the vapor tube",
                    "handlingNotes": "Inspect jacket-to-tube seals for micro-cracks."
                },
                {
                    "partName": "Lower and upper serrated hose barbs",
                    "function": "Connects rubber or PVC cooling water hoses (water in at bottom, out at top)",
                    "handlingNotes": "Secure tubing with hose clamps to prevent pop-off flooding."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring thermal heat-exchange glassware."
            },
            "limitations": [
                "Requires continuous, pressurized water supply; hose slippage can cause major laboratory flooding",
                "Allihn bulb condensers cannot be used at an inclined angle (condensate traps in bulbs)",
                "Insufficient cooling water flow allows flammable vapors to escape uncondensed from the top"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect condenser glass body, water jacket, and ground joints for cracks or chips",
                "Attach reinforced rubber or PVC tubing to the hose barbs and secure with wire or hose clamps",
                "Verify water plumbing rule: WATER IN AT THE BOTTOM, WATER OUT AT THE TOP"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Mounting",
                    "instruction": "Clamp the condenser securely to a retort stand using a cushioned utility clamp. Connect the ground joint to the reaction flask (reflux) or distillation head."
                },
                {
                    "step": 2,
                    "title": "Hose Configuration",
                    "instruction": "Connect the lower hose barb to the cold water tap, and lead the upper hose barb to the drainage sink drain."
                },
                {
                    "step": 3,
                    "title": "Coolant Flow Initiation",
                    "instruction": "Turn on the water tap gently to fill the jacket from bottom to top, displacing all air bubbles. Maintain a gentle, laminar stream (do not use high blast pressure)."
                },
                {
                    "step": 4,
                    "title": "Condensation Monitoring",
                    "instruction": "During heating, observe the 'reflux ring' (the condensation boundary line). Ensure the reflux ring stays within the lower half of the condenser."
                }
            ],
            "handlingTips": [
                "Always route water entering at the lowest barb and exiting from the highest barb to guarantee the jacket remains 100% full of water without air pockets",
                "Secure tubing with hose clamps or cable ties to prevent water pressure surges from blowing hoses off"
            ],
            "shutdown": [
                "Turn off the heat source and allow reaction to cool before turning off cooling water",
                "Turn off water tap, disconnect hoses, and drain water jacket over the sink",
                "Disassemble from glassware train, rinse with acetone, and store in protected rack"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Laboratory flooding from detached hoses", "Thermal shock glass shattering", "Escape of toxic/flammable uncondensed vapor"],
            "warnings": [
                "NEVER close or stopper the top of a reflux condenser; must remain open to the atmosphere to prevent explosive pressure buildup",
                "Always secure water hoses with clamps to prevent overnight bench flooding"
            ],
            "actionsToAvoid": [
                "Do not run cooling water backwards (top to bottom), as air pockets prevent complete cooling",
                "Do not use high water pressure that blows hoses off the glass barbs"
            ],
            "emergencyGuidance": [
                "If a cooling hose detaches and sprays water, immediately shut off the water tap at the sink",
                "If flammable solvent vapors escape uncondensed from top, extinguish heat source immediately"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Rinse inner tube with acetone or ethanol to dissolve organic deposits",
                "Wash inner tube with warm soapy water using a long, flexible condenser brush",
                "If mineral scale clouds the water jacket, flush with dilute 0.1 M HCl, followed by extensive tap water rinse"
            ],
            "storageInstructions": [
                "Store horizontally in padded storage drawers or vertically in padded clamp racks",
                "Ensure water jacket is completely drained before long-term storage"
            ],
            "maintenanceChecks": [
                "Check hose barbs for glass chipping or fractures where hoses are pushed on",
                "Inspect internal tube seals for hairline thermal cracks"
            ],
            "troubleshooting": [
                {
                    "problem": "Vapor escapes out of the top of the condenser into the room",
                    "possibleCauses": ["Cooling water flow is too slow or turned off", "Heating too intensely; vapor ring pushed past top", "Wrong condenser type for volatile solvent"],
                    "solution": ["Turn down heat immediately; increase water flow rate, or switch to a high-efficiency Dimroth condenser"],
                    "prevention": ["Keep reflux ring within the lower one-third of the condenser length"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Large air bubble remains trapped inside the water jacket, reducing cooling",
                    "possibleCauses": ["Water was connected backward (in at top, out at bottom)"],
                    "solution": ["Switch hoses so water enters at the bottom barb and exits from the top barb"],
                    "prevention": ["Always follow the 'in at bottom, out at top' rule"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Water hose slips off barb, spraying water over the laboratory bench",
                    "possibleCauses": ["Excessive water pressure", "Loose tubing without hose clamps"],
                    "solution": ["Shut off water tap immediately; secure hoses with screw hose clamps or zip ties"],
                    "prevention": ["Always clamp cooling hoses and use moderate water flow"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Connecting cooling water in at the top and out at the bottom",
                    "whyItMatters": "Gravity causes water to cascade straight down, leaving a massive air pocket in the jacket that ruins cooling efficiency",
                    "howToAvoid": "Always connect water in at the bottom barb and out from the top barb so the jacket fills against gravity"
                },
                {
                    "mistake": "Placing a rubber stopper in the top of a reflux condenser while heating",
                    "whyItMatters": "Converts the glassware train into a sealed pressure bomb that will catastrophically explode",
                    "howToAvoid": "Never seal the top of a reflux condenser; leave it open or attach an open drying tube"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "round-bottom-flask",
                "relationship": "complementary",
                "reason": "Condensers mount directly above round-bottom flasks during reflux and distillation.",
                "difference": "The round-bottom flask boils the mixture; the condenser cools vapors back into liquid."
            },
            {
                "equipmentId": "distillation-apparatus",
                "relationship": "complementary",
                "reason": "The condenser is the central heat-exchange component of a complete distillation apparatus.",
                "difference": "The condenser is the cooling unit; the distillation apparatus is the entire multi-piece assembly."
            },
            {
                "equipmentId": "clamp-and-boss-head",
                "relationship": "complementary",
                "reason": "Clamps and boss heads hold the condenser securely at required angles on retort stands.",
                "difference": "The clamp provides physical mounting; the condenser is the functional heat exchanger."
            }
        ],
        "metadata": {
            "difficultyLevel": "Intermediate",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ISO 4799 - Laboratory glassware: Condensers",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Condenser types (Liebig, Allihn, Graham), jacket dimensions, joint standards"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Coolant flow rules, reflux configurations, flood prevention"]
                }
            ]
        }
    },

    # 35. Distillation Apparatus
    {
        "id": "distillation-apparatus",
        "pdfNumber": 35,
        "pdfName": "Distillation Apparatus",
        "pdfMainUse": "Separating substances based on volatility",
        "pdfGroup": "Heating, handling and separation",
        "name": "Distillation Apparatus",
        "category": "Separation Equipment",
        "purpose": "Separates liquid mixtures or purifies solvents based on differences in boiling points.",
        "image": {
            "src": "assets/images/equipment/distillation-apparatus.svg",
            "alt": "Complete laboratory distillation assembly featuring boiling flask, distillation head, thermometer, Liebig condenser, and receiving flask",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/distillation-apparatus.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An integrated multi-component glassware assembly comprising a boiling flask, distillation adapter (still head), calibrated thermometer, water-cooled condenser, vacuum takeoff adapter, and receiving flask. Vaporizes volatile components and condenses them separately from non-volatile or higher-boiling residues.",
        "alternativeNames": ["Distillation setup", "Simple distillation train", "Fractional distillation assembly", "Still"],
        "commonUses": [
            "Purifying organic solvents by separating them from non-volatile impurities and dyes",
            "Separating binary liquid mixtures with significant boiling point differences (e.g. water and ethanol)",
            "Desalinating seawater into pure fresh distilled water",
            "Performing fractional distillation of petroleum or complex multi-component mixtures"
        ],
        "types": [
            "Simple distillation apparatus (for liquids with boiling points differing by >50-70 °C)",
            "Fractional distillation apparatus (incorporates a Vigreux fractionating column for close-boiling mixtures)",
            "Vacuum distillation apparatus (operates under reduced pressure to distill heat-sensitive high-boiling compounds)"
        ],
        "specifications": {
            "material": ["Borosilicate glass 3.3", "PTFE or silicone joint grease", "Polyoxymethylene (Keck joint clips)"],
            "capacity": {
                "value": "250 to 500",
                "unit": "mL",
                "notes": "Standard student distillation train uses 250 mL boiling flask and 100-250 mL receiver."
            },
            "dimensions": "Assembly span ~700 mm wide, Height ~600 mm on two retort stands",
            "mainParts": ["Round-bottom boiling flask (distilland pot)", "Distillation head (three-way adapter)", "Thermometer and adapter", "Liebig condenser", "Vacuum receiver adapter", "Receiving flask"],
            "partsAndFunctions": [
                {
                    "partName": "Distillation head (three-way adapter)",
                    "function": "Directs rising vapor from the boiling flask past the thermometer bulb into the downward condenser",
                    "handlingNotes": "Thermometer bulb must sit exactly level with the side-arm entrance."
                },
                {
                    "partName": "Liebig condenser",
                    "function": "Cools descending vapor stream into pure liquid distillate using countercurrent water flow",
                    "handlingNotes": "Water flows in at lower barb, out at upper barb."
                },
                {
                    "partName": "Vacuum takeoff adapter",
                    "function": "Guides condensed distillate drops into the receiving flask while keeping system vented to atmosphere",
                    "handlingNotes": "Must remain unsealed unless operating deliberate vacuum distillation."
                }
            ],
            "measurementAccuracy": {
                "value": 1.0,
                "unit": "°C",
                "notes": "Vapor temperature monitored via thermometer (±1 °C) indicates boiling point plateau of distilling fractions."
            },
            "limitations": [
                "Simple distillation cannot separate liquid components with boiling points closer than 40-50 °C (requires fractional column)",
                "Heating to complete dryness can cause explosive peroxides to detonate (never distill to dryness)",
                "Complex multi-joint assembly requires careful alignment to avoid joint strain and leaks"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect all glass joints for chips; assemble train supported by two retort stands and clamps",
                "Add 2 to 3 boiling stones to the boiling flask before adding the liquid mixture (fill to ~half capacity)",
                "Position thermometer bulb so its top is level with the bottom of the distillation head side-arm"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Joint Assembly and Securing",
                    "instruction": "Fit all standard taper joints snugly. Secure every joint with a plastic Keck clip to prevent accidental separation."
                },
                {
                    "step": 2,
                    "title": "Coolant Flow",
                    "instruction": "Turn on cooling water tap so water enters lower condenser barb and exits upper barb into the sink drain."
                },
                {
                    "step": 3,
                    "title": "Controlled Heating",
                    "instruction": "Apply heat gradually using a heating mantle. Observe vapor rising and monitor temperature rise as vapor reaches thermometer bulb."
                },
                {
                    "step": 4,
                    "title": "Fraction Collection",
                    "instruction": "Collect initial low-boiling 'forerun' in a waste vessel. When temperature stabilizes at boiling plateau, switch receiving flask to collect pure fraction."
                }
            ],
            "handlingTips": [
                "Position the thermometer bulb so the top of the mercury/spirit bulb is exactly aligned with the bottom of the side-arm opening",
                "NEVER distill to complete dryness; always leave approximately 5 mL of liquid in the boiling flask"
            ],
            "shutdown": [
                "Turn off heat source and lower heating mantle away from the boiling flask",
                "Allow assembly to cool for 15 minutes before turning off cooling water",
                "Disassemble from receiver backward, clean glassware with solvent, and store"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Face shield (if vacuum distillation)"],
            "hazards": ["Explosive detonation of organic peroxides if distilled to dryness", "Thermal burns", "Flammable solvent vapor ignition"],
            "warnings": [
                "NEVER heat a closed, unvented distillation system; vacuum takeoff adapter MUST remain open to atmosphere",
                "NEVER distill ethers or conjugated dienes to dryness (peroxide explosion hazard)"
            ],
            "actionsToAvoid": [
                "Do not heat the boiling flask with a direct naked burner flame if distilling flammable solvents",
                "Do not add boiling stones to hot distilland (causes explosive boiling flash)"
            ],
            "emergencyGuidance": [
                "If a joint leaks flammable solvent vapor, cut heat immediately and notify supervisor",
                "In case of distillation fire, use CO2 or dry chemical fire extinguisher immediately"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wait until all glassware has cooled to ambient room temperature",
                "Disassemble joints carefully, wiping joint grease away with an acetone-wetted wipe",
                "Wash all components with warm water and laboratory detergent, rinse with DI water, and dry"
            ],
            "storageInstructions": [
                "Store components in dedicated molded foam kit boxes or categorized glassware drawers",
                "Keep plastic Keck clips separated by joint size (e.g. 19/22, 24/40)"
            ],
            "maintenanceChecks": [
                "Inspect every ground joint for micro-chips, cracks, or star fractures",
                "Check condenser water hoses for elasticity and secure clamp fit"
            ],
            "troubleshooting": [
                {
                    "problem": "Vapor temperature reads lower than known boiling point of distilling liquid",
                    "possibleCauses": ["Thermometer bulb placed too high above the side-arm opening, missing vapor stream"],
                    "solution": ["Lower the thermometer so the top of the bulb aligns with the bottom of the side-arm bore"],
                    "prevention": ["Always check thermometer placement before starting distillation"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Joints leak vapor and drops of distillate during distillation",
                    "possibleCauses": ["Joints not clamped parallel; missing Keck clips; ungreased dry joints under stress"],
                    "solution": ["Adjust clamp angles to align joints squarely without strain; apply thin film of grease and Keck clips"],
                    "prevention": ["Never force misaligned glassware joints together"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Liquid in boiling pot turns dark brown and smokes near the end",
                    "possibleCauses": ["Distillation carried too far; pot is nearly dry and decomposing non-volatile residues"],
                    "solution": ["Immediately remove heat source and let cool; never distill to dryness"],
                    "prevention": ["Stop distillation when 10-15% of original volume remains in the boiling pot"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Placing the thermometer bulb too high up inside the distillation head",
                    "whyItMatters": "The bulb is above the vapor stream entering the condenser, reading cold air rather than true vapor boiling point",
                    "howToAvoid": "Align the top of the thermometer bulb strictly with the bottom curve of the side-arm opening"
                },
                {
                    "mistake": "Distilling an organic solution until the boiling flask is completely dry",
                    "whyItMatters": "Concentrates unstable organic peroxides that detonate with catastrophic explosive force",
                    "howToAvoid": "Always leave at least 5 mL of residual liquid in the boiling flask and extinguish heat"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "round-bottom-flask",
                "relationship": "complementary",
                "reason": "Round-bottom flasks serve as the boiling pot and the receiving flask in distillation.",
                "difference": "The flask is an individual containment vessel; the distillation apparatus is the complete separation train."
            },
            {
                "equipmentId": "condenser",
                "relationship": "complementary",
                "reason": "The condenser is the primary heat exchanger within the distillation apparatus.",
                "difference": "The condenser cools the vapor; the distillation apparatus comprises the full boiling, metering, and recovery train."
            },
            {
                "equipmentId": "thermometer",
                "relationship": "complementary",
                "reason": "Measures the precise vapor temperature at the still head to identify distilling chemical fractions.",
                "difference": "The thermometer monitors temperature; the distillation apparatus performs the physical separation."
            }
        ],
        "metadata": {
            "difficultyLevel": "Advanced",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ASTM E133 - Standard Specification for Distillation Equipment",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Apparatus assembly dimensions, condenser specifications, thermometer placement"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Simple vs fractional distillation, peroxide hazard prevention, joint alignment"]
                }
            ]
        }
    },

    # 36. Crucible
    {
        "id": "crucible",
        "pdfNumber": 36,
        "pdfName": "Crucible",
        "pdfMainUse": "Heating solid samples at high temperatures",
        "pdfGroup": "Heating, handling and separation",
        "name": "Crucible",
        "category": "Heating Equipment",
        "purpose": "Heats chemical solids, precipitates, and metals to extreme temperatures (>1000 °C) for calcination and gravimetric ashing.",
        "image": {
            "src": "assets/images/equipment/crucible.svg",
            "alt": "High-form white glazed porcelain crucible cup with fitted loose lid",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/crucible.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A small, deep cup made of high-fired refractory porcelain, quartz, or inert metal with a loosely fitting lid. Engineered to withstand intense direct flame and furnace temperatures exceeding 1050 °C without melting or deforming, essential for gravimetric residue analysis and thermal decomposition.",
        "alternativeNames": ["Porcelain crucible", "Ashing crucible", "Gooch crucible (perforated filter variant)"],
        "commonUses": [
            "Thermal decomposition of hydrated salts and metal carbonates to oxides",
            "Ashing quantitative filter paper containing analytical precipitates",
            "Determining loss on ignition (LOI) and ash content in environmental/food testing",
            "Melting small quantities of pure metals or flux salts"
        ],
        "types": [
            "High-form porcelain crucible (tall walls reduce spattering loss during heating)",
            "Low-form (wide-form) porcelain crucible (provides large surface area for rapid oxidation)",
            "Gooch crucible (features perforated base for direct vacuum filtration and subsequent ashing)",
            "Platinum / Nickel crucible (for handling aggressive molten fluxes that attack ceramic)"
        ],
        "specifications": {
            "material": ["High-fired refractory porcelain (glazed inside and out except outer base)", "Fused quartz", "Platinum"],
            "capacity": {
                "value": "15 to 30",
                "unit": "mL",
                "notes": "Standard student size has volume of ~30 mL; sizes range from 10 mL to 100 mL."
            },
            "dimensions": "Top outer diameter ~45 mm, Height ~50 mm (typical 30 mL high-form crucible)",
            "mainParts": ["Tapered refractory ceramic cup", "Loosely fitting ceramic lid with center handle knob", "Unglazed flat outer bottom base"],
            "partsAndFunctions": [
                {
                    "partName": "Tapered refractory ceramic cup",
                    "function": "Contains solid sample under direct burner or muffle furnace temperatures up to 1100 °C",
                    "handlingNotes": "Inspect for hairline cracks; handle only with clean crucible tongs."
                },
                {
                    "partName": "Loosely fitting ceramic lid with center handle knob",
                    "function": "Prevents spattering loss while allowing volatile combustion gases to escape",
                    "handlingNotes": "Position slightly ajar during ashing to admit oxygen."
                },
                {
                    "partName": "Unglazed flat outer bottom base",
                    "function": "Directly absorbs flame heat when nested in a pipeclay triangle",
                    "handlingNotes": "Keep dry; never quench hot base in water."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring thermal containment vessel (used on analytical balance for mass by difference)."
            },
            "limitations": [
                "Porcelain is brittle and shatters instantly if subjected to sudden thermal shock",
                "Strong molten alkalis (NaOH/KOH fluxes) attack and dissolve porcelain glaze",
                "Must be pre-ignited and cooled in a desiccator to achieve constant dry tare weight"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect crucible and lid under bright light for fine hairline fractures",
                "Clean thoroughly and pre-heat in a burner flame for 10 minutes to burn off all volatile impurities",
                "Transfer with clean tongs to a desiccator to cool to room temperature, then tare on an analytical balance"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Sample Loading",
                    "instruction": "Weigh the solid sample or folded filter paper containing precipitate directly into the tared crucible."
                },
                {
                    "step": 2,
                    "title": "Mounting on Triangle",
                    "instruction": "Set the crucible securely inside a clay triangle resting on a tripod stand. Position the lid slightly ajar to allow smoke to vent."
                },
                {
                    "step": 3,
                    "title": "Gradual Heating and Ashing",
                    "instruction": "Apply a gentle Bunsen burner flame initially to char paper without flaming. Gradually increase flame to strong blue heat until the crucible glows dull red."
                },
                {
                    "step": 4,
                    "title": "Cooling and Desiccation",
                    "instruction": "Turn off flame, allow crucible to cool on the triangle for 2 minutes, then transfer using tongs to a desiccator for 30 minutes before final weighing."
                }
            ],
            "handlingTips": [
                "Always position the lid slightly tilted (ajar) during ashing to allow atmospheric oxygen to enter and smoke to escape",
                "Never touch an analytical crucible with bare fingers after pre-ignition; finger oils add measurable mass"
            ],
            "shutdown": [
                "Allow crucible to reach room temperature inside a desiccator before final analytical weighing",
                "Scrape out ash product and wash ceramic with warm dilute acid or detergent",
                "Rinse with DI water and store in a clean drying cabinet"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Heat-resistant gloves", "Crucible tongs"],
            "hazards": ["Severe contact thermal burns from glowing ceramic (>800 °C)", "Thermal shock ceramic shattering", "Hot gas spattering"],
            "warnings": [
                "A glowing red crucible remains hot enough to cause severe third-degree burns long after the glow disappears",
                "NEVER touch hot porcelain with bare fingers or cold metal tongs"
            ],
            "actionsToAvoid": [
                "Do not place a red-hot crucible directly onto a cold stone or laminate benchtop",
                "Do not heat volatile, combustible liquids in a crucible"
            ],
            "emergencyGuidance": [
                "In case of thermal contact burn, hold under cold running water for at least 10 minutes",
                "If a hot crucible shatters on the bench, warn others, let fragments cool, and sweep into sharps bin"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Allow crucible to cool completely to room temperature",
                "Soak in warm water with laboratory detergent; scrub with a soft brush",
                "For stubborn baked-on oxide residues, boil briefly with dilute 3 M nitric acid under a fume hood, then rinse with DI water"
            ],
            "storageInstructions": [
                "Store in a clean, dust-free cabinet or inside a desiccator if pre-weighed for immediate analytical use",
                "Keep crucible and matching lid paired together"
            ],
            "maintenanceChecks": [
                "Check for fine glaze crazing cracks before every high-temperature firing session",
                "Perform ring test: tap lightly with a pencil; a sound crucible produces a clear ring, cracked ceramic thuds"
            ],
            "troubleshooting": [
                {
                    "problem": "Crucible shatters with a loud pop during heating",
                    "possibleCauses": ["Applied intense flame too rapidly to a damp crucible", "Pre-existing hairline crack in ceramic"],
                    "solution": ["Extinguish burner immediately, allow to cool, and treat residue as loss/waste"],
                    "prevention": ["Always warm damp crucibles gently before applying roaring blue flame"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Analytical mass increases between consecutive weighings",
                    "possibleCauses": ["Crucible weighed while still warm; or left sitting open on the bench absorbing atmospheric moisture"],
                    "solution": ["Return crucible to desiccator for 20 minutes to cool completely and exclude moisture before re-weighing"],
                    "prevention": ["Always cool crucibles in a desiccator charged with active silica gel"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Black carbon residue remains after prolonged heating",
                    "possibleCauses": ["Lid was sealed completely shut, starving sample of oxygen needed for complete combustion"],
                    "solution": ["Adjust lid slightly ajar to admit air, and heat strongly in the oxidizing zone of the flame"],
                    "prevention": ["Always leave lid tilted ajar during filter paper ashing"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Placing a red-hot crucible directly onto a cold countertop or balance pan",
                    "whyItMatters": "Thermal shock shatters the porcelain instantly, scorching the benchtop and permanently destroying balance sensors",
                    "howToAvoid": "Allow the crucible to cool on the clay triangle for 2 minutes, then move to a desiccator"
                },
                {
                    "mistake": "Touching a pre-ignited crucible with bare fingers before weighing on an analytical balance",
                    "whyItMatters": "Fingerprint grease deposits 0.5 to 2 mg of organic mass, ruining analytical gravimetric accuracy",
                    "howToAvoid": "Always handle pre-weighed analytical crucibles exclusively with clean tongs"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "clay-triangle",
                "relationship": "complementary",
                "reason": "Crucibles nest inside clay triangles to be held directly over a burner flame.",
                "difference": "The crucible is the porcelain heating vessel; the clay triangle is the open support frame."
            },
            {
                "equipmentId": "crucible-tongs",
                "relationship": "complementary",
                "reason": "Crucible tongs are specifically shaped to grasp hot crucibles and lids safely.",
                "difference": "The crucible holds the sample; the tongs provide the safe handling tool."
            },
            {
                "equipmentId": "desiccator",
                "relationship": "complementary",
                "reason": "Hot crucibles are transferred into a desiccator to cool in a dry environment before weighing.",
                "difference": "The crucible is heated; the desiccator cools and preserves dryness."
            }
        ],
        "metadata": {
            "difficultyLevel": "Intermediate",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ISO 1772 - Laboratory porcelain: Crucibles and lids",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Crucible dimensions, thermal shock ratings, high-form specifications"]
                },
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Gravimetric ashing procedures, cooling to constant weight"]
                }
            ]
        }
    },

    # 37. Clay Triangle
    {
        "id": "clay-triangle",
        "pdfNumber": 37,
        "pdfName": "Clay Triangle",
        "pdfMainUse": "Supporting a crucible during heating",
        "pdfGroup": "Heating, handling and separation",
        "name": "Clay Triangle",
        "category": "Support Equipment",
        "purpose": "Suspends a crucible over an open flame on a tripod stand while allowing direct flame impingement.",
        "image": {
            "src": "assets/images/equipment/clay-triangle.svg",
            "alt": "Pipeclay triangle with three ceramic refractory tubes threaded over twisted galvanized steel wires",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/clay-triangle.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An equilateral triangle made of three heat-resistant ceramic (pipeclay) tubes threaded over heavy twisted iron or nichrome wire. Rests across the ring of a tripod stand, creating an open triangular opening that securely cradles the tapered walls of a crucible directly above a burner flame.",
        "alternativeNames": ["Pipeclay triangle", "Ceramic triangle", "Crucible triangle"],
        "commonUses": [
            "Supporting porcelain crucibles directly above a Bunsen or Meker burner flame",
            "Holding small evaporating dishes on a tripod stand",
            "Supporting porcelain Gooch crucibles during flame ignition",
            "Providing high-temperature open-bottom heating without thermal shielding"
        ],
        "types": [
            "Pipeclay ceramic triangle (standard student model with ceramic sleeve tubes)",
            "Fused silica / quartz tube triangle (withstands temperatures up to 1200 °C)",
            "Stainless steel wire triangle (resists rust from corrosive chemical fumes)"
        ],
        "specifications": {
            "material": ["Heat-resistant refractory ceramic (pipeclay) tubes", "Heavy galvanized iron or nichrome wire"],
            "capacity": {
                "value": "Up to ~1000",
                "unit": "°C",
                "notes": "Refractory ceramic tubes withstand direct flame contact up to ~1000 °C to 1100 °C."
            },
            "dimensions": "Side length ~50 mm to 65 mm (standard crucible size); Wire extension arms ~70 mm",
            "mainParts": ["Three cylindrical pipeclay ceramic tubes", "Heavy twisted wire core framework", "Three protruding wire corner support arms"],
            "partsAndFunctions": [
                {
                    "partName": "Three cylindrical pipeclay ceramic tubes",
                    "function": "Insulates wire from direct flame heat and cradles the tapered porcelain crucible body",
                    "handlingNotes": "Inspect tubes for cracks or fragmentation."
                },
                {
                    "partName": "Heavy twisted wire core framework",
                    "function": "Maintains equilateral triangle geometry under load at high temperatures",
                    "handlingNotes": "Do not bend or twist wires out of shape."
                },
                {
                    "partName": "Three protruding wire corner support arms",
                    "function": "Rests flat across the top ring of the tripod stand",
                    "handlingNotes": "Ensure arms bridge the tripod ring securely without slipping off."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring structural thermal support equipment."
            },
            "limitations": [
                "If the triangle size is too large for the crucible, the crucible will drop through the center opening",
                "Ceramic tubes can crack and crumble after repeated thermal cycling",
                "Retains intense heat long after the flame is turned off"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect ceramic tubes for cracks or breaks; verify wire framework is rigid",
                "Test crucible fit: place cold crucible in the triangle to confirm it rests securely by its tapered body with at least 1 cm clearance",
                "Place triangle flat on top of the tripod ring with all three wire corners resting securely on the metal ring"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Centering on Tripod",
                    "instruction": "Position the triangle centrally across the circular ring of the tripod stand so all three corner wire loops bridge the ring."
                },
                {
                    "step": 2,
                    "title": "Crucible Seating",
                    "instruction": "Lower the crucible into the center of the triangle using crucible tongs. Confirm the crucible is upright and cannot slip through."
                },
                {
                    "step": 3,
                    "title": "Heating",
                    "instruction": "Slide the lit Bunsen burner underneath so the flame impinges directly onto the bottom base of the crucible through the open triangle."
                },
                {
                    "step": 4,
                    "title": "Cool Down",
                    "instruction": "After heating, extinguish burner. Let triangle and crucible cool undisturbed before attempting to move."
                }
            ],
            "handlingTips": [
                "Always verify crucible sizing beforehand: the crucible bottom should protrude down through the triangle by roughly one-third of its height",
                "Never touch the ceramic tubes or wire arms with bare hands during or after heating"
            ],
            "shutdown": [
                "Allow the clay triangle to cool completely on the tripod stand for at least 15 minutes",
                "Wipe away loose soot with a dry cloth",
                "Store flat in hardware drawers"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Heat-resistant gloves", "Crucible tongs"],
            "hazards": ["Severe thermal contact burns", "Crucible dropping through oversized triangle", "Molten wire collapse if overheated"],
            "warnings": [
                "Never use a clay triangle that is too large for your crucible (crucible will fall through into the flame)",
                "The ceramic tubes and wire arms stay scorching hot long after the flame is extinguished"
            ],
            "actionsToAvoid": [
                "Do not touch the triangle with bare fingers while hot",
                "Do not bend the wire corners sharply (weakens wire and drops assembly)"
            ],
            "emergencyGuidance": [
                "In case of thermal contact burn from hot ceramic or wire, cool immediately under running water for 10 minutes",
                "If a glowing crucible drops through, cut gas supply, step back, and allow to cool"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Allow triangle to cool completely to room temperature",
                "Brush off soot and ash deposits with a dry, stiff brush",
                "Keep dry; do not soak in water (weakens porous clay tubes)"
            ],
            "storageInstructions": [
                "Store flat in designated hardware drawers; do not stack heavy metal stands on top",
                "Keep in dry storage to prevent rusting of the inner steel wire"
            ],
            "maintenanceChecks": [
                "Inspect pipeclay tubes for longitudinal splits or broken segments",
                "Examine wire twists at corners for fatigue or loosening"
            ],
            "troubleshooting": [
                {
                    "problem": "Crucible tilts precariously and threatens to slip through",
                    "possibleCauses": ["Triangle size is too large for the diameter of the crucible used"],
                    "solution": ["Switch to a smaller side-length clay triangle (e.g. 50 mm instead of 65 mm)"],
                    "prevention": ["Always test-fit the crucible in the cold triangle before lighting the burner"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "One ceramic tube cracks and slides off the wire core",
                    "possibleCauses": ["Thermal fatigue from repeated extreme heating cycles"],
                    "solution": ["Retire damaged triangle from service and replace with a sound new unit"],
                    "prevention": ["Inspect ceramic tubes before every heating session"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Triangle slides off the tripod ring when touched",
                    "possibleCauses": ["Wire corner arms are bent inward and do not span the ring diameter"],
                    "solution": ["Straighten corner wire arms so they span past the outside rim of the tripod ring"],
                    "prevention": ["Ensure corner extensions bridge the tripod ring securely"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Using a clay triangle that is too large for the crucible",
                    "whyItMatters": "The crucible drops straight through the center hole into the roaring flame, shattering and spilling molten chemicals",
                    "howToAvoid": "Always test-fit the crucible into the cold triangle to confirm that the rim cannot pass through"
                },
                {
                    "mistake": "Grabbing the wire corner arms of the triangle bare-handed to adjust position while hot",
                    "whyItMatters": "The metal wire conducts heat directly from the flame, causing instant severe blistering burns",
                    "howToAvoid": "Always use crucible tongs or heat-resistant gloves to touch any part of the triangle"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "crucible",
                "relationship": "complementary",
                "reason": "The clay triangle is specially designed to support crucibles during flame heating.",
                "difference": "The clay triangle provides the physical open support; the crucible holds the sample."
            },
            {
                "equipmentId": "tripod-stand",
                "relationship": "complementary",
                "reason": "The clay triangle rests on top of the tripod ring to elevate the crucible over the burner.",
                "difference": "The tripod stand is the metal table frame; the clay triangle is the inner crucible holder."
            },
            {
                "equipmentId": "bunsen-burner",
                "relationship": "complementary",
                "reason": "The burner is positioned directly beneath the open clay triangle to heat the crucible.",
                "difference": "The Bunsen burner generates the flame; the clay triangle holds the vessel in the flame."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "Laboratory Safety Guidance (OSHA 3404-11R)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Document",
                    "supports": ["High-temperature heating hardware, burn hazard controls"]
                },
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Crucible support setups, gravimetric ashing apparatus"]
                }
            ]
        }
    },

    # 38. Water Bath
    {
        "id": "water-bath",
        "pdfNumber": 38,
        "pdfName": "Water Bath",
        "pdfMainUse": "Providing controlled gentle heating",
        "pdfGroup": "Heating, handling and separation",
        "name": "Water Bath",
        "category": "Heating Equipment",
        "purpose": "Provides uniform, thermostatically controlled gentle heating for samples up to 100 °C without open flames.",
        "image": {
            "src": "assets/images/equipment/water-bath.svg",
            "alt": "Digital stainless steel laboratory water bath with digital temperature controller and gabled lid",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/water-bath.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A thermostatically controlled laboratory heating appliance containing a stainless steel reservoir filled with heated water. Delivers gentle, uniform thermal convection up to 100 °C without hotspots or open flames, ideal for warming temperature-sensitive reagents, enzyme digests, and flammable liquids.",
        "alternativeNames": ["Constant temperature bath", "Thermostatic water bath", "Serological water bath", "Steam bath"],
        "commonUses": [
            "Incubating biological samples, enzyme reactions, and bacterial cultures at precise temperatures (e.g. 37 °C)",
            "Heating flammable organic solvents safely below their boiling points without flame hazard",
            "Thawing frozen biological reagents and cell cultures gently",
            "Maintaining reaction temperatures for kinetics experiments"
        ],
        "types": [
            "Standard digital thermostatic water bath (PID temperature control with digital display)",
            "Circulating water bath (integrated pump circulates water for ±0.05 °C temperature uniformity)",
            "Shaking water bath (reciprocating orbital shaker mechanism inside the bath reservoir)",
            "Concentric ring steam bath (bench vessel heated over burner with removable rings for varying flask sizes)"
        ],
        "specifications": {
            "material": ["Seamless stainless steel interior tank (AISI 304)", "Powder-coated steel exterior housing", "Polycarbonate or stainless steel gabled lid"],
            "capacity": {
                "value": "4 to 12",
                "unit": "L",
                "notes": "Standard student laboratory size holds ~6 L to 10 L of water; temperature range from ambient +5 °C to 99.9 °C."
            },
            "dimensions": "Tank internal dimensions ~300 × 240 × 150 mm; External footprint ~380 × 300 × 250 mm",
            "mainParts": ["Seamless stainless steel water tank", "Submerged electric heating element", "Digital PID microprocessor controller and display", "Perforated bottom diffuser tray", "Gabled lid (gable roof design)"],
            "partsAndFunctions": [
                {
                    "partName": "Seamless stainless steel water tank",
                    "function": "Holds the heat transfer liquid (distilled water) without leaking or corrosion",
                    "handlingNotes": "Always keep filled above minimum fill line."
                },
                {
                    "partName": "Submerged electric heating element",
                    "function": "Warms water by electrical resistance heating",
                    "handlingNotes": "Never power on dry (burns out heating element immediately)."
                },
                {
                    "partName": "Perforated bottom diffuser tray",
                    "function": "Elevates vessels off the bottom heating surface and promotes uniform thermal convection",
                    "handlingNotes": "Always leave tray installed on tank floor."
                },
                {
                    "partName": "Gabled lid (gable roof design)",
                    "function": "Prevents evaporation and channels condensing steam droplets down the sides away from sample containers",
                    "handlingNotes": "Lift carefully to avoid steam scalds."
                }
            ],
            "measurementAccuracy": {
                "value": 0.2,
                "unit": "°C",
                "notes": "Digital PID controller maintains temperature uniformity of ±0.2 °C across the bath volume."
            },
            "limitations": [
                "Maximum temperature is strictly limited to approximately 99 °C (boiling point of water at 1 atm)",
                "Never operate without water; running dry burns out heating elements and creates fire hazards",
                "Use only distilled or deionized water to prevent heavy mineral scaling on heater coils"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Check water level inside the tank; verify water level is above the MIN fill line and covers heating coils",
                "Use only distilled or deionized water to prevent calcium mineral scaling",
                "Inspect power cord and ensure the unit is connected to a grounded GFI electrical outlet"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Powering On",
                    "instruction": "Toggle the main power switch ON. The digital temperature display will illuminate showing current bath temperature."
                },
                {
                    "step": 2,
                    "title": "Set Point Selection",
                    "instruction": "Use the up/down arrow buttons to select the desired setpoint temperature (e.g. 50.0 °C)."
                },
                {
                    "step": 3,
                    "title": "Equilibration",
                    "instruction": "Close the gabled lid and wait for the bath to heat up and stabilize at the set point (indicated by controller ready light)."
                },
                {
                    "step": 4,
                    "title": "Sample Immersion",
                    "instruction": "Open lid and place test tube racks, flasks, or beakers on the perforated bottom tray. Ensure vessel openings remain well above the water line."
                }
            ],
            "handlingTips": [
                "Use the gabled roof lid so condensing steam droplets run down the walls rather than dripping directly into open reaction vessels",
                "Add an algaecide/bactericide conditioner to the bath water if operated for long periods at warm biological temperatures"
            ],
            "shutdown": [
                "Remove sample containers and wipe moisture from their bases",
                "Turn off main power switch and unplug if not in routine use",
                "Cover with lid to prevent dust ingress and water evaporation"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Heat-resistant gloves (if operating near 90 °C)"],
            "hazards": ["Steam scalds when lifting lid", "Electrical shock from water spillage into vents", "Boil-dry fire hazard"],
            "warnings": [
                "NEVER power on a water bath with an empty dry tank; element will overheat and catch fire within minutes",
                "Beware of escaping steam when lifting the lid; tilt lid away from your face"
            ],
            "actionsToAvoid": [
                "Do not fill tank with tap water (causes severe mineral scale buildup)",
                "Do not submerge unsealed reaction tubes beneath the water surface"
            ],
            "emergencyGuidance": [
                "In case of steam scald or contact burn, immediately cool under cold tap water for at least 10 minutes",
                "If water spills into the electrical control panel, pull the main wall plug immediately"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Turn off power, unplug unit, and allow water to cool completely",
                "Drain water through the rear drain port into a sink or bucket",
                "Wipe stainless steel interior with mild detergent and sponge; rinse thoroughly and refill with fresh distilled water"
            ],
            "storageInstructions": [
                "If taking out of service, drain completely, dry interior with clean towels, and store covered",
                "Store in clean, dry environment protected from laboratory dust"
            ],
            "maintenanceChecks": [
                "Check water level daily before powering on",
                "Inspect heating element coils monthly for white mineral scale or corrosion pitting"
            ],
            "troubleshooting": [
                {
                    "problem": "Alarm sounds and display flashes 'LOW WATER' or 'DRY'",
                    "possibleCauses": ["Water evaporated below minimum float level sensor"],
                    "solution": ["Turn off unit immediately, add distilled water to nominal fill line, and restart"],
                    "prevention": ["Keep gabled lid closed to minimize evaporative water loss and check level daily"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Water bath temperature fluctuates wildly by several degrees",
                    "possibleCauses": ["Heavy mineral scale insulating temperature sensor", "Poor thermal circulation"],
                    "solution": ["Drain bath, descale with warm 10% citric acid or vinegar solution, rinse, and refill with pure DI water"],
                    "prevention": ["Never use hard tap water in the water bath"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Algae or slimy biofilm grows in the bath water",
                    "possibleCauses": ["Water left sitting at warm biological temperatures (37 °C) without biocide"],
                    "solution": ["Drain and disinfect tank with 70% ethanol or dilute bleach, rinse exhaustively, and add commercial water bath conditioner"],
                    "prevention": ["Change bath water monthly and add antimicrobial bath treatment"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Lifting the hot gabled lid directly toward your face",
                    "whyItMatters": "Trapped scalding steam blasts directly into face and eyes, causing painful second-degree burns",
                    "howToAvoid": "Always angle the lid away from you as you lift, shielding your face from escaping steam"
                },
                {
                    "mistake": "Filling the water bath with hard tap water",
                    "whyItMatters": "Calcium and magnesium carbonate scale coats the heating coils, causing element burnout and inaccurate temperature control",
                    "howToAvoid": "Always fill water baths exclusively with deionized or distilled water"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "hot-plate",
                "relationship": "alternative",
                "reason": "Hot plates heat higher than 100 °C directly; water baths provide gentle, uniform heat up to 100 °C.",
                "difference": "A hot plate provides dry high-temperature surface heat; a water bath provides uniform fluid immersion heating."
            },
            {
                "equipmentId": "thermometer",
                "relationship": "complementary",
                "reason": "Used to independently check and verify water bath temperature calibration.",
                "difference": "The water bath provides the heating environment; the thermometer verifies temperature."
            },
            {
                "equipmentId": "test-tube-rack",
                "relationship": "complementary",
                "reason": "Submersible polypropylene or wire test tube racks hold reaction tubes upright inside the bath.",
                "difference": "The rack supports tubes in the water; the water bath warms the fluid."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "DIN 12876-1: Electrical Laboratory Equipment - Laboratory Circulators and Baths",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Safety classes, low-water cutoff devices, temperature stability ratings"]
                },
                {
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Water bath safety, heating flammable liquids, electrical grounding"]
                }
            ]
        }
    },

    # 39. Magnetic Stirrer
    {
        "id": "magnetic-stirrer",
        "pdfNumber": 39,
        "pdfName": "Magnetic Stirrer",
        "pdfMainUse": "Mixing solutions automatically",
        "pdfGroup": "Heating, handling and separation",
        "name": "Magnetic Stirrer",
        "category": "Heating Equipment",
        "purpose": "Mixes liquid solutions automatically and continuously using a rotating magnetic field and stir bar.",
        "image": {
            "src": "assets/images/equipment/magnetic-stirrer.svg",
            "alt": "Electronic magnetic stirrer with ceramic top plate and rotary speed adjustment knob",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/magnetic-stirrer.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A benchtop device containing an electric motor rotating a strong permanent magnet beneath a flat top plate. When a vessel containing a small PTFE-encapsulated magnetic stir bar (flea) is placed on top, the rotating magnetic field drives the bar, creating a continuous mixing vortex without mechanical shaft intrusion.",
        "alternativeNames": ["Magnetic stir plate", "Magne-stirrer", "Stirrer-hotplate (when combined with heating)"],
        "commonUses": [
            "Dissolving chemical solutes in solvents continuously without manual glass rod stirring",
            "Maintaining uniform reagent mixing and temperature distribution during titrations",
            "Keeping suspensions and insoluble catalysts uniformly dispersed during reactions",
            "Aerating solutions and degassing dissolved gas bubbles"
        ],
        "types": [
            "Standard single-position magnetic stirrer (speed adjustable from ~100 to 1500 rpm)",
            "Combined magnetic stirrer / hot plate (simultaneous heating up to 350-500 °C and stirring)",
            "Multi-position magnetic stirrer (4 to 12 stirring points for parallel screening reactions)",
            "Submersible magnetic stirrer (operates fully submerged inside constant temperature water baths)"
        ],
        "specifications": {
            "material": ["Ceramic or epoxy-coated aluminum top plate", "PTFE-encapsulated magnetic stir bar", "Impact-resistant ABS/aluminum casing"],
            "capacity": {
                "value": "Up to ~2 to 5",
                "unit": "L",
                "notes": "Standard laboratory stirrers mix volumes up to 2 L to 5 L of aqueous solution; speeds range from 100 to 1500 rpm."
            },
            "dimensions": "Top plate ~150 × 150 mm to ~200 × 200 mm, Unit height ~85 mm",
            "mainParts": ["Non-magnetic top plate", "Internal rotating permanent drive magnet", "Rotary speed control knob / digital display", "PTFE magnetic stir bar (flea)", "Magnetic stir bar retriever wand"],
            "partsAndFunctions": [
                {
                    "partName": "Non-magnetic top plate",
                    "function": "Provides flat surface allowing magnetic field lines to pass unimpeded into vessel",
                    "handlingNotes": "Center vessel directly over internal drive magnet."
                },
                {
                    "partName": "PTFE magnetic stir bar (flea)",
                    "function": "Spins inside the liquid vessel driven by magnetic coupling, generating mixing vortex",
                    "handlingNotes": "Select stir bar length matching vessel diameter (~one-third diameter)."
                },
                {
                    "partName": "Rotary speed control knob",
                    "function": "Regulates motor speed to control vortex depth from gentle mixing to rapid agitation",
                    "handlingNotes": "Increase speed gradually from zero to prevent bar decoupling."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "rpm",
                "notes": "Rotational speed regulation typically ±5% to ±10% on analog dial units; ±2 rpm on digital feedback models."
            },
            "limitations": [
                "Ineffective for highly viscous liquids, thick gels, and heavy slurries (requires overhead mechanical paddle stirrer)",
                "Increasing speed too abruptly causes the stir bar to decouple ('spin out') and rattle erratically",
                "Stir bars can be accidentally discarded into chemical waste when pouring out solutions"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Select a clean PTFE magnetic stir bar of appropriate size (approx 1/3 the vessel base diameter)",
                "Place the flat-bottomed beaker or flask in the center of the stir plate",
                "Gently slide the stir bar down the inner wall into the liquid (never drop vertically)"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Centering Vessel",
                    "instruction": "Position the vessel precisely in the center of the plate so the internal magnet couples with the stir bar."
                },
                {
                    "step": 2,
                    "title": "Powering On",
                    "instruction": "Turn on the stirrer power switch with the speed knob set at zero."
                },
                {
                    "step": 3,
                    "title": "Gradual Speed Increase",
                    "instruction": "Turn the speed dial slowly clockwise. Watch the stir bar begin spinning smoothly, then increase speed until a stable, gentle vortex forms."
                },
                {
                    "step": 4,
                    "title": "Recovery",
                    "instruction": "When stirring is complete, turn speed knob to zero and switch off. Use a magnetic retriever wand placed against the outside of the vessel to pull the stir bar out before emptying."
                }
            ],
            "handlingTips": [
                "Always increase speed gradually; turning the dial from zero to maximum instantly causes the bar to decouple and chatter noisily",
                "Use a magnetic stir bar retriever wand to extract the bar from the vessel before dumping contents into waste"
            ],
            "shutdown": [
                "Turn speed knob to zero and switch power OFF",
                "Retrieve, wash, and dry the magnetic stir bar",
                "Wipe top plate clean with a damp cloth and store"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical splash if vortex spills over rim", "Thermal burns (if dual hotplate model)", "Glass bottom chipping if bar dropped"],
            "warnings": [
                "Never drop a magnetic stir bar vertically into an empty glass beaker (punches through the thin glass bottom)",
                "Be aware whether the unit is a simple stirrer or a combination hotplate stirrer (check heat switch)"
            ],
            "actionsToAvoid": [
                "Do not create an overly deep vortex that draws air down into the bar, splashing liquid out",
                "Do not discard stir bars down the sink drain"
            ],
            "emergencyGuidance": [
                "If liquid splashes over the rim due to high stir speed, immediately reduce speed knob to zero",
                "In case of chemical skin splash, rinse thoroughly under running water for 15 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Unplug unit before cleaning housing",
                "Wipe top plate and chassis with a damp cloth and mild neutral detergent",
                "Clean PTFE stir bars with detergent, rinse with acetone and DI water; replace if scratched or discolored"
            ],
            "storageInstructions": [
                "Store stirrers on clean benchtop or equipment shelving",
                "Keep magnetic stir bars organized in a designated compartmentalized box or clinging to a metal strip"
            ],
            "maintenanceChecks": [
                "Inspect PTFE coating on stir bars; discard bars if white coating is worn through exposing the inner magnet",
                "Verify smooth motor rotation without grinding bearing noises"
            ],
            "troubleshooting": [
                {
                    "problem": "Stir bar chatters violently, vibrates in place, and will not spin smoothly ('spin out')",
                    "possibleCauses": ["Speed increased too abruptly", "Vessel not centered over drive magnet", "Liquid too viscous", "Bar length mismatched"],
                    "solution": ["Turn speed to zero to let bar re-couple with magnet, center vessel, and increase speed slowly"],
                    "prevention": ["Always accelerate speed gradually from zero"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Stir bar accidentally poured out into chemical waste container",
                    "possibleCauses": ["Forgot to retrieve bar before disposing of solution"],
                    "solution": ["Use a long magnetic retriever wand to fish the bar out of the waste carboy; rinse thoroughly"],
                    "prevention": ["Hold a magnetic wand against the outside bottom of the beaker while pouring to lock bar in place"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "White PTFE stir bar is stained yellow/brown and cannot be cleaned",
                    "possibleCauses": ["Organic dyes or iodine absorbed into the porous surface of degraded PTFE"],
                    "solution": ["Soak in warm nitric acid or bleach; if stain persists, discard and replace with a fresh stir bar"],
                    "prevention": ["Rinse stir bars immediately following use with reactive dyes"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Dropping a heavy magnetic stir bar straight down into an empty glass beaker",
                    "whyItMatters": "The heavy magnet impacts the fragile glass base like a bullet, cracking or punching a hole through the beaker",
                    "howToAvoid": "Tilt the beaker and gently slide the stir bar down the inside wall, or add liquid first"
                },
                {
                    "mistake": "Cranking the speed knob to maximum instantly from a dead stop",
                    "whyItMatters": "The internal drive magnet outruns the stir bar, causing the bar to decouple, bounce erratically, and splash chemicals",
                    "howToAvoid": "Always start at zero and dial the speed up gradually until the desired vortex forms"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Beakers are the primary flat-bottomed vessel placed on magnetic stirrers for mixing.",
                "difference": "The magnetic stirrer provides the automated drive; the beaker holds the solution."
            },
            {
                "equipmentId": "glass-stirring-rod",
                "relationship": "alternative",
                "reason": "Glass rods perform manual stirring; magnetic stirrers automate continuous mixing.",
                "difference": "A glass rod requires active hand manipulation; a magnetic stirrer runs hands-free."
            },
            {
                "equipmentId": "hot-plate",
                "relationship": "similar",
                "reason": "Many modern laboratory units combine hotplate heating and magnetic stirring in a single chassis.",
                "difference": "A hot plate provides thermal heating; a magnetic stirrer provides rotational agitation."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "UL 61010-2-051: Particular Requirements for Laboratory Equipment for Mixing and Stirring",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Safety standards for magnetic stirrers, motor overload protection"]
                },
                {
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Automated mixing safety, vortex spill prevention"]
                }
            ]
        }
    },

    # 40. Desiccator
    {
        "id": "desiccator",
        "pdfNumber": 40,
        "pdfName": "Desiccator",
        "pdfMainUse": "Keeping samples dry",
        "pdfGroup": "Heating, handling and separation",
        "name": "Desiccator",
        "category": "Cleaning and Storage",
        "purpose": "Stores moisture-sensitive chemicals and cools heated crucibles in a dry, moisture-free atmosphere.",
        "image": {
            "src": "assets/images/equipment/desiccator.svg",
            "alt": "Heavy borosilicate glass vacuum desiccator with ground glass flanged lid, stopcock, and porcelain desiccator plate",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/desiccator.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A heavy, thick-walled glass or polycarbonate enclosure featuring a ground-glass flanged lid and a lower chamber loaded with a chemical drying agent (desiccant such as silica gel). Provides a sealed, dry, humidity-free atmosphere for cooling ignited crucibles and storing hygroscopic reagents.",
        "alternativeNames": ["Vacuum desiccator", "Desiccator cabinet", "Drying jar"],
        "commonUses": [
            "Cooling heated crucibles and weighing bottles to room temperature without absorbing atmospheric moisture",
            "Storing hygroscopic solid chemicals, anhydrous salts, and analytical standards",
            "Drying moist chemical crystal samples under vacuum",
            "Preserving moisture-sensitive infrared spectroscopy (FTIR) KBr pellets"
        ],
        "types": [
            "Standard non-vacuum desiccator (heavy glass with ground lid and knob handle)",
            "Vacuum desiccator (fitted with a vacuum stopcock on the lid to evacuate air for faster drying)",
            "Polycarbonate cabinet desiccator (transparent plastic cabinet with multiple shelves for general storage)"
        ],
        "specifications": {
            "material": ["Heavy borosilicate glass 3.3 (or soda-lime glass)", "Perforated glazed porcelain desiccator plate", "Silicone grease / vacuum grease"],
            "capacity": {
                "value": "150 to 250",
                "unit": "mm",
                "notes": "Internal plate diameter typically 150 mm to 250 mm; holds 2 to 6 crucibles or containers simultaneously."
            },
            "dimensions": "Overall diameter ~260 mm, Total height ~310 mm (typical 200 mm plate size)",
            "mainParts": ["Heavy glass lower chamber", "Perforated porcelain desiccator plate", "Ground glass flanged rim joint", "Heavy glass domed lid with knob/stopcock", "Desiccant reservoir compartment"],
            "partsAndFunctions": [
                {
                    "partName": "Perforated porcelain desiccator plate",
                    "function": "Supports crucibles and sample containers above the desiccant compartment",
                    "handlingNotes": "Perforations allow dry air circulation; place hot items on ceramic."
                },
                {
                    "partName": "Ground glass flanged rim joint",
                    "function": "Forms an airtight hermetic seal when lightly greased with silicone or vacuum grease",
                    "handlingNotes": "Slide lid horizontally to open; never pull vertically."
                },
                {
                    "partName": "Desiccant reservoir compartment",
                    "function": "Lower basin holding moisture-absorbing drying agent (self-indicating silica gel, P4O10, or CaCl2)",
                    "handlingNotes": "Monitor indicator color (blue = dry, pink = exhausted)."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring environmental conditioning and moisture-exclusion apparatus."
            },
            "limitations": [
                "Heavy and cumbersome (~5 to 8 kg); dropping lid or base causes catastrophic breakage and flying glass",
                "Ground glass flanges must be slid horizontally; attempting to pull the lid straight upward can lift the entire heavy base and drop it",
                "Hot objects placed inside temporarily expand air, creating pressure that can unseat the lid if not vented"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect glass base and domed lid for chips, star fractures, or scratches",
                "Check that desiccant in the bottom compartment is active (blue silica gel; if pink, regenerate in oven)",
                "Verify ground-glass flange rim has a thin, uniform film of vacuum grease"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Sliding the Lid",
                    "instruction": "Place one hand firmly on the base and use the other hand to SLIDE the lid horizontally across the flange until an opening is created. Never pull vertically."
                },
                {
                    "step": 2,
                    "title": "Sample Loading",
                    "instruction": "Place warm crucibles, weighing bottles, or hygroscopic reagents onto the perforated porcelain plate."
                },
                {
                    "step": 3,
                    "title": "Relieving Initial Thermal Pressure",
                    "instruction": "If inserting hot crucibles, slide lid almost closed, leaving a 2 mm crack for 10 seconds to allow expanding hot air to vent, then slide completely shut."
                },
                {
                    "step": 4,
                    "title": "Sealing and Cooling",
                    "instruction": "Rotate the lid slightly back and forth to ensure an airtight, clear grease seal across the entire flange. Allow items to cool for 20-30 minutes before opening."
                }
            ],
            "handlingTips": [
                "ALWAYS slide the lid horizontally; never try to pull or pry the lid straight upward",
                "When carrying a desiccator, ALWAYS hold the heavy base with both hands while pressing the lid down with your thumbs"
            ],
            "shutdown": [
                "Slide lid open, remove sample container with tongs, and immediately slide lid closed to preserve internal dryness",
                "Wipe excess grease from outer rim if dust collects",
                "Regenerate pink exhausted silica gel in a drying oven at 120 °C until blue color returns"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves", "Face shield (when evacuating vacuum models)"],
            "hazards": ["Heavy glass drop injury", "Vacuum implosion shrapnel", "Lid popping off from heated expanding air"],
            "warnings": [
                "Never carry a desiccator by holding the lid knob alone (base will detach and crash to the floor)",
                "Vacuum desiccators must be protected with an implosion guard cage or wrapped with tape"
            ],
            "actionsToAvoid": [
                "Do not pull the lid vertically upward against the vacuum/grease seal",
                "Do not place boiling red-hot objects in without venting initial air expansion"
            ],
            "emergencyGuidance": [
                "If a desiccator shatters, clear immediate perimeter and sweep heavy glass into sharps receptacle",
                "Treat cuts by washing under running water and applying sterile dressing"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe old, contaminated grease from the flange rim using a paper towel moistened with hexane or petroleum ether",
                "Wash porcelain plate and glass body with warm soapy water, rinse with DI water, and dry completely",
                "Re-apply a minimal, thin, even film of silicone vacuum grease around the flange"
            ],
            "storageInstructions": [
                "Store on low, sturdy, vibration-free laboratory shelving away from high traffic walkways",
                "Keep lid seated on base with active desiccant inside"
            ],
            "maintenanceChecks": [
                "Inspect silica gel desiccant color weekly; replace or oven-bake when turning pink",
                "Check ground-glass flange for chips or dry spots in the grease seal"
            ],
            "troubleshooting": [
                {
                    "problem": "Lid is stuck fast and cannot be slid open by hand",
                    "possibleCauses": ["Hot object cooled inside with stopcock closed, creating a strong internal vacuum; or old hardened grease"],
                    "solution": ["If vacuum model, open the stopcock to equalize pressure; if non-vacuum, gently warm flange with warm wet cloth or use wooden lever; ask supervisor"],
                    "prevention": ["Always vent hot air briefly before final seating of the lid"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Silica gel turns pink within a few days of regeneration",
                    "possibleCauses": ["Ground-glass flange seal is dry or ungreased, allowing continuous atmospheric moisture ingress", "Lid left open"],
                    "solution": ["Clean and re-grease the flange with fresh silicone vacuum grease; ensure lid is kept closed"],
                    "prevention": ["Maintain a clear, unbroken ring of grease around the entire flange perimeter"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Lid slides off spontaneously when placed over hot crucibles",
                    "possibleCauses": ["Hot crucible heated internal air, creating positive pressure that pushes lubricated lid off"],
                    "solution": ["Hold lid lightly while air vents for 10 seconds before letting go; slide into final position"],
                    "prevention": ["Always vent thermal air expansion for 10 seconds when loading hot items"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Trying to lift the desiccator lid straight upward by pulling on the top knob",
                    "whyItMatters": "The grease and partial vacuum suction hold the lid to the base; pulling upward either fails or lifts the heavy base which then drops and shatters",
                    "howToAvoid": "Always hold the base with one hand and push/slide the lid horizontally across the flange"
                },
                {
                    "mistake": "Carrying a desiccator by holding only the glass lid knob",
                    "whyItMatters": "The heavy 5-kg base detaches under gravity, crashing onto feet or floor, causing severe crushing and flying glass injuries",
                    "howToAvoid": "Always carry a desiccator with both hands cupping the heavy base, using your thumbs to secure the lid"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "crucible",
                "relationship": "complementary",
                "reason": "Hot ignited crucibles are transferred into the desiccator to cool to room temperature without absorbing moisture.",
                "difference": "The crucible is the high-temperature heating vessel; the desiccator is the dry cooling chamber."
            },
            {
                "equipmentId": "analytical-balance",
                "relationship": "complementary",
                "reason": "Samples cooled inside the desiccator are transferred directly to the analytical balance for accurate dry mass measurement.",
                "difference": "The desiccator ensures dry conditions; the analytical balance measures mass."
            },
            {
                "equipmentId": "crucible-tongs",
                "relationship": "complementary",
                "reason": "Crucible tongs transfer hot crucibles onto the perforated porcelain plate inside the desiccator.",
                "difference": "The tongs provide the handling tool; the desiccator is the storage vessel."
            }
        ],
        "metadata": {
            "difficultyLevel": "Beginner",
            "lastReviewed": "",
            "reviewStatus": "needs-review",
            "completeness": {
                "schema": "valid",
                "content": "complete-applicable",
                "evidence": "unverified"
            },
            "references": [
                {
                    "title": "ISO 13130 - Laboratory glassware: Desiccators",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "International Standard",
                    "supports": ["Desiccator dimensions, vacuum safety ratings, flange specifications"]
                },
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Desiccant types, cooling to constant mass, lid sliding protocols"]
                }
            ]
        }
    }
]

print(f"Items 31-40 loaded: {len(ITEMS_31_TO_40)}")
