import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import apiClient from "~/services/apiService";
import styles from "./ReceiveFeedback.module.scss";
import FeedbackItem from "~/components/Teacher/TeacherFeedback/FeedbackItem";
const cx = classNames.bind(styles);

function ReceiveFeedback() {
  const [feedbacks, setFeedbacks] = useState([])
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
    <LearningLayout>
      <div className={cx("feedback-wrapper")}>
        <div className={cx("feedback-container")}>
          <div className={cx("feedback-header")}>
            <div className={cx("feedback-text")}>Receive Feedback</div>
          </div>
          <div className={cx("feedback-content")}>
            {feedbacks?.map((feedback) => (
              <FeedbackItem feedback={feedback} key={feedback?.id} type={"Receive"} />
            ))}
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  )
}

export default ReceiveFeedback
