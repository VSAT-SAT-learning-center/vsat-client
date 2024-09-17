import classNames from "classnames/bind";
import BannerImage from "../../components/Home/Banner/BannerImage/BannerImage";
import BannerInformation from "../../components/Home/Banner/BannerInformation";
import IconAnimation from "../../components/Home/Banner/IconAnimation";
import IntroductionInfo from "../../components/Home/Introduction/IntroductionInfo";
import IntroductionSlider from "../../components/Home/Introduction/IntroductionSlider/IntroductionSlider";
import ReasonChooseBanner from "../../components/Home/ReasonChoose/ReasonChooseBanner";
import UserCard from "../../components/Home/UserCard/UserCard";
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
            <ReasonChooseBanner/>
            <div className={cx("reason-choose-information")}>
              information
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
