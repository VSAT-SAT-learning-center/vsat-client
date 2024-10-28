import classNames from "classnames/bind";
import styles from "./NoQuestionData.module.scss";
import noDataImg from "~/assets/images/content/nodata.png"

const cx = classNames.bind(styles);
function NoQuestionData() {
  return (
    <div className={cx("no-data-container")}>
      <div className={cx("no-data-content")}>
        <img src={noDataImg} alt="no-data-img" className={cx("no-data-img")}/>
        <div className={cx("no-data-text")}>No data available</div>
      </div>
    </div>
  );
}

export default NoQuestionData;
