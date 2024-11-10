import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialCreateAss.module.scss";
const cx = classNames.bind(styles);

function LearningMaterialCreateAss() {
  const currentStep = 4;
  return (
    <PageLayout>
      <div className={cx("learning-material-ass-container")}>
        <LearningMaterialCreateHeader title="Publish" />
        <MultiStepProgressBar steps={steps} currentStep={currentStep} />
        <div className={cx("ass-container")}>
          
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default LearningMaterialCreateAss;
