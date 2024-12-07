import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import CreateFeedbackView from "~/components/Student/Feedback/CreateFeedbackView";
import ViewDetailFeedback from "~/components/Student/Feedback/ViewDetailFeedback";
import FeedbackItem from "~/components/Teacher/TeacherFeedback/FeedbackItem";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import apiClient from "~/services/apiService";
import styles from "./Feedback.module.scss";
const cx = classNames.bind(styles);

function Feedback() {
  const [showFeedbackCreate, setShowFeedbackCreate] = useState(false)
  const [showViewFeedback, setShowViewFeedback] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackData, setFeedbackData] = useState(null)
  const fetchFeedbacks = async () => {
    try {
      const response = await apiClient("/evaluate-feedback/sent");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error while fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);
  return (
    <>
      {showFeedbackCreate && <CreateFeedbackView setShowFeedbackCreate={setShowFeedbackCreate} fetchFeedbacks={fetchFeedbacks} />}
      {showViewFeedback && <ViewDetailFeedback feedbackData={feedbackData} setShowViewFeedback={setShowViewFeedback} />}
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
            {feedbacks?.length > 0 ? (
              <div className={cx("feedback-content")}>
                {feedbacks?.map((feedback) => (
                  <FeedbackItem feedback={feedback} setShowViewFeedback={setShowViewFeedback} key={feedback?.id} setFeedbackData={setFeedbackData} />
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
  )
}

export default Feedback
