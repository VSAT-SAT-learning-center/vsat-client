import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import NoData from "~/assets/images/content/nodata1.png";
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
          <span className={cx("title")}>Teacher Profile</span>
          <button className={cx("close-btn")} onClick={() => setShowPopup(false)}>
            <i className={cx("fa-solid fa-xmark")}></i>
          </button>
        </div>
        <div className={cx("teacher-profile-content")}>
          <div className={cx("teacher-profile-infor")}>
            <img
              src={teacher.profilepictureurl}
              alt="profile-avatar"
              className={cx("profile-avatar")}
            />
            <div className={cx("profile-infor")}>
              {/* First Name */}
              <div className={cx("infor-item")}>
                <div className={cx("item-icon")}>
                  <i className={cx("fa-regular fa-address-card")}></i>
                </div>
                <div className={cx("item-title")}>First Name:</div>
                <div className={cx("item-text")}>{teacher?.firstname}</div>
              </div>

              {/* Last Name */}
              <div className={cx("infor-item")}>
                <div className={cx("item-icon")}>
                  <i className={cx("fa-regular fa-address-card")}></i>
                </div>
                <div className={cx("item-title")}>Last Name:</div>
                <div className={cx("item-text")}>{teacher?.lastname}</div>
              </div>

              {/* Date of Birth */}
              <div className={cx("infor-item")}>
                <div className={cx("item-icon")}>
                  <i className={cx("fa-regular fa-calendar-alt")}></i>
                </div>
                <div className={cx("item-title")}>Date of Birth:</div>
                <div className={cx("item-text")}>{teacher?.dateofbirth}</div>
              </div>

              {/* Gender */}
              <div className={cx("infor-item")}>
                <div className={cx("item-icon")}>
                  <i className={cx("fa-regular fa-venus-mars")}></i>
                </div>
                <div className={cx("item-title")}>Gender:</div>
                <div className={cx("item-text")}>{teacher?.gender ? "Male" : "Female"}</div>
              </div>

              {/* Email */}
              <div className={cx("infor-item")}>
                <div className={cx("item-icon")}>
                  <i className={cx("fa-regular fa-envelope")}></i>
                </div>
                <div className={cx("item-title")}>Email:</div>
                <div className={cx("item-text")}>{teacher?.email}</div>
              </div>

              {/* Phone */}
              <div className={cx("infor-item")}>
                <div className={cx("item-icon")}>
                  <i className={cx("fa-regular fa-phone")}></i>
                </div>
                <div className={cx("item-title")}>Phone:</div>
                <div className={cx("item-text")}>+{teacher?.phonenumber}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("teacher-manage-material-content")}>
          {profiles.length > 0 ? (
            <div className={cx("study-profiles-list")}>
              {profiles.map((profile) => (
                <StudyProfileItem
                  key={profile.id}
                  profile={profile}
                  setSelectedProfile={setSelectedProfile}
                  setIsShowViewStudyProfile={setIsShowViewStudyProfile}
                />
              ))}
            </div>
          ) : (
            <div className={cx("no-profiles")}>
              <div className={cx("no-data-content")}>
                <img
                  src={NoData}
                  alt="No data available"
                  className={cx("no-data-img")}
                />
                <div className={cx("no-data-text")}>No assigned profiles</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default TeacherDetailsModal;
