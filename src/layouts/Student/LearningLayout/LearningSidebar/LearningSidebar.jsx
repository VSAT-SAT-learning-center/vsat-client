import classNames from "classnames/bind";
import SidebarNavItem from "~/components/General/SidebarNavItem";
import { sidebarNavs } from "~/data/Student/SidebarNavs"; // Note the curly braces here
import styles from "./LearningSidebar.module.scss";

const cx = classNames.bind(styles);

function LearningSidebar() {
  return (
    <div className={cx("learning-sidebar-wrapper")}>
      <div className={cx("learning-sidebar-container")}>
        <div className={cx("menu-section")}>
          <div className={cx("menu-title")}>MY STUFF</div>
          <div className={cx("sidebar-navs")}>
            {sidebarNavs
              .filter((navItem) => navItem.section === "MY STUFF")
              .map((navItem) => (
                <SidebarNavItem key={navItem.id} navItem={navItem} />
              ))}
          </div>
        </div>
        <div className={cx("menu-section")}>
          <div className={cx("menu-title")}>MY ACCOUNT</div>
          <div className={cx("sidebar-navs")}>
            {sidebarNavs
              .filter((navItem) => navItem.section === "MY ACCOUNT")
              .map((navItem) => (
                <SidebarNavItem key={navItem.id} navItem={navItem} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningSidebar;
