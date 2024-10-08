import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Exam.module.scss";
const cx = classNames.bind(styles);
function Exam() {
  return (
    <PageLayout>
      <div className={cx("exam-title")}>Exam</div>
    </PageLayout>
  );
}

export default Exam;
