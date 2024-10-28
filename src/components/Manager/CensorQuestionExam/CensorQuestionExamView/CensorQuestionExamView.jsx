import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { formatDate } from "~/utils/formatDate";
import styles from "./CensorQuestionExamView.module.scss";
const cx = classNames.bind(styles);
function CensorQuestionExamView({
  questionCensorData,
  setIsShowCensorQuestionView,
}) {
  console.log(questionCensorData);
  
  return (
    <div className={cx("censor-question-exam-view-wrapper")}>
      <div className={cx("censor-question-exam-view-container")}>
        <div className={cx("censor-question-exam-view-header")}>
          <div
            className={cx("censor-back")}
            onClick={() => setIsShowCensorQuestionView(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("censor-title")}>Censor Question</div>
          <div className={cx("censor-date")}>{formatDate(Date.now())}</div>
        </div>
      </div>
    </div>
  );
}

CensorQuestionExamView.propTypes = {
  questionCensorData: PropTypes.object,
  setIsShowCensorQuestionView: PropTypes.func,
};

export default CensorQuestionExamView;
