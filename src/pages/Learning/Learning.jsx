import classNames from "classnames/bind";
import HeaderAuthen from "../../layouts/HeaderAuthen/HeaderAuthen";
import styles from "./Learning.module.scss";
const cx = classNames.bind(styles);
function Learning() {
  return (
    <div className={cx("learning-wrapper")}>
      <HeaderAuthen />
      <div className={cx("learning-container")}>
      </div>
    </div>
  );
}

export default Learning;
