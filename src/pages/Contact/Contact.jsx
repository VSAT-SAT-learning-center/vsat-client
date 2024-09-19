import classNames from "classnames/bind"
import Header from "../../layouts/Header/Header"
import styles from "./Contact.module.scss"
const cx = classNames.bind(styles)
function Contact() {
  return (
    <div className={cx("contact-wrapper")}>
      <Header />
    </div>
  )
}

export default Contact
