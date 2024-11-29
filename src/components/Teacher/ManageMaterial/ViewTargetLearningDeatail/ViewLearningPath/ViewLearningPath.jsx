import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "~/contexts/AuthContext";
import apiClient from "~/services/apiService";
import AddLearningPathModal from "./AddLearningPathModal";
import EditLearningPathModal from "./EditLearningPathModal";
import styles from "./ViewLearningPath.module.scss";
const cx = classNames.bind(styles);

function ViewLearningPath({ target, setIsShowViewTargetLearning, setIsShowViewStudyProfile }) {
  const { user } = useContext(AuthContext);
  const [isShowEditLearningPath, setIsShowEditLearningPath] = useState(false)
  const [isShowAddLearningPath, setIsShowAddLearningPath] = useState(false)
  const [learningPaths, setLearningPaths] = useState([])
  const [unitUpdateData, setUnitUpdateData] = useState(null)
  const [unitAddData, setUnitAddData] = useState(null)
  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        const response = await apiClient.get(`/target-learnings/{targetLearningId}/unit-progresses?targetLearningId=${target?.id}`)
        const data = response.data.data;
        const formattedLearningPaths = data
          .map((item) => ({
            section: item.section,
            unitProgress: item.unitProgresses,
          }))
          .sort((a, b) => {
            if (a.section.name === "Reading & Writing") return -1;
            if (b.section.name === "Reading & Writing") return 1;
            return a.section.name.localeCompare(b.section.name);
          });
        setLearningPaths(formattedLearningPaths);
      } catch (error) {
        console.error("Error while fetching learning path:", error)
      }
    }

    fetchLearningPath()
  }, [target?.id])

  const handleEditClick = (sectionId, unitProgress, currentUnitId) => {
    const newData = {
      sectionId,
      unitExistId: unitProgress.map((unit) => unit.unitId),
      currentUnitId,
    };
    setUnitUpdateData(newData);
    setIsShowEditLearningPath(true);
  };

  const handleAddPathClick = (sectionId, unitProgress) => {
    const newData = {
      sectionId,
      unitExistId: unitProgress.map((unit) => unit.unitId),
    };
    setUnitAddData(newData);
    setIsShowAddLearningPath(true);
  };

  const handleAddUnitToSection = (newUnit) => {
    setLearningPaths((prevPaths) =>
      prevPaths.map((path) =>
        path.section.id === newUnit.section.id
          ? {
            ...path,
            unitProgress: [...path.unitProgress, newUnit],
          }
          : path
      )
    );

    setUnitAddData((prevData) => {
      const updatedUnitExistId = [
        ...(prevData?.unitExistId || []),
        newUnit.id,
      ];

      return {
        sectionId: newUnit.section.id,
        unitExistId: updatedUnitExistId,
      };
    });
  };

  const handleDeleteUnit = (sectionId, unitId) => {
    setLearningPaths((prevPaths) =>
      prevPaths.map((path) =>
        path.section.id === sectionId
          ? {
            ...path,
            unitProgress: path.unitProgress.filter((unit) => unit.unitId !== unitId),
          }
          : path
      )
    );

    setUnitAddData((prevData) => {
      if (prevData?.sectionId !== sectionId) {
        return prevData;
      }

      const updatedUnitExistId = (prevData?.unitExistId || []).filter((id) => id !== unitId);

      return {
        ...prevData,
        unitExistId: updatedUnitExistId,
      };
    });
  };

  const handleUpdateUnit = (updatedUnit, sectionId, currentUnitId) => {
    setLearningPaths((prevPaths) =>
      prevPaths.map((path) =>
        path.section.id === sectionId
          ? {
            ...path,
            unitProgress: path.unitProgress.map((unit) =>
              unit.unitId === currentUnitId ? updatedUnit : unit
            ),
          }
          : path
      )
    );

    setUnitUpdateData((prevData) => {
      const updatedUnitExistId = [
        ...(prevData?.unitExistId || []),
        updatedUnit.unitId,
      ];
      return {
        ...prevData,
        unitExistId: updatedUnitExistId,
      };
    });

    setIsShowEditLearningPath(false);
  };

  const handleSaveUpdatePath = async () => {
    const updatedData = learningPaths.map((path) => ({
      sectionId: path.section.id,
      targetLearningId: target?.id,
      unitProgresses: path.unitProgress.map((unit) => ({
        unitId: unit.unitId
      })),
    }));
    try {
      const response = await apiClient.post("/unit-progress/multiple-sync", updatedData)
      console.log(response.data);
      setIsShowViewTargetLearning(false)
      setIsShowViewStudyProfile(false)
      toast.success("Update learning path successfully!", {
        autoClose: 2000,
      })
    } catch (error) {
      console.error("Error when update learning path:", error)
      toast.error("Fail to learning path!", {
        autoClose: 2000,
      })
    }
  }
  return (
    <>
      {isShowAddLearningPath && (
        <AddLearningPathModal
          existData={unitAddData}
          setIsShowAddLearningPath={setIsShowAddLearningPath}
          onAddUnit={handleAddUnitToSection}
        />
      )}
      {isShowEditLearningPath && (
        <EditLearningPathModal
          existData={unitUpdateData}
          setIsShowEditLearningPath={setIsShowEditLearningPath}
          onUpdateUnit={handleUpdateUnit}
        />
      )}
      <div className={cx("view-learning-path-wrapper")}>
        <div className={cx("view-learning-path-container")}>
          {learningPaths?.map((learningPath, index) => (
            <div className={cx("view-learing-path-item-container")} key={index}>
              <div className={cx("learning-path-header")}>
                <div className={cx("learning-path-title")}>
                  Learning path for {learningPath.section.name}
                </div>
                {(target.targetlearningdetail[0].status === "Inactive" && user?.role === "Teacher") && (
                  <button className={cx("add-path-btn")} onClick={() =>
                    handleAddPathClick(
                      learningPath.section.id,
                      learningPath.unitProgress
                    )
                  }>
                    <i
                      className={cx("fa-regular fa-plus-circle", "path-icon")}
                    ></i>
                    <span className={cx("path-text")}>Add Path</span>
                  </button>
                )}
              </div>
              <div className={cx("learning-path-list")}>
                {learningPath.unitProgress.map((unit, unitIndex) => (
                  <div key={unit.unitId} className={cx("learning-path-item")}>
                    <div className={cx("item-header")}>
                      <div className={cx("item-icon")}>
                        <i className={cx("fa-regular fa-book")}></i>
                      </div>
                      <div className={cx("item-title")}>
                        <div className={cx("title")}>Unit {unitIndex + 1}</div>
                        {(target.targetlearningdetail[0].status === "Inactive" && user?.role === "Teacher") && (
                          <div className={cx("item-action")}>
                            <button
                              className={cx("edit-btn")}
                              onClick={() =>
                                handleEditClick(
                                  learningPath.section.id,
                                  learningPath.unitProgress,
                                  unit.unitId
                                )
                              }
                            >
                              <i
                                className={cx("fa-regular fa-pen-to-square")}
                              ></i>
                            </button>
                            <button
                              className={cx("delete-btn")}
                              onClick={() => handleDeleteUnit(learningPath.section.id, unit.unitId)}
                            >
                              <i
                                className={cx("fa-regular fa-trash")}
                              ></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={cx("item-content")}>
                      <div className={cx("item-name")}>
                        <div className={cx("name-icon")}>
                          <i className={cx("fa-regular fa-pen")}></i>
                        </div>
                        <div className={cx("name-text")}>{unit.unitTitle}</div>
                      </div>
                      <div className={cx("item-level")}>
                        <div className={cx("name-icon")}>
                          <i className={cx("fa-regular fa-layer-group")}></i>
                        </div>
                        <div className={cx("name-text")}>
                          {unit.level.name}
                        </div>
                      </div>
                      <div className={cx("item-number")}>
                        <div className={cx("item-count")}>
                          <div className={cx("name-icon")}>
                            <i className={cx("fa-regular fa-book-open")}></i>
                          </div>
                          <div className={cx("name-text")}>
                            {unit.unitAreaCount} Topics
                          </div>
                        </div>
                        <div className={cx("item-count")}>
                          <div className={cx("name-icon")}>
                            <i className={cx("fa-light fa-file-pen")}></i>
                          </div>
                          <div className={cx("name-text")}>
                            {unit.lessonCount} Lessons
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
        <div className={cx("view-learning-path-footer")}>
          <button className={cx("cancel-btn")} onClick={() => setIsShowViewTargetLearning(false)}>Cancel</button>
          {(target.targetlearningdetail[0].status === "Inactive" && user?.role === "Teacher") && (
            <button className={cx("save-btn")} onClick={handleSaveUpdatePath}>Save</button>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewLearningPath;
