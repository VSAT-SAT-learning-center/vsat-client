import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import CensorQuestionQuizzItem from "~/components/Manager/CensorQuestionQuizz/CensorQuestionQuizzItem";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import QuizzItemPreview from "~/components/Staff/QuestionQuizzCreate/QuizzItemPreview";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ManagerQuestionQuizz.module.scss";
const cx = classNames.bind(styles);
const itemsPerPage = 5;

function ManagerQuestionQuizz() {
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowQuestionItemPreview, setIsShowQuizzItemPreview] = useState(false);

  const [questionPreview, setQuestionPreview] = useState({});
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/quiz-questions`, {
        params: {
          page: currentPage,
          pageSize: itemsPerPage,
          status: "Approved",
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
          setIsShowQuizzItemPreview={setIsShowQuizzItemPreview} // Sử dụng tên mới
        />
      )}

      <PageLayout>
        <div className={cx("question-exam-overview-wrapper")}>
          <div className={cx("question-exam-overview-container")}>
            <div className={cx("question-exam-overview-header")}>
              <div className={cx("question-text")}>Question Bank</div>
            </div>
            <div className={cx("question-exam-overview-content")}>
              {questionList?.length > 0 ? (
                <div className={cx("question-exam-overview-list")}>
                  {questionList.map((question, index) => (
                    <CensorQuestionQuizzItem
                      key={index}
                      index={index}
                      question={question}
                      setQuestionPreview={setQuestionPreview}
                      setIsShowQuizzItemPreview={setIsShowQuizzItemPreview}
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

export default ManagerQuestionQuizz;
