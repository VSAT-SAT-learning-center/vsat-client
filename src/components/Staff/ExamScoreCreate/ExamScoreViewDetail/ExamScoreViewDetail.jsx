import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import EditTableViewEdit from "../EditTableViewEdit";
import styles from "./ExamScoreViewDetail.module.scss";
const cx = classNames.bind(styles);

function ExamScoreViewDetail({
  fetchExamScoreList,
  viewScoreDetailData,
  setIsShowViewDetailScore,
}) {
  const [dataSource, setDataSource] = useState([]);
  const [rwData, setRwData] = useState([]);
  const [mathData, setMathData] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
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

  const handleUpdateRow = (updatedRow) => {
    if (section === "Reading & Writing") {
      const updatedData = rwData.map((row) =>
        row.id === updatedRow.id ? updatedRow : row
      );
      setRwData(updatedData);
      setDataSource(updatedData);
    } else if (section === "Math") {
      const updatedData = mathData.map((row) =>
        row.id === updatedRow.id ? updatedRow : row
      );
      setMathData(updatedData);
      setDataSource(updatedData);
    }
  };

  const handleEditExamScoreDetail = async () => {
    console.log(updatedRows);
    try {
      await apiClient.patch("/exam-score-details", updatedRows);
      setIsShowViewDetailScore(false);
      fetchExamScoreList();
    } catch (error) {
      console.error("Error when update exam score detail: " + error);
    }
  };
  return (
    <div className={cx("exam-score-create-view-wrapper")}>
      <div className={cx("exam-score-create-view-container")}>
        <div className={cx("exam-score-create-view-header")}>
          <div
            className={cx("exam-score-back")}
            onClick={() => setIsShowViewDetailScore(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("exam-score-title")}>
            {viewScoreDetailData?.title}
          </div>
          <div className={cx("exam-score-type")}>
            {viewScoreDetailData?.examStructureType.name}
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
          <EditTableViewEdit
            dataSource={dataSource}
            setDataSource={(updatedData) => setDataSource(updatedData)}
            handleUpdateRow={handleUpdateRow}
            setUpdatedRows={setUpdatedRows}
          />
        </div>
        <div className={cx("exam-score-create-view-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setIsShowViewDetailScore(false)}
          >
            Cancel
          </button>
          <button
            className={cx("edit-btn")}
            onClick={handleEditExamScoreDetail}
          >
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamScoreViewDetail;
