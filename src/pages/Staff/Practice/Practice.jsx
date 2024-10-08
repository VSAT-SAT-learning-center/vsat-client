import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Practice.module.scss";
const cx = classNames.bind(styles);
function Practice() {
  return (
    <PageLayout>
      <div className={cx("practice-title")}>Practice</div>
    </PageLayout>
  );
}

export default Practice;
