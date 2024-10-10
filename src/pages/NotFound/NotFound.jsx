import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <div className={cx("not-found-container")}>
      <div id={cx("clouds")}>
        <div className={cx("cloud", "x1")}></div>
        <div className={cx("cloud", "x1_5")}></div>
        <div className={cx("cloud", "x2")}></div>
        <div className={cx("cloud", "x3")}></div>
        <div className={cx("cloud", "x4")}></div>
        <div className={cx("cloud", "x5")}></div>
      </div>
      <div className={cx("oops-text")}>OOPSS...</div>
      <div className={cx("number-404")}>
        <span className={cx("four")}>4</span>
        <span className={cx("zero")}>0</span>
        <span className={cx("four")}>4</span>
      </div>
      <div className={cx("page-not-found")}>Page Not Found</div>
      
    </div>
  );
}
export default NotFound;