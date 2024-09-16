import classNames from "classnames/bind";
import Icon_1 from "../../../../assets/images/icon/01.svg";
import Icon_2 from "../../../../assets/images/icon/02.svg";
import Icon_3 from "../../../../assets/images/icon/03.svg";
import Icon_4 from "../../../../assets/images/icon/04.svg";
import Icon_5 from "../../../../assets/images/icon/05.svg";
import Icon_6 from "../../../../assets/images/icon/06.svg";
import Icon_box from "../../../../assets/images/icon/dot-box-1.svg";
import styles from "./IconAnimation.module.scss";
const cx = classNames.bind(styles);

function IconAnimation() {
  return (
    <>
      <img src={Icon_1} alt="icon-1" className={cx("icon", "icon-1")} />
      <img src={Icon_2} alt="icon-1" className={cx("icon", "icon-2")} />
      <img src={Icon_3} alt="icon-1" className={cx("icon", "icon-3")} />
      <img src={Icon_4} alt="icon-1" className={cx("icon", "icon-4")} />
      <img src={Icon_5} alt="icon-1" className={cx("icon", "icon-5")} />
      <img src={Icon_6} alt="icon-1" className={cx("icon", "icon-6")} />
      <img src={Icon_box} alt="icon-1" className={cx("icon-box")} />
    </>

  )
}

export default IconAnimation
