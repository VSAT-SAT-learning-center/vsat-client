import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import LearningPartDetailContentMath from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath";
import LearningPartDetailContentRW from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterialView.module.scss";
import ViewSidebar from "./ViewSidebar";
const cx = classNames.bind(styles);

function LearningMaterialView({ unitId, setIsShowMaterialView }) {
  const [unitDetails, setUnitDetails] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const response = await apiClient.get(`/units/${unitId}/details`);
        const unitData = response.data;
        setUnitDetails(unitData);
        if (unitData?.unitAreas?.length > 0) {
          const firstUnitArea = unitData.unitAreas[0];
          if (firstUnitArea.lessons?.length > 0) {
            setLessonData(firstUnitArea.lessons[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching unit details:", error);
      }
    };

    fetchUnitDetails();
  }, [unitId]);
  return (
    <>
      <div className={cx("censor-learning-material-view-wrapper")}>
        <div className={cx("censor-learning-material-view-container")}>
          <div className={cx("censor-learning-material-view-header")}>
            <div className={cx("header-left")}>
              <div
                className={cx("view-back")}
                onClick={() => setIsShowMaterialView(false)}
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
                      <ViewSidebar
                        key={unitArea.id}
                        unitArea={unitArea}
                        lessonData={lessonData}
                        setLessonData={setLessonData}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div
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
        </div>
      </div>
    </>
  );
}
LearningMaterialView.propTypes = {
  unitId: PropTypes.string,
  setIsShowMaterialView: PropTypes.func,
};
export default LearningMaterialView;
