import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Loader from "~/components/General/Loader";
import apiClient from "~/services/apiService";
import { formatTime } from "~/utils/timeFormat";
import ConfirmExamModal from "./ConfirmExamModal";
import DirectionModal from "./DirectionModal";
import styles from "./ExamView.module.scss";
import ExamViewResult from "./ExamViewResult";
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
  const [isHardRW, setIsHardRW] = useState(false);
  const [isHardMath, setIsHardMath] = useState(false);
  const [isWatingSubmit, setIsWatingSubmit] = useState(false);
  const [showExamResult, setShowExamResult] = useState(false);
  const [examResult, setExamResult] = useState(null);

  const currentModule = exam.examQuestions[currentModuleIndex];
  const currentQuestion = currentModule.questions[currentQuestionIndex];

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmReload = window.confirm(
        "Are you sure you want to reload? Changes you made may not be saved."
      );
      if (!confirmReload) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    const handleBeforeNavigate = (event) => {
      const confirmNavigate = window.confirm(
        "Are you sure you want to leave this page? Changes you made may not be saved."
      );
      if (confirmNavigate) {
        window.location.reload();
      } else {
        window.history.pushState(null, document.title, window.location.href);
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBeforeNavigate);

    window.history.pushState(null, document.title, window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBeforeNavigate);
    };
  }, []);

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

  const handleRightClick = (event) => {
    event.preventDefault();
  };

  const handleLeftClick = (event) => {
    event.preventDefault();
  };

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
    console.log("Calculated Score:", score);

    let nextModule;

    // Check if this is the first module and we need an adaptive module for Module 2
    if (exam?.examStructureType === "Adaptive") {
      if (
        currentModule.section === "Reading & Writing" &&
        currentModuleIndex === 0
      ) {
        // Determine if we need "Hard" or "Easy" questions for Module 2
        if (score >= exam.requiredCorrectInModule1RW) {
          // Select the hard level module for Reading & Writing
          nextModule = exam.examQuestions.find(
            (module) =>
              module.name === "Module 2" &&
              module.level === "Hard" &&
              module.section === "Reading & Writing"
          );
          setIsHardRW(true);
          console.log("Proceeding to harder Reading & Writing questions.");
        } else {
          // Select the easy level module for Reading & Writing
          nextModule = exam.examQuestions.find(
            (module) =>
              module.name === "Module 2" &&
              module.level === "Easy" &&
              module.section === "Reading & Writing"
          );
          setIsHardRW(false);
          console.log("Proceeding to easier Reading & Writing questions.");
        }
      } else if (currentModule.section === "Math" && currentModuleIndex === 3) {
        if (score >= exam.requiredCorrectInModule1M) {
          // Select the hard level module for Math
          nextModule = exam.examQuestions.find(
            (module) =>
              module.name === "Module 2" &&
              module.level === "Hard" &&
              module.section === "Math"
          );
          setIsHardMath(true);
          console.log("Proceeding to harder Math questions.");
        } else {
          // Select the easy level module for Math
          nextModule = exam.examQuestions.find(
            (module) =>
              module.name === "Module 2" &&
              module.level === "Easy" &&
              module.section === "Math"
          );
          setIsHardMath(false);
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
        const unansweredQuestionsExist = currentModule.questions.some(
          (q) => userAnswers[q.id] === undefined
        );
        if (unansweredQuestionsExist) {
          // If there are unanswered questions, open the QuestionDropdownModal
          setShowQuestionDropdown(true);
        } else {
          // If all questions are answered, show the submit confirmation popup
          setShowSubmitConfirmation(true);
          setIsTimeoutTriggered(false);
        }
        console.log("Exam completed. No more sections.");
        return;
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
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const uniqueQuestions = new Set();

    // Calculate correct answers for Reading & Writing section
    const correctAnswerRW = exam.examQuestions
      .filter((module) => module.section === "Reading & Writing")
      .flatMap((module) => module.questions)
      .filter((question) => {
        // Only include the question if it hasn't been seen before
        if (uniqueQuestions.has(question.id)) {
          return false; // Skip duplicate
        }
        uniqueQuestions.add(question.id);
        return true; // Include unique question
      })
      .reduce((score, question) => {
        const userAnswer = userAnswers[question.id];
        const correctAnswer = question.answers.find(
          (answer) => answer.isCorrectAnswer
        );
        return score + (userAnswer && userAnswer === correctAnswer?.id ? 1 : 0);
      }, 0);

    // Reset the unique questions set to handle Math section independently
    uniqueQuestions.clear();

    // Calculate correct answers for Math section
    const correctAnswerMath = exam.examQuestions
      .filter((module) => module.section === "Math")
      .flatMap((module) => module.questions)
      .filter((question) => {
        // Only include the question if it hasn't been seen before
        if (uniqueQuestions.has(question.id)) {
          return false; // Skip duplicate
        }
        uniqueQuestions.add(question.id);
        return true; // Include unique question
      })
      .reduce((score, question) => {
        const userAnswer = userAnswers[question.id];
        const correctAnswer = question.answers.find(
          (answer) => answer.isCorrectAnswer
        );

        if (question.isSingleChoiceQuestion) {
          return (
            score + (correctAnswer && userAnswer === correctAnswer.id ? 1 : 0)
          );
        } else if (correctAnswer) {
          const normalizedCorrectAnswer = correctAnswer.plaintext
            .replace(/\\\[(.*?)\\\]/g, "$1")
            .trim()
            .toLowerCase();

          const normalizedUserAnswer = userAnswer?.trim().toLowerCase();

          return (
            score + (normalizedUserAnswer === normalizedCorrectAnswer ? 1 : 0)
          );
        }
        return score;
      }, 0);

    const createExamAttemptDetail = Object.entries(userAnswers).map(
      ([questionId, studentAnswer]) => {
        const question = exam.examQuestions
          .flatMap((module) => module.questions)
          .find((q) => q.id === questionId);

        let studentAnswerText = `<p>\\[${studentAnswer}\\]</p>`;

        if (question) {
          const selectedAnswer = question.answers.find((answer) => {
            if (answer.id === studentAnswer) return true;
            const normalizedAnswerText = answer.plaintext
              .replace(/\\\[(.*?)\\\]/g, "$1")
              .trim()
              .toLowerCase();

            const normalizedStudentAnswer = studentAnswer.trim().toLowerCase();
            return normalizedAnswerText === normalizedStudentAnswer;
          });

          if (selectedAnswer) {
            studentAnswerText = selectedAnswer.text;
          }
        }

        return {
          questionid: questionId,
          studentanswer: studentAnswerText,
        };
      }
    );

    // Construct payload
    const payload = {
      examId: exam.id,
      correctAnswerRW,
      correctAnswerMath,
      isHardRW: exam.examStructureType === "Adaptive" ? isHardRW : false,
      isHardMath: exam.examStructureType === "Adaptive" ? isHardMath : false,
      createExamAttemptDetail,
    };
    // Send API request
    try {
      setIsWatingSubmit(true);
      const response = await apiClient.post("/exam-attempts", payload);
      setExamResult(response.data.data);
      setShowExamResult(true);
    } catch (error) {
      console.error("Error submitting exam:", error);
    } finally {
      setIsWatingSubmit(false);
    }
    setShowSubmitConfirmation(false);
  };

  const handleMarkForReview = (questionId) => {
    setReviewQuestions((prevReviewQuestions) => {
      const moduleReviewQuestions =
        prevReviewQuestions[currentModuleIndex] || [];
      if (moduleReviewQuestions.includes(questionId)) {
        // Remove question from review if it’s already in the array
        return {
          ...prevReviewQuestions,
          [currentModuleIndex]: moduleReviewQuestions.filter(
            (id) => id !== questionId
          ),
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

  return (
    <>
      {isWatingSubmit && <Loader />}
      {showExamResult && <ExamViewResult exam={exam} examResult={examResult} />}
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
      <div
        className={cx("exam-view-wrapper")}
        onContextMenu={handleRightClick}
        onClick={handleLeftClick}
      >
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
