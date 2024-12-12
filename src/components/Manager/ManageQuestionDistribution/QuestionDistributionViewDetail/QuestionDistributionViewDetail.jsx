import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import EditTableViewEdit from "../EditTableViewEdit";
import styles from "./QuestionDistributionViewDetail.module.scss";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function QuestionDistributionViewDetail({
  fetchExamScoreList,
  viewScoreDetailData,
  setIsShowViewDetailScore,
}) {
  const [combinedData, setCombinedData] = useState([]); // Combined data for both sections
  const [updatedRows, setUpdatedRows] = useState([]);

  useEffect(() => {
    if (viewScoreDetailData?.domainDistributionConfig) {
      const allScores = viewScoreDetailData.domainDistributionConfig.map((score) => ({
        id: score.id,
        section: score.section.name,
        domain: score.domain,
        percentage: score.percentage,
        minQuestion: score.minQuestion,
        maxQuestion: score.maxQuestion,
      }));
      setCombinedData(allScores);
    } else {
      toast.error("There is no data distribution to display!", {
        autoClose: 1500,
      });
    }
  }, [viewScoreDetailData]);

  const handleUpdateRow = (updatedRow) => {
    const cleanedRow = {
      id: updatedRow.id,
      domain: updatedRow.domain,
      percentage: updatedRow.percentage,
      minQuestion: typeof updatedRow.minQuestion === "string" ? parseInt(updatedRow.minQuestion, 10) : updatedRow.minQuestion,
      maxQuestion: typeof updatedRow.maxQuestion === "string" ? parseInt(updatedRow.maxQuestion, 10) : updatedRow.maxQuestion,
    };

    const updatedData = combinedData.map((row) =>
      row.id === updatedRow.id ? { ...row, ...cleanedRow } : row
    );
    setCombinedData(updatedData);

    setUpdatedRows((prevRows) => {
      const index = prevRows.findIndex((row) => row.id === updatedRow.id);
      if (index > -1) {
        prevRows[index] = cleanedRow;
        return [...prevRows];
      } else {
        return [...prevRows, cleanedRow];
      }
    });
  };

  const handleEditExamScoreDetail = async () => {
    console.log(updatedRows);
    try {
      await apiClient.patch("/domain-distribution-config", updatedRows);
      setIsShowViewDetailScore(false);
      fetchExamScoreList();
      toast.success("Update question distribution successfully!", {
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error when updating question distribution detail: " + error);
    }
  };

  return (
    <div className={cx("question-distribution-create-view-wrapper")}>
      <div className={cx("question-distribution-create-view-container")}>
        <div className={cx("question-distribution-create-view-header")}>
          <div
            className={cx("question-distribution-back")}
            onClick={() => setIsShowViewDetailScore(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("question-distribution-create-view-title")}>{viewScoreDetailData?.title}</div>
          <div className={cx("exam-score-type")}></div>
        </div>
        <div className={cx("question-distribution-create-view-content")}>
          <EditTableViewEdit
            dataSource={combinedData}
            setDataSource={(updatedData) => setCombinedData(updatedData)}
            handleUpdateRow={handleUpdateRow}
            setUpdatedRows={setUpdatedRows}
          />
        </div>
        <div className={cx("question-distribution-create-view-footer")}>
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

export default QuestionDistributionViewDetail;
