import classNames from "classnames/bind";
import { useState } from "react";
import NoData from "~/assets/images/content/nodata1.png";
import EditExamDate from "./EditExamDate";
import styles from "./ViewExamSchedule.module.scss";
const cx = classNames.bind(styles);

function formatDateToDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
function parseDate(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function ViewExamSchedule({
  date,
  event,
  setShowViewExamSchedule,
  fetchExamAttempts,
}) {
  const [showEditDate, setShowEditDate] = useState(false);
  const [targetSelected, setTargetSelected] = useState(null);

  const scheduleDate = formatDateToDDMMYYYY(parseDate(date));
  const currentDate = formatDateToDDMMYYYY(new Date());

  const handleChooseEdit = (profile) => {
    setTargetSelected(profile);
    setShowEditDate(true);
  };
  return (
    <>
      {showEditDate && (
        <EditExamDate
          target={targetSelected}
          setShowEditDate={setShowEditDate}
          setShowViewExamSchedule={setShowViewExamSchedule}
          fetchExamAttempts={fetchExamAttempts}
        />
      )}
      <div
        className={cx("view-exam-schedule-wrapper")}
        onClick={() => setShowViewExamSchedule(false)}
      >
        <div
          className={cx("view-exam-schedule-container")}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={cx("view-exam-date")}>{date}</div>
          {event !== undefined ? (
            <>
              <div className={cx("view-exam-container")}>
                <div className={cx("view-exam-content")}>
                  <div className={cx("exam-item-infor-type")}>
                    <div className={cx("item-icon")}>
                      <i className="fa-sharp fa-regular fa-file-lines"></i>
                    </div>
                    <div className={cx("type-title")}>Exam name:</div>
                    <div className={cx("type-text")}>{event?.exam?.title}</div>
                  </div>
                  <div className={cx("exam-item-infor-type")}>
                    <div className={cx("item-icon")}>
                      <i className="fa-sharp fa-regular fa-file-lines"></i>
                    </div>
                    <div className={cx("type-title")}>Exam type:</div>
                    <div className={cx("type-text")}>
                      {event?.exam?.examType?.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("view-profiles-container")}>
                {event?.targetlearning?.map((profile) => (
                  <div className={cx("view-profile-item")} key={profile?.id}>
                    <div className={cx("item-content")}>
                      <div className={cx("view-profile-infor")}>
                        <img
                          src={
                            profile?.studyProfile?.account?.profilepictureurl
                          }
                          alt="avatar"
                          className={cx("profile-avatar")}
                        />
                        <div className={cx("profile-name")}>
                          {profile?.studyProfile?.account?.username}
                        </div>
                      </div>
                      <div
                        className={cx("view-profile-status", {
                          undone: profile.status === "Inactive",
                          done:
                            profile.status === "Active" ||
                            profile.status === "Completed",
                        })}
                      >
                        {profile.status === "Inactive"
                          ? "Undone"
                          : profile.status === "Active"
                            ? "Done"
                            : "Done"}
                      </div>
                    </div>
                    {profile?.status === "Inactive" &&
                      scheduleDate < currentDate && (
                        <div className={cx("item-action")}>
                          <button
                            className={cx("edit-btn")}
                            onClick={() => handleChooseEdit(profile)}
                          >
                            <i
                              className={cx("fa-regular fa-pen-to-square")}
                            ></i>
                          </button>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={cx("no-data")}>
              <div className={cx("no-data-content")}>
                <img src={NoData} alt="no-data" className={cx("no-data-img")} />
                <div className={cx("no-data-text")}>No data available</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewExamSchedule;
