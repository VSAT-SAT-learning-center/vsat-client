import classNames from "classnames/bind";
import DomainTable from "./DomainTable";
import styles from "./ExamViewResult.module.scss";
import ModuleTableRW from "./ModuleTable";
import SkillTable from "./SkillTable";
const cx = classNames.bind(styles);

function ExamViewResult({ examResult }) {

  return (
    <div className={cx("exam-view-result-wrapper")}>
      <div className={cx("exam-view-result-container")}>
        <div className={cx("exam-view-result-header")}>
          <div className={cx("header-content")}>Trial Exam Result</div>
        </div>
        <div className={cx("exam-view-result-content")}>
          <div className={cx("content-main")}>
            <div className={cx("content-top")}>
              <div className={cx("exam-name")}>Full-length Trial Exam 1</div>
              <div className={cx("exam-score")}>
                <div className={cx("score-item")}>
                  <div className={cx("score-number")}>{examResult?.scoreRW + examResult?.scoreMath}</div>
                  <div className={cx("score-text")}>Total</div>
                </div>
                <div className={cx("score-item")}>
                  <div className={cx("score-number")}>{examResult?.scoreRW}</div>
                  <div className={cx("score-text")}>Reading and Writing</div>
                </div>
                <div className={cx("score-item")}>
                  <div className={cx("score-number")}>{examResult?.scoreMath}</div>
                  <div className={cx("score-text")}>Math</div>
                </div>
              </div>
            </div>
            <div className={cx("content-statistic")}>
              <div className={cx("summary-text")}>Summary</div>
              <div className={cx("rw-container")}>
                <div className={cx("rw-text")}>Reading and Writing</div>
                <ModuleTableRW />
                <DomainTable />
                <SkillTable />
              </div>
              <div className={cx("math-container")}>
                <div className={cx("math-text")}>Math</div>
                <ModuleTableRW />
                <DomainTable />
                <SkillTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamViewResult
