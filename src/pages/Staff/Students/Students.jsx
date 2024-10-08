import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Students.module.scss";
const cx = classNames.bind(styles);
function Students() {
  return (
    <PageLayout>
      <div className={cx("students-title")}>Students</div>
    </PageLayout>
  );
}

export default Students;
