import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import apiClient from "~/services/apiService";
import ViewTargetLearningDeatail from "../ViewTargetLearningDeatail";
import TargetLearningItem from "./TargetLearningItem";
import styles from "./ViewStudyProfile.module.scss";

const cx = classNames.bind(styles);

function ViewStudyProfile({ profile, setIsShowViewStudyProfile }) {
  const [targetLearnings, setTargetLearnings] = useState([])
  const [targetSelected, setTargetSelected] = useState(null)
  const [isWaiting, setIsWaiting] = useState(false);
  const [isShowViewTargetLearning, setIsShowViewTargetLearning] = useState(false)
  useEffect(() => {
    const fetchTargetLearnings = async () => {
      try {
        setIsWaiting(true)
        const response = await apiClient.get(`/target-learnings/getTargetLearningByStudyProfile?studyProfileId=${profile?.id}`)
        const sortedTargets = response.data.data.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
        setTargetLearnings(sortedTargets);
      } catch (error) {
        console.error("Error while fetching target learning:", error);
      } finally {
        setIsWaiting(false)
      }
    }
    fetchTargetLearnings()
  }, [profile?.id])
  return (
    <>
      {isShowViewTargetLearning && <ViewTargetLearningDeatail target={targetSelected} setIsShowViewTargetLearning={setIsShowViewTargetLearning} setIsShowViewStudyProfile={setIsShowViewStudyProfile} />}
      <div className={cx("view-study-profile-wrapper")}>
        <div className={cx("view-study-profile-container")}>
          <div className={cx("view-study-profile-header")}>
            <div className={cx("study-profile-infor")}>
              <img
                src={profile?.account.profilepictureurl}
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
                  <div className={cx("item-text")}>{profile?.account?.firstname}</div>
                </div>

                {/* Last Name */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-address-card")}></i>
                  </div>
                  <div className={cx("item-title")}>Last Name:</div>
                  <div className={cx("item-text")}>{profile?.account?.lastname}</div>
                </div>

                {/* Date of Birth */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-calendar-alt")}></i>
                  </div>
                  <div className={cx("item-title")}>Date of Birth:</div>
                  <div className={cx("item-text")}>{profile?.account?.dateofbirth}</div>
                </div>

                {/* Gender */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-venus-mars")}></i>
                  </div>
                  <div className={cx("item-title")}>Gender:</div>
                  <div className={cx("item-text")}>{profile?.account?.gender ? "Male" : "Female"}</div>
                </div>

                {/* Email */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-envelope")}></i>
                  </div>
                  <div className={cx("item-title")}>Email:</div>
                  <div className={cx("item-text")}>{profile?.account?.email}</div>
                </div>

                {/* Phone */}
                <div className={cx("infor-item")}>
                  <div className={cx("item-icon")}>
                    <i className={cx("fa-regular fa-phone")}></i>
                  </div>
                  <div className={cx("item-title")}>Phone:</div>
                  <div className={cx("item-text")}>+{profile?.account?.phonenumber}</div>
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
          <div className={cx(isWaiting || targetLearnings?.length > 0 ? "view-study-profile-content" : "view-study-profile-no-content")}>
            {isWaiting ? (
              <div className={cx("skeleton-load")}>
                {[...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height={120}
                  />
                ))}
              </div>
            ) : targetLearnings?.length > 0 ? (
              targetLearnings?.map((target, index) => (
                <TargetLearningItem key={target.id} index={index + 1} target={target} setTargetSelected={setTargetSelected} setIsShowViewTargetLearning={setIsShowViewTargetLearning} />
              ))
            ) : (
              <NoQuestionData />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewStudyProfile;
