import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);
function Home() {
  return (
    <div className={cx("home-wrapper")}>
      <div className={cx("home-container")}>
        Hôm nay tôi buồn
      </div>
    </div>
  )
}

export default Home
