import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import ErrorQuestionView from "~/components/Staff/QuestionExamCreate/ErrorQuestionView";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import QuestionQuizzCreateModal from "~/components/Staff/QuestionQuizzCreate/QuestionQuizzCreateModal";
import QuestionQuizzEditModal from "~/components/Staff/QuestionQuizzCreate/QuestionQuizzEditModal";
import QuestionQuizzItem from "~/components/Staff/QuestionQuizzCreate/QuestionQuizzItem";
import QuizzItemPreview from "~/components/Staff/QuestionQuizzCreate/QuizzItemPreview";
import UploadFileModal from "~/components/Staff/QuestionQuizzCreate/UploadFileModal";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./QuestionQuizzCreate.module.scss";

const cx = classNames.bind(styles);
const itemsPerPage = 5;

function QuestionQuizzCreate() {
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowCreateQuestionModal, setIsShowCreateQuestionModal] =
    useState(false);
  const [isShowUploadFileModal, setIsShowUploadFileModal] = useState(false);
  const [isShowQuizzItemPreview, setIsShowQuizzItemPreview] = useState(false);
  const [questionPreview, setQuestionPreview] = useState({});
  const [isShowUpdateQuestionModal, setIsShowUpdateQuestionModal] =
    useState(false);
  const [questionEdit, setQuestionEdit] = useState({});
  const [isShowQuestionListError, setIsShowQuestionListError] = useState(false);
  const [questionListError, setQuestionListEror] = useState([]);

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/quiz-questions`, {
        params: {
          page: currentPage,
          pageSize: itemsPerPage,
          status: "Draft",
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

  const handlePulishQuestions = async () => {
    try {
      const quizQuestionIds = questionList.map(
        (quizQuestionIds) => quizQuestionIds.id
      );
      await apiClient.patch(`/quiz-questions/publish`, { quizQuestionIds });
      toast.success("Publish question successfully!", {
        autoClose: 2000,
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error publishing questions:", error);
    }
  };

  return (
    <>
      {isShowCreateQuestionModal && (
        <QuestionQuizzCreateModal
          setIsShowCreateQuestionModal={setIsShowCreateQuestionModal}
          fetchQuestions={fetchQuestions}
        />
      )}
      {isShowQuizzItemPreview && (
        <QuizzItemPreview
          questionPreviewData={questionPreview}
          setIsShowQuizzItemPreview={setIsShowQuizzItemPreview}
        />
      )}

      {isShowUploadFileModal && (
        <UploadFileModal
          fetchQuestions={fetchQuestions}
          setIsShowUploadFileModal={setIsShowUploadFileModal}
          setQuestionListEror={setQuestionListEror}
          setIsShowQuestionListError={setIsShowQuestionListError}
        />
      )}
      {isShowUpdateQuestionModal && (
        <QuestionQuizzEditModal
          questionEdit={questionEdit}
          fetchQuestions={fetchQuestions}
          setIsShowUpdateQuestionModal={setIsShowUpdateQuestionModal}
        />
      )}
      {isShowQuestionListError && (
        <ErrorQuestionView
          questionListError={questionListError}
          setIsShowQuestionListError={setIsShowQuestionListError}
        />
      )}
      <PageLayout>
        <div className={cx("question-quizz-create-wrapper")}>
          <div className={cx("question-quizz-create-container")}>
            <div className={cx("question-quizz-create-header")}>
              <div className={cx("question-quizz-create-title")}>
                Create Question
              </div>
              <div className={cx("question-quizz-create-config")}>
                <button
                  className={cx("question-import")}
                  onClick={() => setIsShowUploadFileModal(true)}
                >
                  <i
                    className={cx(
                      "fa-regular fa-cloud-arrow-up",
                      "import-icon"
                    )}
                  ></i>
                  <span className={cx("import-text")}>Import</span>
                </button>
                <button
                  className={cx("question-publish")}
                  onClick={() => setIsShowCreateQuestionModal(true)}
                >
                  <i
                    className={cx("fa-regular fa-plus-circle", "publish-icon")}
                  ></i>
                  <span className={cx("publish-text")}>Add question</span>
                </button>
                <button
                  className={cx("question-publish", {
                    "disabled-btn": questionList?.length <= 0,
                  })}
                  disabled={questionList?.length <= 0}
                  onClick={handlePulishQuestions}
                >
                  <i
                    className={cx(
                      "fa-regular fa-arrow-up-from-bracket",
                      "publish-icon"
                    )}
                  ></i>
                  <span className={cx("publish-text")}>Publish</span>
                </button>
              </div>
            </div>
            <div className={cx("question-quizz-create-content")}>
              {questionList?.length > 0 ? (
                <div className={cx("question-quizz-create-list")}>
                  {questionList.map((question, index) => (
                    <div
                      className={cx("question-exam-create-item-container")}
                      key={index}
                    >
                      <QuestionQuizzItem
                        index={index + (currentPage - 1) * itemsPerPage}
                        question={question}
                        setQuestionPreview={setQuestionPreview}
                        setQuestionEdit={setQuestionEdit}
                        setIsShowQuizzItemPreview={setIsShowQuizzItemPreview}
                        setIsShowUpdateQuestionModal={
                          setIsShowUpdateQuestionModal
                        }
                      />
                    </div>
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

export default QuestionQuizzCreate;
