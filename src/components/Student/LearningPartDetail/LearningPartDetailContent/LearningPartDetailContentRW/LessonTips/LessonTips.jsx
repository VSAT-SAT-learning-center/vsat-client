import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import RWRerender from "../RWRerender";
import styles from "./LessonTips.module.scss";
const cx = classNames.bind(styles);

function LessonTips({ lessonContent }) {
  const sanitizedContent = DOMPurify.sanitize(lessonContent?.contents[0].text);
  return (
    <div className={cx("lesson-content-tips")}>
      <div className={cx("tips-title")}>{lessonContent?.title}</div>
      <RWRerender loadedContent={sanitizedContent} />
    </div>
  );
}

LessonTips.propTypes = {
  lessonContent: PropTypes.object,
};

export default LessonTips;
