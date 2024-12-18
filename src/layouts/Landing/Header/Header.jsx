import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../../../components/Auth/Login/Login.jsx";
import Logo from "~/assets/images/logo/LOGO-06.png";
import { nav_data } from "~/data/Header/nav";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
  const location = useLocation();
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  return (
    <div>
      {isShowLoginModal && (
        <LoginModal setShowLogin={setIsShowLoginModal} />
      )}

      <div className={cx("header-wrapper")}>
        <div className={cx("header-container")}>
          <Link to="/" className={cx("header-logo")}>
            <img src={Logo} alt="main-logo" className={cx("logo")} />
          </Link>
          <div className={cx("header-nav")}>
            {nav_data.map((nav, index) => (
              <Link
                to={nav.link}
                className={cx("header-nav-item", {
                  active: location.pathname === nav.link,
                })}
                key={index}
              >
                {nav.name}
              </Link>
            ))}
          </div>
          <div className={cx("header-options")}>
            <button
              className={cx("header-option-btn")}
              onClick={() => setIsShowLoginModal(true)}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
