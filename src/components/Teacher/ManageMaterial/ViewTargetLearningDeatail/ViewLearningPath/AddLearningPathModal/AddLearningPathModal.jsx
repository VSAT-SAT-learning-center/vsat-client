import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import styles from "./AddLearningPathModal.module.scss";
const cx = classNames.bind(styles);

function AddLearningPathModal({ existData, setIsShowAddLearningPath, onAddUnit }) {

  const [units, setUnits] = useState([])
  const [isWaiting, setIsWaiting] = useState(false)
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setIsWaiting(true);
        const response = await apiClient.get(`/target-learnings/unit/${existData?.sectionId}`);
        const allUnits = response.data;

        // Filter out units that already exist in `unitExistId`
        const nonExistingUnits = allUnits.filter(
          (unit) => !existData?.unitExistId?.includes(unit.unitId)
        );

        // Sort by level dynamically
        const presentLevels = [...new Set(nonExistingUnits.map((unit) => unit.level.name))];
        const dynamicOrder = ["Foundation", "Medium", "Advanced"].filter((level) =>
          presentLevels.includes(level)
        );

        const sortedUnits = nonExistingUnits.sort((a, b) => {
          return dynamicOrder.indexOf(a.level.name) - dynamicOrder.indexOf(b.level.name);
        });

        setUnits(sortedUnits);
      } catch (error) {
        console.error("Error while fetching units:", error);
      } finally {
        setIsWaiting(false);
      }
    };

    fetchUnits();
  }, [existData]);

  const handleAddUnit = (unit) => {
    onAddUnit(unit);
    setIsShowAddLearningPath(false);
  }
  return (
    <div className={cx("edit-learning-path-wrapper")}>
      <div className={cx("edit-learning-path-container")}>
        <div className={cx("edit-learning-path-header")}>
          <div
            className={cx("edit-close")}
            onClick={() => setIsShowAddLearningPath(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("edit-title")}>Add Learning Path</div>
          <div className={cx("edit-empty")}></div>
        </div>
        <div className={cx("edit-learning-path-content")}>
          {isWaiting ? (
            <>
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={136}
                />
              ))}
            </>
          ) : (
            units?.map((unit) => (
              <div className={cx("edit-learning-path-item")} key={unit.unitId} onClick={() => handleAddUnit(unit)}>
                <div className={cx("item-header")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-book")}></i>
                  </div>
                  <div className={cx("item-title")}>
                    <div className={cx("title")}>{unit.unitTitle}</div>
                  </div>
                </div>
                <div className={cx("item-content")}>
                  <div className={cx("item-level")}>
                    <div className={cx("name-icon")}>
                      <i className={cx("fa-regular fa-layer-group")}></i>
                    </div>
                    <div className={cx("name-text")}>{unit.level.name}</div>
                  </div>
                  <div className={cx("item-number")}>
                    <div className={cx("item-count")}>
                      <div className={cx("name-icon")}>
                        <i className={cx("fa-regular fa-book-open")}></i>
                      </div>
                      <div className={cx("name-text")}>{unit.unitAreaCount} Topics</div>
                    </div>
                    <div className={cx("item-count")}>
                      <div className={cx("name-icon")}>
                        <i className={cx("fa-light fa-file-pen")}></i>
                      </div>
                      <div className={cx("name-text")}>{unit.lessonCount} Lessons</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AddLearningPathModal;
