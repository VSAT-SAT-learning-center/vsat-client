import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import TestContext from "~/assets/images/content/test-context.jpg";
import styles from "./LearningPartUnitTestSidebar.module.scss";
const cx = classNames.bind(styles);

function LearningPartUnitTestSidebar({ slug, section }) {
  const smallWords = ["and", "or", "the", "of", "in", "on", "at", "with", "by", "for"];
  const formattedSectionName = section
    .split("-")
    .map((word, index) => {
      const lowerCasedWord = word.toLowerCase();
      const capitalized = smallWords.includes(lowerCasedWord) && index !== 0
        ? lowerCasedWord
        : word.charAt(0).toUpperCase() + word.slice(1);
      return index === 0 ? capitalized + ":" : capitalized;
    })
    .join(" ");
  return (
    <div className={cx("learning-part-detail-sidebar-wrapper")}>
      <div className={cx("learning-part-detail-sidebar-container")}>
        <div className={cx("detail-header")}>
          <div className={cx("detail-icon")}>
            <i className={cx("fa-regular fa-book-open", "icon")}></i>
          </div>
          <div className={cx("detail-title")}>
            Digital SAT {slug === "sat-reading-and-writing" ? "Reading and Writing" : "Math"}
          </div>
        </div>
        <div className={cx("detail-content")}>
          <div className={cx("detail-content-header")}>
            <div className={cx("detail-content-title")}>
              Unit test
            </div>
          </div>
          <div className={cx("detail-content-main")}>
            <div className={cx("detail-content-lesson")}>
              <div className={cx("detail-content-lesson-item", "lesson-item-active")}>
                <div className={cx("lesson-item-title")}>
                  Unit test
                </div>
                <div className={cx("lesson-item-desc")}>{formattedSectionName}</div>
              </div>
              <div className={cx("detail-content-lesson-image")}>
                <img src={TestContext} alt="test-context-img" className={cx("test-image")} />
              </div>
            </div>
          </div>
          <div className={cx("detail-content-footer")}>
            <div className={cx("footer-copyright")}>
              © 2024 VSAT Learning Center
            </div>
            <div className={cx("footer-rule")}>
              <Link className={cx("rule-item")}>Terms of use</Link>
              <Link className={cx("rule-item")}>Privacy Policy</Link>
              <Link className={cx("rule-item")}>Cookie Notice</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningPartUnitTestSidebar;
