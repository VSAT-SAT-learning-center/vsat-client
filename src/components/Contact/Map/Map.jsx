import classNames from "classnames/bind";
import styles from "./Map.module.scss"
const cx = classNames.bind(styles)

const Map = () => {
    return (
        <div className={cx("contact-map-container")}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010537607!2d106.8073027088192!3d10.841127589266979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1727932589242!5m2!1svi!2s"
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" 
          ></iframe>
        </div>
      );
  };
  
  export default Map;