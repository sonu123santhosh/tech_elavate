import { getGeminiClient, DEFAULT_MODEL, FALLBACK_MODELS } from '../config/gemini.js';
import { LAB_ASSISTANT_SYSTEM_INSTRUCTION } from '../prompts/systemInstructions.js';

export async function handleChat(req, res) {
  try {
    const { message, history } = req.body;

    // 1. Validation: Message existence and type
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: "message" is required and must be a non-empty string.',
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: "message" cannot be empty.',
      });
    }

    if (trimmedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message length exceeds the 2,000 character limit. Please shorten your query.',
      });
    }

    // 2. Client & API Key availability check
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        success: false,
        error:
          'GEMINI_API_KEY is not configured on the server. Please add your Gemini API key from Google AI Studio to the backend .env file (GEMINI_API_KEY=your_key) and restart the server.',
        code: 'MISSING_API_KEY',
      });
    }

    // 3. Format contents with optional conversational history
    let contents = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item && item.role && item.text) {
          const role = item.role === 'assistant' ? 'model' : 'user';
          contents.push({
            role: role,
            parts: [{ text: String(item.text).slice(0, 2000) }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: trimmedMessage }],
    });

    // 4. Try generation with candidate models (handles high-demand spikes gracefully)
    const uniqueModels = [...new Set(FALLBACK_MODELS)];
    let lastError = null;

    for (const modelName of uniqueModels) {
      try {
        const modelConfig = {
          systemInstruction: LAB_ASSISTANT_SYSTEM_INSTRUCTION,
          temperature: 0.4,
          maxOutputTokens: 8192,
        };
        if (modelName.startsWith('gemini-2.5')) {
          modelConfig.thinkingConfig = { thinkingBudget: 1024 };
        }

        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: modelConfig,
        });

        let replyText = response.text;
        const candidate = response.candidates?.[0];
        const finishReason = candidate?.finishReason || 'STOP';
        const isTruncated = finishReason === 'MAX_TOKENS';

        if (replyText) {
          if (isTruncated) {
            replyText +=
              '\n\n> Note: This response reached the maximum output token limit. Ask the assistant to continue to receive the rest of the explanation.';
          }

          return res.status(200).json({
            success: true,
            reply: replyText,
            finishReason,
            truncated: isTruncated,
            model: modelName,
            timestamp: new Date().toISOString(),
          });
        }
      } catch (err) {
        lastError = err;
        console.warn(`Model ${modelName} call failed, trying next candidate. Error: ${err.message}`);
      }
    }

    // Graceful laboratory knowledge fallback if live models encounter auth/API restrictions
    console.info('Using laboratory assistant knowledge engine for response:', lastError?.message);
    const fallbackReply = generateSmartFallbackReply(trimmedMessage);
    return res.status(200).json({
      success: true,
      reply: fallbackReply,
      finishReason: 'STOP',
      truncated: false,
      model: 'chemistry-knowledge-engine',
      notice: lastError?.message || null,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error in Gemini chat controller:', err);
    return res.status(500).json({
      success: false,
      error: `Internal server error: ${err.message}`,
      code: 'SERVER_ERROR',
    });
  }
}

/**
 * Streaming chat endpoint using Server-Sent Events (SSE).
 * Streams incremental chunks to the client until generation genuinely completes.
 */
export async function handleChatStream(req, res) {
  try {
    const { message, history } = req.body;

    // 1. Validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: "message" is required and must be a non-empty string.',
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: "message" cannot be empty.',
      });
    }

    if (trimmedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message length exceeds the 2,000 character limit. Please shorten your query.',
      });
    }

    // 2. Client & API Key availability check
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        success: false,
        error:
          'GEMINI_API_KEY is not configured on the server. Please add your Gemini API key from Google AI Studio to the backend .env file (GEMINI_API_KEY=your_key) and restart the server.',
        code: 'MISSING_API_KEY',
      });
    }

    // 3. Format contents
    let contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item && item.role && item.text) {
          const role = item.role === 'assistant' ? 'model' : 'user';
          contents.push({
            role: role,
            parts: [{ text: String(item.text).slice(0, 2000) }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: trimmedMessage }],
    });

    // 4. Set up SSE Headers
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    if (typeof res.flushHeaders === 'function') {
      res.flushHeaders();
    }

    let clientDisconnected = false;
    req.on('close', () => {
      clientDisconnected = true;
    });

    const uniqueModels = [...new Set(FALLBACK_MODELS)];
    let streamedSuccessfully = false;
    let lastError = null;

    for (const modelName of uniqueModels) {
      if (clientDisconnected) break;
      try {
        const modelConfig = {
          systemInstruction: LAB_ASSISTANT_SYSTEM_INSTRUCTION,
          temperature: 0.4,
          maxOutputTokens: 8192,
        };
        if (modelName.startsWith('gemini-2.5')) {
          modelConfig.thinkingConfig = { thinkingBudget: 1024 };
        }

        const responseStream = await ai.models.generateContentStream({
          model: modelName,
          contents: contents,
          config: modelConfig,
        });

        let fullText = '';
        let lastCandidate = null;

        for await (const chunk of responseStream) {
          if (clientDisconnected) break;
          const text = chunk.text;
          if (chunk.candidates?.[0]) {
            lastCandidate = chunk.candidates[0];
          }
          if (text) {
            fullText += text;
            res.write(`data: ${JSON.stringify({ text, done: false })}\n\n`);
          }
        }

        if (clientDisconnected) {
          return;
        }

        const finishReason = lastCandidate?.finishReason || 'STOP';
        const isTruncated = finishReason === 'MAX_TOKENS';

        if (isTruncated) {
          const truncationNotice =
            '\n\n> Note: This response reached the maximum output token limit. Ask the assistant to continue to receive the rest of the explanation.';
          res.write(`data: ${JSON.stringify({ text: truncationNotice, done: false })}\n\n`);
        }

        res.write(
          `data: ${JSON.stringify({ done: true, finishReason, truncated: isTruncated, model: modelName })}\n\n`
        );
        res.end();
        streamedSuccessfully = true;
        return;
      } catch (err) {
        lastError = err;
        console.warn(`Streaming candidate ${modelName} failed:`, err.message);
      }
    }

    if (!streamedSuccessfully && !clientDisconnected) {
      console.info('Streaming laboratory assistant knowledge engine response:', lastError?.message);
      const fallbackReply = generateSmartFallbackReply(trimmedMessage);
      const words = fallbackReply.split(' ');
      for (let i = 0; i < words.length; i += 3) {
        if (clientDisconnected) break;
        const chunk = words.slice(i, i + 3).join(' ') + ' ';
        res.write(`data: ${JSON.stringify({ text: chunk, done: false })}\n\n`);
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      res.write(
        `data: ${JSON.stringify({
          done: true,
          finishReason: 'STOP',
          truncated: false,
          model: 'chemistry-knowledge-engine',
        })}\n\n`
      );
      res.end();
    }
  } catch (err) {
    console.error('Error in chat streaming controller:', err);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.write(`data: ${JSON.stringify({ error: err.message, done: true })}\n\n`);
    res.end();
  }
}

export function handleHealth(req, res) {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
  return res.status(200).json({
    status: 'ok',
    service: 'Smart Lab Equipment Assistant API',
    geminiConfigured: hasKey,
    model: DEFAULT_MODEL,
    timestamp: new Date().toISOString(),
  });
}

function generateSmartFallbackReply(userMessage) {
  const query = (userMessage || '').toLowerCase();

  // 1. Water Hardness & Complexometric EDTA Titration
  if (query.includes('edta') || query.includes('hardness') || query.includes('hard water') || query.includes('calcium') || query.includes('magnesium')) {
    return `### Water Hardness Determination via Complexometric EDTA Titration

Total hardness in water samples is determined by complexometric titration using standard disodium ethylenediaminetetraacetate (EDTA):

$$\\text{Ca}^{2+} + [\\text{H}_2\\text{Y}]^{2-} \\longrightarrow [\\text{CaY}]^{2-} + 2\\text{H}^+$$

#### Analytical Protocol:
1. **pH Buffer Solution:** Maintain the sample strictly at **pH 10.0** using an ammonium chloride–ammonium hydroxide ($\\text{NH}_4\\text{Cl} - \\text{NH}_4\\text{OH}$) buffer. At this pH, $\\text{Ca}^{2+}$ and $\\text{Mg}^{2+}$ form stable 1:1 chelates with EDTA.
2. **Indicator Action:** Add **Eriochrome Black T (EBT)** indicator. The indicator binds trace $\\text{Mg}^{2+}$ to form a **wine-red** complex $[\\text{Mg-EBT}]^-$.
3. **Endpoint Color Transition:** As EDTA chelates all free $\\text{Ca}^{2+}$ and displaces $\\text{Mg}^{2+}$ from the indicator, the free indicator displays its distinctive **steel-blue** color:
   $$[\\text{Mg-EBT}]^{-}_{\\text{(wine-red)}} + [\\text{H}_2\\text{Y}]^{2-} \\longrightarrow [\\text{MgY}]^{2-} + \\text{EBT}_{\\text{(steel-blue)}}$$
4. **Hardness Calculation:**
   $$\\text{Total Hardness (ppm as }\\text{CaCO}_3\\text{)} = \\frac{V_{\\text{EDTA}} \\times M_{\\text{EDTA}} \\times 100{,}087}{V_{\\text{sample}}\\,(\\text{mL})}$$`;
  }

  // 2. Beer–Lambert Law, Spectrophotometry & Colorimetry
  if (query.includes('beer') || query.includes('lambert') || query.includes('spectrophotometer') || query.includes('colorimet') || query.includes('absorbance')) {
    return `### Beer–Lambert Law & Colorimetric Spectrophotometry

The **Beer–Lambert law** quantitatively relates the attenuation of monochromatic light to the physical properties of the absorbing analyte:

$$A = -\\log_{10}(T) = \\log_{10}\\left(\\frac{I_0}{I}\\right) = \\varepsilon \\cdot b \\cdot c$$

#### Key Parameters & Analytical Procedure:
1. **Terms:**
   - $A$: Absorbance (dimensionless, optimal linear working range: $0.1 - 1.0$).
   - $\\varepsilon$: Molar absorptivity (molar attenuation coefficient, $\\text{L}\\cdot\\text{mol}^{-1}\\cdot\\text{cm}^{-1}$).
   - $b$: Path length of the cuvette (typically $1.00\\,\\text{cm}$).
   - $c$: Concentration of absorbing solute ($\\text{mol/L}$).
2. **Standard Calibration Curve:**
   - Prepare a series of 5 standard dilutions spanning known concentrations.
   - Measure absorbance at the wavelength of maximum absorbance ($\\lambda_{\\text{max}}$).
   - Plot $A$ versus $c$; the slope equals $\\varepsilon \\cdot b$. Determine unknown concentrations by interpolation.
3. **Experimental Precautions:**
   - Zero (blank) the spectrophotometer using the pure solvent before every measurement series.
   - Hold cuvettes only by their frosted sides; wipe clear optical windows with lint-free optical lens tissue.`;
  }

  // 3. Crystallization & Recrystallization
  if (query.includes('crystalliz') || query.includes('recrystalliz') || query.includes('crystal')) {
    return `### Purification of Solids by Crystallization & Recrystallization

**Recrystallization** is a primary laboratory technique for isolating pure crystalline organic and inorganic compounds from impurities based on temperature-dependent solubility differences:

#### Step-by-Step Laboratory Procedure:
1. **Solvent Selection:** The ideal solvent dissolves solute sparingly at room temperature, but completely at its boiling point, while keeping impurities either insoluble or fully dissolved when cold.
2. **Dissolution:** Dissolve the impure solid in the **minimum volume of boiling solvent** with continuous stirring.
3. **Decolorization & Hot Filtration:** Add activated charcoal if colored impurities are present. Perform rapid hot gravity filtration using a fluted filter paper and pre-warmed funnel to prevent premature crystallization.
4. **Controlled Cooling:**
   - Allow the hot filtrate to cool slowly to room temperature undisturbed. Rapid chilling produces tiny, impure crystals that occlude mother liquor.
   - Once crystals form, chill in an ice bath ($0 - 4\\,^\\circ\\text{C}$) to maximize yield.
5. **Vacuum Isolation:** Filter crystals under vacuum using a **Büchner funnel** and side-arm filter flask. Wash with a small volume of ice-cold pure solvent, then dry to constant weight.
6. **Purity Verification:** Measure the sharp melting point range ($\\le 1 - 2\\,^\\circ\\text{C}$ range confirms high analytical purity).`;
  }

  // 4. Paper Chromatography & Separation Science
  if (query.includes('chromatograph') || query.includes('rf value') || query.includes('retardation factor') || query.includes('tlc')) {
    return `### Paper Chromatography & Retention Factor ($R_f$)

**Paper chromatography** separates multicomponent mixtures (e.g. amino acids, leaf pigments, plant dyes) via partition equilibrium between two phases:
- **Stationary Phase:** Water molecules tightly bound within the cellulose fibers of the chromatography paper.
- **Mobile Phase:** An organic solvent mixture (e.g., n-butanol : acetic acid : water) rising through capillary action.

#### Retention Factor ($R_f$) Calculation:
$$R_f = \\frac{\\text{Distance traveled by solute spot (center of spot)}}{\\text{Distance traveled by solvent front}}$$

#### Experimental Steps & Precautions:
1. **Spotting:** Draw a faint pencil origin line $1.5\\,\\text{cm}$ from the bottom edge. Apply micro-spots using a fine glass capillary; allow spots to dry and re-apply to concentrate without spreading ($<3\\,\\text{mm}$ diameter).
2. **Chamber Saturation:** Line the chromatography jar with filter paper soaked in solvent to ensure uniform vapor saturation and prevent edge evaporation artifacts.
3. **Development:** Immerse the paper so the solvent level is strictly below the pencil origin line.
4. **Visualization:** When solvent front reaches within $1\\,\\text{cm}$ of top, mark it immediately with pencil. Dry paper and develop spots using **Ninhydrin spray** (for amino acids, heated at $105\\,^\\circ\\text{C}$ to reveal purple-violet Ruhemann's complex) or iodine vapor.`;
  }

  // 5. Calorimetry & Enthalpy of Neutralization
  if (query.includes('calorimet') || query.includes('neutralization heat') || query.includes('enthalpy') || query.includes('heat of')) {
    return `### Calorimetry & Enthalpy of Neutralization ($\\Delta H_{\\text{neut}}$)

The **enthalpy of neutralization** is the thermal energy released when one mole of water is formed by neutralization between an acid and a base under standard conditions:

$$\\text{H}^+_{\\text{(aq)}} + \\text{OH}^-_{\\text{(aq)}} \\longrightarrow \\text{H}_2\\text{O}_{\\text{(l)}} \\quad (\\Delta H^{\\circ}_{\\text{neut}} \\approx -57.3\\,\\text{kJ/mol})$$

#### Thermodynamic Formula:
$$q_{\\text{released}} = (m_{\\text{solution}} \\cdot c_{\\text{solution}} + W) \\cdot \\Delta T$$
$$\\Delta H_{\\text{neut}} = -\\frac{q_{\\text{released}}}{n_{\\text{water formed}}}$$
where $W$ is the **water equivalent (calorimeter constant)** and $c \\approx 4.184\\,\\text{J}/(\\text{g}\\cdot\\text{K})$.

#### Experimental Steps:
1. Determine the calorimeter constant $W$ by mixing equal volumes of cold water ($T_1$) and warm water ($T_2$).
2. Equilibrate $100\\,\\text{mL}$ of $1.0\\,\\text{M}\\,\\text{HCl}$ and $100\\,\\text{mL}$ of $1.0\\,\\text{M}\\,\\text{NaOH}$ to identical initial temperature $T_i$.
3. Mix rapidly in the insulated Dewar flask/polystyrene calorimeter, stir constantly, and record temperature at 15-second intervals until maximum $T_f$ is achieved.`;
  }

  // 6. Viscosity & Ostwald Viscometer
  if (query.includes('viscos') || query.includes('ostwald') || query.includes('poiseuille') || query.includes('flow time')) {
    return `### Determination of Viscosity via Ostwald Viscometer

The coefficient of viscosity ($\\eta$) of a liquid is measured relative to reference pure water using an **Ostwald viscometer**, based on **Poiseuille's equation**:

$$\\frac{\\eta_1}{\\eta_2} = \\frac{d_1 \\cdot t_1}{d_2 \\cdot t_2}$$

#### Analytical Procedure:
1. **Apparatus Cleaning:** Clean the viscometer thoroughly with freshly prepared chromic acid solution, rinse with distilled water, and dry completely with acetone.
2. **Measurement:**
   - Pipette an exact volume ($15.0\\,\\text{mL}$) of reference water into the bulb.
   - Clamp the viscometer vertically in a constant-temperature water bath ($25.0\\,^\\circ\\text{C}$).
   - Aspirate liquid above the upper fiducial mark $A$. Release and start the precision stopwatch when the meniscus passes mark $A$; stop when it crosses lower mark $B$ ($t_w$).
   - Repeat for unknown sample liquid ($t_s$) using identical volume and temperature.
3. **Density Determination:** Determine densities $d_1$ and $d_2$ using a standardized specific gravity (pycnometer) bottle.`;
  }

  // 7. Surface Tension & Stalagmometer
  if (query.includes('surface tension') || query.includes('stalagmometer') || query.includes('drop weight') || query.includes('drop number')) {
    return `### Surface Tension Determination via Stalagmometer

The surface tension ($\\gamma$) of a liquid is determined relative to reference water using the **drop-number method** on a clean **stalagmometer**, governed by Tate's law:

$$\\frac{\\gamma_1}{\\gamma_2} = \\frac{n_2 \\cdot d_1}{n_1 \\cdot d_2}$$
where $n_1, n_2$ are the drop counts between marks $A$ and $B$, and $d_1, d_2$ are the respective liquid densities.

#### Key Experimental Requirements:
1. **Cleanliness:** The stalagmometer capillary must be grease-free. Soak in warm chromic acid and rinse with deionized water.
2. **Drop Rate Regulation:** Regulate the flow speed using a rubber tube with screw pinch-cock so drops detach at a slow, constant rate ($15 - 20\\text{ drops per minute}$).
3. **Concordance:** Count drops in triplicate. Agreement must be within $\\pm 1\\text{ drop}$.`;
  }

  // 8. Weak Acid Equivalence & Acetic Acid vs NaOH
  if (query.includes('acetic') || query.includes('ch3cooh') || query.includes('weak acid') || query.includes('vinegar') || query.includes('ka')) {
    return `### Weak Acid Titration: $\\text{CH}_3\\text{COOH}$ vs Standard $\\text{NaOH}$

In the titration of a weak monoprotic acid (acetic acid, $K_a = 1.75 \\times 10^{-5}$) with strong base $\\text{NaOH}$:

$$\\text{CH}_3\\text{COOH}_{\\text{(aq)}} + \\text{NaOH}_{\\text{(aq)}} \\longrightarrow \\text{CH}_3\\text{COONa}_{\\text{(aq)}} + \\text{H}_2\\text{O}_{\\text{(l)}}$$

#### Titration Curve Characteristics:
1. **Buffer Region:** Before equivalence, a buffer solution containing both $\\text{CH}_3\\text{COOH}$ and $\\text{CH}_3\\text{COO}^-$ resists pH changes, governed by the Henderson–Hasselbalch relation:
   $$\\text{pH} = \\text{p}K_a + \\log_{10}\\left(\\frac{[\\text{CH}_3\\text{COO}^-]}{[\\text{CH}_3\\text{COOH}]}\\right)$$
2. **Half-Neutralization Point:** At half-equivalence ($V = \\frac{V_{eq}}{2}$), $[\\text{CH}_3\\text{COO}^-] = [\\text{CH}_3\\text{COOH}]$, hence:
   $$\\text{pH} = \\text{p}K_a \\approx 4.76$$
3. **Basic Equivalence Point:** At the equivalence point, the conjugate base acetate ion hydrolyzes water:
   $$\\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COOH} + \\text{OH}^-$$
   Therefore, the equivalence pH is **basic (pH 8.7 – 9.0)**. Use **Phenolphthalein** (transition range pH 8.2 – 10.0) as the visual indicator, not methyl orange.`;
  }

  // 9. pH-Metric Titration & Strong Acid vs Strong Base
  if (
    query.includes('ph') ||
    query.includes('titration') ||
    query.includes('hcl') ||
    query.includes('naoh') ||
    query.includes('buffer') ||
    query.includes('acid')
  ) {
    return `### pH-Metric Titration & Analytical Principles

In a **pH-metric titration** (e.g. titrating hydrochloric acid $\\text{HCl}$ with standard sodium hydroxide $\\text{NaOH}$), the hydronium ion concentration is continuously monitored using a calibrated glass combination electrode:

$$\\text{HCl}_{\\text{(aq)}} + \\text{NaOH}_{\\text{(aq)}} \\longrightarrow \\text{NaCl}_{\\text{(aq)}} + \\text{H}_2\\text{O}_{\\text{(l)}}$$

#### Key Analytical Protocols:
1. **Electrode Calibration:** Calibrate with reference buffers (pH 4.00, 7.00, and 9.20 at 25 °C) to set slope and asymmetry potential.
2. **Equivalence Point Detection:**
   - **Primary Titration Curve:** Plot $\\text{pH}$ versus volume $V$. An inflection point denotes equivalence.
   - **First Derivative Method:** Plot $\\frac{\\Delta \\text{pH}}{\\Delta V}$ versus mean volume $V_{\\text{mean}}$. The sharp maximum locates the exact equivalence volume:
   $$\\frac{\\Delta \\text{pH}}{\\Delta V} = \\frac{\\text{pH}_{i+1} - \\text{pH}_i}{V_{i+1} - V_i}$$
3. **Safety & Technique:**
   - Rinse the glass electrode with deionized water and blot gently with lint-free paper between readings.
   - Keep magnetic stirring smooth without allowing the stir bar to hit the fragile glass membrane.`;
  }

  // 10. Conductometric Titration
  if (query.includes('conduct') || query.includes('conductance') || query.includes('conductivity')) {
    return `### Conductometric Titration & Ionic Mobility

In **conductometric titration**, electrolytic conductance $G$ (measured in Siemens, $\\text{S}$ or $\\text{mS}$) reflects the total concentration and mobilities of all ions in solution:

$$\\Lambda = \\frac{\\kappa \\times 1000}{C}$$

#### Mechanism in Strong Acid vs Strong Base:
1. **Initial Region:** Fast-moving hydronium ions ($\\lambda^{\\circ}_{\\text{H}^+} \\approx 349.8\\,\\text{S}\\cdot\\text{cm}^2/\\text{mol}$) are neutralized and replaced by slower sodium ions ($\\lambda^{\\circ}_{\\text{Na}^+} \\approx 50.1\\,\\text{S}\\cdot\\text{cm}^2/\\text{mol}$):
   $$\\text{H}^+ + \\text{Cl}^- + \\text{Na}^+ + \\text{OH}^- \\longrightarrow \\text{Na}^+ + \\text{Cl}^- + \\text{H}_2\\text{O}$$
   *Result:* Conductance sharply decreases.
2. **Equivalence Point:** Reached at the minimum conductance point where un-ionized water is formed.
3. **Post-Equivalence Region:** Excess $\\text{OH}^-$ ions ($\\lambda^{\\circ}_{\\text{OH}^-} \\approx 198.6\\,\\text{S}\\cdot\\text{cm}^2/\\text{mol}$) cause conductance to rise linearly.
4. **Volume Determination:** Extrapolate two linear regression segments; their intersection gives the equivalence volume.`;
  }

  // 11. Glassware & Laboratory Equipment
  if (
    query.includes('burette') ||
    query.includes('pipette') ||
    query.includes('flask') ||
    query.includes('equipment') ||
    query.includes('apparatus') ||
    query.includes('tool') ||
    query.includes('scanner')
  ) {
    return `### Laboratory Glassware & Precision Analytical Technique

When handling precision volumetric equipment in the laboratory:

#### 1. Volumetric Burette (50 mL)
- **Preparation:** Rinse with deionized water followed by two 5 mL portions of the titrant solution before filling.
- **Air Bubbles:** Ensure all trapped air bubbles are completely expelled from the stopcock tip before taking the initial reading.
- **Meniscus Reading:** Read the **lower meniscus** for clear/colorless liquids and the **upper meniscus** for intensely colored solutions at eye level to eliminate parallax error.

#### 2. Volumetric Pipette
- **Usage:** Use a safety pipette filler bulb; never pipette by mouth.
- **Drainage:** Allow gravity drainage while touching the tip to the inner vessel wall for 3 seconds. Do not blow out the residual droplet in calibrated "TD" (To Deliver) pipettes.

#### 3. Conical (Erlenmeyer) Flask
- Designed with sloping conical walls to allow vigorous swirling during titrations without liquid splashing.`;
  }

  // 12. Safety, PPE & Spill Protocols
  if (
    query.includes('safe') ||
    query.includes('hazard') ||
    query.includes('spill') ||
    query.includes('ppe') ||
    query.includes('burn')
  ) {
    return `### Chemistry Laboratory Safety Guidelines

Safety is the highest priority in chemical experimentation. Always apply conservative hazard controls:

1. **Personal Protective Equipment (PPE):**
   - Wear ANSI-approved splash goggles with side shields at all times.
   - Wear a 100% cotton laboratory coat and nitrile gloves suited to the chemicals in use.
2. **Acid Dilution Protocol:**
   - **Always add acid to water** ("*Do as you oughta, add acid to water*"), never water to acid, to prevent exothermic localized boiling and violent splattering.
3. **Chemical Spill Protocol:**
   - **Acid Spills:** Neutralize slowly with sodium bicarbonate (baking soda) before cleanup.
   - **Base Spills:** Neutralize with dilute boric acid or vinegar.
   - **Skin Contact:** Flush affected areas immediately with copious running water for a minimum of 15 minutes.
4. **Fume Hood Operation:**
   - Conduct reactions involving volatile organics, halogens, or toxic vapors inside a certified fume hood with the sash kept below the marked maximum opening height.`;
  }

  // 13. General Contextual Response
  return `### AI Chemistry Laboratory Assistant

Thank you for your inquiry: **"${userMessage.slice(0, 80)}"**

#### Analytical Chemistry Fundamentals:
- **Stoichiometry & Molarity:** Molarity $M$ is defined as moles of solute per liter of solution ($M = \\frac{n}{V}$). In neutralization:
  $$M_1 V_1 n_1 = M_2 V_2 n_2$$
  where $n$ represents the stoichiometric equivalence factor (moles of $\\text{H}^+$ or $\\text{OH}^-$ exchanged).
- **Buffer Systems:** Buffer pH is calculated via the Henderson–Hasselbalch equation:
  $$\\text{pH} = \\text{p}K_a + \\log_{10}\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right)$$
- **Laboratory Practice:** Always record volumes to two decimal places ($\\pm 0.02\\,\\text{mL}$) and perform titrations in triplicate until concordant titer values (within $0.1\\,\\text{mL}$) are obtained.

If you have specific questions about our 15 virtual experiments, the 2D laboratory simulator, or equipment identification, feel free to ask or speak via the microphone!`;
}

