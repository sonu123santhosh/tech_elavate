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
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: LAB_ASSISTANT_SYSTEM_INSTRUCTION,
            temperature: 0.4,
            maxOutputTokens: 8192,
            thinkingConfig: { thinkingBudget: 1024 },
          },
        });

        let replyText = response.text;
        const candidate = response.candidates?.[0];
        const finishReason = candidate?.finishReason || 'STOP';
        const isTruncated = finishReason === 'MAX_TOKENS';

        if (replyText) {
          if (isTruncated) {
            replyText +=
              '\n\n> ⚠️ **Note:** This response reached the maximum output token limit. Click **"Continue"** or ask the assistant to continue to receive the rest of the explanation.';
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

    // If all models failed
    const errorMessage = lastError?.message || 'AI service temporarily unavailable.';
    return res.status(500).json({
      success: false,
      error: `Gemini API error: ${errorMessage}`,
      code: lastError?.code || 'GEMINI_API_ERROR',
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
        const responseStream = await ai.models.generateContentStream({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: LAB_ASSISTANT_SYSTEM_INSTRUCTION,
            temperature: 0.4,
            maxOutputTokens: 8192,
            thinkingConfig: { thinkingBudget: 1024 },
          },
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
            '\n\n> ⚠️ **Note:** This response reached the maximum output token limit. Click **"Continue"** or ask the assistant to continue to receive the rest of the explanation.';
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
      res.write(
        `data: ${JSON.stringify({ error: lastError?.message || 'AI streaming service unavailable', done: true })}\n\n`
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
