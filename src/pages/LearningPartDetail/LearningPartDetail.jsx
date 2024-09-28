import classNames from "classnames/bind";
import HeaderAuthen from "../../layouts/HeaderAuthen/HeaderAuthen";
import LearningPartDetailContent from "../../layouts/LearningPartDetail/LearningPartDetailContent";
import LearningPartDetailSidebar from "../../layouts/LearningPartDetail/LearningPartDetailSidebar";
import styles from "./LearningPartDetail.module.scss";
const cx = classNames.bind(styles);

function LearningPartDetail() {
  return (
    <div className={cx("learning-part-detail-wrapper")}>
      <HeaderAuthen/>
      <div className={cx("learning-part-detail-container")}>
        <LearningPartDetailSidebar />
        <LearningPartDetailContent />
      </div>
    </div>
  )
}

export default LearningPartDetail
