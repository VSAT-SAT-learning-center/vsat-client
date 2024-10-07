import classNames from "classnames/bind";
import styles from "./UnitArea.module.scss";
import UnitAreaLearnItem from "./UnitAreaLearnItem";
const cx = classNames.bind(styles);
function UnitArea() {
  return (
    <div className={cx("content-unit-area")}>
      <div className={cx("unit-area-title")}>
        <span className={cx("title")}>Command of Evidence: Textual</span>
      </div>
      <div className={cx("unit-area-main")}>
        <div className={cx("unit-area-learn")}>
          <div className={cx("learn-title")}>Learn</div>
          <div className={cx("learn-list")}>
            <UnitAreaLearnItem item="Command of evidence: textual | Lesson" />
            <UnitAreaLearnItem item="Command of evidence: textual (literary) — Worked example" />
            <UnitAreaLearnItem item="Command of evidence: textual (scientific) — Worked example" />
            <UnitAreaLearnItem item="Command of evidence: textual — Quick example" />
          </div>
        </div>
        <div className={cx("unit-area-practice")}>
          <div className={cx("practice-title")}>Practice</div>
        </div>
      </div>
    </div>
  );
}

export default UnitArea;
