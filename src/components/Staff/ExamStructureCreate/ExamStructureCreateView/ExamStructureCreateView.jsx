import classNames from "classnames/bind";
import { useState } from "react";
import { calculateDomainQuestions } from "~/utils/caculateQuestionsV2";
import styles from "./ExamStructureCreateView.module.scss";
import ModuleConfig from "./ModuleConfig";
import OverviewConfig from "./OverviewConfig";
import SectionConfig from "./SectionConfig";
import StepProgressBar from "./StepProgressBar";
import StructureConfig from "./StructureConfig";
const cx = classNames.bind(styles);

function ExamStructureCreateView({ setIsShowExamStructureCreateView }) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Structure Config",
    "Section Config",
    "Module Config",
    "Overview Config",
  ];
  const [examStructureData, setExamStructureData] = useState(null);
  const [domainDistributionConfigs, setDomainDistributionConfigs] = useState(
    []
  );
  const [totalRWQuestion, setTotalRWQuestion] = useState(0);
  const [totalMathQuestion, setTotalMathQuestion] = useState(0);
  const [sectionRWConfigData, setSectionRWConfigData] = useState([]);
  const [sectionMathConfigData, setSectionMathConfigData] = useState([]);

  const nextStep = () => {
    const isStructureConfigStep = steps[currentStep] === "Structure Config";
    const isSectionConfigStep = steps[currentStep] === "Section Config";

    if (isStructureConfigStep) {
      const readingWritingDomains = domainDistributionConfigs
        .filter((domain) => domain.section.name === "Reading & Writing")
        .map(({ domain, percentage, minQuestion, maxQuestion }) => ({
          domain,
          percentage,
          minQuestion,
          maxQuestion,
        }));

      const mathDomains = domainDistributionConfigs
        .filter((domain) => domain.section.name === "Math")
        .map(({ domain, percentage, minQuestion, maxQuestion }) => ({
          domain,
          percentage,
          minQuestion,
          maxQuestion,
        }));
      const rwQuestions = calculateDomainQuestions(
        readingWritingDomains,
        totalRWQuestion
      );
      setSectionRWConfigData(rwQuestions);

      const mathQuestions = calculateDomainQuestions(
        mathDomains,
        totalMathQuestion
      );
      setSectionMathConfigData(mathQuestions);
    }

    if (isSectionConfigStep) {
      console.log(sectionRWConfigData);
      console.log(sectionMathConfigData);
      // console.log(domainDistributionConfigs);
    }

    currentStep < steps.length - 1
      ? setCurrentStep(currentStep + 1)
      : handleFinish();
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    console.log(examStructureData);
    setIsShowExamStructureCreateView(false);
  };

  const renderStepContent = () => {
    switch (steps[currentStep]) {
      case "Structure Config":
        return (
          <StructureConfig
            examStructureData={examStructureData}
            setExamStructureData={setExamStructureData}
            setDomainDistributionConfigs={setDomainDistributionConfigs}
            setTotalRWQuestion={setTotalRWQuestion}
            setTotalMathQuestion={setTotalMathQuestion}
          />
        );
      case "Section Config":
        return (
          <SectionConfig
            sectionRWConfigData={sectionRWConfigData}
            setSectionRWConfigData={setSectionRWConfigData}
            sectionMathConfigData={sectionMathConfigData}
            setSectionMathConfigData={setSectionMathConfigData}
          />
        );
      case "Module Config":
        return <ModuleConfig />;
      case "Overview Config":
        return <OverviewConfig />;
      default:
        return null;
    }
  };
  return (
    <div className={cx("exam-structure-create-view-wrapper")}>
      <div className={cx("exam-structure-create-view-container")}>
        <div className={cx("exam-structure-create-view-header")}>
          <div
            className={cx("structure-close")}
            onClick={() => setIsShowExamStructureCreateView(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("structure-title")}>Create Exam Structure</div>
          <div className={cx("structure-empty")}></div>
        </div>
        <div className={cx("exam-structure-create-view-content")}>
          <div className={cx("progress-bar-container")}>
            <StepProgressBar steps={steps} currentStep={currentStep} />
          </div>
          <div className={cx("exam-structure-content-container")}>
            {renderStepContent()}
          </div>
          <div className={cx("exam-structure-content-action")}>
            <button
              className={cx("back-btn", { "disabled-btn": currentStep === 0 })}
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button className={cx("continue-btn")} onClick={nextStep}>
              {currentStep === steps.length - 1 ? "Finish" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamStructureCreateView;
