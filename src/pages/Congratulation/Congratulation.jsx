import classNames from "classnames/bind";
import { useContext } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import partyGif from "~/assets/images/content/party.gif";
import { AuthContext } from "~/contexts/AuthContext";
import styles from "./Congratulation.module.scss";
const cx = classNames.bind(styles);

function Congratulation() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleExplore = () => {
    navigate("/learning")
  }
  return (
    <div className={cx("congratulation-wrapper")}>
      <Confetti />
      <div className={cx("congratulation-card")}>
        <div className={cx("congrat-image")}>
          <img src={partyGif} alt="congrat-img" className={cx("image")} />
        </div>
        <div className={cx("congrat-title")}>Congratulations {user?.username}!</div>
        <div className={cx("congrat-desc")}>You have successfully completed your study profile at VSAT Learning Center.</div>
        <button className={cx("congrat-button")} onClick={handleExplore}>Explore More</button>
      </div>
    </div>
  )
}

export default Congratulation
