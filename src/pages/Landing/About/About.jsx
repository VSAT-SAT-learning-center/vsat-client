import classNames from "classnames/bind";
import AboutAchievements from "~/components/Landing/About/AboutAchievements/AboutAchievements";
import BannerAboutImage from "~/components/Landing/About/BannerAbout/BannerAboutImage/BannerAboutImage";
import BannerAboutInformation from "~/components/Landing/About/BannerAbout/BannerAboutInformation";
import IntrodutionInstructor from "~/components/Landing/About/OurInstructor/Introdution/IntrodutionInstructor";
import OurInstructorSlider from "~/components/Landing/About/OurInstructor/OurInstructorSlider/OurInstructorSlider";
import BannerImage from "~/components/Landing/Home/Banner/BannerImage/BannerImage";
import IconAnimation from "~/components/Landing/Home/Banner/IconAnimation";
import IntroductionInfo from "~/components/Landing/Home/Introduction/IntroductionInfo";
import IntroductionSlider from "~/components/Landing/Home/Introduction/IntroductionSlider/IntroductionSlider";
import Subscribe from "~/components/Landing/Home/Subscribe";
import UserCard from "~/components/Landing/Home/UserCard/UserCard";
import Footer from "~/layouts/Landing/Footer/Footer";
import Header from "~/layouts/Landing/Header/Header";
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
        <div className={cx("about-achievements")}>
          <AboutAchievements />
        </div>
        <UserCard />
        <div className={cx("about-instructor")}>
          <div className={cx("about-instructor-detail")}>
            <IntrodutionInstructor />
            <OurInstructorSlider />
          </div>
        </div>
        <div className={cx("about-subscribe-wrapper")}>
          <Subscribe />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
