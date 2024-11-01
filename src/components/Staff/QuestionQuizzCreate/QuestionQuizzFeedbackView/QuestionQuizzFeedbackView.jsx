import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./QuestionQuizzFeedbackView.module.scss";
const cx = classNames.bind(styles);
function QuestionQuizzFeedbackView({questionFeedback, setIsShowFeedbackView }) {
  console.log(questionFeedback);
  
  // const [feedback, setFeedback] = useState(null)
  // useEffect(() => {
  //   const fetchFeedback = async () => {
  //     try {
  //       const response = await apiClient.get(`/feedbacks/question/${questionFeedback?._id}`)
  //       setFeedback(response.data.data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   fetchFeedback()
  // }, [questionFeedback?._id])
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
          <div className={cx("feedback-item")}>
            <div className={cx("item-infor")}>
              <div className={cx("item-icon")}>
                <i className={cx("fa-regular fa-timer")}></i>
              </div>
              <span className={cx("item-title")}>Created At: </span>
            </div>
            <div className={cx("item-detail")}></div>
          </div>
          <div className={cx("feedback-item")}>
            <div className={cx("item-infor")}>
              <div className={cx("item-icon")}>
                <i className={cx("fa-regular fa-user-pen")}></i>
              </div>
              <span className={cx("item-title")}>Feedback by: </span>
            </div>
            <div className={cx("item-detail")}></div>
          </div>
          <div className={cx("feedback-item")}>
            <div className={cx("item-infor")}>
              <div className={cx("item-icon")}>
                <i className={cx("fa-regular fa-lightbulb")}></i>
              </div>
              <span className={cx("item-title")}>Reason: </span>
            </div>
            <div className={cx("item-detail")}></div>
          </div>
          <div className={cx("feedback-item")}>
            <div className={cx("item-infor")}>
              <div className={cx("item-icon")}>
                <i className={cx("fa-regular fa-file-pen")}></i>
              </div>
              <span className={cx("item-title")}>Content: </span>
            </div>
            <div className={cx("item-detail")}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

QuestionQuizzFeedbackView.propTypes = {
  questionFeedback: PropTypes.object,
  setIsShowFeedbackView: PropTypes.func,
};

export default QuestionQuizzFeedbackView;
