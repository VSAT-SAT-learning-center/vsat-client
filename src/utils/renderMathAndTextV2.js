import DOMPurify from "dompurify";
import katex from "katex";
import "katex/dist/katex.min.css";

export const renderMathAndTextV2 = (input) => {
  const sanitizedHTML = DOMPurify.sanitize(input);

  // Match only math expressions in square brackets `[...]`
  const mathRegex = /\[(.*?)\]/gs;

  const renderMath = (mathExpr) => {
    try {
      // Render math expression as inline math (without displayMode block formatting)
      return katex.renderToString(mathExpr.trim(), {
        displayMode: false, // Ensure that math is rendered inline
        throwOnError: false, // Prevent KaTeX from throwing errors
      });
    } catch (error) {
      console.error("KaTeX rendering error:", error);
      return `<span class="math-error">Error rendering math</span>`;
    }
  };

  // Replace each occurrence of matched math expression with rendered KaTeX
  const output = sanitizedHTML.replace(mathRegex, (match, mathExpr) => {
    // Render math expression using KaTeX
    const renderedMath = renderMath(mathExpr);
    return `<span class="math-inline">${renderedMath}</span>`;
  });

  return output;
};
