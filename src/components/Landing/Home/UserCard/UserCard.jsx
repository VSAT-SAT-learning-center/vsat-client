import classNames from "classnames/bind";
import { useState } from "react";
import LoginModal from "../../../../components/Auth/Login/Login.jsx";
import StudentIcon from "~/assets/images/icon/graduate.svg";
import TeacherIcon from "~/assets/images/icon/phone-operator.svg";
import styles from "./UserCard.module.scss";
const cx = classNames.bind(styles);
function UserCard() {
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  return (
    <div>
      {isShowLoginModal && <LoginModal setShowLogin={setIsShowLoginModal} />}
      <div className={cx("home-user-wrapper")}>
        <div className={cx("user-title-container")}>
          <div className={cx("user-title-content")}>Teachers & Students</div>
          <div className={cx("user-title-main")}>What you Looking For?</div>
        </div>
        <div className={cx("user-card-wrapper")}>
          <div className={cx("user-card-container")}>
            <div className={cx("user-card-content")}>
              <div className={cx("user-card-img")}>
                <div className={cx("card-box")}></div>
                <img
                  src={TeacherIcon}
                  alt="teacher-icon"
                  className={cx("card-img")}
                />
              </div>
              <div className={cx("user-card-title")}>
                Do you want to teach here?
              </div>
              <div className={cx("user-card-desc")}>
                Are you passionate about teaching and helping students excel?
                Join our team and inspire the next generation to achieve their
                best!
              </div>
              <button className={cx("register-btn")} onClick={() => setIsShowLoginModal(true)}>Register Now</button>
            </div>
            <div className={cx("user-card-content")}>
              <div className={cx("user-card-img")}>
                <div className={cx("card-box")}></div>
                <img
                  src={StudentIcon}
                  alt="student-icon"
                  className={cx("card-img")}
                />
              </div>
              <div className={cx("user-card-title")}>
                Do you want to learn here?
              </div>
              <div className={cx("user-card-desc")}>
                Ready to excel in your studies? Join us to learn with expert
                guidance, personalized lessons, and powerful resources for
                success!
              </div>
              <button className={cx("register-btn-2")} onClick={() => setIsShowLoginModal(true)}>Register Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
