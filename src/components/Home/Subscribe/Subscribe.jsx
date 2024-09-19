import classNames from "classnames/bind";
import styles from "./Subscribe.module.scss";
const cx = classNames.bind(styles);

function Subscribe() {
  return (
    <div className={cx("subscribe-container")}>
      <div className={cx("subscribe-title")}>
        Subscribe to our Newsletter and Get every update.
      </div>
      <div className={cx("subscribe-input-container")}>
        <input type="email" placeholder="Write your Email" className={cx("subscribe-input")} />
        <button className={cx("subscribe-btn")}>SUBSCRIBE NOW</button>
      </div>
    </div>
  )
}

export default Subscribe
