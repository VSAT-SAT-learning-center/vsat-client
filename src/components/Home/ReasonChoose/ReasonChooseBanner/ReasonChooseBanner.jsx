import classNames from "classnames/bind";
import PeopleImg from "../../../../assets/images/banner/05.png";
import Icon from "../../../../assets/images/icon/dot-box3.svg";
import styles from "./ReasonChooseBanner.module.scss";
const cx = classNames.bind(styles);

function ReasonChooseBanner() {
  return (
    <div className={cx("reason-choose-banner")}>
      <div className={cx("background-banner")}></div>
      <img src={PeopleImg} alt="people-img" className={cx("people-img")} />
      <div className={cx("feauture", "feature-1")}>
        <div className={cx("feature-icon")}>
          <i className={cx("fa-regular fa-shield-check", "icon")}></i>
        </div>
        <div className={cx("feature-text")}>Safe & Secured</div>
      </div>
      <div className={cx("feauture", "feature-2")}>
        <div className={cx("feature-icon")}>
          <i className={cx("fa-regular fa-book", "icon")}></i>
        </div>
        <div className={cx("feature-text")}>+120 Exams</div>
      </div>
      <div className={cx("feauture", "feature-3")}>
        <div className={cx("feature-icon")}>
          <i className={cx("fa-regular fa-check", "icon")}></i>
        </div>
        <div className={cx("feature-text")}>Quality Education</div>
      </div>
      <img src={Icon} alt="icon" className={cx("img-icon")} />
    </div>
  )
}

export default ReasonChooseBanner
