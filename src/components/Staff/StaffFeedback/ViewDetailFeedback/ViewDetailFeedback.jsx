import classNames from "classnames/bind";
import styles from "./ViewDetailFeedback.module.scss";
import ViewEvaluateFeedback from "./ViewEvaluateFeedback";
import ViewNormalFeedback from "./ViewNormalFeedback";
const cx = classNames.bind(styles);

function ViewDetailFeedback({ feedbackData, setShowViewFeedback }) {
  return (
    <div className={cx("detail-feedback-view-wrapper")}>
      <div className={cx("detail-feedback-view-container")}>
        <div className={cx("detail-feedback-header")}>
          <div
            className={cx("feedback-close")}
            onClick={() => setShowViewFeedback(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("feedback-title")}>View Feedback</div>
          <div className={cx("feedback-empty")}></div>
        </div>
        <div className={cx("detail-feedback-content")}>
          {feedbackData?.evaluateFeedbackType === "STUDENT_TO_STAFF" ? (
            <ViewEvaluateFeedback feedbackData={feedbackData} />
          ) : (
            <ViewNormalFeedback feedbackData={feedbackData} />
          )}
        </div>
        <div className={cx("detail-feedback-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setShowViewFeedback(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailFeedback;
