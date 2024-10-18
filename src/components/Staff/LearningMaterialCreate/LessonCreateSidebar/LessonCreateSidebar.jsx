import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./LessonCreateSidebar.module.scss";
import LessonCreateSidebarItem from "./LessonCreateSidebarItem";
const cx = classNames.bind(styles);
function LessonCreateSidebar({ newUnit, topics, lessonId }) {
  return (
    <div className={cx("create-lessons-sidebar-container")}>
      {topics?.map((topic) => (
        <LessonCreateSidebarItem
          key={topic.id}
          newUnit={newUnit}
          topic={topic}
          lessonId={lessonId}
        />
      ))}
    </div>
  );
}

LessonCreateSidebar.propTypes = {
  newUnit: PropTypes.object,
  topics: PropTypes.array,
  lessonId: PropTypes.string,
};

export default LessonCreateSidebar;
