import classNames from "classnames/bind";
import styles from "./ContactInformationContext.module.scss"
const cx = classNames.bind(styles)

const ContactInformationContext = () => {
    return (
      <div className={cx("contact-context-wrapper")}>
        <div className={cx("contact-context-title")}>Get In Touch With Us</div>
        <div className={cx("contact-context-description")}>
            We’re here to help! Whether you have questions about our SAT preparation platform, need support, or would like to learn more about how VSAT can help you achieve your academic goals, don’t hesitate to reach out.
        </div>
      </div>
    );
  };
  
  export default ContactInformationContext;