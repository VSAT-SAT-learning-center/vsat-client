import classNames from "classnames/bind"; // Ensure classNames is imported
import PageLayout from "~/layouts/Staff/PageLayout";
import CourseOverview from "~/components/Staff/OverviewLearningMaterial/CourseOverview";
import RecentCourses from "~/components/Staff/OverviewLearningMaterial/RecentCourses";
import styles from "./LearningMaterial.module.scss"; // Import your styles

const cx = classNames.bind(styles); // Bind the styles for use

function LearningMaterial() {
  return (
    <PageLayout>
      <div className={cx("overview-container")}>
      <h2>Course Overview</h2>
        <CourseOverview />
        <RecentCourses />
      </div>
    </PageLayout>
  );
}

export default LearningMaterial;
