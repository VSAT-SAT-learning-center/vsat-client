import classNames from "classnames/bind";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "~/contexts/AuthContext";
import styles from "./HeaderUserProfile.module.scss";
const cx = classNames.bind(styles);
function HeaderUserProfile({ showAccountSetting, setShowAccountSetting }) {
  const { user } = useContext(AuthContext);

  return (
    <div className={cx("user-profile")}>
      <Link to="/profile" className={cx("profile-image")}>
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
