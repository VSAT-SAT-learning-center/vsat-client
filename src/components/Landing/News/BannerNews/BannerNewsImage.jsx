import classNames from "classnames/bind";
import Banner_News from "~/assets/images/content/SAT.png";
import styles from "./BannerNewsImage.module.scss";
const cx = classNames.bind(styles)

function BannerNewsImage() {
    return (
        <div className={cx("news-banner")}>
            <img src={Banner_News} alt="News" className={cx("news-banner-image")} />
            <div className={cx("news-banner-title")}>
                Blogs & News
            </div>
        </div>
    );
}

export default BannerNewsImage;