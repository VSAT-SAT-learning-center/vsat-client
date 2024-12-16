import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import LearningProfileView from "~/components/Student/Learning/LearningProfileView";
import StudyProfileItem from "~/components/Teacher/ManageMaterial/StudyProfileItem";
import PageLayout from "~/layouts/Teacher/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ManageProgress.module.scss";
const cx = classNames.bind(styles);

function ManageProgress() {
  const [profiles, setProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showLearningProfileView, setShowLearningProfileView] = useState(false)
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.get("/study-profiles/getStudyProfileWithTeacher?page=1&pageSize=0&status=Active")
        setProfiles(response.data.data.data);
      } catch (error) {
        console.error("Error while fetching profiles:", error)
      }
    }

    fetchProfiles()
  }, [])
  return (
    <>
      {showLearningProfileView && <LearningProfileView profile={selectedProfile} setShowLearningProfileView={setShowLearningProfileView} />}
      <PageLayout>
        <div className={cx("teacher-manage-progress-wrapper")}>
          <div className={cx("teacher-manage-progress-container")}>
            <div className={cx("teacher-manage-progress-header")}>
              <div className={cx("teacher-manage-progress-text")}>
                Manage Progress
              </div>
            </div>
            {profiles?.length > 0 ? (
              <div className={cx("teacher-manage-progress-content")}>
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
  );
}

export default ManageProgress;
