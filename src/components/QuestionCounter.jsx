import React, { useState, useEffect } from "react";

const QuestionCounter = ({
  questions,
  currentQuestionIndex,
  next,
  finish,
  skippable,
  showAtOnce,
}) => {
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [firstQuestionPassed, setFirstQuestionPassed] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (currentQuestionIndex > 0) {
      setPreviousQuestions((prev) => [
        ...prev,
        questions[currentQuestionIndex - 1],
      ]);
      setAnimate(true);
      setFirstQuestionPassed(true);
      setTimeout(() => setAnimate(false), 500); // Reset animation after 500ms
    }
  }, [currentQuestionIndex, questions]);

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      next(); // Go to the next question
    }
  };

  const handleFinish = () => {
    setIsEnded(true);
    finish(); // Finish when the finish button is clicked
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-b-xl min-h-[40%] xs:min-w-full 3xl:w-full border-t-4 border-gray-300">
      {(skippable || !showAtOnce) && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 3xl:text-center">
            Question {currentQuestionIndex + 1}
          </h2>
          {questions[currentQuestionIndex] && (
            <p className="text-lg text-gray-600 transition-opacity duration-500">
              {questions[currentQuestionIndex].questionText}
            </p>
          )}
          {skippable && currentQuestionIndex < questions.length - 1 && (
            <div className="flex justify-center items-center">
              <button
                onClick={handleSkip}
                className="mt-4 px-5 py-2 bg-rtw  text-white rounded-lg hover:bg-hoverrtw transition-colors duration-300 md:px-6 md:py-3"
              >
                Question Skip
              </button>
            </div>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button
              onClick={handleFinish}
              disabled={isEnded}
              className={`mt-4 px-5 py-2 rounded-lg text-white transition-colors duration-300 md:px-6 md:py-3 ${
                isEnded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Finish the interview
            </button>
          )}

          {/* Geçmiş soruları gösteren kısmı yorum satırına alındı */}
          {/*
          {firstQuestionPassed && (
            <div
              className={`mt-6 transition-opacity duration-500 ${
                animate ? "opacity-0" : "opacity-100"
              }`}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Previous Questions
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {previousQuestions.map((question, index) => (
                  <li
                    key={index}
                    className={`text-gray-600 transition-all duration-500 ${
                      animate
                        ? "opacity-0 translate-y-4"
                        : "opacity-100 translate-y-0"
                    }`}
                  >
                    {question.questionText}
                  </li>
                ))}
              </ul>
            </div>
          )}
          */}
        </>
      )}

      {showAtOnce && (
        <>
          <p className="text-xl font-semibold text-rtw">Questions</p>
          <ul className="list-decimal pl-5 space-y-3 max-h-20 overflow-y-auto">
            {questions.map((question, index) => (
              <ul className="list-disc list-inside text-lg">
                <li className="text-gray-800 text-lg">
                  {question.questionText}
                </li>
              </ul>
            ))}
          </ul>
          <div className="flex justify-center items-center">
            <button
              onClick={handleFinish}
              disabled={isEnded}
              className={`mt-2 px-6 py-2 rounded-lg text-white transition-colors duration-300 ${
                isEnded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Finish
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionCounter;
