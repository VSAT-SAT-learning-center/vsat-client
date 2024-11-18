import classNames from "classnames/bind";
import { useState } from "react";
import HeaderNotification from "~/components/General/HeaderNotification";
import HeaderUserProfile from "~/components/General/HeaderUserProfile";
import AccountOptions from "~/layouts/Landing/HeaderAuthen/AccountOptions";
import styles from "./TeacherTopbar.module.scss";
const cx = classNames.bind(styles);

function TeacherTopbar() {
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
      <div className={cx("teacher-topbar-wrapper")}>
        <div className={cx("teacher-topbar-container")}>
          <div className={cx("teacher-topbar-left")}>
            <div
              className={cx("teacher-topbar-search", { focused: isFocused })}
            >
              <i
                className={cx(
                  "fa-regular fa-magnifying-glass",
                  "teacher-search-icon"
                )}
              ></i>
              <input
                type="text"
                placeholder="Search..."
                className={cx("teacher-search-input")}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className={cx("teacher-topbar-right")}>
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

export default TeacherTopbar;
