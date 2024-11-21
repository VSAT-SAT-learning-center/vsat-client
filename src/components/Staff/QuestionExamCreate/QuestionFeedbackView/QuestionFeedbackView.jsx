import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import { formatDate } from "~/utils/formatDate";
import styles from "./QuestionFeedbackView.module.scss";
const cx = classNames.bind(styles);
function QuestionFeedbackView({ questionFeedback, setIsShowFeedbackView }) {
  console.log(questionFeedback);
  const [feedbacks, setFeedbacks] = useState(null)
  const [isWaiting, setIsWaiting] = useState(false)
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsWaiting(true)
        const response = await apiClient.get(`/feedbacks/question/reason/${questionFeedback?.id}`)
        setFeedbacks(response.data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsWaiting(false)
      }
    }

    fetchFeedback()
  }, [questionFeedback?.id])
  return (
    <div className={cx("question-view-feedback-wrapper")}>
      <div className={cx("question-view-feedback-container")}>
        <div className={cx("question-view-feedback-header")}>
          <div className={cx("view-title")}>
            <div className={cx("feedback-icon")}>
              <i className={cx("fa-regular fa-message-lines", "icon")}></i>
            </div>
            <div className={cx("feedback-text")}>Feedback</div>
          </div>
          <div
            className={cx("view-back")}
            onClick={() => setIsShowFeedbackView(false)}
          >
            <i className={cx("fa-regular fa-xmark")}></i>
          </div>
        </div>
        <div className={cx("question-view-feedback-content")}>
          {isWaiting ? (
            <>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={173}
              />
            </>
          ) : (
            feedbacks?.map((feedback) => (
              <div className={cx("feedback-item-container")} key={feedback.id}>
                <div className={cx("feedback-item")}>
                  <div className={cx("item-infor")}>
                    <div className={cx("item-icon")}>
                      <i className={cx("fa-regular fa-timer")}></i>
                    </div>
                    <span className={cx("item-title")}>Created At: </span>
                  </div>
                  <div className={cx("item-detail")}>{formatDate(feedback.createdat)}</div>
                </div>
                <div className={cx("feedback-item")}>
                  <div className={cx("item-infor")}>
                    <div className={cx("item-icon")}>
                      <i className={cx("fa-regular fa-user-pen")}></i>
                    </div>
                    <span className={cx("item-title")}>Feedback by: </span>
                  </div>
                  <div className={cx("item-detail")}>{feedback.accountFrom.username}</div>
                </div>
                <div className={cx("feedback-item")}>
                  <div className={cx("item-infor")}>
                    <div className={cx("item-icon")}>
                      <i className={cx("fa-regular fa-lightbulb")}></i>
                    </div>
                    <span className={cx("item-title")}>Reason: </span>
                  </div>
                  <div className={cx("item-detail")}>{feedback.reason}</div>
                </div>
                <div className={cx("feedback-item")}>
                  <div className={cx("item-infor")}>
                    <div className={cx("item-icon")}>
                      <i className={cx("fa-regular fa-file-pen")}></i>
                    </div>
                    <span className={cx("item-title")}>Content: </span>
                  </div>
                  <div className={cx("item-detail")}>{feedback.content}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

QuestionFeedbackView.propTypes = {
  questionFeedback: PropTypes.object,
  setIsShowFeedbackView: PropTypes.func,
};

export default QuestionFeedbackView;
