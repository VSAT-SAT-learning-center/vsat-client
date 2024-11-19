import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LMImg from "~/assets/images/content/lm-01.png";
import styles from "./LearningProgressSidebar.module.scss";

const cx = classNames.bind(styles);

function LearningProgressSidebar({ learningContent, onSelectContent }) {
  const defaultContent = "sat-reading-and-writing";
  const [activeContent, setActiveContent] = useState(
    learningContent || defaultContent
  );

  const handleSelect = (content) => {
    setActiveContent(content);
    onSelectContent(content);
  };

  useEffect(() => {
    if (!learningContent) {
      onSelectContent(defaultContent);
    }
  }, [learningContent, onSelectContent, defaultContent]);

  const items = [
    { id: "sat-reading-and-writing", label: "SAT Reading and Writing", topics: 8, lessons: 35 },
    { id: "sat-math", label: "SAT Math", topics: 11, lessons: 41 },
  ];

  return (
    <div className={cx("learning-progress-sidebar-container")}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cx("learning-progress-introduction", {
            "introduction-active": activeContent === item.id,
          })}
          onClick={() => handleSelect(item.id)}
        >
          <img
            src={LMImg}
            alt={`${item.label}-img`}
            className={cx("introduction-img")}
          />
          <div className={cx("introduction-infor")}>
            <div className={cx("infor-title")}>{item.label}</div>
            <div className={cx("infor-details")}>
              <span className={cx("infor-units")}>{item.topics} TOPICS</span> -{" "}
              <span className={cx("infor-skills")}>{item.lessons} LESSONS</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

LearningProgressSidebar.propTypes = {
  learningContent: PropTypes.string,
  onSelectContent: PropTypes.func.isRequired,
};

export default LearningProgressSidebar;
