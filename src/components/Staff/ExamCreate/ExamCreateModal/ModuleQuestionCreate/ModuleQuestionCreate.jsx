import classNames from "classnames/bind";
import styles from "./ModuleQuestionCreate.module.scss";
const cx = classNames.bind(styles);

function ModuleQuestionCreate({
  examData,
  moduleQuestion,
  setIsShowModalCreateQuestionModal,
  setDomainData,
}) {
  const handleClickCreateDomainQuestion = (domainData) => {
    const data = {
      moduleId: moduleQuestion.id,
      domain: domainData,
    };
    setDomainData(data);
    setIsShowModalCreateQuestionModal(true);
  };
  const getQuestionCount = (domainId) => {
    const module = examData.examQuestions.find(
      (examModule) => examModule.moduleId === moduleQuestion.id
    );
    if (!module) return 0;
    const domain = module.domains.find((d) => d.domain === domainId);
    return domain ? domain.questions.length : 0;
  };
  return (
    <div className={cx("module-question-container")}>
      <div className={cx("module-question-header")}>
        <div className={cx("module-question-title")}>
          <div className={cx("module-icon")}>
            <i className="fa-light fa-file-pen"></i>
          </div>
          <div className={cx("module-title")}>
            {moduleQuestion?.name}{" "}
            {moduleQuestion?.level ? `(${moduleQuestion?.level})` : ""}
          </div>
        </div>
        <div className={cx("module-section")}>{moduleQuestion?.section}</div>
      </div>
      <div className={cx("module-question-content")}>
        {moduleQuestion?.domaindistribution?.map((domain) => (
          <div className={cx("domain-question-container")} key={domain?.id}>
            <div className={cx("domain-icon")}>
              <i className={cx("fa-regular fa-pen-to-square")}></i>
            </div>
            <div className={cx("domain-infor")}>
              <div className={cx("domain-title")}>{domain?.domain}</div>
              <div className={cx("domain-action")}>
                <div className={cx("count-noq")}>
                  {getQuestionCount(domain?.domain)}/{domain?.numberofquestion}
                </div>
                <div className={cx("create-action")}>
                  <button
                    className={cx("create-btn")}
                    onClick={() => handleClickCreateDomainQuestion(domain)}
                  >
                    <i
                      className={cx("fa-regular fa-plus-circle", "create-icon")}
                    ></i>
                    <span className={cx("create-text")}>Question</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className={cx("module-question-footer")}>
        <button className={cx("action-btn", "upload-btn")}>
          <i
            className={cx("fa-light fa-arrow-up-from-bracket", "action-icon")}
          ></i>
          <span className={cx("action-text")}>Upload file</span>
        </button>
        <button className={cx("action-btn", "preview-btn")}>
          <i className={cx("fa-light fa-eye", "action-icon")}></i>
          <span className={cx("action-text")}>Preview</span>
        </button>
      </div> */}
    </div>
  );
}

export default ModuleQuestionCreate;
