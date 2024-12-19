import { PlusCircleOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import ProfileCreateModal from "../ProfileCreateModal";
import ProfileEditModal from "../ProfileEditModal";
import styles from "./StudyProfileTable.module.scss";

const cx = classNames.bind(styles);

function StudyProfileTable() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
        console.log(profileList);

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
    let [day, month, year] = datePart.split("/");

    day = day.padStart(2, "0");
    month = month.padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModalCreate = () => {
    setModalIsOpen(false);
    fetchProfiles(currentPage, pageSize);
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
  }, [currentPage, pageSize]);

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
            <button className={cx("add-study-profile-btn")} onClick={openModal}>
              <PlusCircleOutlined style={{ marginRight: "5px" }} /> Add User
            </button>
          </div>
        </div>
        <div className={cx("study-profile-table-container")}>
          <table className={cx("study-profile-table")}>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Teacher In Charge</th>
                <th>Math Target</th>
                <th>R&W Target</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <tr key={profile.id}>
                    <td>
                      <div className={cx("avatar")}>
                        <img
                          src={profile?.account?.profilepictureurl}
                          alt="user-avatar"
                          className={cx("avatar-img")}
                        />
                      </div>
                    </td>
                    <td>{profile.account?.email || "N/A"}</td>
                    <td>{formatDate(profile.startdate)}</td>
                    <td>{formatDate(profile.enddate)}</td>
                    <td>
                      {(profile?.teacher?.firstname || "") +
                        " " +
                        (profile?.teacher?.lastname || "Unknown")}
                    </td>
                    <td className={cx("center")}>
                      {profile.targetscoreMath || 0}
                    </td>
                    <td className={cx("center")}>
                      {profile.targetscoreRW || 0}
                    </td>
                    <td className={cx("status")}>
                      <div
                        className={cx(
                          "status-type",
                          profile?.status === "Completed"
                            ? "completed-status"
                            : profile?.status === "Active"
                              ? "active-status"
                              : "inactive-status"
                        )}
                      >
                        {profile.status}
                      </div>
                    </td>
                    <td className={cx("action-cell")}>
                      {(profile.status === "Active" || profile.status === "Inactive") && (
                        <div className={cx("action-icons")}>
                          <span
                            className={cx("icon")}
                            onClick={() => handleEditClick(profile)}
                          >
                            <i
                              className={cx(
                                "fa-regular fa-arrow-up-right-from-square"
                              )}
                            ></i>
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className={cx("no-data")}>
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

      {modalIsOpen && (
        <ProfileCreateModal
          isOpen={modalIsOpen}
          onClose={closeModalCreate}
          onSaveSuccess={() => fetchProfiles(currentPage, pageSize)}
        />
      )}
    </div>
  );
}

export default StudyProfileTable;
