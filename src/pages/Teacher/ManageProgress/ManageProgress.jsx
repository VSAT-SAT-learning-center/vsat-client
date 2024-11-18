import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Teacher/PageLayout";
import styles from "./ManageProgress.module.scss";
const cx = classNames.bind(styles);

function ManageProgress() {
  return (
    <PageLayout>
      <div className={cx("teacher-manage-progress-wrapper")}>
        <div className={cx("teacher-manage-progress-container")}>
          <div className={cx("teacher-manage-progress-header")}>
            <div className={cx("teacher-manage-progress-text")}>
              Manage Progress
            </div>
          </div>
          <div className={cx("teacher-manage-progress-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default ManageProgress;
