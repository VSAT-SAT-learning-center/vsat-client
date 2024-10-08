import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Teachers.module.scss";
const cx = classNames.bind(styles);
function Teachers() {
  return (
    <PageLayout>
      <div className={cx("teachers-title")}>Teachers</div>
    </PageLayout>
  );
}

export default Teachers;
