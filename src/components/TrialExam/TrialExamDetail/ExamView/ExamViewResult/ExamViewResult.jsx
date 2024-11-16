import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import ConfimContinueModal from "./ConfimContinueModal";
import DomainTable from "./DomainTable";
import EnterTargetModal from "./EnterTargetModal";
import styles from "./ExamViewResult.module.scss";
import ModuleTable from "./ModuleTable";
import SkillTable from "./SkillTable";
const cx = classNames.bind(styles);

function ExamViewResult({ examResult }) {
  const [examResultRW, setExamResultRW] = useState(null);
  const [examResultMath, setExamResultMath] = useState(null);
  const [isWating, setIsWating] = useState(false);
  const [showConfirmContinue, setShowConfirmContinue] = useState(false);
  const [showEnterTarget, setShowEnterTarget] = useState(false);

  useEffect(() => {
    const fetchExamResult = async () => {
      try {
        setIsWating(true);
        const response = await apiClient.get(
          `/exam-attempts/statistics/${examResult?.attemptId}`
        );
        const { RW, M } = response.data.data;
        setExamResultRW({
          domains: RW.domain,
          skills: RW.skill,
          modules: RW.moduleType,
        });

        setExamResultMath({
          domains: M.domain,
          skills: M.skill,
          modules: M.moduleType,
        });
      } catch (error) {
        console.error("Error while fetching exam result:", error);
      } finally {
        setIsWating(false);
      }
    };

    fetchExamResult();
  }, [examResult?.attemptId]);
  return (
    <>
      {showConfirmContinue && (
        <ConfimContinueModal
          setShowConfirmContinue={setShowConfirmContinue}
          setShowEnterTarget={setShowEnterTarget}
        />
      )}
      {showEnterTarget && <EnterTargetModal setShowEnterTarget={setShowEnterTarget} />}
      <div className={cx("exam-view-result-wrapper")}>
        <div className={cx("exam-view-result-container")}>
          <div className={cx("exam-view-result-header")}>
            <div className={cx("header-content")}>
              <div className={cx("content-text")}>Trial Exam Result</div>
              <button
                className={cx("continue-btn")}
                onClick={() => setShowConfirmContinue(true)}
              >
                Continue
              </button>
            </div>
          </div>
          <div className={cx("exam-view-result-content")}>
            {isWating ? (
              <div className={cx("content-main-loading")}>
                <div className={cx("loader")}></div>
              </div>
            ) : (
              <div className={cx("content-main")}>
                <div className={cx("content-top")}>
                  <div className={cx("exam-name")}>
                    Full-length Trial Exam 1
                  </div>
                  <div className={cx("exam-score")}>
                    <div className={cx("score-item")}>
                      <div className={cx("score-number")}>
                        {examResult?.scoreRW + examResult?.scoreMath}
                      </div>
                      <div className={cx("score-text")}>Total</div>
                    </div>
                    <div className={cx("score-item")}>
                      <div className={cx("score-number")}>
                        {examResult?.scoreRW}
                      </div>
                      <div className={cx("score-text")}>
                        Reading and Writing
                      </div>
                    </div>
                    <div className={cx("score-item")}>
                      <div className={cx("score-number")}>
                        {examResult?.scoreMath}
                      </div>
                      <div className={cx("score-text")}>Math</div>
                    </div>
                  </div>
                </div>
                <div className={cx("content-statistic")}>
                  <div className={cx("summary-text")}>Summary</div>
                  <div className={cx("rw-container")}>
                    <div className={cx("rw-text")}>Reading and Writing</div>
                    <ModuleTable data={examResultRW?.modules} />
                    <DomainTable data={examResultRW?.domains} />
                    <SkillTable data={examResultRW?.skills} />
                  </div>
                  <div className={cx("math-container")}>
                    <div className={cx("math-text")}>Math</div>
                    <ModuleTable data={examResultMath?.modules} />
                    <DomainTable data={examResultMath?.domains} />
                    <SkillTable data={examResultMath?.skills} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamViewResult;
