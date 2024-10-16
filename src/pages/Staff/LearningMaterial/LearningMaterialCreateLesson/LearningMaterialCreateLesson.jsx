import classNames from "classnames/bind";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import NoContent from "~/components/Staff/LearningMaterialCreate/LessonCreateContent/NoContent";
import { useEffect, useState } from "react";
import MainContent from "~/components/Staff/LearningMaterialCreate/LessonCreateContent/MainContent";
import LessonCreateSidebar from "~/components/Staff/LearningMaterialCreate/LessonCreateSidebar";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { lessonRWContents } from "~/data/Staff/LessonRWContents";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialCreateLesson.module.scss";

const cx = classNames.bind(styles);
function LearningMaterialCreateLesson() {
  const navigate = useNavigate();
  const currentStep = 2;
  const { id } = useParams();
  const location = useLocation();
  const { topics } = location.state || {};
  const [lesson, setLesson] = useState({
    lessonId: "",
    lessonTitle: "",
    lessonContent: [],
  });
  const [completedItems, setCompletedItems] = useState([]);
  const [filteredLesson, setFilteredLesson] = useState(null);

  useEffect(() => {
    setLesson((prevLesson) => ({
      ...prevLesson,
      lessonId: id, 
    }));
    const lessonMatch = topics
      ?.flatMap((topic) => topic.lessons)
      .find((lesson) => lesson.id === id);

    if (lessonMatch) {
      console.log(lessonMatch);
      setFilteredLesson(lessonMatch);
    }
  }, [id, topics]);
  const handlePrevious = () => {
    navigate(steps[currentStep - 1].path);
  };
  const handleNext = () => {
    console.log(lesson);
    // navigate(steps[currentStep + 1].path);
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
              <LessonCreateSidebar topics={topics} lessonId={id}/>
            </div>
            <div className={cx("create-lessons-main-wrapper")}>
              {filteredLesson ? (
                <MainContent
                  lesson={filteredLesson}
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
