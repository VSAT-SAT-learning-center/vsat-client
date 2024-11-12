import classNames from "classnames/bind";
import { useState } from "react";
import { inforductionExams } from "~/data/TrialExam/IntroductionExam";
import ExamView from "../ExamView";
import styles from "./TakeExamView.module.scss";
const cx = classNames.bind(styles);

function TakeExamView({ exam }) {
  const [isShowExamView, setIsShowExamView] = useState(false);
  const handleNextDoExam = () => {
    setIsShowExamView(true);
  };
  return (
    <>
      {isShowExamView && <ExamView exam={exam} />}
      <div className={cx("take-exam-view-wrapper")}>
        <div className={cx("take-exam-view-container")}>
          <div className={cx("take-exam-view-content")}>
            <div className={cx("content-infor-container")}>
              <div className={cx("content-infor-title")}>Digital SAT Exam</div>
              <div className={cx("content-infor-detail")}>
                {inforductionExams.map((item) => (
                  <div className={cx("detail-item-container")} key={item.id}>
                    <div className={cx("detail-icon")}>
                      <i className={cx(item.icon)}></i>
                    </div>
                    <div className={cx("detail-infor")}>
                      <div className={cx("detail-title")}>{item.title}</div>
                      <div className={cx("detail-desc")}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={cx("take-exam-view-footer")}>
            <button className={cx("next-btn")} onClick={handleNextDoExam}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TakeExamView;
