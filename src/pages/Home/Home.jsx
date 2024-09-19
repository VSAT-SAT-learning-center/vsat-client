import classNames from "classnames/bind";
import BannerImage from "../../components/Home/Banner/BannerImage/BannerImage";
import BannerInformation from "../../components/Home/Banner/BannerInformation";
import IconAnimation from "../../components/Home/Banner/IconAnimation";
import IntroductionInfo from "../../components/Home/Introduction/IntroductionInfo";
import IntroductionSlider from "../../components/Home/Introduction/IntroductionSlider/IntroductionSlider";
import ReasonChooseBanner from "../../components/Home/ReasonChoose/ReasonChooseBanner";
import ReasonInformation from "../../components/Home/ReasonChoose/ReasonInformation";
import Subscribe from "../../components/Home/Subscribe";
import UserCard from "../../components/Home/UserCard/UserCard";
import Footer from "../../layouts/Footer/Footer";
import Header from "../../layouts/Header";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("home-wrapper")}>
      <Header />
      <div className={cx("home-container")}>
        <div className={cx("home-banner")}>
          <IconAnimation />
          <BannerImage />
          <BannerInformation />
        </div>
        <div className={cx("home-introduction")}>
          <div className={cx("introduction-wrapper")}>
            <IntroductionInfo />
            <IntroductionSlider />
          </div>
        </div>
        <UserCard />
        <div className={cx("home-reason-choose-wrapper")}>
          <div className={cx("home-reason-choose-container")}>
            <ReasonChooseBanner />
            <ReasonInformation />
          </div>
        </div>
        <div className={cx("home-subscribe-wrapper")}>
          <Subscribe/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
