import classNames from "classnames/bind"; // Ensure classNames is imported
import PageLayout from "~/layouts/Staff/PageLayout";
import CourseOverview from "~/components/Staff/OverviewLearningMaterial/CourseOverview";
import RecentCourses from "~/components/Staff/OverviewLearningMaterial/RecentCourses";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./LearningMaterial.module.scss"; // Import your styles

const cx = classNames.bind(styles); // Bind the styles for use

function LearningMaterial() {
  return (
    <PageLayout>
    <div className={cx("staff-learning-material-wrapper")}>
      <div className={cx("staff-learning-material-container")}>
        <div className={cx("staff-learning-material-header")}>
          <div className={cx("staff-learning-material-text")}>Course Overview</div>
        </div>
        <div className={cx("staff-learning-material-content")}>
        <CourseOverview />
        <RecentCourses />
        </div>
      </div>
    </div>
    <LearningMaterialCreateFooter />
  </PageLayout>

  );
}

export default LearningMaterial;
