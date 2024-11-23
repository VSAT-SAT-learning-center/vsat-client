import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import StudyProfileItem from "~/components/Teacher/ManageMaterial/StudyProfileItem";
import ViewStudyProfile from "~/components/Teacher/ManageMaterial/ViewStudyProfile";
import apiClient from "~/services/apiService";
import styles from "./TeacherDetailsModal.module.scss";

const cx = classNames.bind(styles);

function TeacherDetailsModal({ teacher, setShowPopup }) {
  const [isShowViewStudyProfile, setIsShowViewStudyProfile] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.get(
          "/study-profiles/getStudyProfile?page=1&pageSize=0"
        );
        const fetchedProfiles = response.data.data.data || [];
        const filteredProfiles = fetchedProfiles.filter(
          (item) => item.teacherId === teacher.id
        );
        setProfiles(filteredProfiles);
      } catch (error) {
        console.error("Error while fetching profiles:", error);
      }
    };

    if (teacher?.id) {
      fetchProfiles();
    }
  }, [teacher]);

  return (
    <div className={cx("teacher-manage-material-wrapper")}>
      {isShowViewStudyProfile && (
        <ViewStudyProfile
          profile={selectedProfile}
          setIsShowViewStudyProfile={setIsShowViewStudyProfile}
        />
      )}
      <div className={cx("teacher-manage-material-container")}>
        <div className={cx("teacher-manage-material-header")}>
          <span className={cx("empty")}></span>
          <span className={cx("title")}>Manage profile</span>
          <button className={cx("close-btn")} onClick={() => setShowPopup(false)}>
            <i className={cx("fa-solid fa-xmark")}></i>
          </button>
        </div>
        <div className={cx("teacher-manage-material-content")}>
          <div className={cx("study-profiles-list")}>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <StudyProfileItem
                  key={profile.id}
                  profile={profile}
                  setSelectedProfile={setSelectedProfile}
                  setIsShowViewStudyProfile={setIsShowViewStudyProfile}
                />
              ))
            ) : (
              <div className={cx("no-profiles")}>
                No profiles found for this teacher.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetailsModal;
