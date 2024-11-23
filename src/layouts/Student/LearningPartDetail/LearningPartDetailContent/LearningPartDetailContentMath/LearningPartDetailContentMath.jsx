import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import LessonMathConc from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonMathConc";
import LessonMathDef from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonMathDef";
import LessonMathPrac from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonMathPrac";
import LessonThingsRemember from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonThingsRemember";
import apiClient from "~/services/apiService";
import styles from "./LearningPartDetailContentMath.module.scss";
const cx = classNames.bind(styles);

function LearningPartDetailContentMath({ lesson }) {
  const [sortedLessonContents, setSortedLessonContents] = useState([]);
  const [markStatus, setMarkStatus] = useState(false)

  useEffect(() => {
    if (lesson?.lessonContents) {
      const sortOrder = ["Definition", "Conceptual", "Practice", "Tips & Tricks"];
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
    } catch (error) {
      console.error("Error when mark lesson completed:", error);
    }
  }
  return (
    <div className={cx("learning-part-detail-content-math-container")}>
      <div className={cx("lesson-main-title")}>
        <div className={cx("main-title")}>{lesson?.title}</div>
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
                {lessonContent.contentType === "Definition" && <LessonMathDef lessonContent={lessonContent} />}
                {lessonContent.contentType === "Conceptual" && <LessonMathConc lessonContent={lessonContent} />}
                {lessonContent.contentType === "Practice" && <LessonMathPrac lessonContent={lessonContent} />}
                {lessonContent.contentType === "Tips & Tricks" && <LessonThingsRemember lessonContent={lessonContent} />}
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
    </div>
  );
}

LearningPartDetailContentMath.propTypes = {
  lesson: PropTypes.object,
};

export default LearningPartDetailContentMath;
