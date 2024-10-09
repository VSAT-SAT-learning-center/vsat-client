import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialCreateLesson.module.scss";
const cx = classNames.bind(styles);
function LearningMaterialCreateLesson() {
  return (
    <PageLayout>
      <div className={cx("learning-material-lesson-title")}>Learning material lesson</div>
    </PageLayout>
  );
}

export default LearningMaterialCreateLesson;
