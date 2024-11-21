import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import DetailLessonItem from "~/components/Student/LearningPartDetail/LearningPartDetailSidebar/DetailLessonItem";
import styles from "./LearningPartDetailSidebar.module.scss";
const cx = classNames.bind(styles);

function LearningPartDetailSidebar({ slug, uniAreaData, activeLesson, onLessonSelect }) {
  return (
    <div className={cx("learning-part-detail-sidebar-wrapper")}>
      <div className={cx("learning-part-detail-sidebar-container")}>
        <div className={cx("detail-header")}>
          <div className={cx("detail-icon")}>
            <i className={cx("fa-regular fa-book-open", "icon")}></i>
          </div>
          <div className={cx("detail-title")}>
            Digital SAT {slug === "sat-reading-and-writing" ? "Reading and Writing" : "Math"}
          </div>
        </div>
        <div className={cx("detail-content")}>
          <div className={cx("detail-content-header")}>
            {/* <div className={cx("detail-content-breadscrumb")}>
              <CustomBreadcrumbs />
            </div> */}
            <div className={cx("detail-content-title")}>
              Lesson: {uniAreaData?.unitAreaProgress?.unitArea.title}
            </div>
          </div>
          <div className={cx("detail-content-main")}>
            <div className={cx("detail-content-lesson")}>
              {uniAreaData?.lessons.map((lesson) => (
                <DetailLessonItem key={lesson.id} lesson={lesson} isActive={lesson.id === activeLesson?.id}
                  onClick={() => onLessonSelect(lesson)} />
              ))}
            </div>
            {/* <div className={cx("detail-content-practice")}>
              <DetailPracticeItem />
            </div> */}
          </div>
          <div className={cx("detail-content-footer")}>
            <div className={cx("footer-copyright")}>
              © 2024 VSAT Learning Center
            </div>
            <div className={cx("footer-rule")}>
              <Link className={cx("rule-item")}>Terms of use</Link>
              <Link className={cx("rule-item")}>Privacy Policy</Link>
              <Link className={cx("rule-item")}>Cookie Notice</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningPartDetailSidebar;
