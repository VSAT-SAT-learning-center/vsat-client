import classNames from "classnames/bind";
import styles from "./SectionDropdown.module.scss";
const cx = classNames.bind(styles);
function SectionDropdown({ sections, setSection, setShowSection }) {
  const handleChooseSection = (section) => {
    setSection(section.name)
    setShowSection(false)
  }
  return (
    <div className={cx("dropdowm-container")}>
      {sections?.map((section) => (
        <div className={cx("dropdown-item")} key={section?.id} onClick={() => handleChooseSection(section)}>{section?.name}</div>
      ))}

    </div>
  )
}

export default SectionDropdown
