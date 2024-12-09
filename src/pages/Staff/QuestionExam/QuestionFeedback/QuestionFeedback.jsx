import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import QuestionExamEditModal from "~/components/Staff/QuestionExamCreate/QuestionExamEditModal";
import QuestionExamItem from "~/components/Staff/QuestionExamCreate/QuestionExamItem";
import QuestionFeedbackView from "~/components/Staff/QuestionExamCreate/QuestionFeedbackView";
import QuestionItemPreview from "~/components/Staff/QuestionExamCreate/QuestionItemPreview";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./QuestionFeedback.module.scss";
const cx = classNames.bind(styles);
const itemsPerPage = 10;

function QuestionFeedback() {
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowQuestionItemPreview, setIsShowQuestionItemPreview] =
    useState(false);
  const [questionPreview, setQuestionPreview] = useState({});
  const [isShowFeedbackView, setIsShowFeedbackView] = useState(false);
  const [questionFeedback, setQuestionFeedback] = useState({});
  const [isShowUpdateQuestionModal, setIsShowUpdateQuestionModal] =
    useState(false);
  const [questionEdit, setQuestionEdit] = useState({});

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/questions/getAllWithstatusByCreateBy`, {
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
        <QuestionItemPreview
          questionPreviewData={questionPreview}
          setIsShowQuestionItemPreview={setIsShowQuestionItemPreview}
        />
      )}

      {isShowFeedbackView && (
        <QuestionFeedbackView
          questionFeedback={questionFeedback}
          setIsShowFeedbackView={setIsShowFeedbackView}
        />
      )}

      {isShowUpdateQuestionModal && (
        <QuestionExamEditModal
          questionEdit={questionEdit}
          fetchQuestions={fetchQuestions}
          setIsShowUpdateQuestionModal={setIsShowUpdateQuestionModal}
        />
      )}
      <PageLayout>
        <div className={cx("question-feedback-wrapper")}>
          <div className={cx("question-feedback-container")}>
            <div className={cx("question-feedback-header")}>
              <div className={cx("question-text")}>Feedback Question</div>
            </div>
            <div className={cx("question-feedback-content")}>
              {questionList?.length > 0 ? (
                <div className={cx("question-feedback-list")}>
                  {questionList.map((question, index) => (
                    <QuestionExamItem
                      key={index}
                      index={index + (currentPage - 1) * itemsPerPage}
                      question={question}
                      setQuestionPreview={setQuestionPreview}
                      setIsShowQuestionItemPreview={
                        setIsShowQuestionItemPreview
                      }
                      setQuestionEdit={setQuestionEdit}
                      setQuestionFeedback={setQuestionFeedback}
                      setIsShowFeedbackView={setIsShowFeedbackView}
                      setIsShowUpdateQuestionModal={
                        setIsShowUpdateQuestionModal
                      }
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

export default QuestionFeedback;
