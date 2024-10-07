import classNames from "classnames/bind";
import styles from "./IntrodutionInstructor.module.scss"
const cx = classNames.bind(styles)

function IntrodutionInstructor() {
    return (
        <div className={cx("about-introdution")}>
            <div className={cx("about-introdution-title")}>
                About Us
            </div>
            <div className={cx("about-introdution-sub-title")}>
                Explore Experienced Instructor
            </div>
        </div>
    );
}

export default IntrodutionInstructor;