import classNames from "classnames/bind";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "~/components/General/Loader";
import apiClient from "~/services/apiService";
import { calculateDomainQuestions } from "~/utils/caculateQuestionsV2";
import styles from "./ExamStructureCreateView.module.scss";
import ModuleConfig from "./ModuleConfig";
import OverviewConfig from "./OverviewConfig";
import SectionConfig from "./SectionConfig";
import StepProgressBar from "./StepProgressBar";
import StructureConfig from "./StructureConfig";
import TimeConfig from "./TimeConfig";
const cx = classNames.bind(styles);

function ExamStructureCreateView({
  setIsShowExamStructureCreateView,
  fetchExamStructureList,
}) {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Structure Config",
    "Section Config",
    "Module Config",
    "Time Config",
    "Overview Config",
  ];
  const [examStructureData, setExamStructureData] = useState({
    structurename: "",
    description: "",
    examStructureType: "",
    examScoreId: "",
    examSemesterId: "",
    requiredCorrectInModule1RW: 0,
    requiredCorrectInModule1M: 0,
    examStructureConfig: [],
    moduleType: [],
  });
  const [domainDistributionConfigs, setDomainDistributionConfigs] = useState(
    []
  );
  const [totalRWQuestion, setTotalRWQuestion] = useState(0);
  const [totalMathQuestion, setTotalMathQuestion] = useState(0);
  const [totalRWQuestions, setTotalRWQuestions] = useState(0);
  const [totalMathQuestions, setTotalMathQuestions] = useState(0);
  const [sectionRWConfigData, setSectionRWConfigData] = useState([]);
  const [sectionMathConfigData, setSectionMathConfigData] = useState([]);
  const [viewDetailDistributioinData, setViewDetailDistributioinData] =
    useState([]);
  const [examScorePick, setExamScorePick] = useState("");
  const [distributionQuestionPick, setDistributionQuestionPick] = useState("");
  const nextStep = () => {
    const isStructureConfigStep = steps[currentStep] === "Structure Config";
    const isSectionConfigStep = steps[currentStep] === "Section Config";
    const isModuleConfigStep = steps[currentStep] === "Module Config";
    const requiredFields = [
      { key: "structurename", label: "Exam Structure Name" },
      { key: "description", label: "Exam Structure Description" },
      { key: "examStructureType", label: "Exam Structure Type" },
      { key: "examScoreId", label: "Exam Structure Score" },
      { key: "examSemesterId", label: "Exam Question Distribution" },
    ];
    if (isStructureConfigStep) {
      let hasError = false;
      requiredFields.forEach((field) => {
        if (!examStructureData || !examStructureData[field.key]) {
          toast.error(`${field.label} is required.`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          hasError = true;
        }
      });

      if (
        examStructureData.examStructureType === "Adaptive" &&
        (examStructureData.requiredCorrectInModule1RW === 0 ||
          examStructureData.requiredCorrectInModule1M === 0)
      ) {
        toast.error(
          "Module 1 correct answers for R&W and Math are required for Adaptive exams.",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        hasError = true;
      }

      if (hasError) {
        return;
      }
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
      let hasError = false;

      if (totalRWQuestions !== totalRWQuestion) {
        toast.error(
          `Reading & Writing total questions should be ${totalRWQuestion}, but you have ${totalRWQuestions}.`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        hasError = true;
      }

      if (totalMathQuestions !== totalMathQuestion) {
        toast.error(
          `Math total questions should be ${totalMathQuestion}, but you have ${totalMathQuestions}.`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        hasError = true;
      }

      if (hasError) {
        return;
      }
      const examStructureConfig = sectionRWConfigData
        .concat(sectionMathConfigData)
        .map((item) => ({
          domain: item.domain,
          numberOfQuestion: item.questions,
        }));

      setExamStructureData((prev) => ({
        ...prev,
        examStructureConfig: examStructureConfig,
      }));
    }

    if (isModuleConfigStep) {
      let hasRWError = false;
      let hasMathError = false;

      examStructureData.moduleType.forEach((module) => {
        if (
          module.section === "Reading & Writing" &&
          module.numberOfQuestion !== totalRWQuestion / 2
        ) {
          hasRWError = true;
        } else if (
          module.section === "Math" &&
          module.numberOfQuestion !== totalMathQuestion / 2
        ) {
          hasMathError = true;
        }
      });

      if (hasRWError) {
        toast.error(
          `Each module in Reading & Writing must have ${
            totalRWQuestion / 2
          } questions.`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }

      if (hasMathError) {
        toast.error(
          `Each module in Math must have ${totalMathQuestion / 2} questions.`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }

      // Prevent navigation if there are any errors
      if (hasRWError || hasMathError) return;
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

  const handleFinish = async () => {
    console.log(examStructureData);
    setLoading(true);
    try {
      await apiClient.post("/exam-structures", examStructureData);
      toast.success("Exam Structure created successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchExamStructureList();
      setIsShowExamStructureCreateView(false);
    } catch (error) {
      console.error("Error while creating exam structure:", error);
      toast.error("Failed to create exam structure. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTotalQuestionsChange = (rwTotal, mathTotal) => {
    setTotalRWQuestions(rwTotal);
    setTotalMathQuestions(mathTotal);
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
            setViewDetailDistributioinData={setViewDetailDistributioinData}
            setExamScorePick={setExamScorePick}
            setDistributionQuestionPick={setDistributionQuestionPick}
          />
        );
      case "Section Config":
        return (
          <SectionConfig
            sectionRWConfigData={sectionRWConfigData}
            setSectionRWConfigData={setSectionRWConfigData}
            sectionMathConfigData={sectionMathConfigData}
            setSectionMathConfigData={setSectionMathConfigData}
            onTotalQuestionsChange={handleTotalQuestionsChange}
            viewDetailDistributioinData={viewDetailDistributioinData}
          />
        );
      case "Module Config":
        return (
          <ModuleConfig
            examStructureData={examStructureData}
            setExamStructureData={setExamStructureData}
            domainDistributionConfigs={domainDistributionConfigs}
          />
        );
      case "Time Config":
        return (
          <TimeConfig
            examStructureData={examStructureData}
            setExamStructureData={setExamStructureData}
          />
        );
      case "Overview Config":
        return (
          <OverviewConfig
            examStructureData={examStructureData}
            examScorePick={examScorePick}
            distributionQuestionPick={distributionQuestionPick}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      {loading && <Loader />}
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
                className={cx("back-btn", {
                  "disabled-btn": currentStep === 0,
                })}
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
    </>
  );
}

export default ExamStructureCreateView;
