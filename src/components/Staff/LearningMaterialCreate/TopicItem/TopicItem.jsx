import { Draggable, Droppable } from "@hello-pangea/dnd";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import LessonItem from "../LessonItem";
import LessonItemPreview from "../LessonItemPreview";
import styles from "./TopicItem.module.scss";
const cx = classNames.bind(styles);

function TopicItem({ topic, dragHandleProps }) {
  const [isShowCreateLesson, setIsShowCreateLesson] = useState(false);
  const handleClickCreateNewLesson = () => {
    setIsShowCreateLesson(true);
  };

  return (
    <div className={cx("topic-item-wrapper")}>
      <div className={cx("topic-item-container")}>
        <div className={cx("topic-drag-handle")} {...dragHandleProps}>
          <div className={cx("handle-icon")}>
            <i
              className={cx("fa-sharp fa-solid fa-grip-dots-vertical", "icon")}
            ></i>
          </div>
        </div>
        <div className={cx("topic-content")}>
          <div className={cx("topic-title-content")}>
            <div className={cx("topic-title-text")}>{topic.title}</div>
            <div className={cx("topic-title-config")}>
              <div className={cx("topic-title-option")}>
                <i
                  className={cx("fa-solid fa-ellipsis-vertical", "option-icon")}
                ></i>
              </div>
            </div>
          </div>
          <div className={cx("topic-main-content")}>
            <Droppable droppableId={topic.id} type="lesson">
              {(provided) => (
                <div
                  className={cx("lesson-content-container")}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {topic.lessons.map((lesson, index) => (
                    <Draggable
                      key={lesson.id}
                      draggableId={lesson.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <LessonItem
                            lesson={lesson}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {isShowCreateLesson && (
              <div className={cx("lesson-content-preview")}>
                <LessonItemPreview
                  setIsShowCreateLesson={setIsShowCreateLesson}
                />
              </div>
            )}
            <div className={cx("new-lesson-container")}>
              <div
                className={cx("new-lesson-action")}
                onClick={handleClickCreateNewLesson}
              >
                <i
                  className={cx("fa-regular fa-square-plus", "action-icon")}
                ></i>
                <div className={cx("action-text")}>New lesson</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired,
  dragHandleProps: PropTypes.object.isRequired,
};

export default TopicItem;
