import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Avatar from "~/assets/images/banner/01.png";
import styles from "./HeaderUserProfile.module.scss";
const cx = classNames.bind(styles);
function HeaderUserProfile() {
  return (
    <div className={cx("user-profile")}>
      <Link to="/profile" className={cx("profile-image")}>
        <img src={Avatar} alt="profile-img" className={cx("image")} />
      </Link>
      <div className={cx("dropdown")}>
        <i className={cx("fa-solid fa-chevron-down", "icon")}></i>
      </div>
    </div>
  );
}

export default HeaderUserProfile;
