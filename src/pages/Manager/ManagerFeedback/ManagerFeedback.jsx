import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerFeedback.module.scss";
const cx = classNames.bind(styles);
function ManagerFeedback() {
  return (
    <PageLayout>
      <div className={cx("manager-feedback-title")}>Feedback</div>
    </PageLayout>
  );
}

export default ManagerFeedback;
