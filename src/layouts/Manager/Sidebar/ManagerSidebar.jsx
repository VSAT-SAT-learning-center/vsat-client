import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Logo from "~/assets/images/logo/LOGO-06.png";
import SidebarNavItem from "~/components/General/SidebarNavItem";
import { sidebarNavs } from "~/data/Manager/SidebarNavs";
import styles from "./ManagerSidebar.module.scss";
const cx = classNames.bind(styles);

function ManagerSidebar() {
  return (
    <div className={cx("manager-sidebar-wrapper")}>
      <Link to="/manager" className={cx("manager-sidebar-logo")}>
        <img src={Logo} alt="main-logo" className={cx("manager-logo")} />
      </Link>
      <div className={cx("manager-sidebar-container")}>
        <div className={cx("manager-sidebar-navs")}>
          {sidebarNavs.map((navItem) => (
            <SidebarNavItem key={navItem.id} navItem={navItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManagerSidebar;
