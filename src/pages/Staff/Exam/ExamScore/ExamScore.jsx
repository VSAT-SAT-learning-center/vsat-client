import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import CreateExamScoreModal from "~/components/Staff/ExamScoreCreate/CreateExamScoreModal";
import ExamScoreCreateView from "~/components/Staff/ExamScoreCreate/ExamScoreCreateView";
import ExamScoreItem from "~/components/Staff/ExamScoreCreate/ExamScoreItem";
import ExamScoreViewDetail from "~/components/Staff/ExamScoreCreate/ExamScoreViewDetail";
import UploadFileScore from "~/components/Staff/ExamScoreCreate/UploadFileScore";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ExamScore.module.scss";
const cx = classNames.bind(styles);
const initialReadingWritingData = [];
const initialMathData = [];
function ExamScore() {
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
  const [isWaiting, setIsWaiting] = useState(false);

  const fetchExamScoreList = useCallback(async () => {
    try {
      setIsWaiting(true);
      const response = await apiClient.get("/exam-scores", {
        params: {
          page: 1,
          pageSize: 0,
        },
      });
      setExamScoreList(response.data.data.data);
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
        <CreateExamScoreModal
          examTitle={examTitle}
          examType={examType}
          setExamTitle={setExamTitle}
          setExamType={setExamType}
          setIsShowCreateExamScoreModal={setIsShowCreateExamScoreModal}
          setIsShowImportExamScore={setIsShowImportExamScore}
        />
      )}
      {isShowImportExamScore && (
        <UploadFileScore
          setDataSource={setDataSource}
          setMathData={setMathData}
          setRwData={setRwData}
          setIsShowImportExamScore={setIsShowImportExamScore}
          setIsShowExamScoreResult={setIsShowExamScoreResult}
        />
      )}
      {isShowExamScoreResult && (
        <ExamScoreCreateView
          dataSource={dataSource}
          rwData={rwData}
          mathData={mathData}
          examTitle={examTitle}
          examType={examType}
          setDataSource={setDataSource}
          setIsShowExamScoreResult={setIsShowExamScoreResult}
          setIsShowCreateExamScoreModal={setIsShowCreateExamScoreModal}
          fetchExamScoreList={fetchExamScoreList}
        />
      )}

      {isShowViewDetailScore && (
        <ExamScoreViewDetail
          fetchExamScoreList={fetchExamScoreList}
          viewScoreDetailData={viewScoreDetailData}
          setIsShowViewDetailScore={setIsShowViewDetailScore}
        />
      )}
      <PageLayout>
        <div className={cx("create-score-wrapper")}>
          <div className={cx("create-score-container")}>
            <div className={cx("create-score-header")}>
              <div className={cx("create-score-text")}>Exam Score</div>
              <button
                className={cx("create-score-import")}
                onClick={() => setIsShowCreateExamScoreModal(true)}
              >
                <i
                  className={cx("fa-regular fa-plus-circle", "import-icon")}
                ></i>
                <span className={cx("import-text")}>New Score</span>
              </button>
            </div>
            <div className={cx("create-score-content")}>
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
                examScoreList?.map((examScore, index) => (
                  <ExamScoreItem
                    key={examScore.id}
                    index={index + 1}
                    examScore={examScore}
                    setViewScoreDetailData={setViewScoreDetailData}
                    setIsShowViewDetailScore={setIsShowViewDetailScore}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default ExamScore;
