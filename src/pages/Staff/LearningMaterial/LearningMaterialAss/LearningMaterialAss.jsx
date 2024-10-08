import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialAss.module.scss";
const cx = classNames.bind(styles);
function LearningMaterialAss() {
  return (
    <PageLayout>
      <div className={cx("learning-material-ass-title")}>Learning material ass</div>
    </PageLayout>
  );
}

export default LearningMaterialAss;
