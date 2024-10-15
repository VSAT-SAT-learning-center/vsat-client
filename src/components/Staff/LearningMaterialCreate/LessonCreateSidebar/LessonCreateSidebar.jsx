import classNames from "classnames/bind";
import styles from "./LessonCreateSidebar.module.scss";
import LessonCreateSidebarItem from "./LessonCreateSidebarItem";
const cx = classNames.bind(styles);
function LessonCreateSidebar() {
  return (
    <div className={cx("create-lessons-sidebar-container")}>
      <LessonCreateSidebarItem />
    </div>
  );
}

export default LessonCreateSidebar;
