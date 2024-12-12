import classNames from "classnames/bind";
import apiClient from "~/services/apiService";
import EditableTable from "../EditableTable";
import styles from "./QuestionDistributionCreateView.module.scss";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

function QuestionDistributionCreateView({
  dataSource,
  examTitle,
  examTime,
  setDataSource,
  setIsShowExamScoreResult,
  setIsShowCreateExamScoreModal,
  fetchExamScoreList,
}) {

  const handleSaveExamScore = async () => {
    const mergedData = dataSource.map((item) => ({
      title: examTitle,
      domain: item.domain,
      minQuestion: item.minQuestion,
      maxQuestion: item.maxQuestion,
      percent: item.percentage,
    }));
  
    const examScoreData = {
      title: examTitle,
      time: examTime,
      domainDistributionConfig: mergedData,
    };
    try {
      await apiClient.post("/exam-semester/import-file", examScoreData);
      fetchExamScoreList();
      setIsShowCreateExamScoreModal(false);
      setIsShowExamScoreResult(false);
      toast.success("Create question distribution successfully!");
    } catch (error) {
      console.error("Error creating exam score:", error);
    }
  };
  

  return (
    <div className={cx("question-distribution-create-view-wrapper")}>
      <div className={cx("question-distribution-create-view-container")}>
        <div className={cx("question-distribution-create-view-header")}>
          <div
            className={cx("question-distribution-back")}
            onClick={() => setIsShowExamScoreResult(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("question-distribution-title")}>{examTitle}</div>
          <div className={cx("question-distribution-type")}></div>
        </div>
        <div className={cx("question-distribution-create-view-content")}>
          <EditableTable
            dataSource={dataSource}
            setDataSource={setDataSource}
          />
        </div>
        <div className={cx("question-distribution-create-view-footer")}>
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

export default QuestionDistributionCreateView;
