import classNames from "classnames/bind";
import styles from "./EditLearningPathModal.module.scss";
const cx = classNames.bind(styles);

function EditLearningPathModal({ setIsShowEditLearningPath }) {
  return (
    <div className={cx("edit-learning-path-wrapper")}>
      <div className={cx("edit-learning-path-container")}>
        <div className={cx("edit-learning-path-header")}>
          <div
            className={cx("edit-close")}
            onClick={() => setIsShowEditLearningPath(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("edit-title")}>Edit Learning Path</div>
          <div className={cx("edit-empty")}></div>
        </div>
        <div className={cx("edit-learning-path-content")}>
          <div className={cx("edit-learning-path-item")}>
            <div className={cx("item-header")}>
              <div className={cx("item-icon")}>
                <i className={cx("fa-regular fa-book")}></i>
              </div>
              <div className={cx("item-title")}>
                <div className={cx("title")}>Informations and Ideas sadasd asdasdas asdsad dasdasd</div>
              </div>
            </div>
            <div className={cx("item-content")}>
              <div className={cx("item-level")}>
                <div className={cx("name-icon")}>
                  <i className={cx("fa-regular fa-layer-group")}></i>
                </div>
                <div className={cx("name-text")}>Foundation</div>
              </div>
              <div className={cx("item-number")}>
                <div className={cx("item-count")}>
                  <div className={cx("name-icon")}>
                    <i className={cx("fa-regular fa-book-open")}></i>
                  </div>
                  <div className={cx("name-text")}>5 Topics</div>
                </div>
                <div className={cx("item-count")}>
                  <div className={cx("name-icon")}>
                    <i className={cx("fa-light fa-file-pen")}></i>
                  </div>
                  <div className={cx("name-text")}>6 Lessons</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLearningPathModal;
