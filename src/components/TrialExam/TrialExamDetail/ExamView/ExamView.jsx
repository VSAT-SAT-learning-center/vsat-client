import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { formatTime } from "~/utils/timeFormat";
import ConfirmExamModal from "./ConfirmExamModal";
import DirectionModal from "./DirectionModal";
import styles from "./ExamView.module.scss";
import QuestionDropdownModal from "./QuestionDropdownModal";
import QuestionExam from "./QuestionExam";
const cx = classNames.bind(styles);

function ExamView({ exam }) {
  const [isShowTime, setIsShowTime] = useState(true);
  const [isShowDirection, setIsShowDirection] = useState(true);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [showQuestionDropdown, setShowQuestionDropdown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    exam.examQuestions[currentModuleIndex].time * 60
  );
  const [autoSubmitTimer, setAutoSubmitTimer] = useState(null);
  const [isTimeoutTriggered, setIsTimeoutTriggered] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState({});
  const [isFinishClicked, setIsFinishClicked] = useState(false);

  const currentModule = exam.examQuestions[currentModuleIndex];
  const currentQuestion = currentModule.questions[currentQuestionIndex];

  useEffect(() => {
    setTimeLeft(currentModule.time * 60);
    // setTimeLeft(5);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) return prevTime - 1;

        clearInterval(timer); // Stop countdown at 0

        if (exam?.examStructureType === "Adaptive") {
          // Adaptive exam logic
          if (currentModuleIndex === 0) {
            // If Module 1 ends and examType is Adaptive, auto-generate Module 2 with "Easy" difficulty
            const nextModule = exam.examQuestions.find(
              (module) =>
                module.name === "Module 2" &&
                module.level === "Easy" &&
                module.section === currentModule.section
            );

            if (nextModule) {
              setCurrentModuleIndex(exam.examQuestions.indexOf(nextModule));
              setCurrentQuestionIndex(0); // Start at the first question of the new module
              setTimeLeft(nextModule.time * 60); // Reset time for the new module
            } else {
              console.warn("Easy module not found for Module 2");
              setShowSubmitConfirmation(true); // Fallback to submission if no module found
              setIsTimeoutTriggered(true);
            }
          } else if (
            currentModule.name === "Module 2" &&
            currentModule.level === "Easy" &&
            currentModule.section === "Reading & Writing"
          ) {
            // Transition to Math Module 1 after Reading & Writing Module 2 (Easy) times out
            const mathModule1 = exam.examQuestions.find(
              (module) =>
                module.name === "Module 1" && module.section === "Math"
            );

            if (mathModule1) {
              setCurrentModuleIndex(exam.examQuestions.indexOf(mathModule1));
              setCurrentQuestionIndex(0); // Start at the first question of the new module
              setTimeLeft(mathModule1.time * 60); // Reset time for the new module
            } else {
              console.warn("Math Module 1 not found");
              setShowSubmitConfirmation(true); // Fallback to submission if no module found
              setIsTimeoutTriggered(true);
            }
          } else if (
            currentModule.name === "Module 2" &&
            currentModule.level === "Easy" &&
            currentModule.section === "Math"
          ) {
            // Show submit confirmation when Math Module 2 (Easy) ends
            setShowSubmitConfirmation(true);
            setIsTimeoutTriggered(true);
          } else {
            // Fallback to sequential module logic for Adaptive exams
            const nextModuleIndex = currentModuleIndex + 1;
            const nextModule = exam.examQuestions[nextModuleIndex];
            if (nextModule) {
              setCurrentModuleIndex(nextModuleIndex);
              setCurrentQuestionIndex(0);
              setTimeLeft(nextModule.time * 60);
            } else {
              setShowSubmitConfirmation(true); // Show submit confirmation on last module
              setIsTimeoutTriggered(true);
            }
          }
        } else {
          // Non-Adaptive exam logic (sequential module transitions)
          if (currentModuleIndex < exam.examQuestions.length - 1) {
            setCurrentModuleIndex((prevIndex) => prevIndex + 1);
            setCurrentQuestionIndex(0);
            setTimeLeft(currentModule.time * 60);
          } else {
            setShowSubmitConfirmation(true);
            setIsTimeoutTriggered(true);
          }
        }

        return 0;
      });
    }, 1000);

    return () => clearInterval(timer); // Clear timer on module change or component unmount
  }, [
    currentModule.level,
    currentModule.name,
    currentModule.section,
    currentModule.time,
    currentModuleIndex,
    exam.examQuestions,
    exam?.examStructureType,
  ]);

  useEffect(() => {
    if (showSubmitConfirmation && isTimeoutTriggered) {
      setAutoSubmitTimer(5);
      const autoSubmitInterval = setInterval(() => {
        setAutoSubmitTimer((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(autoSubmitInterval);
          handleSubmit(); // Auto-submit when countdown ends
          return 0;
        });
      }, 1000);
      return () => clearInterval(autoSubmitInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSubmitConfirmation]);

  // Function to handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const calculateModuleScore = () => {
    let correctAnswers = 0;

    currentModule.questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];

      // Find the correct answer(s) within the question's answers array
      const correctAnswer = question.answers.find(
        (answer) => answer.isCorrectAnswer
      );

      if (question.isSingleChoiceQuestion) {
        // For single-choice questions, check if the user's selected answer ID matches the correct answer ID
        if (correctAnswer && userAnswer === correctAnswer.id) {
          correctAnswers++;
        }
      } else {
        // For text input questions, normalize the correct answer and user input for comparison
        if (correctAnswer) {
          // Remove LaTeX-style delimiters \[ and \] and extra spaces
          const normalizedCorrectAnswer = correctAnswer.plaintext
            .replace(/\\\[(.*?)\\\]/g, "$1") // Remove \[ and \] around the content
            .trim()
            .toLowerCase(); // Convert to lowercase for case-insensitive comparison

          const normalizedUserAnswer = userAnswer.trim().toLowerCase(); // Normalize user input

          // Compare the normalized answers
          if (normalizedUserAnswer === normalizedCorrectAnswer) {
            correctAnswers++;
          }
        }
      }
    });

    return correctAnswers;
  };

  const handleModuleCompletion = () => {
    const score = calculateModuleScore();
    console.log(score);

    let nextModule;

    // Check if this is the first module and we need an adaptive module for Module 2
    if (exam?.examStructureType === "Adaptive" && currentModuleIndex === 0) {
      if (currentModule.section === "Reading & Writing") {
        // Determine if we need "Hard" or "Easy" questions for Module 2
        if (score >= exam.requiredCorrectInModule1RW) {
          // Select the hard level module for Reading & Writing
          nextModule = exam.examQuestions.find(
            (module) =>
              module.name === "Module 2" &&
              module.level === "Hard" &&
              module.section === "Reading & Writing"
          );
          console.log("Proceeding to harder Reading & Writing questions.");
        } else {
          // Select the easy level module for Reading & Writing
          nextModule = exam.examQuestions.find(
            (module) =>
              module.name === "Module 2" &&
              module.level === "Easy" &&
              module.section === "Reading & Writing"
          );
          console.log("Proceeding to easier Reading & Writing questions.");
        }
      } else if (currentModule.section === "Math") {
        if (score >= exam.requiredCorrectInModule1M) {
          // Select the hard level module for Math
          nextModule = exam.examQuestions.find(
            (module) =>
              module.name === "Module 2" &&
              module.level === "Hard" &&
              module.section === "Math"
          );
          console.log("Proceeding to harder Math questions.");
        } else {
          // Select the easy level module for Math
          nextModule = exam.examQuestions.find(
            (module) =>
              module.name === "Module 2" &&
              module.level === "Easy" &&
              module.section === "Math"
          );
          console.log("Proceeding to easier Math questions.");
        }
      }
    }

    // Check if we've already completed 2 modules for the current section
    const currentSectionModules = exam.examQuestions.filter(
      (module) => module.section === currentModule.section
    );
    const currentSectionModuleIndex =
      currentSectionModules.indexOf(currentModule);

    if (currentSectionModuleIndex >= 1) {
      // If 2 modules are already completed for the section, move to the next section
      const nextSectionModule = exam.examQuestions.find(
        (module, index) =>
          index > currentModuleIndex && module.section !== currentModule.section
      );

      if (nextSectionModule) {
        setCurrentModuleIndex(exam.examQuestions.indexOf(nextSectionModule));
      } else {
        console.log("Exam completed. No more sections.");
        return;
        // Handle exam completion here (e.g., show a summary or results)
      }
    } else {
      // Set the next module in the state if found, otherwise go to the next sequential module
      if (nextModule) {
        setCurrentModuleIndex(exam.examQuestions.indexOf(nextModule));
      } else {
        setCurrentModuleIndex((prevIndex) => prevIndex + 1);
      }
    }

    setCurrentQuestionIndex(0); // Start at the first question of the next module
  };

  // Function to handle navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentModule.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Set Finish Clicked to True when attempting to finish the module
      setIsFinishClicked(true);

      // Check if there are unanswered questions in the current module
      const unansweredQuestionsExist = currentModule.questions.some(
        (q) => userAnswers[q.id] === undefined
      );

      // If this is the last question of "Math Module 2"
      if (currentModule.section === "Math" && currentModule.name === "Module 2") {
        if (unansweredQuestionsExist) {
          // If there are unanswered questions, open the QuestionDropdownModal
          setShowQuestionDropdown(true);
        } else {
          // If all questions are answered, show the submit confirmation popup
          setShowSubmitConfirmation(true);
          setIsTimeoutTriggered(false);
        }
      } else {
        // For other modules, check unanswered questions and handle module completion
        if (unansweredQuestionsExist) {
          // Open the QuestionDropdownModal to review unanswered questions
          setShowQuestionDropdown(true);
        } else {
          // Complete the module and move to the next if all questions are answered
          handleModuleCompletion();
          setIsFinishClicked(false);
        }
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Exam submitted:", userAnswers);
    // Implement further exam submission logic here, such as API calls
    setShowSubmitConfirmation(false); // Close the popup after submission
  };

  const handleMarkForReview = (questionId) => {
    setReviewQuestions((prevReviewQuestions) => {
      const moduleReviewQuestions = prevReviewQuestions[currentModuleIndex] || [];
      if (moduleReviewQuestions.includes(questionId)) {
        // Remove question from review if it’s already in the array
        return {
          ...prevReviewQuestions,
          [currentModuleIndex]: moduleReviewQuestions.filter((id) => id !== questionId),
        };
      } else {
        // Add question to review
        return {
          ...prevReviewQuestions,
          [currentModuleIndex]: [...moduleReviewQuestions, questionId],
        };
      }
    });
  };

  const isQuestionMarkedForReview = (questionId) => {
    return (reviewQuestions[currentModuleIndex] || []).includes(questionId);
  };

  // const isCurrentQuestionAnswered =
  //   userAnswers[currentQuestion.id] !== undefined;

  return (
    <>
      {isShowDirection && (
        <DirectionModal setIsShowDirection={setIsShowDirection} />
      )}
      {showSubmitConfirmation && (
        <ConfirmExamModal
          setShowSubmitConfirmation={setShowSubmitConfirmation}
          handleSubmit={handleSubmit}
          autoSubmitTimer={autoSubmitTimer}
        />
      )}
      {showQuestionDropdown && (
        <QuestionDropdownModal
          currentQuestionIndex={currentQuestionIndex}
          setShowQuestionDropdown={setShowQuestionDropdown}
          onQuestionSelect={(index) => {
            setCurrentQuestionIndex(index);
            setShowQuestionDropdown(false);
          }}
          questions={currentModule.questions.map((q) => ({
            id: q.id,
            status: userAnswers[q.id]
              ? isQuestionMarkedForReview(q.id)
                ? "review"
                : "answered"
              : "unanswered",
            section: currentModule.section,
            moduleName: currentModule.name,
          }))}
          isFinishClicked={isFinishClicked}
        />
      )}
      <div className={cx("exam-view-wrapper")}>
        <div className={cx("exam-view-container")}>
          <div className={cx("exam-view-header")}>
            <div className={cx("exam-view-infor")}>
              <div className={cx("module-view")}>
                {currentModule.section === "Reading & Writing"
                  ? "Section 1"
                  : "Section 2"}
                , {currentModule.name}:
              </div>
              <div className={cx("section-view")}>{currentModule.section}</div>
              <button
                className={cx("direction-btn")}
                onClick={() => setIsShowDirection(true)}
              >
                <span className={cx("text")}>Directions</span>
                <i className="fa-regular fa-chevron-down"></i>
              </button>
            </div>
            <div className={cx("exam-view-time")}>
              <div className={cx("time")}>
                {isShowTime ? (
                  <span className={cx("time-text")}>
                    {formatTime(timeLeft)}
                  </span>
                ) : (
                  <i className={cx("fa-solid fa-stopwatch", "time-icon")}></i>
                )}
              </div>
              <button
                className={cx("show-time-btn")}
                onClick={() => setIsShowTime(!isShowTime)}
              >
                {isShowTime ? "Hide" : "Show"}
              </button>
            </div>
            <div className={cx("exam-view-options")}>
              <button className={cx("more-btn")}>
                <i className={cx("fa-solid fa-pencil", "more-icon")}></i>
                <span className={cx("text")}>Annotate</span>
              </button>
              <button className={cx("more-btn")}>
                <i
                  className={cx("fa-solid fa-ellipsis-vertical", "more-icon")}
                ></i>
                <span className={cx("text")}>More</span>
              </button>
            </div>
          </div>
          <div className={cx("exam-view-content")}>
            <div className={cx("long-dashes")}></div>
            <QuestionExam
              question={currentQuestion}
              onAnswerSelect={handleAnswerSelect}
              currentAnswer={userAnswers[currentQuestion.id]}
              index={currentQuestionIndex}
              isMarkedForReview={isQuestionMarkedForReview(currentQuestion.id)}
              onMarkForReview={() => handleMarkForReview(currentQuestion.id)}
            />
            <div className={cx("long-dashes")}></div>
          </div>
          <div className={cx("exam-view-footer")}>
            <div className={cx("submit-exam")}></div>
            <div className={cx("question-dropdown")}>
              <button
                className={cx("dropdown-btn")}
                onClick={() => setShowQuestionDropdown(true)}
              >
                <span className={cx("question-cur")}>
                  {" "}
                  Question {currentQuestionIndex + 1} of{" "}
                  {currentModule.questions.length}
                </span>
                <i className={cx("fa-solid fa-caret-down")}></i>
              </button>
            </div>
            <div className={cx("question-actions")}>
              <button
                className={cx("action-btn", "back", {
                  disabled: currentQuestionIndex === 0,
                })}
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Back
              </button>
              <button
                className={cx("action-btn", "next")}
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex === currentModule.questions.length - 1
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamView;
