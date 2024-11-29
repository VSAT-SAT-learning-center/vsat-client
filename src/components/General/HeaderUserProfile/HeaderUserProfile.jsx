import classNames from "classnames/bind";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "~/contexts/AuthContext";
import styles from "./HeaderUserProfile.module.scss";
const cx = classNames.bind(styles);
function HeaderUserProfile({ showAccountSetting, setShowAccountSetting }) {
  const { user } = useContext(AuthContext);
  const generatePath = () => {
    switch (user?.role) {
      case "Admin":
        return "/admin/account-setting";
      case "Manager":
        return "/manager/account-setting";
      case "Staff":
        return "/staff/account-setting";
      case "Teacher":
        return "/teacher/account-setting";
      default:
        return "/profile";
    }
  };
  return (
    <div className={cx("user-profile")}>
      <Link to={generatePath()} className={cx("profile-image")}>
        <img
          src={user?.profilepictureurl}
          alt="profile-img"
          className={cx("image")}
        />
      </Link>
      <div
        className={cx("dropdown")}
        onClick={() => setShowAccountSetting(!showAccountSetting)}
      >
        <i
          className={cx(
            showAccountSetting
              ? "fa-solid fa-chevron-down"
              : "fa-solid fa-chevron-right",
            "icon"
          )}
        ></i>
      </div>
    </div>
  );
}

export default HeaderUserProfile;
