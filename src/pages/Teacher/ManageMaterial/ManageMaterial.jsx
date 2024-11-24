import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import StudyProfileItem from "~/components/Teacher/ManageMaterial/StudyProfileItem";
import ViewStudyProfile from "~/components/Teacher/ManageMaterial/ViewStudyProfile";
import PageLayout from "~/layouts/Teacher/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ManageMaterial.module.scss";
const cx = classNames.bind(styles);
function ManageMaterial() {
  const [isShowViewStudyProfile, setIsShowViewStudyProfile] = useState(false);
  const [profiles, setProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
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
      {isShowViewStudyProfile && (
        <ViewStudyProfile
          profile={selectedProfile}
          setIsShowViewStudyProfile={setIsShowViewStudyProfile}
        />
      )}
      <PageLayout>
        <div className={cx("teacher-manage-material-wrapper")}>
          <div className={cx("teacher-manage-material-container")}>
            <div className={cx("teacher-manage-material-header")}>
              <div className={cx("teacher-manage-material-text")}>
                Manage Material
              </div>
            </div>
            <div className={cx("teacher-manage-material-content")}>
              <div className={cx("study-profiles-list")}>
                {profiles?.map((profile) => (
                  <StudyProfileItem
                    key={profile.id}
                    profile={profile}
                    setSelectedProfile={setSelectedProfile}
                    setIsShowViewStudyProfile={setIsShowViewStudyProfile}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default ManageMaterial;
