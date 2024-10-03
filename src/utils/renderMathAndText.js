import DOMPurify from "dompurify";
import katex from "katex";
import "katex/dist/katex.min.css";

export const renderMathAndText = (input) => {
  const sanitizedHTML = DOMPurify.sanitize(input);

  const blockMathRegex = /\$\$(.*?)\$\$/gs;
  const inlineMathRegex = /\$(.*?)\$/g;

  // Replace block math expressions
  let output = sanitizedHTML.replace(blockMathRegex, (match, mathExpr) => {
    const renderedMath = katex.renderToString(mathExpr.trim(), {
      displayMode: true,
    });
    return `<div className={cx("math-block")}>${renderedMath}</div>`;
  });

  // Replace inline math expressions
  output = output.replace(inlineMathRegex, (match, mathExpr) => {
    const renderedMath = katex.renderToString(mathExpr.trim(), {
      displayMode: false,
    });
    return `<span className={cx("math-inline")}>${renderedMath}</span>`;
  });

  return output;
};