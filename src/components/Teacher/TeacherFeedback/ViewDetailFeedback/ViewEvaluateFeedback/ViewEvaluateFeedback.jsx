import classNames from "classnames/bind";
import styles from "./ViewEvaluateFeedback.module.scss";
const cx = classNames.bind(styles);
const evaluationDimensions = [
  {
    id: "684122fe-277f-49e8-a0e0-6caea33aa1bb",
    label: "Academic Performance",
    description: "Overall academic achievements and learning progress",
  },
  {
    id: "44d6daf9-2758-4090-ba77-2b805e6d9ee6",
    label: "Classroom Behavior",
    description: "Conduct, participation, and classroom engagement",
  },
  {
    id: "d5adde13-bbcb-4dae-9b58-738092a61027",
    label: "Social Skills",
    description: "Interaction with peers and emotional intelligence",
  },
  {
    id: "c34a0f82-6e72-4ad2-87b9-2602fcbf97c9",
    label: "Leadership Potential",
    description: "Initiative, teamwork, and potential to lead",
  },
];
function ViewEvaluateFeedback({ feedbackData }) {
  const renderStars = (currentRating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fa-solid fa-star ${currentRating > index ? "text-yellow-300" : "text-gray-300"}`}
        style={{ fontSize: "18px", marginRight: "4px" }}
      ></i>
    ));
  };
  return (
    <div className={cx("send-evaluation-container")}>
      <div className={cx("select-student-container")}>
        <div className={cx("title")}>Select Student</div>
        <div className={cx("select-container")}>
          <div className={cx("select")}>
            <div className={cx("infor")}>
              <img
                src={feedbackData?.accountTo?.profileImage || ""}
                alt="avatar"
                className={cx("avatar-img")}
              />
              <div className={cx("username")}>
                {feedbackData?.accountTo?.username || "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("dimension-container")}>
        {evaluationDimensions.map((dimension) => {
          const score =
            feedbackData?.criteriaScores?.find(
              (item) => item.criteria.id === dimension.id
            )?.score || 0;
          return (
            <div key={dimension.id} className={cx("dimension-item", "mb-4")}>
              <label className={cx("item-label")}>
                {dimension.label}
                <span className={cx("item-desc", "text-gray-500 ml-2")}>
                  {dimension.description}
                </span>
              </label>
              <div className={cx("rate-container", "flex items-center")}>
                {renderStars(score)}
                <span className="ml-2 text-sm text-gray-600">
                  {score ? `${score}/5` : "Not rated"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={cx("narrative-container")}>
        <div className={cx("title")}>Detailed Narrative Feedback</div>
        <div className={cx("narrative-input")}>
          <div placeholder="Feedback" className={cx("input")}>
            {feedbackData?.narrativeFeedback || "No feedback provided."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEvaluateFeedback;
