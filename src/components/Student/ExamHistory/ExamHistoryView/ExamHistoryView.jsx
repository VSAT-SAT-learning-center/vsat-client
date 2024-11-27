import classNames from "classnames/bind";
import styles from "./ExamHistoryView.module.scss";
import ExamLineChart from "./ExamLineChart";
const cx = classNames.bind(styles);

function ExamHistoryView({ setShowExamHistoryView }) {
  const examData = [
    { testDate: "Jan 1", score: 450 },
    { testDate: "Jan 15", score: 500 },
    { testDate: "Feb 1", score: 550 },
    { testDate: "Feb 15", score: 600 },
    { testDate: "Mar 1", score: 650 },
    { testDate: "Mar 15", score: 700 },
    { testDate: "Apr 1", score: 750 },
    { testDate: "Apr 15", score: 800 },
  ];
  return (
    <div className={cx("exam-history-view-wrapper")}>
      <div className={cx("exam-history-view-container")}>
        <div className={cx("exam-history-view-header")}>
          <div
            className={cx("profile-close")}
            onClick={() => setShowExamHistoryView(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("profile-title")}>Exam History</div>
          <div className={cx("profile-empty")}></div>
        </div>
        <div className={cx("exam-history-view-content")}>
          <div className={cx("view-title")}>Follow your progress, track your prep.</div>
          <ExamLineChart examData={examData} goal={1300} />
          <div className={cx("view-title")}>Tests</div>
          <div className={cx("tests-list-container")}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamHistoryView
