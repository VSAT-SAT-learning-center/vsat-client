import classNames from "classnames/bind";
import { useState } from "react";
import HeaderNotification from "~/components/General/HeaderNotification";
import HeaderUserProfile from "~/components/General/HeaderUserProfile";
import styles from "./AdminTopbar.module.scss";
const cx = classNames.bind(styles);

function AdminTopbar() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className={cx("admin-topbar-wrapper")}>
      <div className={cx("admin-topbar-container")}>
        <div className={cx("admin-topbar-left")}>
          <div className={cx("admin-topbar-search", { focused: isFocused })}>
            <i
              className={cx("fa-regular fa-magnifying-glass", "admin-search-icon")}
            ></i>
            <input
              type="text"
              placeholder="Search..."
              className={cx("admin-search-input")}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className={cx("admin-topbar-right")}>
          <HeaderNotification />
          <HeaderUserProfile />
        </div>
      </div>
    </div>
  );
}

export default AdminTopbar;
