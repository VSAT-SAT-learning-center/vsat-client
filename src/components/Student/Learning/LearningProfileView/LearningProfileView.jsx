import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import { formatDate } from "~/utils/formatDate";
import LearningProgressView from "../LearningProgressView";
import styles from "./LearningProfileView.module.scss";

const cx = classNames.bind(styles);


function LearningProfileView({ profile, setShowLearningProfileView }) {
  const [targetLearnings, setTargetLearnings] = useState([])
  const [showLearningProgress, setShowLearningProgress] = useState(false)
  const [targetSelected, setTargetSelected] = useState(null)
  useEffect(() => {
    const fetchTargetLearnings = async () => {
      try {
        const response = await apiClient.get(`/target-learnings/getTargetLearningByStudyProfile?studyProfileId=${profile?.id}`)
        setTargetLearnings(response.data.data);
      } catch (error) {
        console.error("Error while fetching target learning:", error);
      }
    }
    fetchTargetLearnings()
  }, [profile?.id])

  const handleChooseTarget = (target) => {
    setTargetSelected(target)
    setShowLearningProgress(true)
  }
  return (
    <>
      {showLearningProgress && <LearningProgressView target={targetSelected} setShowLearningProgress={setShowLearningProgress} />}
      <div className={cx("learning-profile-view-wrapper")}>
        <div className={cx("learning-profile-view-container")}>
          <div className={cx("learning-profile-view-header")}>
            <div
              className={cx("profile-close")}
              onClick={() => setShowLearningProfileView(false)}
            >
              <i className={cx("fa-regular fa-arrow-left")}></i>
            </div>
            <div className={cx("profile-title")}>Study Profile Detail</div>
            <div className={cx("profile-empty")}></div>
          </div>
          <div className={cx("learning-profile-view-content")}>
            {targetLearnings?.map((target) => (
              <div className={cx("target-learning-item")} key={target.id}>
                <div className={cx("target-learing-header")}>
                  <div className={cx("target-number")}>1</div>
                  <div className={cx("target-content")}>
                    <div className={cx("target-title")}>Target Learning</div>
                    <div className={cx("target-status", target?.status === "Completed"
                      ? "completed"
                      : target?.status === "Active"
                        ? "active"
                        : "inactive")}>{target?.status}</div>
                  </div>
                </div>
                <div className={cx("target-learing-content")}>
                  <div className={cx("target-learning-time")}>
                    <div className={cx("time-item")}>
                      <i className={cx("fa-regular fa-timer")}></i>
                      <span>{formatDate(target?.startdate)}</span>
                    </div>
                    <span>-</span>
                    <div className={cx("time-item")}>
                      <i className={cx("fa-regular fa-timer")}></i>
                      <span>{formatDate(target?.enddate)}</span>
                    </div>
                  </div>
                  <button className={cx("view-btn")} onClick={() => handleChooseTarget(target)}>
                    <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
                    <span className={cx("view-text")}>View</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default LearningProfileView
