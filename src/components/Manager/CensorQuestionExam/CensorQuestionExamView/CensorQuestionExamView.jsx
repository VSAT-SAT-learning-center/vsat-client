import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AIImg from "~/assets/images/content/ai.svg";
import Loader from "~/components/General/Loader";
import { AuthContext } from "~/contexts/AuthContext";
import apiClient from "~/services/apiService";
import { convertToJSON } from "~/utils/convertToJSON";
import { formatDate } from "~/utils/formatDate";
import { renderMathAndText } from "~/utils/renderMathAndText";
import CensorQuestionExamFeedback from "../CensorQuestionExamFeedback";
import CensorQuestionExamGPT from "../CensorQuestionExamGPT";
import styles from "./CensorQuestionExamView.module.scss";
const cx = classNames.bind(styles);
function CensorQuestionExamView({
  questionCensorData,
  setIsShowCensorQuestionView,
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isShowCensorFeedback, setIsShowCensorFeedback] = useState(false);
  const [isShowCensorGpt, setIsShowCensorGpt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataCensorWithAI, setDataCensorWithAI] = useState(null);
  const handleApproveQuestion = async () => {
    const payload = {
      questionId: questionCensorData?.id,
      accountFromId: user?.id,
      accountToId: questionCensorData?.account?.id,
    };
    try {
      await apiClient.post(
        `/questions/censor/approve`,
        payload
      );
      navigate("/manager/question-bank/bank");
    } catch (error) {
      console.error("Error censor approve question:", error);
    }
  };

  const handleRejectedQuestion = () => {
    setIsShowCensorFeedback(true);
  };

  const handleCensorWithAI = async () => {
    setLoading(true);
    if (dataCensorWithAI) {
      setLoading(false);
      setIsShowCensorGpt(true);
      return;
    }
    const correctAnswer = questionCensorData.answers.find(
      (answer) => answer.isCorrectAnswer
    );
    const censorAIData = {
      content: questionCensorData.content,
      answers: [
        {
          label: correctAnswer?.label || "",
          text: correctAnswer?.text || "",
          isCorrectAnswer: true,
        },
      ],
      explain: questionCensorData.explain || "",
    };
    try {
      const response = await apiClient.post(
        "gpts/censor-question",
        censorAIData
      );

      if (questionCensorData?.section.name === "Math") {
        if (
          response.data?.answer?.reason ||
          response.data?.explaination?.reason
        ) {
          setDataCensorWithAI(response.data);
        } else {
          const convertData = convertToJSON(response.data);
          setDataCensorWithAI(convertData);
        }
      } else {
        setDataCensorWithAI(response.data);
      }
      setLoading(false);
      setIsShowCensorGpt(true);
    } catch (error) {
      console.error("Error censoring question with AI:", error);
      setLoading(false);
    }
  };

  const censorRejectQuestion = async (reason, content) => {
    const rejectData = {
      questionId: questionCensorData?.id,
      content: content,
      reason: reason,
      accountFromId: user?.id,
      accountToId: questionCensorData?.account?.id,
    };
    try {
      await apiClient.post(`/questions/censor/reject`, rejectData);
      navigate("/manager/question-bank/feedback");
    } catch (error) {
      console.error("Error censor reject question:", error);
    }
  };

  return (
    <>
      {loading && <Loader />}

      {isShowCensorFeedback && (
        <CensorQuestionExamFeedback
          setIsShowCensorFeedback={setIsShowCensorFeedback}
          censorRejectQuestion={censorRejectQuestion}
        />
      )}

      {isShowCensorGpt && (
        <CensorQuestionExamGPT
          dataCensorWithAI={dataCensorWithAI}
          setIsShowCensorGpt={setIsShowCensorGpt}
        />
      )}
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
            <button
              className={cx("censor-with-ai")}
              onClick={handleCensorWithAI}
            >
              <img src={AIImg} alt="ai-img" className={cx("ai-img")} />
              <div className={cx("ai-text")}>Censor with AI</div>
            </button>
          </div>
          <div className={cx("censor-question-exam-view-content")}>
            <div className={cx("question-overview-general")}>
              <div className={cx("question-overview-title")}>
                <div className={cx("overview-title-text")}>
                  <div className={cx("number")}>1</div>
                  <div className={cx("text")}>Question Overview</div>
                </div>
                <div className={cx("overview-title-date")}>
                  Created at: {formatDate(Date.now())}
                </div>
              </div>
              <div className={cx("question-overview-content")}>
                <div className={cx("overview-item")}>
                  <div className={cx("item-icon")}>
                    <i
                      className={cx("fa-regular fa-circle-question", "icon")}
                    ></i>
                  </div>
                  <span className={cx("overview-item-title")}>
                    Question Type:
                  </span>
                  <span className={cx("overview-item-text")}>
                    {questionCensorData?.isSingleChoiceQuestion === true
                      ? "Single Choice"
                      : "Text Input"}
                  </span>
                </div>
                <div className={cx("overview-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-layer-group", "icon")}></i>
                  </div>
                  <span className={cx("overview-item-title")}>Level:</span>
                  <span className={cx("overview-item-text")}>
                    {questionCensorData?.level.name}
                  </span>
                </div>
                <div className={cx("overview-item")}>
                  <div className={cx("item-icon")}>
                    {" "}
                    <i className={cx("fa-regular fa-book", "icon")}></i>
                  </div>
                  <span className={cx("overview-item-title")}>Section:</span>
                  <span className={cx("overview-item-text")}>
                    {questionCensorData?.section.name}
                  </span>
                </div>
                <div className={cx("overview-item")}>
                  <div className={cx("item-icon")}>
                    <i
                      className={cx(
                        "fa-regular fa-clipboard-list-check",
                        "icon"
                      )}
                    ></i>
                  </div>
                  <span className={cx("overview-item-title")}>Domain:</span>
                  <span className={cx("overview-item-text")}>
                    {questionCensorData?.skill.domain.content}
                  </span>
                </div>
                <div className={cx("overview-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-file-lines", "icon")}></i>
                  </div>
                  <span className={cx("overview-item-title")}>Skill:</span>
                  <span className={cx("overview-item-text")}>
                    {questionCensorData?.skill.content}
                  </span>
                </div>
              </div>
              <div className={cx("question-content-container")}></div>
            </div>
            <div className={cx("question-content-general")}>
              <div className={cx("question-content-title")}>
                <div className={cx("number")}>2</div>
                <div className={cx("content-title-text")}>Question Content</div>
              </div>
              <div className={cx("question-content-container")}>
                {questionCensorData?.section.name === "Math" ? (
                  <div
                    className={cx("question-content")}
                    dangerouslySetInnerHTML={{
                      __html: renderMathAndText(questionCensorData?.content),
                    }}
                  ></div>
                ) : (
                  <div
                    className={cx("question-content")}
                    dangerouslySetInnerHTML={{
                      __html: questionCensorData?.content,
                    }}
                  ></div>
                )}
              </div>
            </div>
            <div className={cx("question-answer-general")}>
              <div className={cx("question-answer-title")}>
                <div className={cx("number")}>3</div>
                <div className={cx("answer-title-text")}>Question Answers</div>
              </div>
              <div className={cx("question-answer-container")}>
                {questionCensorData?.answers.map((answer, index) => (
                  <div key={answer.id} className={cx("question-answer-item")}>
                    <span className={cx("answer-label")}>
                      {String.fromCharCode(65 + index) + ":"}
                    </span>
                    {questionCensorData?.section.name === "Math" ? (
                      <span
                        className={cx("answer-rerender-content")}
                        dangerouslySetInnerHTML={{
                          __html: renderMathAndText(answer.text),
                        }}
                      ></span>
                    ) : (
                      <span
                        className={cx("answer-rerender-content")}
                        dangerouslySetInnerHTML={{ __html: answer.text }}
                      ></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("correct-answer-general")}>
              <div className={cx("correct-answer-title")}>
                <div className={cx("number")}>4</div>
                <div className={cx("correct-answer-title-text")}>
                  Correct Answer
                </div>
              </div>
              <div className={cx("correct-answer-container")}>
                {questionCensorData?.answers
                  .filter((answer) => answer.isCorrectAnswer === true)
                  .map((answer) => (
                    <div key={answer.id} className={cx("question-answer-item")}>
                      {questionCensorData?.section.name === "Math" ? (
                        <span
                          className={cx("answer-rerender-content")}
                          dangerouslySetInnerHTML={{
                            __html: renderMathAndText(answer.text),
                          }}
                        ></span>
                      ) : (
                        <span
                          className={cx("answer-rerender-content")}
                          dangerouslySetInnerHTML={{ __html: answer.text }}
                        ></span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className={cx("explain-answer-general")}>
              <div className={cx("explain-answer-title")}>
                <div className={cx("number")}>5</div>
                <div className={cx("explain-answer-title-text")}>
                  Explain Answer
                </div>
              </div>
              <div className={cx("explain-answer-container")}>
                {questionCensorData?.section.name === "Math" ? (
                  <div
                    className={cx("explain-content")}
                    dangerouslySetInnerHTML={{
                      __html: renderMathAndText(questionCensorData?.explain),
                    }}
                  ></div>
                ) : (
                  <div
                    className={cx("explain-content")}
                    dangerouslySetInnerHTML={{
                      __html: questionCensorData?.explain,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
          <div className={cx("censor-question-exam-view-footer")}>
            <button
              className={cx("rejected-btn")}
              onClick={handleRejectedQuestion}
            >
              <i className={cx("fa-sharp fa-regular fa-ban", "btn-icon")}></i>
              <span className={cx("btn-text")}>Reject</span>
            </button>
            <button
              className={cx("approved-btn")}
              onClick={handleApproveQuestion}
            >
              <i className={cx("fa-sharp fa-regular fa-check", "btn-icon")}></i>
              <span className={cx("btn-text")}>Approve</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

CensorQuestionExamView.propTypes = {
  questionCensorData: PropTypes.object,
  setIsShowCensorQuestionView: PropTypes.func,
};

export default CensorQuestionExamView;
