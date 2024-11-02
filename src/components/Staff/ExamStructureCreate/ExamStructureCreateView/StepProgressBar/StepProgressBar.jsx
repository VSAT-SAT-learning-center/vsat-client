import classNames from "classnames/bind";
import styles from "./StepProgressBar.module.scss";
const cx = classNames.bind(styles);

const StepProgressBar = ({ steps, currentStep }) => {
  return (
    <div className={cx("step-progress-bar")}>
      {steps.map((step, index) => (
        <div className={cx("step-item")} key={index}>
          <div
            className={cx("step-content", {
              completed: index < currentStep,
              active: index === currentStep,
            })}
          >
            <div className={cx("step-circle")}>
              {index < currentStep ? (
                <i className={cx("fa-regular fa-check")}></i>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div
              className={cx("step-label", {
                completed: index < currentStep,
                active: index === currentStep,
              })}
            >
              {step}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cx("step-line", {
                "completed-line": index < currentStep,
              })}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;
