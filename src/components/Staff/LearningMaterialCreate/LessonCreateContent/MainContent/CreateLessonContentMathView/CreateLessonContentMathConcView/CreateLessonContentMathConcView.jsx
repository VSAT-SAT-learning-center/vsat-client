import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import CreateLessonContentQuestion from "../../CreateLessonContentRWView/CreateLessonContentQuestion";
import styles from "./CreateLessonContentMathConcView.module.scss";
const cx = classNames.bind(styles);

function CreateLessonContentMathConcView({ contents, setQuestionContent, setIsShowCreateConcContent }) {
  const [isShowCreateQuestion, setIsShowCreateQuestion] = useState(false);

  return (
    <div className={cx("conc-view-wrapper")}>
      <div
        className={cx("create-conc-action")}
        onClick={() => setIsShowCreateConcContent(true)}
      >
        <div className={cx("create-icon")}>
          <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
        </div>
        <div className={cx("create-text")}>Add content</div>
      </div>

      {isShowCreateQuestion ? (
        <CreateLessonContentQuestion
          setQuestionContent={setQuestionContent}
          setIsShowCreateQuestion={setIsShowCreateQuestion}
        />
      ) : (
        contents.length > 0 && (
          <div
            className={cx("create-conc-action")}
            onClick={() => setIsShowCreateQuestion(true)}
          >
            <div className={cx("create-icon")}>
              <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
            </div>
            <div className={cx("create-text")}>New question</div>
          </div>
        )
      )}
    </div>
  )
}

CreateLessonContentMathConcView.propTypes = {
  contents: PropTypes.array,
  setQuestionContent: PropTypes.func,
  setIsShowCreateConcContent: PropTypes.func,

};

export default CreateLessonContentMathConcView
