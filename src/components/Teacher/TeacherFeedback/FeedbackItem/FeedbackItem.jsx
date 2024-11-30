import classNames from "classnames/bind";
import { formatDate } from "~/utils/formatDate";
import styles from "./FeedbackItem.module.scss";
const cx = classNames.bind(styles);

function FeedbackItem({
  feedback,
  setShowViewFeedback,
  setFeedbackData,
  type,
}) {
  console.log(feedback);

  const handleChooseFeedback = () => {
    setFeedbackData(feedback);
    setShowViewFeedback(true);
  };

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
        return "Feedback";
    }
  };

  const generateUsername = () => {
    if (type === "Receive") {
      return feedback?.accountFrom?.username;
    } else {
      if (feedback?.evaluateFeedbackType === "STUDENT_TO_STAFF" || feedback?.evaluateFeedbackType === "TEACHER_TO_STAFF") {
        return "Staff"
      } else if (feedback?.evaluateFeedbackType === "STAFF_TO_MANAGER") {
        return "Manager";
      } else {
        return feedback?.accountTo?.username || "Unknown User";
      }
    }
  };

  const generateProfileImage = () => {
    if (type === "Receive") {
      return feedback?.accountFrom?.profileImage;
    } else {
      if (feedback?.evaluateFeedbackType === "STUDENT_TO_STAFF" || feedback?.evaluateFeedbackType === "TEACHER_TO_STAFF") {
        return "https://cdn-icons-png.flaticon.com/512/1535/1535835.png"
      } else if (feedback?.evaluateFeedbackType === "STAFF_TO_MANAGER") {
        return "https://cdn-icons-png.flaticon.com/512/2552/2552801.png";
      } else {
        return feedback?.accountTo?.profileImage ||
          "https://cdn-icons-png.flaticon.com/512/18174/18174163.png"
      }
    }
  };

  return (
    <div className={cx("feedback-item-container")}>
      <div className={cx("feedback-item-header")}>
        <div className={cx("user-infor")}>
          <div className={cx("user-avatar")}>
            <img
              src={generateProfileImage()}
              alt="user-avt"
              className={cx("avatar")}
            />
          </div>
          <div className={cx("user-infor")}>{generateUsername()}</div>
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
          <span className={cx("item-text")}>
            {formatDate(feedback?.createdat)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FeedbackItem;
