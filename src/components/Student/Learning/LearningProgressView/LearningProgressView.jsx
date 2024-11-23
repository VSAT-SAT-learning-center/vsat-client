import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LMImg from "~/assets/images/content/lm-01.png";
import RWImg from "~/assets/images/content/r&w.png";
import apiClient from "~/services/apiService";
import styles from "./LearningProgressView.module.scss";

const cx = classNames.bind(styles);

function LearningProgressView({ target, setShowLearningProgress }) {
  const navigate = useNavigate()
  const [progressData, setProgressData] = useState([])
  const [activeProgress, setActiveProgress] = useState(null)
  const [isWaiting, setIsWaiting] = useState(false)
  const [targetLearningDetail, setTargetLearningDetail] = useState(null)
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setIsWaiting(true)
        const responose = await apiClient.get(`/target-learnings/${target?.id}/recent-learning`)
        setProgressData(responose.data);
        setActiveProgress(responose.data[0])
        setTargetLearningDetail(responose.data[0].targetLearningDetailId)
      } catch (error) {
        console.error("Error while fetching progress data:", error)
      } finally {
        setIsWaiting(false)
      }
    }

    fetchProgressData()
  }, [target?.id])

  const handleChooseProgress = (progress) => {
    setActiveProgress(progress)
    setTargetLearningDetail(progress.targetLearningDetailId)
  }

  const handleChooseUnit = () => {
    navigate(`/learning/sat-reading-and-writing/${targetLearningDetail}`)
  }
  return (
    <div className={cx("learning-progress-view-wrapper")}>
      <div className={cx("learning-progress-view-container")}>
        <div className={cx("learning-progress-view-header")}>
          <div
            className={cx("progress-close")}
            onClick={() => setShowLearningProgress(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("progress-title")}>Learning Progress</div>
          <div className={cx("progress-empty")}></div>
        </div>
        {isWaiting ? (
          <div className={cx("learning-progress-view-no-content")}>
            <div className={cx("loader")}></div>
          </div>
        ) : (
          <div className={cx("learning-progress-view-content")}>
            <div className={cx("learning-progress-sidebar-container")}>
              {progressData?.map((progress) => (
                <div
                  className={cx(
                    "learning-progress-introduction",
                    { "introduction-active": activeProgress.targetLearningDetailId === progress.targetLearningDetailId }
                  )}
                  key={progress.targetLearningDetailId}
                  onClick={() => handleChooseProgress(progress)}
                >
                  <img
                    src={LMImg}
                    alt={`progress-img`}
                    className={cx("introduction-img")}
                  />
                  <div className={cx("introduction-infor")}>
                    <div className={cx("infor-title")}>SAT {progress.section.name}</div>
                    <div className={cx("infor-details")}>
                      <span className={cx("infor-units")}>{progress.totalUnitAreaCount} TOPICS</span> -{" "}
                      <span className={cx("infor-skills")}>{progress.totalLessonCount} LESSONS</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={cx("learning-progress-content-container")}>
              {activeProgress?.unitProgresses.map((unitProgress) => (
                <div className={cx("learning-progress-item")} key={unitProgress?.unitProgressId} onClick={handleChooseUnit}>
                  <div className={cx("learning-material-title")}>
                    <div className={cx("title-image")}>
                      <img src={RWImg} alt="learning-material-img" className={"lm-img"} />
                    </div>
                    <div className={cx("title-text")}>{unitProgress?.unit.title}</div>
                  </div>
                  <div className={cx("learning-material-about")}>{unitProgress?.unit.description}</div>
                  <div className={cx("learning-material-main")}>
                    <div className={cx("learning-material-config")}>
                      <div className={cx("infor-level")}>
                        <i className={cx("fa-sharp fa-light fa-layer-group", "level-icon")}></i>
                        <span className={cx("level-text")}>{unitProgress?.unit?.level.name}</span>
                      </div>
                      <div className={cx("infor-detail")}>
                        <div className={cx("detail-item")}>
                          <i className={cx("fa-light fa-book-open", "detail-icon")}></i>
                          <span className={cx("detail-text")}>{unitProgress.unit.unitAreaCount} Topics</span>
                        </div>
                        <div className={cx("detail-item")}>
                          <i className={cx("fa-light fa-file-pen", "detail-icon")}></i>
                          <span className={cx("detail-text")}>{unitProgress.unit.lessonCount} Lessons</span>
                        </div>
                      </div>
                    </div>
                    <div className={cx("learning-material-progress", { "normal-progress": unitProgress.progress > 0 && unitProgress.progress < 100 })}>
                      <div
                        className={cx("progress-fill", {
                          "fill-completed": unitProgress.progress === 100,
                          "no-fill": unitProgress.progress === 0,
                        })}
                        style={{ width: unitProgress.progress === 0 ? "100%" : `${unitProgress.progress}%` }}
                      >
                        <span className={cx("current-percentage")}>
                          {unitProgress.progress === 100
                            ? "Completed"
                            : unitProgress.progress === 0
                              ? "Not Started"
                              : `${unitProgress.progress}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningProgressView;
