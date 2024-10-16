import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialPublish.module.scss";
const cx = classNames.bind(styles);

function LearningMaterialPublish() {
  const navigate = useNavigate();
  const currentStep = 3;
  const handlePrevious = () => {
    navigate(steps[currentStep - 1].path);
  };
  return (
    <PageLayout>
      <div className={cx("learning-material-publish-container")}>
        <LearningMaterialCreateHeader title="Publish" />
        <MultiStepProgressBar steps={steps} currentStep={currentStep} />
        <div className={cx("publish-container")}>
          
          <div className={cx("publish-bottom")}>
            <button className={cx("back-btn")} onClick={handlePrevious}>
              Back
            </button>
            <button className={cx("publish-btn")}>Publish</button>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default LearningMaterialPublish;
