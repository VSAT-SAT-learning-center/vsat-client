import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import NoData from "~/assets/images/content/nodata1.png";
import apiClient from "~/services/apiService";
import { formatDate } from "~/utils/formatDate";
import styles from "./FeedbackModuleView.module.scss";
const cx = classNames.bind(styles);


function FeedbackModuleView({ moduleData, setShowModuleFeedback }) {
  const [feedbacks, setFeedbacks] = useState([])
  const [isWaiting, setIsWaiting] = useState(false)
  useEffect(() => {
    const feedbacks = async () => {
      try {
        setIsWaiting(true)
        const response = await apiClient.get(`/feedbacks/moduletype/reason/${moduleData?.id}`)
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error while getting feedbacks:", error)
      } finally {
        setIsWaiting(false)
      }
    }

    feedbacks()
  }, [moduleData?.id])
  return (
    <div className={cx("feedback-module-view-wrapper")}>
      <div className={cx("feedback-module-view-container")}>
        <div className={cx("feedback-module-view-header")}>
          <div
            className={cx("view-back")}
            onClick={() => setShowModuleFeedback(false)}
          >
            <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
          </div>
          <div className={cx("view-title")}>View Feedback Module</div>
          <div className={cx("view-empty")}></div>
        </div>
        {feedbacks?.length > 0 ? (
          <div className={cx("feedback-module-view-content")}>
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
          <div className={cx("feedback-module-view-no-content")}>
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

export default FeedbackModuleView
