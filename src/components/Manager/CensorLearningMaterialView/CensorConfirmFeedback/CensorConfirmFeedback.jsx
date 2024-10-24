import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import apiClient from "~/services/apiService";
import styles from "./CensorConfirmFeedback.module.scss";
const cx = classNames.bind(styles);

function CensorConfirmFeedback({ unitDetails, censorStatus, finalCensorResult, setIsShowConfirmFeedback }) {
  const navigate = useNavigate();
  const handleApproveLesson = async () => {
    const lessonsFeedbackData = censorStatus.map(item => ({
      lessonId: item.lessonId,
      content: item.content,
      reason: item.reason
    }));
    const feedbackData = {
      unitFeedback: {
        unitId: unitDetails?.id,
        lessonsFeedback: lessonsFeedbackData
      }
    }
    console.log(feedbackData);
    try {
      const response = await apiClient.post(`/feedbacks/censor/approve`, feedbackData);
      console.log("Approve API response:", response.data);
      navigate("/manager/learning-material/overview")
    } catch (error) {
      console.error("Error approving feedback:", error);
    }
  }
  const handleRejectLesson = async () => {
    const lessonsFeedbackData = censorStatus.map(item => ({
      lessonId: item.lessonId,
      isRejected: item.status === "Rejected",
      content: item.content,
      reason: item.reason
    }));
    const feedbackData = {
      unitFeedback: {
        unitId: unitDetails?.id,
        lessonsFeedback: lessonsFeedbackData
      }
    }
    try {
      // Call the reject API endpoint
      const response = await apiClient.post(`/feedbacks/censor/reject`, feedbackData);
      console.log("Reject API response:", response.data);
      navigate("/manager/learning-material/feedback")
    } catch (error) {
      console.error("Error rejecting feedback:", error);
    }
  }
  return (
    <div className={cx("censor-confirm-feedback-wrapper")}>
      <div className={cx("censor-confirm-feedback-container")}>
        <div className={cx("censor-confirm-feedback-heeader")}>
          <div className={cx("header-left")}>
            <div className={cx("view-back")} onClick={() => setIsShowConfirmFeedback(false)}>
              <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
            </div>
            <div className={cx("view-title")}>{unitDetails?.title}</div>
          </div>
        </div>
        <div className={cx("censor-confirm-feedback-content")}>
          {censorStatus?.length > 0 && censorStatus.map((feedbackItem) => (
            <div className={cx("confirm-feedback-item", feedbackItem.status === "Approved" ? "approved-type" : "rejected-type")} key={feedbackItem.lessonId}>
              <div className={cx("feedback-content")}>
                <div className={cx("feedback-title")}>
                  <div className={cx("feedback-item-icon")}>
                    <i className={cx("fa-sharp fa-regular fa-file", "item-icon")}></i>
                  </div>
                  <div className={cx("feedback-item-text")}>{feedbackItem.lessonTitle}</div>
                </div>
                <div className={cx("feedback-status", feedbackItem.status === "Approved" ? "approved" : "rejected")}>{feedbackItem.status}</div>
              </div>
              {feedbackItem.status === "Rejected" && (
                <div className={cx("feedback-reason")}>
                  <div className={cx("reason-infor")}>
                    <i className={cx("fa-regular fa-lightbulb", "reason-icon")}></i>
                    <span className={cx("reason-title")}><span className={cx("highlight")}>Reason:</span> {feedbackItem.reason}</span>
                  </div>
                  <div className={cx("reason-content")}>
                    <i className={cx("fa-regular fa-lightbulb-exclamation", "reason-icon")}></i>
                    <span className={cx("reason-text")}><span className={cx("highlight")}>Content:</span> {feedbackItem.content}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={cx("censor-confirm-feedback-footer")}>
          <button className={cx("cancel-btn")} onClick={() => setIsShowConfirmFeedback(false)}>Cancel</button>
          {finalCensorResult && (
            finalCensorResult === "Approved" ? (
              <button className={cx("approved-btn")} onClick={handleApproveLesson}>
                <i className={cx("fa-sharp fa-regular fa-check", "btn-icon")}></i>
                <span className={cx("btn-text")}>Approved</span>
              </button>
            ) : (
              <button className={cx("rejected-btn")} onClick={handleRejectLesson}>
                <i className={cx("fa-sharp fa-regular fa-ban", "btn-icon")}></i>
                <span className={cx("btn-text")}>Rejected</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

CensorConfirmFeedback.propTypes = {
  unitDetails: PropTypes.object,
  censorStatus: PropTypes.array,
  finalCensorResult: PropTypes.string,
  setIsShowConfirmFeedback: PropTypes.func,
}

export default CensorConfirmFeedback
