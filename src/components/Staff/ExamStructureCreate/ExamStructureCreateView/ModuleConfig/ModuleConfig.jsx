import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./ModuleConfig.module.scss";
import ModuleItem from "./ModuleItem";
const cx = classNames.bind(styles);

function ModuleConfig({
  examStructureData,
  setExamStructureData,
  domainDistributionConfigs,
}) {
  const [activeModule, setActiveModule] = useState("RW");
  const [moduleData, setModuleData] = useState(null);
  const [rwModuleData1, setRwModuleData1] = useState(null);
  const [rwModuleData2, setRwModuleData2] = useState(null);
  const [mathModuleData1, setMathModuleData1] = useState(null);
  const [mathModuleData2, setMathModuleData2] = useState(null);

  const mergedConfig = examStructureData.examStructureConfig.map(
    (configItem) => {
      const matchedDomain = domainDistributionConfigs.find(
        (domain) => domain.domain === configItem.domain
      );
      return {
        ...configItem,
        section: matchedDomain ? matchedDomain.section.name : null,
      };
    }
  );

  const handleToggleModule = () => {
    setActiveModule((prevModule) => (prevModule === "RW" ? "Math" : "RW"));
  };

  const getDomainsForModule = (section, moduleLevel) => {
    const domains = mergedConfig.filter((config) => config.section === section);

    return domains.map((domain) => {
      const halfQuestions = Math.floor(domain.numberOfQuestion / 2);
      return {
        ...domain,
        numberOfQuestion:
          moduleLevel === "Module 1"
            ? halfQuestions
            : domain.numberOfQuestion - halfQuestions,
      };
    });
  };

  const renderModules = () => {
    const modules =
      examStructureData.examStructureType === "Adaptive"
        ? [
            { title: "Module 1", level: null },
            { title: "Module 2", level: "Easy" },
            { title: "Module 2", level: "Hard" },
          ]
        : [
            { title: "Module 1", level: null },
            { title: "Module 2", level: null },
          ];

    return modules.map((module, index) => (
      <ModuleItem
        key={index}
        title={module.title}
        level={module.level}
        onClick={() => handleModuleClick(module.title)}
      />
    ));
  };

  const handleModuleClick = (title) => {
    if (title === "Module 1") {
      setModuleData(activeModule === "RW" ? rwModuleData1 : mathModuleData1);
    } else if (title === "Module 2") {
      setModuleData(activeModule === "RW" ? rwModuleData2 : mathModuleData2);
    }
  };

  useEffect(() => {
    // Check if moduleType is already populated
    if (
      examStructureData.moduleType &&
      examStructureData.moduleType.length > 0
    ) {
      // Check if the type is Adaptive or Non-adaptive
      const isAdaptive = examStructureData.examStructureType === "Adaptive";

      // Loop through moduleType to set module data based on section, name, and level
      examStructureData.moduleType.forEach((module) => {
        if (
          module.section === "Reading & Writing" &&
          module.name === "Module 1"
        ) {
          setRwModuleData1(module);
          setModuleData(module); // Set moduleData to Module 1 of Reading & Writing
        } else if (
          module.section === "Reading & Writing" &&
          module.name === "Module 2"
        ) {
          if (isAdaptive && module.level === "Easy") {
            setRwModuleData2(module); // Easy level for Adaptive
          } else if (isAdaptive && module.level === "Hard") {
            setRwModuleData2((prevData) => ({
              ...prevData,
              domainDistribution: [...module.domainDistribution], // Hard level for Adaptive
            }));
          } else if (!isAdaptive) {
            setRwModuleData2(module); // Non-adaptive, single Module 2
          }
        } else if (module.section === "Math" && module.name === "Module 1") {
          setMathModuleData1(module);
        } else if (module.section === "Math" && module.name === "Module 2") {
          if (isAdaptive && module.level === "Easy") {
            setMathModuleData2(module); // Easy level for Adaptive
          } else if (isAdaptive && module.level === "Hard") {
            setMathModuleData2((prevData) => ({
              ...prevData,
              domainDistribution: [...module.domainDistribution], // Hard level for Adaptive
            }));
          } else if (!isAdaptive) {
            setMathModuleData2(module); // Non-adaptive, single Module 2
          }
        }
      });
    } else {
      // If moduleType is empty, proceed with the initialization based on examStructureType
      if (examStructureData.examStructureType === "Adaptive") {
        // Adaptive configuration (initialize with default values)
        const rwDomainsModule1 = getDomainsForModule(
          "Reading & Writing",
          "Module 1"
        );
        const rwDomainsModule2 = getDomainsForModule(
          "Reading & Writing",
          "Module 2"
        );
        const mathDomainsModule1 = getDomainsForModule("Math", "Module 1");
        const mathDomainsModule2 = getDomainsForModule("Math", "Module 2");

        const initialModuleType = [
          {
            section: "Reading & Writing",
            name: "Module 1",
            level: null,
            numberOfQuestion: rwDomainsModule1.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: rwDomainsModule1,
          },
          {
            section: "Reading & Writing",
            name: "Module 2",
            level: "Easy",
            numberOfQuestion: rwDomainsModule2.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: rwDomainsModule2,
          },
          {
            section: "Reading & Writing",
            name: "Module 2",
            level: "Hard",
            numberOfQuestion: rwDomainsModule2.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: rwDomainsModule2,
          },
          {
            section: "Math",
            name: "Module 1",
            level: null,
            numberOfQuestion: mathDomainsModule1.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: mathDomainsModule1,
          },
          {
            section: "Math",
            name: "Module 2",
            level: "Easy",
            numberOfQuestion: mathDomainsModule2.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: mathDomainsModule2,
          },
          {
            section: "Math",
            name: "Module 2",
            level: "Hard",
            numberOfQuestion: mathDomainsModule2.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: mathDomainsModule2,
          },
        ];

        setExamStructureData((prevData) => ({
          ...prevData,
          moduleType: initialModuleType,
        }));

        setRwModuleData1(initialModuleType[0]);
        setRwModuleData2(initialModuleType[1]);
        setMathModuleData1(initialModuleType[3]);
        setMathModuleData2(initialModuleType[4]);
        setModuleData(initialModuleType[0]);
      } else if (examStructureData.examStructureType === "Non-Adaptive") {
        // Non-adaptive configuration (initialize with default values)
        const rwDomainsModule1 = getDomainsForModule(
          "Reading & Writing",
          "Module 1"
        );
        const rwDomainsModule2 = getDomainsForModule(
          "Reading & Writing",
          "Module 2"
        );
        const mathDomainsModule1 = getDomainsForModule("Math", "Module 1");
        const mathDomainsModule2 = getDomainsForModule("Math", "Module 2");

        const initialModuleType = [
          {
            section: "Reading & Writing",
            name: "Module 1",
            level: null,
            numberOfQuestion: rwDomainsModule1.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: rwDomainsModule1,
          },
          {
            section: "Reading & Writing",
            name: "Module 2",
            level: null,
            numberOfQuestion: rwDomainsModule2.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: rwDomainsModule2,
          },
          {
            section: "Math",
            name: "Module 1",
            level: null,
            numberOfQuestion: mathDomainsModule1.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: mathDomainsModule1,
          },
          {
            section: "Math",
            name: "Module 2",
            level: null,
            numberOfQuestion: mathDomainsModule2.reduce(
              (sum, domain) => sum + domain.numberOfQuestion,
              0
            ),
            domainDistribution: mathDomainsModule2,
          },
        ];

        setExamStructureData((prevData) => ({
          ...prevData,
          moduleType: initialModuleType,
        }));

        setRwModuleData1(initialModuleType[0]);
        setRwModuleData2(initialModuleType[1]);
        setMathModuleData1(initialModuleType[2]);
        setMathModuleData2(initialModuleType[3]);
        setModuleData(initialModuleType[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examStructureData.examStructureType]);

  const handleQuestionChange = (index, value) => {
    if (moduleData?.name === "Module 1") {
      const updatedDomains = [...moduleData.domainDistribution];
      updatedDomains[index].numberOfQuestion = value;

      const newModuleData1 = {
        ...moduleData,
        domainDistribution: updatedDomains,
      };

      const mergedConfigForSection = mergedConfig.filter(
        (config) => config.section === moduleData.section
      );

      const calculateModule2Domains = (module1Domains, mergedConfigSection) => {
        return module1Domains.map((domain, idx) => ({
          ...domain,
          numberOfQuestion:
            mergedConfigSection[idx].numberOfQuestion -
            module1Domains[idx].numberOfQuestion,
        }));
      };

      if (activeModule === "RW") {
        setRwModuleData1(newModuleData1);
        setModuleData(newModuleData1);

        const updatedModule2Domains = calculateModule2Domains(
          updatedDomains,
          mergedConfigForSection
        );

        setRwModuleData2((prevData) => ({
          ...prevData,
          domainDistribution: updatedModule2Domains,
        }));

        // Update modules for Reading & Writing based on Adaptive or Non-adaptive type
        setExamStructureData((prevData) => ({
          ...prevData,
          moduleType: [
            {
              section: "Reading & Writing",
              name: "Module 1",
              level: null,
              numberOfQuestion: updatedDomains.reduce(
                (sum, domain) => sum + domain.numberOfQuestion,
                0
              ),
              domainDistribution: updatedDomains,
            },
            ...(examStructureData.examStructureType === "Adaptive"
              ? [
                  {
                    section: "Reading & Writing",
                    name: "Module 2",
                    level: "Easy",
                    numberOfQuestion: updatedModule2Domains.reduce(
                      (sum, domain) => sum + domain.numberOfQuestion,
                      0
                    ),
                    domainDistribution: updatedModule2Domains,
                  },
                  {
                    section: "Reading & Writing",
                    name: "Module 2",
                    level: "Hard",
                    numberOfQuestion: updatedModule2Domains.reduce(
                      (sum, domain) => sum + domain.numberOfQuestion,
                      0
                    ),
                    domainDistribution: updatedModule2Domains,
                  },
                ]
              : [
                  {
                    section: "Reading & Writing",
                    name: "Module 2",
                    level: null,
                    numberOfQuestion: updatedModule2Domains.reduce(
                      (sum, domain) => sum + domain.numberOfQuestion,
                      0
                    ),
                    domainDistribution: updatedModule2Domains,
                  },
                ]),
            ...(prevData.moduleType.filter(
              (module) => module.section !== "Reading & Writing"
            ) || []),
          ],
        }));
      } else if (activeModule === "Math") {
        setMathModuleData1(newModuleData1);
        setModuleData(newModuleData1);

        const updatedModule2Domains = calculateModule2Domains(
          updatedDomains,
          mergedConfigForSection
        );

        setMathModuleData2((prevData) => ({
          ...prevData,
          domainDistribution: updatedModule2Domains,
        }));

        // Update modules for Math based on Adaptive or Non-adaptive type
        setExamStructureData((prevData) => ({
          ...prevData,
          moduleType: [
            ...(prevData.moduleType.filter(
              (module) => module.section !== "Math"
            ) || []),
            {
              section: "Math",
              name: "Module 1",
              level: null,
              numberOfQuestion: updatedDomains.reduce(
                (sum, domain) => sum + domain.numberOfQuestion,
                0
              ),
              domainDistribution: updatedDomains,
            },
            ...(examStructureData.examStructureType === "Adaptive"
              ? [
                  {
                    section: "Math",
                    name: "Module 2",
                    level: "Easy",
                    numberOfQuestion: updatedModule2Domains.reduce(
                      (sum, domain) => sum + domain.numberOfQuestion,
                      0
                    ),
                    domainDistribution: updatedModule2Domains,
                  },
                  {
                    section: "Math",
                    name: "Module 2",
                    level: "Hard",
                    numberOfQuestion: updatedModule2Domains.reduce(
                      (sum, domain) => sum + domain.numberOfQuestion,
                      0
                    ),
                    domainDistribution: updatedModule2Domains,
                  },
                ]
              : [
                  {
                    section: "Math",
                    name: "Module 2",
                    level: null,
                    numberOfQuestion: updatedModule2Domains.reduce(
                      (sum, domain) => sum + domain.numberOfQuestion,
                      0
                    ),
                    domainDistribution: updatedModule2Domains,
                  },
                ]),
          ],
        }));
      }
    }
  };

  return (
    <div className={cx("module-config-wrapper")}>
      <div className={cx("module-config-container")}>
        <div className={cx("module-config-header")}>
          <div className={cx("config-text")}>Module Config</div>
        </div>
        <div className={cx("module-config-content")}>
          <div className={cx("config-module-container")}>
            <div className={cx("config-module-item")}>
              <div
                className={cx("config-module-item-header", {
                  "no-border": activeModule === "Math",
                })}
              >
                <div className={cx("config-icon")}>
                  <i className={cx("fa-regular fa-book", "icon")}></i>
                </div>
                <div className={cx("config-title")}>Reading & Writing</div>
                <button
                  className={cx("config-view")}
                  onClick={handleToggleModule}
                >
                  <i className={cx("fa-regular fa-eye", "icon")}></i>
                </button>
              </div>
              {activeModule === "RW" && (
                <div className={cx("config-module-item-content")}>
                  {renderModules()}
                </div>
              )}
            </div>
            <div className={cx("config-module-item")}>
              <div
                className={cx("config-module-item-header", {
                  "no-border": activeModule === "RW",
                })}
              >
                <div className={cx("config-icon")}>
                  <i className={cx("fa-regular fa-book", "icon")}></i>
                </div>
                <div className={cx("config-title")}>Math</div>
                <button
                  className={cx("config-view")}
                  onClick={handleToggleModule}
                >
                  <i className={cx("fa-regular fa-eye", "icon")}></i>
                </button>
              </div>
              {activeModule === "Math" && (
                <div className={cx("config-module-item-content")}>
                  {renderModules()}
                </div>
              )}
            </div>
          </div>
          <div className={cx("config-module-item-container")}>
            <div className={cx("config-module-item-content")}>
              <div className={cx("module-item-header")}>
                <div className={cx("module-icon")}>
                  <i className="fa-regular fa-file-pen"></i>
                </div>
                <div className={cx("module-infor")}>
                  <div className={cx("module-name")}>
                    {moduleData?.name}{" "}
                    {moduleData?.level ? `(${moduleData?.level})` : ""}
                  </div>
                  <div className={cx("module-section")}>
                    {moduleData?.section}
                  </div>
                </div>
              </div>
              <div className={cx("module-item-main")}>
                {moduleData?.domainDistribution.length > 0 &&
                  moduleData?.domainDistribution.map((domain, index) => (
                    <div className={cx("item-config")} key={index}>
                      <div className={cx("config-domain")}>
                        <div className={cx("domain-icon")}>
                          <i
                            className={cx(
                              "fa-regular fa-pen-to-square",
                              "icon"
                            )}
                          ></i>
                        </div>
                        <div className={cx("domain-text")}>
                          {domain?.domain}
                        </div>
                      </div>
                      <div className={cx("config-number")}>
                        <input
                          type="number"
                          value={domain.numberOfQuestion}
                          className={cx("number-input")}
                          autoFocus={index === 0} 
                          onChange={(e) =>
                            moduleData.name === "Module 1" &&
                            handleQuestionChange(
                              index,
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                          disabled={moduleData.name !== "Module 1"}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleConfig;
