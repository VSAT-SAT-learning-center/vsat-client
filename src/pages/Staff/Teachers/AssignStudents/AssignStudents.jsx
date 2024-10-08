import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./AssignStudents.module.scss";
const cx = classNames.bind(styles);
function AssignStudents() {
  return (
    <PageLayout>
      <div className={cx("assign-students-title")}>AssignStudents</div>
    </PageLayout>
  );
}

export default AssignStudents;
