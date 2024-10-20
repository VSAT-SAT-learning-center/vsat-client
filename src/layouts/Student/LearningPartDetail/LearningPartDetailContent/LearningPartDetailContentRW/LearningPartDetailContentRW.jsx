import classNames from "classnames/bind";
import PropTypes from "prop-types";
import LessonApp from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonApp";
import LessonConc from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonConc";
import LessonDef from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonDef";
import LessonPrac from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonPrac";
import LessonTips from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonTips";
import styles from "./LearningPartDetailContentRW.module.scss";
const cx = classNames.bind(styles);
function LearningPartDetailContentRW({ lesson }) {
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
          {lesson.lessonContents.length > 0 &&
            lesson.lessonContents.map((lessonContent) => (
              <div key={lessonContent.id}>
                {lessonContent.contentType === "Definition" && <LessonDef lessonContent={lessonContent} />}
                {lessonContent.contentType === "Conceptual" && <LessonConc lessonContent={lessonContent} />}
                {lessonContent.contentType === "Application" && <LessonApp lessonContent={lessonContent} />}
                {lessonContent.contentType === "Tips & Tricks" && <LessonTips lessonContent={lessonContent} />}
                {lessonContent.contentType === "Practice" && <LessonPrac lessonContent={lessonContent} />}
              </div>
            ))}
        </div>
      </div>

    </div>
  );
}

LearningPartDetailContentRW.propTypes = {
  lesson: PropTypes.object,
};

export default LearningPartDetailContentRW;
