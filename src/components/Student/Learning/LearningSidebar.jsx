import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./LearningSidebar.module.scss";

const cx = classNames.bind(styles);

function LearningSidebar() {
  const [activeItem, setActiveItem] = useState("Courses");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className={cx("learning-wrapper")}>
      <div className={cx("learning-container")}>
        <div className={cx("menu-section")}>
          <div className={cx("menu-title")}>MY STUFF</div>
          <button
            className={cx("menu-item", { active: activeItem === "Courses" })}
            onClick={() => handleItemClick("Courses")}
          >
            Courses
          </button>
        </div>
        <div className={cx("menu-section")}>
          <div className={cx("menu-title")}>MY ACCOUNT</div>
          <button
            className={cx("menu-item", { active: activeItem === "Progress" })}
            onClick={() => handleItemClick("Progress")}
          >
            Progress
          </button>
          <button
            className={cx("menu-item", { active: activeItem === "Profile" })}
            onClick={() => handleItemClick("Profile")}
          >
            Profile
          </button>
          <button
            className={cx("menu-item", { active: activeItem === "Teachers" })}
            onClick={() => handleItemClick("Teachers")}
          >
            Teachers
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearningSidebar;
