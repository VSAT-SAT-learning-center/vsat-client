import classNames from "classnames/bind";
import Banner_AboutUs from "../../../../assets/images/content/SAT.png";
import styles from "./BannerAboutImage.module.scss"
const cx = classNames.bind(styles)

function BannerAboutImage() {
    return (
        <div className={cx("about-banner")}>
            <img src={Banner_AboutUs} alt="About Us" className={cx("about-banner-image")} />
            <div className={cx("about-banner-title")}>
                About Us
            </div>
        </div>
    );
}

export default BannerAboutImage;