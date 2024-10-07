import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./RWRerender.module.scss";
const cx = classNames.bind(styles);

function RWRerender({ loadedContent }) {
  return (
    <div
      className={cx("rw-rerender-content")}
      dangerouslySetInnerHTML={{ __html: loadedContent }}
    ></div>
  );
}

RWRerender.propTypes = {
  loadedContent: PropTypes.string.isRequired,
};

export default RWRerender;
