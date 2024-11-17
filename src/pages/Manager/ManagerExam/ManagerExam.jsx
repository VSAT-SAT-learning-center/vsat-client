import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import ExamItem from "~/components/Manager/ManagerExam/ExamItem";
import ExamViewDetail from "~/components/Manager/ManagerExam/ExamViewDetail";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ManagerExam.module.scss";

const cx = classNames.bind(styles);

function ManagerExam() {
  const [examList, setExamList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isShowExamCensorView, setIsShowExamCensorView] = useState(false);
  const [examCensorData, setExamCensorData] = useState(null);

  const fetchExamList = useCallback(async () => {
    try {
      setIsWaiting(true);
      const response = await apiClient.get(`/exams/Approved`);
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
        <ExamViewDetail
          examCensorData={examCensorData}
          fetchExamList={fetchExamList}
          setIsShowExamCensorView={setIsShowExamCensorView}
        />
      )}
      <PageLayout>
        <div className={cx("manager-exam-wrapper")}>
          <div className={cx("manager-exam-container")}>
            <div className={cx("manager-exam-header")}>
              <div className={cx("manager-exam-text")}>Exam</div>
            </div>
            <div
              className={cx(
                isWaiting || examList.length > 0
                  ? "manager-exam-content"
                  : "manager-exam-no-content"
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
                      height={260}
                    />
                  ))}
                </>
              ) : examList.length > 0 ? (
                examList.map((item, index) => (
                  <ExamItem
                    key={item.id}
                    exam={item}
                    index={index + 1}
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

export default ManagerExam;
