import classNames from "classnames/bind";
import styles from "./ContactInformationContext.module.scss"
const cx = classNames.bind(styles)

const ContactInfo = () => {
    return (
      <div className="contact-context-container">
        <div className="contact-context-title">Get In Touch With Us</div>
            <div className={cx("contact-context")}>
                We’re here to help! Whether you have questions about our SAT preparation platform, need support, or would like to learn more about how VSAT can help you achieve your academic goals, don’t hesitate to reach out.
            </div>
      </div>
    );
  };
  
  export default ContactInfo;