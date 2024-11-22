import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import classNames from "classnames/bind";
import styles from "./StudyProfileTable.module.scss";

const cx = classNames.bind(styles);

function StudyProfileTable() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(5);

  const fetchProfiles = (page, pageSize) => {
    apiClient
      .get("/study-profiles/getStudyProfile", {
        params: { page, pageSize },
      })
      .then((response) => {
        const { data } = response.data;
        const { data: profileList, totalPages} = data;
        setProfiles(profileList || []);
        setTotalPages(Math.ceil(totalPages || 1));
        setCurrentPage(page);
      })
      .catch((error) => {
        console.error("Error fetching study profiles:", error);
        setProfiles([]);
      });
  };

  const updateTrialExamStatus = async (profileId, currentStatus) => {
    const newStatus = !currentStatus; 
    try {
      await apiClient.post(`/study-profiles/take-trial-exam/${profileId}`, {
        isTrialExam: newStatus,
      });
      fetchProfiles(currentPage, pageSize); 
    } catch (error) {
      console.error("Error updating trial exam status:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchProfiles(newPage, pageSize);
    }
  };

  useEffect(() => {
    fetchProfiles(currentPage, pageSize);
  }, []); // Fetch profiles on component mount

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
                <th>Math Target Score</th>
                <th>Reading & Writing Target Score</th>
                <th>Take Trial Exam</th>
              </tr>
            </thead>
            <tbody>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <tr key={profile.id}>
                    <td>{profile.account?.email || "N/A"}</td>
                    <td>{formatDate(profile.startdate)}</td>
                    <td>{formatDate(profile.enddate)}</td>
                    <td>{profile.targetscoreMath || "N/A"}</td>
                    <td>{profile.targetscoreRW || "N/A"}</td>
                    <td className={cx("status-cell")}>
                      <div
                        className={cx("status-toggle")}
                        onClick={() =>
                          updateTrialExamStatus(profile.id, profile.isTrialExam)
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {profile.isTrialExam ? (
                          <div className={cx("toggle-switch", "active")}>
                            <div className={cx("toggle-circle")}></div>
                          </div>
                        ) : (
                          <div className={cx("toggle-switch", "inactive")}>
                            <div className={cx("toggle-circle")}></div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={cx("no-data")}>
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
    </div>
  );
}

export default StudyProfileTable;
