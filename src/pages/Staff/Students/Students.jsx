import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Students.module.scss";
const cx = classNames.bind(styles);
function Students() {
  return (
    <PageLayout>
      <div className={cx("manage-students-wrapper")}>
        <div className={cx("manage-students-container")}>
          <div className={cx("manage-students-header")}>
            <div className={cx("manage-students-text")}>
              Manage Study Profiles
            </div>
          </div>
          <div className={cx("manage-students-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default Students;
