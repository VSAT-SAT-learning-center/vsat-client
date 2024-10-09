import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Logo from "~/assets/images/logo/LOGO-06.png";
// import { nav_auth_data } from "~/data/HeaderAuthen/navAuthen";
import HeaderNotification from "~/components/General/HeaderNotification";
import HeaderUserProfile from "~/components/General/HeaderUserProfile";
import styles from "./HeaderAuthen.module.scss";
const cx = classNames.bind(styles);
function HeaderAuthen() {
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
          <HeaderNotification />
          <HeaderUserProfile />
        </div>
      </div>
    </div>
  );
}

export default HeaderAuthen;
