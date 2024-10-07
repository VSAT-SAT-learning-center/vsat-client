import classNames from "classnames/bind";
import BannerContactImage from "~/components/Landing/Contact/BannerContact/BannerContactImage";
import ContactInformationCard from "~/components/Landing/Contact/ContactInformation/ContactInformationCard";
import ContactInformationContext from "~/components/Landing/Contact/ContactInformation/ContactInformationContext";
import ContactInformationImage from "~/components/Landing/Contact/ContactInformation/ContactInformationImage";
import Map from "~/components/Landing/Contact/Map";
import Subscribe from "~/components/Landing/Home/Subscribe";
import Footer from "~/layouts/Landing/Footer/Footer";
import Header from "~/layouts/Landing/Header/Header";
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
