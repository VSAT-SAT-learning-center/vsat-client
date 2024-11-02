import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import TableViewScore from "~/components/Staff/ExamScoreCreate/TableViewScore";
import styles from "./ViewTableScore.module.scss";
const cx = classNames.bind(styles);

function ViewTableScore({ viewScoreDetailData, setIsShowScoreDetail }) {
  console.log(viewScoreDetailData);
  const [dataSource, setDataSource] = useState([]);
  const [rwData, setRwData] = useState([]);
  const [mathData, setMathData] = useState([]);
  const [section, setSection] = useState("Reading & Writing");
  useEffect(() => {
    if (!viewScoreDetailData?.examScoreDetails) return;

    const { rwScores, mathScores } =
      viewScoreDetailData.examScoreDetails.reduce(
        (acc, score) => {
          const formattedScore = {
            id: score.id,
            section: score.section.name,
            rawscore: score.rawscore,
            lowerscore: score.lowerscore,
            upperscore: score.upperscore,
          };

          if (score.section.name === "Reading & Writing") {
            acc.rwScores.push(formattedScore);
          } else if (score.section.name === "Math") {
            acc.mathScores.push(formattedScore);
          }

          return acc;
        },
        { rwScores: [], mathScores: [] }
      );
    setDataSource(rwScores);
    setRwData(rwScores);
    setMathData(mathScores);
  }, [viewScoreDetailData]);
  const loadDataBySection = (selectedSection) => {
    setSection(selectedSection);
    setDataSource(selectedSection === "Reading & Writing" ? rwData : mathData);
  };
  return (
    <div className={cx("exam-score-create-view-wrapper")}>
      <div className={cx("exam-score-create-view-container")}>
        <div className={cx("exam-score-create-view-header")}>
          <div
            className={cx("exam-score-back")}
            onClick={() => setIsShowScoreDetail(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("exam-score-title")}>
            {viewScoreDetailData?.title}
          </div>
          <div className={cx("exam-score-type")}>
            {/* {viewScoreDetailData?.type} */}
          </div>
        </div>
        <div className={cx("exam-score-create-view-content")}>
          <div className={cx("exam-score-options")}>
            <button
              className={cx("option-btn", {
                "active-btn": section === "Reading & Writing",
              })}
              onClick={() => loadDataBySection("Reading & Writing")}
            >
              Reading & Writing
            </button>
            <button
              className={cx("option-btn", {
                "active-btn": section === "Math",
              })}
              onClick={() => loadDataBySection("Math")}
            >
              Math
            </button>
          </div>
          <TableViewScore dataSource={dataSource} />
        </div>
        <div className={cx("exam-score-create-view-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setIsShowScoreDetail(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewTableScore;
