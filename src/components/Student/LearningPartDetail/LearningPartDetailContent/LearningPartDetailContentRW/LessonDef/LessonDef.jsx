import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import LessonQuestion from "../LessonQuestion";
import RWRerender from "../RWRerender";
import styles from "./LessonDef.module.scss";
const cx = classNames.bind(styles);

function LessonDef({ lessonContent }) {
  const sanitizedContent = DOMPurify.sanitize(lessonContent.contents[0].text);
  return (
    <div className={cx("lesson-content-def")}>
      <div className={cx("def-title")}>
        {lessonContent?.title}
      </div>
      <RWRerender loadedContent={sanitizedContent} />
      <LessonQuestion title={lessonContent?.title} questionData={lessonContent?.question} />
    </div>
  );
}

LessonDef.propTypes = {
  lessonContent: PropTypes.object,
};

export default LessonDef;
