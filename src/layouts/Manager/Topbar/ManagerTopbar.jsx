import classNames from "classnames/bind";
import { useState } from "react";
import HeaderNotification from "~/components/General/HeaderNotification";
import HeaderUserProfile from "~/components/General/HeaderUserProfile";
import AccountOptions from "~/layouts/Landing/HeaderAuthen/AccountOptions";
import styles from "./ManagerTopbar.module.scss";
const cx = classNames.bind(styles);

function ManagerTopbar() {
  const [isFocused, setIsFocused] = useState(false);
  const [showAccountSetting, setShowAccountSetting] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <>
      {showAccountSetting && <AccountOptions />}
      <div className={cx("manager-topbar-wrapper")}>
        <div className={cx("manager-topbar-container")}>
          <div className={cx("manager-topbar-left")}>
            <div
              className={cx("manager-topbar-search", { focused: isFocused })}
            >
              <i
                className={cx(
                  "fa-regular fa-magnifying-glass",
                  "manager-search-icon"
                )}
              ></i>
              <input
                type="text"
                placeholder="Search..."
                className={cx("manager-search-input")}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className={cx("manager-topbar-right")}>
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

export default ManagerTopbar;
