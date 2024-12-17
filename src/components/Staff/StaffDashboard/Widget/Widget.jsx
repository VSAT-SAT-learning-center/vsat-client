import classNames from "classnames/bind";
import styles from "./Widget.module.scss";
const cx = classNames.bind(styles);

function Widget({ widget, setSelectedWidget }) {
  const styleIcon = (type) => {
    if (type === "Learning Materials") {
      return {
        color: "#2446b6",
      };
    } else if (type === "Questions") {
      return {
        color: "#f4cf39",
      };
    } else if (type === "Exams") {
      return {
        color: "#d7354f",
      };
    } else if (type === "Study Profiles") {
      return {
        color: "#51bfb3",
      };
    }
  };

  const styleBackgroundIcon = (type) => {
    if (type === "Learning Materials") {
      return {
        backgroundColor: "rgba(36, 70, 182, 0.2)",
      };
    } else if (type === "Questions") {
      return {
        backgroundColor: "rgba(244, 207, 57, 0.2)",
      };
    } else if (type === "Exams") {
      return {
        backgroundColor: "rgba(215, 53, 79, 0.2)",
      };
    } else if (type === "Study Profiles") {
      return {
        backgroundColor: "rgba(81, 191, 179, 0.2)",
      };
    }
  };

  const handleChooseWidget = () => {
    setSelectedWidget(widget)
  }

  return (
    <div
      className={cx("widget_container")}
      onClick={handleChooseWidget}
    >
      <div className={cx("widget_header")}>
        <div
          className={cx("icon-widget")}
          style={styleBackgroundIcon(widget?.type)}
        >
          <i className={cx(widget?.icon)} style={styleIcon(widget?.type)}></i>
        </div>
        <div className={cx("text-widget")}>{widget?.type}</div>
      </div>
      <div className={cx("widget_content")}>
        {widget?.data}
      </div>
      <div className={cx("widget_footer")}>
        <div className={cx("general-text")}>{widget?.title}</div>
        <div className={cx("general-number")}>{widget?.number}</div>
      </div>
    </div>
  )
}

export default Widget
