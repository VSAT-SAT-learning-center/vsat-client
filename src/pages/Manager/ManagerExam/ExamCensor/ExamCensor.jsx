import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import ExamCensorItem from "~/components/Manager/CensorExam/ExamCensorItem";
import ExamCensorView from "~/components/Manager/CensorExam/ExamCensorView";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ExamCensor.module.scss";
const cx = classNames.bind(styles);
function ExamCensor() {
  const [isShowExamCensorView, setIsShowExamCensorView] = useState(false);
  const [examList, setExamList] = useState([]);
  const [examCensorData, setExamCensorData] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const fetchExamList = useCallback(async () => {
    try {
      setIsWaiting(true);
      const response = await apiClient.get("/exams/Pending");
      setExamList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch exam structure list:", error);
    } finally {
      setIsWaiting(false);
    }
  }, []);

  useEffect(() => {
    fetchExamList();
  }, [fetchExamList]);
  return (
    <>
      {isShowExamCensorView && (
        <ExamCensorView
          examCensorData={examCensorData}
          setIsShowExamCensorView={setIsShowExamCensorView}
        />
      )}
      <PageLayout>
        <div className={cx("censor-exam-wrapper")}>
          <div className={cx("censor-exam-container")}>
            <div className={cx("censor-exam-header")}>
              <div className={cx("exam-text")}>Censor Exam</div>
            </div>
            <div className={cx(
              isWaiting || examList.length > 0
                ? "censor-exam-content"
                : "censor-exam-no-content"
            )}>
              {isWaiting ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <Skeleton
                      key={i}
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={260}
                    />
                  ))}
                </>
              ) : examList.length > 0 ? (
                examList?.map((exam) => (
                  <ExamCensorItem
                    key={exam.id}
                    exam={exam}
                    setExamCensorData={setExamCensorData}
                    setIsShowExamCensorView={setIsShowExamCensorView}
                  />
                ))
              ) : (
                <NoQuestionData />
              )}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default ExamCensor;
