import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import LessonItemPreview from "../LessonItemPreview";
import styles from "./TopicItemPreview.module.scss";
import { v4 as uuidv4 } from "uuid";
const cx = classNames.bind(styles);
function TopicItemPreview({ setTopics, setIsShowCreateTopicMain }) {
  const [isShowCreateLesson, setIsShowCreateLesson] = useState(false);
  const [lessons, setLessons] = useState([]);

  const handleClickCreateNewLesson = () => {
    setIsShowCreateLesson(true);
  };

  const handleCreateNewTopic = () => {
    const newTopic = {
      id: uuidv4(),
      title: "Command of Evidence: Textual",
      lessons: lessons,
    };

    console.log(newTopic);
    setTopics((prevTopics) => [...prevTopics, newTopic]);
    setIsShowCreateTopicMain(false);
  };

  return (
    <div className={cx("topic-item-container")}>
      <div className={cx("topic-drag-handle")}>
        <div className={cx("handle-icon")}>
          <i
            className={cx("fa-sharp fa-solid fa-grip-dots-vertical", "icon")}
          ></i>
        </div>
      </div>
      <div className={cx("topic-content")}>
        <div className={cx("topic-title-content")}>
          <div className={cx("topic-title-input")}>
            <input
              type="text"
              placeholder="New topic"
              autoFocus={true}
              className={cx("title-input")}
            />
          </div>
          <div className={cx("topic-title-config")}>
            <div
              className={cx("cancel-action")}
              onClick={() => setIsShowCreateTopicMain(false)}
            >
              <div className={cx("action-text")}>Cancel</div>
            </div>
            <div className={cx("save-action")} onClick={handleCreateNewTopic}>
              <div className={cx("action-text")}>Save</div>
            </div>
          </div>
        </div>
        <div className={cx("topic-main-content")}>
          {isShowCreateLesson && (
            <div className={cx("lesson-content-preview")}>
              <LessonItemPreview
                setLessons={setLessons}
                setIsShowCreateLesson={setIsShowCreateLesson}
              />
            </div>
          )}
          <div className={cx("new-lesson-container")}>
            <div
              className={cx("new-lesson-action")}
              onClick={handleClickCreateNewLesson}
            >
              <i className={cx("fa-regular fa-square-plus", "action-icon")}></i>
              <div className={cx("action-text")}>New lesson</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TopicItemPreview.propTypes = {
  setTopics: PropTypes.func.isRequired,
  setIsShowCreateTopicMain: PropTypes.func.isRequired,
};

export default TopicItemPreview;
