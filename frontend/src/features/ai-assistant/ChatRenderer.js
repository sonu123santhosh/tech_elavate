/**
 * Scientific Markdown, LaTeX, and Chemistry Notation Renderer for AI Lab Assistant.
 *
 * Integrates:
 * - Marked for standard-compliant GitHub Flavored Markdown (headings, lists, bold, italics, tables, code blocks).
 * - KaTeX + mhchem for inline math ($...$, \(...\)) and display math ($$...$$, \[...\]) with chemistry notation.
 * - Chemistry sanitization: handles malformed inputs such as escaped underscores (\_ in chemical names like \text{H}\_2\text{O}),
 *   escaped separators (\---), and Unicode chemical reaction arrows/superscripts/subscripts.
 * - HTML sanitization to prevent XSS and script execution.
 */

import { marked } from 'marked';
import katex from 'katex';
import 'katex/contrib/mhchem';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
});

/**
 * Basic HTML sanitizer to strip malicious tags and event handlers.
 * @param {string} html
 * @returns {string}
 */
export function sanitizeHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/\son\w+=[^\s>]+/gi, '')
    .replace(/javascript:/gi, 'no-javascript:');
}

/**
 * Clean malformed math and chemistry notation inside LaTeX expressions.
 * @param {string} mathCode
 * @returns {string}
 */
export function cleanLatexExpression(mathCode) {
  if (!mathCode) return '';

  let cleaned = mathCode;

  // 1. Fix escaped underscores inside math mode (e.g., \text{H}\_2\text{O} -> \text{H}_2\text{O})
  cleaned = cleaned.replace(/\\_/g, '_');

  // 2. Fix escaped carets (e.g., \text{H}\^+ -> \text{H}^+)
  cleaned = cleaned.replace(/\\\^/g, '^');

  // 3. Fix \degree to ^{\circ} or ^{\circ}\text{C}
  cleaned = cleaned.replace(/\\degree/g, '^{\\circ}');

  // 4. Fix escaped curly braces that were mistakenly doubled
  cleaned = cleaned.replace(/\\\\\{/g, '\\{').replace(/\\\\\}/g, '\\}');

  return cleaned.trim();
}

/**
 * Render a LaTeX string with KaTeX safely, falling back gracefully if malformed.
 * @param {string} latex
 * @param {boolean} isDisplay
 * @returns {string}
 */
export function renderLatexSafe(latex, isDisplay = false) {
  const cleaned = cleanLatexExpression(latex);
  if (!cleaned) return '';

  try {
    return katex.renderToString(cleaned, {
      displayMode: isDisplay,
      throwOnError: false,
      strict: false,
      trust: false,
      output: 'htmlAndMathml',
    });
  } catch (err) {
    console.warn('KaTeX rendering error for:', cleaned, err);
    // Graceful fallback to styled monospace math without crashing
    return `<span class="katex-fallback">${escapeHtml(cleaned)}</span>`;
  }
}

/**
 * Helper to escape HTML characters
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Auto-closes unclosed markdown, LaTeX, and code fences when rendering streaming text.
 * Prevents mangled syntax when chunks arrive incrementally.
 * @param {string} text
 * @returns {string}
 */
export function repairIncompleteMarkdown(text) {
  if (!text || typeof text !== 'string') return '';

  let repaired = text;

  // 1. Repair unclosed code blocks: count triple backticks
  const codeBlockMatches = repaired.match(/```/g);
  if (codeBlockMatches && codeBlockMatches.length % 2 !== 0) {
    repaired += '\n```';
  }

  // 2. Repair unclosed display math $$: count unescaped $$
  const displayMathMatches = repaired.match(/(?<!\\)\$\$/g);
  if (displayMathMatches && displayMathMatches.length % 2 !== 0) {
    repaired += '\n$$';
  }

  // 3. Repair unclosed display math \[ ... \]
  const openBracketMath = (repaired.match(/\\\[/g) || []).length;
  const closeBracketMath = (repaired.match(/\\\]/g) || []).length;
  if (openBracketMath > closeBracketMath) {
    repaired += '\n\\]';
  }

  // 4. Repair unclosed inline math $ ... $ (exclude $$)
  const withoutDisplayMath = repaired.replace(/(?<!\\)\$\$[\s\S]*?\$\$/g, '').replace(/(?<!\\)\$\$/g, '');
  const singleDollarMatches = withoutDisplayMath.match(/(?<!\\|\$)\$(?!\$)/g);
  if (singleDollarMatches && singleDollarMatches.length % 2 !== 0) {
    repaired += '$';
  }

  // 5. Repair unclosed inline math \( ... \)
  const openParenMath = (repaired.match(/\\\(/g) || []).length;
  const closeParenMath = (repaired.match(/\\\)/g) || []).length;
  if (openParenMath > closeParenMath) {
    repaired += '\\)';
  }

  // 6. Repair unclosed bold **
  const boldMatches = repaired.match(/(?<!\\)\*\*/g);
  if (boldMatches && boldMatches.length % 2 !== 0) {
    repaired += '**';
  }

  return repaired;
}

/**
 * Preprocess raw text from the AI to normalize Markdown separators, LaTeX blocks,
 * and chemical expressions.
 * @param {string} text
 * @param {object} [options]
 * @param {boolean} [options.isStreaming]
 * @returns {string}
 */
export function renderScientificMarkdown(text, options = {}) {
  if (!text || typeof text !== 'string') return '';

  // Always repair incomplete open syntax (vital during streaming or if cut off)
  let processed = repairIncompleteMarkdown(text);

  // 1. Fix raw escaped Markdown separators (e.g., \--- or \*** or \___)
  processed = processed.replace(/^(\s*)\\\-{3,}(\s*)$/gm, '\n\n---\n\n');
  processed = processed.replace(/^(\s*)\\\*{3,}(\s*)$/gm, '\n\n---\n\n');
  processed = processed.replace(/^(\s*)\\_{3,}(\s*)$/gm, '\n\n---\n\n');

  // 2. Fix escaped headings (e.g., \#\# Heading -> ## Heading)
  processed = processed.replace(/^(\s*)\\#(\s+|#+)/gm, '$1#$2');

  // 3. Extract and protect LaTeX math expressions before Markdown parser touches them
  const mathPlaceholders = [];
  function saveMath(mathCode, isDisplay) {
    const rendered = renderLatexSafe(mathCode, isDisplay);
    const token = `KATEXMATH_${mathPlaceholders.length}_TOKEN`;
    mathPlaceholders.push({ token, html: rendered, isDisplay });
    return isDisplay ? `\n\n${token}\n\n` : ` ${token} `;
  }

  // Display math: $$ ... $$
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, code) => saveMath(code, true));

  // Display math: \[ ... \]
  processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (match, code) => saveMath(code, true));

  // Inline math: $ ... $ (ensure not followed/preceded by another $)
  processed = processed.replace(/(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)/g, (match, code) => saveMath(code, false));

  // Inline math: \( ... \)
  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (match, code) => saveMath(code, false));

  // 4. Normalize unescaped chemical formulas with escaped underscores outside math (e.g. CH\_3COOH -> CH₃COOH, H\_2O -> H₂O)
  const subscriptMap = {
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉',
  };
  processed = processed.replace(/([A-Z][a-z]?)\\_([0-9]+)/g, (match, elem, digits) => {
    return elem + digits.split('').map((d) => subscriptMap[d] || d).join('');
  });

  // 5. Fix stray escaped underscores between alphanumeric characters (e.g., pH\_max -> pH_max, delta\_pH -> delta_pH)
  processed = processed.replace(/([A-Za-z0-9])\\_([A-Za-z0-9])/g, '$1_$2');

  // 6. Convert chemistry reaction arrow symbols if written in plain text
  processed = processed.replace(/\s*->\s*/g, ' → ');
  processed = processed.replace(/\s*<->\s*/g, ' ⇌ ');
  processed = processed.replace(/\s*<=>\s*/g, ' ⇌ ');

  // 7. Parse with Marked
  let parsedHtml = '';
  try {
    parsedHtml = marked.parse(processed);
  } catch (err) {
    console.warn('Marked parsing error, falling back:', err);
    parsedHtml = `<p>${escapeHtml(processed).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>`;
  }

  // 8. Re-inject rendered KaTeX HTML tokens
  mathPlaceholders.forEach(({ token, html: mathHtml, isDisplay }) => {
    if (isDisplay) {
      // If Marked wrapped the display token in a paragraph <p>KATEXMATH_0_TOKEN</p>, unwrap it into a display div
      const pWrapped = new RegExp(`<p>\\s*${token}\\s*<\\/p>`, 'g');
      if (pWrapped.test(parsedHtml)) {
        parsedHtml = parsedHtml.replace(pWrapped, `<div class="katex-display-wrapper">${mathHtml}</div>`);
      } else {
        parsedHtml = parsedHtml.replace(token, `<div class="katex-display-wrapper">${mathHtml}</div>`);
      }
    } else {
      parsedHtml = parsedHtml.replace(token, mathHtml);
    }
  });

  // 9. Sanitize the finalized HTML to prevent XSS
  return sanitizeHtml(parsedHtml);
}
