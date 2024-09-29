import classNames from "classnames/bind";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import styles from "./Contact.module.scss";
const cx = classNames.bind(styles)
function Contact() {
  return (
    <div className={cx("contact-wrapper")}>
      <Header />
      <div className={cx("contact-container")}>

      </div>
      <Footer />
    </div>
  )
}

export default Contact
