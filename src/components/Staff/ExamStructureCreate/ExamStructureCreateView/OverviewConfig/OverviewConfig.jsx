import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./OverviewConfig.module.scss";
const cx = classNames.bind(styles);

function OverviewConfig({
  examStructureData,
  examScorePick,
  distributionQuestionPick,
}) {
  console.log(examStructureData)
  const [groupedModules, setGroupedModules] = useState([]);

  useEffect(() => {
    if (examStructureData?.moduleType) {
      const grouped = examStructureData.moduleType.reduce((acc, item) => {
        let section = acc.find((s) => s.name === item.section);
        if (!section) {
          section = { name: item.section, modules: [] };
          acc.push(section);
        }

        if (examStructureData.examStructureType === "Adaptive") {
          // Add Module 1 and a unique Module 2 with level "Easy"
          if (
            item.name === "Module 1" ||
            (item.name === "Module 2" && item.level === "Easy")
          ) {
            section.modules.push({
              name: item.name,
              level: item.level,
              numberOfQuestion: item.numberOfQuestion,
              domainDistribution: item.domainDistribution,
            });
          }
        } else if (examStructureData.examStructureType === "Non-Adaptive") {
          // For Non-Adaptive, set level to null for Module 2
          if (item.name === "Module 1" || item.name === "Module 2") {
            section.modules.push({
              name: item.name,
              level: item.name === "Module 2" ? null : item.level,
              numberOfQuestion: item.numberOfQuestion,
              domainDistribution: item.domainDistribution,
            });
          }
        }

        return acc;
      }, []);
      setGroupedModules(grouped);
    }
  }, [examStructureData]);

  return (
    <div className={cx("overview-config-wrapper")}>
      <div className={cx("overview-config-container")}>
        <div className={cx("overview-config-header")}>
          <div className={cx("config-text")}>Overview Config</div>
        </div>
        <div className={cx("overview-config-content")}>
          <div className={cx("config-information")}>
            <div className={cx("config-infor-item")}>
              <div className={cx("config-title")}>Exam Structure Name</div>
              <div className={cx("config-input")}>
                <div className={cx("title-input")}>
                  {examStructureData?.structurename}
                </div>
              </div>
            </div>
            <div className={cx("config-infor-item")}>
              <div className={cx("config-title")}>
                Exam Structure Description
              </div>
              <div className={cx("config-input")}>
                <div className={cx("title-input")}>
                  {examStructureData?.description}
                </div>
              </div>
            </div>
          </div>
          <div className={cx("config-mechanism")}>
            <div className={cx("config-type")}>
              <div className={cx("type-section")}>Exam Structure Type</div>
              <div className={cx("config-input")}>
                <div className={cx("title-input")}>
                  {examStructureData?.examStructureType}
                </div>
              </div>
            </div>
            <div className={cx("config-score")}>
              <div className={cx("score-selection")}>
                <div className={cx("type-section")}>
                  Exam Question Distribution
                </div>
                <div className={cx("config-input")}>
                  <div className={cx("title-input")}>
                    {distributionQuestionPick}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("config-score")}>
              <div className={cx("score-selection")}>
                <div className={cx("type-section")}>Exam Structure Score</div>
                <div className={cx("config-input")}>
                  <div className={cx("title-input")}>{examScorePick}</div>
                </div>
              </div>
            </div>
          </div>
          {examStructureData?.examStructureType === "Adaptive" && (
            <div className={cx("config-with-mechanism")}>
              <div className={cx("mechanism-item")}>
                <div className={cx("mechanism-title")}>
                  Required correct question in Module 1{" "}
                  <span className={cx("required")}>(Reading & Writing)</span>
                </div>
                <div className={cx("mechanism-input")}>
                  <div className={cx("title-input")}>
                    {examStructureData?.requiredCorrectInModule1RW}
                  </div>
                </div>
              </div>
              <div className={cx("mechanism-item")}>
                <div className={cx("mechanism-title")}>
                  Required correct question in Module 1{" "}
                  <span className={cx("required")}>(Math)</span>
                </div>
                <div className={cx("mechanism-input")}>
                  <div className={cx("title-input")}>
                    {examStructureData?.requiredCorrectInModule1M}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={cx("section-view-module-wrapper")}>
            {groupedModules?.length > 0 &&
              groupedModules.map((section, index) => (
                <div
                  className={cx("section-view-module-container")}
                  key={index}
                >
                  <div className={cx("section-view-module-header")}>
                    <div className={cx("section-icon")}>
                      <i className={cx("fa-regular fa-book", "icon")}></i>
                    </div>
                    <div className={cx("section-infor")}>
                      <div className={cx("section-title")}>{section.name}</div>
                      <div className={cx("section-number")}>
                        {section.name === "Math" ? 44 : 54}
                      </div>
                    </div>
                  </div>
                  <div className={cx("section-view-module-content")}>
                    {section.modules.map((module, idx) => (
                      <div className={cx("module-item-container")} key={idx}>
                        <div className={cx("module-item-header")}>
                          <div className={cx("module-icon")}>
                            <i
                              className={cx("fa-regular fa-file-pen", "icon")}
                            ></i>
                          </div>
                          <div className={cx("module-infor")}>
                            <div className={cx("module-title")}>
                              {module.name}
                            </div>
                            <div className={cx("module-number")}>
                              {module.numberOfQuestion}
                            </div>
                          </div>
                        </div>
                        <div className={cx("module-item-content")}>
                          {module.domainDistribution.map((domain, indx) => (
                            <div className={cx("domain-item")} key={indx}>
                              <div className={cx("domain-infor")}>
                                <div className={cx("domain-icon")}>
                                  <i
                                    className={cx(
                                      "fa-regular fa-pen-to-square",
                                      "icon"
                                    )}
                                  ></i>
                                </div>
                                <div className={cx("domain-title")}>
                                  {domain.domain}
                                </div>
                              </div>
                              <div className={cx("domain-number")}>
                                {domain.numberOfQuestion}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewConfig;
