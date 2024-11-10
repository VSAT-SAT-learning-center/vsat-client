import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Logo from "~/assets/images/logo/LOGO-06.png";
import SidebarNavItem from "~/components/General/SidebarNavItem";
import { sidebarNavs } from "~/data/Teacher/SidebarNavs";
import styles from "./TeacherSidebar.module.scss";
const cx = classNames.bind(styles);

function TeacherSidebar() {
  return (
    <div className={cx("teacher-sidebar-wrapper")}>
      <Link to="/teacher" className={cx("teacher-sidebar-logo")}>
        <img src={Logo} alt="main-logo" className={cx("teacher-logo")} />
      </Link>
      <div className={cx("teacher-sidebar-container")}>
        <div className={cx("teacher-sidebar-navs")}>
          {sidebarNavs.map((navItem) => (
            <SidebarNavItem key={navItem.id} navItem={navItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherSidebar;
