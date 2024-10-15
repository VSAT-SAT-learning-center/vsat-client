import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
// import NoContent from "~/components/Staff/LearningMaterialCreate/LessonCreateContent/NoContent";
import MainContent from "~/components/Staff/LearningMaterialCreate/LessonCreateContent/MainContent";
import LessonCreateSidebar from "~/components/Staff/LearningMaterialCreate/LessonCreateSidebar";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialCreateLesson.module.scss";
const cx = classNames.bind(styles);
function LearningMaterialCreateLesson() {
  const navigate = useNavigate();
  const currentStep = 2;
  const handlePrevious = () => {
    navigate(steps[currentStep - 1].path);
  };
  const handleNext = () => {
    navigate(steps[currentStep + 1].path);
  };

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
              <LessonCreateSidebar />
            </div>
            <div className={cx("create-lessons-main-wrapper")}>
              {/* <NoContent /> */}
              <MainContent/>
            </div>
          </div>
          <div className={cx("create-lessons-bottom")}>
            <button className={cx("back-btn")} onClick={handlePrevious}>
              Back
            </button>
            <button className={cx("continue-btn")} onClick={handleNext}>
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
