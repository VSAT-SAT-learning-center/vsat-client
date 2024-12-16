import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import ExamHistoryView from "~/components/Student/ExamHistory/ExamHistoryView";
import StudyProfileItem from "~/components/Teacher/ManageMaterial/StudyProfileItem";
import PageLayout from "~/layouts/Teacher/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ExamViewHistory.module.scss";
const cx = classNames.bind(styles);
function ExamViewHistory() {
  const [profiles, setProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showLearningProfileView, setShowLearningProfileView] = useState(false)
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.get("/study-profiles/getStudyProfileWithTeacher?page=1&pageSize=0")
        setProfiles(response.data.data.data);
      } catch (error) {
        console.error("Error while fetching profiles:", error)
      }
    }

    fetchProfiles()
  }, [])
  return (
    <>
      {showLearningProfileView && <ExamHistoryView profile={selectedProfile} setShowExamHistoryView={setShowLearningProfileView} />}
      <PageLayout>
        <div className={cx("exam-history-wrapper")}>
          <div className={cx("exam-history-container")}>
            <div className={cx("exam-history-header")}>
              <div className={cx("exam-history-text")}>Exam History</div>
            </div>
            {profiles?.length > 0 ? (
              <div className={cx("exam-history-content")}>
                {profiles?.map((profile) => (
                  <StudyProfileItem
                    key={profile.id}
                    profile={profile}
                    setSelectedProfile={setSelectedProfile}
                    setIsShowViewStudyProfile={setShowLearningProfileView}
                  />
                ))}
              </div>
            ) : (
              <NoQuestionData />
            )}
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  )
}

export default ExamViewHistory
