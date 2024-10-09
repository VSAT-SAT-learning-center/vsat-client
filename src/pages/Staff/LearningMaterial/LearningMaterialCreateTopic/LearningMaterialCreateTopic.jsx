import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
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
      <LearningMaterialCreateHeader title="Unit Topic"/>
      <MultiStepProgressBar steps={steps} currentStep={currentStep} />
      <div className={cx("create-topic-container")}>
        <div>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </PageLayout>
  );
}

export default LearningMaterialCreateTopic;
