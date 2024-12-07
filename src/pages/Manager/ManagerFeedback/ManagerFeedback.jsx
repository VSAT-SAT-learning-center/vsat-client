import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ViewDetailFeedback from "~/components/Manager/ManagerFeedback/ViewDetailFeedback";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import FeedbackItem from "~/components/Teacher/TeacherFeedback/FeedbackItem";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ManagerFeedback.module.scss";
const cx = classNames.bind(styles);
function ManagerFeedback() {
  const [showViewFeedback, setShowViewFeedback] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await apiClient("/evaluate-feedback/manager");
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
        <div className={cx("manager-feedback-wrapper")}>
          <div className={cx("manager-feedback-container")}>
            <div className={cx("manager-feedback-header")}>
              <div className={cx("manager-feedback-text")}>Feedback</div>
            </div>
            {feedbacks?.length > 0 ? (
              <div className={cx("manager-feedback-content")}>
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
            ) : (
              <NoQuestionData />
            )}
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default ManagerFeedback;
