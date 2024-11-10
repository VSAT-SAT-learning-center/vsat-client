import classNames from "classnames/bind";
import TableViewDistribution from "./TableViewDistribution";
import styles from "./ViewTableDistribution.module.scss";
const cx = classNames.bind(styles);
function ViewTableDistribution({
  distributionDetailData,
  setIsShowDistributionDetail,
}) {
  return (
    <div className={cx("exam-score-create-view-wrapper")}>
      <div className={cx("exam-score-create-view-container")}>
        <div className={cx("exam-score-create-view-header")}>
          {/* <div
            className={cx("exam-score-back")}
            onClick={() => setIsShowDistributionDetail(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div> */}
          <div className={cx("exam-score-title")}>
            {distributionDetailData?.title}
          </div>
          <div className={cx("exam-score-type")}></div>
        </div>
        <div className={cx("exam-score-create-view-content")}>
          <TableViewDistribution dataSource={distributionDetailData} />
        </div>
        <div className={cx("exam-score-create-view-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setIsShowDistributionDetail(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewTableDistribution;
