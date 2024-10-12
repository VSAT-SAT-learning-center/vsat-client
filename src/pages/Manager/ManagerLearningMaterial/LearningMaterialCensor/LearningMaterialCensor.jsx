import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./LearningMaterialCensor.module.scss";
const cx = classNames.bind(styles);
function LearningMaterial() {
  return (
    <PageLayout>
      <div className={cx("learning-material-title")}>Learning material</div>
    </PageLayout>
  );
}

export default LearningMaterial;
