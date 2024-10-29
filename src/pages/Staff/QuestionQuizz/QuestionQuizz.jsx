import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import QuestionQuizzItem from "~/components/Staff/QuestionQuizzCreate/QuestionQuizzItem";
import QuizzItemPreview from "~/components/Staff/QuestionQuizzCreate/QuizzItemPreview";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./QuestionQuizz.module.scss";

const cx = classNames.bind(styles);
const itemsPerPage = 10;

function QuestionQuizz() {
  const [bankType, setBankType] = useState("Approved");
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowQuizzItemPreview, setIsShowQuizzItemPreview] = useState(false);
  const [questionPreview, setQuestionPreview] = useState({});

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/questions`, {
        params: {
          page: currentPage,
          pageSize: itemsPerPage,
          status: bankType,
        },
      });
      setQuestionList(response.data.data.data);
      setTotalItems(response.data.data.totalItems);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [currentPage, bankType]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <>
      {isShowQuizzItemPreview && (
        <QuizzItemPreview
          questionPreviewData={questionPreview}
          setIsShowQuizzItemPreview={setIsShowQuizzItemPreview}
        />
      )}
      <PageLayout>
        <div className={cx("question-quizz-wrapper")}>
          <div className={cx("question-quizz-container")}>
            <div className={cx("question-quizz-header")}>
              <div className={cx("question-text")}>Question Quizz Bank</div>
              <div className={cx("question-options")}>
                <button
                  className={cx("approve-btn", {
                    "active-approve": bankType === "Approved",
                  })}
                  onClick={() => setBankType("Approved")}
                >
                  Approved
                </button>
                <button
                  className={cx("pending-btn", {
                    "active-pending": bankType === "Pending",
                  })}
                  onClick={() => setBankType("Pending")}
                >
                  Pending
                </button>
              </div>
            </div>
            <div className={cx("question-quizz-content")}>
              <div className={cx("question-quizz-list")}>
                {questionList?.length > 0 ? (
                  questionList.map((question, index) => (
                    <QuestionQuizzItem
                      key={index}
                      index={index}
                      question={question}
                      setQuestionPreview={setQuestionPreview}
                      setIsShowQuizzItemPreview={setIsShowQuizzItemPreview}
                    />
                  ))
                ) : (
                  <div>No questions available.</div>
                )}
              </div>
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
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default QuestionQuizz;
