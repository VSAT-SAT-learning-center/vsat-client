import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import CensorQuestionExamItem from "~/components/Manager/CensorQuestionExam/CensorQuestionExamItem";
import CensorQuestionExamView from "~/components/Manager/CensorQuestionExam/CensorQuestionExamView";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import QuestionItemPreview from "~/components/Staff/QuestionExamCreate/QuestionItemPreview";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./QuestionExamCensor.module.scss";
const cx = classNames.bind(styles);
const itemsPerPage = 5;

function QuestionExamCreate() {
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowQuestionItemPreview, setIsShowQuestionItemPreview] =
    useState(false);
  const [questionPreview, setQuestionPreview] = useState({});
  const [isShowCensorQuestionView, setIsShowCensorQuestionView] =
    useState(false);
  const [questionCensorView, setQuestionCensorView] = useState({});
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/questions`, {
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
        <QuestionItemPreview
          questionPreviewData={questionPreview}
          setIsShowQuestionItemPreview={setIsShowQuestionItemPreview}
        />
      )}
      {isShowCensorQuestionView && (
        <CensorQuestionExamView
          questionCensorData={questionCensorView}
          setIsShowCensorQuestionView={setIsShowCensorQuestionView}
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
                    <CensorQuestionExamItem
                      key={index}
                      index={index + (currentPage - 1) * itemsPerPage}
                      question={question}
                      setQuestionPreview={setQuestionPreview}
                      setIsShowQuestionItemPreview={
                        setIsShowQuestionItemPreview
                      }
                      setQuestionCensorView={setQuestionCensorView}
                      setIsShowCensorQuestionView={setIsShowCensorQuestionView}
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

export default QuestionExamCreate;
