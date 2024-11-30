import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import FeedbackItem from "~/components/Teacher/TeacherFeedback/FeedbackItem";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./StaffReceiveFeedback.module.scss";
import ViewDetailFeedback from "~/components/Staff/StaffFeedback/ViewDetailFeedback";
const cx = classNames.bind(styles);
function StaffReceiveFeedback() {
  const [showViewFeedback, setShowViewFeedback] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await apiClient("/evaluate-feedback/staff");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error while fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);
  return (
    <>
      {showViewFeedback && <ViewDetailFeedback feedbackData={feedbackData} setShowViewFeedback={setShowViewFeedback} />}
      <PageLayout>
        <div className={cx("staff-feedback-wrapper")}>
          <div className={cx("staff-feedback-container")}>
            <div className={cx("staff-feedback-header")}>
              <div className={cx("staff-feedback-text")}>Receive Feedback</div>
            </div>
            <div className={cx("staff-feedback-content")}>
              {feedbacks?.map((feedback) => (
                <FeedbackItem
                  feedback={feedback}
                  setShowViewFeedback={setShowViewFeedback}
                  key={feedback?.id}
                  setFeedbackData={setFeedbackData}
                  type={"Receive"}
                />
              ))}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  )
}

export default StaffReceiveFeedback
