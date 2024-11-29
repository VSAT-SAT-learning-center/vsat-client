import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import CreateFeedbackView from "~/components/Student/Feedback/CreateFeedbackView";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import apiClient from "~/services/apiService";
import styles from "./Feedback.module.scss";
import FeedbackItem from "~/components/Teacher/TeacherFeedback/FeedbackItem";
const cx = classNames.bind(styles);

function Feedback() {
  const [showFeedbackCreate, setShowFeedbackCreate] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await apiClient("/evaluate-feedback/sent")
        setFeedbacks(response.data)
      } catch (error) {
        console.error("Error while fetching feedbacks:", error);
      }
    }
    fetchFeedbacks()
  }, [])
  return (
    <>
      {showFeedbackCreate && <CreateFeedbackView setShowFeedbackCreate={setShowFeedbackCreate} />}
      <LearningLayout>
        <div className={cx("feedback-wrapper")}>
          <div className={cx("feedback-container")}>
            <div className={cx("feedback-header")}>
              <div className={cx("feedback-text")}>Send Feedback</div>
              <button
                className={cx("create-feedback-action")}
                onClick={() => setShowFeedbackCreate(true)}
              >
                <i className={cx("fa-regular fa-plus-circle", "feedback-icon")}></i>
                <span className={cx("feedback-text")}>New Feedback</span>
              </button>
            </div>
            <div className={cx("feedback-content")}>
              {feedbacks?.map((feedback) => (
                <FeedbackItem feedback={feedback} key={feedback?.id} />
              ))}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </LearningLayout>
    </>
  )
}

export default Feedback
