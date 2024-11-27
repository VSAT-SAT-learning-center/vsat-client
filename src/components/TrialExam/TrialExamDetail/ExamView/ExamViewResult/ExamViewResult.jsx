import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Loader from "~/components/General/Loader";
import apiClient from "~/services/apiService";
import ConfimContinueModal from "./ConfimContinueModal";
import DomainTable from "./DomainTable";
import EnterTargetModal from "./EnterTargetModal";
import styles from "./ExamViewResult.module.scss";
import LearningPathModal from "./LearningPathModal";
import ModuleTable from "./ModuleTable";
import SkillTable from "./SkillTable";
const cx = classNames.bind(styles);

function ExamViewResult({ exam, examResult }) {
  console.log(exam);

  const [examResultRW, setExamResultRW] = useState(null);
  const [examResultMath, setExamResultMath] = useState(null);
  const [isWating, setIsWating] = useState(false);
  const [showConfirmContinue, setShowConfirmContinue] = useState(false);
  const [showEnterTarget, setShowEnterTarget] = useState(false);
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [learningPartData, setLearningPartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [profile, setProfile] = useState(null);

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

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.get(`/study-profiles/getStudyProfileByAccountId`);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching learning materials:", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleClickContinue = () => {
    setShowConfirmContinue(true)
  }
  return (
    <>
      {isLoading && <Loader />}
      {showLearningPath && (
        <LearningPathModal learningPartData={learningPartData} />
      )}
      {showConfirmContinue && (
        <ConfimContinueModal
          setShowConfirmContinue={setShowConfirmContinue}
          setShowEnterTarget={setShowEnterTarget}
        />
      )}
      {showEnterTarget && (
        <EnterTargetModal
          examResult={examResult}
          setLearningPartData={setLearningPartData}
          setShowEnterTarget={setShowEnterTarget}
          setShowLearningPath={setShowLearningPath}
          setIsLoading={setIsLoading}
        />
      )}
      <div className={cx("exam-view-result-wrapper")}>
        <div className={cx("exam-view-result-container")}>
          <div className={cx("exam-view-result-header")}>
            <div className={cx("header-content")}>
              <div className={cx("content-text")}>{exam?.title} Result</div>
              <button
                className={cx("continue-btn")}
                onClick={handleClickContinue}
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
                        {examResult?.scoreRW + examResult?.scoreMath || 0}
                      </div>
                      <div className={cx("score-text")}>Total</div>
                    </div>
                    <div className={cx("score-item")}>
                      <div className={cx("score-number")}>
                        {examResult?.scoreRW || 0}
                      </div>
                      <div className={cx("score-text")}>
                        Reading and Writing
                      </div>
                    </div>
                    <div className={cx("score-item")}>
                      <div className={cx("score-number")}>
                        {examResult?.scoreMath || 0}
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
