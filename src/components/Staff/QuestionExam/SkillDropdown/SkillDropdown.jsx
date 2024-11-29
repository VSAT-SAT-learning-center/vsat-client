import classNames from "classnames/bind";
import styles from "./SkillDropdown.module.scss";
const cx = classNames.bind(styles);

function SkillDropdown() {
  return (
    <div className={cx("dropdowm-container")}>
      <div className={cx("dropdown-item")}>Reading & Writing</div>
      <div className={cx("dropdown-item")}>Reading & Writing</div>
    </div>
  )
}

export default SkillDropdown
