import classNames from "classnames/bind";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NoData from "~/assets/images/content/nonotify.png";
import Logo from "~/assets/images/logo/LOGO-02.png";
import { AuthContext } from "~/contexts/AuthContext";
import styles from "./Notifications.module.scss";
const cx = classNames.bind(styles);

function Notifications({ notifications, setShowNotification }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const getFormattedTimestamp = useMemo(() => {
    return (createdAt) => {
      const distance = formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
      });
      return distance === "less than a minute ago" ? "a few seconds ago" : distance;
    };
  }, []);

  const handleReadNotification = (notify) => {
    const roleActions = {
      Admin: () => console.log(notify),
      Manager: () => {
        const eventRoutes = {
          sendFeedbackNotification: "/manager/feedback",
          publishLearningMaterialNotification: "/manager/learning-material/censor",
          publishExamFeedbackNotification: "/manager/exams/censor",
          publishQuestionNotification: "/manager/question-bank/censor",
          publishQuizQuestionNotification: "/manager/question-quizz/censor",
        };
        if (eventRoutes[notify.eventType]) {
          navigate(eventRoutes[notify.eventType]);
        }
      },
      Staff: () => {
        const eventRoutes = {
          approveLearningMaterialNotification: "/staff/learning-material/overview",
          rejectLearningMaterialNotification: "/staff/learning-material/feedback",
          approveExamFeedbackNotification: "/staff/exams/overview",
          rejectExamFeedbackNotification: "/staff/exams/feedback",
          approveQuestionNotification: "/staff/question-bank/bank",
          rejectQuestionNotification: "/staff/question-bank/feedback",
          approveQuizQuestionNotification: "/staff/question-quizz/bank",
          rejectQuizQuestionNotification: "/staff/question-quizz/feedback",
          sendFeedbackNotification: "/staff/feedback/receive",
          sendEvaluateNotification: "/staff/feedback/receive"
        };
        if (eventRoutes[notify.eventType]) {
          navigate(eventRoutes[notify.eventType]);
        }
      },
      Teacher: () => {
        const eventRoutes = {
          sendFeedbackNotification: "/teacher/feedback/receive",
          assignTeacherNotification: "/teacher/manage-material",
        };
        if (eventRoutes[notify.eventType]) {
          navigate(eventRoutes[notify.eventType]);
        }
      },
      Student: () => {
        const eventRoutes = {
          sendEvaluateNotification: "/feedback/receive",
          assignExamNotification: "/exam-schedule",
          completeTargetLearningNotification: "/learning-progress",
          approveTargetLearningNotification: "/learning"
        };
        if (eventRoutes[notify.eventType]) {
          navigate(eventRoutes[notify.eventType]);
        }
      },
    };
    roleActions[user.role]?.();
    setShowNotification(false);
  };

  const notificationIcons = {
    learningMaterial: "fa-sharp fa-solid fa-book",
    feedback: "fa-solid fa-comment-dots",
    question: "fa-solid fa-circle-question",
    exam: "fa-solid fa-file-lines",
    user: "fa-solid fa-user",
    targetLearning: "fa-solid fa-bullseye-arrow",
  };

  return (
    <div className={cx("notification-wrapper")}>
      <div className={cx("notification-container")}>
        <div className={cx("notification-heading")}>
          <div className={cx("text")}>Notifications</div>
        </div>
        <div className={cx("mark-as-read")}>
          <button
            className={cx("mark-as-read-btn")}
          >
            Mark as read
          </button>
        </div>
        {notifications.length > 0 ? (
          <div className={cx("notification-list")}>
            {notifications?.map((notify, index) => (
              <div className={cx("notification-item")} key={index} onClick={() => handleReadNotification(notify)}>
                <div className={cx("user-avatar")}>
                  <img
                    src={notify?.accountFrom?.profilepictureurl || Logo}
                    alt="user-avt"
                    className={cx("avatar")}
                  />
                  <div className={cx("notification-type")}>
                    <i
                      className={cx(notificationIcons[notify.type], "icon")}
                    ></i>
                  </div>
                </div>
                <div className={cx("notification-info")}>
                  <div
                    className={cx("notification-content", { "not-read": !notify.isRead })}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(notify.message),
                    }}
                  />
                  <div className={cx("notification-date")}>
                    {getFormattedTimestamp(notify.createdAt)}
                  </div>
                </div>
                {!notify.isRead && (
                  <div className={cx("dot-wrapper")}>
                    <div className={cx("dot")}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={cx("notification-no-content")}>
            <div className={cx("no-data-content")}>
              <img
                src={NoData}
                alt="no-data"
                className={cx("no-data-img")}
              />
              <div className={cx("no-data-text")}>No notification yet</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
