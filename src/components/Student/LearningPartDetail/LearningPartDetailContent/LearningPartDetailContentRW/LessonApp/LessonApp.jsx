import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import RWRerender from "../RWRerender";
import styles from "./LessonApp.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

function LessonApp({ lessonContent }) {
  const sanitizedContent = DOMPurify.sanitize(lessonContent?.contents[0].text);
  return (
    <div className={cx("lesson-content-app")}>
      <div className={cx("app-title")}>
        {lessonContent?.title}
      </div>
      <RWRerender loadedContent={sanitizedContent} />
    </div>
  );
}

LessonApp.propTypes = {
  lessonContent: PropTypes.object,
};

export default LessonApp;
