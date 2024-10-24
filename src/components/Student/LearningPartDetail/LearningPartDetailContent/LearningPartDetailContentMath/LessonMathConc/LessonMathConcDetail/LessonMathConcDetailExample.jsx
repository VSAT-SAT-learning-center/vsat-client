import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import MathRenderer from "../../MathRenderer";
import styles from "./LessonMathConcDetail.module.scss";
const cx = classNames.bind(styles);

function LessonMathConcDetailExample({ example }) {
  const [isShowExample, setIsShowExample] = useState(false);

  const handleShowExample = () => {
    setIsShowExample(!isShowExample);
  };
  return (
    <div className={cx("conc-detail-example")}>
      <MathRenderer loadedContent={example?.content} />
      <div className={cx("show-example")}>
        <div className={cx("show-example-title")} onClick={handleShowExample}>
          <div className={cx("title")}>
            {isShowExample ? "Hide" : "Show me!"}
          </div>
          <i
            className={cx(
              isShowExample
                ? "fa-solid fa-chevron-up"
                : "fa-solid fa-chevron-down",
              "icon-show"
            )}
          ></i>
        </div>
        {isShowExample && <MathRenderer loadedContent={example?.explain} />}
      </div>
    </div>
  );
}

LessonMathConcDetailExample.propTypes = {
  example: PropTypes.object,
};

export default LessonMathConcDetailExample;
