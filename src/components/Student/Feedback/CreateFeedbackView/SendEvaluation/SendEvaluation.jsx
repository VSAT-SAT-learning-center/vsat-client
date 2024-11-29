import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./SendEvaluation.module.scss";
const cx = classNames.bind(styles);
const evaluationDimensions = [
  {
    id: "7eaa06fe-85ff-4b9b-8358-727473fb44a8",
    label: "Teaching Effectiveness",
    description: `Evaluates a teacher's ability to deliver lessons clearly, engage students, and ensure understanding of concepts.`,
  },
  {
    id: "529d4894-3c0a-4c54-abdf-1be5b80672d5",
    label: "Classroom Management",
    description:
      "Measures how effectively a teacher maintains discipline, organizes activities, and creates a conducive learning environment.",
  },
  {
    id: "2e5165be-4ac9-4462-aedd-b00e99402e39",
    label: "Communication Skills",
    description:
      "Assesses how clearly and effectively a teacher communicates with students and colleagues.",
  },
  {
    id: "8cfa139b-ff2a-44bc-bdbd-7342a81bcd17",
    label: "Professionalism",
    description: `Evaluates a teacher's punctuality, adherence to policies, and overall professional behavior.`,
  },
];
function SendEvaluation({ teacher, setFeedbackData }) {
  const [ratings, setRatings] = useState(
    evaluationDimensions.reduce(
      (acc, dim) => ({
        ...acc,
        [dim.id]: 0,
      }),
      {}
    )
  );
  const [narrativeFeedback, setNarrativeFeedback] = useState("");

  useEffect(() => {
    setFeedbackData((prevData) => ({
      ...prevData,
      narrativeFeedback,
      criteriaScores: evaluationDimensions.map((dimension) => ({
        criteriaId: dimension.id,
        score: ratings[dimension.id],
      })),
    }));
  }, [ratings, narrativeFeedback, setFeedbackData]);

  const handleRating = (dimension, rating) => {
    setRatings((prev) => ({
      ...prev,
      [dimension]: rating,
    }));
  };

  const renderStars = (dimension, currentRating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => handleRating(dimension, index + 1)}
        className={`p-1 focus:outline-none ${currentRating > index
          ? "text-yellow-300"
          : "text-gray-300 hover:text-yellow-300"
          }`}
      >
        <i className="fa-solid fa-star" style={{ fontSize: "18px" }}></i>
      </button>
    ));
  };

  return (
    <div className={cx("send-evaluation-container")}>
      <div className={cx("select-student-container")}>
        <div className={cx("title")}>Teacher</div>
        <div className={cx("select-container")}>
          <div className={cx("select")}>
            <div className={cx("infor")}>
              <img
                src={teacher?.profilePicture || "https://cdn-icons-png.flaticon.com/512/18174/18174185.png"}
                alt="avatar"
                className={cx("avatar-img")}
              />
              <div className={cx("username")}>
                {teacher?.firstname + " " + teacher?.lastname || "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("dimension-container")}>
        {evaluationDimensions.map((dimension) => (
          <div key={dimension.id} className={cx("dimension-item", "mb-4")}>
            <label className={cx("item-label")}>
              {dimension.label}
              <span className={cx("item-desc", "text-gray-500 ml-2")}>
                {dimension.description}
              </span>
            </label>
            <div className={cx("rate-container", "flex items-center")}>
              {renderStars(dimension.id, ratings[dimension.id])}
              <span className="ml-2 text-sm text-gray-600">
                {ratings[dimension.id]
                  ? `${ratings[dimension.id]}/5`
                  : "Not rated"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={cx("narrative-container")}>
        <div className={cx("title")}>Detailed Narrative Feedback</div>
        <div className={cx("narrative-input")}>
          <textarea
            placeholder="Feedback"
            value={narrativeFeedback}
            onChange={(e) => setNarrativeFeedback(e.target.value)}
            className={cx("input")}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default SendEvaluation;
