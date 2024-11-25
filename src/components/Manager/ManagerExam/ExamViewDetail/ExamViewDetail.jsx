import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ModuleCensorView from "~/components/Manager/ManagerExam/ModuleCensorView";
import SectionQuestionView from "~/components/Manager/ManagerExam/SectionQuestionView";
import styles from "./ExamViewDetail.module.scss";
const cx = classNames.bind(styles);

function ExamViewDetail({ examCensorData, setIsShowExamCensorView }) {
  console.log(examCensorData);

  const [isShowModuleViewCensor, setIsShowModuleViewCensor] = useState(false);
  const [groupedSections, setGroupedSections] = useState([]);
  const [moduleCensorData, setModuleCensorData] = useState([]);
  const [censorModuleFeedback, setCensorModuleFeedback] = useState({
    examId: examCensorData?.id,
    moduleTypesFeedback: [],
  });

  useEffect(() => {
    function groupAndSortExamQuestions(examQuestions) {
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

  return (
    <>
      {isShowModuleViewCensor && (
        <ModuleCensorView
          moduleCensorData={moduleCensorData}
          setCensorModuleFeedback={setCensorModuleFeedback}
          setIsShowModuleViewCensor={setIsShowModuleViewCensor}
        />
      )}
      <div className={cx("exam-view-detail-wrapper")}>
        <div className={cx("exam-view-detail-container")}>
          <div className={cx("exam-view-detail-header")}>
            <div
              className={cx("create-close")}
              onClick={() => setIsShowExamCensorView(false)}
            >
              <i className={cx("fa-regular fa-arrow-left")}></i>
            </div>
            <div className={cx("create-title")}>Exam Detail</div>
            <div className={cx("create-empty")}></div>
          </div>
          <div className={cx("exam-view-detail-content")}>
            <div className={cx("exam-information-container")}>
              <div className={cx("exam-title-container")}>
                <div className={cx("title")}>Exam title</div>
                <div className={cx("exam-name")}>{examCensorData?.title}</div>
              </div>
              <div className={cx("exam-structure-container")}>
                <div className={cx("title")}>Exam structure</div>
                <div className={cx("structure-name")}>{examCensorData?.examStructure.structurename}</div>
              </div>
              <div className={cx("exam-type-container")}>
                <div className={cx("title")}>Exam type</div>
                <div className={cx("type-name")}>{examCensorData?.examType.name}</div>
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
          <div className={cx("exam-view-footer")}>

          </div>
        </div>
      </div>
    </>
  );
}

export default ExamViewDetail;
