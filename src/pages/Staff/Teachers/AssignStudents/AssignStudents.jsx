import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./AssignStudents.module.scss";
const cx = classNames.bind(styles);
function AssignStudents() {
  return (
    <PageLayout>
      <div className={cx("assign-students-wrapper")}>
        <div className={cx("assign-students-container")}>
          <div className={cx("assign-students-header")}>
            <div className={cx("assign-students-text")}> </div>
          </div>
          <div className={cx("assign-students-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default AssignStudents;
