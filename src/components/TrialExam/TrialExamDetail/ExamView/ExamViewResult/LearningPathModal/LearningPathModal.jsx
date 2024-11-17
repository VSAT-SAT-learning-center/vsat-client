import classNames from "classnames/bind";
import styles from "./LearningPathModal.module.scss";
const cx = classNames.bind(styles);
function LearningPathModal({ learningPartData }) {
  const mergedData = [
    {
      section: "Reading & Writing",
      units: learningPartData.RW,
    },
    {
      section: "Math",
      units: learningPartData.Math,
    },
  ];

  const handleContinueLearning = () => {
    window.location.href = "/learning";
  };
  return (
    <div className={cx("learning-path-popup-wrapper")}>
      <div className={cx("learning-path-popup-container")}>
        <div className={cx("learing-path-header")}>
          <div className={cx("header-text")}>Learning Path</div>
        </div>
        <div className={cx("learning-path-container")}>
          {mergedData?.map((sectionData, index) => (
            <div className={cx("learning-path-content")} key={index}>
              <div className={cx("learning-path-title")}>
                Learning Path for {sectionData.section}
              </div>
              <div className={cx("learning-path-list")}>
                {sectionData.units?.map((item, idx) => (
                  <div className={cx("learning-path-item")} key={idx}>
                    <div className={cx("item-header")}>
                      <div className={cx("item-icon")}>
                        <i className={cx("fa-regular fa-book")}></i>
                      </div>
                      <div className={cx("item-title")}>Unit {idx + 1}</div>
                    </div>
                    <div className={cx("item-content")}>
                      <div className={cx("item-name")}>
                        <div className={cx("name-icon")}>
                          <i className={cx("fa-regular fa-layer-group")}></i>
                        </div>
                        <div className={cx("name-text")}>
                          {item.unit?.title}
                        </div>
                      </div>
                      <div className={cx("item-level")}>
                        <div className={cx("name-icon")}>
                          <i className={cx("fa-regular fa-layer-group")}></i>
                        </div>
                        <div className={cx("name-text")}>
                          {item.unit?.level?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className={cx("learning-path-footer")}
          onClick={handleContinueLearning}
        >
          <button className={cx("continue-btn")}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default LearningPathModal;
