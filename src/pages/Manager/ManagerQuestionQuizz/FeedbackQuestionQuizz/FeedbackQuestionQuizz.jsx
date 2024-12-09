import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import CensorQuestionQuizzItem from "~/components/Manager/CensorQuestionQuizz/CensorQuestionQuizzItem";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import QuestionFeedbackView from "~/components/Staff/QuestionExamCreate/QuestionFeedbackView";
import QuizzItemPreview from "~/components/Staff/QuestionQuizzCreate/QuizzItemPreview";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./FeedbackQuestionQuizz.module.scss";
const cx = classNames.bind(styles);
const itemsPerPage = 10;

function FeedbackQuestionQuizz() {
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowQuestionItemPreview, setIsShowQuizzItemPreview] =
    useState(false);
  const [questionPreview, setQuestionPreview] = useState({});
  const [isShowFeedbackView, setIsShowFeedbackView] = useState(false);
  const [questionFeedback, setQuestionFeedback] = useState({});
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/quiz-questions`, {
        params: {
          page: currentPage,
          pageSize: itemsPerPage,
          status: "Rejected",
        },
      });
      setQuestionList(response.data.data.data);
      setTotalItems(response.data.data.totalItems);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {isShowQuestionItemPreview && (
        <QuizzItemPreview
          questionPreviewData={questionPreview}
          setIsShowQuizzItemPreview={setIsShowQuizzItemPreview}
        />
      )}

      {isShowFeedbackView && (
        <QuestionFeedbackView
          questionFeedback={questionFeedback}
          setIsShowFeedbackView={setIsShowFeedbackView}
        />
      )}
      <PageLayout>
        <div className={cx("question-exam-feedback-wrapper")}>
          <div className={cx("question-exam-feedback-container")}>
            <div className={cx("question-exam-feedback-header")}>
              <div className={cx("question-text")}>Feedback Question</div>
            </div>
            <div className={cx("question-exam-feedback-content")}>
              {questionList?.length > 0 ? (
                <div className={cx("question-exam-feedback-list")}>
                  {questionList.map((question, index) => (
                    <CensorQuestionQuizzItem
                      key={index}
                      index={index + (currentPage - 1) * itemsPerPage}
                      question={question}
                      setQuestionPreview={setQuestionPreview}
                      setIsShowQuizzItemPreview={
                        setIsShowQuizzItemPreview
                      }
                      setQuestionFeedback={setQuestionFeedback}
                      setIsShowFeedbackView={setIsShowFeedbackView}
                    />
                  ))}
                </div>
              ) : (
                <NoQuestionData />
              )}
              {questionList?.length > 0 && (
                <div className={cx("pagination-controls")}>
                  <Pagination
                    align="center"
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showLessItems={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default FeedbackQuestionQuizz;
