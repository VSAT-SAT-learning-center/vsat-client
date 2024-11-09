import classNames from "classnames/bind";
import styles from "./ModuleTimeConfig.module.scss";
const cx = classNames.bind(styles);

function ModuleTimeConfig({ module, setExamStructureData }) {
  const handleChangeTimeModule = (e, moduleData) => {
    let value = parseInt(e.target.value, 10);

    // Limit the value based on section type
    if (module.section === "Math" && value > 35) {
      value = 35;
    } else if (module.section === "Reading & Writing" && value > 32) {
      value = 32;
    }

    // Ensure non-negative value
    if (value < 0) value = 0;

    // Update the input display
    e.target.value = value;

    // Update the exam structure data with the new time
    setExamStructureData((prevData) => {
      const updatedModuleType = prevData.moduleType.map((mod) => {
        if (
          mod.section === module.section &&
          mod.name === moduleData.name &&
          mod.level === moduleData.level
        ) {
          // Update the `time` property for the matched module
          return { ...mod, time: value };
        }
        return mod;
      });

      return {
        ...prevData,
        moduleType: updatedModuleType,
      };
    });
  };

  return (
    <div className={cx("module-section-config-container")}>
      <div className={cx("module-section-config-header")}>
        <div className={cx("section-icon")}>
          <i className={cx("fa-regular fa-book", "icon")}></i>
        </div>
        <div className={cx("section-infor")}>
          <div className={cx("section-name")}>{module?.section}</div>
        </div>
      </div>
      <div className={cx("module-section-config-content")}>
        {module?.modules?.map((item, index) => (
          <div className={cx("module-config-time-container")} key={index}>
            <div className={cx("module-config-time")}>
              <div className={cx("module-config")}>
                <div className={cx("module-icon")}>
                  <i className="fa-light fa-file-pen"></i>
                </div>
                <div className={cx("module-infor")}>
                  {item?.name} {item?.level ? `(${item?.level})` : ""}
                </div>
              </div>
              <div className={cx("time-config")}>
                <input
                  type="number"
                  min="0"
                  max="60"
                  placeholder="mins"
                  className={cx("time-input")}
                  value={item.time || ""}
                  onChange={(e) => handleChangeTimeModule(e, item)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModuleTimeConfig;
