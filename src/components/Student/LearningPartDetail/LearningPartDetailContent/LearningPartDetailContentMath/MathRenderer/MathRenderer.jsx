import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./MathRenderer.module.scss";
const cx = classNames.bind(styles);
const MathRenderer = ({ loadedContent }) => {
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
