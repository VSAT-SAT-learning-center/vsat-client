import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import LearningPartUnitTestContent from "~/layouts/Student/LearningPartUnitTest/LearningPartUnitTestContent";
import LearningPartUnitTestSidebar from "~/layouts/Student/LearningPartUnitTest/LearningPartUnitTestSidebar";
import styles from "./LearningPartUnitTest.module.scss";
const cx = classNames.bind(styles);
function LearningPartUnitTest() {
  const { slug, unitId, unitProgressId } = useParams();
  const [unitSelectId, sectionName] = unitId.split(":");

  return (
    <div className={cx("learning-part-unit-test-wrapper")}>
      <HeaderAuthen />
      <div className={cx("learning-part-unit-test-container")}>
        <LearningPartUnitTestSidebar slug={slug} section={sectionName} />
        <LearningPartUnitTestContent unitId={unitSelectId} unitProgressId={unitProgressId} />
      </div>
    </div>
  )
}

export default LearningPartUnitTest
