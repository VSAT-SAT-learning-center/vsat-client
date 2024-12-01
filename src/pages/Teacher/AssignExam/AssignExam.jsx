import { Skeleton } from "@mui/material";
import { DatePicker } from "antd";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoData from "~/assets/images/content/nodata1.png";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Teacher/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./AssignExam.module.scss";
const cx = classNames.bind(styles);

function AssignExam() {
  const [examTypes, setExamTypes] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [assignedProfiles, setAssignedProfiles] = useState({});
  const [isWaiting, setIsWaiting] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchExamTypesAndProfiles = async () => {
      try {
        setIsWaiting(true);
        const [examTypesResponse, profilesResponse] = await Promise.all([
          apiClient.get("/exam-types?page=1&pageSize=0"),
          apiClient.get("/study-profiles/getStudyProfileCompleteByTeacher?page=1&pageSize=0"),
        ]);

        const fetchedExamTypes = examTypesResponse.data.data.data.filter(
          (type) => type.name !== "Trial Exam"
        );
        const fetchedProfiles = profilesResponse.data.data.data;
        setExamTypes(fetchedExamTypes);
        setProfiles(fetchedProfiles);

        if (fetchedExamTypes.length > 0) {
          const defaultExamType = fetchedExamTypes[0];
          setSelectedExamType(defaultExamType.name);
          await fetchExamsForExamType(defaultExamType.name);
        }
      } catch (error) {
        console.error("Failed to fetch exam types or profiles:", error);
      } finally {
        setIsWaiting(false);
      }
    };

    fetchExamTypesAndProfiles();
  }, []);

  // Function to fetch exams for a specific exam type
  const fetchExamsForExamType = async (examTypeName) => {
    try {
      const response = await apiClient.get(`/exams/getExamByExamType/${examTypeName}`);
      const fetchedExams = response.data.data;
      setExams(fetchedExams);
      if (fetchedExams.length > 0) {
        setSelectedExam(fetchedExams[0].id);
      } else {
        setSelectedExam("");
      }
    } catch (error) {
      console.error("Failed to fetch exams for exam type:", error);
    }
  };

  // Handle exam type change
  const handleExamTypeChange = async (newExamTypeName) => {
    setSelectedExamType(newExamTypeName); // Update state for the selected exam type
    await fetchExamsForExamType(newExamTypeName); // Fetch exams for the selected type
  };

  // Move item to the right (assign to the teacher)
  const moveToRight = (itemId) => {
    const movedItem = profiles.find((item) => item.id === itemId);
    setProfiles((prev) => prev.filter((item) => item.id !== itemId));
    setAssignedProfiles((prev) => ({
      ...prev,
      [selectedExam]: {
        ...prev[selectedExam],
        additionalProfiles: [...(prev[selectedExam]?.additionalProfiles || []), movedItem],
      },
    }));
  };

  // Move item to the left (remove from the teacher)
  const moveToLeft = (itemId) => {
    const movedItem = assignedProfiles[selectedExam]?.additionalProfiles.find(
      (item) => item.id === itemId
    );
    setAssignedProfiles((prev) => ({
      ...prev,
      [selectedExam]: {
        ...prev[selectedExam],
        additionalProfiles: prev[selectedExam]?.additionalProfiles.filter(
          (item) => item.id !== itemId
        ),
      },
    }));
    setProfiles((prev) => [...prev, movedItem]);
  };

  const resetProfiles = () => {
    setProfiles((prevProfiles) => {
      // Combine existing profiles with the assigned profiles to reset
      const assigned = assignedProfiles[selectedExam]?.additionalProfiles || [];
      return [...prevProfiles, ...assigned]; // Merge profiles back
    });

    // Reset the assigned profiles for the selected exam
    setAssignedProfiles((prev) => ({
      ...prev,
      [selectedExam]: { additionalProfiles: [] },
    }));
  };


  const handleSave = async () => {
    try {
      // Extract studyProfileIds from assignedProfiles
      const studyProfileIds = assignedProfiles[selectedExam]?.additionalProfiles.map(
        (profile) => profile.id
      );

      const localDateTime = selectedDate
        ? selectedDate.format("YYYY-MM-DDTHH:mm:ss")
        : moment().format("YYYY-MM-DDTHH:mm:ss");

      // Construct payload
      const payload = {
        examId: selectedExam,
        attemptdatetime: localDateTime,
        studyProfileIds,
      };
      await apiClient.post("/exam-attempts/createExamAttemptWithExam/exam", payload);
      setAssignedProfiles((prev) => ({
        ...prev,
        [selectedExam]: {
          defaultProfiles: [
            ...(prev[selectedExam]?.defaultProfiles || []),
            ...(prev[selectedExam]?.additionalProfiles || []),
          ],
          additionalProfiles: [],
        },
      }));
      toast.success("Assign exam successfully!", {
        autoClose: 1500
      })
    } catch (error) {
      console.error("Failed to save assignments:", error);
      toast.error("Assign exam failed!", {
        autoClose: 1500
      })
    }
  };

  return (
    <PageLayout>
      <div className={cx("teacher-assign-exam-wrapper")}>
        <div className={cx("teacher-assign-exam-container")}>
          <div className={cx("teacher-assign-exam-header")}>
            <div className={cx("teacher-assign-exam-text")}>Assign Exam</div>
            <div className={cx("teacher-assign-exam-options")}>
              <button
                className={cx("reset-btn", {
                  disabled:
                    (assignedProfiles[selectedExam]?.additionalProfiles?.length || 0) === 0 &&
                    (assignedProfiles[selectedExam]?.defaultProfiles?.length || 0) === 0,
                })}
                onClick={resetProfiles}
                disabled={
                  (assignedProfiles[selectedExam]?.additionalProfiles?.length || 0) === 0 &&
                  (assignedProfiles[selectedExam]?.defaultProfiles?.length || 0) === 0
                }
              >
                Reset
              </button>
              <button
                className={cx("save-btn", {
                  disabled: (assignedProfiles[selectedExam]?.additionalProfiles?.length || 0) === 0,
                })}
                onClick={handleSave}
                disabled={(assignedProfiles[selectedExam]?.additionalProfiles?.length || 0) === 0}
              >
                Save
              </button>
            </div>
          </div>
          {isWaiting ? (
            <div className={cx("teacher-assign-exam-no-content")}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="60%"
                height={535}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="40%"
                height={535}
              />
            </div>
          ) : (
            <div className={cx("teacher-assign-exam-content")}>
              <div
                className={cx("study-profile-list", {
                  "no-data-list": profiles?.length <= 0,
                })}
              >
                {profiles?.length > 0 ? (
                  profiles?.map((item) => (
                    <div key={item.id} className={cx("study-profile-item")}>
                      <div className={cx("profile-header")}>
                        <div className={cx("profile-infor")}>
                          <img
                            src={item?.account?.profilepictureurl}
                            alt="profile-avatar"
                            className={cx("profile-avatar")}
                          />
                          <div className={cx("profile-name")}>
                            {item?.account?.username}
                          </div>
                        </div>
                        <div className={cx("profile-date")}>
                          {item?.startdate} -{" "}
                          {item?.enddate}
                        </div>
                      </div>
                      <div className={cx("profile-content")}>
                        <div className={cx("profile-infor")}>
                          <div className={cx("target-item")}>
                            <div className={cx("target-icon")}>
                              <i
                                className={cx("fa-regular fa-layer-group")}
                              ></i>
                            </div>
                            <div className={cx("target-text")}>
                              Target Reading & Writing:{" "}
                              <span className={cx("target-number")}>
                                {item?.targetscoreRW}
                              </span>
                            </div>
                          </div>
                          <div className={cx("target-item")}>
                            <div className={cx("target-icon")}>
                              <i
                                className={cx("fa-regular fa-layer-group")}
                              ></i>
                            </div>
                            <div className={cx("target-text")}>
                              Target Math:{" "}
                              <span className={cx("target-number")}>
                                {item?.targetscoreMath}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={cx("profile-actions")}>
                          <button
                            onClick={() => moveToRight(item.id)}
                            className={cx("assign-button")}
                          >
                            <i className={cx("fa-solid fa-user-plus")}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={cx("no-data-content")}>
                    <img
                      src={NoData}
                      alt="no-data"
                      className={cx("no-data-img")}
                    />
                    <div className={cx("no-data-text")}>No more data</div>
                  </div>
                )}
              </div>
              <div className={cx("target-assign-study-profile")}>
                <div className={cx("target-header")}>
                  <select
                    value={selectedExamType}
                    onChange={(e) => handleExamTypeChange(e.target.value)}
                    className={cx("exam-type-select")}
                  >
                    {examTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className={cx("exam-select")}
                    disabled={exams.length === 0}
                  >
                    {exams.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.title}
                      </option>
                    ))}
                  </select>
                  <DatePicker
                    format="DD/MM/YYYY"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className={cx("custom-date-picker")}
                  />
                </div>
                <div className={cx("target-content")}>
                  <div className={cx("target-title")}>
                    Assigned Profiles for Exam
                  </div>
                  {assignedProfiles[selectedExam]?.defaultProfiles?.length > 0 ||
                    assignedProfiles[selectedExam]?.additionalProfiles?.length > 0 ? (
                    // Show target-list if there are profiles
                    <div className={cx("target-list")}>
                      {/* Render default profiles */}
                      {assignedProfiles[selectedExam]?.defaultProfiles?.map((item) => (
                        <div
                          key={item.id}
                          className={cx("target-profile", "default-profile")}
                        >
                          <div className={cx("profile-infor")}>
                            <img
                              src={item?.account?.profilepictureurl}
                              alt="Default profile avatar"
                              className={cx("profile-avatar")}
                            />
                            <div className={cx("profile-name")}>{item?.account?.username}</div>
                          </div>
                          <span className={cx("default-label")}>Default</span>
                        </div>
                      ))}

                      {/* Render additional profiles */}
                      {assignedProfiles[selectedExam]?.additionalProfiles?.map((item) => (
                        <div key={item.id} className={cx("target-profile")}>
                          <div className={cx("profile-infor")}>
                            <img
                              src={item?.account?.profilepictureurl}
                              alt="Additional profile avatar"
                              className={cx("profile-avatar")}
                            />
                            <div className={cx("profile-name")}>{item?.account?.username}</div>
                          </div>
                          <button
                            onClick={() => moveToLeft(item.id)}
                            className={cx("remove-button")}
                          >
                            <i className={cx("fa-solid fa-user-minus")}></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Show no-data message if no profiles
                    <div className={cx("target-list-no-data")}>
                      <div className={cx("no-data-content")}>
                        <img
                          src={NoData}
                          alt="No data available"
                          className={cx("no-data-img")}
                        />
                        <div className={cx("no-data-text")}>No assigned profiles</div>
                      </div>
                    </div>
                  )}
                </div>


              </div>
            </div>
          )}
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default AssignExam;
