import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import NoData from "~/assets/images/content/nodata1.png";
import apiClient from "~/services/apiService";
import { formatDate } from "~/utils/formatDate";
import styles from "./LessonViewFeedback.module.scss";
const cx = classNames.bind(styles);

function LessonViewFeedback({ lesson, setShowFeedbackView }) {
  const [feedbacks, setFeedbacks] = useState([])
  const [isWaiting, setIsWaiting] = useState(false)
  useEffect(() => {
    const feedbacks = async () => {
      try {
        setIsWaiting(true)
        const response = await apiClient.get(`/feedbacks/lesson/reason/${lesson?.id}`)
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error while getting feedbacks:", error)
      } finally {
        setIsWaiting(false)
      }
    }

    feedbacks()
  }, [lesson?.id])

  return (
    <div className={cx("lesson-feedback-view-wrapper")}>
      <div className={cx("lesson-feedback-view-container")}>
        <div className={cx("lesson-feedback-view-header")}>
          <div
            className={cx("view-back")}
            onClick={() => setShowFeedbackView(false)}
          >
            <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
          </div>
          <div className={cx("view-title")}>View Feedback Lesson</div>
          <div className={cx("view-empty")}></div>
        </div>
        {feedbacks?.length > 0 ? (
          <div className={cx("lesson-feedback-view-content")}>
            {isWaiting ? (
              <>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={175}
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
                    <div className={cx("item-detail")}>{feedback.accountFrom.firstname + " " + feedback.accountFrom.lastname}</div>
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
        ) : (
          <div className={cx("lesson-feedback-view-no-content")}>
            <div className={cx("no-data-content")}>
              <img
                src={NoData}
                alt="no-data"
                className={cx("no-data-img")}
              />
              <div className={cx("no-data-text")}>No more feedback</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LessonViewFeedback
