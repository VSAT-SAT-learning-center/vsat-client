import classNames from "classnames/bind";
import styles from "./EditLearningMaterialView.module.scss";
const cx = classNames.bind(styles);

function EditLearningMaterialView({ unitEdit, setShowMaterialEdit }) {
  console.log(unitEdit);
  return (
    <div className={cx("edit-learning-material-view-wrapper")}>
      <div className={cx("edit-learning-material-view-container")}>
        <div className={cx("edit-learning-material-view-header")}>
          <div className={cx("header-left")}>
            <div
              className={cx("view-back")}
              onClick={() => setShowMaterialEdit(false)}
            >
              <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
            </div>
            <div className={cx("view-title")}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLearningMaterialView
