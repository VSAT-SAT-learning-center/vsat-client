import classNames from "classnames/bind";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import LearningPartDetailContent from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent";
import LearningPartDetailSidebar from "~/layouts/Student/LearningPartDetail/LearningPartDetailSidebar";
import styles from "./LearningPartDetail.module.scss";
const cx = classNames.bind(styles);

function LearningPartDetail() {
  return (
    <div className={cx("learning-part-detail-wrapper")}>
      <HeaderAuthen />
      <div className={cx("learning-part-detail-container")}>
        <LearningPartDetailSidebar />
        <LearningPartDetailContent />
      </div>
    </div>
  )
}

export default LearningPartDetail
