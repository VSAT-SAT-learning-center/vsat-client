import classNames from "classnames/bind"
import Header from "../../layouts/Header/Header"
import styles from "./News.module.scss"
const cx = classNames.bind(styles)
function News() {
  return (
    <div className={cx("news-wrapper")}>
      <Header />
    </div>
  )
}

export default News
