import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialLesson.module.scss";
const cx = classNames.bind(styles);
function LearningMaterialLesson() {
  return (
    <PageLayout>
      <div className={cx("learning-material-lesson-title")}>Learning material lesson</div>
    </PageLayout>
  );
}

export default LearningMaterialLesson;
