import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./UnitArea.module.scss";
const cx = classNames.bind(styles);
function UnitAreaLearnItem({ lesson, learningContent, activeUnit, unitArea, sectionId }) {
  const navigate = useNavigate();
  const handleChooseLesson = () => {
    const formattedTitle = activeUnit.unitTitle
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    navigate(`/learning/${learningContent}/${sectionId}:${formattedTitle}/${unitArea.unitAreaProgressId}/${lesson.lessonId}`);
  }
  return (
    <div className={cx("learn-item")} onClick={handleChooseLesson}>
      <div className={cx("learn-item-icon")}>
        <i className={cx("fa-sharp fa-regular fa-file", "icon")}></i>
      </div>
      <div className={cx("learn-item-title")}>{lesson?.lessonTitle}</div>
    </div>
  );
}

export default UnitAreaLearnItem;
