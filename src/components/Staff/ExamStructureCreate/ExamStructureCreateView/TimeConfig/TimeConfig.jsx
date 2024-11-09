import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ModuleTimeConfig from "./ModuleTimeConfig";
import styles from "./TimeConfig.module.scss";
const cx = classNames.bind(styles);

function TimeConfig({ examStructureData, setExamStructureData }) {
  const [groupedModules, setGroupedModules] = useState([]);

  useEffect(() => {
    const grouped = examStructureData.moduleType.reduce((acc, module) => {
      const sectionIndex = acc.findIndex(
        (item) => item.section === module.section
      );
      if (sectionIndex >= 0) {
        acc[sectionIndex].modules.push(module);
      } else {
        acc.push({ section: module.section, modules: [module] });
      }
      return acc;
    }, []);
    setGroupedModules(grouped);
  }, [examStructureData.moduleType]);

  return (
    <div className={cx("time-config-wrapper")}>
      <div className={cx("time-config-container")}>
        <div className={cx("time-config-header")}>
          <div className={cx("config-text")}>Time Config</div>
        </div>
        <div className={cx("time-config-content")}>
          <div className={cx("time-setting-content")}>
            <div className={cx("module-title-container")}>
              <div className={cx("module-time-icon")}>
                <i className={cx("fa-light fa-clock")}></i>
              </div>
              <div className={cx("module-time-title")}>Molude time</div>
            </div>
            {groupedModules?.map((module, index) => (
              <ModuleTimeConfig
                key={index}
                module={module}
                setExamStructureData={setExamStructureData}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeConfig;
