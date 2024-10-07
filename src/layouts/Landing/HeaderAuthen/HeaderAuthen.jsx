import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Avatar from "~/assets/images/banner/01.png";
import Logo from "~/assets/images/logo/LOGO-06.png";
// import { nav_auth_data } from "~/data/HeaderAuthen/navAuthen";
import styles from "./HeaderAuthen.module.scss";
const cx = classNames.bind(styles);
function HeaderAuthen() {
  const countNotifications = 99;
  return (
    <div className={cx("header-authen-wrapper")}>
      <div className={cx("header-authen-container")}>
        {/* <div className={cx("header-authen-left")}>
          
        </div> */}
        <Link to="/" className={cx("header-authen-logo")}>
          <img src={Logo} alt="main-logo" className={cx("logo")} />
        </Link>
        {/* <div className={cx("header-authen-nav")}>
          {nav_auth_data.map((nav, index) => (
            <div className={cx("header-authen-nav-item")} key={index}>
              <i className={cx(nav.icon, "header-authen-nav-item-icon")}></i>
              <Link
                to={nav.link}
                className={cx("header-authen-nav-item-text", {
                  active: location.pathname === nav.link,
                })}
              >
                {nav.name}
              </Link>
            </div>
          ))}
        </div> */}

        <div className={cx("header-authen-option")}>
          <Link to="/my-learning" className={cx("my-learning", "pr-5")}>
            My learning
          </Link>
          <div className={cx("notification")}>
            <i className={cx("fa-sharp fa-regular fa-bell", "icon")}></i>
            {countNotifications > 0 && (
              <div className={cx("count-notification")}>
                <div className={cx("number")}>
                  {countNotifications > 9 ? 9 : countNotifications}
                </div>
                {countNotifications > 9 && (
                  <i className={cx("fa-solid fa-plus", "plus-icon")}></i>
                )}
              </div>
            )}
          </div>
          <Link to="/profile" className={cx("profile-image")}>
            <img src={Avatar} alt="profile-img" className={cx("image")} />
          </Link>
          <div className={cx("dropdown")}>
            <i className={cx("fa-solid fa-chevron-down", "icon")}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAuthen;
