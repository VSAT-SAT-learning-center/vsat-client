import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestBG from "~/assets/images/content/test-illustration.png";
import Loader from "~/components/General/Loader";
import apiClient from "~/services/apiService";
import styles from "./LearningPartUnitTestContent.module.scss";
import UnitTestPractice from "./UnitTestPractice";
import UnitTestSummary from "./UnitTestSummary";
const cx = classNames.bind(styles);

function LearningPartUnitTestContent({ unitId, unitProgressId }) {
  const navigate = useNavigate()
  const [startTest, setStartTest] = useState(false); // Start the test
  const [buttonText, setButtonText] = useState("Let's go"); // Button text
  const [disableButton, setDisableButton] = useState(false); // Disable button initially
  const [showExplanation, setShowExplanation] = useState(false); // Show explanation
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); // Track correctness
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [firstSelectedAnswer, setFirstSelectedAnswer] = useState(null);
  const [validateAnswer, setValidateAnswer] = useState(() => () => { }); // Store the validation function from UnitTestPractice
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null)
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchContinueQuestion = async () => {
      try {
        const { data: latestQuizData } = await apiClient.get(`/quiz-attempts/${unitProgressId}/latest`);
        console.log(latestQuizData);

        if (latestQuizData?.data?.progress?.answeredQuestions > 0 && latestQuizData?.data?.status === "In Progress") {
          const startData = { unitProgressId };

          const { data: startQuizData } = await apiClient.post(`/quiz-attempts/${unitId}/start`, startData);

          const { data } = startQuizData;

          setStartTest(true);
          setQuizAttempt(data);
          setQuizQuestions(data.questions);
          setCurrentQuestionIndex(latestQuizData.data.progress.answeredQuestions);
          setButtonText("Check");
        }
      } catch (error) {
        console.error("Error while fetching continue question:", error);
      }
    };

    fetchContinueQuestion();
  }, [unitId, unitProgressId]);

  const fetchQuizQuestions = async () => {
    try {
      setLoading(true)
      const startData = {
        unitProgressId
      }
      const response = await apiClient.post(`/quiz-attempts/${unitId}/start`, startData)
      setQuizAttempt(response.data.data);
      setQuizQuestions(response.data.data.questions);
      setStartTest(true);
      setButtonText("Check");
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    } finally {
      setLoading(false)
    }
  };

  const updateQuizProgress = async () => {
    try {
      setLoading(true)
      const currentQuestion = quizQuestions[currentQuestionIndex];
      const progressData = {
        questionId: currentQuestion.questionId,
        studentdAnswerId: firstSelectedAnswer,
        studentdAnswerText: "",
      };
      console.log(progressData);
      await apiClient.post(`/quiz-attempts/${quizAttempt.quizAttemptId}/progress`, progressData);
      setButtonText("Back");
    } catch (error) {
      console.error("Error updating quiz progress:", error);
    } finally {
      setLoading(false)
    }
  };

  const submitQuiz = async () => {
    try {
      setLoading(true)
      const submitData = {
        unitProgressId
      }
      const response = await apiClient.post(`/quiz-attempts/${quizAttempt.quizId}/complete`, submitData);
      setSummaryData(response.data);
      setShowSummary(true);
    } catch (error) {
      console.error("Error submit quiz progress:", error);
    } finally {
      setLoading(false)
    }
  }

  const handleButtonClick = async () => {
    if (buttonText === "Let's go") {
      fetchQuizQuestions();
      setDisableButton(true); // Disable until an answer is selected
    } else if (buttonText === "Next question") {
      await updateQuizProgress();
      console.log(isAnswerCorrect);
      // Go to the next question
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setShowExplanation(false);
        setButtonText("Check");
        setDisableButton(true);
        setIsAnswerCorrect(null); // Reset answer state
        setSelectedAnswer(null); // Reset selected answer
        setFirstSelectedAnswer(null);
      } else {
        setButtonText("Show summary");
      }
    } else if (buttonText === "Show summary") {
      // Ensure updateQuizProgress is called before submitQuiz on the last question
      if (currentQuestionIndex === quizQuestions.length - 1) {
        await updateQuizProgress();
      }
      await submitQuiz()
    } else if (buttonText === "Check" || buttonText === "Check again") {
      if (!firstSelectedAnswer) {
        setFirstSelectedAnswer(selectedAnswer); // Set only on the first "Check" click
      }
      validateAnswer(); // Trigger validation in UnitTestPractice
    } else if (buttonText === "Back") {
      navigate(-1);
    }
  };

  const onAnswerSelected = (id) => {
    setDisableButton(false); // Enable button when an answer is selected
    setSelectedAnswer(id); // Update selected answer
  };

  const onAnswerChecked = (isCorrect) => {
    setIsAnswerCorrect(isCorrect); // Update the correctness of the selected answer
    if (isCorrect) {
      if (currentQuestionIndex === quizQuestions.length - 1) {
        // If last question is correct, directly show summary
        setButtonText("Show summary");
        setShowExplanation(true); // Show explanation for the last question
      } else {
        setButtonText("Next question"); // Transition to "Next Question"
        setShowExplanation(true); // Show explanation for correct answer
      }
    } else {
      setButtonText("Check again"); // Allow re-check for incorrect answer
      setDisableButton(true); // Disable button until a new answer is selected
    }
  };

  const handleRestartTest = () => {
    // Reset states to restart the test
    setStartTest(false);
    setButtonText("Let's go");
    setDisableButton(false);
    setShowExplanation(false);
    setIsAnswerCorrect(null);
    setSelectedAnswer(null);
    setFirstSelectedAnswer(null);
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setShowSummary(false);
    setSummaryData(null);
    setQuizAttempt(null);
  }

  return (
    <>
      {loading && <Loader />}
      <div className={cx("learning-part-unit-test-wrapper")}>
        <div className={cx("learning-part-unit-test-title")}>
          <div className={cx("title")}>Unit test</div>
        </div>
        {showSummary ? (
          <UnitTestSummary summaryData={summaryData} />
        ) : (
          startTest ? (
            <UnitTestPractice
              question={quizQuestions[currentQuestionIndex]}
              onAnswerSelected={onAnswerSelected}
              onAnswerChecked={onAnswerChecked}
              selectedAnswer={selectedAnswer}
              showExplanation={showExplanation}
              setValidateAnswer={setValidateAnswer}
            />
          ) : (
            <div className={cx("learing-part-unit-test-content")}>
              <div className={cx("content-title-content")}>
                <div className={cx("content-title")}>All set for the unit test?</div>
                <div className={cx("content-desc")}>
                  Welcome to the unit test — where you get to test your skills for the entire unit!
                </div>
                <img src={TestBG} alt="test-bg-img" className={cx("test-bg-img")} />
              </div>
            </div>
          )
        )}
        <div className={cx("learing-part-unit-test-action")}>
          <div className={cx("empty")}>
            {showSummary && (
              <button className={cx("again-btn")} onClick={handleRestartTest}>
                <i className={cx("fa-regular fa-arrow-rotate-right")}></i>
                <span className={cx("text")}>Try again</span>
              </button>
            )}
          </div>
          {startTest && (
            <div className={cx("noq")}>{currentQuestionIndex + 1} of {quizQuestions?.length}</div>
          )}
          <div className={cx("action")}>
            <button
              className={cx("start-btn", { disabled: disableButton })}
              onClick={handleButtonClick}
              disabled={disableButton}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LearningPartUnitTestContent;
