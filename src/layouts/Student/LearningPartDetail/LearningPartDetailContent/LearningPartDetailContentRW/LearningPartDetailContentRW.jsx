import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import LessonApp from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonApp";
import LessonConc from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonConc";
import LessonDef from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonDef";
import LessonPrac from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonPrac";
import LessonTips from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonTips";
import apiClient from "~/services/apiService";
import styles from "./LearningPartDetailContentRW.module.scss";
const cx = classNames.bind(styles);
function LearningPartDetailContentRW({ lesson, fetchUnitArea }) {
  const [sortedLessonContents, setSortedLessonContents] = useState([]);
  const [markStatus, setMarkStatus] = useState(false)

  useEffect(() => {
    if (lesson?.lessonContents) {
      const sortOrder = ["Definition", "Conceptual", "Application", "Tips & Tricks", "Practice"];
      const sorted = [...lesson.lessonContents].sort(
        (a, b) => sortOrder.indexOf(a.contentType) - sortOrder.indexOf(b.contentType)
      );
      setSortedLessonContents(sorted);
    }
  }, [lesson]);

  const handleMarkLesson = async () => {
    try {
      await apiClient.patch(`/target-learnings/${lesson?.lessonpProgressId}/complete`)
      setMarkStatus(true)
      if (fetchUnitArea) {
        await fetchUnitArea();
      }
    } catch (error) {
      console.error("Error when mark lesson completed:", error);
    }
  }
  return (
    <div className={cx("learning-part-detail-content-rw-container")}>
      <div className={cx("lesson-main-title")}>
        <div className={cx("main-title")}>
          {lesson?.title}
        </div>
      </div>
      <div className={cx("lesson-guide")}>
        <div className={cx("content-guide")}>
          <div className={cx("guide-text")}>
            {`A guide to ${lesson?.title.toLowerCase()} questions on the digital SAT`}
          </div>
        </div>
      </div>
      <div className={cx("lesson-content-container")}>
        <div className={cx("lesson-content-main")}>
          {sortedLessonContents.length > 0 &&
            sortedLessonContents.map((lessonContent) => (
              <div key={lessonContent.id}>
                {lessonContent.contentType === "Definition" && <LessonDef lessonContent={lessonContent} />}
                {lessonContent.contentType === "Conceptual" && <LessonConc lessonContent={lessonContent} />}
                {lessonContent.contentType === "Application" && <LessonApp lessonContent={lessonContent} />}
                {lessonContent.contentType === "Tips & Tricks" && <LessonTips lessonContent={lessonContent} />}
                {lessonContent.contentType === "Practice" && <LessonPrac lessonContent={lessonContent} />}
              </div>
            ))}
        </div>
        <div className={cx("lesson-content-completed")}>
          {lesson?.status === "Not Started" ? (
            <button className={cx("mark-btn")} onClick={handleMarkLesson}>
              {markStatus ? (
                <>
                  <i className={cx("fa-solid fa-check")}></i>
                  <span className={cx("text")}>Completed</span>
                </>
              ) : (
                <>
                  <span className={cx("text")}>Mark as Completed</span>
                </>
              )}
            </button>
          ) : (
            <button className={cx("mark-btn")}>
              <i className={cx("fa-solid fa-check")}></i>
              <span className={cx("text")}>Completed</span>
            </button>
          )}
        </div>
      </div>
    </div >
  );
}

LearningPartDetailContentRW.propTypes = {
  lesson: PropTypes.object,
};

export default LearningPartDetailContentRW;
