import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import LearningPartDetailContentMath from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath";
import LearningPartDetailContentRW from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW";
import apiClient from "~/services/apiService";
import CensorFeedbackReason from "./CensorFeedbackReason";
import styles from "./CensorLearningMaterialView.module.scss";
import CensorViewSidebar from "./CensorViewSidebar";
const cx = classNames.bind(styles);

function CensorLearningMaterialView({ unitId, setIsShowCensorView }) {
  const [unitDetails, setUnitDetails] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [lessonIds, setLessonIds] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isBottom, setIsBottom] = useState(false);
  const [censorStatus, setCensorStatus] = useState([]);
  const [finalCensorResult, setFinalCensorResult] = useState(null);
  const [isShowCensorFeedback, setIsShowCensorFeedback] = useState(false);
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

  const handleContinueLesson = () => {
    if (currentLessonIndex < lessonIds.length - 1) {
      // Save this lesson as approved
      const nextLessonId = lessonIds[currentLessonIndex + 1];
      setCurrentLessonIndex(currentLessonIndex + 1);

      setCensorStatus((prevStatus) => [
        ...prevStatus,
        { lessonId: lessonIds[currentLessonIndex], status: "Approved" },
      ]);

      // Fetch the next lesson data
      const fetchNextLesson = async () => {
        try {
          const response = await apiClient.get(`/lessons/${nextLessonId}`);
          setLessonData(response.data.data);
          if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } catch (error) {
          console.error("Error fetching next lesson:", error);
        }
      };

      fetchNextLesson();
    } else {
      // All lessons processed, check the censor status array
      if (censorStatus.some((lesson) => lesson.status === "Rejected")) {
        setFinalCensorResult("Rejected");
      } else {
        setFinalCensorResult("Approved");
      }
      console.log("Final result: ", finalCensorResult);
    }
  };

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
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } catch (error) {
          console.error("Error fetching previous lesson:", error);
        }
      };

      fetchPrevLesson();
    }
  };

  const handleMarkRejectLesson = () => {
    setIsShowCensorFeedback(true)
  };

  const markRejectLesson = (reasonFeedback, feedbackContent) => {
    setCensorStatus((prevStatus) => {
      const existingLessonIndex = prevStatus.findIndex(
        (lesson) => lesson.lessonId === lessonIds[currentLessonIndex]
      );

      if (existingLessonIndex !== -1) {
        const updatedStatus = [...prevStatus];
        updatedStatus[existingLessonIndex] = {
          ...updatedStatus[existingLessonIndex],
          reasonFeedback,
          feedbackContent
        };
        return updatedStatus;
      } else {
        return [
          ...prevStatus,
          {
            lessonId: lessonIds[currentLessonIndex],
            lessonTitle: lessonData.title,
            status: "Rejected",
            reasonFeedback,
            feedbackContent
          },
        ];
      }
    });

    if (currentLessonIndex < lessonIds.length - 1) {
      const nextLessonId = lessonIds[currentLessonIndex + 1];
      setCurrentLessonIndex(currentLessonIndex + 1);

      // Fetch the next lesson data
      const fetchNextLesson = async () => {
        try {
          const response = await apiClient.get(`/lessons/${nextLessonId}`);
          setLessonData(response.data.data);
          setIsShowCensorFeedback(false);
          if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } catch (error) {
          console.error("Error fetching next lesson:", error);
        }
      };

      fetchNextLesson();
    } else {
      if (censorStatus.some((lesson) => lesson.status === "Rejected")) {
        setFinalCensorResult("Rejected");
        setIsShowCensorFeedback(false);
      } else {
        setFinalCensorResult("Approved");
        setIsShowCensorFeedback(false);
      }
    }
  };

  const handleApproveLesson = () => {

  }
  const handleRejectLesson = () => {
    console.log(censorStatus);
  }

  return (
    <>
      {isShowCensorFeedback && <CensorFeedbackReason setIsShowCensorFeedback={setIsShowCensorFeedback} markRejectLesson={markRejectLesson} />}
      <div className={cx("censor-learning-material-view-wrapper")}>
        <div className={cx("censor-learning-material-view-container")}>
          <div className={cx("censor-learning-material-view-header")}>
            <div className={cx("header-left")}>
              <div className={cx("view-back")} onClick={() => setIsShowCensorView(false)}>
                <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
              </div>
              <div className={cx("view-title")}>{unitDetails?.title}</div>
            </div>
            <div className={cx("header-censor")}>
              {finalCensorResult && (
                finalCensorResult === "Approved" ? (
                  <button className={cx("approved-btn")} onClick={handleApproveLesson}>
                    <i className={cx("fa-sharp fa-regular fa-check", "btn-icon")}></i>
                    <span className={cx("btn-text")}>Approved</span>
                  </button>
                ) : (
                  <button className={cx("rejected-btn")} onClick={handleRejectLesson}>
                    <i className={cx("fa-sharp fa-regular fa-ban", "btn-icon")}></i>
                    <span className={cx("btn-text")}>Rejected</span>
                  </button>
                )
              )}
            </div>
          </div>
          <div className={cx("censor-learning-material-view-main")}>
            <div className={cx("censor-learning-material-view-sidebar")}>
              <div className={cx("censor-learning-material-view-sidebar-container")}>
                <div className={cx("detail-header")}>
                  <div className={cx("detail-icon")}>
                    <i className={cx("fa-regular fa-book-open", "icon")}></i>
                  </div>
                  <div className={cx("detail-title")}>
                    {unitDetails?.title}
                  </div>
                </div>
                <div className={cx("detail-content")}>
                  {unitDetails?.unitAreas && unitDetails?.unitAreas.length > 0 && unitDetails?.unitAreas.map((unitArea) => (
                    <CensorViewSidebar key={unitArea.id} unitArea={unitArea} lessonData={lessonData} />
                  ))}
                </div>
              </div>
            </div>
            <div ref={contentRef} className={cx("censor-learning-material-view-content")}>
              {lessonData?.type === "Text" ? (
                <LearningPartDetailContentRW lesson={lessonData} />
              ) : (
                <LearningPartDetailContentMath lesson={lessonData} />
              )}
            </div>
          </div>
          <div className={cx("censor-learning-material-view-bottom")}>
            <button className={cx("mark-btn", { "disabled-mark-btn": !isBottom })} disabled={!isBottom} onClick={handleMarkRejectLesson}>Mark rejected</button>
            <div className={cx("bottom-right")}>
              <button className={cx("back-btn", { "disabled-back-btn": currentLessonIndex === 0 })} disabled={currentLessonIndex === 0} onClick={handleBackLesson}>Back</button>
              <button className={cx("next-btn", { "disabled-continue-btn": !isBottom })} disabled={!isBottom} onClick={handleContinueLesson}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
CensorLearningMaterialView.propTypes = {
  unitId: PropTypes.string,
  setIsShowCensorView: PropTypes.func,
}
export default CensorLearningMaterialView
