import classNames from "classnames/bind";
import { formatDate } from "~/utils/formatDate";
import styles from "./QuestionDistributionItem.module.scss";

const cx = classNames.bind(styles);

function QuestionDistributionItem({
  examScore,
  index,
  setViewScoreDetailData,
  setIsShowViewDetailScore,
}) {
  const handleClickViewDetailScore = () => {
    setViewScoreDetailData(examScore);
    setIsShowViewDetailScore(true);
  };
  return (
    <div className={cx("question-distribution-item-container")}>
      <div className={cx("question-distribution-item-header")}>
        <div className={cx("header-infor")}>
          <div className={cx("number")}>{index}</div>
          <div className={cx("exam-title")}>{examScore?.title}</div>
        </div>
        <button
          className={cx("view-detail-btn")}
          onClick={handleClickViewDetailScore}
        >
          <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
        </button>
      </div>
      <div className={cx("question-distribution-item-content")}>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-pen"></i>
          </div>
          <div className={cx("type-title")}>Time: </div>
          <div className={cx("type-text")}>
            {examScore?.time}
          </div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-timer"></i>
          </div>
          <div className={cx("type-title")}>Created at: </div>
          <div className={cx("type-text")}>
            {formatDate(examScore?.createdat)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionDistributionItem;
