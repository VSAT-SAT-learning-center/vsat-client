import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import DomainBarChart from "./DomainBarChart";
import DomainTableChart from "./DomainTableChart";
import ProgressBar from "./ProgressBar";
import ProgressBarDomain from "./ProgressBarDomain";
import SkillRadarChart from "./SkillRadarChart";
import styles from "./ViewExam.module.scss";
const cx = classNames.bind(styles);

function ViewExam({ target }) {
  const [examResultRW, setExamResultRW] = useState(null);
  const [examResultMath, setExamResultMath] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false)
  useEffect(() => {
    const fetchExamResult = async () => {
      try {
        setIsWaiting(true)
        const response = await apiClient.get(
          `/target-learnings/getStatisticByTargetLearning?targetLearningId=${target}`
        );
        const { RW, M } = response.data.data.examStatistics;
        const rwData = {
          score: RW.score,
          domains: RW.domain,
          skills: RW.skill,
        };
        const mathData = {
          score: M.score,
          domains: M.domain,
          skills: M.skill,
        };

        setCurrentData(rwData);
        setExamResultRW(rwData);
        setExamResultMath(mathData);
      } catch (error) {
        console.error("Error while fetching exam result:", error);
      } finally {
        setIsWaiting(false)
      }
    };

    fetchExamResult();
  }, [target]);

  const handleNavClick = (statistic) => {
    if (statistic === "RW" && examResultRW) {
      setCurrentData(examResultRW);
    } else if (statistic === "Math" && examResultMath) {
      setCurrentData(examResultMath);
    }
  };

  const calculateTotals = () => {
    const totalCorrect = currentData?.domains?.reduce(
      (acc, domain) => acc + domain.correctCount,
      0
    ) || 0;
    const totalIncorrect = currentData?.domains?.reduce(
      (acc, domain) => acc + domain.incorrectCount,
      0
    ) || 0;

    return { totalCorrect, totalIncorrect };
  };

  const { totalCorrect, totalIncorrect } = calculateTotals();

  return (
    <>
      {isWaiting ? (
        <div className={cx("view-exam-no-content")}>
          <div className={cx("loader")}></div>
        </div>
      ) : (
        <div className={cx("view-exam-container")}>
          <div className={cx("score-summary-wrapper")}>
            <div className={cx("score-summary-container")}>
              <div className={cx("score-summary-header")}>
                <div className={cx("score-summary-text")}>Score Summary</div>
              </div>
              <div className={cx("score-summary-content")}>
                <div className={cx("total-score")}>
                  Total Score is:{" "}
                  <span className={cx("score")}>{examResultRW?.score + examResultMath?.score}</span>
                </div>
                <div className={cx("score-part-container")}>
                  <div className={cx("score-part-item")}>
                    <div className={cx("part-title")}>Reading and Writing</div>
                    <div className={cx("part-score")}>{examResultRW?.score}</div>
                    <ProgressBar currentScore={examResultRW?.score} />
                  </div>
                  <div className={cx("score-part-item")}>
                    <div className={cx("part-title")}>Math</div>
                    <div className={cx("part-score")}>{examResultMath?.score}</div>
                    <ProgressBar currentScore={examResultMath?.score} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("score-statistics-wrapper")}>
            <div className={cx("score-statistics-nav")}>
              <div
                className={cx("nav-item", { active: currentData === examResultRW })}
                onClick={() => handleNavClick("RW")}
              >
                Reading and Writing
              </div>
              <div
                className={cx("nav-item", { active: currentData === examResultMath })}
                onClick={() => handleNavClick("Math")}
              >
                Math
              </div>
            </div>
            <div className={cx("score-statistic-item-container")}>
              <div className={cx("analysis-overview-container")}>
                <div className={cx("analysis-score")}>
                  <div className={cx("score-title")}>Your Score</div>
                  <div className={cx("score-number")}>{currentData?.score}</div>
                  <div className={cx("score-desc")}>OUT OF 800</div>
                </div>
                <div className={cx("analysis-infor")}>
                  <div className={cx("analysis-overview")}>
                    <div className={cx("overview-title")}>Analysis Overview</div>
                    <div className={cx("overview-number")}>
                      <div className={cx("correct")}>
                        <i className={cx("fa-regular fa-check", "icon")}></i>
                        <span className={cx("number")}>{totalCorrect}</span>
                        <span className={cx("number")}>Correct</span>
                      </div>
                      <div className={cx("incorrect")}>
                        <i className={cx("fa-regular fa-xmark", "icon")}></i>
                        <span className={cx("number")}>{totalIncorrect}</span>
                        <span className={cx("number")}>Incorrect</span>
                      </div>
                    </div>
                  </div>
                  {currentData?.domains?.map((domain, index) => (
                    <ProgressBarDomain
                      key={index}
                      title={domain.domainContent}
                      correct={domain.correctCount}
                      incorrect={domain.incorrectCount}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={cx("chart-statistics-wrapper")}>
            <div className={cx("chart-statistics-container")}>
              <div className={cx("domain-chart-container")}>
                <DomainBarChart domainData={currentData?.domains} />
                <DomainTableChart data={currentData?.domains} />
              </div>
              <div className={cx("skill-chart-container")}>
                <div className={cx("skill-chart-title")}>Skill Chart Distribution</div>
                <SkillRadarChart domains={currentData?.domains} skillsData={currentData?.skills} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewExam;
