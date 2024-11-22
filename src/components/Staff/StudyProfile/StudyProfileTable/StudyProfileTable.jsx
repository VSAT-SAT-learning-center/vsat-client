import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import classNames from "classnames/bind";
import styles from "./StudyProfileTable.module.scss";
import ProfileEditModal from "../ProfileEditModal";

const cx = classNames.bind(styles);

function StudyProfileTable() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const fetchProfiles = (page, pageSize) => {
    apiClient
      .get("/study-profiles/getStudyProfileWithTeacherDetail", {
        params: { page, pageSize },
      })
      .then((response) => {
        const { data } = response.data;
        const { data: profileList, totalPages } = data;
        setProfiles(profileList || []);
        setTotalPages(Math.ceil(totalPages || 1));
        setCurrentPage(page);
      })
      .catch((error) => {
        console.error("Error fetching study profiles:", error);
        setProfiles([]);
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const parts = dateString.split(" ");
    if (parts.length < 2) return "N/A";

    const datePart = parts[1];
    const [day, month, year] = datePart.split("/");

    return `${year}-${month}-${day}`;
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchProfiles(newPage, pageSize);
    }
  };

  const handleEditClick = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  useEffect(() => {
    fetchProfiles(currentPage, pageSize);
  }, []);

  return (
    <div className={cx("table-wrapper")}>
      <div className={cx("table-container")}>
        <div className={cx("header-container")}>
          <div className={cx("header-actions")}>
            <div className={cx("header-actions-search")}>
              <input
                className={cx("search-input")}
                placeholder="Search by email"
              />
              <button className={cx("filter-btn")}>Search</button>
            </div>
          </div>
        </div>
        <div className={cx("study-profile-table-container")}>
          <table className={cx("study-profile-table")}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Teacher In Charge</th>
                <th>Math Target</th>
                <th>Reading & Writing Target</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <tr key={profile.id}>
                    <td>{profile.account?.email || "N/A"}</td>
                    <td>{formatDate(profile.startdate)}</td>
                    <td>{formatDate(profile.enddate)}</td>
                    <td>
                      {profile.teacher?.firstname || ""}{" "}
                      {profile.teacher?.lastname || ""}
                    </td>
                    <td className={cx("center")}>
                      {profile.targetscoreMath || "N/A"}
                    </td>
                    <td className={cx("center")}>
                      {profile.targetscoreRW || "N/A"}
                    </td>
                    <td className={cx("action-cell")}>
                      <div className={cx("action-icons")}>
                        <span
                          className={cx("icon", "edit-icon")}
                          onClick={() => handleEditClick(profile)}
                        >
                          ...
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={cx("no-data")}>
                    No study profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={cx("paging-container")}>
          <div className={cx("pagination")}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? cx("active") : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && selectedProfile && (
        <ProfileEditModal
          isOpen={isModalOpen}
          onClose={closeModal}
          profile={selectedProfile}
          onSaveSuccess={() => fetchProfiles(currentPage, pageSize)}
        />
      )}
    </div>
  );
}

export default StudyProfileTable;
