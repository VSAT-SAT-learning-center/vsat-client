import classNames from "classnames/bind";
import BannerImage from "../../components/Home/Banner/BannerImage/BannerImage";
import BannerInformation from "../../components/Home/Banner/BannerInformation";
import IconAnimation from "../../components/Home/Banner/IconAnimation";
import Header from "../../layouts/Header";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("home-wrapper")}>
      <Header />
      <div className={cx("home-container")}>
        <div className={cx("home-banner")}>
          <IconAnimation/>
          <BannerImage/>
          <BannerInformation/>
        </div>
      </div>
    </div>
  )
}

export default Home
