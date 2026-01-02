/**
 * Cleans text based on provided options.
 * @param {string} text - The input text to clean.
 * @param {Object} options - Cleaning options.
 * @returns {string} The cleaned text.
 */
export function clean(text, options = {}) {
  const defaults = {
    trim: true,
    collapseSpaces: true,
    normalizeNewlines: true,
    removeZeroWidth: true,
    normalizeNBSP: true,
    preserveEmojis: true, // No-op for now as we don't strip them by default
    preserveAccents: true, // No-op as we don't strip them
  };

  const config = { ...defaults, ...options };

  if (!text) return "";

  let cleaned = text;

  // 1. Remove Zero-width characters (e.g., ZWSP, BOM)
  if (config.removeZeroWidth) {
    // \u200B: Zero Width Space
    // \uFEFF: Zero Width No-Break Space (BOM)
    // \u200C: Zero Width Non-Joiner
    // \u200D: Zero Width Joiner
    cleaned = cleaned.replace(/[\u200B\uFEFF\u200C\u200D]/g, "");
  }

  // 2. Normalize Newlines
  if (config.normalizeNewlines) {
    cleaned = cleaned.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  }

  // 3. Normalize Non-Breaking Spaces
  if (config.normalizeNBSP) {
    cleaned = cleaned.replace(/\u00A0/g, " ");
  }

  // 4. Collapse Multiple Spaces
  if (config.collapseSpaces) {
    // If normalizing newlines, we want to keep single newlines but collapse horizontal spaces
    // If we used \s+, it would eat newlines too if we are not careful.
    // Strategy: Split by lines, collapse spaces in each line, join back?
    // Or just replace [ \t]+ with " " globally?
    // User requirement: "Collapse multiple spaces"
    // Usually means "  " -> " ".
    // Does it include " \n " -> "\n"?
    // Let's assume horizontal whitespace collapsing for now to preserve structure if desired.
    // But usually "clean text" implies paragraph reflowing.
    // Let's look at the default behavior of other tools.
    // The user asked to "Normalize newlines".
    // Let's assume [ \t]+ -> " ".
    cleaned = cleaned.replace(/[ \t]+/g, " ");
  }

  // 5. Trim
  if (config.trim) {
    cleaned = cleaned.trim();
    // Also trim each line if multiline?
    // Let's stick to global trim for now as per "Trim leading/trailing whitespace"
    // Usually implies the whole string.
    // If we want to trim every line:
    cleaned = cleaned
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
  }

  // Re-apply unicode normalization to NFC to be safe
  cleaned = cleaned.normalize("NFC");

  return cleaned;
}
