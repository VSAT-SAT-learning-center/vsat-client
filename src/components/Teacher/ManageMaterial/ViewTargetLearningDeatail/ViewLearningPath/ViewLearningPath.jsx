import classNames from "classnames/bind";
import { useState } from "react";
import EditLearningPathModal from "./EditLearningPathModal";
import styles from "./ViewLearningPath.module.scss";
const cx = classNames.bind(styles);

function ViewLearningPath({ setIsShowViewTargetLearning }) {
  const [isShowEditLearningPath, setIsShowEditLearningPath] = useState(false)
  return (
    <>
      {isShowEditLearningPath && <EditLearningPathModal setIsShowEditLearningPath={setIsShowEditLearningPath} />}
      <div className={cx("view-learning-path-wrapper")}>
        <div className={cx("view-learning-path-container")}>
          <div className={cx("view-learing-path-item-container")}>
            <div className={cx("learning-path-title")}>
              Learning path for Reading and Writing
            </div>
            <div className={cx("learning-path-list")}>
              <div className={cx("learning-path-item")}>
                <div className={cx("item-header")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-book")}></i>
                  </div>
                  <div className={cx("item-title")}>
                    <div className={cx("title")}>Unit 1</div>
                    <button className={cx("edit-btn")} onClick={() => setIsShowEditLearningPath(true)}>
                      <i className={cx("fa-regular fa-pen-to-square")}></i>
                    </button>
                  </div>
                </div>
                <div className={cx("item-content")}>
                  <div className={cx("item-name")}>
                    <div className={cx("name-icon")}>
                      <i className={cx("fa-regular fa-pen")}></i>
                    </div>
                    <div className={cx("name-text")}>Informations and Ideas</div>
                  </div>
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
          <div className={cx("view-learing-path-item-container")}>
            <div className={cx("learning-path-title")}>
              Learning path for Reading and Writing
            </div>
            <div className={cx("learning-path-list")}>
              <div className={cx("learning-path-item")}>
                <div className={cx("item-header")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-book")}></i>
                  </div>
                  <div className={cx("item-title")}>
                    <div className={cx("title")}>Unit 1</div>
                    <button className={cx("edit-btn")}>
                      <i className={cx("fa-regular fa-pen-to-square")}></i>
                    </button>
                  </div>
                </div>
                <div className={cx("item-content")}>
                  <div className={cx("item-name")}>
                    <div className={cx("name-icon")}>
                      <i className={cx("fa-regular fa-pen")}></i>
                    </div>
                    <div className={cx("name-text")}>Informations and Ideas</div>
                  </div>
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
        <div className={cx("view-learning-path-footer")}>
          <button className={cx("cancel-btn")} onClick={() => setIsShowViewTargetLearning(false)}>Cancel</button>
          <button className={cx("save-btn")}>Save</button>
        </div>
      </div>
    </>
  );
}

export default ViewLearningPath;
