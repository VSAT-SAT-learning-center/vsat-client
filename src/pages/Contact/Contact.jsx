import classNames from "classnames/bind";
import BannerContactImage from "../../components/Contact/BannerContact/BannerContactImage";
import ContactInformationCard from "../../components/Contact/ContactInformation/ContactInformationCard";
import ContactInformationContext from "../../components/Contact/ContactInformation/ContactInformationContext";
import ContactInformationImage from "../../components/Contact/ContactInformation/ContactInformationImage";
import Map from "../../components/Contact/Map";
import Subscribe from "../../components/Home/Subscribe";
import Footer from "../../layouts/Footer/Footer";
import Header from "../../layouts/Header/Header";
import styles from "./Contact.module.scss";
const cx = classNames.bind(styles)
function Contact() {
  return (
    <div className={cx("contact-wrapper")}>
      <Header />
      <div className={cx("contact-container")}>
        <div className={cx("contact-banner-wrapper")}>
          <BannerContactImage />
        </div>
        <div className={cx("contact-information-wrapper")}>
          <div className={cx("contact-information-container")}>
            <div className={cx("contact-information-container-left")}>
              <ContactInformationImage />
            </div>
            <div className={cx("contact-information-container-right")}>
              <ContactInformationContext />
              <ContactInformationCard />
            </div>
          </div>
        </div>
        <div className={cx("contact-map-wrapper")}>
            <Map />
          </div>
        <div className={cx("contact-subscribe-wrapper")}>
          <Subscribe />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
