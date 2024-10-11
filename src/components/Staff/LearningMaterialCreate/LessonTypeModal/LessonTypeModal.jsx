import classNames from "classnames/bind"
import styles from "./LessonTypeModal.module.scss"
const cx = classNames.bind(styles)

function LessonTypeModal() {
  return (
    <div className={cx("lesson-type-modal-wrapper")}> 
      <div className={cx("lesson-type-modal-container")}></div>
    </div>
  )
}

export default LessonTypeModal
