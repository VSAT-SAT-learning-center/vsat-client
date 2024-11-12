import classNames from "classnames/bind";
import styles from "./DirectionModal.module.scss";
const cx = classNames.bind(styles);
function DirectionModal({ setIsShowDirection }) {
  return (
    <div className={cx("direction-modal-wrapper")}>
      <div className={cx("direction-modal-container")}>
        <div className={cx("direction-modal-content")}>
          <div className={cx("content-infor")}>
            The questions in this section test your reading and writing skills.
            Every question contains one or more passages and possibly additional
            information such as tables and graphs. Read each question carefully
            and select the best answer.
          </div>
          <div className={cx("content-infor")}>
            Every question is multiple-choice with four choices, and each
            question has a single best answer.
          </div>
        </div>
        <div className={cx("direction-modal-footer")}>
          <button
            className={cx("close-btn")}
            onClick={() => setIsShowDirection(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DirectionModal;
