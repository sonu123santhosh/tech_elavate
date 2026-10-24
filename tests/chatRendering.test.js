import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanLatexExpression,
  renderLatexSafe,
  sanitizeHtml,
  renderScientificMarkdown,
} from '../frontend/src/features/ai-assistant/ChatRenderer.js';

test('ChatRenderer - Normalizes raw escaped Markdown separators to horizontal rules', () => {
  const input = 'First paragraph\n\n\\---\n\nSecond paragraph';
  const html = renderScientificMarkdown(input);

  assert.ok(html.includes('<hr'), 'Should contain an <hr> tag');
  assert.ok(!html.includes('\\---'), 'Raw \\--- must never be displayed literally');
  assert.ok(html.includes('First paragraph'));
  assert.ok(html.includes('Second paragraph'));
});

test('ChatRenderer - Fixes escaped underscores inside LaTeX chemistry and math formulas', () => {
  // Test cleanLatexExpression helper
  const malformed = '\\text{H}\\_2\\text{O} + \\text{H}\\^+';
  const cleaned = cleanLatexExpression(malformed);
  assert.equal(cleaned, '\\text{H}_2\\text{O} + \\text{H}^+');

  // Test full rendering of chemical formula with escaped underscore
  const input = 'Water is represented as $\\text{H}\\_2\\text{O}$ and hydronium ion as $\\text{H}_3\\text{O}^+$.';
  const html = renderScientificMarkdown(input);

  assert.ok(html.includes('class="katex"'), 'KaTeX must render inline math');
  assert.ok(!html.includes('\\_2'), 'Escaped \\_2 must be cleaned in math output');
  assert.ok(html.includes('Water is represented as'));
});

test('ChatRenderer - Renders display equations and complex chemistry reactions', () => {
  const reactionInput = 'Reaction:\n$$\\text{CH}\\_3\\text{COOH} + \\text{NaOH} \\rightarrow \\text{CH}\\_3\\text{COONa} + \\text{H}\\_2\\text{O}$$';
  const html = renderScientificMarkdown(reactionInput);

  assert.ok(html.includes('class="katex-display-wrapper"'), 'Display math must be wrapped in display container');
  assert.ok(html.includes('class="katex-display"'), 'KaTeX display class must be generated');
  assert.ok(!html.includes('$$'), 'Raw $$ delimiters must not appear in rendered output');
});

test('ChatRenderer - Correctly formats Markdown headings, bold, italics, lists, and code blocks', () => {
  const markdownText = `## Acid-Base Titration

**Important Note:** Titration requires precise dropwise addition.

*Key points:*
1. Rinse burette with titrant
2. Eliminate air bubbles below stopcock

- Indicator: Phenolphthalein
- Color change: *Colorless* to **pale pink**

\`\`\`python
# Sample titration derivative calculation
delta_pH = ph2 - ph1
\`\`\`

> Caution: Always wear chemical safety goggles.`;

  const html = renderScientificMarkdown(markdownText);

  // Headings
  assert.ok(html.includes('<h2') && html.includes('Acid-Base Titration</h2>'));
  // Bold & Italics
  assert.ok(html.includes('<strong>Important Note:</strong>'));
  assert.ok(html.includes('<em>Key points:</em>'));
  assert.ok(html.includes('<em>Colorless</em>'));
  assert.ok(html.includes('<strong>pale pink</strong>'));
  // Ordered & Unordered Lists
  assert.ok(html.includes('<ol>') && html.includes('<li>Rinse burette with titrant</li>'));
  assert.ok(html.includes('<ul>') && html.includes('<li>Indicator: Phenolphthalein</li>'));
  // Code Block
  assert.ok(html.includes('<pre><code') && html.includes('delta_pH = ph2 - ph1'));
  // Blockquote
  assert.ok(html.includes('<blockquote>'));
});

test('ChatRenderer - Sanitizes dangerous HTML to prevent XSS attacks', () => {
  const unsafeText = '<script>alert("hack")</script><img src="x" onerror="alert(1)">Safe text';
  const sanitized = sanitizeHtml(unsafeText);

  assert.ok(!sanitized.includes('<script>'), 'Must strip <script> tags');
  assert.ok(!sanitized.includes('onerror='), 'Must strip onerror attribute');
  assert.ok(sanitized.includes('Safe text'), 'Must preserve safe text');
});

test('ChatRenderer - Handles malformed LaTeX gracefully without crashing', () => {
  // Deliberately broken math string with unmatched braces
  const brokenMath = 'Equation: $\\text{unmatched {brace$ is here.';
  assert.doesNotThrow(() => {
    const html = renderScientificMarkdown(brokenMath);
    assert.ok(html.includes('Equation:'), 'Should render text surrounding math safely');
  });
});

test('ChatRenderer - repairIncompleteMarkdown auto-closes open syntax blocks during streaming', () => {
  // 1. Unclosed display math
  const unclosedDisplay = 'Equilibrium:\n$$\\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}^+';
  const repairedDisplay = renderScientificMarkdown(unclosedDisplay, { isStreaming: true });
  assert.ok(repairedDisplay.includes('class="katex"'), 'KaTeX must render even when display math is cut off');
  assert.ok(!repairedDisplay.includes('$$'), 'Raw $$ delimiter should be processed cleanly');

  // 2. Unclosed code block
  const unclosedCode = '```python\ndef calculate_equivalence_point(v, ph):\n    return max(ph)';
  const repairedCode = renderScientificMarkdown(unclosedCode, { isStreaming: true });
  assert.ok(repairedCode.includes('<pre><code'), 'Incomplete code block must be auto-closed into code element');

  // 3. Unclosed bold
  const unclosedBold = '**Important safety directive:';
  const repairedBold = renderScientificMarkdown(unclosedBold, { isStreaming: true });
  assert.ok(repairedBold.includes('<strong>Important safety directive:</strong>'));
});

test('ChatRenderer - Full streaming chunk simulation with chemistry formulas, lists, and equations', () => {
  // Simulate stream chunks arriving one by one
  const chunks = [
    '### pH-Metric Titration Explanation\n\n',
    'In this titration of **CH₃COOH** with **NaOH**:\n',
    '- Burette reading tolerance is $\\pm 0.05\\text{ mL}$\n',
    '- The neutralization equation is:\n',
    '$$\\text{CH}_3\\text{COOH} + \\text{NaOH} \\rightarrow \\text{CH}_3\\text{COONa} + \\text{H}_2\\text{O}$$',
    '\n\n```python\n# Derivative calculation\ndelta_pH = ph2 - ph1',
    '\n```\n\n*Equivalence point occurs at basic pH ~8.7.*',
  ];

  let accumulated = '';
  for (const chunk of chunks) {
    accumulated += chunk;
    assert.doesNotThrow(() => {
      const rendered = renderScientificMarkdown(accumulated, { isStreaming: true });
      assert.ok(typeof rendered === 'string');
      assert.ok(rendered.length > 0);
    });
  }

  // Final complete render
  const finalHtml = renderScientificMarkdown(accumulated);
  assert.ok(finalHtml.includes('pH-Metric Titration Explanation'));
  assert.ok(finalHtml.includes('class="katex"'));
  assert.ok(finalHtml.includes('<pre><code'));
});

