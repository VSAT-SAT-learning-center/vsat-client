import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./Practice.module.scss";
const cx = classNames.bind(styles);
function Practice() {
  return (
    <PageLayout>
      <div className={cx("manage-practice-wrapper")}>
        <div className={cx("manage-practice-container")}>
          <div className={cx("manage-practice-header")}>
            <div className={cx("manage-practice-text")}>Practice</div>
          </div>
          <div className={cx("manage-practice-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default Practice;
