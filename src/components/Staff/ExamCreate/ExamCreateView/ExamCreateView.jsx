import classNames from "classnames/bind";
import { useState } from "react";
import DomainQuestionView from "./DomainQuestionView";
import styles from "./ExamCreateView.module.scss";
import ModuleQuestionView from "./ModuleQuestionView";
const cx = classNames.bind(styles);

function ExamCreateView({ exam, setIsShowCreateExamView }) {
  console.log(exam?.examQuestions);

  const [isShowDomainQuestionView, setIsShowDomainQuestionView] =
    useState(false);
  const [questionsViewData, setQuestionsViewData] = useState([]);

  const sectionOrder = ["Reading & Writing", "Math"];
  const moduleOrder = ["Module 1", "Module 2 (Easy)", "Module 2 (Hard)"];

  const sortedQuestions = exam?.examQuestions.sort((a, b) => {
    const sectionComparison =
      sectionOrder.indexOf(a.section) - sectionOrder.indexOf(b.section);
    if (sectionComparison !== 0) {
      return sectionComparison;
    }
    const aModule = a.name + (a.level ? ` (${a.level})` : "");
    const bModule = b.name + (b.level ? ` (${b.level})` : "");

    return moduleOrder.indexOf(aModule) - moduleOrder.indexOf(bModule);
  });

  return (
    <>
      {isShowDomainQuestionView && (
        <DomainQuestionView
          questionsViewData={questionsViewData}
          setIsShowDomainQuestionView={setIsShowDomainQuestionView}
        />
      )}
      <div className={cx("exam-create-view-detail-wrapper")}>
        <div className={cx("exam-create-view-detail-container")}>
          <div className={cx("exam-create-view-detail-header")}>
            <div
              className={cx("create-close")}
              onClick={() => setIsShowCreateExamView(false)}
            >
              <i className={cx("fa-regular fa-arrow-left")}></i>
            </div>
            <div className={cx("create-title")}>View Exam</div>
            <div className={cx("create-empty")}></div>
          </div>
          <div className={cx("exam-create-veiew-detail-content")}>
            <div className={cx("exam-information-container")}>
              <div className={cx("exam-title-container")}>
                <div className={cx("title")}>Exam title</div>
                {/* <div className={cx("title-input-container")}>
                  <input type="text" className={cx("title-input")} />
                </div> */}
                <div className={cx("title-input-container")}>
                  <div className={cx("title-text")}>{exam?.title}</div>
                </div>
              </div>
              <div className={cx("exam-structure-container")}>
                <div className={cx("title")}>Exam structure</div>
                <div className={cx("structure-name")}>
                  {exam?.examStructure?.structurename}
                </div>
              </div>
              <div className={cx("exam-type-container")}>
                <div className={cx("title")}>Exam type</div>
                <div className={cx("type-name")}>{exam?.examType?.name}</div>
              </div>
            </div>
            <div className={cx("exam-desc-container")}>
              <div className={cx("exam-desc-title")}>Exam description</div>
              {/* <div className={cx("exam-desc-input")}>
                <textarea className={cx("desc-input")}></textarea>
              </div> */}
              <div className={cx("exam-desc")}>
                <div className={cx("desc-text")}>{exam?.description}</div>
              </div>
            </div>
            <div className={cx("exam-question-container")}>
              <div className={cx("exam-question-title")}>Exam question</div>
              {sortedQuestions.map((examQuestion) => (
                <ModuleQuestionView
                  key={examQuestion.id}
                  examQuestion={examQuestion}
                  setQuestionsViewData={setQuestionsViewData}
                  setIsShowDomainQuestionView={setIsShowDomainQuestionView}
                />
              ))}
            </div>
          </div>
          <div className={cx("exam-create-veiew-detail-footer")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setIsShowCreateExamView(false)}
            >
              Cancel
            </button>
            {/* <button className={cx("preview-btn")}>
              <span>Save</span>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamCreateView;
