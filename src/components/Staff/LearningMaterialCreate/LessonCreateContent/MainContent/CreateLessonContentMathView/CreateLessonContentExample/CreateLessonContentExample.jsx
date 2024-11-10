import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
import styles from "./CreateLessonContentExample.module.scss";
const cx = classNames.bind(styles);

function CreateLessonContentExample({ setContent, setIsShowCreateExample }) {
  const [exampleContent, setExampleContent] = useState("");
  const [exampleExplain, setExampleExplain] = useState("");

  const handleClickDone = () => {
    const newExample = {
      exampleId: uuidv4(),
      content: exampleContent,
      explain: exampleExplain,
    };
    setContent((prevContent) => ({
      ...prevContent,
      examples: [...prevContent.examples, newExample],
    }));
    setExampleContent("")
    setExampleExplain("")
    setIsShowCreateExample(false)
  };

  const isDoneEnable = exampleContent.trim() !== "" && exampleExplain.trim() !== ""
  return (
    <div className={cx("create-example-editor-wrapper")}>
      <div className={cx("example-main-top")}>
        <div className={cx("example-title")}></div>
        <div className={cx("example-main-action")}>
          <button
            className={cx("done-btn", { "done-btn-disabled": !isDoneEnable })}
            disabled={!isDoneEnable}
            onClick={handleClickDone}
          >
            Done
          </button>
          <button
            className={cx("delete-btn")}
            onClick={() => setIsShowCreateExample(false)}
          >
            <i className={cx("fa-regular fa-trash", "trash-icon")}></i>
          </button>
        </div>
      </div>
      <div className={cx("example-main-title")}>
        <div className={cx("example-title")}>Example content</div>
        <ReactQuill
          className={cx("example-title-input")}
          theme="snow"
          value={exampleContent}
          onChange={setExampleContent}
          placeholder={"Write your example content here..."}
        />
      </div>
      <div className={cx("example-main-content")}>
        <div className={cx("example-content")}>Example explaination</div>
        <ReactQuill
          className={cx("example-content-input")}
          theme="snow"
          value={exampleExplain}
          onChange={setExampleExplain}
          placeholder={"Write your example explain here..."}
        />
      </div>
    </div>
  )
}

CreateLessonContentExample.propTypes = {
  setContent: PropTypes.func,
  setIsShowCreateExample: PropTypes.func,
};


export default CreateLessonContentExample
