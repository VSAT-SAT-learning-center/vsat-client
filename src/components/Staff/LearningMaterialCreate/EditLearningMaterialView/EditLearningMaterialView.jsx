import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LearningPartDetailContentMath from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath";
import LearningPartDetailContentRW from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW";
import apiClient from "~/services/apiService";
import EditDeatilView from "./EditDetailView";
import styles from "./EditLearningMaterialView.module.scss";
import LessonViewFeedback from "./LessonViewFeedback";
import ViewSidebar from "./ViewSidebar";
const cx = classNames.bind(styles);

function EditLearningMaterialView({ unitId, setIsShowMaterialView }) {
  const [unitDetails, setUnitDetails] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [showEditDetailView, setShowEditDetailView] = useState(false)
  const [showFeedbackView, setShowFeedbackView] = useState(false)
  const [updatedLessonId, setUpdatedLessonId] = useState([]);
  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const response = await apiClient.get(`/units/staff/${unitId}/details`);
        const unitData = response.data;
        setUnitDetails(unitData);
        const updatedIds = [];
        if (unitData?.unitAreas?.length > 0) {
          unitData.unitAreas.forEach((unitArea) => {
            unitArea.lessons?.forEach((lesson) => {
              if (lesson.status === false) {
                updatedIds.push(lesson.id);
              }
            });
          });

          const firstUnitArea = unitData.unitAreas[0];
          if (firstUnitArea.lessons?.length > 0) {
            setLessonData(firstUnitArea.lessons[0]);
          }
        }
        setUpdatedLessonId(updatedIds);
      } catch (error) {
        console.error("Error fetching unit details:", error);
      }
    };

    fetchUnitDetails();
  }, [unitId]);

  const handleViewEdit = () => {
    setShowEditDetailView(true)
  }

  const handleViewFeedback = () => {
    setShowFeedbackView(true)
  }

  const handleUpdateLesson = async () => {

    try {
      const mapLessonToPayload = {
        lessonId: lessonData.id,
        lessonContents: lessonData.lessonContents.map((content) => ({
          id: content.id,
          title: content.title,
          contentType: content.contentType,
          contents: content.contents || [],
          question: content.question || null,
        })),
      };

      const response = await apiClient.post("/lessons/update", mapLessonToPayload)
      console.log(response.data);
      setUpdatedLessonId((prevIds) =>
        prevIds.filter((id) => id !== lessonData.id)
      );
      toast.success("Update lesson successfully!", {
        autoClose: 1000
      })
    } catch (error) {
      console.error("Error while update lesson:", error)
      toast.error("Update lesson failed!", {
        autoClose: 1000
      })
    }
  }
  return (
    <>
      {showEditDetailView && <EditDeatilView lesson={lessonData} setLessonData={setLessonData} setShowEditDetailView={setShowEditDetailView} />}
      {showFeedbackView && <LessonViewFeedback lesson={lessonData} setShowFeedbackView={setShowFeedbackView} />}
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
            <div className={cx("header-right")}>
              <button className={cx("preview-btn")} onClick={handleViewEdit}>
                <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
              </button>
              <button className={cx("feedback-list-btn")} onClick={handleViewFeedback}>
                <i className={cx("fa-regular fa-clipboard-list")}></i>
              </button>
              {updatedLessonId && updatedLessonId.length > 0 ? (
                <button className={cx("update-lesson-btn")} onClick={handleUpdateLesson}>
                  <i className={cx("fa-regular fa-floppy-disk")}></i>
                </button>
              ) : (
                <button className={cx("update-unit-btn")}>
                  Save
                </button>
              )}
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
            <div className={cx("censor-learning-material-view-content")}>
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
EditLearningMaterialView.propTypes = {
  unitId: PropTypes.string,
  setIsShowMaterialView: PropTypes.func,
};
export default EditLearningMaterialView;
