import classNames from "classnames/bind";
import { useState } from "react";
import { satFeedbackReportStructureDatas } from "~/data/Manager/satFeedbackReportStructureDatas";
import styles from "./CensorFeedback.module.scss";
const cx = classNames.bind(styles);

function CensorFeedback({
  moduleCensorData,
  setIsShowCensorFeedback,
  setCensorModuleFeedback,
  setIsShowModuleViewCensor,
  setIsShowConfirmCensor,
}) {
  const [selectedReason, setSelectedReason] = useState(null);
  const [reasonFeedback, setReasonFeedback] = useState(null);
  const [typeShowFeedback, setTypeShowFeedback] = useState("choose");
  const [feedbackContent, setFeedbackContent] = useState("");
  const handleChooseReason = (reasonData) => {
    setSelectedReason(reasonData.id);
    setReasonFeedback(reasonData.title);
  };
  const handleFeedbackContentChange = (e) => {
    setFeedbackContent(e.target.value);
  };
  const handleClickContinue = () => {
    if (typeShowFeedback === "choose") {
      setTypeShowFeedback("input");
    } else {
      setIsShowCensorFeedback(false);
    }
  };
  const handleRejectFeedback = () => {
    setCensorModuleFeedback((prevFeedback) => ({
      ...prevFeedback,
      moduleTypesFeedback: [
        ...prevFeedback.moduleTypesFeedback.filter(
          (module) => module.moduleTypeId !== moduleCensorData.id
        ),
        {
          moduleTypeId: moduleCensorData.id,
          isRejected: true,
          reason: reasonFeedback,
          content: feedbackContent,
        },
      ],
    }));
    setIsShowCensorFeedback(false);
    setIsShowConfirmCensor(false);
    setIsShowModuleViewCensor(false);
  };
  return (
    <div className={cx("censor-question-exam-feedback-wrapper")}>
      <div className={cx("censor-question-exam-feedback-container")}>
        <div className={cx("censor-question-exam-feedback-header")}>
          <div
            className={cx("censor-back")}
            onClick={() => setIsShowCensorFeedback(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("censor-title")}>Censor Question</div>
          <div className={cx("censor-empty")}></div>
        </div>
        <div className={cx("censor-question-exam-feedback-content")}>
          {typeShowFeedback === "choose" ? (
            <div className={cx("reason-list-container")}>
              {satFeedbackReportStructureDatas.map((reason) => (
                <div className={cx("reason-item")} key={reason.id}>
                  <div className={cx("select-reason")}>
                    <input
                      type="radio"
                      id={`select-rp-${reason.id}`}
                      name="reportGroup"
                      className={cx("input-reason")}
                      checked={selectedReason === reason.id}
                      onChange={() => handleChooseReason(reason)}
                    />
                  </div>
                  <div className={cx("reason-content")}>
                    <label
                      htmlFor={`select-rp-${reason.id}`}
                      className={cx("reason-title")}
                    >
                      {reason.title}
                    </label>
                    <div className={cx("reason-desc")}>{reason.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={cx("reason-input-container")}>
              <div className={cx("reason-name")}>
                Reason:{" "}
                <span className={cx("name-highlight")}>{reasonFeedback}</span>
              </div>
              <div className={cx("reason-editor-input")}>
                <textarea
                  value={feedbackContent}
                  className={cx("reason-input")}
                  placeholder="Write reason content...."
                  onChange={handleFeedbackContentChange}
                ></textarea>
              </div>
            </div>
          )}
        </div>
        <div className={cx("censor-question-exam-feedback-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setIsShowCensorFeedback(false)}
          >
            Cancel
          </button>
          {typeShowFeedback === "choose" ? (
            <button
              className={cx("continue-btn", {
                "disabled-btn": selectedReason === null,
              })}
              disabled={selectedReason === null}
              onClick={handleClickContinue}
            >
              Continue
            </button>
          ) : (
            <button
              className={cx("continue-btn", {
                "disabled-btn": feedbackContent === "",
              })}
              disabled={feedbackContent === ""}
              onClick={handleRejectFeedback}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CensorFeedback;
