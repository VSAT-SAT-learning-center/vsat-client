import classNames from "classnames/bind";
import styles from "./ModuleConfig.module.scss";
const cx = classNames.bind(styles);

function ModuleConfig({ structureModule }) {
  const handleChangeTimeModule = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value > 60) value = 60;
    if (value < 0) value = 0;
    e.target.value = value;
  };
  return (
    <div className={cx("module-section-config-container")}>
      <div className={cx("module-section-config-header")}>
        <div className={cx("section-icon")}>
          <i className={cx("fa-regular fa-book", "icon")}></i>
        </div>
        <div className={cx("section-infor")}>
          <div className={cx("section-name")}>{structureModule.section}</div>
          <div className={cx("section-total-time")}>90</div>
        </div>
      </div>
      <div className={cx("module-section-config-content")}>
        {structureModule.modules.map((module) => (
          <div className={cx("module-config-time-container")} key={module.id}>
            <div className={cx("module-config-time")}>
              <div className={cx("module-config")}>
                <div className={cx("module-icon")}>
                  <i className="fa-light fa-file-pen"></i>
                </div>
                <div className={cx("module-infor")}>
                  {module.name} {module.level ? `(${module.level})` : ""}
                </div>
              </div>
              <div className={cx("time-config")}>
                <input
                  type="number"
                  min="0"
                  max="60"
                  placeholder="mins"
                  className={cx("time-input")}
                  onChange={handleChangeTimeModule}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModuleConfig;
