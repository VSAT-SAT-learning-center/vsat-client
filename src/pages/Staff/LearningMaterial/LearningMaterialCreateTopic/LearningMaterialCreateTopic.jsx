import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import TopicItem from "~/components/Staff/LearningMaterialCreate/TopicItem";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialCreateTopic.module.scss";
const cx = classNames.bind(styles);
function LearningMaterialCreateTopic() {
  const navigate = useNavigate();
  const currentStep = 1;

  const handlePrevious = () => {
    navigate(steps[currentStep - 1].path);
  };
  const handleNext = () => {
    navigate(steps[currentStep + 1].path);
  };
  return (
    <PageLayout>
      <div className={cx("learning-material-create-topics-container")}>
        <LearningMaterialCreateHeader title="Unit Topic" />
        <MultiStepProgressBar steps={steps} currentStep={currentStep} />
        <div className={cx("create-topics-container")}>
          <div className={cx("create-topics-top")}>
            <div className={cx("create-topics-title")}>Unit Topics</div>
          </div>
          <div className={cx("create-topics-content")}>
            <div className={cx("create-topics-list")}>
              <TopicItem/>
            </div>
          </div>
          <div className={cx("create-topics-bottom")}>
            <button className={cx("back-btn")} onClick={handlePrevious}>
              Back
            </button>
            {/* <button
              className={cx("continue-btn", "disabled-btn")}
              disabled={true}
              onClick={handleNext}
            >
              Continue
            </button> */}
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

export default LearningMaterialCreateTopic;
