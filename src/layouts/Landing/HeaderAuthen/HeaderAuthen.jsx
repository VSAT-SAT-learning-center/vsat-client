import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "~/assets/images/logo/LOGO-06.png";
import HeaderNotification from "~/components/General/HeaderNotification";
import HeaderUserProfile from "~/components/General/HeaderUserProfile";
import AccountOptions from "./AccountOptions";
import styles from "./HeaderAuthen.module.scss";
const cx = classNames.bind(styles);
function HeaderAuthen() {
  const [showAccountSetting, setShowAccountSetting] = useState(false);
  return (
    <>
      {showAccountSetting && <AccountOptions />}
      <div className={cx("header-authen-wrapper")}>
        <div className={cx("header-authen-container")}>
          <Link to="/" className={cx("header-authen-logo")}>
            <img src={Logo} alt="main-logo" className={cx("logo")} />
          </Link>
          <div className={cx("header-authen-option")}>
            <HeaderNotification />
            <HeaderUserProfile
              showAccountSetting={showAccountSetting}
              setShowAccountSetting={setShowAccountSetting}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderAuthen;
