import classNames from "classnames/bind";
import TrialExamItem from "~/components/TrialExam/TrialExamItem";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import styles from "./TrialExam.module.scss";
const cx = classNames.bind(styles);
function TrialExam() {
  return (
    <div className={cx("trial-exam-wrapper")}>
      <HeaderAuthen />
      <div className={cx("trial-exam-container")}>
        <TrialExamItem />
      </div>
    </div>
  );
}

export default TrialExam;
