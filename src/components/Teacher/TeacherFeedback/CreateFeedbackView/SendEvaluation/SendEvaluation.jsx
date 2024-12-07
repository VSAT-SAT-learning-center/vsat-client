import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import emptyImg from "~/assets/images/content/empty.png";
import apiClient from './../../../../../services/apiService';
import styles from "./SendEvaluation.module.scss";
const cx = classNames.bind(styles);
const evaluationDimensions = [
  {
    id: '684122fe-277f-49e8-a0e0-6caea33aa1bb',
    label: 'Academic Performance',
    description: 'Overall academic achievements and learning progress'
  },
  {
    id: '44d6daf9-2758-4090-ba77-2b805e6d9ee6',
    label: 'Classroom Behavior',
    description: 'Conduct, participation, and classroom engagement'
  },
  {
    id: 'd5adde13-bbcb-4dae-9b58-738092a61027',
    label: 'Social Skills',
    description: 'Interaction with peers and emotional intelligence'
  },
  {
    id: 'c34a0f82-6e72-4ad2-87b9-2602fcbf97c9',
    label: 'Leadership Potential',
    description: 'Initiative, teamwork, and potential to lead'
  }
];
function SendEvaluation({ setFeedbackData }) {
  const [isSelectStudent, setIsSelectStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([])
  const [ratings, setRatings] = useState(
    evaluationDimensions.reduce((acc, dim) => ({
      ...acc,
      [dim.id]: 0
    }), {})
  );
  const [narrativeFeedback, setNarrativeFeedback] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const [existingProfilesResponse, allProfilesResponse] = await Promise.all([
          apiClient.get("/evaluate-feedback/study-profiles"),
          apiClient.get("/study-profiles/getStudyProfileWithTeacher?page=1&pageSize=0"),
        ]);
        const existingProfileIds = new Set(existingProfilesResponse.data.map((item) => item.studyProfileId));

        const allProfiles = allProfilesResponse.data.data.data;
        const filteredProfiles = allProfiles.filter((profile) => !existingProfileIds.has(profile.id));

        setStudents(filteredProfiles);
      } catch (error) {
        console.error("Error while fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      setFeedbackData((prevData) => ({
        ...prevData,
        accountToId: selectedStudent?.account?.id || "",
        studyProfileId: selectedStudent?.id || "",
        narrativeFeedback,
        criteriaScores: evaluationDimensions.map((dimension) => ({
          criteriaId: dimension.id,
          score: ratings[dimension.id],
        })),
      }));
    }
  }, [selectedStudent, ratings, narrativeFeedback, setFeedbackData]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setIsSelectStudent(false);
  };

  const handleRating = (dimension, rating) => {
    setRatings(prev => ({
      ...prev,
      [dimension]: rating
    }));
  };

  const renderStars = (dimension, currentRating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => handleRating(dimension, index + 1)}
        className={`p-1 focus:outline-none ${currentRating > index
          ? 'text-yellow-300'
          : 'text-gray-300 hover:text-yellow-300'
          }`}
      >
        <i className="fa-solid fa-star" style={{ fontSize: "18px" }}></i>
      </button>
    ));
  };

  return (
    <div className={cx("send-evaluation-container")}>
      <div className={cx("select-student-container")}>
        <div className={cx("title")}>Select Student</div>
        <div className={cx("select-container")}>
          {selectedStudent ? (
            <div className={cx("select")}>
              <div className={cx("infor")}>
                <img src={selectedStudent?.account?.profilepictureurl} alt="avatar" className={cx("avatar-img")} />
                <div className={cx("username")}>{selectedStudent?.account?.username}</div>
              </div>
              <div
                className={cx("select-icon")}
                onClick={() => setSelectedStudent(null)}
              >
                <i className={cx("fa-sharp fa-solid fa-xmark")}></i>
              </div>
            </div>
          ) : (
            <div
              className={cx("none-select")}
              onClick={() => setIsSelectStudent(!isSelectStudent)}
            >
              <div className={cx("select-text")}>Select Student</div>
              <div className={cx("select-icon")}>
                <i
                  className={cx(
                    isSelectStudent
                      ? "fa-regular fa-chevron-down"
                      : "fa-regular fa-chevron-up",
                    "icon"
                  )}
                ></i>
              </div>
            </div>
          )}
          {isSelectStudent && (
            students?.length > 0 ? (
              <div className={cx("select-dropdown")}>
                {students?.map((student) => (
                  <div
                    key={student.id}
                    className={cx("dropdown-item")}
                    onClick={() => handleSelectStudent(student)}
                  >
                    <img
                      src={student?.account?.profilepictureurl}
                      alt="avatar"
                      className={cx("avatar-img")}
                    />
                    <div className={cx("username")}>
                      {student?.account?.username}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={cx("select-dropdown-no-content")}>
                <div className={cx("no-data-search-container")}>
                  <img
                    src={emptyImg}
                    alt="empty-search"
                    className={cx("empty-search-img")}
                  />
                  <span className={cx("empty-search-text")}>
                    No data available
                  </span>
                </div>
              </div>
            )
          )}
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
                {ratings[dimension.id] ? `${ratings[dimension.id]}/5` : 'Not rated'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={cx("narrative-container")}>
        <div className={cx("title")}>
          Detailed Narrative Feedback
        </div>
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
