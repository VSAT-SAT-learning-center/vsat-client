import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import FeedbackItem from "~/components/Teacher/TeacherFeedback/FeedbackItem";
import ViewDetailFeedback from "~/components/Teacher/TeacherFeedback/ViewDetailFeedback";
import PageLayout from "~/layouts/Teacher/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./TeacherReceiveFeedback.module.scss";
const cx = classNames.bind(styles);
function TeacherReceiveFeedback() {
  const [showViewFeedback, setShowViewFeedback] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackData, setFeedbackData] = useState(null)
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await apiClient("/evaluate-feedback/received")
        setFeedbacks(response.data)
      } catch (error) {
        console.error("Error while fetching feedbacks:", error);
      }
    }
    fetchFeedbacks()
  }, [])
  return (
    <>
      {showViewFeedback && <ViewDetailFeedback feedbackData={feedbackData} setShowViewFeedback={setShowViewFeedback} />}
      <PageLayout>
        <div className={cx("teacher-feedback-wrapper")}>
          <div className={cx("teacher-feedback-container")}>
            <div className={cx("teacher-feedback-header")}>
              <div className={cx("teacher-feedback-text")}>Receive Feedback</div>
            </div>
            <div className={cx("teacher-feedback-content")}>
              {feedbacks?.map((feedback) => (
                <FeedbackItem feedback={feedback} setShowViewFeedback={setShowViewFeedback} key={feedback?.id} setFeedbackData={setFeedbackData} type={"Receive"}/>
              ))}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  )
}

export default TeacherReceiveFeedback
