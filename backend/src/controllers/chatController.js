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

  return `### AI Chemistry Laboratory Assistant

Thank you for your inquiry: **"${userMessage.slice(0, 80)}"**

#### Analytical Chemistry Fundamentals:
- **Stoichiometry & Molarity:** Molarity $M$ is defined as moles of solute per liter of solution ($M = \\frac{n}{V}$). In neutralization:
  $$M_1 V_1 n_1 = M_2 V_2 n_2$$
  where $n$ represents the stoichiometric equivalence factor (moles of $\\text{H}^+$ or $\\text{OH}^-$ exchanged).
- **Buffer Systems:** Buffer pH is calculated via the Henderson-Hasselbalch equation:
  $$\\text{pH} = \\text{p}K_a + \\log_{10}\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right)$$
- **Laboratory Practice:** Always record volumes to two decimal places ($\\pm 0.02\\,\\text{mL}$) and perform titrations in triplicate until concordant titer values (within $0.1\\,\\text{mL}$) are obtained.

If you have specific questions about our 15 virtual experiments, the 2D laboratory simulator, or equipment identification, feel free to ask or speak via the microphone!`;
}

