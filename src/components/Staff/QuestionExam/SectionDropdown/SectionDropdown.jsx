import classNames from "classnames/bind";
import apiClient from "~/services/apiService";
import styles from "./SectionDropdown.module.scss";
const cx = classNames.bind(styles);
function SectionDropdown({
  sections,
  sectionId,
  setSection,
  setShowSection,
  setSectionId,
  setDomains,
  setDomain,
  setSkill,
  setSkills,
}) {
  const handleChooseSection = async (section) => {
    const selectedSectionId = section.id;
    setSection(section.name);
    setShowSection(false);
    setSectionId(selectedSectionId);
    setDomain("Select Domain");
    setSkill("Select Skill");
    setSkills([])
    if (selectedSectionId) {
      try {
        const response = await apiClient.get(
          `/domains/section/${selectedSectionId}`
        );
        setDomains(response.data);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    } else {
      setDomains([]);
    }
  };
  return (
    <div className={cx("dropdowm-container")}>
      {sections?.map((section) => (
        <div
          className={cx("dropdown-item", { active: sectionId === section?.id })}
          key={section?.id}
          onClick={() => handleChooseSection(section)}
        >
          {section?.name}
        </div>
      ))}
    </div>
  );
}

export default SectionDropdown;
