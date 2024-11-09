import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./ExamCensorView.module.scss";
import ModuleCensorView from "./ModuleCensorView";
import SectionQuestionView from "./SectionQuestionView";
const cx = classNames.bind(styles);
function ExamCensorView({ examCensorData, setIsShowExamCensorView }) {
  const [isShowModuleViewCensor, setIsShowModuleViewCensor] = useState(false);
  const [groupedSections, setGroupedSections] = useState([]);
  const [moduleCensorData, setModuleCensorData] = useState([]);

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

  return (
    <>
      {isShowModuleViewCensor && (
        <ModuleCensorView
          moduleCensorData={moduleCensorData}
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
                <div className={cx("exam-name")}>Exam 1</div>
              </div>
              <div className={cx("exam-structure-container")}>
                <div className={cx("title")}>Exam structure</div>
                <div className={cx("structure-name")}>Exam structure 1</div>
              </div>
              <div className={cx("exam-type-container")}>
                <div className={cx("title")}>Exam type</div>
                <div className={cx("type-name")}>Practical exam</div>
              </div>
            </div>
            <div className={cx("exam-config-wrapper")}>
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
            </div>
            <div className={cx("exam-question-wrapper")}>
              <div className={cx("exam-question-title")}>Exam question</div>
              {groupedSections?.map((section, index) => (
                <SectionQuestionView
                  key={index}
                  section={section}
                  setModuleCensorData={setModuleCensorData}
                  setIsShowModuleViewCensor={setIsShowModuleViewCensor}
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
            <button className={cx("preview-btn")}>
              <span>Continue</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamCensorView;
