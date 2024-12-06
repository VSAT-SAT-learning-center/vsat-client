import classNames from "classnames/bind";
import styles from "./ViewNormalFeedback.module.scss";
const cx = classNames.bind(styles);

function ViewNormalFeedback({ feedbackData }) {
  return (
    <div className={cx("send-feedback-container")}>
      <div className={cx("reason-feedback")}>
        <div className={cx("title")}>Reason Feedback</div>
        <div className={cx("reason-input")}>
          <div className={cx("input")}>{feedbackData?.reason}</div>
        </div>
      </div>
      <div className={cx("detail-feedback")}>
        <div className={cx("title")}>Detail Narrative Feedback</div>
        <div className={cx("detail-input")}>
          <div className={cx("input")}>{feedbackData?.narrativeFeedback}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewNormalFeedback;
