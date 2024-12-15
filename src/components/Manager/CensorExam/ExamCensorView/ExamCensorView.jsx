import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "~/contexts/AuthContext";
import apiClient from "~/services/apiService";
import styles from "./ExamCensorView.module.scss";
import ModuleCensorView from "./ModuleCensorView";
import SectionQuestionView from "./SectionQuestionView";
const cx = classNames.bind(styles);
function ExamCensorView({ fetchExamList, examCensorData, setIsShowExamCensorView }) {
  const { user } = useContext(AuthContext);
  const [isShowModuleViewCensor, setIsShowModuleViewCensor] = useState(false);
  const [groupedSections, setGroupedSections] = useState([]);
  const [moduleCensorData, setModuleCensorData] = useState([]);
  const [censorModuleFeedback, setCensorModuleFeedback] = useState({
    examId: examCensorData?.id,
    moduleTypesFeedback: [],
  });

  useEffect(() => {
    function groupAndSortExamQuestions(examQuestions) {
      // Step 1: Group by 'section'
      const sectionMap = examQuestions.reduce((acc, question) => {
        if (!acc[question.section]) {
          acc[question.section] = {
            section: question.section,
            modules: [],
          };
        }
        acc[question.section].modules.push(question);
        return acc;
      }, {});

      // Step 2: Convert map to array and sort each section's modules
      const groupedArray = Object.values(sectionMap).map((sectionData) => {
        sectionData.modules.sort((a, b) => {
          const moduleComparison = a.name.localeCompare(b.name);
          if (moduleComparison !== 0) return moduleComparison;

          if (a.level && b.level) {
            return a.level.localeCompare(b.level);
          }

          return 0;
        });
        return sectionData;
      });

      // Step 3: Sort sections, placing "Reading & Writing" first
      groupedArray.sort((a, b) => {
        if (a.section === "Reading & Writing") return -1;
        if (b.section === "Reading & Writing") return 1;
        return a.section.localeCompare(b.section);
      });

      return groupedArray;
    }

    const sortedData = groupAndSortExamQuestions(examCensorData.examQuestions);
    setGroupedSections(sortedData);
  }, [examCensorData.examQuestions]);

  const areAllModulesApproved = () => {
    return (
      censorModuleFeedback.moduleTypesFeedback.length ===
      examCensorData.examQuestions.length &&
      censorModuleFeedback.moduleTypesFeedback.every(
        (feedback) =>
          feedback.isRejected === false || feedback.isRejected === undefined
      )
    );
  };

  const isAnyModuleRejected = () => {
    return censorModuleFeedback.moduleTypesFeedback.some(
      (feedback) => feedback.isRejected === true
    );
  };

  const isAllModulesCensored = () => {
    return examCensorData.examQuestions.every((module) =>
      censorModuleFeedback.moduleTypesFeedback.some(
        (feedback) => feedback.moduleTypeId === module.id
      )
    );
  };

  const handleApprove = async () => {
    const feedbackData = {
      examFeedback: censorModuleFeedback,
      accountFromId: user?.id,
      accountToId: examCensorData?.account.id,
    };
    try {
      await apiClient.post(
        `/exams/censor/approve`,
        feedbackData
      );
      fetchExamList()
      setIsShowExamCensorView(false);
      toast.success("Censor approved exam successfully!", {
        autoClose: 1500
      })
    } catch (error) {
      console.error("Error approving exam:", error);
      toast.error("Censor approval exam failed!", {
        autoClose: 1500
      })
    }
  };

  const handleReject = async () => {
    const feedbackData = {
      examFeedback: censorModuleFeedback,
      accountFromId: user?.id,
      accountToId: examCensorData?.account.id,
    };
    try {
      await apiClient.post(
        `/exams/censor/reject`,
        feedbackData
      );
      fetchExamList()
      setIsShowExamCensorView(false);
      toast.success("Censor rejected the exam successfully!", {
        autoClose: 1000
      })
    } catch (error) {
      console.error("Error reject exam:", error);
      toast.error("Censor reject exam failed!", {
        autoClose: 1000
      })
    }
  };
  return (
    <>
      {isShowModuleViewCensor && (
        <ModuleCensorView
          moduleCensorData={moduleCensorData}
          setCensorModuleFeedback={setCensorModuleFeedback}
          setIsShowModuleViewCensor={setIsShowModuleViewCensor}
        />
      )}
      <div className={cx("exam-censor-view-wrapper")}>
        <div className={cx("exam-censor-view-container")}>
          <div className={cx("exam-censor-view-header")}>
            <div
              className={cx("create-close")}
              onClick={() => setIsShowExamCensorView(false)}
            >
              <i className={cx("fa-regular fa-arrow-left")}></i>
            </div>
            <div className={cx("create-title")}>Censor Exam</div>
            <div className={cx("create-empty")}></div>
          </div>
          <div className={cx("exam-censor-view-content")}>
            <div className={cx("exam-information-container")}>
              <div className={cx("exam-title-container")}>
                <div className={cx("title")}>Exam title</div>
                <div className={cx("exam-name")}>{examCensorData?.title}</div>
              </div>
              <div className={cx("exam-structure-container")}>
                <div className={cx("title")}>Exam structure</div>
                <div className={cx("structure-name")}>{examCensorData?.description}</div>
              </div>
              <div className={cx("exam-type-container")}>
                <div className={cx("title")}>Exam type</div>
                <div className={cx("type-name")}>{examCensorData?.examType?.name}</div>
              </div>
            </div>
            {/* <div className={cx("exam-config-wrapper")}>
              <div className={cx("exam-config-container")}>
                <div className={cx("exam-config-select")}>
                  <div className={cx("type-config")}>
                    Exam Question Distribution
                  </div>
                  <div className={cx("config-content")}>
                    <div className={cx("name-config")}>
                      <div className={cx("name")}>Exam structure 1</div>
                    </div>
                    <button className={cx("view-config")}>
                      <i
                        className={cx(
                          "fa-regular fa-arrow-up-right-from-square"
                        )}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className={cx("exam-config-container")}>
                <div className={cx("exam-config-select")}>
                  <div className={cx("type-config")}>
                    Exam Score Distribution
                  </div>
                  <div className={cx("config-content")}>
                    <div className={cx("name-config")}>
                      <div className={cx("name")}>Exam score 1</div>
                    </div>
                    <button className={cx("view-config")}>
                      <i
                        className={cx(
                          "fa-regular fa-arrow-up-right-from-square"
                        )}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            <div className={cx("exam-question-wrapper")}>
              <div className={cx("exam-question-title")}>Exam question</div>
              {groupedSections?.map((section, index) => (
                <SectionQuestionView
                  key={index}
                  section={section}
                  setModuleCensorData={setModuleCensorData}
                  setIsShowModuleViewCensor={setIsShowModuleViewCensor}
                  censorModuleFeedback={censorModuleFeedback}
                />
              ))}
            </div>
          </div>
          <div className={cx("exam-censor-view-footer")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setIsShowExamCensorView(false)}
            >
              Cancel
            </button>
            <button
              className={cx("preview-btn", {
                "approve-btn": areAllModulesApproved(),
                "reject-btn": isAnyModuleRejected(),
                "disabled-btn": !isAllModulesCensored(),
              })}
              disabled={!isAllModulesCensored()}
              onClick={
                areAllModulesApproved()
                  ? handleApprove
                  : isAnyModuleRejected()
                    ? handleReject
                    : undefined
              }
            >
              <span>
                {areAllModulesApproved()
                  ? "Approve"
                  : isAnyModuleRejected()
                    ? "Reject"
                    : "Approve"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamCensorView;
