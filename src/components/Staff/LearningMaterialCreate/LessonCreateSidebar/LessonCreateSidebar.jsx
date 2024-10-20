import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./LessonCreateSidebar.module.scss";
import LessonCreateSidebarItem from "./LessonCreateSidebarItem";
const cx = classNames.bind(styles);
function LessonCreateSidebar({ unitId, topics, lessonId }) {
  return (
    <div className={cx("create-lessons-sidebar-container")}>
      {topics?.map((topic) => (
        <LessonCreateSidebarItem
          key={topic.id}
          unitId={unitId}
          topic={topic}
          lessonId={lessonId}
        />
      ))}
    </div>
  );
}

LessonCreateSidebar.propTypes = {
  unitId: PropTypes.string,
  topics: PropTypes.array,
  lessonId: PropTypes.string,
};

export default LessonCreateSidebar;
