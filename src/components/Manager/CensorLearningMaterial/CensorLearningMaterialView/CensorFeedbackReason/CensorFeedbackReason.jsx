import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { satFeedbackReportDatas } from "~/data/Manager/satFeedbackReportDatas";
import styles from "./CensorFeedbackReason.module.scss";
const cx = classNames.bind(styles);

function CensorFeedbackReason({
  lessonData,
  setIsShowCensorFeedback,
  markRejectLesson,
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

  const handleClickSaveFeedback = () => {
    markRejectLesson(reasonFeedback, feedbackContent);
  };

  return (
    <div className={cx("censor-feedback-reason-wrapper")}>
      <div className={cx("censor-feedback-reason-container")}>
        <div className={cx("censor-feedback-reason-heeader")}>
          <div className={cx("header-left")}>
            {typeShowFeedback === "choose" ? (
              <div
                className={cx("view-back")}
                onClick={() => setIsShowCensorFeedback(false)}
              >
                <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
              </div>
            ) : (
              <div
                className={cx("view-back")}
                onClick={() => setTypeShowFeedback("choose")}
              >
                <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
              </div>
            )}
            <div className={cx("view-title")}>{lessonData?.title}</div>
          </div>
        </div>
        <div className={cx("censor-feedback-reason-content")}>
          {typeShowFeedback === "choose" ? (
            <div className={cx("reason-list-container")}>
              {satFeedbackReportDatas.map((reason) => (
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
        <div className={cx("censor-feedback-reason-footer")}>
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
              onClick={handleClickSaveFeedback}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

CensorFeedbackReason.propTypes = {
  lessonData: PropTypes.object,
  setIsShowCensorFeedback: PropTypes.func,
  markRejectLesson: PropTypes.func,
};

export default CensorFeedbackReason;
