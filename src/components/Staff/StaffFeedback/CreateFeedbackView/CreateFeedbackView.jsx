import classNames from "classnames/bind";
import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "~/services/apiService";
import styles from "./CreateFeedbackView.module.scss";
import SendFeedback from "./SendFeedback";
const cx = classNames.bind(styles);
function CreateFeedbackView({ setShowFeedbackCreate }) {
  const [feedbackNormalData, setFeedbackNormalData] = useState({
    reason: "",
    narrativeFeedback: "",
    isSendToStaff: false,
  });
  const handleSendFeedback = async () => {
    try {
      await apiClient.post(
        "/evaluate-feedback/createFeedback",
        feedbackNormalData
      );
      setShowFeedbackCreate(false);
      toast.success("Send feedback to manager successfully!", {
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error while feedback to manager:", error);
      toast.error("Error while feedback to manager!", {
        autoClose: 1500,
      });
    }
  };

  const isFeedbackValid =
    feedbackNormalData.reason.trim() &&
    feedbackNormalData.narrativeFeedback.trim();

  return (
    <div className={cx("create-feedback-view-wrapper")}>
      <div className={cx("create-feedback-view-container")}>
        <div className={cx("create-feedback-nav")}>
          <div className={cx("nav-item")}>Send Feedback</div>
        </div>
        <div className={cx("create-feedback-content")}>
          <SendFeedback setFeedbackNormalData={setFeedbackNormalData} />
        </div>
        <div className={cx("create-feedback-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setShowFeedbackCreate(false)}
          >
            Cancel
          </button>
          <button
            className={cx("preview-btn", { disabled: !isFeedbackValid })}
            disabled={!isFeedbackValid}
            onClick={handleSendFeedback}
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFeedbackView;
