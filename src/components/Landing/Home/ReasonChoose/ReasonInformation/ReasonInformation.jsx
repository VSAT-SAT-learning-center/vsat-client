import classNames from "classnames/bind";
import styles from "./ReasonInformation.module.scss";
const cx = classNames.bind(styles);
function ReasonInformation() {
  return (
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
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form. There are many
          variations of passages of Lorem Ipsum available.
        </div>
        <div className={cx("reason-list")}>
          <div className={cx("reason-item")}>
            <div className={cx("reason-icon")}>
              <i className={cx("fa-solid fa-check", "icon")}></i>
            </div>
            <div className={cx("reason-text")}>
              There are many variations of passages of Lorem Ipsum.
            </div>
          </div>
          <div className={cx("reason-item")}>
            <div className={cx("reason-icon")}>
              <i className={cx("fa-solid fa-check", "icon")}></i>
            </div>
            <div className={cx("reason-text")}>
              There are many variations of passages of Lorem Ipsum.
            </div>
          </div>
          <div className={cx("reason-item")}>
            <div className={cx("reason-icon")}>
              <i className={cx("fa-solid fa-check", "icon")}></i>
            </div>
            <div className={cx("reason-text")}>
              There are many variations of passages of Lorem Ipsum.
            </div>
          </div>
        </div>
        <div className={cx("more-details")}>
          <button className={cx("more-btn")}>More Details</button>
        </div>
      </div>
    </div>
  );
}

export default ReasonInformation;
