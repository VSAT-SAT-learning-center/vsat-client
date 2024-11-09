import classNames from "classnames/bind";
import styles from "./ModuleQuestionView.module.scss";
const cx = classNames.bind(styles);

function ModuleQuestionView({ setIsShowDomainQuestionView }) {
  const handleClickViewDomainQuestion = () => {
    setIsShowDomainQuestionView(true);
  };
  return (
    <div className={cx("module-question-container")}>
      <div className={cx("module-question-header")}>
        <div className={cx("module-question-title")}>
          <div className={cx("module-icon")}>
            <i className="fa-light fa-file-pen"></i>
          </div>
          <div className={cx("module-title")}>Module 1</div>
        </div>
        <div className={cx("module-section")}>Reading & Writing</div>
      </div>
      <div className={cx("module-question-content")}>
        <div className={cx("domain-question-container")}>
          <div className={cx("domain-icon")}>
            <i className={cx("fa-regular fa-pen-to-square")}></i>
          </div>
          <div className={cx("domain-infor")}>
            <div className={cx("domain-title")}>Information and Ideas</div>
            <div className={cx("domain-action")}>
              <div className={cx("count-noq")}>0/8</div>
              <div className={cx("create-action")}>
                <button
                  className={cx("create-btn")}
                  onClick={handleClickViewDomainQuestion}
                >
                  <i
                    className={cx(
                      "fa-regular fa-arrow-up-right-from-square",
                      "create-icon"
                    )}
                  ></i>
                  <span className={cx("create-text")}>View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleQuestionView;
