import classNames from "classnames/bind";
import styles from "./OverviewConfig.module.scss";
const cx = classNames.bind(styles);

function OverviewConfig() {
  return (
    <div className={cx("overview-config-wrapper")}>
      <div className={cx("overview-config-container")}>
        <div className={cx("overview-config-header")}>
          <div className={cx("config-text")}>Overview Config</div>
        </div>
        <div className={cx("overview-config-content")}></div>
      </div>
    </div>
  );
}

export default OverviewConfig;
