import classNames from "classnames/bind";
import { useState } from "react";
import ViewExam from "./ViewExam";
import ViewLearningPath from "./ViewLearningPath";
import styles from "./ViewTargetLearningDeatail.module.scss";
const cx = classNames.bind(styles);

function ViewTargetLearningDeatail({ setIsShowViewTargetLearning }) {
  const [viewNav, setViewNav] = useState("Exam");
  return (
    <div className={cx("view-target-learing-detail-wrapper")}>
      <div className={cx("view-target-learing-detail-container")}>
        <div className={cx("view-target-learing-detail-header")}>
          <div
            className={cx("target-close")}
            onClick={() => setIsShowViewTargetLearning(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("view-target-nav")}>
            <div
              className={cx("nav-item", { active: viewNav === "Exam" })}
              onClick={() => setViewNav("Exam")}
            >
              View Exam
            </div>
            <div
              className={cx("nav-item", { active: viewNav === "Learning" })}
              onClick={() => setViewNav("Learning")}
            >
              View Learning Path
            </div>
          </div>
          <div className={cx("target-empty")}></div>
        </div>
        <div className={cx("view-target-learing-detail-content")}>
          {viewNav === "Exam" ? <ViewExam /> : <ViewLearningPath />}
        </div>
      </div>
    </div>
  );
}

export default ViewTargetLearningDeatail;
