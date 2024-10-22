import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import LearningPartDetailContentMath from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath";
import LearningPartDetailContentRW from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW";
import apiClient from "~/services/apiService";
import styles from "./CensorLearningMaterialView.module.scss";
import CensorViewSidebar from "./CensorViewSidebar";
const cx = classNames.bind(styles);

function CensorLearningMaterialView({ unitId, setIsShowCensorView }) {
  const [unitDetails, setUnitDetails] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [isBottom, setIsBottom] = useState(false);
  const contentRef = useRef(null);
  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const response = await apiClient.get(`/units/${unitId}/details`);
        const unitData = response.data;
        setUnitDetails(unitData);
        if (unitData?.unitAreas?.length > 0) {
          const firstUnitArea = unitData.unitAreas[0];
          if (firstUnitArea.lessons?.length > 0) {
            const firstLesson = firstUnitArea.lessons[0];
            setLessonData(firstLesson);
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
    console.log("AAA");
  }

  const handleMarkRejectLesson = () => {
    console.log("BBB");
  }

  return (
    <div className={cx("censor-learning-material-view-wrapper")}>
      <div className={cx("censor-learning-material-view-container")}>
        <div className={cx("censor-learning-material-view-header")}>
          <div className={cx("header-left")}>
            <div className={cx("view-back")} onClick={() => setIsShowCensorView(false)}>
              <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
            </div>
            <div className={cx("view-title")}>{unitDetails?.title}</div>
          </div>
          {/* <div className={cx("header-censor")}>
            <button className={cx("rejected-btn", "disabled-btn")}>
              <i className={cx("fa-sharp fa-regular fa-ban", "btn-icon")}></i>
              <span className={cx("btn-text")}>Rejected</span>
            </button>
            <button className={cx("approved-btn")}>
              <i className={cx("fa-sharp fa-regular fa-check", "btn-icon")}></i>
              <span className={cx("btn-text")}>Approved</span>
            </button>
          </div> */}
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
          <button className={cx("next-btn", { "disabled-continue-btn": !isBottom })} disabled={!isBottom} onClick={handleContinueLesson}>Continue</button>
        </div>
      </div>
    </div>
  )
}
CensorLearningMaterialView.propTypes = {
  unitId: PropTypes.string,
  setIsShowCensorView: PropTypes.func,
}
export default CensorLearningMaterialView
