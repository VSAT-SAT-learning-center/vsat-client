import classNames from "classnames/bind";
import styles from "./NoContent.module.scss";
import NoContentSvg from "./NoContentSvg";
const cx = classNames.bind(styles);
function NoContent() {
  return (
    <div className={cx("create-lessons-main-no-content")}>
      <div className={cx("no-content-information")}>
        <div className={cx("no-content-text")}>Add content to your lesson</div>
        <div
          className={cx("no-content-sub-text")}
        >{`Create new or update existing topics or lessons. You're on the right track.`}</div>
      </div>
      <div className={cx("no-content-image")}>
        <NoContentSvg />
      </div>
    </div>
  );
}

export default NoContent;
