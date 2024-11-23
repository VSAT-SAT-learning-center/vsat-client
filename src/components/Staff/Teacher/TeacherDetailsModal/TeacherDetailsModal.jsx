import Modal from "react-modal";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import StudyProfileItem from "~/components/Teacher/ManageMaterial/StudyProfileItem";
import ViewStudyProfile from "~/components/Teacher/ManageMaterial/ViewStudyProfile";
import classNames from "classnames/bind";
import styles from "./TeacherDetailsModal.module.scss";

const cx = classNames.bind(styles);

function TeacherDetailsModal({ isOpen, onRequestClose, teacher }) {
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={cx("modal-content")}
      overlayClassName={cx("modal-overlay")}
    >
      {isShowViewStudyProfile && (
        <ViewStudyProfile
          profile={selectedProfile}
          setIsShowViewStudyProfile={setIsShowViewStudyProfile}
        />
      )}
      <div className={cx("teacher-manage-material-wrapper")}>
        <div className={cx("teacher-manage-material-container")}>
          {/* Header */}
          <div className={cx("teacher-manage-material-header")}>
            Manage Material
          </div>

          {/* Content */}
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
    </Modal>
  );
}

export default TeacherDetailsModal;
