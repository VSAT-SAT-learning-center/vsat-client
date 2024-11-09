import classNames from "classnames/bind";
import ModuleQuestionView from "./ModuleQuestionView";
import styles from "./SectionQuestionView.module.scss";
const cx = classNames.bind(styles);

function SectionQuestionView({ section, setModuleCensorData, setIsShowModuleViewCensor }) {
  return (
    <div className={cx("section-question-container")}>
      <div className={cx("section-question-header")}>
        <div className={cx("section-question-title")}>
          <div className={cx("section-icon")}>
            <i className="fa-regular fa-book"></i>
          </div>
          <div className={cx("section-title")}>{section?.section}</div>
        </div>
      </div>
      <div className={cx("section-question-content")}>
        {section?.modules?.map((module) => (
          <ModuleQuestionView
            key={module.id}
            module={module}
            setModuleCensorData={setModuleCensorData}
            setIsShowModuleViewCensor={setIsShowModuleViewCensor}
          />
        ))}

      </div>
    </div>
  );
}

export default SectionQuestionView;
