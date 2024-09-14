import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);
function Home() {
  return (
    <div className={cx("home-wrapper")}>
      <div className={cx("home-container")}>
        <h1 className={cx("text-4xl font-bold text-blue-500")}>
          Hello, React with Tailwind CSS and Custom SCSS!
        </h1>
        <p className={cx("mb-3 font-normal text-gray-700")}>This is styled with custom SCSS classes!</p>
      </div>
    </div>
  )
}

export default Home
