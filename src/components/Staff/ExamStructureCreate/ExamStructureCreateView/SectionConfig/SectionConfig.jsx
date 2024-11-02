import classNames from "classnames/bind";
import styles from "./SectionConfig.module.scss";
const cx = classNames.bind(styles);

function SectionConfig({
  sectionRWConfigData,
  sectionMathConfigData,
  setSectionRWConfigData,
  setSectionMathConfigData,
}) {
  const handleRWInputChange = (index, value) => {
    const updatedRWConfigData = [...sectionRWConfigData];
    updatedRWConfigData[index].questions = value === "" ? "" : Number(value);
    setSectionRWConfigData(updatedRWConfigData);
  };

  const handleRWInputBlur = (index) => {
    const updatedRWConfigData = [...sectionRWConfigData];
    const { questions, minQuestion, maxQuestion } = updatedRWConfigData[index];
    if (questions < minQuestion) {
      updatedRWConfigData[index].questions = minQuestion;
    } else if (questions > maxQuestion) {
      updatedRWConfigData[index].questions = maxQuestion;
    }
    setSectionRWConfigData(updatedRWConfigData);
  };

  const handleMathInputChange = (index, value) => {
    const updatedMathConfigData = [...sectionMathConfigData];
    updatedMathConfigData[index].questions = value === "" ? "" : Number(value);
    setSectionMathConfigData(updatedMathConfigData);
  };

  const handleMathInputBlur = (index) => {
    const updatedMathConfigData = [...sectionMathConfigData];
    const { questions, minQuestion, maxQuestion } =
      updatedMathConfigData[index];
    if (questions < minQuestion) {
      updatedMathConfigData[index].questions = minQuestion;
    } else if (questions > maxQuestion) {
      updatedMathConfigData[index].questions = maxQuestion;
    }
    setSectionMathConfigData(updatedMathConfigData);
  };

  return (
    <div className={cx("section-config-wrapper")}>
      <div className={cx("section-config-container")}>
        <div className={cx("section-config-header")}>
          <div className={cx("config-text")}>Section Config</div>
        </div>
        <div className={cx("section-config-content")}>
          <div className={cx("section-item-config", "section-rw")}>
            <div className={cx("section-title")}>Reading & Writing</div>
            <div className={cx("section-config")}>
              {sectionRWConfigData?.map((item, index) => (
                <div className={cx("item-config")} key={index}>
                  <div className={cx("config-domain")}>
                    <div className={cx("domain-icon")}>
                      <i
                        className={cx("fa-regular fa-pen-to-square", "icon")}
                      ></i>
                    </div>
                    <div className={cx("domain-text")}>{item?.domain}</div>
                  </div>
                  <div className={cx("config-number")}>
                    <input
                      type="number"
                      value={item?.questions}
                      className={cx("number-input")}
                      onChange={(e) =>
                        handleRWInputChange(index, e.target.value)
                      }
                      onBlur={() => handleRWInputBlur(index)}
                      min={item.minQuestion}
                      max={item.maxQuestion}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("section-item-config", "section-math")}>
            <div className={cx("section-title")}>Math</div>
            <div className={cx("section-config")}>
              {sectionMathConfigData?.map((item, index) => (
                <div className={cx("item-config")} key={index}>
                  <div className={cx("config-domain")}>
                    <div className={cx("domain-icon")}>
                      <i
                        className={cx("fa-regular fa-pen-to-square", "icon")}
                      ></i>
                    </div>
                    <div className={cx("domain-text")}>{item?.domain}</div>
                  </div>
                  <div className={cx("config-number")}>
                    <input
                      type="number"
                      value={item?.questions}
                      className={cx("number-input")}
                      onChange={(e) =>
                        handleMathInputChange(index, e.target.value)
                      }
                      onBlur={() => handleMathInputBlur(index)}
                      min={item.minQuestion}
                      max={item.maxQuestion}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionConfig;
