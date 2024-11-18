import classNames from "classnames/bind";
import { useState } from "react";
import Avatar from "~/assets/images/banner/01.png";
import ViewTargetLearningDeatail from "../ViewTargetLearningDeatail";
import TargetLearningItem from "./TargetLearningItem";
import styles from "./ViewStudyProfile.module.scss";
const cx = classNames.bind(styles);

function ViewStudyProfile({ setIsShowViewStudyProfile }) {
  const [isShowViewTargetLearning, setIsShowViewTargetLearning] = useState(false)
  return (
    <>
      {isShowViewTargetLearning && <ViewTargetLearningDeatail setIsShowViewTargetLearning={setIsShowViewTargetLearning} />}
      <div className={cx("view-study-profile-wrapper")}>
        <div className={cx("view-study-profile-container")}>
          <div className={cx("view-study-profile-header")}>
            <div className={cx("study-profile-infor")}>
              <img
                src={Avatar}
                alt="profile-avatar"
                className={cx("profile-avatar")}
              />
              <div className={cx("profile-infor")}>
                {/* First Name */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-address-card")}></i>
                  </div>
                  <div className={cx("item-title")}>First Name:</div>
                  <div className={cx("item-text")}>Dev</div>
                </div>

                {/* Last Name */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-address-card")}></i>
                  </div>
                  <div className={cx("item-title")}>Last Name:</div>
                  <div className={cx("item-text")}>Smith</div>
                </div>

                {/* Date of Birth */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-calendar-alt")}></i>
                  </div>
                  <div className={cx("item-title")}>Date of Birth:</div>
                  <div className={cx("item-text")}>01/01/1990</div>
                </div>

                {/* Gender */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-venus-mars")}></i>
                  </div>
                  <div className={cx("item-title")}>Gender:</div>
                  <div className={cx("item-text")}>Male</div>
                </div>

                {/* Email */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-envelope")}></i>
                  </div>
                  <div className={cx("item-title")}>Email:</div>
                  <div className={cx("item-text")}>dev.smith@example.com</div>
                </div>

                {/* Phone */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-phone")}></i>
                  </div>
                  <div className={cx("item-title")}>Phone:</div>
                  <div className={cx("item-text")}>+1234567890</div>
                </div>
              </div>
            </div>
            <button
              className={cx("study-profile-close")}
              onClick={() => setIsShowViewStudyProfile(false)}
            >
              <i className={cx("fa-solid fa-xmark")}></i>
            </button>
          </div>
          <div className={cx("view-study-profile-content")}>
            <TargetLearningItem setIsShowViewTargetLearning={setIsShowViewTargetLearning} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewStudyProfile;
