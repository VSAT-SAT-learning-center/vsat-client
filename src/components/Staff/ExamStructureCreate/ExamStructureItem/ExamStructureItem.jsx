import classNames from "classnames/bind";
import { formatDate } from "~/utils/formatDate";
import styles from "./ExamStructureItem.module.scss";
const cx = classNames.bind(styles);
function ExamStructureItem({
  index,
  structureItem,
  setIsShowExamStructureViewDetail,
  setViewStructureDeatailData,
}) {
  const handleClickViewDetailStructure = () => {
    setIsShowExamStructureViewDetail(true);
    setViewStructureDeatailData(structureItem);
  };
  return (
    <div className={cx("exam-structure-item-container")}>
      <div className={cx("exam-structure-item-header")}>
        <div className={cx("header-infor")}>
          <div className={cx("number")}>{index}</div>
          <div className={cx("exam-title")}>{structureItem?.structurename}</div>
        </div>
        <button
          className={cx("view-detail-btn")}
          onClick={handleClickViewDetailStructure}
        >
          <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
        </button>
      </div>
      <div className={cx("exam-structure-item-content")}>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-pen"></i>
          </div>
          <div className={cx("type-title")}>Description:</div>
          <div className={cx("type-text")}>{structureItem?.description}</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-pen"></i>
          </div>
          <div className={cx("type-title")}>Structure:</div>
          <div className={cx("type-text")}>
            {structureItem?.examStructureType?.name}
          </div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-pen"></i>
          </div>
          <div className={cx("type-title")}>Question Distribution:</div>
          <div className={cx("type-text")}>
            {structureItem?.examSemester?.title}
          </div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-pen"></i>
          </div>
          <div className={cx("type-title")}>Score:</div>
          <div className={cx("type-text")}>
            {structureItem?.examScore.title}
          </div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-timer"></i>
          </div>
          <div className={cx("type-title")}>Created at:</div>
          <div className={cx("type-text")}>
            {formatDate(structureItem?.createdat)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamStructureItem;
