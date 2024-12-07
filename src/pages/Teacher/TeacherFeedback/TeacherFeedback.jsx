import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import CreateFeedbackView from "~/components/Teacher/TeacherFeedback/CreateFeedbackView";
import FeedbackItem from "~/components/Teacher/TeacherFeedback/FeedbackItem";
import ViewDetailFeedback from "~/components/Teacher/TeacherFeedback/ViewDetailFeedback";
import PageLayout from "~/layouts/Teacher/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./TeacherFeedback.module.scss";
const cx = classNames.bind(styles);
function TeacherFeedback() {
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
      {showFeedbackCreate && (
        <CreateFeedbackView
          setShowFeedbackCreate={setShowFeedbackCreate}
          fetchFeedbacks={fetchFeedbacks}
        />
      )}
      {showViewFeedback && <ViewDetailFeedback feedbackData={feedbackData} setShowViewFeedback={setShowViewFeedback} />}
      <PageLayout>
        <div className={cx("teacher-feedback-wrapper")}>
          <div className={cx("teacher-feedback-container")}>
            <div className={cx("teacher-feedback-header")}>
              <div className={cx("teacher-feedback-text")}>Send Feedback</div>
              <button
                className={cx("create-feedback-action")}
                onClick={() => setShowFeedbackCreate(true)}
              >
                <i className={cx("fa-regular fa-plus-circle", "feedback-icon")}></i>
                <span className={cx("feedback-text")}>New Feedback</span>
              </button>
            </div>
            {feedbacks?.length > 0 ? (
              <div className={cx("teacher-feedback-content")}>
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
      </PageLayout>
    </>
  )
}

export default TeacherFeedback
