import classNames from "classnames/bind";
import { formatDate } from "~/utils/formatDate";
import styles from "./FeedbackItem.module.scss";
const cx = classNames.bind(styles);

function FeedbackItem({ feedback, setShowViewFeedback, setFeedbackData, type }) {
  const handleChooseFeedback = () => {
    setFeedbackData(feedback)
    setShowViewFeedback(true)
  }

  const generateType = () => {
    switch (feedback?.evaluateFeedbackType) {
      case "TEACHER_TO_STUDENT":
        return "Evaluate student";
      case "STUDENT_TO_TEACHER":
        return "Feedback to teacher";
      case "STUDENT_TO_STAFF":
        return "Evaluate teacher";
      case "TEACHER_TO_STAFF":
        return "Feedback to staff";
      case "STAFF_TO_MANAGER":
        return "Feedback to manager";
      default:
        return "Feedback"
    }
  };
  return (
    <div className={cx("feedback-item-container")}>
      <div className={cx("feedback-item-header")}>
        <div className={cx("user-infor")}>
          <div className={cx("user-avatar")}>
            <img src={type === "Receive" ? feedback?.accountFrom?.profileImage : feedback?.accountTo?.profileImage || "https://cdn-icons-png.flaticon.com/512/1535/1535835.png"} alt="user-avt" className={cx("avatar")} />
          </div>
          <div className={cx("user-infor")}>{type === "Receive" ? feedback?.accountFrom?.username : feedback?.accountTo?.username || "Staff"}</div>
        </div>
        <button
          className={cx("view-detail-btn")}
          onClick={handleChooseFeedback}
        >
          <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
        </button>
      </div>
      <div className={cx("feedback-item-content")}>
        <div className={cx("item-content")}>
          <i className={cx("fa-regular fa-message-dots")}></i>
          <span className={cx("item-title")}>Feedback Type:</span>
          <span className={cx("item-text")}>{generateType()}</span>
        </div>
        <div className={cx("item-content")}>
          <i className={cx("fa-regular fa-timer")}></i>
          <span className={cx("item-title")}>Created At:</span>
          <span className={cx("item-text")}>{formatDate(feedback?.createdat)}</span>
        </div>
      </div>
    </div>
  )
}

export default FeedbackItem
