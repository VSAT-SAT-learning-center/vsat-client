import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import LearningPartDetailContentMath from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath";
import LearningPartDetailContentRW from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW";
import apiClient from "~/services/apiService";
import CensorConfirmFeedback from "./CensorConfirmFeedback";
import CensorFeedbackReason from "./CensorFeedbackReason";
import styles from "./CensorLearningMaterialView.module.scss";
import CensorViewSidebar from "./CensorViewSidebar";
const cx = classNames.bind(styles);

function CensorLearningMaterialView({ fetchLearningMaterials, unitId, setIsShowCensorView }) {
  const [unitDetails, setUnitDetails] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [lessonIds, setLessonIds] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isBottom, setIsBottom] = useState(false);
  const [censorStatus, setCensorStatus] = useState([]);
  const [finalCensorResult, setFinalCensorResult] = useState(null);
  const [isShowCensorFeedback, setIsShowCensorFeedback] = useState(false);
  const [isShowConfirmFeedback, setIsShowConfirmFeedback] = useState();
  const contentRef = useRef(null);
  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const response = await apiClient.get(`/units/${unitId}/details`);
        const unitData = response.data;
        setUnitDetails(unitData);
        if (unitData?.unitAreas?.length > 0) {
          const firstUnitArea = unitData.unitAreas[0];
          const allLessonIds = unitData.unitAreas.flatMap((unitArea) =>
            unitArea.lessons.map((lesson) => lesson.id)
          );
          setLessonIds(allLessonIds);
          if (firstUnitArea.lessons?.length > 0) {
            setLessonData(firstUnitArea.lessons[0]);
            setCurrentLessonIndex(0);
          }
        }
      } catch (error) {
        console.error("Error fetching unit details:", error);
      }
    };

    fetchUnitDetails();
  }, [unitId]);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          setIsBottom(true);
        } else {
          setIsBottom(false);
        }
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleBackLesson = () => {
    if (currentLessonIndex > 0) {
      const prevLessonId = lessonIds[currentLessonIndex - 1];
      setCurrentLessonIndex(currentLessonIndex - 1);

      // Fetch the previous lesson data
      const fetchPrevLesson = async () => {
        try {
          const response = await apiClient.get(`/lessons/${prevLessonId}`);
          setLessonData(response.data.data);
          if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        } catch (error) {
          console.error("Error fetching previous lesson:", error);
        }
      };

      fetchPrevLesson();
    }
  };

  const handleMarkRejectLesson = () => {
    setIsShowCensorFeedback(true);
  };

  const handleContinueLesson = () => {
    setCensorStatus((prevStatus) => {
      const existingLessonIndex = prevStatus.findIndex(
        (lesson) => lesson.lessonId === lessonIds[currentLessonIndex]
      );

      let updatedStatus;
      if (existingLessonIndex !== -1) {
        // Update previously rejected lesson to approved
        updatedStatus = [...prevStatus];
        updatedStatus[existingLessonIndex] = {
          ...updatedStatus[existingLessonIndex],
          status: "Approved",
          reason: null,
          content: null,
        };
      } else {
        // First time approving this lesson
        updatedStatus = [
          ...prevStatus,
          {
            lessonId: lessonIds[currentLessonIndex],
            lessonTitle: lessonData.title,
            status: "Approved",
          },
        ];
      }

      // Check if all lessons are approved
      const allApproved = updatedStatus.every(
        (lesson) => lesson.status === "Approved"
      );
      if (allApproved) {
        setFinalCensorResult("Approved");
      }

      return updatedStatus;
    });

    // Proceed to next lesson or finalize
    if (currentLessonIndex === lessonIds.length - 1) {
      setIsShowConfirmFeedback(true);
      setIsShowCensorFeedback(false);
    } else if (currentLessonIndex < lessonIds.length - 1) {
      const nextLessonId = lessonIds[currentLessonIndex + 1];
      setCurrentLessonIndex(currentLessonIndex + 1);

      const fetchNextLesson = async () => {
        try {
          const response = await apiClient.get(`/lessons/${nextLessonId}`);
          setLessonData(response.data.data);
          if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        } catch (error) {
          console.error("Error fetching next lesson:", error);
        }
      };

      fetchNextLesson();
    } else {
      // Final check after all lessons
      setCensorStatus((currentStatus) => {
        const isRejected = currentStatus.some(
          (lesson) => lesson.status === "Rejected"
        );
        setFinalCensorResult(isRejected ? "Rejected" : "Approved");
        return currentStatus;
      });
      setIsShowCensorFeedback(false);
    }
  };

  const markRejectLesson = (reason, content) => {
    setCensorStatus((prevStatus) => {
      const existingLessonIndex = prevStatus.findIndex(
        (lesson) => lesson.lessonId === lessonIds[currentLessonIndex]
      );

      let updatedStatus;
      if (existingLessonIndex !== -1) {
        // Update previously approved lesson to rejected
        updatedStatus = [...prevStatus];
        updatedStatus[existingLessonIndex] = {
          ...updatedStatus[existingLessonIndex],
          status: "Rejected",
          reason,
          content,
        };
      } else {
        // First time rejecting this lesson
        updatedStatus = [
          ...prevStatus,
          {
            lessonId: lessonIds[currentLessonIndex],
            lessonTitle: lessonData.title,
            status: "Rejected",
            reason,
            content,
          },
        ];
      }

      // Check if there are any rejected lessons
      const hasRejected = updatedStatus.some(
        (lesson) => lesson.status === "Rejected"
      );
      if (hasRejected) {
        setFinalCensorResult("Rejected");
      }

      return updatedStatus;
    });

    // Proceed to next lesson or finalize
    if (currentLessonIndex === lessonIds.length - 1) {
      setIsShowConfirmFeedback(true);
      setIsShowCensorFeedback(false);
    } else if (currentLessonIndex < lessonIds.length - 1) {
      const nextLessonId = lessonIds[currentLessonIndex + 1];
      setCurrentLessonIndex(currentLessonIndex + 1);

      const fetchNextLesson = async () => {
        try {
          const response = await apiClient.get(`/lessons/${nextLessonId}`);
          setLessonData(response.data.data);
          setIsShowCensorFeedback(false);
          if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        } catch (error) {
          console.error("Error fetching next lesson:", error);
        }
      };

      fetchNextLesson();
    } else {
      // Final check after all lessons
      setCensorStatus((currentStatus) => {
        const isRejected = currentStatus.some(
          (lesson) => lesson.status === "Rejected"
        );
        setFinalCensorResult(isRejected ? "Rejected" : "Approved");
        return currentStatus;
      });
      setIsShowCensorFeedback(false);
    }
  };
  return (
    <>
      {isShowCensorFeedback && (
        <CensorFeedbackReason
          lessonData={lessonData}
          setIsShowCensorFeedback={setIsShowCensorFeedback}
          markRejectLesson={markRejectLesson}
        />
      )}
      {isShowConfirmFeedback && (
        <CensorConfirmFeedback
          fetchLearningMaterials={fetchLearningMaterials}
          unitDetails={unitDetails}
          censorStatus={censorStatus}
          finalCensorResult={finalCensorResult}
          setIsShowConfirmFeedback={setIsShowConfirmFeedback}
          setIsShowCensorView={setIsShowCensorView}
        />
      )}
      <div className={cx("censor-learning-material-view-wrapper")}>
        <div className={cx("censor-learning-material-view-container")}>
          <div className={cx("censor-learning-material-view-header")}>
            <div className={cx("header-left")}>
              <div
                className={cx("view-back")}
                onClick={() => setIsShowCensorView(false)}
              >
                <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
              </div>
              <div className={cx("view-title")}>{unitDetails?.title}</div>
            </div>
          </div>
          <div className={cx("censor-learning-material-view-main")}>
            <div className={cx("censor-learning-material-view-sidebar")}>
              <div
                className={cx(
                  "censor-learning-material-view-sidebar-container"
                )}
              >
                <div className={cx("detail-header")}>
                  <div className={cx("detail-icon")}>
                    <i className={cx("fa-regular fa-book-open", "icon")}></i>
                  </div>
                  <div className={cx("detail-title")}>{unitDetails?.title}</div>
                </div>
                <div className={cx("detail-content")}>
                  {unitDetails?.unitAreas &&
                    unitDetails?.unitAreas.length > 0 &&
                    unitDetails?.unitAreas.map((unitArea) => (
                      <CensorViewSidebar
                        key={unitArea.id}
                        unitArea={unitArea}
                        lessonData={lessonData}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div
              ref={contentRef}
              className={cx("censor-learning-material-view-content")}
            >
              {lessonData?.type === "Text" ? (
                <LearningPartDetailContentRW
                  lesson={lessonData}
                  type={"preview"}
                />
              ) : (
                <LearningPartDetailContentMath
                  lesson={lessonData}
                  type={"preview"}
                />
              )}
            </div>
          </div>
          <div className={cx("censor-learning-material-view-bottom")}>
            <button
              className={cx("mark-btn", { "disabled-mark-btn": !isBottom })}
              disabled={!isBottom}
              onClick={handleMarkRejectLesson}
            >
              Mark rejected
            </button>
            <div className={cx("bottom-right")}>
              <button
                className={cx("back-btn", {
                  "disabled-back-btn": currentLessonIndex === 0,
                })}
                disabled={currentLessonIndex === 0}
                onClick={handleBackLesson}
              >
                Back
              </button>
              <button
                className={cx("next-btn", {
                  "disabled-continue-btn": !isBottom,
                })}
                disabled={!isBottom}
                onClick={handleContinueLesson}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
CensorLearningMaterialView.propTypes = {
  unitId: PropTypes.string,
  setIsShowCensorView: PropTypes.func,
};
export default CensorLearningMaterialView;
