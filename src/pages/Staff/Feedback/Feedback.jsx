import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Feedback.module.scss";
const cx = classNames.bind(styles);
function Feedback() {
  return (
    <PageLayout>
      <div className={cx("feedback-title")}>Feedback</div>
    </PageLayout>
  );
}

export default Feedback;
