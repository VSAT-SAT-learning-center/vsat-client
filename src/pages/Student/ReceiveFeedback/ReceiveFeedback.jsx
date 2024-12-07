import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import FeedbackItem from "~/components/Teacher/TeacherFeedback/FeedbackItem";
import ViewDetailFeedback from "~/components/Teacher/TeacherFeedback/ViewDetailFeedback";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import apiClient from "~/services/apiService";
import styles from "./ReceiveFeedback.module.scss";
const cx = classNames.bind(styles);

function ReceiveFeedback() {
  const [showViewFeedback, setShowViewFeedback] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await apiClient("/evaluate-feedback/received");
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
      <LearningLayout>
        <div className={cx("feedback-wrapper")}>
          <div className={cx("feedback-container")}>
            <div className={cx("feedback-header")}>
              <div className={cx("feedback-text")}>Receive Feedback</div>
            </div>
            {feedbacks?.length > 0 ? (
              <div className={cx("feedback-content")}>
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
      </LearningLayout>
    </>
  );
}

export default ReceiveFeedback;
