import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./PracticeCreate.module.scss";
const cx = classNames.bind(styles);
function PracticeCreate() {
  return (
    <PageLayout>
      <div className={cx("create-practice-wrapper")}>
        <div className={cx("create-practice-container")}>
          <div className={cx("create-practice-header")}>
            <div className={cx("create-practice-text")}>Creat partice</div>
          </div>
          <div className={cx("create-practice-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default PracticeCreate;
