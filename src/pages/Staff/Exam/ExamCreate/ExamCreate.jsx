import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import ExamCreateItem from "~/components/Staff/ExamCreate/ExamCreateItem";
import ExamCreateModal from "~/components/Staff/ExamCreate/ExamCreateModal";
import ExamCreateView from "~/components/Staff/ExamCreate/ExamCreateView";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ExamCreate.module.scss";
const cx = classNames.bind(styles);
function ExamCreate() {
  const [isShowCreateExamModal, setIsShowCreateExamModal] = useState(false);
  const [isShowCreateExamView, setIsShowCreateExamView] = useState(false);
  const [examDetailData, setExamDetailData] = useState(null);
  const [examList, setExamList] = useState([]);
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
      {isShowCreateExamModal && (
        <ExamCreateModal setIsShowCreateExamModal={setIsShowCreateExamModal} />
      )}

      {isShowCreateExamView && (
        <ExamCreateView
          exam={examDetailData}
          setIsShowCreateExamView={setIsShowCreateExamView}
        />
      )}
      <PageLayout>
        <div className={cx("create-exam-wrapper")}>
          <div className={cx("create-exam-container")}>
            <div className={cx("create-exam-header")}>
              <div className={cx("create-exam-text")}>Create Exam</div>
              <button
                className={cx("create-exam-action")}
                onClick={() => setIsShowCreateExamModal(true)}
              >
                <i className={cx("fa-regular fa-plus-circle", "exam-icon")}></i>
                <span className={cx("exam-text")}>New Exam</span>
              </button>
            </div>
            <div className={cx("create-exam-content")}>
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
              ) : (
                examList?.map((exam) => (
                  <ExamCreateItem
                    key={exam.id}
                    exam={exam}
                    setExamDetailData={setExamDetailData}
                    setIsShowCreateExamView={setIsShowCreateExamView}
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

export default ExamCreate;
