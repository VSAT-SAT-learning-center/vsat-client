import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import ExamCreateItem from "~/components/Staff/ExamCreate/ExamCreateItem";
import ExamCreateView from "~/components/Staff/ExamCreate/ExamCreateView";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ExamFeedback.module.scss";
const cx = classNames.bind(styles);
function ExamFeedback() {
  const [isShowCreateExamView, setIsShowCreateExamView] = useState(false);
  const [examDetailData, setExamDetailData] = useState(null);
  const [examList, setExamList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const fetchExamList = useCallback(async () => {
    try {
      setIsWaiting(true);
      const response = await apiClient.get("/exams/getExamWithExamQuestionByStatusByCreateBy/Rejected");
      setExamList(response.data.data);
      return response.data.data;
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
      {isShowCreateExamView && (
        <ExamCreateView
          exam={examDetailData}
          fetchExamList={fetchExamList}
          setIsShowCreateExamView={setIsShowCreateExamView}
        />
      )}
      <PageLayout>
        <div className={cx("exam-feedback-wrapper")}>
          <div className={cx("exam-feedback-container")}>
            <div className={cx("exam-feedback-header")}>
              <div className={cx("exam-feedback-text")}>Exam Feedback</div>
            </div>
            <div className={cx(
              isWaiting || examList.length > 0
                ? "exam-feedback-content"
                : "exam-feedback-no-content"
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
                  <ExamCreateItem
                    key={exam.id}
                    exam={exam}
                    setExamDetailData={setExamDetailData}
                    setIsShowCreateExamView={setIsShowCreateExamView}
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

export default ExamFeedback;
