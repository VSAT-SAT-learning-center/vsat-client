import classNames from "classnames/bind";
import Banner_Contact from "~/assets/images/content/contact.png";
import styles from "./ContactInformationImage.module.scss";
const cx = classNames.bind(styles)

const ContactInformationImage = () => {
    return (
      <div className={cx("contact-image-container")}>
        <div className={cx("contact-contact-main-image")}>
            <img src={Banner_Contact}/>
        </div>
      </div>
    );
  };
  
  export default ContactInformationImage;
  