import classNames from "classnames/bind";
import { useState } from "react";
import LoginModal from "../../../../../components/Auth/Login/Login.jsx";
import styles from "./ReasonInformation.module.scss";
const cx = classNames.bind(styles);
function ReasonInformation() {
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  return (
    <div>
      {isShowLoginModal && (
        <LoginModal setShowLogin={setIsShowLoginModal} />
      )}
      <div className={cx("reason-choose-information-wrapper")}>
        <div className={cx("reason-choose-information-container")}>
          <div className={cx("information-explore")}>Explore VSAT</div>
          <div className={cx("information-title")}>
            Why Choose <span style={{ color: "#2446b6" }}>V</span>
            <span style={{ color: "#f4cf39" }}>S</span>
            <span style={{ color: "#d7354f" }}>A</span>
            <span style={{ color: "#51bfb3" }}>T</span>?
          </div>
          <div className={cx("information-desc")}>
            VSAT is your go-to solution for mastering SAT preparation through innovation and personalized learning strategies.
          </div>
          <div className={cx("reason-list")}>
            <div className={cx("reason-item")}>
              <div className={cx("reason-icon")}>
                <i className={cx("fa-solid fa-check", "icon")}></i>
              </div>
              <div className={cx("reason-text")}>
                Tailored Learning: Personalized tests and materials adapt to student needs for focused SAT preparation.
              </div>
            </div>
            <div className={cx("reason-item")}>
              <div className={cx("reason-icon")}>
                <i className={cx("fa-solid fa-check", "icon")}></i>
              </div>
              <div className={cx("reason-text")}>
                Progress Insights: Centralized tracking tools identify strengths and improvement areas effectively.
              </div>
            </div>
            <div className={cx("reason-item")}>
              <div className={cx("reason-icon")}>
                <i className={cx("fa-solid fa-check", "icon")}></i>
              </div>
              <div className={cx("reason-text")}>
                Resource Optimization: Equitable access to optimized teaching tools ensures a supportive and productive learning experience.
              </div>
            </div>
          </div>
          <div className={cx("more-details")}>
            <button className={cx("more-btn")} onClick={() => setIsShowLoginModal(true)}>More Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReasonInformation;
