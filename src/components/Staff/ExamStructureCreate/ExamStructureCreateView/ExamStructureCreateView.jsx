import classNames from "classnames/bind";
import styles from "./ExamStructureCreateView.module.scss";
const cx = classNames.bind(styles);

function ExamStructureCreateView({ setIsShowExamStructureCreateView }) {
  return (
    <div className={cx("exam-structure-create-view-wrapper")}>
      <div className={cx("exam-structure-create-view-container")}>
        <div className={cx("exam-structure-create-view-header")}>
          <div
            className={cx("structure-close")}
            onClick={() => setIsShowExamStructureCreateView(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("structure-title")}>Create Exam Structure</div>
          <div className={cx("structure-empty")}></div>
        </div>
      </div>
    </div>
  );
}

export default ExamStructureCreateView;
