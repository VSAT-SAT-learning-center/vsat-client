import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import Logo from "~/assets/images/logo/LOGO-06.png";
import { AuthContext } from "~/contexts/AuthContext";
import styles from "./OnboardingTrialExam.module.scss";
const cx = classNames.bind(styles);
function OnboardingTrialExam({ setShowOnboarding }) {
  const { user } = useContext(AuthContext);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={cx("onboarding-trial-exam-wrapper")}>
      {showConfetti && <Confetti />}
      <div className={cx("onboarding-trial-exam-container")}>
        <div className={cx("onboarding-image")}>
          <img src={Logo} alt="logo" className={cx("logo-img")} />
        </div>
        <div className={cx("onboarding-welcome")}>Welcome to VSAT Learning Center</div>
        <div className={cx("onboarding-hello")}>Hello, <span className={cx("username")}>{user?.firstname + " " + user?.lastname}!</span></div>
        <div className={cx("onboarding-desc")}>
          <span className={cx("decs-highlight")}>Thank you for choosing VSAT Learning Center </span>
          {`to advance your educational journey. To provide you with the most personalized and effective learning experience, we recommend starting with a short trial exam. This will help us understand your current knowledge level and tailor our courses precisely to your needs.`}
        </div>
        <button className={cx("start-btn")} onClick={() => setShowOnboarding(false)}>Start Trial Exam</button>
      </div>
    </div>
  )
}

export default OnboardingTrialExam
