import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import ExamHistoryView from "~/components/Student/ExamHistory/ExamHistoryView";
import LearningItem from "~/components/Student/Learning/LearningItem";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import apiClient from "~/services/apiService";
import styles from "./ExamHistory.module.scss";
const cx = classNames.bind(styles);
function ExamHistory() {
  const [profiles, setProfiles] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showExamHistoryView, setShowExamHistoryView] = useState(false)
  const [profileSelected, setProfileSelected] = useState(null)

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsWaiting(true);
        const response = await apiClient.get(`/study-profiles/getStudyProfileByAccountId`);
        const sortedProfiles = response.data.data.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
        setProfiles(sortedProfiles);
      } catch (error) {
        console.error("Error fetching learning materials:", error);
      } finally {
        setIsWaiting(false);
      }
    };

    fetchProfiles();
  }, []);
  return (
    <>
      {showExamHistoryView && <ExamHistoryView profile={profileSelected} setShowExamHistoryView={setShowExamHistoryView} />}
      <LearningLayout>
        <div className={cx("exam-history-wrapper")}>
          <div className={cx("exam-history-container")}>
            <div className={cx("exam-history-header")}>
              <div className={cx("exam-history-text")}>Exam History</div>
            </div>
            <div
              className={cx(
                isWaiting || profiles.length > 0
                  ? "exam-history-content"
                  : "exam-history-no-content"
              )}
            >
              {isWaiting ? (
                <>
                  {[...Array(2)].map((_, i) => (
                    <Skeleton
                      key={i}
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={215}
                    />
                  ))}
                </>
              ) : profiles.length > 0 ? (
                profiles.map((item, index) => (
                  <LearningItem
                    key={item.id}
                    item={item}
                    index={index + 1}
                    setShowLearningProfileView={setShowExamHistoryView}
                    setProfileSelected={setProfileSelected}
                  />
                ))
              ) : (
                <NoQuestionData />
              )}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </LearningLayout>
    </>
  );
}

export default ExamHistory;
