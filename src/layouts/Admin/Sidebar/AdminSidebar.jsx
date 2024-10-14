import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Logo from "~/assets/images/logo/LOGO-06.png";
import SidebarNavItem from "~/components/General/SidebarNavItem";
import { sidebarNavs } from "~/data/Manager/SidebarNavs";
import styles from "./AdminSidebar.module.scss";
const cx = classNames.bind(styles);

function AdminSidebar() {
  return (
    <div className={cx("admin-sidebar-wrapper")}>
      <Link to="/admin" className={cx("admin-sidebar-logo")}>
        <img src={Logo} alt="main-logo" className={cx("admin-logo")} />
      </Link>
      <div className={cx("admin-sidebar-container")}>
        <div className={cx("admin-sidebar-navs")}>
          {sidebarNavs.map((navItem) => (
            <SidebarNavItem key={navItem.id} navItem={navItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
