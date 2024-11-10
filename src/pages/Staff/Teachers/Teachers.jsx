import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./Teachers.module.scss";
const cx = classNames.bind(styles);
function Teachers() {
  return (
    <PageLayout>
      <div className={cx("manage-teachers-wrapper")}>
        <div className={cx("manage-teachers-container")}>
          <div className={cx("manage-teachers-header")}>
            <div className={cx("manage-teachers-text")}>Teachers</div>
          </div>
          <div className={cx("manage-teachers-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default Teachers;
