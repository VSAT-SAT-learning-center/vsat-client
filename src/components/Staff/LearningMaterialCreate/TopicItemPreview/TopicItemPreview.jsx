import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LessonItem from "../LessonItem";
import LessonItemPreview from "../LessonItemPreview";
import styles from "./TopicItemPreview.module.scss";
const cx = classNames.bind(styles);
function TopicItemPreview({ id, setTopics, onCancel, setIsShowLessonTypeModal }) {
  const [topicTitle, setTopicTitle] = useState("New topic");
  const [lessons, setLessons] = useState([]);
  const [isShowCreateLesson, setIsShowCreateLesson] = useState(false);

  const handleClickCreateNewLesson = () => {
    // setIsShowLessonTypeModal(true)
    setIsShowCreateLesson(true);
  };

  const handleChangeTopicTitle = (e) => {
    setTopicTitle(e.target.value);
  };

  const handleCreateNewTopic = () => {
    const newTopic = {
      id: uuidv4(),
      title: topicTitle,
      lessons: lessons,
    };
    setTopics((prevTopics) => [...prevTopics, newTopic]);
    onCancel(id);
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
              onChange={handleChangeTopicTitle}
            />
          </div>
          <div className={cx("topic-title-config")}>
            <div className={cx("cancel-action")} onClick={() => onCancel(id)}>
              <div className={cx("action-text")}>Cancel</div>
            </div>
            <div className={cx("save-action")} onClick={handleCreateNewTopic}>
              <div className={cx("action-text")}>Save</div>
            </div>
          </div>
        </div>
        <div className={cx("topic-main-content")}>
          <div className={cx("lesson-create-content")}>
            {lessons.map((lesson) => (
              <LessonItem key={lesson.id} lesson={lesson} />
            ))}
          </div>
          {isShowCreateLesson && (
            <div className={cx("lesson-content-preview")}>
              <LessonItemPreview
                type="create"
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
  setTopics: PropTypes.func,
  id: PropTypes.string,
  onCancel: PropTypes.func,
  setIsShowLessonTypeModal: PropTypes.func,
};

export default TopicItemPreview;
