import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SidebarNavItem.module.scss";
const cx = classNames.bind(styles);

function SidebarNavItem({ navItem }) {
  const location = useLocation();
  const [isShowSubnav, setIsShowSubnav] = useState(false);

  const isActiveSubNav = useCallback(
    (subNavPath) => location.pathname.startsWith(subNavPath),
    [location.pathname]
  );

  const isActiveMain = useCallback(() => {
    if (location.pathname === navItem.path) {
      return true;
    }
    if (
      location.pathname.startsWith("/staff/learning-material/create") &&
      navItem.path === "/staff/learning-material"
    ) {
      return true;
    }
    if (
      navItem.subNavs &&
      navItem.subNavs.some((subNav) => isActiveSubNav(subNav.path))
    ) {
      return true;
    }
    return false;
  }, [location.pathname, navItem.subNavs, navItem.path, isActiveSubNav]);

  useEffect(() => {
    if (
      navItem.subNavs &&
      navItem.subNavs.some((subNav) => isActiveSubNav(subNav.path))
    ) {
      setIsShowSubnav(true);
    }
  }, [location.pathname, navItem.subNavs, isActiveSubNav]);

  const handleShowSubnav = () => {
    setIsShowSubnav(!isShowSubnav);
  };

  return (
    <>
      {navItem.show ? (
        <div className={cx("sidebar-nav-item")} onClick={handleShowSubnav}>
          <div
            className={cx("nav-item-main", {
              "nav-item-active": isActiveMain(),
            })}
          >
            <div className={cx("nav-item-content")}>
              <div className={cx("nav-item-icon")}>
                <i
                  className={cx(
                    isActiveMain() ? navItem.iconActive : navItem.icon,
                    "item-icon"
                  )}
                ></i>
              </div>
              <div className={cx("nav-item-title")}>{navItem.title}</div>
            </div>
            <i
              className={cx(
                isShowSubnav
                  ? "fa-light fa-chevron-down"
                  : "fa-light fa-chevron-right",
                "nav-icon-show-option"
              )}
            ></i>
          </div>
          {isShowSubnav && navItem.subNavs && navItem.subNavs.length > 0 && (
            <div className={cx("nav-item-subnav")}>
              {navItem.subNavs.map((subNav) => (
                <Link
                  to={subNav.path}
                  className={cx("nav-item-subnav-item", {
                    "subnav-item-active": isActiveSubNav(subNav.path),
                  })}
                  key={subNav.id}
                >
                  <i
                    className={cx(
                      isActiveSubNav(subNav.path)
                        ? "fa-regular fa-chevron-right"
                        : "fa-thin fa-chevron-right",
                      "subnav-item-icon"
                    )}
                  ></i>
                  <div className={cx("subnav-item-title")}> {subNav.title}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link to={navItem.path} className={cx("sidebar-nav-item")}>
          <div
            className={cx("nav-item-main", {
              "nav-item-active": isActiveMain(),
            })}
          >
            <div className={cx("nav-item-content")}>
              <div className={cx("nav-item-icon")}>
                <i
                  className={cx(
                    isActiveMain ? navItem.iconActive : navItem.icon,
                    "item-icon"
                  )}
                ></i>
              </div>
              <div className={cx("nav-item-title")}>{navItem.title}</div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

SidebarNavItem.propTypes = {
  navItem: PropTypes.object.isRequired,
};

export default SidebarNavItem;
