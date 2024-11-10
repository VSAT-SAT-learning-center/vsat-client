import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import RWRerender from "../RWRerender";
import styles from "./LessonConc.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

function LessonConc({ lessonContent }) {
  const sanitizedContent = DOMPurify.sanitize(lessonContent?.contents[0].text);
  return (
    <div className={cx("lesson-content-conc")}>
      <div className={cx("conc-title")}>
        {lessonContent?.title}
      </div>
      <RWRerender loadedContent={sanitizedContent} />
    </div>
  );
}

LessonConc.propTypes = {
  lessonContent: PropTypes.object,
};

export default LessonConc;
