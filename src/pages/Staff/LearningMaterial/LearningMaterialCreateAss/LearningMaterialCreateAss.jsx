import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterialCreateAss.module.scss";
const cx = classNames.bind(styles);

function LearningMaterialCreateAss() {
  const currentStep = 3;
  const navigate = useNavigate();
  const { unitId } = useParams();
  const location = useLocation();
  const { lessonId } = location.state || {};
  const [quizConfigs, setQuizConfigs] = useState([]);
  const [quizConfigsData, setQuizConfigsData] = useState({
    unitId: unitId,
    skillConfigs: [],
  });

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await apiClient.get(`/units/domain/${unitId}`);
        const quizConfisArray = response.data.skills;
        setQuizConfigs(quizConfisArray);
        setQuizConfigsData((prevData) => ({
          ...prevData,
          skillConfigs: quizConfisArray.map((skill) => ({
            skillId: skill.id,
            totalQuestions: 0,
          })),
        }));
      } catch (error) {
        console.error("Error while fetching quizz config:", error);
      }
    };

    fetchTopics();
  }, [unitId]);

  const handleChange = (event, skillId) => {
    const { value } = event.target;
    setQuizConfigsData((prevData) => ({
      ...prevData,
      skillConfigs: prevData.skillConfigs.map((config) =>
        config.skillId === skillId
          ? { ...config, totalQuestions: Number(value) }
          : config
      ),
    }));
  };

  const handleNext = async () => {
    console.log(quizConfigsData);
    try {
      const response = await apiClient.post("/quiz-config", quizConfigsData);
      console.log(response.data);
      navigate(`${steps[currentStep + 1].path}/${unitId}/${lessonId}`);
    } catch (error) {
      console.error("Error while config unit test:", error);
    }
  };

  return (
    <PageLayout>
      <div className={cx("learning-material-ass-container")}>
        <LearningMaterialCreateHeader title="Publish" />
        <MultiStepProgressBar steps={steps} currentStep={currentStep} />
        <div className={cx("ass-container")}>
          <div className={cx("create-ass-top")}>
            <div className={cx("create-ass-title")}>Unit Test</div>
          </div>
          <div className={cx("create-ass-content")}>
            <div className={cx("ass-config-container")}>
              {quizConfigs?.map((item) => (
                <div key={item.id} className={cx("ass-config-item-container")}>
                  <div className={cx("config-item-infor")}>
                    <div className={cx("config-item-icon")}>
                      <i className={cx("fa-regular fa-layer-group")}></i>
                    </div>
                    <div className={cx("config-item-name")}>
                      <span className={cx("name")}>{item.title}</span>
                    </div>
                  </div>
                  <div className={cx("config-item-input")}>
                    <input
                      type="number"
                      className={cx("item-input")}
                      onChange={(e) => handleChange(e, item.id)}
                      value={
                        quizConfigsData.skillConfigs.find(
                          (config) => config.skillId === item.id
                        )?.totalQuestions || ""
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("create-ass-bottom")} onClick={handleNext}>
            <button className={cx("continue-btn")}>Continue</button>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default LearningMaterialCreateAss;
