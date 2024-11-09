import classNames from "classnames/bind";
import { useState } from "react";
import DomainQuestionView from "./DomainQuestionView";
import styles from "./ExamCreateView.module.scss";
import ModuleQuestionView from "./ModuleQuestionView";
const cx = classNames.bind(styles);

function ExamCreateView({ setIsShowCreateExamView }) {
  const [isShowDomainQuestionView, setIsShowDomainQuestionView] =
    useState(false);
  return (
    <>
      {isShowDomainQuestionView && (
        <DomainQuestionView
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
                <div className={cx("title-input-container")}>
                  <input type="text" className={cx("title-input")} />
                </div>
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
            <div className={cx("exam-desc-container")}>
              <div className={cx("exam-desc-title")}>Exam description</div>
              <div className={cx("exam-desc-input")}>
                <textarea className={cx("desc-input")}></textarea>
              </div>
            </div>
            <div className={cx("exam-question-container")}>
              <div className={cx("exam-question-title")}>Exam question</div>
              <ModuleQuestionView
                setIsShowDomainQuestionView={setIsShowDomainQuestionView}
              />
            </div>
          </div>
          <div className={cx("exam-create-veiew-detail-footer")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setIsShowCreateExamView(false)}
            >
              Cancel
            </button>
            <button className={cx("preview-btn")}>
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamCreateView;
