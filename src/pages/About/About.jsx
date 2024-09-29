import classNames from "classnames/bind";
import IntroductionInfo from "../../components/Home/Introduction/IntroductionInfo";
import IntroductionSlider from "../../components/Home/Introduction/IntroductionSlider/IntroductionSlider";
import BannerAboutInformation from "../../components/About/BannerAbout/BannerAboutInformation";
import BannerImage from "../../components/Home/Banner/BannerImage/BannerImage";
import IconAnimation from "../../components/Home/Banner/IconAnimation";
import Subscribe from "../../components/Home/Subscribe";
import BannerAboutImage from "../../components/About/BannerAbout/BannerAboutImage/BannerAboutImage";
import UserCard from "../../components/Home/UserCard/UserCard";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import styles from "./About.module.scss";
const cx = classNames.bind(styles);
function About() {
  return (
    <div className={cx("about-wrapper")}>
      <Header />
      <div className={cx("about-container")}>
        <div className={cx("about-banner-wrapper")}>
          <BannerAboutImage />
        </div>
        <div className={cx("about-introduction")}>
          <div className={cx("about-introduction-wrapper")}>
            <IntroductionInfo />
            <IntroductionSlider />
          </div>
        </div>
        <div className={cx("about-banner")}>
          <IconAnimation />
          <BannerImage />
          <BannerAboutInformation />
        </div>
        <UserCard />
        <div className={cx("about-subscribe-wrapper")}>
          <Subscribe />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
