import classNames from "classnames/bind";
import { useState } from "react";
import HeaderNotification from "~/components/General/HeaderNotification";
import HeaderUserProfile from "~/components/General/HeaderUserProfile";
import styles from "./Topbar.module.scss";
const cx = classNames.bind(styles);

function Topbar() {
  const [isFocused, setIsFocused] = useState(false); 

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className={cx("topbar-wrapper")}>
      <div className={cx("topbar-container")}>
        <div className={cx("topbar-left")}>
          <div className={cx("topbar-search", { focused: isFocused })}>
            <i
              className={cx("fa-regular fa-magnifying-glass", "search-icon")}
            ></i>
            <input
              type="text"
              placeholder="Search..."
              className={cx("search-input")}
              onFocus={handleFocus} 
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className={cx("topbar-right")}>
          <HeaderNotification />
          <HeaderUserProfile />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
