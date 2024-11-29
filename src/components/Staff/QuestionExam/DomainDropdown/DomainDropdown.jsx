import classNames from "classnames/bind";
import styles from "./DomainDropdown.module.scss";
const cx = classNames.bind(styles);

function DomainDropdown() {
  return (
    <div className={cx("dropdowm-container")}>
      <div className={cx("dropdown-item")}>Reading & Writing</div>
      <div className={cx("dropdown-item")}>Reading & Writing</div>
    </div>
  )
}

export default DomainDropdown
