/**
 * Client service for communicating with the AI Lab Assistant backend.
 */

const API_BASE_URL = window.location.origin.includes(':5173')
  ? 'http://localhost:5000/api'
  : '/api';

export class ChatService {
  constructor() {
    this.history = [];
  }

  /**
   * Check backend health and AI status
   */
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) {
        return { ok: false, error: `Health check failed with status ${res.status}` };
      }
      const data = await res.json();
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message || 'Cannot reach backend server at http://localhost:5000' };
    }
  }

  /**
   * Send a question to the AI API via backend
   * @param {string} message
   * @returns {Promise<{success: boolean, reply?: string, truncated?: boolean, error?: string, code?: string}>}
   */
  async sendMessage(message) {
    if (!message || !message.trim()) {
      return { success: false, error: 'Message cannot be empty.' };
    }

    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          history: this.history,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          error: data.error || `Server responded with status ${res.status}`,
          code: data.code,
        };
      }

      // Append to local conversational history
      this.history.push({ role: 'user', text: message.trim() });
      this.history.push({ role: 'assistant', text: data.reply });

      // Cap local history to 10 entries
      if (this.history.length > 10) {
        this.history = this.history.slice(-10);
      }

      return {
        success: true,
        reply: data.reply,
        truncated: Boolean(data.truncated),
        model: data.model,
      };
    } catch (err) {
      console.error('ChatService network error:', err);
      return {
        success: false,
        error:
          'Network connection error: Failed to connect to the backend server. Ensure the backend is running on port 5000 (cd backend && npm run dev).',
      };
    }
  }

  /**
   * Send a question using Server-Sent Events (SSE) streaming for real-time progressive response.
   * Gracefully falls back to standard sendMessage if streaming is unavailable or fails.
   *
   * @param {string} message
   * @param {function(string, {done: boolean, fullText: string, truncated?: boolean, model?: string}): void} onChunk
   * @param {object} [options]
   * @param {AbortSignal} [options.signal]
   * @returns {Promise<{success: boolean, reply?: string, truncated?: boolean, error?: string, code?: string}>}
   */
  async sendMessageStream(message, onChunk, options = {}) {
    if (!message || !message.trim()) {
      return { success: false, error: 'Message cannot be empty.' };
    }

    const trimmed = message.trim();

    try {
      const res = await fetch(`${API_BASE_URL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          message: trimmed,
          history: this.history,
        }),
        signal: options.signal,
      });

      // If streaming endpoint is missing or responds with an error status prior to stream start, fallback to non-streaming
      if (!res.ok || !res.body) {
        console.warn(`Streaming response not OK (${res.status}), falling back to non-streaming endpoint.`);
        const fallback = await this.sendMessage(trimmed);
        if (fallback.success && typeof onChunk === 'function') {
          onChunk(fallback.reply, {
            done: true,
            fullText: fallback.reply,
            truncated: fallback.truncated,
            model: fallback.model,
          });
        }
        return fallback;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let fullText = '';
      let isDone = false;
      let isTruncated = false;
      let usedModel = '';

      while (!isDone) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // retain incomplete trailing line in buffer

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith('data:')) continue;

          const jsonStr = trimmedLine.slice(5).trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            if (data.error) {
              throw new Error(data.error);
            }

            if (data.text) {
              fullText += data.text;
              if (typeof onChunk === 'function') {
                onChunk(data.text, {
                  done: false,
                  fullText,
                  truncated: false,
                });
              }
            }

            if (data.done) {
              isDone = true;
              isTruncated = Boolean(data.truncated);
              usedModel = data.model || '';
              if (typeof onChunk === 'function') {
                onChunk('', {
                  done: true,
                  fullText,
                  truncated: isTruncated,
                  model: usedModel,
                });
              }
            }
          } catch (e) {
            console.warn('Skipping malformed stream chunk:', jsonStr, e);
          }
        }
      }

      // Append to conversational history
      this.history.push({ role: 'user', text: trimmed });
      this.history.push({ role: 'assistant', text: fullText });

      if (this.history.length > 10) {
        this.history = this.history.slice(-10);
      }

      return {
        success: true,
        reply: fullText,
        truncated: isTruncated,
        model: usedModel,
      };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, aborted: true, error: 'Request cancelled by user.' };
      }

      console.warn('Streaming error, attempting non-streaming fallback:', err);
      try {
        const fallback = await this.sendMessage(trimmed);
        if (fallback.success && typeof onChunk === 'function') {
          onChunk(fallback.reply, {
            done: true,
            fullText: fallback.reply,
            truncated: fallback.truncated,
            model: fallback.model,
          });
        }
        return fallback;
      } catch (fallbackErr) {
        return {
          success: false,
          error: err.message || 'Failed to communicate with AI Lab Assistant.',
        };
      }
    }
  }

  clearHistory() {
    this.history = [];
  }
}

export const chatService = new ChatService();
