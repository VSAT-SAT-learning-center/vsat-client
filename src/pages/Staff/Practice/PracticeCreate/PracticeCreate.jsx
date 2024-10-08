import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./PracticeCreate.module.scss";
const cx = classNames.bind(styles);
function PracticeCreate() {
  return (
    <PageLayout>
      <div className={cx("practice-create-title")}>PracticeCreate</div>
    </PageLayout>
  );
}

export default PracticeCreate;
