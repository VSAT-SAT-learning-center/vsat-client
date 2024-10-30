import classNames from "classnames/bind";
import styles from "./DuplicatedQuestionView.module.scss";
const cx = classNames.bind(styles);
function DuplicatedQuestionView() {
  return (
    <div className={cx("duplicated-question-wrapper")}>
      <div className={cx("duplicated-question-container")}></div>
    </div>
  );
}

export default DuplicatedQuestionView;
