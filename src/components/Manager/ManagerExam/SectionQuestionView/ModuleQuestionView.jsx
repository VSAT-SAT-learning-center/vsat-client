import classNames from "classnames/bind";
import styles from "./SectionQuestionView.module.scss";
const cx = classNames.bind(styles);
function ModuleQuestionView({
  module,
  setModuleCensorData,
  setIsShowModuleViewCensor,
  censorModuleFeedback,
}) {
  const handleCensorModule = () => {
    setModuleCensorData(module);
    setIsShowModuleViewCensor(true);
  };
  const moduleFeedback = censorModuleFeedback.moduleTypesFeedback.find(
    (feedback) => feedback.moduleTypeId === module.id
  );
  const isRejected = moduleFeedback?.isRejected;
  const isApproved = moduleFeedback && !moduleFeedback.isRejected;
  return (
    <div
      className={cx("module-question-container", {
        "approved-style": isApproved,
        "rejected-style": isRejected,
      })}
    >
      <div className={cx("module-icon")}>
        <i className={cx("fa-regular fa-file-pen")}></i>
      </div>
      <div className={cx("module-infor")}>
        <div className={cx("module-title")}>
          {module?.name} {module?.level ? `(${module?.level})` : ""}
        </div>
        <div className={cx("module-action")}>
          <div className={cx("create-action")}>
            <button className={cx("create-btn")} onClick={handleCensorModule}>
              <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleQuestionView;
