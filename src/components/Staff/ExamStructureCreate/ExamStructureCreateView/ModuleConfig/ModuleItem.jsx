import classNames from "classnames/bind";
import styles from "./ModuleConfig.module.scss";
const cx = classNames.bind(styles);

const ModuleItem = ({ title, level, onClick }) => {

  return (
    <div className={cx("module-item-container")}>
      <div className={cx("module-infor")}>
        <div className={cx("module-icon")}>
          <i className="fa-regular fa-file-pen"></i>
        </div>
        <div className={cx("module-title")}>
          {title} {level ? `(${level})` : ""}
        </div>
      </div>
      <button className={cx("module-config-action")} onClick={onClick}>
        <i className={cx("fa-regular fa-pen-to-square", "icon")}></i>
      </button>
    </div>
  );
};

export default ModuleItem;
