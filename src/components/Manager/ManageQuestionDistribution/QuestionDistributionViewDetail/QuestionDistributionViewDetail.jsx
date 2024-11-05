import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import EditTableViewEdit from "../EditTableViewEdit";
import styles from "./QuestionDistributionViewDetail.module.scss";

const cx = classNames.bind(styles);

function QuestionDistributionViewDetail({
  fetchExamScoreList,
  viewScoreDetailData,
  setIsShowViewDetailScore,
}) {
  const [dataSource, setDataSource] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);

  useEffect(() => {
    // Check if `domainDistributionConfig` is available
    if (!viewScoreDetailData?.domainDistributionConfig) return;

    // Map all items into the dataSource directly
    const allScores = viewScoreDetailData.domainDistributionConfig.map((config) => ({
      id: config.id,
      section: config.section.name,
      domain: config.domain,
      percentage: config.percentage,
      minQuestion: config.minQuestion,
      maxQuestion: config.maxQuestion,
    }));

    setDataSource(allScores);
  }, [viewScoreDetailData]);

  const handleUpdateRow = (updatedRow) => {
    const updatedData = dataSource.map((row) =>
      row.id === updatedRow.id ? updatedRow : row
    );
    setDataSource(updatedData);
  };

  const handleEditExamScoreDetail = async () => {
    try {
      await apiClient.patch("/exam-score-details", updatedRows);
      setIsShowViewDetailScore(false);
      fetchExamScoreList();
    } catch (error) {
      console.error("Error when updating exam score details:", error);
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
          <div className={cx("question-distribution-title")}>
            {viewScoreDetailData?.title}
          </div>
        </div>
        <div className={cx("question-distribution-create-view-content")}>
          <EditTableViewEdit
            dataSource={dataSource}
            setDataSource={(updatedData) => setDataSource(updatedData)}
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
