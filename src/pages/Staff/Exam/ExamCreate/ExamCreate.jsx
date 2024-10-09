import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./ExamCreate.module.scss";
const cx = classNames.bind(styles);
function ExamCreate() {
  return (
    <PageLayout>
      <div className={cx("create-exam-title")}>ExamCreate</div>
    </PageLayout>
  );
}

export default ExamCreate;
