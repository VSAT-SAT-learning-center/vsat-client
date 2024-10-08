import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialUnits.module.scss";
const cx = classNames.bind(styles);
function LearningMaterialUnits() {
  return (
    <PageLayout>
      <div className={cx("learning-material-units-title")}>Learning material units</div>
    </PageLayout>
  );
}

export default LearningMaterialUnits;
