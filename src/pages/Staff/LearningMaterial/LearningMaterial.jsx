import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterial.module.scss";
const cx = classNames.bind(styles);
function LearningMaterial() {
  return (
    <PageLayout>
      <div className={cx("learning-material-title")}>Learning material</div>
    </PageLayout>
  );
}

export default LearningMaterial;
