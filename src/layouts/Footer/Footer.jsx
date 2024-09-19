import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo/LOGO-06.png";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);
function Footer() {
  return (
    <div className={cx("footer-wrapper")}>
      <div className={cx("footer-container")}>
        <div className={cx("footer-main-item")}>
          <img src={Logo} alt="logo" className={cx("footer-main-logo")} />
          <div className={cx("footer-main-desc")}>
            Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed di
            nonumy eirmod temporinvi dunt ut labore lorem ipsum.
          </div>
          <div className={cx("footer-main-social")}>
            <Link className={cx("social-item")}>
              <i className={cx("fa-brands fa-facebook-f", "icon")}></i>
            </Link>
            <Link className={cx("social-item")}>
              <i className={cx("fa-brands fa-twitter", "icon")}></i>
            </Link>
            <Link className={cx("social-item")}>
              <i className={cx("fa-brands fa-linkedin-in", "icon")}></i>
            </Link>
            <Link className={cx("social-item")}>
              <i className={cx("fa-brands fa-google-plus-g", "icon")}></i>
            </Link>
          </div>
        </div>
        <div className={cx("footer-item", "footer-contact-item")}>
          <div className={cx("footer-contact-title")}>CONTACT US</div>
          <div className={cx("footer-contact-list")}>
            <Link to="" className={cx("footer-contact")}>vsat.center.offical@gmail.com</Link>
            <Link to="" className={cx("footer-contact")}>+84 123456789</Link>
            <Link to="" className={cx("footer-contact")}>Terms & Conditions</Link>
            <Link to="" className={cx("footer-contact")}>Privacy Policy</Link>
            <Link to="" className={cx("footer-contact")}>Contacts</Link>
            <Link to="" className={cx("footer-contact")}>Our Careers</Link>
          </div>
        </div>
        <div className={cx("footer-item", "footer-quick-link-item")}>
          <div className={cx("footer-quick-link-title")}>QUICK LINKS</div>
          <div className={cx("footer-quick-link-list")}>
            <Link to="" className={cx("footer-quick-link")}>About Us</Link>
            <Link to="" className={cx("footer-quick-link")}>Explore</Link>
            <Link to="" className={cx("footer-quick-link")}>Our Services</Link>
            <Link to="" className={cx("footer-quick-link")}>Destinations</Link>
          </div>
        </div>
        <div className={cx("footer-item", "footer-features-item")}>
          <div className={cx("footer-features-title")}>FEATURES</div>
          <div className={cx("footer-features-list")}>
            <Link to="" className={cx("footer-features")}>Home</Link>
            <Link to="" className={cx("footer-features")}>Latest News</Link>
            <Link to="" className={cx("footer-features")}>Log In</Link>
            <Link to="" className={cx("footer-features")}>Singn Up</Link>
          </div>
        </div>
      </div>
      <div className={cx("footer-copyright")}>
        Copyright@ 2021 <span className={cx("hightlight")}>VSAT</span>. All
        Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
