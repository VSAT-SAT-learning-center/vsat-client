import classNames from "classnames/bind";
import BannerImage from "~/components/Landing/Home/Banner/BannerImage";
import BannerInformation from "~/components/Landing/Home/Banner/BannerInformation";
import IconAnimation from "~/components/Landing/Home/Banner/IconAnimation";
import IntroductionInfo from "~/components/Landing/Home/Introduction/IntroductionInfo";
import IntroductionSlider from "~/components/Landing/Home/Introduction/IntroductionSlider/IntroductionSlider";
import ReasonChooseBanner from "~/components/Landing/Home/ReasonChoose/ReasonChooseBanner";
import ReasonInformation from "~/components/Landing/Home/ReasonChoose/ReasonInformation";
import Subscribe from "~/components/Landing/Home/Subscribe";
import UserCard from "~/components/Landing/Home/UserCard/UserCard";
import Footer from "~/layouts/Landing/Footer/Footer";
import Header from "~/layouts/Landing/Header";
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
