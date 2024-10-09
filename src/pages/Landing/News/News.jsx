import classNames from "classnames/bind";
import Subscribe from "~/components/Landing/Home/Subscribe";
import BannerNewsImage from "~/components/Landing/News/BannerNews";
import Footer from "~/layouts/Landing/Footer/Footer";
import Header from "~/layouts/Landing/Header/Header";
import styles from "./News.module.scss";
import BlogList from "~/components/Landing/News/BlogList";
import CollegeList from "~/components/Landing/News/CollegeList";
const cx = classNames.bind(styles);
function News() {
  return (
    <div className={cx("news-wrapper")}>
      <Header />
      <div className={cx("news-container")}>
        <div className={cx("news-banner-wrapper")}>
          <BannerNewsImage />
        </div>

        <div className={cx("blog-list-wrapper")}>
          <BlogList />
        </div>

        <div className={cx("college-list-wrapper")}>
          <CollegeList />
        </div>

        <div className={cx("news-subscribe-wrapper")}>
          <Subscribe />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default News;
