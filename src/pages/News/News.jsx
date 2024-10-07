import classNames from "classnames/bind"
import Subscribe from "../../components/Home/Subscribe";
import BannerNewsImage from "../../components/News/BannerNews";
import Header from "../../layouts/Header/Header"
import Footer from "../../layouts/Footer/Footer";
import styles from "./News.module.scss"
const cx = classNames.bind(styles)
function News() {
  return (
    <div className={cx("news-wrapper")}>
      <Header />
      <div className={cx("news-container")}>
        <div className={cx("news-banner-wrapper")}>
          <BannerNewsImage />
        </div>

        <div className={cx("news-subscribe-wrapper")}>
            <Subscribe />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default News
