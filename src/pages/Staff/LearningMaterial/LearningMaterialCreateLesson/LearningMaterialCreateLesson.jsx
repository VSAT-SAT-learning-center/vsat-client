import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MainContent from "~/components/Staff/LearningMaterialCreate/LessonCreateContent/MainContent";
import NoContent from "~/components/Staff/LearningMaterialCreate/LessonCreateContent/NoContent";
import LessonCreateSidebar from "~/components/Staff/LearningMaterialCreate/LessonCreateSidebar";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { lessonRWContents } from "~/data/Staff/LessonRWContents";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterialCreateLesson.module.scss";

const cx = classNames.bind(styles);
function LearningMaterialCreateLesson() {
  const navigate = useNavigate();
  const currentStep = 2;
  const { id } = useParams();
  const location = useLocation();
  const { newUnit } = location.state || {};

  const [loadTopics, setLoadTopics] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [completedItems, setCompletedItems] = useState([]);

  useEffect(() => {
    if (!newUnit?.id) return;

    const fetchUnitAreas = async () => {
      try {
        const topicsResponse = await apiClient.get(
          `/unit-areas/by-unit/${newUnit.id}`
        );
        setLoadTopics(topicsResponse.data.data);
      } catch (error) {
        console.error("Error fetching unit areas:", error);
      }
    };

    fetchUnitAreas();
  }, [newUnit?.id]);

  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        const lessonResponse = await apiClient.get(`/lessons/${id}`);
        const { id: lessonId, title, type, lessonContents } = lessonResponse.data.data;
        setLesson({
          lessonId: lessonId,
          title,
          type,
          lessonContents,
        });
      } catch (error) {
        console.error("Error fetching lesson information:", error);
      }
    };

    fetchLesson();
  }, [id]);

  const handlePrevious = () => {
    navigate(steps[currentStep - 1].path);
  };
  const handleNext = async () => {
    console.log(lesson);
    try {
      const response = await apiClient.post("/lessons", lesson);
      console.log(response.data.data);
      // navigate(steps[currentStep + 1].path);
    } catch (error) {
      console.error("Error creating lesson:", error);
    }
  };

  const isContinueEnabled = completedItems.length === lessonRWContents.length;

  return (
    <PageLayout>
      <div className={cx("learning-material-create-lessons-container")}>
        <LearningMaterialCreateHeader title="Unit leson" />
        <MultiStepProgressBar steps={steps} currentStep={currentStep} />
        <div className={cx("create-lessons-container")}>
          <div className={cx("create-lessons-top")}>
            <div className={cx("create-lessons-title")}>Unit Lessons</div>
          </div>
          <div className={cx("create-lessons-content")}>
            <div className={cx("create-lessons-sidebar-wrapper")}>
              <LessonCreateSidebar
                newUnit={newUnit}
                topics={loadTopics}
                lessonId={id}
              />
            </div>
            <div className={cx("create-lessons-main-wrapper")}>
              {lesson ? (
                <MainContent
                  lesson={lesson}
                  setLesson={setLesson}
                  completedItems={completedItems}
                  setCompletedItems={setCompletedItems}
                />
              ) : (
                <NoContent />
              )}
            </div>
          </div>
          <div className={cx("create-lessons-bottom")}>
            <button className={cx("back-btn")} onClick={handlePrevious}>
              Back
            </button>
            <button
              className={cx("continue-btn", {
                "disabled-btn": !isContinueEnabled,
              })}
              disabled={!isContinueEnabled}
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}
export default LearningMaterialCreateLesson;
