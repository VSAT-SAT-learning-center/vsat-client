import classNames from "classnames/bind";
import CustomBreadcrumbs from "../../../components/LearningPartDetail/LearningPartDetailSidebar/CustomBreadcrumbs";
import DetailLessonItem from "../../../components/LearningPartDetail/LearningPartDetailSidebar/DetailLessonItem";
import DetailPracticeItem from "../../../components/LearningPartDetail/LearningPartDetailSidebar/DetailPracticeItem";
import styles from "./LearningPartDetailSidebar.module.scss";
const cx = classNames.bind(styles);

function LearningPartDetailSidebar() {
  return (
    <div className={cx("learning-part-detail-sidebar-wrapper")}>
      <div className={cx("learning-part-detail-sidebar-container")}>
        <div className={cx("detail-header")}>
          <div className={cx("detail-icon")}>
            <i className={cx("fa-regular fa-book-open", "icon")}></i>
          </div>
          <div className={cx("detail-title")}>
            Digital SAT Reading and Writing
          </div>
        </div>
        <div className={cx("detail-content")}>
          <div className={cx("detail-content-header")}>
            <div className={cx("detail-content-breadscrumb")}>
              <CustomBreadcrumbs />
            </div>
            <div className={cx("detail-content-title")}>
              Lesson 1: Command of Evidence: Textual
            </div>
          </div>
          <div className={cx("detail-content-main")}>
            <div className={cx("detail-content-lesson")}>
              <DetailLessonItem />
              <DetailLessonItem />
              <DetailLessonItem />
              <DetailLessonItem />
              <DetailPracticeItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningPartDetailSidebar;
