import classNames from "classnames/bind";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "~/contexts/AuthContext";
import { moreOptions } from "~/data/Header/moreOptions";
import styles from "./AccountOptions.module.scss";
const cx = classNames.bind(styles);

function AccountOptions() {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <div className={cx("account-options-wrapper")}>
      <div className={cx("account-options-container")}>
        <div className={cx("current-text")}>Currently in</div>
        <div className={cx("user-info-wrapper")}>
          <div className={cx("user-info-container")}>
            <div className={cx("user-info-main")}>
              <div className={cx("user-avatar")}>
                <img
                  src={user?.profilepictureurl}
                  alt="avatar"
                  className={cx("avatar")}
                />
              </div>
              <div className={cx("user-info")}>
                <div className={cx("username")}>
                  <span className={cx("text")}>{user?.username}</span>
                </div>
                <div className={cx("email")}>{user.email}</div>
              </div>
            </div>
            <div className={cx("tick")}>
              <i className={cx("fa-solid fa-check", "icon")}></i>
            </div>
          </div>
        </div>
        <div className={cx("more-options-text")}>More options</div>
        {moreOptions.map((option) => (
          <Link
            to={option.path}
            className={cx("option-wrapper")}
            key={option.id}
          >
            <span className={cx("option-text")}>{option.text}</span>
            {option.icon && (
              <i
                className={cx("fa-solid fa-arrow-up-right-from-square", "icon")}
              ></i>
            )}
          </Link>
        ))}
        <div className={cx("log-out-wrapper")} onClick={handleLogout}>
          <div className={cx("log-out-text")}>Log out</div>
        </div>
      </div>
    </div>
  );
}

export default AccountOptions;
