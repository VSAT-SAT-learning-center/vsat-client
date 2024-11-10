import classNames from "classnames/bind";
import emptyImg from "~/assets/images/content/empty.png";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./DomainQuestionView.module.scss";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function QuestionDropdown({
  setSearchValue,
  searchQuestionResult,
  domainQuestions,
  setDomainQuestions,
  setIsQuestionDropdownVisible,
  numberOfQuestion,
}) {
  const handleClickQuestion = (questionData) => {
    if (domainQuestions.questions.length >= numberOfQuestion) {
      toast.warning(`You can only select up to ${numberOfQuestion} questions.`);
      return;
    }
    setSearchValue("");
    setDomainQuestions((prevDomainQuestions) => ({
      ...prevDomainQuestions,
      questions: [...prevDomainQuestions.questions, questionData],
    }));
    setIsQuestionDropdownVisible(false);
  };
  return (
    <div className={cx("select-question-dropdown-container")}>
      {searchQuestionResult.length === 0 ? (
        <div className={cx("no-data-search-container")}>
          <img
            src={emptyImg}
            alt="empty-search"
            className={cx("empty-search-img")}
          />
          <span className={cx("empty-search-text")}>No data available</span>
        </div>
      ) : (
        searchQuestionResult.map((question) => (
          <div
            className={cx("question-search-container")}
            key={question.id}
            onClick={() => handleClickQuestion(question)}
          >
            <i
              className={cx(
                "fa-sharp fa-regular fa-circle-question",
                "question-icon"
              )}
            ></i>
            <div
              className={cx("question-content")}
              dangerouslySetInnerHTML={{
                __html: renderMathAndText(question?.content),
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionDropdown;
