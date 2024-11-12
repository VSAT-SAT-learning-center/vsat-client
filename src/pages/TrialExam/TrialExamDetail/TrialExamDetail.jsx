import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./TrialExamDetail.module.scss";
const cx = classNames.bind(styles);

function TrialExamDetail() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className={cx("trial-exam-detail-wrapper")}>
      <div className={cx("trial-exam-detail-container")}>
        <div className={cx("trial-exam-detail-content")}>
          <div className={cx("exam-title")}>Full-length Exam 1</div>
          <span className={cx("exam-infor")}>
            <span className={cx("highlight")}>Instructions:</span>
            {` Once you click the 'Begin Exam' button below, you will
            have 2 hours 14 minutes to complete 98 questions on this exam. The
            test will be divided into 4 modules: 2 Reading and Writing followed
            by 2 Math.`}
          </span>
          <span
            className={cx("exam-infor")}
          >{`Each Reading and Writing module consists of 27 questions with a 32-minute time limit, and each Math module consists of 22 questions with a 35-minute time limit. You can only work on one module at a time - you cannot go back to a previous module.`}</span>
          <span
            className={cx("exam-infor")}
          >{`To best simulate test conditions, the timer cannot be stopped once started, so please complete all preparations before advancing.`}</span>
          <div className={cx("exam-action-container")}>
            <button className={cx("begin-btn")}>Begin Exam</button>
            <div className={cx("or")}>Or</div>
            <button className={cx("back-action")} onClick={handleBack}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrialExamDetail;
