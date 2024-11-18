import classNames from "classnames/bind";
import styles from "./ViewLearningPath.module.scss";
const cx = classNames.bind(styles);

function ViewLearningPath() {
  return (
    <div className={cx("view-learning-path-container")}>
      View learning path
    </div>
  )
}

export default ViewLearningPath
