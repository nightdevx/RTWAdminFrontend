import React from "react";

const InfoPopup = ({ interview, onClose }) => {
  const totalQuestions =
    interview?.packages.reduce(
      (total, pkg) => total + pkg.questions.length,
      0
    ) || 0;

  const totalDuration = interview?.packages.reduce((totalTime, pkg) => {
    const packageTime = pkg.questions.reduce((pkgTotal, q) => {
      return pkgTotal + q.questionTime;
    }, 0);
    return totalTime + packageTime;
  }, 0);

  const totalDurationInMinutes = (totalDuration / 60).toFixed(1); // Dakika olarak ve 1 ondalık hane ile gösterim

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 h-full md:h-4/5 flex flex-col">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#30847f] to-[#3daaa3] p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold text-white">
            Online Interview Information
          </h2>
        </div>

        {/* Content Section with Scroll */}
        <div className="p-6 space-y-4 overflow-y-auto h-full">
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700">
              <strong>Number of Questions:</strong> The interview consists of{" "}
              <strong>{totalQuestions}</strong> questions in total. You will
              have a set amount of time to answer each question.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700">
              <strong>Maximum Duration:</strong> The entire interview will take
              approximately <strong>{totalDurationInMinutes}</strong> minutes.
              At the end of this time, the system will automatically close, and
              your responses will be saved.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700">
              <strong>Recording Process:</strong> Once you start the interview,
              video recording will begin automatically. After you answer each
              question, your response will be saved before moving on to the next
              question.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700">
              <strong>Single Access:</strong> This interview can only be
              completed once, and you will not have access to it again.
              Therefore, please answer each question carefully.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700">
              <strong>Privacy:</strong> The recorded videos will only be used in
              the recruitment process and will not be shared with third parties.
            </p>
            <p className="mt-2">
              If you are ready to start, click the <strong>"Start"</strong>{" "}
              button to proceed to the first question.
            </p>
            <p className="mt-2">
              <strong>Good luck!</strong>
            </p>
          </div>
        </div>

        <button
          className="bg-gradient-to-r from-[#30847f] to-[#3daaa3] text-white font-bold py-2 rounded-b-lg hover:from-[#3daaa3] hover:to-[#30847f] transition duration-300"
          onClick={onClose}
        >
          I read and understood
        </button>
      </div>
    </div>
  );
};

export default InfoPopup;
