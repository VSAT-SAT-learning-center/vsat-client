import classNames from "classnames/bind";
import styles from "./ModuleQuestionTable.module.scss";

const cx = classNames.bind(styles);

function ModuleQuestionTable({ questions, setQuestionView, setShowQuestionView }) {
  const handleViewQuestion = (question) => {
    setQuestionView(question)
    setShowQuestionView(true)
  }
  return (
    <div className={cx("module-question-table")}>
      <table className={cx("custom-table")}>
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Question Domain</th>
            <th>Question Skill</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={question.questionId}>
              <td>{index + 1}</td>
              <td
                className={cx({
                  correct: question.isCorrect,
                  incorrect: !question.isCorrect,
                })}
              >
                {question.isCorrect ? "Correct" : "Incorrect"}
              </td>
              <td>{question.domain.name}</td>
              <td>{question.skill.name}</td>
              <td>
                <button className={cx("preview-btn")} onClick={() => (handleViewQuestion(question))}>
                  <i className={cx("fa-regular fa-eye")}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModuleQuestionTable;
