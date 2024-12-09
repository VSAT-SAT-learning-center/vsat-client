import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import CensorQuestionQuizzItem from "~/components/Manager/CensorQuestionQuizz/CensorQuestionQuizzItem";
import CensorQuestionQuizzView from "~/components/Manager/CensorQuestionQuizz/CensorQuestionQuizzView";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import QuizzItemPreview from "~/components/Staff/QuestionQuizzCreate/QuizzItemPreview";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./QuestionQuizzCensor.module.scss";

const cx = classNames.bind(styles);
const itemsPerPage = 10;

function QuestionQuizzCensor() {
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowQuestionItemPreview, setIsShowQuizzItemPreview] = useState(false);
  const [questionPreview, setQuestionPreview] = useState({});
  const [isShowCensorQuestionQuizView, setIsShowCensorQuestionQuizView] = useState(false);
  const [questionCensorView, setQuestionCensorView] = useState({});

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/quiz-questions`, {
        params: {
          page: currentPage,
          pageSize: itemsPerPage,
          status: "Pending",
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
      {isShowCensorQuestionQuizView && (
        <CensorQuestionQuizzView
          questionCensorData={questionCensorView}
          setIsShowCensorQuestionQuizView={setIsShowCensorQuestionQuizView}
        />
      )}
      <PageLayout>
        <div className={cx("question-exam-censor-wrapper")}>
          <div className={cx("question-exam-censor-container")}>
            <div className={cx("question-exam-censor-header")}>
              <div className={cx("question-text")}>Censor Question</div>
            </div>
            <div className={cx("question-exam-censor-content")}>
              {questionList?.length > 0 ? (
                <div className={cx("question-exam-censor-list")}>
                  {questionList.map((question, index) => (
                    <CensorQuestionQuizzItem
                      key={index}
                      index={index + (currentPage - 1) * itemsPerPage}
                      question={question}
                      setQuestionPreview={setQuestionPreview}
                      setIsShowQuizzItemPreview={setIsShowQuizzItemPreview}
                      setQuestionCensorView={setQuestionCensorView}
                      setIsShowCensorQuestionQuizView={setIsShowCensorQuestionQuizView}
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

export default QuestionQuizzCensor;
