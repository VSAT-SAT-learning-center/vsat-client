import classNames from "classnames/bind";
import { toast } from "react-toastify";
import apiClient from "~/services/apiService";
import styles from "./MarkCompletePopup.module.scss";

const cx = classNames.bind(styles);
function MarkCompletePopup({ target, message, setShowMarkPopup, setShowLearningProgress, setShowLearningProfileView }) {
  const handleMarkComplete = async () => {
    try {
      const status = {
        status: "Completed"
      }
      await apiClient.put(`/target-learnings/${target?.id}`, status)
      setShowMarkPopup(false)
      setShowLearningProgress(false)
      setShowLearningProfileView(false)
      toast.success("Update target completed!", {
        autoClose: 1500
      })
    } catch (error) {
      console.error("Error while mark complete:", error);
      toast.success("Update target failed!", {
        autoClose: 1500
      })
    }
  }
  return (
    <div className={cx("mark-complete-popup-wrapper")}>
      <div className={cx("mark-complete-popup-container")}>
        <div className={cx("mark-title")}>Mark as completed?</div>
        <div className={cx("mark-desc")}>{message}</div>
        <div className={cx("mark-action")}>
          <button className={cx("cancel-btn")} onClick={() => setShowMarkPopup(false)}>Cancel</button>
          <button className={cx("submit-btn")} onClick={handleMarkComplete}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default MarkCompletePopup
