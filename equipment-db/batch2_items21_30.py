# -*- coding: utf-8 -*-
"""
Batch 2 Items 21-30:
21. bunsen-burner
22. hot-plate
23. thermometer
24. analytical-balance
25. top-pan-balance
26. retort-stand
27. clamp-and-boss-head
28. tripod-stand
29. wire-gauze
30. crucible-tongs
"""

ITEMS_21_TO_30 = [
    # 21. Bunsen Burner
    {
        "id": "bunsen-burner",
        "pdfNumber": 21,
        "pdfName": "Bunsen Burner",
        "pdfMainUse": "Heating substances using a flame",
        "pdfGroup": "Heating, handling and separation",
        "name": "Bunsen Burner",
        "category": "Heating Equipment",
        "purpose": "Produces an open gas flame with adjustable temperature for heating, combustion, and sterilization.",
        "image": {
            "src": "assets/images/equipment/bunsen-burner.svg",
            "alt": "Metal Bunsen burner with heavy cast iron base, vertical barrel, and adjustable rotating air collar",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/bunsen-burner.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A metal gas burner consisting of a vertical tube mounted on a heavy weighted base with a gas inlet and an adjustable rotating air collar. Regulating air intake alters combustion from a cool, luminous yellow safety flame to a hot, non-luminous roaring blue flame exceeding 1000 °C.",
        "alternativeNames": ["Tirrill burner (threaded needle valve variant)", "Meker burner (high-heat grid variant)", "Gas burner"],
        "commonUses": [
            "Heating liquids in beakers and flasks supported on tripods and wire gauzes",
            "Igniting and ashing solid samples in porcelain crucibles",
            "Performing flame tests to identify metal cations by characteristic emission colors",
            "Sterilizing bacteriological inoculating loops in microbiology"
        ],
        "types": [
            "Standard Bunsen burner (rotating collar sleeve controls air intake)",
            "Tirrill burner (includes threaded gas needle valve at base for independent gas flow regulation)",
            "Meker-Fisher burner (wide flared top with nickel grid producing multiple hot flame cones up to 1200 °C)"
        ],
        "specifications": {
            "material": ["Chrome-plated brass barrel", "Cast iron or die-cast zinc base", "Neoprene gas tubing"],
            "capacity": {
                "value": "Up to ~1100",
                "unit": "°C",
                "notes": "Maximum non-luminous blue flame temperature is approximately 1100 °C (hottest zone at tip of inner blue cone)."
            },
            "dimensions": "Height ~150 mm, Base diameter ~80 mm, Barrel outer diameter ~13 mm",
            "mainParts": ["Heavy weighted base", "Serrated gas inlet nozzle", "Adjustable air vent collar sleeve", "Vertical mixing barrel tube", "Burner flame orifice"],
            "partsAndFunctions": [
                {
                    "partName": "Heavy weighted base",
                    "function": "Provides low center of gravity to prevent the burner from tipping over when tubing is moved",
                    "handlingNotes": "Place flat in center of bench; inspect for stability."
                },
                {
                    "partName": "Adjustable air vent collar sleeve",
                    "function": "Rotates to open or close the air holes, controlling oxygen-to-gas ratio and flame type",
                    "handlingNotes": "Always close air holes before lighting."
                },
                {
                    "partName": "Vertical mixing barrel tube",
                    "function": "Mixes gas stream with aspirated air before combustion at the top rim",
                    "handlingNotes": "Barrel becomes extremely hot during operation; touch only the base."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring thermal energy generator."
            },
            "limitations": [
                "Strictly prohibited when volatile flammable organic solvents (e.g. ether, hexane) are present on the bench",
                "Requires continuous observation; can strike back (burn internally at the base orifice) if air intake is too high",
                "Dependent on a plumbed natural gas (methane) or LPG supply line"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Clear bench of all flammable solvents, paper, and clutter within a 1-meter radius",
                "Inspect flexible rubber tubing for dry rot, cracks, or loose fittings; connect securely to gas jet and burner base",
                "Rotate the air collar to ensure the air holes are completely CLOSED (for yellow safety flame ignition)"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Sparker Readiness",
                    "instruction": "Have a friction spark lighter (striker) or long-reach butane lighter ready in your hand above the barrel top."
                },
                {
                    "step": 2,
                    "title": "Gas Valve Opening",
                    "instruction": "Turn on the bench gas supply valve halfway and strike the lighter immediately roughly 3 cm above the barrel rim."
                },
                {
                    "step": 3,
                    "title": "Safety Flame Verification",
                    "instruction": "Confirm a yellow, luminous flame appears. If flame does not light within 3 seconds, turn off gas, wait 1 minute for gas dissipation, and retry."
                },
                {
                    "step": 4,
                    "title": "Air Collar Adjustment",
                    "instruction": "Rotate the air collar slowly to open air vents until a distinct, quiet double-cone blue heating flame forms."
                }
            ],
            "handlingTips": [
                "Always close the air collar back to the visible yellow safety flame whenever stepping away briefly from the workstation",
                "Touch only the heavy base when adjusting burner position; the barrel becomes dangerously hot"
            ],
            "shutdown": [
                "Close the air collar to return to the yellow safety flame",
                "Turn off the bench gas supply tap completely (handle perpendicular to the nozzle)",
                "Allow burner and support hardware to cool completely before storing"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat (cotton)", "Tied-back long hair", "No loose clothing or dangling jewelry"],
            "hazards": ["Open flame burns", "Flash ignition of solvent vapors", "Internal combustion flashback burns"],
            "warnings": [
                "Never light a Bunsen burner with air vents open (high risk of strike-back)",
                "NEVER use an open flame burner in a laboratory where volatile flammable solvents are present"
            ],
            "actionsToAvoid": [
                "Do not leave an active burner unattended under any circumstances",
                "Do not touch the metal barrel with bare hands after lighting"
            ],
            "emergencyGuidance": [
                "In case of strike-back (roaring noise, green flame at base), immediately turn off bench gas supply tap",
                "If clothing catches fire, immediately Stop, Drop, and Roll or use safety shower / fire blanket"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Allow burner to cool down completely to ambient temperature",
                "Unscrew barrel from base to inspect internal gas orifice jet",
                "Clean soot and salt deposits with a fine brass wire brush and wipe barrel with a dry cloth"
            ],
            "storageInstructions": [
                "Store in designated hardware cupboards with gas tubing disconnected or neatly coiled without kinks",
                "Keep in dry atmosphere to prevent cast iron base oxidation"
            ],
            "maintenanceChecks": [
                "Inspect gas tubing for rubber perish cracks, elasticity loss, or loose fittings",
                "Ensure rotating air collar turns smoothly without sticking"
            ],
            "troubleshooting": [
                {
                    "problem": "Burner strikes back: flame burns inside the barrel at the gas jet with a loud hissing roar",
                    "possibleCauses": ["Air collar opened too wide before lighting", "Gas pressure too low", "Sudden draft across bench"],
                    "solution": ["Immediately turn off the main bench gas valve, let barrel cool, close air collar, and re-light properly"],
                    "prevention": ["Always ignite with air collar fully closed in the safety flame position"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Heavy black soot deposits on the bottom of heated glassware",
                    "possibleCauses": ["Heated glassware directly in the yellow luminous safety flame where incomplete combustion occurs"],
                    "solution": ["Open the air collar to introduce oxygen until a non-luminous blue heating flame is achieved"],
                    "prevention": ["Never heat reaction vessels over the yellow flame"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Gas smell detected before or during lighting",
                    "possibleCauses": ["Loose tubing connection at burner or bench tap", "Cracked rubber hose", "Unignited gas accumulation"],
                    "solution": ["Immediately shut off bench gas valve; inspect and replace damaged tubing or tighten clamp"],
                    "prevention": ["Inspect rubber hose along its entire length before opening gas supply"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Leaving the air collar open while attempting to light the burner with a sparker",
                    "whyItMatters": "Air-gas mixture velocity is too high, causing repeated failed sparks or immediate violent strike-back into the base",
                    "howToAvoid": "Always rotate the collar sleeve to completely shut the air holes before turning on the gas"
                },
                {
                    "mistake": "Reaching across an active Bunsen burner flame to grab equipment",
                    "whyItMatters": "Sleeves or hair instantly catch fire, resulting in catastrophic third-degree burns",
                    "howToAvoid": "Arrange work area so no equipment is behind the burner; keep arm movements strictly to the side"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "tripod-stand",
                "relationship": "complementary",
                "reason": "The tripod stand straddles the Bunsen burner to elevate vessels directly over the flame.",
                "difference": "The burner is the heat source; the tripod is the static structural support."
            },
            {
                "equipmentId": "wire-gauze",
                "relationship": "complementary",
                "reason": "Placed on the tripod above the burner to diffuse the concentrated flame heat safely across glassware.",
                "difference": "The wire gauze distributes heat; the burner produces the flame."
            },
            {
                "equipmentId": "hot-plate",
                "relationship": "alternative",
                "reason": "Hot plates provide flameless electric heating, making them safer for flammable solvent mixtures.",
                "difference": "A Bunsen burner uses an open gas flame; a hot plate uses electric resistance heating without a flame."
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
                    "title": "Prudent Practices in the Laboratory: Handling and Management of Chemical Hazards",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Open flame precautions, strike-back procedures, flammable solvent restrictions"]
                },
                {
                    "title": "Laboratory Safety Guidance (OSHA 3404-11R)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Document",
                    "supports": ["Burner inspection protocols, tubing maintenance"]
                }
            ]
        }
    },

    # 22. Hot Plate
    {
        "id": "hot-plate",
        "pdfNumber": 22,
        "pdfName": "Hot Plate",
        "pdfMainUse": "Heating solutions without a direct flame",
        "pdfGroup": "Heating, handling and separation",
        "name": "Hot Plate",
        "category": "Heating Equipment",
        "purpose": "Heats chemical solutions safely using an electric resistance element without an open flame.",
        "image": {
            "src": "assets/images/equipment/hot-plate.svg",
            "alt": "Electronic laboratory hot plate with white ceramic top and temperature adjustment dial",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/hot-plate.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A benchtop electrical heating device featuring a flat, chemically resistant ceramic or aluminum top plate with internal heating elements and variable thermostat control. Provides uniform, controllable heat without an open flame, making it standard for heating organic and aqueous liquids.",
        "alternativeNames": ["Electric hot plate", "Laboratory hot plate", "Ceramic hot plate"],
        "commonUses": [
            "Heating aqueous and organic solutions safely without an open flame",
            "Boiling liquids and dissolving chemical reagents in beakers and conical flasks",
            "Evaporating solvents under a chemical fume hood",
            "Maintaining reaction temperatures using an external thermocouple feedback probe"
        ],
        "types": [
            "Ceramic top hot plate (bright white, exceptional chemical and corrosion resistance up to 500 °C)",
            "Aluminum top hot plate (superior thermal conductivity and edge-to-edge temperature uniformity)",
            "Digital microprocessor hot plate (digital temperature display with PT100 temperature sensor feedback)"
        ],
        "specifications": {
            "material": ["Solid ceramic top plate (pyroceram)", "Die-cast aluminum body", "Stainless steel chassis"],
            "capacity": {
                "value": "Up to ~450 to 500",
                "unit": "°C",
                "notes": "Maximum surface temperature typically ranges between 350 °C and 540 °C depending on model."
            },
            "dimensions": "Top surface ~180 × 180 mm or ~250 × 250 mm, Height ~100 mm",
            "mainParts": ["Ceramic/aluminum heating plate surface", "Temperature control dial / digital display", "Hot surface warning indicator LED", "Mains power switch and grounded cord"],
            "partsAndFunctions": [
                {
                    "partName": "Ceramic/aluminum heating plate surface",
                    "function": "Transfers heat by direct conduction into flat-bottomed glassware resting on it",
                    "handlingNotes": "Keep surface clean and wipe away chemical crusts."
                },
                {
                    "partName": "Temperature control dial / digital display",
                    "function": "Regulates electrical current to maintain desired surface or solution temperature",
                    "handlingNotes": "Adjust gradually to avoid thermal shock to glassware."
                },
                {
                    "partName": "Hot surface warning indicator LED",
                    "function": "Illuminates whenever top surface exceeds 50 °C, remaining lit even after unit is switched off",
                    "handlingNotes": "Never touch top plate when warning light is illuminated."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "°C",
                "notes": "Standard dial hot plates regulate thermal output nominally (±5 °C to ±10 °C); digital feedback models accurate to ±1 °C with external probe."
            },
            "limitations": [
                "Surface remains dangerously hot for 30 to 45 minutes after being powered off",
                "Round-bottom flasks cannot make adequate thermal contact on a flat hot plate without an aluminum heating mantle block or oil bath",
                "Non-explosion-proof models can ignite solvent vapors if liquid spills into internal electrical chassis"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect ceramic top plate for cracks or chips; inspect electrical power cord for cuts",
                "Place on a dry, level, stable lab bench away from flammables and water sinks",
                "Confirm glassware to be heated is flat-bottomed borosilicate glass"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Glassware Placement",
                    "instruction": "Center the flat-bottomed beaker or flask in the middle of the cold or warming top plate."
                },
                {
                    "step": 2,
                    "title": "Powering On",
                    "instruction": "Plug into a grounded wall outlet and toggle the main power switch ON."
                },
                {
                    "step": 3,
                    "title": "Temperature Setting",
                    "instruction": "Set the temperature control dial to the required setting. If boiling water, turn dial to medium-high."
                },
                {
                    "step": 4,
                    "title": "Monitoring",
                    "instruction": "Observe solution boiling or heating. Use boiling chips or a magnetic stir bar to prevent sudden superheated eruption (bumping)."
                }
            ],
            "handlingTips": [
                "Always add boiling chips or a stir bar before heating begins to ensure smooth nucleation",
                "Never place an empty dry glass vessel onto a preheated hot plate (causes thermal shock cracking)"
            ],
            "shutdown": [
                "Rotate temperature dial to OFF (minimum position) and turn off main power switch",
                "Leave the hot plate plugged in if it has an active cooling fan or 'HOT' warning light",
                "Do not touch or clean top plate until the 'HOT' warning LED extinguishes"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Heat-resistant silicone gloves", "Nitrile gloves"],
            "hazards": ["Severe contact thermal burns", "Electrical shock from spilled conductive liquids", "Solvent vapor ignition"],
            "warnings": [
                "A hot plate surface looks identical hot or cold; always assume the plate is hot unless confirmed cool",
                "Do not heat volatile solvents near non-spark-proof electric switches"
            ],
            "actionsToAvoid": [
                "Do not allow electrical cords to drape across or touch the hot top plate surface",
                "Do not quench a hot ceramic plate with cold water (causes ceramic plate to crack)"
            ],
            "emergencyGuidance": [
                "In case of thermal contact burn, flush area immediately with cool water for at least 10 minutes",
                "If liquid spills into internal vents, immediately pull mains power plug from wall"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wait until top plate is completely cold ('HOT' indicator LED is completely off)",
                "Wipe ceramic surface with a damp cloth and mild non-abrasive household cleaner",
                "Do not use abrasive steel wool or harsh scouring pads that scratch the ceramic glaze"
            ],
            "storageInstructions": [
                "Store on dry benchtop or equipment shelving with electrical cord neatly wound",
                "Keep in clean, dry environment protected from corrosive chemical fumes"
            ],
            "maintenanceChecks": [
                "Regularly inspect electrical cord for fraying, burns, or cracked insulation",
                "Verify that the 'HOT' warning light illuminates whenever the plate warms above 50 °C"
            ],
            "troubleshooting": [
                {
                    "problem": "Hot plate fails to warm up when dial is turned",
                    "possibleCauses": ["Power cord unplugged or GFI wall breaker tripped", "Internal thermal fuse blown"],
                    "solution": ["Check wall plug and reset GFI outlet; if breaker is fine, submit unit to technician for fuse check"],
                    "prevention": ["Do not overload electrical circuits with multiple high-wattage hot plates"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Liquid boils violently in sudden bursts (bumping)",
                    "possibleCauses": ["Lack of boiling stones or active stirring creating superheating"],
                    "solution": ["Turn down heat; if cool enough, carefully drop in 2-3 boiling stones or activate magnetic stirrer"],
                    "prevention": ["Always add boiling stones or a stir bar BEFORE applying heat"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Top ceramic plate is chipped or cracked across center",
                    "possibleCauses": ["Thermal shock from spilling ice water on hot ceramic", "Heavy mechanical impact"],
                    "solution": ["Immediately remove unit from service; cracked ceramic plates leak liquids into live electronics"],
                    "prevention": ["Avoid dropping heavy metal clamps on plate and protect from cold liquid splashes"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Touching the top plate with an unwary hand because it 'does not look hot'",
                    "whyItMatters": "Ceramic and aluminum hot plates show no visible change when heated to 300 °C, causing instant full-thickness burns",
                    "howToAvoid": "Always look for the illuminated 'HOT' warning LED and hold a hand 10 cm above to feel radiant heat first"
                },
                {
                    "mistake": "Allowing the power cord to rest against the edge of the heated plate",
                    "whyItMatters": "The hot plate melts through the PVC insulation in seconds, causing short circuits, sparks, and electrical shock",
                    "howToAvoid": "Route electrical cords backward, away from the heated surface"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "magnetic-stirrer",
                "relationship": "similar",
                "reason": "Many modern laboratory units combine hot plate heating with magnetic stirring in one single chassis.",
                "difference": "A hot plate provides thermal heating only; a magnetic stirrer provides rotational mixing."
            },
            {
                "equipmentId": "bunsen-burner",
                "relationship": "alternative",
                "reason": "Both heat reaction vessels, but hot plates eliminate the open flame hazards of Bunsen burners.",
                "difference": "Hot plates use flameless electric heat; Bunsen burners use open combustion gas flames."
            },
            {
                "equipmentId": "water-bath",
                "relationship": "alternative",
                "reason": "Water baths provide highly precise, gentle temperature control below 100 °C.",
                "difference": "A hot plate delivers high direct surface heat; a water bath provides uniform low-temperature fluid immersion."
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
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Electric heating safety, spark-free heating of flammable solvents"]
                },
                {
                    "title": "UL 61010-1: Safety Requirements for Electrical Equipment for Measurement, Control, and Laboratory Use",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Electrical insulation standards, hot surface warning indicators"]
                }
            ]
        }
    },

    # 23. Thermometer
    {
        "id": "thermometer",
        "pdfNumber": 23,
        "pdfName": "Thermometer",
        "pdfMainUse": "Measuring temperature",
        "pdfGroup": "Heating, handling and separation",
        "name": "Thermometer",
        "category": "Measuring Instruments",
        "purpose": "Measures the temperature of liquids, vapors, and thermal baths during reactions.",
        "image": {
            "src": "assets/images/equipment/thermometer.svg",
            "alt": "Glass laboratory liquid-in-glass thermometer with red non-mercury spirit and degree Celsius graduations",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/thermometer.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "An instrument designed to quantify thermal state and temperature changes. Standard student laboratory models are liquid-in-glass thermometers containing dyed red spirit (alcohol) calibrated along an etched stem scale in degrees Celsius.",
        "alternativeNames": ["Liquid-in-glass thermometer", "Lab thermometer", "Spirit thermometer", "Digital thermocouple probe"],
        "commonUses": [
            "Monitoring boiling point plateaus during distillation procedures",
            "Measuring temperature rises or drops during calorimetry and thermochemistry experiments",
            "Verifying water bath and oil bath temperatures for reaction maintenance",
            "Recording ambient air and solvent temperatures during volumetric calibration"
        ],
        "types": [
            "Partial immersion liquid-in-glass thermometer (calibrated to be immersed up to etched immersion line, ~76 mm)",
            "Total immersion liquid-in-glass thermometer (calibrated with entire liquid column submerged in the fluid)",
            "Digital digital probe thermometer (thermocouple or thermistor probe with rapid LCD digital readout)"
        ],
        "specifications": {
            "material": ["Borosilicate glass stem", "Dyed hydrocarbon/alcohol spirit (non-mercury)", "Plastic anti-roll collar ring"],
            "capacity": {
                "value": "-10 to 110",
                "unit": "°C",
                "notes": "Standard student range is -10 °C to 110 °C (graduated in 1 °C divisions); high-temp spirit models reach up to 250 °C."
            },
            "dimensions": "Overall length ~300 mm, Stem outer diameter ~6 to 7 mm",
            "mainParts": ["Bulb reservoir with thermometric liquid", "Fine capillary glass bore", "Stem with etched Celsius graduations", "Immersion depth line", "Anti-roll triangle ring"],
            "partsAndFunctions": [
                {
                    "partName": "Bulb reservoir with thermometric liquid",
                    "function": "Thin-walled glass chamber holding the volume of liquid that expands upon warming",
                    "handlingNotes": "Fragile thin glass; never strike against container bottom."
                },
                {
                    "partName": "Fine capillary glass bore",
                    "function": "Translates tiny thermal volumetric expansions into large, readable linear liquid column movements",
                    "handlingNotes": "Inspect for gas bubble separations in the column."
                },
                {
                    "partName": "Stem with etched Celsius graduations",
                    "function": "Displays calibrated numerical temperature scale with permanent enamel markings",
                    "handlingNotes": "Align eye level strictly perpendicular to top of column."
                }
            ],
            "measurementAccuracy": {
                "value": 1.0,
                "unit": "°C",
                "notes": "Standard laboratory spirit thermometer tolerance is ±1.0 °C to ±1.5 °C; precision calibrated thermometers reach ±0.1 °C."
            },
            "limitations": [
                "Alcohol spirit liquid columns can separate into detached segments if subjected to mechanical vibration or freezing",
                "Glass stem is fragile and snaps easily if used improperly as a stirring rod",
                "Mercury thermometers, though highly accurate, are heavily phased out in student labs due to toxic vapor spill hazards"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the thermometer stem and bulb under good lighting for cracks",
                "Examine the colored liquid column to ensure it is continuous and free from separated liquid breaks",
                "Check whether the thermometer is partial immersion (marked with an etched ring, usually 76 mm) or total immersion"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Immersion",
                    "instruction": "Immerse the thermometer bulb into the center of the liquid. For partial immersion models, submerge exactly to the etched line (~76 mm)."
                },
                {
                    "step": 2,
                    "title": "Clearance",
                    "instruction": "Suspend the thermometer with a clamp or hold it so the bulb hovers in the liquid without touching the hot bottom or walls of the beaker."
                },
                {
                    "step": 3,
                    "title": "Thermal Equilibration",
                    "instruction": "Wait 30 to 60 seconds until the top of the fluid column remains completely stationary."
                },
                {
                    "step": 4,
                    "title": "Reading the Temperature",
                    "instruction": "Read the top of the meniscus with your eyes positioned directly horizontal with the graduation mark to prevent parallax error."
                }
            ],
            "handlingTips": [
                "NEVER use a thermometer as a stirring rod to mix solutions; the thin bulb shatters easily",
                "Fit a rubber anti-roll triangle near the top of the stem so the thermometer cannot roll off the bench"
            ],
            "shutdown": [
                "Remove from liquid, allow to cool gradually to room temperature before washing",
                "Rinse with deionized water and wipe dry with a soft tissue",
                "Store in its plastic protective storage sleeve"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Broken glass puncture wounds", "Thermal burns from hot liquids", "Mercury vapor poisoning (if vintage mercury model used)"],
            "warnings": [
                "Never use a laboratory thermometer to stir chemical solutions",
                "If a mercury thermometer breaks, immediately notify instructor; evacuate room and deploy specialized mercury amalgam spill kit"
            ],
            "actionsToAvoid": [
                "Do not exceed the maximum calibrated temperature on the scale (bulb will burst)",
                "Do not plunge a hot thermometer directly into cold tap water (thermal shock breakage)"
            ],
            "emergencyGuidance": [
                "If broken spirit thermometer cuts fingers, wash wound under water, apply sterile dressing, and report to supervisor",
                "Sweep broken glass into sharps disposal container"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Allow thermometer to cool to room temperature",
                "Wash the glass stem and bulb with a sponge moistened in warm soapy water",
                "Rinse with tap water, finish with deionized water, and wipe dry with a soft cloth"
            ],
            "storageInstructions": [
                "Store vertically or slightly inclined in a dedicated thermometer carousel rack or in padded plastic storage tubes",
                "Keep away from bench edges"
            ],
            "maintenanceChecks": [
                "Check for separated spirit column segments before every lab period",
                "Verify 0 °C reading periodically in an ice-water equilibrium slurry"
            ],
            "troubleshooting": [
                {
                    "problem": "Liquid column has a gap or bubble separated from the main liquid body",
                    "possibleCauses": ["Mechanical shock from dropping, or inverted storage"],
                    "solution": ["Gently cool the bulb in an ice-salt bath until all liquid retracts into the bulb, then allow to warm slowly; or tap gently against a soft rubber stopper"],
                    "prevention": ["Always store thermometers upright or in padded cases"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Thermometer consistently reads 2-3 °C higher than expected in ice water",
                    "possibleCauses": ["Used a total immersion thermometer with only the bulb submerged (stem exposure error)"],
                    "solution": ["Submerge the thermometer to its correct immersion depth, or apply stem emergent stem temperature correction formula"],
                    "prevention": ["Check whether thermometer is labeled 'Total Immersion' or '76 mm Immersion'"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Thermometer bulb shatters inside a boiling beaker",
                    "possibleCauses": ["Struck the bulb against the hot bottom of the beaker while stirring"],
                    "solution": ["Turn off heat immediately, treat solution as contaminated waste, and sweep glass into sharps bin"],
                    "prevention": ["Clamp thermometer securely suspended in the center of the solution; never touch vessel walls"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Using a thermometer to stir a solution or dissolve solute crystals",
                    "whyItMatters": "Thermometer bulbs are made of extremely thin glass for rapid heat conduction; stirring easily snaps the bulb, ruining the experiment",
                    "howToAvoid": "Always use a solid glass stirring rod or magnetic stirrer for mixing"
                },
                {
                    "mistake": "Resting the thermometer bulb directly against the bottom of a heated beaker",
                    "whyItMatters": "The vessel bottom is much hotter than the bulk liquid, giving false high temperature readings and risking thermal stress breakage",
                    "howToAvoid": "Clamp the thermometer so the bulb is suspended in the middle of the liquid volume"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "distillation-apparatus",
                "relationship": "complementary",
                "reason": "Thermometers are positioned at the distillation still-head adapter to measure vapor boiling points.",
                "difference": "The thermometer measures vapor temperature; the distillation apparatus performs the separation."
            },
            {
                "equipmentId": "water-bath",
                "relationship": "complementary",
                "reason": "Thermometers verify and monitor the bath fluid temperature during gentle warming.",
                "difference": "The water bath provides the heat; the thermometer measures the resulting temperature."
            },
            {
                "equipmentId": "glass-stirring-rod",
                "relationship": "alternative",
                "reason": "Glass rods must be used for stirring, preventing students from mistakenly stirring with thermometers.",
                "difference": "A glass rod is a solid stirring tool; a thermometer is a fragile measuring instrument."
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
                    "title": "ASTM E1 - Standard Specification for ASTM Liquid-in-Glass Thermometers",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Scale ranges, emergent stem corrections, tolerances"]
                },
                {
                    "title": "NIST SP 250-23: Liquid-in-Glass Thermometer Calibration Service",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Metrology Standard",
                    "supports": ["Immersion line specifications, calibration ice-point tests"]
                }
            ]
        }
    },

    # 24. Analytical Balance
    {
        "id": "analytical-balance",
        "pdfNumber": 24,
        "pdfName": "Analytical Balance",
        "pdfMainUse": "Measuring mass precisely",
        "pdfGroup": "Heating, handling and separation",
        "name": "Analytical Balance",
        "category": "Measuring Instruments",
        "purpose": "Measures small chemical masses with high analytical precision down to 0.1 mg (0.0001 g).",
        "image": {
            "src": "assets/images/equipment/analytical-balance.svg",
            "alt": "Electronic analytical balance with glass draft shield chamber and stainless steel pan",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/analytical-balance.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A high-precision mass-measuring electronic instrument featuring a glass draft shield enclosure to protect the weighing pan from air currents. Utilizes electromagnetic force restoration (EMFR) technology to measure masses with a readability of 0.1 mg (0.0001 g) or better.",
        "alternativeNames": ["Precision analytical balance", "4-decimal balance", "Microbalance (higher sensitivity variant)"],
        "commonUses": [
            "Weighing primary standards for high-accuracy titrimetric standard solutions",
            "Gravimetric quantitative analysis (weighing filter crucibles and precipitates to constant mass)",
            "Preparing calibration standards for HPLC, GC-MS, and spectrophotometry",
            "Determining moisture content and ash mass in analytical assays"
        ],
        "types": [
            "Standard analytical balance (readability 0.1 mg / 0.0001 g, capacity ~120 g to 220 g)",
            "Semi-micro balance (dual range, readability 0.01 mg / 0.00001 g up to ~80 g)",
            "Microbalance (readability 0.001 mg / 1 µg for microgram-level quantitative chemistry)"
        ],
        "specifications": {
            "material": ["Die-cast aluminum housing", "Stainless steel weighing pan", "Glass draft shield panels"],
            "capacity": {
                "value": "120 to 220",
                "unit": "g",
                "notes": "Maximum weighing capacity is typically 120 g to 220 g; readability is 0.0001 g (0.1 mg)."
            },
            "dimensions": "Overall footprint ~215 × 345 mm, Height ~345 mm; Chamber height ~240 mm",
            "mainParts": ["Glass draft shield sliding doors", "Stainless steel weighing pan", "Electromagnetic force compensation cell", "Digital LCD display", "Leveling bubble spirit indicator", "Adjustable leveling feet"],
            "partsAndFunctions": [
                {
                    "partName": "Glass draft shield sliding doors",
                    "function": "Shields the delicate weighing pan from ambient air currents, drafts, and breathing",
                    "handlingNotes": "Keep doors completely closed during reading."
                },
                {
                    "partName": "Stainless steel weighing pan",
                    "function": "Supports the sample container centrally over the weighing cell",
                    "handlingNotes": "Never touch with bare fingers; keep clean with camel-hair brush."
                },
                {
                    "partName": "Leveling bubble spirit indicator",
                    "function": "Displays horizontal alignment of balance; bubble must be centered in the circle",
                    "handlingNotes": "Adjust the front leveling feet until bubble is centered."
                }
            ],
            "measurementAccuracy": {
                "value": 0.0001,
                "unit": "g",
                "notes": "Readability and linearity is ±0.0001 g (0.1 mg); repeatability (standard deviation) is ~0.0001 g."
            },
            "limitations": [
                "Extremely sensitive to ambient room drafts, vibrations, static electricity, and temperature changes",
                "Maximum capacity is typically around 200 g; placing heavy objects damages the electromagnetic sensor",
                "Never add or scoop chemicals inside the draft chamber (spilled powders ruin mechanics)"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Verify the leveling bubble is centered inside the target ring; adjust leveling feet if off-center",
                "Ensure balance pan and chamber floor are completely clean and dust-free",
                "Check that the balance has been powered on for at least 30 minutes to achieve thermal equilibrium"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Zeroing",
                    "instruction": "Close all draft shield doors and press the TARE or ZERO key. Confirm display shows 0.0000 g."
                },
                {
                    "step": 2,
                    "title": "Vessel Placement",
                    "instruction": "Slide open the draft door, place a clean weighing boat or weighing bottle onto the center of the pan with forceps or gloved hands, and close the door."
                },
                {
                    "step": 3,
                    "title": "Taring Container",
                    "instruction": "Press the TARE button to zero the mass of the vessel, returning the readout to 0.0000 g."
                },
                {
                    "step": 4,
                    "title": "Chemical Addition and Reading",
                    "instruction": "Remove vessel from the chamber to add chemical (or dispense cautiously over boat), re-insert, close all doors, wait for stability indicator (circle or asterisk), and record mass."
                }
            ],
            "handlingTips": [
                "Always close all draft shield doors completely before reading the measurement",
                "Never lean your elbows heavily on the balance marble table; body pressure causes deflection and drift"
            ],
            "shutdown": [
                "Remove weighing vessel and sample from the chamber",
                "Inspect pan and floor; sweep any spilled powder gently with a camel-hair balance brush",
                "Close all draft doors and leave balance on standby mode as recommended by manufacturer"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves (clean, powder-free)"],
            "hazards": ["Chemical inhalation from fine powders", "Corrosion of load cell from spills", "Skin contact"],
            "warnings": [
                "Never exceed the maximum rated capacity (e.g. 200 g); overload destroys the electromagnetic sensor",
                "Never weigh hot or cold objects; thermal buoyancy and convection cause severe reading errors"
            ],
            "actionsToAvoid": [
                "Do not add chemical powders into a container resting directly on the pan inside the chamber",
                "Do not blow with your mouth into the weighing chamber to clear dust"
            ],
            "emergencyGuidance": [
                "If corrosive acid or hazardous powder spills on the balance, notify supervisor immediately for safe removal",
                "Treat skin contact by washing with soap and water"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Use a soft camel-hair brush to sweep loose powder from the pan and chamber floor",
                "Wipe stainless steel pan with a lint-free tissue lightly dampened with deionized water or ethanol",
                "Never use aggressive chemical solvents that dissolve chamber plastic trims"
            ],
            "storageInstructions": [
                "Install permanently on a heavy, vibration-isolated marble balance table away from doors and air conditioning vents",
                "Keep draft shield doors closed at all times when not actively in use"
            ],
            "maintenanceChecks": [
                "Perform daily calibration check using certified Class 1 or E2 stainless steel calibration weights",
                "Check level spirit bubble before every weighing session"
            ],
            "troubleshooting": [
                {
                    "problem": "Readout digits drift continuously upward or downward without stabilizing",
                    "possibleCauses": ["Weighed object is warm or cold (convection currents)", "Object is gaining/losing moisture", "Draft doors slightly open"],
                    "solution": ["Equilibrate object to room temperature in a desiccator before weighing; close draft doors fully"],
                    "prevention": ["Always let samples reach thermal equilibrium at 20 °C before analytical weighing"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Display jumps erratically when operator hands move near draft shield",
                    "possibleCauses": ["Static electricity on operator gloves, plastic weigh boat, or glass chamber panels"],
                    "solution": ["Use antistatic weighing boats, discharge operator static to ground, or pass sample over an ionizing blower"],
                    "prevention": ["Avoid dry nylon clothing and ungrounded plastic utensils around the balance"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Balance displays 'ERR 01' or 'OVERLOAD'",
                    "possibleCauses": ["Gross overload beyond rated capacity, or mechanical shock to weighing mechanism"],
                    "solution": ["Remove heavy object immediately; re-tare balance. If error persists, call certified service technician"],
                    "prevention": ["Never place heavy objects (>200 g) on an analytical balance; use a top-pan balance instead"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Weighing a beaker or crucible while it is still warm from the oven or burner",
                    "whyItMatters": "Warm objects create rising thermal convection currents inside the draft shield that artificially lift the pan, giving an erroneous, drifting low mass reading",
                    "howToAvoid": "Always cool heated items completely to room temperature inside a desiccator before weighing"
                },
                {
                    "mistake": "Adding chemical powders with a spatula directly inside the draft chamber",
                    "whyItMatters": "Accidental powder spills fall under the pan into the electromagnetic mechanism, corroding delicate electronics and ruining the balance",
                    "howToAvoid": "Take the weighing container out of the balance chamber to add chemical, then return it to the pan"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "top-pan-balance",
                "relationship": "alternative",
                "reason": "Top-pan balances handle heavier samples (up to kilograms) with lower precision (~0.01 g).",
                "difference": "Analytical balance measures to 0.0001 g (0.1 mg) with draft shield; top-pan measures to 0.01 g without shield."
            },
            {
                "equipmentId": "weighing-boat",
                "relationship": "complementary",
                "reason": "Weighing boats sit on the analytical balance pan to contain powders cleanly.",
                "difference": "The weighing boat holds the chemical; the balance measures the mass."
            },
            {
                "equipmentId": "volumetric-flask",
                "relationship": "complementary",
                "reason": "Solutes weighed precisely on the balance are transferred into volumetric flasks to prepare accurate standard solutions.",
                "difference": "The balance measures mass; the volumetric flask measures total dissolved volume."
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
                    "title": "USP General Chapter <41> Balances",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Pharmacopeial Standard",
                    "supports": ["Repeatability criteria, minimum sample weight, calibration standards"]
                },
                {
                    "title": "ASTM E319 - Standard Practice for the Evaluation of Single-Pan Mechanical and Electronic Balances",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Linearity, sensitivity tests, environmental draft controls"]
                }
            ]
        }
    },

    # 25. Top-pan Balance
    {
        "id": "top-pan-balance",
        "pdfNumber": 25,
        "pdfName": "Top-pan Balance",
        "pdfMainUse": "Measuring general sample mass",
        "pdfGroup": "Heating, handling and separation",
        "name": "Top-pan Balance",
        "category": "Measuring Instruments",
        "purpose": "Measures general chemical masses and bulk reagents rapidly with moderate precision (~0.01 g to 0.1 g).",
        "image": {
            "src": "assets/images/equipment/top-pan-balance.svg",
            "alt": "Electronic precision top-pan laboratory balance with open stainless steel weighing pan",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/top-pan-balance.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A rugged electronic laboratory balance featuring an open, accessible weighing pan without an enclosing glass draft shield. Reads mass with a precision of 0.01 g or 0.1 g and accommodates larger capacities (up to several kilograms) for general bench reagent preparation.",
        "alternativeNames": ["Precision balance", "Bench balance", "Electronic loading balance", "Top-loading balance"],
        "commonUses": [
            "Weighing bulk reagents and buffers where 0.01 g precision is sufficient",
            "Measuring liquid solvent masses in beakers for synthetic mixtures",
            "Determining solid yields and crude reaction masses in preparative chemistry",
            "Preparing sand baths, heating media, and general reagent stock"
        ],
        "types": [
            "2-decimal top-pan balance (readability 0.01 g, capacity ~400 g to 1200 g)",
            "1-decimal top-pan balance (readability 0.1 g, capacity up to 3000 g to 6000 g)",
            "Portable battery-powered field balance (compact student laboratory model)"
        ],
        "specifications": {
            "material": ["Stainless steel weighing pan", "Impact-resistant ABS plastic housing", "Sealed membrane keypad"],
            "capacity": {
                "value": "400 to 2000",
                "unit": "g",
                "notes": "Typical student model capacity is 600 g to 2000 g; readability is typically 0.01 g (or 0.1 g on higher capacity units)."
            },
            "dimensions": "Overall footprint ~200 × 280 mm, Height ~80 mm; Pan diameter ~120 mm to 150 mm",
            "mainParts": ["Open stainless steel circular/square pan", "Digital backlit LCD display", "TARE and ZERO membrane buttons", "Leveling bubble and adjustable feet"],
            "partsAndFunctions": [
                {
                    "partName": "Open stainless steel circular/square pan",
                    "function": "Provides unobstructed access for placing large beakers, flasks, and containers",
                    "handlingNotes": "Keep clean and dry; do not overload."
                },
                {
                    "partName": "Digital backlit LCD display",
                    "function": "Displays mass in grams, kilograms, or carats with stability indicator",
                    "handlingNotes": "Record value only after stability icon appears."
                },
                {
                    "partName": "TARE and ZERO membrane buttons",
                    "function": "Subtracts the mass of weighing containers up to total balance capacity",
                    "handlingNotes": "Press firmly once and wait for 0.00 g display."
                }
            ],
            "measurementAccuracy": {
                "value": 0.01,
                "unit": "g",
                "notes": "Readability and linearity is typically ±0.01 g (10 mg); repeatable to ±0.01 g."
            },
            "limitations": [
                "Lacks the high precision of an analytical balance; cannot measure 0.1 mg analytical tolerances",
                "Without a draft shield, strong air drafts from nearby fume hoods or open windows can cause minor reading fluctuations",
                "Not suitable for primary analytical standards or trace microscale assays"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Verify balance is resting on a level, stable bench surface",
                "Inspect leveling bubble and adjust feet if required",
                "Ensure stainless steel pan is clean and free of spilled chemical granules"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Power On and Zero",
                    "instruction": "Press the ON/OFF button. Ensure display indicates 0.00 g (or press TARE/ZERO)."
                },
                {
                    "step": 2,
                    "title": "Vessel Placement",
                    "instruction": "Place an empty beaker, weighing boat, or container in the center of the pan."
                },
                {
                    "step": 3,
                    "title": "Taring",
                    "instruction": "Press the TARE button to deduct the vessel mass so the readout resets to 0.00 g."
                },
                {
                    "step": 4,
                    "title": "Dispensing Reagent",
                    "instruction": "Carefully add solid chemical using a spatula until the target mass is displayed. Wait for stability indicator and record reading."
                }
            ],
            "handlingTips": [
                "Always place objects gently in the center of the pan; never slide heavy vessels across the surface",
                "Use a weighing boat rather than placing chemicals directly on the metal pan"
            ],
            "shutdown": [
                "Remove container and clean pan with a soft bench brush",
                "Turn off power if not in continuous use",
                "Wipe bench area around the balance clean"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Chemical exposure from powder spills", "Electrical hazard from liquid ingress", "Dropping heavy containers"],
            "warnings": [
                "Never exceed the maximum capacity printed on the balance label (e.g. Max 1200 g)",
                "Never place corrosive fuming liquids directly on the unprotected metal pan"
            ],
            "actionsToAvoid": [
                "Do not slam objects onto the weighing pan (shocks load cell)",
                "Do not blow with your breath to remove spilled powder"
            ],
            "emergencyGuidance": [
                "If chemical powder spills on the balance, sweep into a dustpan with a soft brush and discard into chemical waste",
                "In case of skin contact, rinse thoroughly under running water"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Turn off balance and unplug power cord",
                "Lift off stainless steel pan and wash with mild detergent and water if contaminated; dry thoroughly",
                "Wipe housing with a damp cloth; ensure liquid does not enter pan spindle aperture"
            ],
            "storageInstructions": [
                "Keep on a level workbench covered with a dust cover when not in active use",
                "Avoid storing under direct sunlight or directly in front of heating/AC vents"
            ],
            "maintenanceChecks": [
                "Check balance calibration weekly using certified standard test weights",
                "Inspect power supply adapter and cord for damage"
            ],
            "troubleshooting": [
                {
                    "problem": "Display reading fluctuates erratically by ±0.05 g",
                    "possibleCauses": ["Strong air draft from nearby fume hood, window, or overhead air conditioning", "Bench is vibrating"],
                    "solution": ["Shield the balance from drafts with a makeshift barrier, or move away from direct air vents"],
                    "prevention": ["Position balances away from high-traffic doorways and ventilation ducts"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Balance does not return to zero after removing container",
                    "possibleCauses": ["Spilled powder trapped underneath the pan rim pressing against housing", "Pan not seated properly"],
                    "solution": ["Lift pan, clean debris from spindle well, re-seat pan, and press TARE button"],
                    "prevention": ["Clean pan and surround immediately if chemicals spill during transfer"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Display shows '- - - - -' or 'OVER'",
                    "possibleCauses": ["Container and contents exceed the maximum load rating of the balance"],
                    "solution": ["Remove heavy object immediately; split sample into smaller portions or use a heavy-duty platform scale"],
                    "prevention": ["Check vessel tare weight before loading on balance"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Placing chemical powders directly onto the bare stainless steel balance pan",
                    "whyItMatters": "Chemical salts react with and corrode the metal pan, and powder gets into internal mechanisms",
                    "howToAvoid": "Always place a weighing boat, watch glass, or beaker on the pan first and tare before adding chemicals"
                },
                {
                    "mistake": "Using a top-pan balance for quantitative analytical standard preparations",
                    "whyItMatters": "Top-pan readability (±0.01 g) introduces 10% to 100% relative error for milligram-scale analytical titrations",
                    "howToAvoid": "Use an analytical balance (±0.0001 g) whenever preparing quantitative analytical standards"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "analytical-balance",
                "relationship": "alternative",
                "reason": "Analytical balances offer 0.1 mg precision when quantitative 4-decimal accuracy is necessary.",
                "difference": "A top-pan balance measures large loads to 0.01 g; an analytical balance measures small loads to 0.0001 g."
            },
            {
                "equipmentId": "weighing-boat",
                "relationship": "complementary",
                "reason": "Weighing boats hold chemicals safely on top of the balance pan.",
                "difference": "The weighing boat holds the dry chemical; the top-pan balance measures its mass."
            },
            {
                "equipmentId": "spatula",
                "relationship": "complementary",
                "reason": "Spatulas scoop solid chemicals from reagent containers onto the balance pan.",
                "difference": "The spatula transfers chemicals; the balance measures mass."
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
                    "title": "ASTM E898 - Standard Practice for Testing Top-Loading Balances",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Readability, repeatability, and off-center loading checks"]
                },
                {
                    "title": "NIST Handbook 44: Specifications, Tolerances, and Other Technical Requirements for Weighing and Measuring Devices",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Metrology Standard",
                    "supports": ["Top-loading balance tolerances, testing procedures"]
                }
            ]
        }
    },

    # 26. Retort Stand
    {
        "id": "retort-stand",
        "pdfNumber": 26,
        "pdfName": "Retort Stand",
        "pdfMainUse": "Supporting laboratory apparatus",
        "pdfGroup": "Heating, handling and separation",
        "name": "Retort Stand",
        "category": "Support Equipment",
        "purpose": "Provides a heavy, stable base and vertical rod for mounting laboratory glassware assemblies.",
        "image": {
            "src": "assets/images/equipment/retort-stand.svg",
            "alt": "Heavy rectangular cast iron base with vertical threaded steel support rod",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/retort-stand.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A heavy rectangular or tripod-shaped cast iron base fitted with a sturdy vertical steel rod. Forms the central structural anchor of experimental chemistry rigs, supporting clamps, boss heads, rings, and burettes at adjustable heights.",
        "alternativeNames": ["Ring stand", "Support stand", "Laboratory stand"],
        "commonUses": [
            "Supporting burettes at adjustable working heights during titrations",
            "Holding round-bottom reaction flasks and condensers during reflux and distillation",
            "Supporting separating funnels during liquid-liquid extractions",
            "Mounting iron rings to support funnels during gravity filtration"
        ],
        "types": [
            "Rectangular cast iron base stand (standard laboratory workhorse, base ~200 × 125 mm)",
            "A-base / Tripod base stand (provides triangular stability around burners)",
            "Heavy-duty chemical-resistant porcelain/enamel base stand (acid-resistant surface)"
        ],
        "specifications": {
            "material": ["Cast iron base (enamel or baked epoxy coated)", "Plated stainless steel or mild steel rod"],
            "capacity": {
                "value": "Up to ~5",
                "unit": "kg",
                "notes": "Base mass (~1.5 kg to 3 kg) safely supports glass apparatus assemblies up to ~5 kg without tipping if centered."
            },
            "dimensions": "Base ~200 × 125 mm, Rod diameter ~10 to 12 mm, Rod length ~600 mm to 900 mm",
            "mainParts": ["Heavy cast iron rectangular base", "Threaded mounting hole", "Vertical cylindrical steel rod"],
            "partsAndFunctions": [
                {
                    "partName": "Heavy cast iron rectangular base",
                    "function": "Provides a low center of gravity and stabilizing counterweight preventing apparatus from tipping",
                    "handlingNotes": "Always position base with long side extending beneath the clamped glassware."
                },
                {
                    "partName": "Threaded mounting hole",
                    "function": "Secures the vertical rod firmly into the base",
                    "handlingNotes": "Ensure rod is screwed in tightly before clamping equipment."
                },
                {
                    "partName": "Vertical cylindrical steel rod",
                    "function": "Provides continuous vertical track for mounting boss heads and utility clamps at any desired height",
                    "handlingNotes": "Keep rod clean, smooth, and free of rust."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: structural physical support equipment."
            },
            "limitations": [
                "If clamped apparatus extends beyond the perimeter of the base, the entire assembly becomes unstable and can topple",
                "Acid spills can corrode threads between the rod and base, making disassembly difficult",
                "Base takes up significant bench surface area"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the vertical rod to confirm it is screwed down tightly into the threaded base hole without wobbling",
                "Place base flat on the bench, orienting the long side pointing forward toward the user",
                "Verify base is clean and rubber foot pads prevent sliding"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Orientation",
                    "instruction": "Position the retort stand so the heavy base plate extends directly beneath the apparatus being clamped."
                },
                {
                    "step": 2,
                    "title": "Boss Head Attachment",
                    "instruction": "Slide a boss head onto the vertical rod to desired height, orienting the open clamp slot facing upward, and tighten thumbscrew firmly."
                },
                {
                    "step": 3,
                    "title": "Clamp Mounting",
                    "instruction": "Insert the shaft of a utility clamp or burette clamp into the outer slot of the boss head and tighten securely."
                },
                {
                    "step": 4,
                    "title": "Center of Gravity Check",
                    "instruction": "Gently nudge the clamped glassware to verify that the center of gravity remains directly over the base plate and the stand does not rock."
                }
            ],
            "handlingTips": [
                "ALWAYS clamp glassware directly above the heavy base plate, never hanging over the back or side where it can tip over",
                "Tighten the vertical rod into the base using a wrench or pliers if it becomes loose"
            ],
            "shutdown": [
                "Remove clamped glassware before loosening boss heads",
                "Remove clamps and boss heads from the rod",
                "Wipe base and rod with a damp cloth and store upright or with rod unscrewed in equipment storage"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Toppling assembly causing massive glassware breakage and chemical spills", "Foot injury if heavy base dropped", "Pinch hazard at clamp joints"],
            "warnings": [
                "Never clamp heavy reaction apparatus hanging out beyond the base footprint; topple hazard",
                "Never lift a retort stand by the attached glassware; lift by the metal rod and base"
            ],
            "actionsToAvoid": [
                "Do not use a stand with a loose, wobbling rod",
                "Do not overtighten clamp screws directly against bare glass"
            ],
            "emergencyGuidance": [
                "If a clamped assembly topples, evacuate immediate perimeter, contain chemical spill, and warn lab partners",
                "Sweep broken glass with broom and dustpan into sharps bin"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe painted base and chrome/steel rod with a damp cloth and mild detergent",
                "Dry thoroughly to prevent rust formation on exposed steel threads",
                "Apply a drop of machine oil to the base threads periodically"
            ],
            "storageInstructions": [
                "Store upright on dedicated stand shelving or unscrew rods and store bases flat in drawers",
                "Keep in dry atmosphere to prevent cast iron corrosion"
            ],
            "maintenanceChecks": [
                "Check that the vertical rod screws down completely perpendicular (90 degrees) to the base",
                "Inspect base for rust or peeling paint"
            ],
            "troubleshooting": [
                {
                    "problem": "The vertical rod wobbles and will not tighten in the base",
                    "possibleCauses": ["Threads in the cast iron base are stripped", "Threaded rod has loose lock nut"],
                    "solution": ["Tighten with a wrench; if threads are stripped, re-tap threads or replace base"],
                    "prevention": ["Do not overtighten rod with excessive torque"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "The stand tips forward when glassware is clamped",
                    "possibleCauses": ["Glassware clamped extending beyond the front edge of the base plate; center of gravity outside base"],
                    "solution": ["Rotate the boss head so glassware is centered directly above the base plate"],
                    "prevention": ["Always ensure the base points in the direction of the load"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Boss head slips down the rod during experiment",
                    "possibleCauses": ["Boss head thumbscrew not tightened sufficiently", "Oil or grease on steel rod"],
                    "solution": ["Wipe rod clean with ethanol; tighten boss head thumbscrew firmly by hand"],
                    "prevention": ["Keep vertical rods clean and free from slippery lubricants"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Clamping heavy apparatus facing backward away from the base plate",
                    "whyItMatters": "The center of mass falls outside the base perimeter, causing the entire setup to topple forward and shatter",
                    "howToAvoid": "Always orient the base so its long plate extends directly underneath the clamped glassware"
                },
                {
                    "mistake": "Carrying a retort stand across the room by holding the glass burette or flask attached to it",
                    "whyItMatters": "The glassware snaps at the clamp joint, dropping the heavy metal stand onto feet or floor",
                    "howToAvoid": "Disassemble glassware before moving, or carry the stand firmly by the metal vertical rod with one hand supporting the base"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "clamp-and-boss-head",
                "relationship": "complementary",
                "reason": "Clamp and boss heads attach directly onto the retort stand rod to hold glassware.",
                "difference": "The retort stand is the vertical anchor frame; the clamp and boss head grip the glassware."
            },
            {
                "equipmentId": "burette",
                "relationship": "complementary",
                "reason": "Retort stands hold burettes upright at comfortable working heights during titrations.",
                "difference": "The stand is the support structure; the burette is the calibrated dispensing tube."
            },
            {
                "equipmentId": "distillation-apparatus",
                "relationship": "complementary",
                "reason": "Complex distillation trains require two or more retort stands to support flasks and condensers.",
                "difference": "The stands provide structural stability; the distillation apparatus performs the separation."
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
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Apparatus assembly rules, counterweighting support stands"]
                },
                {
                    "title": "Laboratory Safety Guidance (OSHA 3404-11R)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Government Safety Document",
                    "supports": ["Equipment mounting stability, prevention of apparatus tipping"]
                }
            ]
        }
    },

    # 27. Clamp and Boss Head
    {
        "id": "clamp-and-boss-head",
        "pdfNumber": 27,
        "pdfName": "Clamp and Boss Head",
        "pdfMainUse": "Securing apparatus to a stand",
        "pdfGroup": "Heating, handling and separation",
        "name": "Clamp and Boss Head",
        "category": "Support Equipment",
        "purpose": "Attaches to a retort stand rod to securely hold and position glassware at variable heights and angles.",
        "image": {
            "src": "assets/images/equipment/clamp-and-boss-head.svg",
            "alt": "Two-piece laboratory hardware set featuring cast metal right-angle boss head and rubber-jawed utility clamp",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/clamp-and-boss-head.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A two-part mounting system consisting of a boss head (right-angle clamp holder with two perpendicular V-groove channels and thumbscrews) and a utility clamp with cushioned jaws and a metal extension rod. Secures flasks, condensers, and burettes firmly to retort stands.",
        "alternativeNames": ["Utility clamp and clamp holder", "Burette clamp and bosshead", "Three-finger clamp"],
        "commonUses": [
            "Clamping the neck of round-bottom flasks and conical flasks to retort stands",
            "Holding Liebig condensers at an angle during distillation setups",
            "Securing separating funnels during liquid-liquid extractions",
            "Holding thermometer probes suspended in heating baths without touching vessel walls"
        ],
        "types": [
            "Three-finger dual-adjustable clamp (holds irregular shapes and wide diameters up to 100 mm)",
            "Two-prong cork- or vinyl-lined utility clamp (classic format for flask necks and test tubes)",
            "Swivel boss head (allows 360-degree rotation of clamp arm in any plane)"
        ],
        "specifications": {
            "material": ["Die-cast aluminum alloy or cast zinc", "Plated steel thumbscrews", "Silicone, cork, or vinyl jaw liners"],
            "capacity": {
                "value": "Up to ~85",
                "unit": "mm",
                "notes": "Standard utility clamp jaws open from 5 mm up to ~85 mm; boss head accommodates rods up to 16 mm diameter."
            },
            "dimensions": "Clamp length ~220 mm; Boss head ~70 × 30 mm",
            "mainParts": ["Cast boss head block with two perpendicular V-grooves", "Two threaded thumbscrews", "Clamp extension rod", "Pivot mechanism and jaw adjustment screw", "Cushioned clamping jaws"],
            "partsAndFunctions": [
                {
                    "partName": "Cast boss head block with two perpendicular V-grooves",
                    "function": "Connects the horizontal clamp extension rod rigidly to the vertical retort stand rod",
                    "handlingNotes": "Orient with open groove facing upward so clamp is cradled by gravity."
                },
                {
                    "partName": "Threaded thumbscrews",
                    "function": "Tightens rods firmly into the V-grooves by hand pressure",
                    "handlingNotes": "Tighten finger-tight; do not use pliers."
                },
                {
                    "partName": "Cushioned clamping jaws",
                    "function": "Grips glassware securely without scratching or point-loading fragile glass",
                    "handlingNotes": "Ensure rubber or cork sleeves are in place; never clamp bare metal against glass."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: structural mounting and holding hardware."
            },
            "limitations": [
                "Overtightening jaw screws will crack the neck of glass flasks",
                "Vinyl jaw sleeves melt and char if positioned close to hot burner flames (use bare or fiberglass-sleeved jaws)",
                "Installing boss head upside down allows clamp to slip free if thumbscrew loosens"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect boss head and clamp for smooth screw threading",
                "Verify that clamp jaws possess intact rubber, vinyl, or cork protective sleeves",
                "Check that the retort stand is placed stably on the bench"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Boss Head Attachment",
                    "instruction": "Slide the boss head onto the vertical stand rod with the open channel facing UPWARD. Tighten the rear thumbscrew firmly by hand."
                },
                {
                    "step": 2,
                    "title": "Clamp Extension Insertion",
                    "instruction": "Slide the extension rod of the utility clamp into the horizontal channel of the boss head. Tighten the outer thumbscrew."
                },
                {
                    "step": 3,
                    "title": "Glassware Positioning",
                    "instruction": "Open the clamp jaws wide, position around the neck of the glassware (below the rim bead), and hand-tighten the jaw adjustment screw."
                },
                {
                    "step": 4,
                    "title": "Tension Check",
                    "instruction": "Ensure the glassware is held securely without slipping, but do not overtighten to the point of mechanical strain."
                }
            ],
            "handlingTips": [
                "The 'rule of gravity': always mount the boss head with the thumbscrew on the bottom and the open V-channel facing UP so the clamp rests in the cradle",
                "Always support glassware with your hand while tightening or loosening clamp screws"
            ],
            "shutdown": [
                "Support glassware with one hand while loosening clamp jaws with the other",
                "Remove glassware to bench before dismounting clamp from boss head",
                "Loosen thumbscrews slightly and store hardware in designated bins"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Nitrile gloves"],
            "hazards": ["Glass shattering from overtightening clamp", "Dropped glassware from loose boss head", "Melted plastic jaw fumes near heat"],
            "warnings": [
                "Never clamp bare metal directly against glassware without protective cushioning sleeves",
                "Do not overtighten clamp screws; finger-tight pressure is sufficient"
            ],
            "actionsToAvoid": [
                "Do not orient the boss head with the open groove facing downward",
                "Do not use pliers or wrenches to tighten thumbscrews"
            ],
            "emergencyGuidance": [
                "If a flask cracks under clamp pressure, immediately release clamp tension and treat contents as hazardous waste",
                "Sweep broken glass with broom and dustpan into sharps receptacle"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Wipe metal bodies clean with a damp cloth",
                "Replace worn, burned, or chemically degraded rubber jaw sleeves",
                "Apply a drop of silicone lubricant to thumbscrew threads if turning becomes stiff"
            ],
            "storageInstructions": [
                "Store clamps and boss heads in designated compartmentalized hardware bins",
                "Keep thumbscrews threaded loosely in boss heads so they are not misplaced"
            ],
            "maintenanceChecks": [
                "Inspect threads on thumbscrews for stripping or cross-threading",
                "Check alignment of three-finger clamp prongs to ensure even grip"
            ],
            "troubleshooting": [
                {
                    "problem": "Glass flask neck cracks while tightening clamp",
                    "possibleCauses": ["Overtightened jaw screw with excessive force", "Protective rubber sleeve missing, exposing bare metal"],
                    "solution": ["Discard cracked glassware; replace clamp sleeve and train user to tighten only until snug"],
                    "prevention": ["Always ensure rubber sleeves are installed and tighten only finger-tight"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Clamp arm sags or rotates downward under weight of condenser",
                    "possibleCauses": ["Boss head thumbscrew not tightened sufficiently", "Worn or stripped thumbscrew thread"],
                    "solution": ["Tighten thumbscrew firmly; replace boss head if threads are stripped"],
                    "prevention": ["Test clamp rigidity by hand before releasing glassware"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Rubber sleeves on clamp jaws melt and smoke during distillation",
                    "possibleCauses": ["Clamp placed too close to hot heating mantle or burner flame"],
                    "solution": ["Turn off heat source; replace melted rubber sleeves with fiberglass or bare metal jaws at high-temp joints"],
                    "prevention": ["Clamp apparatus high on the neck above thermal insulation"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Mounting the boss head upside-down with the open V-channel facing downward",
                    "whyItMatters": "If the thumbscrew loosens slightly, the weight of the apparatus instantly dumps the clamp and glassware out of the cradle",
                    "howToAvoid": "Always ensure the open V-groove faces upward so gravity holds the clamp rod inside the cradle"
                },
                {
                    "mistake": "Using bare metal clamp jaws with missing rubber sleeves to clamp a flask",
                    "whyItMatters": "Bare metal creates sharp point-stress concentrations that shatter the glass flask neck",
                    "howToAvoid": "Never use clamps without protective rubber, vinyl, or cork cushioning sleeves"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "retort-stand",
                "relationship": "complementary",
                "reason": "The boss head clamps directly onto the vertical rod of the retort stand.",
                "difference": "The retort stand provides the vertical support; the boss head and clamp provide the holding mechanism."
            },
            {
                "equipmentId": "burette",
                "relationship": "complementary",
                "reason": "Used to clamp burettes securely in vertical alignment during titrations.",
                "difference": "The clamp holds the burette; the burette is the volumetric dispensing tube."
            },
            {
                "equipmentId": "condenser",
                "relationship": "complementary",
                "reason": "Clamps hold condensers at precise angles during reflux and distillation assemblies.",
                "difference": "The clamp provides physical mounting; the condenser cools vapors into liquid."
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
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Glassware assembly clamping rules, boss head orientation"]
                },
                {
                    "title": "Prudent Practices in the Laboratory (National Research Council)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Safety Manual",
                    "supports": ["Apparatus setup safety, prevention of glass stress fractures"]
                }
            ]
        }
    },

    # 28. Tripod Stand
    {
        "id": "tripod-stand",
        "pdfNumber": 28,
        "pdfName": "Tripod Stand",
        "pdfMainUse": "Supporting vessels during heating",
        "pdfGroup": "Heating, handling and separation",
        "name": "Tripod Stand",
        "category": "Support Equipment",
        "purpose": "Elevates and supports beakers, flasks, and evaporating dishes above a Bunsen burner flame.",
        "image": {
            "src": "assets/images/equipment/tripod-stand.svg",
            "alt": "Three-legged cast iron laboratory tripod stand with circular top support ring",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/tripod-stand.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A three-legged metal support stand featuring a circular or triangular cast-iron top ring mounted on three divergent steel legs. Specifically sized to straddle a Bunsen burner, providing a stable, level heating platform for vessels equipped with wire gauzes or clay triangles.",
        "alternativeNames": ["Lab tripod", "Burner tripod", "Heating tripod"],
        "commonUses": [
            "Supporting beakers and flasks on wire gauze directly over a Bunsen burner",
            "Supporting a pipeclay triangle and crucible during high-temperature gravimetric ashing",
            "Holding an evaporating dish above a gentle burner flame for solvent removal",
            "Elevating sand baths or water baths over a heating flame"
        ],
        "types": [
            "Circular ring tripod (standard circular top ring, outer diameter ~120 mm)",
            "Triangular top tripod (triangular top ring providing convenient corners for clay triangles)",
            "Stainless steel / plated tripod (resists high-temperature oxidation and rust)"
        ],
        "specifications": {
            "material": ["Cast iron top ring", "Zinc-plated or stainless steel threaded legs"],
            "capacity": {
                "value": "Up to ~5",
                "unit": "kg",
                "notes": "Three-point stance safely supports heavy liquid-filled glassware up to ~5 kg."
            },
            "dimensions": "Height ~200 mm to 220 mm, Ring outer diameter ~120 mm to 150 mm",
            "mainParts": ["Cast iron horizontal top ring", "Three threaded leg mounting sockets", "Three divergent cylindrical steel legs"],
            "partsAndFunctions": [
                {
                    "partName": "Cast iron horizontal top ring",
                    "function": "Provides circular perimeter platform to support wire gauzes, triangles, and water baths",
                    "handlingNotes": "Becomes extremely hot during heating; never touch bare-handed."
                },
                {
                    "partName": "Three threaded leg mounting sockets",
                    "function": "Secures the three legs firmly into the top ring",
                    "handlingNotes": "Verify legs are tightly screwed into sockets before use."
                },
                {
                    "partName": "Three divergent cylindrical steel legs",
                    "function": "Creates a stable three-point footprint that does not wobble on uneven bench surfaces",
                    "handlingNotes": "Ensures ample clearance for a Bunsen burner beneath."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring structural heating support equipment."
            },
            "limitations": [
                "Height is fixed (typically ~200 mm); cannot adjust vertical distance to burner without raising burner on blocks",
                "Top ring conducts intense heat and remains dangerously hot long after the flame is extinguished",
                "Cannot support glassware with base diameter smaller than the ring without a wire gauze or clay triangle"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the three legs to ensure all are screwed in tightly and the tripod sits level without wobbling",
                "Place tripod on a heat-resistant bench mat or stone lab bench",
                "Place a wire gauze with ceramic center flat on the top ring"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Burner Alignment",
                    "instruction": "Slide the Bunsen burner between the legs underneath the tripod to check clearance, then withdraw burner before lighting."
                },
                {
                    "step": 2,
                    "title": "Apparatus Placement",
                    "instruction": "Place the beaker, flask, or dish centrally on the wire gauze resting on the tripod ring."
                },
                {
                    "step": 3,
                    "title": "Heating",
                    "instruction": "Light the Bunsen burner on the safety flame, adjust to blue heating flame, and slide underneath the tripod centered below the vessel."
                },
                {
                    "step": 4,
                    "title": "Post-Heating Cool Down",
                    "instruction": "Turn off burner and allow tripod and glassware to cool completely before attempting to move."
                }
            ],
            "handlingTips": [
                "Never adjust or carry a tripod while a lit Bunsen burner is underneath it",
                "Three legs provide inherently stable support on almost any surface without rocking"
            ],
            "shutdown": [
                "Extinguish the Bunsen burner and slide it out from under the tripod",
                "Allow the metal tripod and wire gauze to cool undisturbed for at least 15 minutes",
                "Store on equipment shelves once completely cold"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Heat-resistant gloves", "Crucible tongs"],
            "hazards": ["Severe thermal contact burns from hot metal", "Toppling boiling liquids if bumped", "Radiant heat bench damage"],
            "warnings": [
                "The cast iron ring remains hot enough to cause third-degree burns long after the flame is extinguished",
                "Never place glassware directly on the open ring without a wire gauze or clay triangle"
            ],
            "actionsToAvoid": [
                "Do not touch the metal tripod legs or ring with bare hands during or immediately after heating",
                "Do not use a tripod with loose, wobbly, or mismatched legs"
            ],
            "emergencyGuidance": [
                "In case of thermal contact burn from tripod metal, flush under cold water for at least 10 minutes",
                "If boiling liquid spills from tripod, step back immediately and alert supervisor"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Allow tripod to cool completely to ambient temperature",
                "Wipe soot and dust with a damp cloth; brush cast iron ring with a wire brush if corroded",
                "Dry thoroughly to prevent rust on steel legs"
            ],
            "storageInstructions": [
                "Store upright on dedicated shelves or unscrew legs for compact storage",
                "Keep in dry atmosphere to prevent rusting of cast iron components"
            ],
            "maintenanceChecks": [
                "Verify all three legs are tightly seated in their threaded sockets",
                "Inspect top ring for thermal cracking or structural warping"
            ],
            "troubleshooting": [
                {
                    "problem": "Tripod wobbles on the benchtop",
                    "possibleCauses": ["One leg is loose or cross-threaded in its socket", "Mismatched leg installed"],
                    "solution": ["Tighten all legs firmly; ensure all three legs are identical in length"],
                    "prevention": ["Check leg tightness before setting up heating apparatus"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Glass beaker slides dangerously on the wire gauze",
                    "possibleCauses": ["Tripod is sitting on an unlevel surface", "Wire gauze is warped or bowed"],
                    "solution": ["Replace warped wire gauze with a flat new gauze; ensure benchtop is level"],
                    "prevention": ["Discard wire gauzes that have developed rounded central humps"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Leg threads are stripped and leg falls out",
                    "possibleCauses": ["Overtightening or cross-threading cast iron socket"],
                    "solution": ["Retire damaged tripod from service; replace with a sound unit"],
                    "prevention": ["Thread legs carefully by hand without forcing"],
                    "requiresSupervisor": True
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Picking up or moving the tripod stand immediately after turning off the burner",
                    "whyItMatters": "The cast iron ring absorbs immense heat and causes instant severe third-degree burns to bare hands",
                    "howToAvoid": "Allow the tripod to cool for at least 15 minutes, or use insulated heat-resistant gloves"
                },
                {
                    "mistake": "Placing a small beaker directly onto the tripod ring without a wire gauze",
                    "whyItMatters": "The beaker falls through the ring hole or direct flame contact causes thermal shock explosion",
                    "howToAvoid": "Always place a ceramic-centered wire gauze on the ring before placing glassware"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "bunsen-burner",
                "relationship": "complementary",
                "reason": "The tripod stand straddles the Bunsen burner to elevate vessels over the flame.",
                "difference": "The Bunsen burner produces the flame; the tripod provides the structural elevated platform."
            },
            {
                "equipmentId": "wire-gauze",
                "relationship": "complementary",
                "reason": "Wire gauze rests on top of the tripod ring to support beakers and diffuse heat.",
                "difference": "The tripod is the elevated framework; the wire gauze is the heat-diffusing mesh plate."
            },
            {
                "equipmentId": "clay-triangle",
                "relationship": "complementary",
                "reason": "A clay triangle sits on the tripod ring to hold crucibles during high-temperature heating.",
                "difference": "The tripod provides the ring support; the clay triangle cradles the small crucible."
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
                    "supports": ["Burner heating support setups, thermal burn prevention"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Tripod and gauze heating configurations"]
                }
            ]
        }
    },

    # 29. Wire Gauze
    {
        "id": "wire-gauze",
        "pdfNumber": 29,
        "pdfName": "Wire Gauze",
        "pdfMainUse": "Supporting glassware and distributing heat",
        "pdfGroup": "Heating, handling and separation",
        "name": "Wire Gauze",
        "category": "Support Equipment",
        "purpose": "Diffuses open burner flame heat uniformly and provides a stable flat resting surface for glassware.",
        "image": {
            "src": "assets/images/equipment/wire-gauze.svg",
            "alt": "Square woven galvanized iron wire mesh screen with bonded circular white ceramic center",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/wire-gauze.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "A square sheet of woven iron or nichrome wire mesh featuring a circular ceramic refractory disc bonded in the center. Rests on a tripod stand or iron ring to prevent concentrated direct flame hot-spots from cracking glassware, ensuring gentle, uniform thermal diffusion.",
        "alternativeNames": ["Ceramic wire gauze", "Gauze mat", "Wire mesh with ceramic center"],
        "commonUses": [
            "Distributing Bunsen burner flame heat evenly across the base of beakers and flasks",
            "Supporting flat-bottomed glassware on tripod rings or retort stand iron rings",
            "Providing a safe, heat-resistant resting pad on the bench for hot vessels",
            "Preventing direct naked flame impingement from causing thermal stress cracks"
        ],
        "types": [
            "Ceramic-centered wire gauze (standard modern non-asbestos refractory disc bonded to mesh)",
            "Plain wire gauze (woven stainless steel mesh without ceramic center for lower-heat applications)",
            "Nichrome wire gauze (superior oxidation and corrosion resistance at continuous high temperatures)"
        ],
        "specifications": {
            "material": ["Galvanized iron or nichrome wire mesh", "Refractory ceramic disc (non-asbestos)"],
            "capacity": {
                "value": "Up to ~800",
                "unit": "°C",
                "notes": "Ceramic center withstands direct Bunsen flame temperatures up to ~800 °C without burning through."
            },
            "dimensions": "~125 × 125 mm or ~150 × 150 mm square; Ceramic disc diameter ~85 mm",
            "mainParts": ["Interwoven metal wire mesh grid", "Turned folded wire edges", "Bonded circular ceramic refractory center"],
            "partsAndFunctions": [
                {
                    "partName": "Interwoven metal wire mesh grid",
                    "function": "Provides structural support for glassware and conducts heat laterally away from flame center",
                    "handlingNotes": "Inspect for holes or unraveling wire."
                },
                {
                    "partName": "Turned folded wire edges",
                    "function": "Prevents mesh from fraying and eliminates sharp wire puncture hazards",
                    "handlingNotes": "Handle by folded corners."
                },
                {
                    "partName": "Bonded circular ceramic refractory center",
                    "function": "Absorbs direct flame impact and diffuses heat into a gentle, uniform thermal zone",
                    "handlingNotes": "Do not scrape ceramic with sharp metal tools."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring thermal diffusion and support consumable."
            },
            "limitations": [
                "Historical vintage gauzes contained asbestos; modern gauzes use safe ceramic refractory, but old stock must be discarded",
                "Ceramic center eventually flakes, thins, and wears through after prolonged heavy flame use",
                "Wire mesh warps upward into a dome if exposed to extreme overheating, destabilizing beakers"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect the gauze to ensure the ceramic disc is intact, flat, and free of holes",
                "Confirm the gauze is modern non-asbestos ceramic (discard vintage asbestos gauzes)",
                "Place flat on top of the tripod ring or support ring"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Centering on Ring",
                    "instruction": "Center the wire gauze on the tripod ring so the white ceramic circle is aligned with the center of the ring."
                },
                {
                    "step": 2,
                    "title": "Glassware Placement",
                    "instruction": "Set the flat-bottomed beaker or flask directly in the center of the white ceramic circle."
                },
                {
                    "step": 3,
                    "title": "Heating",
                    "instruction": "Position the Bunsen burner flame directly below the center of the ceramic disc. The disc will glow dull red, diffusing heat evenly."
                },
                {
                    "step": 4,
                    "title": "Cooling",
                    "instruction": "After turning off the flame, allow the wire gauze to cool completely on the tripod before handling."
                }
            ],
            "handlingTips": [
                "Always place glassware directly on the white ceramic circle, never on the bare wire border",
                "If the gauze becomes bowed or warped into a dome, replace it immediately to prevent beakers from sliding"
            ],
            "shutdown": [
                "Extinguish the burner and allow the gauze to cool undisturbed for at least 15 minutes",
                "Once cold, store flat in designated storage drawers or boxes",
                "Discard if ceramic disc has flaked away significantly"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Heat-resistant gloves", "Crucible tongs"],
            "hazards": ["Severe thermal burns from hot metal mesh", "Toppling glassware on warped gauzes", "Inhalation of asbestos if vintage gauze is disturbed"],
            "warnings": [
                "NEVER use vintage asbestos-containing wire gauzes; ensure all gauzes in use are certified modern ceramic",
                "The wire mesh remains scorching hot long after the flame is extinguished"
            ],
            "actionsToAvoid": [
                "Do not touch the gauze with bare hands while hot",
                "Do not heat glassware over bare wire where the ceramic disc has worn away"
            ],
            "emergencyGuidance": [
                "In case of contact burn, cool affected skin immediately under cold running water for 10 minutes",
                "If an old asbestos gauze is damaged or flaking, seal in a bag and submit to hazardous waste"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Allow gauze to cool completely to room temperature",
                "Brush loose soot from the underside with a dry, soft brush",
                "Do not wash with water (water weakens and dissolves the bonded ceramic compound)"
            ],
            "storageInstructions": [
                "Store flat in dry drawers or shelves; do not fold or bend",
                "Keep away from moisture to prevent rusting of galvanized wire"
            ],
            "maintenanceChecks": [
                "Inspect ceramic center before every laboratory session for thinning, cracking, or holes",
                "Check that the gauze remains flat and does not rock or wobble on the tripod ring"
            ],
            "troubleshooting": [
                {
                    "problem": "Ceramic center is cracked, flaking, or has a hole in the middle",
                    "possibleCauses": ["Thermal degradation from repeated prolonged flame heating", "Mechanical scraping"],
                    "solution": ["Discard the worn gauze and replace with a fresh new ceramic-centered wire gauze"],
                    "prevention": ["Avoid aggressive scraper contact and replace gauzes periodically"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Wire mesh is warped into a convex dome, causing beakers to slide or rock",
                    "possibleCauses": ["Extreme thermal expansion from overheating with high-output Meker burners"],
                    "solution": ["Discard warped gauze; never attempt to flatten with a hammer as ceramic will shatter"],
                    "prevention": ["Use appropriate burner intensity and support heavy loads evenly"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Black soot accumulates heavily on the underside of the gauze",
                    "possibleCauses": ["Burner flame was operated on the yellow luminous safety flame with air collar closed"],
                    "solution": ["Open the burner air collar to achieve a clean blue non-luminous heating flame"],
                    "prevention": ["Never heat over a yellow safety flame"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Heating glassware over a wire gauze where the ceramic disc has completely worn through",
                    "whyItMatters": "The naked burner flame impinges directly through the hole onto the glass, causing sudden thermal shock shattering",
                    "howToAvoid": "Inspect gauzes before use and replace any that have missing or perforated ceramic centers"
                },
                {
                    "mistake": "Washing ceramic wire gauzes under running water in the sink",
                    "whyItMatters": "Water dissolves the binder holding the ceramic refractory together, turning the white disc into mush",
                    "howToAvoid": "Keep wire gauzes dry at all times; clean only by gentle dry brushing"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "tripod-stand",
                "relationship": "complementary",
                "reason": "Wire gauze rests directly on top of the tripod ring to form the vessel support deck.",
                "difference": "The tripod is the elevating metal frame; the wire gauze is the heat-diffusing mesh."
            },
            {
                "equipmentId": "bunsen-burner",
                "relationship": "complementary",
                "reason": "The wire gauze diffuses the concentrated heat of the Bunsen burner flame.",
                "difference": "The Bunsen burner generates the flame; the gauze distributes the thermal energy."
            },
            {
                "equipmentId": "beaker",
                "relationship": "complementary",
                "reason": "Beakers rest directly on the ceramic circle of the wire gauze during heating.",
                "difference": "The wire gauze supports and diffuses heat; the beaker holds the boiling liquid."
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
                    "supports": ["Asbestos-free ceramic requirements, flame heating safety"]
                },
                {
                    "title": "Vogel's Textbook of Practical Organic Chemistry (5th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Thermal diffusion principles, glassware heating"]
                }
            ]
        }
    },

    # 30. Crucible Tongs
    {
        "id": "crucible-tongs",
        "pdfNumber": 30,
        "pdfName": "Crucible Tongs",
        "pdfMainUse": "Handling compatible hot equipment",
        "pdfGroup": "Heating, handling and separation",
        "name": "Crucible Tongs",
        "category": "Support Equipment",
        "purpose": "Safely grips, lifts, and manipulates hot crucibles, lids, evaporating dishes, and small hot objects.",
        "image": {
            "src": "assets/images/equipment/crucible-tongs.svg",
            "alt": "Stainless steel scissor-action crucible tongs with serrated bowed jaws and curved tips",
            "credit": "Laboratory Standard Vector Assets",
            "status": "fallback"
        },
        "ar": {
            "modelFile": "assets/models/crucible-tongs.glb",
            "modelStatus": "missing",
            "interactions": ["tap-to-label", "rotate", "zoom", "reveal usage steps"]
        },
        "description": "Scissor-action metal tongs made of nickel-plated steel, stainless steel, or brass with serrated bowed jaws and tapered curved tips. Specially engineered to grasp the rim, lid, or body of hot porcelain crucibles and small evaporating dishes without touching hot surfaces by hand.",
        "alternativeNames": ["Lab tongs", "Crucible pliers", "Heating tongs"],
        "commonUses": [
            "Transferring red-hot porcelain crucibles into and out of muffle furnaces or clay triangles",
            "Lifting and removing hot crucible lids to inspect solid ashing progress",
            "Moving hot evaporating dishes onto heat-resistant cooling pads or desiccators",
            "Picking up small solid samples or hot metal objects safely"
        ],
        "types": [
            "Standard curved-tip crucible tongs (tapered bowed jaws for grasping crucible bodies and rims)",
            "Locking crucible tongs (features a locking collar to prevent accidental jaw opening)",
            "PTFE-coated or platinum-tipped crucible tongs (for ultra-pure analytical trace metal ashing)"
        ],
        "specifications": {
            "material": ["Stainless steel (grade 304)", "Nickel-plated forged steel", "Brass"],
            "capacity": {
                "value": "20 to 60",
                "unit": "mm",
                "notes": "Bowed jaws accommodate crucible diameters from ~20 mm to ~60 mm; handles loads up to ~500 g."
            },
            "dimensions": "Overall length ~200 mm to 250 mm; Bow opening ~50 mm",
            "mainParts": ["Scissor finger loops", "Central rivet pivot joint", "Bowed curved arms", "Serrated gripping tip jaws"],
            "partsAndFunctions": [
                {
                    "partName": "Scissor finger loops",
                    "function": "Provides ergonomic scissor-style manual control for opening and closing jaws",
                    "handlingNotes": "Insert thumb and forefinger; keep grip steady."
                },
                {
                    "partName": "Central rivet pivot joint",
                    "function": "Ensures smooth scissor pivoting without loose play or binding",
                    "handlingNotes": "Lubricate with drop of mineral oil if stiff."
                },
                {
                    "partName": "Bowed curved arms",
                    "function": "Curves around the conical outside body of a crucible to cradle it securely from beneath",
                    "handlingNotes": "Use bowed section to lift crucible body."
                },
                {
                    "partName": "Serrated gripping tip jaws",
                    "function": "Picks up crucible lids by the central knob or pinches crucible rims",
                    "handlingNotes": "Pre-heat tips briefly in flame before touching red-hot porcelain."
                }
            ],
            "measurementAccuracy": {
                "value": None,
                "unit": "",
                "notes": "Not applicable: non-measuring physical manipulation tool."
            },
            "limitations": [
                "Not designed for lifting heavy glass beakers (use specialized rubber-sleeved beaker tongs instead)",
                "Cold metal tongs touching red-hot porcelain can induce thermal shock cracking of the crucible",
                "Slippery when greasy; improper grip technique can drop and shatter hot porcelain"
            ]
        },
        "operatingInstructions": {
            "preparation": [
                "Inspect tongs for loose pivot rivets, bent jaws, or grease residues",
                "Practice gripping and lifting a cold crucible to confirm jaw fit and hand balance",
                "Have a heat-resistant ceramic tile or desiccator ready nearby to receive the hot vessel"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Pre-warming Tips",
                    "instruction": "Briefly pass the tips of the tongs through the burner flame for 3-5 seconds to warm them before touching a red-hot crucible (prevents thermal shock)."
                },
                {
                    "step": 2,
                    "title": "Grasping Technique",
                    "instruction": "Position the bowed section of the jaws around the middle body of the crucible, or use the tip jaws to firmly pinch the upper rim."
                },
                {
                    "step": 3,
                    "title": "Lifting and Transfer",
                    "instruction": "Squeeze finger loops firmly to lock grip, lift crucible smoothly off the clay triangle, and move steadily without jerky hand motions."
                },
                {
                    "step": 4,
                    "title": "Placement",
                    "instruction": "Lower the crucible gently onto a ceramic cooling pad or desiccator plate, release jaw pressure, and withdraw tongs."
                }
            ],
            "handlingTips": [
                "To lift a crucible lid, use the pinched tips to grasp the small knob on the lid handle",
                "To carry the crucible itself, use the bowed curved section of the arms to cradle the crucible body rather than pinching the fragile rim"
            ],
            "shutdown": [
                "Rest tongs on a heat-resistant tile until tips cool to room temperature",
                "Wipe clean with a damp cloth if chemical ash contacted the tips",
                "Store hung on tool racks or flat in hardware drawers"
            ]
        },
        "safetyPrecautions": {
            "requiredPPE": ["Safety goggles", "Laboratory coat", "Heat-resistant gloves", "Leather/silicone apron (if furnace work)"],
            "hazards": ["Severe thermal contact burns", "Dropping glowing crucible contents", "Thermal shock fracture shrapnel"],
            "warnings": [
                "NEVER use crucible tongs to lift large, heavy liquid-filled glass beakers (use beaker tongs)",
                "Never touch red-hot crucibles with cold, wet tongs"
            ],
            "actionsToAvoid": [
                "Do not carry hot crucibles over aisles or walkways where others are moving",
                "Do not use tongs with a wobbly, loose pivot rivet"
            ],
            "emergencyGuidance": [
                "If a red-hot crucible drops and shatters, step back immediately, warn others, and let cool before cleanup",
                "Treat contact burns by flushing under cold water for at least 10 minutes"
            ]
        },
        "maintenanceAndTroubleshooting": {
            "cleaningSteps": [
                "Allow tongs to cool completely",
                "Wipe stainless steel jaws with a damp cloth and mild detergent",
                "Dry thoroughly to prevent oxidation of steel rivets and joints"
            ],
            "storageInstructions": [
                "Store hung on wall pegboards or flat in organized tool drawers",
                "Keep in dry atmosphere away from acid fumes"
            ],
            "maintenanceChecks": [
                "Check pivot joint rivet tightness; tighten loose rivets with a light hammer tap on an anvil",
                "Inspect jaw tips to ensure they meet squarely when closed"
            ],
            "troubleshooting": [
                {
                    "problem": "Crucible slips or rotates precariously in the tongs while lifting",
                    "possibleCauses": ["Grip placed too high on the flared rim instead of cradling with the bowed jaws", "Serrated tips worn smooth"],
                    "solution": ["Cradle the tapered conical body of the crucible inside the curved bow of the tongs"],
                    "prevention": ["Always practice lifting cold crucibles with the tongs before heating"],
                    "requiresSupervisor": False
                },
                {
                    "problem": "Hot porcelain crucible cracks the moment tongs touch it",
                    "possibleCauses": ["Thermal shock caused by touching red-hot porcelain with ice-cold metal tongs"],
                    "solution": ["Discard cracked crucible contents into waste; pre-warm tong tips in the flame prior to touching hot ceramic"],
                    "prevention": ["Always warm tong tips in the outer burner flame for 3 seconds before lifting hot crucibles"],
                    "requiresSupervisor": True
                },
                {
                    "problem": "Tongs bind stiffly and will not open smoothly",
                    "possibleCauses": ["Corrosion or dried chemical salts in the pivot rivet"],
                    "solution": ["Soak joint in warm water, dry thoroughly, and apply a drop of high-temperature lubricant"],
                    "prevention": ["Clean tongs immediately if exposed to corrosive chemical fumes"],
                    "requiresSupervisor": False
                }
            ],
            "commonMistakes": [
                {
                    "mistake": "Using crucible tongs to pick up a large 500 mL glass beaker filled with boiling liquid",
                    "whyItMatters": "Crucible tongs lack the wide rubber-covered jaws needed for beakers; the beaker slips and shatters, dumping boiling liquid",
                    "howToAvoid": "Use dedicated rubber-jawed beaker tongs for beakers; reserve crucible tongs for crucibles and evaporating dishes"
                },
                {
                    "mistake": "Touching red-hot porcelain with cold metal tongs",
                    "whyItMatters": "The severe localized temperature difference induces instant thermal shock cracking, destroying the sample",
                    "howToAvoid": "Wave the tips of the tongs through the burner flame for a few seconds to pre-warm them before gripping"
                }
            ]
        },
        "relatedEquipment": [
            {
                "equipmentId": "crucible",
                "relationship": "complementary",
                "reason": "Crucible tongs are specifically shaped to handle, lift, and manipulate hot crucibles safely.",
                "difference": "The crucible is the porcelain heating vessel; the tongs are the handling utensil."
            },
            {
                "equipmentId": "clay-triangle",
                "relationship": "complementary",
                "reason": "Tongs lift the crucible onto and off the clay triangle resting on the tripod stand.",
                "difference": "The clay triangle provides static heating support; the tongs provide dynamic manual transfer."
            },
            {
                "equipmentId": "evaporating-dish",
                "relationship": "complementary",
                "reason": "The tips of crucible tongs are used to move hot evaporating dishes safely.",
                "difference": "The evaporating dish contains the solution; the tongs provide thermal handling protection."
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
                    "title": "ASTM E890 - Standard Specification for Laboratory Apparatus Handling Tools",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Technical Standard",
                    "supports": ["Tong dimensions, scissor pivot specifications, thermal grip limits"]
                },
                {
                    "title": "Vogel's Textbook of Quantitative Chemical Analysis (6th Edition)",
                    "url": "",
                    "urlChecked": False,
                    "sourceType": "Academic Textbook",
                    "supports": ["Gravimetric ashing procedures, crucible manipulation rules"]
                }
            ]
        }
    }
]

print(f"Items 21-30 loaded: {len(ITEMS_21_TO_30)}")
