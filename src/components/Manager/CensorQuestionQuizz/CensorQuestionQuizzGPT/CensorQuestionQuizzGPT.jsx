import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { renderMathAndTextV2 } from "~/utils/renderMathAndTextV2";
import styles from "./CensorQuestionQuizzGPT.module.scss";
const cx = classNames.bind(styles);

function CensorQuestionQuizzGPT({ dataCensorWithAI, setIsShowCensorGpt }) {
  return (
    <div className={cx("censor-question-exam-gpt-wrapper")}>
      <div className={cx("censor-question-exam-gpt-container")}>
        <div className={cx("censor-question-exam-gpt-header")}>
          <div
            className={cx("censor-back")}
            onClick={() => setIsShowCensorGpt(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("censor-title")}>Censor with AI</div>
          <div className={cx("censor-empty")}></div>
        </div>
        <div className={cx("censor-question-exam-gpt-content")}>
          <div className={cx("censor-overview-general")}>
            <div className={cx("overview-content-title")}>
              <div className={cx("number")}>1</div>
              <div className={cx("overview-title-text")}>Question Overivew</div>
            </div>
            <div className={cx("overview-content-container")}>
              <div className={cx("overview-item")}>
                <i className={cx("fa-regular fa-book", "item-icon")}></i>
                <span className={cx("overview-item-title")}>Section:</span>
                <span className={cx("overview-item-text")}>
                  {dataCensorWithAI?.section}
                </span>
              </div>
              <div className={cx("overview-item")}>
                <i className={cx("fa-regular fa-file-lines", "item-icon")}></i>
                <span className={cx("overview-item-title")}>Skill:</span>
                <span className={cx("overview-item-text")}>
                  {dataCensorWithAI?.skill}
                </span>
              </div>
            </div>
          </div>
          <div className={cx("censor-level-general")}>
            <div className={cx("level-content-title")}>
              <div className={cx("number")}>2</div>
              <div className={cx("level-title-text")}>Analyze Level</div>
            </div>
            <div className={cx("level-content-container")}>
              <div className={cx("level-item")}>
                <i className={cx("fa-regular fa-layer-group", "item-icon")}></i>
                <span className={cx("level-item-title")}>Level:</span>
                <span className={cx("level-item-text")}>
                  {dataCensorWithAI?.level.text}
                </span>
              </div>
              <div className={cx("level-item")}>
                <i className={cx("fa-regular fa-lightbulb", "item-icon")}></i>
                <span className={cx("level-item-title")}>Reason:</span>
                <span className={cx("level-item-text")}>
                  {dataCensorWithAI?.level.reason}
                </span>
              </div>
            </div>
          </div>
          <div className={cx("censor-answer-general")}>
            <div className={cx("answer-content-title")}>
              <div className={cx("number")}>3</div>
              <div className={cx("answer-title-text")}>Analyze Answer</div>
            </div>
            <div className={cx("answer-content-container")}>
              <div className={cx("answer-item")}>
                <i
                  className={cx("fa-regular fa-comment-check", "item-icon")}
                ></i>
                <span className={cx("answer-item-title")}>Answer:</span>
                <span className={cx("answer-item-text")}>
                  {dataCensorWithAI?.answer.status}
                </span>
              </div>
              <div className={cx("answer-item")}>
                <i className={cx("fa-regular fa-lightbulb", "item-icon")}></i>
                <span className={cx("answer-item-title")}>Reason:</span>
                <span
                  className={cx("answer-item-text")}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndTextV2(
                      dataCensorWithAI?.answer.reason
                    ),
                  }}
                ></span>
              </div>
            </div>
          </div>
          <div className={cx("censor-explain-general")}>
            <div className={cx("explain-content-title")}>
              <div className={cx("number")}>4</div>
              <div className={cx("explain-title-text")}>Analyze Explain</div>
            </div>
            <div className={cx("explain-content-container")}>
              <div className={cx("explain-item")}>
                <i
                  className={cx("fa-regular fa-message-lines", "item-icon")}
                ></i>
                <span className={cx("explain-item-title")}>Explain:</span>
                <span className={cx("explain-item-text")}>
                  {dataCensorWithAI?.explanation.text}
                </span>
              </div>
              <div className={cx("explain-item")}>
                <i className={cx("fa-regular fa-lightbulb", "item-icon")}></i>
                <span className={cx("explain-item-title")}>Reason:</span>
                <span
                  className={cx("explain-item-text")}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndTextV2(
                      dataCensorWithAI?.explanation.reason
                    ),
                  }}
                ></span>
              </div>
            </div>
          </div>
          <div className={cx("censor-feedback-general")}>
            <div className={cx("feedback-content-title")}>
              <div className={cx("number")}>5</div>
              <div className={cx("feedback-title-text")}>Overall Feedback</div>
            </div>
            <div className={cx("feedback-content-container")}>
              <div className={cx("feedback-item")}>
                <i
                  className={cx("fa-regular fa-comment-dots", "item-icon")}
                ></i>
                <span className={cx("feedback-item-title")}>Feedback:</span>
                <span className={cx("feedback-item-text")}>
                  {dataCensorWithAI?.feedback}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CensorQuestionQuizzGPT.propTypes = {
  dataCensorWithAI: PropTypes.object,
  setIsShowCensorGpt: PropTypes.func,
};

export default CensorQuestionQuizzGPT;
