import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./ErrorQuestionView.module.scss";
const cx = classNames.bind(styles);
function ErrorQuestionView({ questionListError, setIsShowQuestionListError }) {
  console.log(questionListError);
  return (
    <div className={cx("error-question-wrapper")}>
      <div className={cx("error-question-container")}>
        <div className={cx("error-question-header")}>
          <div
            className={cx("error-back")}
            onClick={() => setIsShowQuestionListError(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("error-title")}>Error Questions</div>
          <div className={cx("error-empty")}></div>
        </div>
        <div className={cx("error-question-content")}>
          {questionListError?.map((item, index) => (
            <div className={cx("question-error-item")} key={index}>
              <div className={cx("question-error-header")}>
                <i
                  className={cx(
                    "fa-regular fa-circle-exclamation",
                    "error-icon"
                  )}
                ></i>
                <span className={cx("error-title")}>Question Error: </span>
                <span className={cx("error-text")}>{item?.message}</span>
              </div>
              <div className={cx("question-error-main")}>
                <div className={cx("question-content-main")}>
                  <div className={cx("question-number")}>{index + 1}</div>
                  <div
                    className={cx("question-content")}
                    dangerouslySetInnerHTML={{
                      __html: renderMathAndText(item?.question.content),
                    }}
                  />
                </div>
              </div>
              <div className={cx("question-error-answers")}>
                {item?.question.answers.length > 0 &&
                  item?.question.answers.map((answer, index) => (
                    <div
                      className={cx("question-error-answer-item")}
                      key={index}
                    >
                      <span className={cx("answer-label")}>
                        {String.fromCharCode(65 + index) + ":"}
                      </span>
                      <span
                        className={cx("answer-renderer-content")}
                        dangerouslySetInnerHTML={{
                          __html: renderMathAndText(answer?.text),
                        }}
                      ></span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ErrorQuestionView.propTypes = {
  questionListError: PropTypes.array,
  setIsShowQuestionListError: PropTypes.func,
};

export default ErrorQuestionView;
