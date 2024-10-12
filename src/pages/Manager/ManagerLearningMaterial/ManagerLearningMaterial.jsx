import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerLearningMaterial.module.scss";
const cx = classNames.bind(styles);
function LearningMaterial() {
  return (
    <PageLayout>
      <div className={cx("manager-learning-material-title")}>Learning material</div>
    </PageLayout>
  );
}

export default LearningMaterial;
