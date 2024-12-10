import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import CreateQuestionDistributionModal from "~/components/Manager/ManageQuestionDistribution/CreateQuestionDistributionModal";
import QuestionDistributionCreateView from "~/components/Manager/ManageQuestionDistribution/QuestionDistributionCreateView";
import QuestionDistributionItem from "~/components/Manager/ManageQuestionDistribution/QuestionDistributionItem";
import QuestionDistributionViewDetail from "~/components/Manager/ManageQuestionDistribution/QuestionDistributionViewDetail";
import UploadFileQuestionDistribution from "~/components/Manager/ManageQuestionDistribution/UploadFileQuestionDistribution";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./QuestionDistribution.module.scss";
const cx = classNames.bind(styles);
const initialReadingWritingData = [];
const initialMathData = [];

function QuestionDistribution() {
  const [examScoreList, setExamScoreList] = useState([]);
  const [dataSource, setDataSource] = useState(initialReadingWritingData);
  const [mathData, setMathData] = useState(initialMathData);
  const [rwData, setRwData] = useState(initialReadingWritingData);
  const [examTitle, setExamTitle] = useState("");
  const [examType, setExamType] = useState("");
  const [isShowImportExamScore, setIsShowImportExamScore] = useState(false);
  const [isShowExamScoreResult, setIsShowExamScoreResult] = useState(false);
  const [isShowCreateExamScoreModal, setIsShowCreateExamScoreModal] =
    useState(false);
  const [isShowViewDetailScore, setIsShowViewDetailScore] = useState(false);
  const [viewScoreDetailData, setViewScoreDetailData] = useState(false);
  const [examTime, setExamTime] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const fetchExamScoreList = useCallback(async () => {
    try {
      setIsWaiting(true);
      const response = await apiClient.get("/exam-semester/details", {
        params: {
          page: 1,
          pageSize: 0,
        },
      });
      setExamScoreList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch exam score list:", error);
    } finally {
      setIsWaiting(false);
    }
  }, []);

  useEffect(() => {
    fetchExamScoreList();
  }, [fetchExamScoreList]);

  return (
    <>
      {isShowCreateExamScoreModal && (
        <CreateQuestionDistributionModal
          examTitle={examTitle}
          examType={examType}
          setExamTitle={setExamTitle}
          setExamType={setExamType}
          setExamTime={setExamTime}
          setIsShowCreateExamScoreModal={setIsShowCreateExamScoreModal}
          setIsShowImportExamScore={setIsShowImportExamScore}
        />
      )}
      {isShowImportExamScore && (
        <UploadFileQuestionDistribution
          setDataSource={setDataSource}
          setMathData={setMathData}
          setRwData={setRwData}
          setIsShowImportExamScore={setIsShowImportExamScore}
          setIsShowExamScoreResult={setIsShowExamScoreResult}
        />
      )}
      {isShowExamScoreResult && (
        <QuestionDistributionCreateView
          dataSource={dataSource}
          rwData={rwData}
          mathData={mathData}
          examTitle={examTitle}
          examType={examType}
          examTime={examTime}
          setDataSource={setDataSource}
          setIsShowExamScoreResult={setIsShowExamScoreResult}
          setIsShowCreateExamScoreModal={setIsShowCreateExamScoreModal}
          fetchExamScoreList={fetchExamScoreList}
        />
      )}

      {isShowViewDetailScore && (
        <QuestionDistributionViewDetail
          fetchExamScoreList={fetchExamScoreList}
          viewScoreDetailData={viewScoreDetailData}
          setIsShowViewDetailScore={setIsShowViewDetailScore}
        />
      )}
      <PageLayout>
        <div className={cx("question-distribution-wrapper")}>
          <div className={cx("question-distribution-container")}>
            <div className={cx("question-distribution-header")}>
              <div className={cx("question-distribution-text")}>
                Question Distribution
              </div>
              <button
                className={cx("question-distribution-import")}
                onClick={() => setIsShowCreateExamScoreModal(true)}
              >
                <i
                  className={cx("fa-regular fa-plus-circle", "import-icon")}
                ></i>
                <span className={cx("import-text")}>New Distribution</span>
              </button>
            </div>
            <div
              className={cx(
                isWaiting || examScoreList.length > 0
                  ? "question-distribution-content"
                  : "question-distribution-no-content"
              )}
            >
              {isWaiting ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <Skeleton
                      key={i}
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={146}
                    />
                  ))}
                </>
              ) : (
                examScoreList?.length > 0 ? (
                  examScoreList?.map((examScore, index) => (
                    <QuestionDistributionItem
                      key={examScore.id}
                      index={index + 1}
                      examScore={examScore}
                      setViewScoreDetailData={setViewScoreDetailData}
                      setIsShowViewDetailScore={setIsShowViewDetailScore}
                    />
                  ))
                ) : (
                  <NoQuestionData />
                )
              )}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default QuestionDistribution;
