import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./ExamStructure.module.scss";
const cx = classNames.bind(styles);
function ExamStructure() {
  return (
    <PageLayout>
      <div className={cx("exam-structure-title")}>ExamStructure</div>
    </PageLayout>
  );
}

export default ExamStructure;
