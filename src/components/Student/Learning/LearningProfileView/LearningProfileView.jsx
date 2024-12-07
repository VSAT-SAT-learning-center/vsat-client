import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import apiClient from "~/services/apiService";
import { formatDate } from "~/utils/formatDate";
import LearningProgressView from "../LearningProgressView";
import styles from "./LearningProfileView.module.scss";

const cx = classNames.bind(styles);

function LearningProfileView({ profile, setShowLearningProfileView }) {
  const [targetLearnings, setTargetLearnings] = useState([]);
  const [showLearningProgress, setShowLearningProgress] = useState(false);
  const [targetSelected, setTargetSelected] = useState(null);
  useEffect(() => {
    const fetchTargetLearnings = async () => {
      try {
        const response = await apiClient.get(
          `/target-learnings/getTargetLearningByStudyProfile?studyProfileId=${profile?.id}`
        );
        const sortedTargets = response.data.data.sort(
          (a, b) => new Date(b.createdat) - new Date(a.createdat)
        );
        setTargetLearnings(sortedTargets);
      } catch (error) {
        console.error("Error while fetching target learning:", error);
      }
    };
    fetchTargetLearnings();
  }, [profile?.id]);

  const handleChooseTarget = (target) => {
    setTargetSelected(target);
    setShowLearningProgress(true);
  };
  return (
    <>
      {showLearningProgress && (
        <LearningProgressView
          target={targetSelected}
          setShowLearningProgress={setShowLearningProgress}
          setShowLearningProfileView={setShowLearningProfileView}
        />
      )}
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
          <div
            className={cx(
              targetLearnings?.length > 0
                ? "learning-profile-view-content"
                : "learning-profile-view-no-content"
            )}
          >
            {targetLearnings?.length > 0 ? (
              targetLearnings?.map((target, index) => (
                <div className={cx("target-learning-item")} key={target.id}>
                  <div className={cx("target-learing-header")}>
                    <div className={cx("target-number")}>{index + 1}</div>
                    <div className={cx("target-content")}>
                      <div className={cx("target-title")}>Target Learning</div>
                      <div
                        className={cx(
                          "target-status",
                          target?.status === "Completed"
                            ? "completed"
                            : target?.status === "Active"
                              ? "active"
                              : target?.status === "Certified"
                                ? "certified"
                                : "inactive"
                        )}
                      >
                        {target?.status}
                      </div>
                    </div>
                  </div>
                  <div className={cx("target-learing-content")}>
                    <div className={cx("target-learning-time")}>
                      <div className={cx("time-item")}>
                        <i className={cx("fa-regular fa-timer")}></i>
                        {target?.startdate === null ? (
                          <span>Not started</span>
                        ) : (
                          <span>{formatDate(target?.startdate)}</span>
                        )}
                      </div>
                      <span>-</span>
                      <div className={cx("time-item")}>
                        <i className={cx("fa-regular fa-timer")}></i>
                        {target?.enddate === null ? (
                          <span>Not started</span>
                        ) : (
                          <span>{formatDate(target?.enddate)}</span>
                        )}
                      </div>
                    </div>
                    {(target?.status === "Active" ||
                      target?.status === "Completed") && (
                      <button
                        className={cx("view-btn")}
                        onClick={() => handleChooseTarget(target)}
                      >
                        <i
                          className={cx(
                            "fa-regular fa-arrow-up-right-from-square"
                          )}
                        ></i>
                        <span className={cx("view-text")}>View</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <NoQuestionData />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LearningProfileView;
