import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Logo from "~/assets/images/logo/LOGO-06.png";
import SidebarNavItem from "~/components/Staff/SidebarNavItem";
import { sidebarNavs } from "~/data/Staff/SidebarNavs";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx("sidebar-wrapper")}>
      <Link to="/staff" className={cx("sidebar-logo")}>
        <img src={Logo} alt="main-logo" className={cx("logo")} />
      </Link>
      <div className={cx("sidebar-container")}>
        <div className={cx("sidebar-navs")}>
          {sidebarNavs.map((navItem) => (
            <SidebarNavItem key={navItem.id} navItem={navItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
