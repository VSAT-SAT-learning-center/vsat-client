import classNames from "classnames/bind";
import apiClient from "~/services/apiService";
import styles from "./DomainDropdown.module.scss";
const cx = classNames.bind(styles);

function DomainDropdown({ domains, domainId, setDomain, setShowDomain, setDomainId, setSkills }) {
  const handleChooseDomain = async (domain) => {
    const selectedDomainId = domain.id
    setDomain(domain.name)
    setShowDomain(false)
    setDomainId(selectedDomainId)
    if (selectedDomainId) {
      try {
        const response = await apiClient.get(
          `/skills/domainById/${selectedDomainId}`
        );
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    } else {
      setSkills([]);
    }
  }
  return (
    <div className={cx("dropdowm-container")}>
      {domains?.map((domain) => (
        <div className={cx("dropdown-item", { active: domainId === domain?.id })} key={domain?.id} onClick={() => handleChooseDomain(domain)}>{domain?.name}</div>
      ))}
    </div>
  )
}

export default DomainDropdown
