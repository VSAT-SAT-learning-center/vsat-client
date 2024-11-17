import { Slider } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import apiClient from "~/services/apiService";
import styles from "./EnterTargetModal.module.scss";
const cx = classNames.bind(styles);
function EnterTargetModal({
  examResult,
  setLearningPartData,
  setShowEnterTarget,
  setShowLearningPath,
  setIsLoading,
}) {
  // console.log(examResult);

  const [rwTarget, setRwTarget] = useState(200);
  const [mathTarget, setMathTarget] = useState(200);
  const [totalTarget, setTotalTarget] = useState(400);

  const handleRwChange = (e, value) => {
    setRwTarget(value);
    setTotalTarget(value + mathTarget);
  };

  const handleMathChange = (e, value) => {
    setMathTarget(value);
    setTotalTarget(value + rwTarget);
  };

  const handleClickContinue = async () => {
    try {
      setIsLoading(true);
      const targetData = {
        targetLearningRW: rwTarget,
        targetLearningMath: mathTarget,
      };
      const response = await apiClient.post(
        `/exam-attempts/${examResult?.attemptId}`,
        targetData
      );
      setShowEnterTarget(false);
      setShowLearningPath(true);
      setLearningPartData(response.data.data);
    } catch (error) {
      console.error("Error while creating target learning", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cx("enter-target-popup-wrapper")}>
      <div className={cx("enter-target-popup-container")}>
        <div className={cx("enter-target-popup-content")}>
          <div className={cx("content-title")}>Set Your Learning Targets</div>
          <div className={cx("content-desc")}>
            Define your target scores for Reading & Writing and Math to guide
            your learning journey at VSAT.
          </div>
          <div className={cx("enter-target-container")}>
            <div className={cx("enter-target-item")}>
              <div className={cx("target-top")}>
                <div className={cx("enter-title")}>
                  Target for Reading & Writing{" "}
                  <span className={cx("highlight")}>(200 - 800)</span>
                </div>
                <div className={cx("value-target")}>{rwTarget}</div>
              </div>
              <div className={cx("enter-target")}>
                <Slider
                  value={rwTarget}
                  onChange={handleRwChange}
                  valueLabelDisplay="auto"
                  shiftStep={50}
                  step={50}
                  marks
                  min={200}
                  max={800}
                  sx={{
                    color: "#000000",
                  }}
                />
              </div>
            </div>
            <div className={cx("enter-target-item")}>
              <div className={cx("target-top")}>
                <div className={cx("enter-title")}>
                  Target for Math{" "}
                  <span className={cx("highlight")}>(200 - 800)</span>
                </div>
                <div className={cx("value-target")}>{mathTarget}</div>
              </div>
              <div className={cx("enter-target")}>
                <Slider
                  value={mathTarget}
                  onChange={handleMathChange}
                  valueLabelDisplay="auto"
                  shiftStep={50}
                  step={50}
                  marks
                  min={200}
                  max={800}
                  sx={{
                    color: "#000000",
                  }}
                />
              </div>
            </div>
            <div className={cx("enter-target-item")}>
              <div className={cx("target-top")}>
                <div className={cx("enter-title")}>
                  Target Total{" "}
                  <span className={cx("highlight")}>(400 - 1600)</span>
                </div>
                <div className={cx("value-target")}>{totalTarget}</div>
              </div>
              <div className={cx("enter-target")}>
                <Slider
                  value={totalTarget}
                  disabled
                  valueLabelDisplay="auto"
                  step={50}
                  marks
                  min={400}
                  max={1600}
                  sx={{
                    color: "#000000",
                    ".Mui-disabled": {
                      color: "#000000",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("enter-target-popup-footer")}>
          <button className={cx("continue-btn")} onClick={handleClickContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnterTargetModal;
