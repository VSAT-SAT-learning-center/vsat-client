import classNames from "classnames/bind";
import styles from "./AboutAchievements.module.scss";
const cx = classNames.bind(styles);

function AboutAchievements() {
    return (
        <div className={cx("achievements-container")}>
            <div className={cx("achievement-card", "orange")}>
                <h2>100+</h2>
                <h5>Specialist Good Teachers</h5>
            </div>
            <div className={cx("achievement-card", "purple")}>
                <h2>200+</h2>
                <h5>Online Learning Courses</h5>
            </div>
            <div className={cx("achievement-card", "red")}>
                <h2>350+</h2>
                <h5>Students participate online</h5>
            </div>
            <div className={cx("achievement-card", "blue")}>
                <h2>1000+</h2>
                <h5>Standard and diversified banking</h5>
            </div>
        </div>
    );
}

export default AboutAchievements;
