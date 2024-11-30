import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./SendFeedback.module.scss";
const cx = classNames.bind(styles);

function SendFeedback({ setFeedbackNormalData }) {
  const [reason, setReason] = useState("")
  const [detail, setDetail] = useState("")

  useEffect(() => {
    setFeedbackNormalData((prevData) => ({
      ...prevData,
      reason,
      narrativeFeedback: detail,
    }));
  }, [reason, detail, setFeedbackNormalData]);

  return (
    <div className={cx("send-feedback-container")}>
      <div className={cx("reason-feedback")}>
        <div className={cx("title")}>Reason Feedback</div>
        <div className={cx("reason-input")}>
          <textarea
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={cx("input")}
          ></textarea>
        </div>
      </div>
      <div className={cx("detail-feedback")}>
        <div className={cx("title")}>Detail Narrative Feedback</div>
        <div className={cx("detail-input")}>
          <textarea
            placeholder="Feedback"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className={cx("input")}
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default SendFeedback
