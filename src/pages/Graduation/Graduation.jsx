import classNames from "classnames/bind";
import Confetti from "react-confetti";
import Logo from "~/assets/images/logo/LOGO-06.png";
import styles from "./Graduation.module.scss";
const cx = classNames.bind(styles);

function Graduation() {
  return (
    <div className={cx("congratulation-wrapper")}>
      <Confetti />
      <div className={cx("congratulation-card")}>
        <div className={cx("congrat-logo")}>
          <img src={Logo} alt="vsat-logo" className={cx("logo")} />
        </div>
        <div className={cx("congrat-title")}>Congratulations VSAT for Graduation!</div>
        <div className={cx("congrat-desc")}>We extend our heartfelt gratitude to everyone who made this success possible. Thank you to the teachers in the Capstone Project Committee for your guidance, patience, and belief in us. Thank you to our supervisors for your insights and encouragement, which steered us in the right direction. And a special thank you to our families and friends for your unwavering support, understanding, and love throughout this journey. This accomplishment is as much yours as it is ours.</div>
      </div>
    </div>
  )
}

export default Graduation
