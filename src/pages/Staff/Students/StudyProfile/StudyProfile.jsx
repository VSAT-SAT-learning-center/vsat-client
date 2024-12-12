import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoData from "~/assets/images/content/nodata1.png";
import Loader from "~/components/General/Loader";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./StudyProfile.module.scss";

const cx = classNames.bind(styles);

function StudyProfile() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [assignedProfiles, setAssignedProfiles] = useState({});
  const [isWaiting, setIsWaiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTeachersAndProfiles = async () => {
      try {
        setIsWaiting(true);
        const [teachersResponse, profilesResponse] = await Promise.all([
          apiClient.get("/account/getTeacher?page=1&pageSize=0"),
          apiClient.get("/study-profiles/getStudyProfile?page=1&pageSize=0"),
        ]);

        const fetchedTeachers = teachersResponse.data.data.data;
        const fetchedProfiles = profilesResponse.data.data.data;

        // Set default selection to the first teacher
        setTeachers(fetchedTeachers);
        if (fetchedTeachers.length > 0) {
          setSelectedTeacher(fetchedTeachers[0].id);
        }

        // Filter profiles into available and default profiles
        const defaultProfiles = fetchedProfiles.filter(
          (profile) => profile.teacherId !== null
        );
        const availableProfiles = fetchedProfiles.filter(
          (profile) => profile.teacherId === null
        );

        // Create assignedProfiles mapping for each teacher
        const assignedProfilesMap = fetchedTeachers.reduce((acc, teacher) => {
          acc[teacher.id] = {
            defaultProfiles: defaultProfiles.filter(
              (profile) => profile.teacherId === teacher.id
            ),
            additionalProfiles: [],
          };
          return acc;
        }, {});

        setProfiles(availableProfiles);
        setAssignedProfiles(assignedProfilesMap);
      } catch (error) {
        console.error("Failed to fetch teachers or profiles:", error);
      } finally {
        setIsWaiting(false);
      }
    };

    fetchTeachersAndProfiles();
  }, []);

  // Move item to the right (assign to the teacher)
  const moveToRight = (itemId) => {
    const movedItem = profiles.find((item) => item.id === itemId);
    setProfiles((prev) => prev.filter((item) => item.id !== itemId));
    setAssignedProfiles((prev) => ({
      ...prev,
      [selectedTeacher]: {
        ...prev[selectedTeacher],
        additionalProfiles: [
          ...prev[selectedTeacher].additionalProfiles,
          movedItem,
        ],
      },
    }));
  };

  // Move item to the left (remove from the teacher)
  const moveToLeft = (itemId) => {
    const movedItem = assignedProfiles[selectedTeacher].additionalProfiles.find(
      (item) => item.id === itemId
    );
    setAssignedProfiles((prev) => ({
      ...prev,
      [selectedTeacher]: {
        ...prev[selectedTeacher],
        additionalProfiles: prev[selectedTeacher].additionalProfiles.filter(
          (item) => item.id !== itemId
        ),
      },
    }));
    setProfiles((prev) => [...prev, movedItem]);
  };

  const resetProfiles = () => {
    setAssignedProfiles((prevAssignedProfiles) => {
      const selectedTeacherProfiles = prevAssignedProfiles[selectedTeacher];
      const additionalProfiles = selectedTeacherProfiles.additionalProfiles;

      // Add additional profiles back to the available profiles list
      setProfiles((prevProfiles) => [...prevProfiles, ...additionalProfiles]);

      // Reset the additionalProfiles for the selected teacher
      return {
        ...prevAssignedProfiles,
        [selectedTeacher]: {
          ...selectedTeacherProfiles,
          additionalProfiles: [], // Clear additional profiles
        },
      };
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // Get current additional profiles for the selected teacher
      const { additionalProfiles, defaultProfiles: currentDefaultProfiles } =
        assignedProfiles[selectedTeacher];

      // Combine defaultProfiles and additionalProfiles for saving
      const allProfiles = [...currentDefaultProfiles, ...additionalProfiles];

      // Prepare the payload
      const saveData = {
        teacherId: selectedTeacher,
        studyProfiles: allProfiles.map((profile) => ({
          studyProfileId: profile.id,
        })),
      };

      // API call to save the assignments
      await apiClient.put("/study-profiles/assignTeacher", saveData);

      // Recall the API to fetch updated profiles and update UI
      const profilesResponse = await apiClient.get(
        "/study-profiles/getStudyProfile?page=1&pageSize=0"
      );
      const updatedProfiles = profilesResponse.data.data.data;

      // Separate updated profiles into available and assigned
      const newAvailableProfiles = updatedProfiles.filter(
        (profile) => profile.teacherId === null
      );
      const updatedAssignedProfiles = updatedProfiles.filter(
        (profile) => profile.teacherId !== null
      );

      // Recalculate assignedProfiles mapping
      const newAssignedProfiles = teachers.reduce((acc, teacher) => {
        acc[teacher.id] = {
          defaultProfiles: updatedAssignedProfiles.filter(
            (profile) => profile.teacherId === teacher.id
          ),
          additionalProfiles: [],
        };
        return acc;
      }, {});

      setProfiles(newAvailableProfiles);
      setAssignedProfiles(newAssignedProfiles);
      toast.success("Profiles successfully assigned!", {
        autoClose: 2000,
      });
      console.log("Updated Profiles:", updatedProfiles);
      console.log("Assigned Profiles Map:", newAssignedProfiles);
    } catch (error) {
      console.error("Failed to assign profiles:", error);
      toast.error("Failed to assign profiles. Please try again!", {
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <PageLayout>
        <div className={cx("manage-study-profile-wrapper")}>
          <div className={cx("manage-study-profile-container")}>
            <div className={cx("manage-study-profile-header")}>
              <div className={cx("manage-study-profile-text")}>
                Assign Study Profiles
              </div>
            </div>

            {isWaiting ? (
              <div className={cx("manage-study-profile-no-content")}>
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
              <div className={cx("manage-study-profile-content")}>
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
                      id="teacher-select"
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                      className={cx("teacher-select")}
                    >
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {`${teacher.firstname} ${teacher.lastname}`}
                        </option>
                      ))}
                    </select>
                    <div className={cx("target-options")}>
                      <button
                        className={cx("reset-btn", {
                          disabled:
                            assignedProfiles[selectedTeacher]
                              ?.additionalProfiles?.length === 0 ||
                            assignedProfiles[selectedTeacher]?.defaultProfiles
                              ?.length === 0,
                        })}
                        onClick={resetProfiles}
                        disabled={
                          assignedProfiles[selectedTeacher]?.additionalProfiles
                            ?.length === 0 ||
                          assignedProfiles[selectedTeacher]?.defaultProfiles
                            ?.length === 0
                        }
                      >
                        Reset
                      </button>
                      <button
                        className={cx("save-btn", {
                          disabled:
                            assignedProfiles[selectedTeacher]
                              ?.additionalProfiles?.length === 0,
                        })}
                        onClick={handleSave}
                        disabled={
                          assignedProfiles[selectedTeacher]?.additionalProfiles
                            ?.length === 0
                        }
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div className={cx("target-content")}>
                    <div className={cx("target-title")}>
                      Assigned Profiles for{" "}
                      {
                        teachers.find(
                          (teacher) => teacher.id === selectedTeacher
                        )?.firstname
                      }{" "}
                      {
                        teachers.find(
                          (teacher) => teacher.id === selectedTeacher
                        )?.lastname
                      }
                    </div>
                    {assignedProfiles[selectedTeacher]?.defaultProfiles
                      ?.length > 0 ||
                      assignedProfiles[selectedTeacher]?.additionalProfiles
                        ?.length > 0 ? (
                      // Show target-list if there are profiles
                      <div className={cx("target-list")}>
                        {assignedProfiles[
                          selectedTeacher
                        ]?.defaultProfiles?.map((item) => (
                          <div
                            key={item.id}
                            className={cx("target-profile", "default-profile")}
                          >
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
                            <span className={cx("default-label")}>Default</span>
                          </div>
                        ))}
                        {assignedProfiles[
                          selectedTeacher
                        ]?.additionalProfiles?.map((item) => (
                          <div key={item.id} className={cx("target-profile")}>
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
                      // Show target-list-no-data if no profiles
                      <div className={cx("target-list-no-data")}>
                        <div className={cx("no-data-content")}>
                          <img
                            src={NoData}
                            alt="no-data"
                            className={cx("no-data-img")}
                          />
                          <div className={cx("no-data-text")}>No more data</div>
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
    </>
  );
}

export default StudyProfile;
