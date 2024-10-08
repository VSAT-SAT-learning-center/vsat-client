import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import LearningPartContent from "~/layouts/Student/LearningPart/LearningPartContent";
import LearningPartSidebar from "~/layouts/Student/LearningPart/LearningPartSidebar";
import styles from "./LearningPart.module.scss";
const cx = classNames.bind(styles);
function LearningPart() {
  const { slug } = useParams();

  return (
    <div className={cx("learning-part-wrapper")}>
      <HeaderAuthen />
      <div className={cx("learning-part-container")}>
        <LearningPartSidebar learningContent={slug} />
        <LearningPartContent />
      </div>
    </div>
  );
}

export default LearningPart;
