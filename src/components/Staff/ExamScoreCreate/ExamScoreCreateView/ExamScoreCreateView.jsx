import classNames from "classnames/bind";
import { useState } from "react";
import apiClient from "~/services/apiService";
import EditableTable from "../EditableTable";
import styles from "./ExamScoreCreateView.module.scss";
const cx = classNames.bind(styles);
function ExamScoreCreateView({
  dataSource,
  rwData,
  mathData,
  examTitle,
  examType,
  setDataSource,
  setIsShowExamScoreResult,
  setIsShowCreateExamScoreModal,
  fetchExamScoreList,
}) {
  const [section, setSection] = useState("Reading & Writing");
  const loadDataBySection = (selectedSection) => {
    setSection(selectedSection);
    setDataSource(selectedSection === "Reading & Writing" ? rwData : mathData);
  };

  const handleSaveExamScore = async () => {
    const mergedData = [...rwData, ...mathData];
    const examScoreData = {
      title: examTitle,
      type: examType,
      createExamScoreDetail: mergedData,
    };
    try {
      await apiClient.post("/exam-scores", examScoreData);
      fetchExamScoreList();
      setIsShowCreateExamScoreModal(false);
      setIsShowExamScoreResult(false);
    } catch (error) {
      console.error("Error creating exam score:", error);
    }
  };
  return (
    <div className={cx("exam-score-create-view-wrapper")}>
      <div className={cx("exam-score-create-view-container")}>
        <div className={cx("exam-score-create-view-header")}>
          <div
            className={cx("exam-score-back")}
            onClick={() => setIsShowExamScoreResult(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("exam-score-title")}>{examTitle}</div>
          <div className={cx("exam-score-type")}>{examType}</div>
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
              className={cx("option-btn", { "active-btn": section === "Math" })}
              onClick={() => loadDataBySection("Math")}
            >
              Math
            </button>
          </div>
          <EditableTable
            dataSource={dataSource}
            setDataSource={setDataSource}
          />
        </div>
        <div className={cx("exam-score-create-view-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setIsShowExamScoreResult(false)}
          >
            Cancel
          </button>
          <button className={cx("edit-btn")} onClick={handleSaveExamScore}>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamScoreCreateView;
