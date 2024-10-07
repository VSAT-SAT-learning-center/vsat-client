import classNames from "classnames/bind";
import Banner_Contact from "~/assets/images/content/SAT.png";
import styles from "./BannerContactImage.module.scss";
const cx = classNames.bind(styles)

function BannerContactImage() {
    return (
        <div className={cx("contact-banner")}>
            <img src={Banner_Contact} alt="Contact" className={cx("contact-banner-image")} />
            <div className={cx("contact-banner-title")}>
                Contact Us
            </div>
        </div>
    );
}

export default BannerContactImage;