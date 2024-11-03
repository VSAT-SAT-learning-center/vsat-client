import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./ModuleConfig.module.scss";
import ModuleItem from "./ModuleItem";
const cx = classNames.bind(styles);

function ModuleConfig({ examStructureData, domainDistributionConfigs }) {
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

  const renderModules = (section) => {
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
        onClick={() => handleModuleClick(module.title, section)}
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
    const rwDomainsModule1 = getDomainsForModule(
      "Reading & Writing",
      "Module 1"
    );
    const rwDomainsModule2 = getDomainsForModule(
      "Reading & Writing",
      "Module 2"
    );
    const initialRwModuleData1 = {
      title: "Module 1",
      level: null,
      section: "Reading & Writing",
      domains: rwDomainsModule1,
    };
    const initialRwModuleData2 = {
      title: "Module 2",
      level: "Easy",
      section: "Reading & Writing",
      domains: rwDomainsModule2,
    };
    setRwModuleData1(initialRwModuleData1);
    setRwModuleData2(initialRwModuleData2);

    const mathDomainsModule1 = getDomainsForModule("Math", "Module 1");
    const mathDomainsModule2 = getDomainsForModule("Math", "Module 2");
    const initialMathModuleData1 = {
      title: "Module 1",
      level: null,
      section: "Math",
      domains: mathDomainsModule1,
    };
    const initialMathModuleData2 = {
      title: "Module 2",
      level: "Easy",
      section: "Math",
      domains: mathDomainsModule2,
    };
    setMathModuleData1(initialMathModuleData1);
    setMathModuleData2(initialMathModuleData2);
    setModuleData(initialRwModuleData1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examStructureData]);

  const handleQuestionChange = (index, value) => {
    if (moduleData?.title === "Module 1") {
      const updatedDomains = [...moduleData.domains];
      updatedDomains[index].numberOfQuestion = value;
  
      const newModuleData1 = { ...moduleData, domains: updatedDomains };
  
      // Separate merged configurations for RW and Math
      const mergedConfigRW = mergedConfig.filter(
        (config) => config.section === "Reading & Writing"
      );
      const mergedConfigMath = mergedConfig.filter(
        (config) => config.section === "Math"
      );
  
      // Determine which module data to update
      if (activeModule === "RW") {
        setRwModuleData1(newModuleData1);
        setModuleData(newModuleData1);
  
        // Update Module 2 for RW based on RW's merged config
        const updatedModule2Domains = updatedDomains.map((domain, idx) => ({
          ...domain,
          numberOfQuestion:
            mergedConfigRW[idx].numberOfQuestion - updatedDomains[idx].numberOfQuestion,
        }));
        setRwModuleData2((prevData) => ({
          ...prevData,
          domains: updatedModule2Domains,
        }));
      } else if (activeModule === "Math") {
        setMathModuleData1(newModuleData1);
        setModuleData(newModuleData1);
  
        // Update Module 2 for Math based on Math's merged config
        const updatedModule2Domains = updatedDomains.map((domain, idx) => ({
          ...domain,
          numberOfQuestion:
            mergedConfigMath[idx].numberOfQuestion - updatedDomains[idx].numberOfQuestion,
        }));
        setMathModuleData2((prevData) => ({
          ...prevData,
          domains: updatedModule2Domains,
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
                  {renderModules("Reading & Writing")}
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
                  {renderModules("Math")}
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
                    {moduleData?.title}{" "}
                    {moduleData?.level ? `(${moduleData?.level})` : ""}
                  </div>
                  <div className={cx("module-section")}>
                    {moduleData?.section}
                  </div>
                </div>
              </div>
              <div className={cx("module-item-main")}>
                {moduleData?.domains.length > 0 &&
                  moduleData?.domains.map((domain, index) => (
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
                          onChange={(e) =>
                            moduleData.title === "Module 1" &&
                            handleQuestionChange(
                              index,
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                          disabled={moduleData.title !== "Module 1"}
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
