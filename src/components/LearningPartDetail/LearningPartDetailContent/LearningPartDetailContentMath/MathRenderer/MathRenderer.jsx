import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import katex from "katex";
import "katex/dist/katex.min.css";
import PropTypes from "prop-types";
import styles from "./MathRenderer.module.scss";
const cx = classNames.bind(styles);
const MathRenderer = ({ loadedContent }) => {
  const renderMathAndText = (input) => {
    const sanitizedHTML = DOMPurify.sanitize(input);

    const blockMathRegex = /\$\$(.*?)\$\$/gs;
    const inlineMathRegex = /\$(.*?)\$/g;

    // Replace block math expressions
    let output = sanitizedHTML.replace(blockMathRegex, (match, mathExpr) => {
      const renderedMath = katex.renderToString(mathExpr.trim(), {
        displayMode: true,
      });
      return `<div class="math-block">${renderedMath}</div>`;
    });

    // Replace inline math expressions
    output = output.replace(inlineMathRegex, (match, mathExpr) => {
      const renderedMath = katex.renderToString(mathExpr.trim(), {
        displayMode: false,
      });
      return `<span class="math-inline">${renderedMath}</span>`;
    });

    return output;
  };

  return (
    <div>
      {loadedContent && (
        <div
          className={cx("math-renderer-content")}
          dangerouslySetInnerHTML={{ __html: renderMathAndText(loadedContent) }}
        />
      )}
    </div>
  );
};

MathRenderer.propTypes = {
  loadedContent: PropTypes.string.isRequired,
};

export default MathRenderer;
