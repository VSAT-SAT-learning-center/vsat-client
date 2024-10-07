import classNames from "classnames/bind";
import Icon_box from "~/assets/images/icon/dot-box-2.svg";
import Icon_fly from "~/assets/images/icon/dot-plan-1.svg";
import styles from "./BannerAboutInformation.module.scss";
const cx = classNames.bind(styles);

function BannerAboutInformation() {
  return (
    <div className={cx("about-banner-information")}>
      <img src={Icon_box} alt="icon" className={cx("about-icon-info")} />
      <div className={cx("about-infor-highlight")}>About Us</div>
      <div className={cx("about-infor-title")}>
        Provides each learner with an efficient and personalized path to success
        on the SAT.
      </div>
      <div className={cx("about-infor-desc")}>
        Our platform has been recognized for its innovative use of radar
        chart-based assessments, providing real-time insights into students’
        strengths and weaknesses, helping them target specific areas for
        improvement
      </div>
      <div className={cx("about-infor-desc")}>
        Our growth has also been bolstered by strategic partnerships with
        educational institutions and SAT prep experts, further enhancing the
        credibility and effectiveness of the platform.
      </div>
      <img src={Icon_fly} alt="icon" className={cx("about-icon-info-bottom")} />
    </div>
  );
}

export default BannerAboutInformation;
