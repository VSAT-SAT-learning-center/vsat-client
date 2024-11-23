import classNames from "classnames/bind";
import TestBG from "~/assets/images/content/test-illustration.png";
import styles from "./UnitTestSummary.module.scss";
const cx = classNames.bind(styles);

function UnitTestSummary({ summaryData }) {
  return (
    <div className={cx("learing-part-unit-test-content-summary")}>
      <div className={cx("summary-container")}>
        <div className={cx("summary-statistic")}>
          <div className={cx("statistic-content")}>
            <div className={cx("item")}>
              <div className={cx("text")}>Leveled up:</div>
              <div className={cx("number")}>{summaryData?.skillDetails?.increasedSkills?.length} {summaryData?.skillDetails?.increasedSkills?.length > 1 ? "skills" : "skill"}</div>
            </div>
            <div className={cx("item")}>
              <div className={cx("text")}>Leveled down:</div>
              <div className={cx("number")}>{summaryData?.skillDetails?.decreasedSkills?.length} {summaryData?.skillDetails?.decreasedSkills?.length > 1 ? "skills" : "skill"}</div>
            </div>
            <div className={cx("item")}>
              <div className={cx("text")}>No change:</div>
              <div className={cx("number")}>{summaryData?.skillDetails?.unchangedSkills?.length} {summaryData?.skillDetails?.unchangedSkills?.length > 1 ? "skills" : "skill"}</div>
            </div>
            <div className={cx("number-correct")}>{summaryData?.correctAnswers}/{summaryData?.totalQuestions} correct</div>
          </div>
          <div className={cx("statistic-image")}>
            <img src={TestBG} alt="summary-image" className={cx("image")} />
          </div>
        </div>
        <div className={cx("summary-infor")}>
          <div className={cx("infor-container")}>
            <div className={cx("infor-title")}>Skill level changes</div>
            {summaryData?.skillsSummary.map((item, index) => (
              <div className={cx("infor-item")} key={index}>
                <div className={cx("skill-text")}>{item.skill.content}</div>
                {item.improvement > 0 ? (
                  <div className={cx("skill-up-change")}>
                    <div className={cx("change-icon")}>
                      <div className={cx("change-sub-icon")}></div>
                    </div>
                    <i className={cx("fa-solid fa-up-long", "icon")}></i>
                    <div className={cx("change-icon-up")}>
                      <div className={cx("change-sub-icon")}></div>
                    </div>
                  </div>
                ) : item.improvement < 0 ? (
                  <div className={cx("skill-down-change")}>
                    <div className={cx("change-icon")}>
                      <div className={cx("change-sub-icon")}></div>
                    </div>
                    <i className={cx("fa-solid fa-down-long", "icon")}></i>
                    <div className={cx("change-icon-down")}>
                      <div className={cx("change-sub-icon")}></div>
                    </div>
                  </div>
                ) : (
                  <div className={cx("skill-no-change")}>
                    <div className={cx("change-icon")}>
                      <div className={cx("change-sub-icon")}></div>
                    </div>
                    <i className={cx("fa-solid fa-right-long", "icon")}></i>
                    <div className={cx("change-icon")}>
                      <div className={cx("change-sub-icon")}></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={cx("rec-container")}>
            <div className={cx("rec-title")}>Recommended lessons</div>
            <div className={cx("rec-desc")}>We recommend the following lessons based on your test performance:</div>
            <div className={cx("rec-list")}>
              {summaryData?.recommendedLessons.map((lesson) => (
                <div key={lesson.id} className={cx("rec-item")}>{lesson.title}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitTestSummary
