import classNames from "classnames/bind";
import styles from "./ProgressBar.module.scss";
const cx = classNames.bind(styles);

function ProgressBar({ currentScore, targetScore }) {
  const minScore = 200;
  const maxScore = 800;
  const progressPercentage =
    ((currentScore - minScore) / (maxScore - minScore)) * 100;
  const targetPercentage =
    ((targetScore - minScore) / (maxScore - minScore)) * 100;
  return (
    <div className={cx("progress-container")}>
      <div className={cx("progress-bar")}>
        <div
          className={cx("progress-fill")}
          style={{ width: `${progressPercentage}%` }}
        >
          <span className={cx("current-score-inside")}>{currentScore}</span>
        </div>
      </div>
      <div className={cx("score-labels")}>
        <span className={cx("min-score")}>{minScore}</span>
        <span className={cx("max-score")}>{maxScore}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
