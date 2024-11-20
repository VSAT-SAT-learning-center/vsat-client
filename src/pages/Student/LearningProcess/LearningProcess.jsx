import classNames from "classnames/bind";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./LearningProcess.module.scss";

const cx = classNames.bind(styles);

function LearningProcess() {
  const staticLearningMaterials = [
    {
      id: 1,
      title: "SAT Reading and Writing",
      description:
        "Get ready for a challenge with these harder SAT Reading and Writing questions! This unit tackles the most difficult Expression of Ideas questions.",
      level: "Advance",
      topics: 2,
      lessons: 10,
      createdAt: "18/11/2024",
      status: "Approved",
    },
    {
      id: 2,
      title: "Sat Math",
      description:
        "This unit tackles the medium-difficulty algebra questions on the SAT Math test. Work through each skill, taking quizzes and the unit test.",
      level: "Medium",
      topics: 0,
      lessons: 0,
      createdAt: "17/11/2024",
      status: "Approved",
    },
  ];

  return (
    <LearningLayout>
      <div className={cx("learning-process-wrapper")}>
        <div className={cx("learning-process-container")}>
          <div className={cx("learning-process-header")}>
            <div className={cx("learning-process-text")}>Learning Process</div>
          </div>
          <div className={cx("learning-process-content")}>
            {staticLearningMaterials.map((item) => (
              <div key={item.id} className={cx("learning-card")}>
                <div className={cx("card-header")}>
                  <div className={cx("card-title")}>{item.title}</div>
                </div>
                <div className={cx("card-description")}>{item.description}</div>
                <div className={cx("card-footer")}>
                  <div className={cx("footer-left")}>
                    <div className={cx("level")}>{item.level}</div>
                    <div className={cx("topics-lessons")}>
                      <span>{item.topics} Topics</span> -{" "}
                      <span>{item.lessons} Lessons</span>
                    </div>
                    <div className={cx("created-at")}>
                      Created at: {item.createdAt}
                    </div>
                  </div>
                  <div
                    className={cx(
                      "status",
                      item.status === "Approved" ? "approved" : "rejected"
                    )}
                  >
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default LearningProcess;
