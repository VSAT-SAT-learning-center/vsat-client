// import DOMPurify from "dompurify";
// import katex from "katex";
// import "katex/dist/katex.min.css";

// export const renderMathAndText = (input) => {
//   const sanitizedHTML = DOMPurify.sanitize(input);

//   const blockMathRegex = /\$\$(.*?)\$\$/gs;
//   const inlineMathRegex = /\$(.*?)\$/g;

//   // Replace block math expressions
//   let output = sanitizedHTML.replace(blockMathRegex, (match, mathExpr) => {
//     const renderedMath = katex.renderToString(mathExpr.trim(), {
//       displayMode: true,
//     });
//     return `<div className={cx("math-block")}>${renderedMath}</div>`;
//   });

//   // Replace inline math expressions
//   output = output.replace(inlineMathRegex, (match, mathExpr) => {
//     const renderedMath = katex.renderToString(mathExpr.trim(), {
//       displayMode: false,
//     });
//     return `<span className={cx("math-inline")}>${renderedMath}</span>`;
//   });

//   return output;
// };

// import DOMPurify from "dompurify";
// import katex from "katex";
// import "katex/dist/katex.min.css";

// export const renderMathAndText = (input) => {
//   const sanitizedHTML = DOMPurify.sanitize(input);

//   // Both block and inline math use \[...\]
//   const mathRegex = /\\\[(.*?)\\\]/gs;

//   // Replace all math expressions wrapped in \[...\]
//   let output = sanitizedHTML.replace(mathRegex, (match, mathExpr) => {
//     const renderedMath = katex.renderToString(mathExpr.trim(), {
//       displayMode: false, // Render all expressions inline by default
//     });
//     return `<span class="math-inline">${renderedMath}</span>`;
//   });

//   return output;
// };


import DOMPurify from "dompurify";
import katex from "katex";
import "katex/dist/katex.min.css";

export const renderMathAndText = (input) => {
  // Sanitize the input to remove potentially harmful content
  const sanitizedHTML = DOMPurify.sanitize(input);

  // Regex to match both block (\[...\]) and inline (\[...\]) math expressions
  const mathRegex = /\\\[(.*?)\\\]/gs;

  // Function to handle rendering math based on position (block or inline)
  const renderMath = (mathExpr, isBlock) => {
    try {
      return katex.renderToString(mathExpr.trim(), {
        displayMode: isBlock, // True for block math, false for inline math
      });
    } catch (error) {
      console.error("KaTeX rendering error:", error);
      return `<span class="math-error">Error rendering math</span>`;
    }
  };

  // Process both block and inline math in one pass
  const output = sanitizedHTML.replace(mathRegex, (match, mathExpr) => {
    const isBlock = match.includes("\n"); // Block math typically includes line breaks
    const renderedMath = renderMath(mathExpr, isBlock);
    return isBlock
      ? `<div class="math-block">${renderedMath}</div>`
      : `<span class="math-inline">${renderedMath}</span>`;
  });

  return output;
};
