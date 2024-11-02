import classNames from "classnames/bind"
import styles from "./ModuleConfig.module.scss"
const cx = classNames.bind(styles)

function ModuleConfig() {
  return (
    <div className={cx("module-config-wrapper")}>
      <div className={cx("module-config-container")}>
        <div className={cx("module-config-header")}>
          <div className={cx("config-text")}>Module Config</div>
        </div>
        <div className={cx("module-config-content")}></div>
      </div>
    </div>
  )
}

export default ModuleConfig
