import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./MultiStepProgressBar.module.scss";
const cx = classNames.bind(styles);

function MultiStepProgressBar({ steps, currentStep }) {
  return (
    <div className={cx("multi-step-progress-bar")}>
      {steps.map((step, index) => (
        <div
          className={cx("step-item", {
            completed: currentStep > index,
            active: currentStep >= index,
          })}
          key={index}
        >
          <i
            className={cx({
              "fa-regular fa-circle-check": currentStep > index,
              "fa-regular fa-circle": currentStep <= index,
              "step-icon": true,
            })}
          ></i>
          <div className={cx("step-item-label")}>{step.label}</div>
        </div>
      ))}
    </div>
  );
}

MultiStepProgressBar.propTypes = {
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default MultiStepProgressBar;
