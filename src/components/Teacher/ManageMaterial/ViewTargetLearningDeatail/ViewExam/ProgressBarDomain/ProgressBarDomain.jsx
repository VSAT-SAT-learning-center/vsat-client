import classNames from "classnames/bind";
import styles from "./ProgressBarDomain.module.scss";
const cx = classNames.bind(styles);

function ProgressBarDomain({ title, correct, incorrect }) {
  const total = correct + incorrect;
  const correctPercentage = (correct / total) * 100;
  const incorrectPercentage = (incorrect / total) * 100;
  return (
    <div className={cx("progress-container")}>
      <div className={cx("progress-title")}>{title}</div>
      <div className={cx("progress-bar")}>
        <div
          className={cx("progress-correct")}
          style={{ width: `${correctPercentage}%` }}
        >
          {correct > 0 && (
            <span className={cx("progress-label")}>{correct}</span>
          )}
        </div>
        <div
          className={cx("progress-incorrect")}
          style={{ width: `${incorrectPercentage}%` }}
        >
          {incorrect > 0 && (
            <span className={cx("progress-label")}>{incorrect}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressBarDomain;
