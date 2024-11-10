import classNames from "classnames/bind"
import Error401 from "~/assets/images/content/error_401.jpg"
import styles from "./Unauthorized.module.scss"
const cx = classNames.bind(styles)

function Unauthorized() {
  return (
    <div className={cx("unauthoeized-wrraper")}>
      <img src={Error401} className={cx("error-img")} />
    </div>
  )
}

export default Unauthorized
