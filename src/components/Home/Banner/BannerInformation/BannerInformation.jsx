import classNames from "classnames/bind"
import Icon_box from "../../../../assets/images/icon/dot-box-2.svg"
import Icon_fly from "../../../../assets/images/icon/dot-plan-1.svg"
import styles from "./BannerInformation.module.scss"
const cx = classNames.bind(styles)

function BannerInformation() {
  return (
    <div className={cx("banner-information")}>
      <img src={Icon_box} alt="icon" className={cx("icon-info")} />
      <div className={cx("infor-title")}>
        Boost Your SAT Score with VSAT: Learn Anytime with Top<span className={cx("hightlight")}> Instructors</span>.
      </div>
      <div className={cx("infor-desc")}>
        {`Don't`} just prepare—excel! With VSAT, access the best SAT strategies, personalized coaching, and innovative tools that fit your schedule. Join today and start your journey to a top SAT score!
      </div>
      <div className={cx("infor-rating")}><span className={cx("hightlight")}>#1</span> Worldwide Online Learning & Practice Platform</div>
      <img src={Icon_fly} alt="icon" className={cx("icon-info-bottom")} />

    </div>
  )
}

export default BannerInformation
