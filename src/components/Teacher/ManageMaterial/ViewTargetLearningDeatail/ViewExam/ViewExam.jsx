import classNames from "classnames/bind";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import ProgressBarDomain from "./ProgressBarDomain";
import styles from "./ViewExam.module.scss";
const cx = classNames.bind(styles);

function ViewExam() {
  const currentScore = 450;
  const [navStatistic, setNavStatistic] = useState("RW");
  return (
    <div className={cx("view-exam-container")}>
      <div className={cx("score-summary-wrapper")}>
        <div className={cx("score-summary-container")}>
          <div className={cx("score-summary-header")}>
            <div className={cx("score-summary-text")}>Score Summary</div>
          </div>
          <div className={cx("score-summary-content")}>
            <div className={cx("total-score")}>
              Total Score is:{" "}
              <span className={cx("score")}>{currentScore}</span>
            </div>
            <div className={cx("score-part-container")}>
              <div className={cx("score-part-item")}>
                <div className={cx("part-title")}>Reading and Writing</div>
                <div className={cx("part-score")}>200</div>
                <ProgressBar currentScore={currentScore} />
              </div>
              <div className={cx("score-part-item")}>
                <div className={cx("part-title")}>Math</div>
                <div className={cx("part-score")}>200</div>
                <ProgressBar currentScore={currentScore} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("score-statistics-wrapper")}>
        <div className={cx("score-statistics-nav")}>
          <div
            className={cx("nav-item", { active: navStatistic === "RW" })}
            onClick={() => setNavStatistic("RW")}
          >
            Reading and Writing
          </div>
          <div
            className={cx("nav-item", { active: navStatistic === "Math" })}
            onClick={() => setNavStatistic("Math")}
          >
            Math
          </div>
        </div>
        <div className={cx("score-statistic-item-container")}>
          <div className={cx("analysis-overview-container")}>
            <div className={cx("analysis-score")}>
              <div className={cx("score-title")}>Your Score</div>
              <div className={cx("score-number")}>200</div>
              <div className={cx("score-desc")}>OUT OF 800</div>
            </div>
            <div className={cx("analysis-infor")}>
              <div className={cx("analysis-overview")}>
                <div className={cx("overview-title")}>Analysis Overview</div>
                <div className={cx("overview-number")}>
                  <div className={cx("correct")}>
                    <i className={cx("fa-regular fa-check", "icon")}></i>
                    <span className={cx("number")}>2</span>
                    <span className={cx("number")}>Correct</span>
                  </div>
                  <div className={cx("incorrect")}>
                    <i className={cx("fa-regular fa-xmark", "icon")}></i>
                    <span className={cx("number")}>8 Incorrect</span>
                  </div>
                </div>
              </div>
              <ProgressBarDomain
                title="Standard English Conventions"
                correct={2}
                incorrect={8}
              />
              <ProgressBarDomain title="Algebra" correct={6} incorrect={12} />
              <ProgressBarDomain
                title="Advanced Math"
                correct={11}
                incorrect={2}
              />
              <ProgressBarDomain
                title="Geometry and Trignonometry"
                correct={8}
                incorrect={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewExam;
