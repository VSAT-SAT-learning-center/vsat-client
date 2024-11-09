import classNames from "classnames/bind";
import styles from "./SectionQuestionView.module.scss";
const cx = classNames.bind(styles);
function ModuleQuestionView({
  module,
  setModuleCensorData,
  setIsShowModuleViewCensor,
}) {
  const handleCensorModule = () => {
    setModuleCensorData(module);
    setIsShowModuleViewCensor(true);
  };
  return (
    <div className={cx("module-question-container")}>
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
              <i className={cx("fa-light fa-eye", "create-icon")}></i>
              <span className={cx("create-text")}>Censor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleQuestionView;
