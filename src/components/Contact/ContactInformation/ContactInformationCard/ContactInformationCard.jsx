import classNames from "classnames/bind";
import styles from "./ContactInformationCard.module.scss";
const cx = classNames.bind(styles);

const ContactInformationCard = () => {
  return (
    <div className={cx("contact-section")}>
      <div className={cx("contact-card", "blue-card")}>
        <div className={cx("icon", "blue")}>
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div className={cx("contact-info-wrapper")}>
          <div className={cx("contact-info")}>
            Lô E2a-7, Đường D1, Phường Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành
            Phố Hồ Chí Minh
          </div>
        </div>
      </div>

      <div className={cx("contact-card", "yellow-card")}>
        <div className={cx("icon", "yellow")}>
          <i className="fas fa-phone"></i>
        </div>
        <div className={cx("contact-info-wrapper")}>
          <div className={cx("contact-info")}>0929 147 349</div>
        </div>
      </div>

      <div className={cx("contact-card", "red-card")}>
        <div className={cx("icon", "red")}>
          <i className="fas fa-envelope"></i>
        </div>
        <div className={cx("contact-info-wrapper")}>
          <div className={cx("contact-info")}>
            vsat.center.official@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationCard;
