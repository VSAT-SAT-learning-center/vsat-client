import classNames from "classnames/bind";
import { useState } from "react";
import ViewExam from "~/components/Teacher/ManageMaterial/ViewTargetLearningDeatail/ViewExam";
import styles from "./ExamReportView.module.scss";
import ViewReportResult from "./ViewReportResult";
import ViewResultQuestion from "./ViewReportResult/ViewResultQuestion";
const cx = classNames.bind(styles);

function ExamReportView({ exam, setShowExamReport }) {
  const [viewNav, setViewNav] = useState("Statistic");
  const [showQuestionView, setShowQuestionView] = useState(false)
  const [questionView, setQuestionView] = useState(null)
  return (
    <>
      {showQuestionView && <ViewResultQuestion question={questionView} setShowQuestionView={setShowQuestionView} />}
      <div className={cx("exam-report-view-wrapper")} onClick={() => setShowExamReport(false)}>
        <div className={cx("exam-report-view-container")} onClick={(e) => e.stopPropagation()}>
          <div className={cx("exam-report-nav")}>
            <div className={cx("nav-item", { active: viewNav === "Statistic" })} onClick={() => setViewNav("Statistic")}>View Statistic</div>
            <div className={cx("nav-item", { active: viewNav === "Result" })} onClick={() => setViewNav("Result")}>View Result</div>
          </div>
          <div className={cx("exam-report-view-content")}>
            {viewNav === "Statistic" ? <ViewExam target={exam?.targetLearningId} /> : <ViewReportResult exam={exam} setQuestionView={setQuestionView} setShowQuestionView={setShowQuestionView} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ExamReportView
