import classNames from "classnames/bind";
import Banner_1 from "../../../../assets/images/banner/01.png";
import Banner_2 from "../../../../assets/images/banner/02.png";
import Banner_3 from "../../../../assets/images/banner/03.png";
import BannerCircle from "../../../../assets/images/banner/earth-bg.svg";
import styles from "./BannerImage.module.scss";
const cx = classNames.bind(styles);

function BannerImage() {
  return (
    <div className={cx("banner-image")}>
      <img src={BannerCircle} alt="banner-circle" className={cx("banner-circle-img")} />
      <img src={Banner_1} alt="banner-1" className={cx("banner-1-img")} />
      <img src={Banner_2} alt="banner-2" className={cx("banner-2-img")} />
      <img src={Banner_3} alt="banner-3" className={cx("banner-3-img")} />
    </div>
  )
}

export default BannerImage
