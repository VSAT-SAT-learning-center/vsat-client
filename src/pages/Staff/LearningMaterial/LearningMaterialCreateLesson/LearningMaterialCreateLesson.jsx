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
  const [lessonIds, setLessonIds] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(-1);

  useEffect(() => {
    const fetchUnitAreas = async () => {
      try {
        const topicsResponse = await apiClient.get(
          `/unit-areas/by-unit/${newUnit.id}`
        );
        const topics = topicsResponse.data.data;
        const collectedLessonIds = topics.flatMap((topic) =>
          topic.lessons.map((lesson) => lesson.id)
        );

        setLoadTopics(topics);
        setLessonIds(collectedLessonIds);

        // If there's a lesson ID in the URL, set the current lesson index
        const initialLessonIndex = collectedLessonIds.indexOf(id);
        setCurrentLessonIndex(initialLessonIndex);
      } catch (error) {
        console.error("Error fetching unit areas:", error);
      }
    };

    if (newUnit?.id) {
      fetchUnitAreas();
    }
  }, [newUnit?.id, id]);

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
    try {
      // Call API to save the current lesson
      const response = await apiClient.post("/lessons", lesson);
      console.log("Lesson saved:", response.data.data);

      // Check if there is a next lesson available
      if (currentLessonIndex >= 0 && currentLessonIndex < lessonIds.length - 1) {
        const nextLessonId = lessonIds[currentLessonIndex + 1]; // Get the next lesson ID
        setCurrentLessonIndex(currentLessonIndex + 1); // Update the current lesson index

        // Navigate to the next lesson with the correct path format
        navigate(`/staff/learning-material/create/lessons/${nextLessonId}`);
      } else {
        console.log("No more lessons available.");
      }
    } catch (error) {
      console.error("Error saving lesson:", error);
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
              // disabled={!isContinueEnabled}
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
