import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MainContent from "~/components/Staff/LearningMaterialCreate/LessonCreateContent/MainContent";
import NoContent from "~/components/Staff/LearningMaterialCreate/LessonCreateContent/NoContent";
import LessonCreateSidebar from "~/components/Staff/LearningMaterialCreate/LessonCreateSidebar";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { lessonMathContents } from "~/data/Staff/LessonMathContents";
import { lessonRWContents } from "~/data/Staff/LessonRWContents";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterialCreateLesson.module.scss";
import Loader from "~/components/General/Loader";

const cx = classNames.bind(styles);
function LearningMaterialCreateLesson() {
  const navigate = useNavigate();
  const currentStep = 2;
  const { unitId, lessonId } = useParams();

  const [loadTopics, setLoadTopics] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [completedItems, setCompletedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lessonIds, setLessonIds] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(-1);
  const [isLessonContentSaved, setIsLessonContentSaved] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUnitAreas = async () => {
      try {
        const topicsResponse = await apiClient.get(
          `/unit-areas/by-unit/${unitId}`
        );
        const topics = topicsResponse.data.data;
        const collectedLessonIds = topics.flatMap((topic) =>
          topic.lessons.map((lesson) => lesson.id)
        );
        setLoadTopics(topics);
        setLessonIds(collectedLessonIds);
        const initialLessonIndex = collectedLessonIds.indexOf(lessonId);
        setCurrentLessonIndex(initialLessonIndex);
      } catch (error) {
        console.error("Error fetching unit areas:", error);
      }
    };

    if (unitId) {
      fetchUnitAreas();
    }
  }, [unitId, lessonId]);

  useEffect(() => {
    if (!lessonId) return;

    const fetchLesson = async () => {
      try {
        const lessonResponse = await apiClient.get(`/lessons/${lessonId}`);
        const {
          id: lessonNewId,
          title,
          type,
          lessonContents,
        } = lessonResponse.data.data;
        setLesson({
          lessonId: lessonNewId,
          title,
          type,
          lessonContents,
        });
        if (lessonContents?.length > 0) {
          const itemsArray = Array.from(
            { length: lessonContents.length },
            (_, i) => i
          );
          setCompletedItems(itemsArray);
          setIsLessonContentSaved(true);
        } else {
          setCompletedItems([]);
          setCurrentIndex(0);
          setIsLessonContentSaved(false);
        }
      } catch (error) {
        console.error("Error fetching lesson information:", error);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleNext = async () => {
    try {
      setLoading(true)
      if (!isLessonContentSaved) {
        const response = await apiClient.post("/lessons", lesson);
        console.log("Lesson contents created:", response.data.data);
        setIsLessonContentSaved(true);
      } else {
        // navigate(`${steps[currentStep + 1].path}/${unitId}/${lessonIds[0]}`);
        navigate(`${steps[currentStep + 1].path}/${unitId}`, {
          state: { lessonId: lessonIds[0] },
        });
      }

      // Move to the next lesson
      if (
        currentLessonIndex >= 0 &&
        currentLessonIndex < lessonIds.length - 1
      ) {
        const nextLessonId = lessonIds[currentLessonIndex + 1];
        setCurrentLessonIndex(currentLessonIndex + 1);
        navigate(
          `/staff/learning-material/create/lessons/${unitId}/${nextLessonId}`
        );
      } else {
        // navigate(`${steps[currentStep + 1].path}/${unitId}/${lessonIds[0]}`);
        navigate(`${steps[currentStep + 1].path}/${unitId}`, {
          state: { lessonId: lessonIds[0] },
        });
      }
    } catch (error) {
      console.error("Error saving lesson:", error);
    } finally {
      setLoading(false)
    }
  };

  const isContinueEnabled =
    completedItems.length === lessonRWContents.length ||
    completedItems.length === lessonMathContents.length;

  return (
    <>
      {loading && <Loader />}
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
                  unitId={unitId}
                  topics={loadTopics}
                  lessonId={lessonId}
                />
              </div>
              <div className={cx("create-lessons-main-wrapper")}>
                {lesson ? (
                  <MainContent
                    lesson={lesson}
                    setLesson={setLesson}
                    completedItems={completedItems}
                    setCompletedItems={setCompletedItems}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                  />
                ) : (
                  <NoContent />
                )}
              </div>
            </div>
            <div className={cx("create-lessons-bottom")}>
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
    </>
  );
}
export default LearningMaterialCreateLesson;
