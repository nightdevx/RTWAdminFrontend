import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useQuestionPackageStore from "../../store/questionpackages.store";
import Textarea from "../../components/Inputs/Textarea";

export const AddQuestionPopup = ({ onClose, data }) => {
  const { id } = useParams();
  const [questionTitle, setQuestionTitle] = useState("");
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");
  const { addQuestionToPackage, updateQuestionInPackage } =
    useQuestionPackageStore();

  useEffect(() => {
    if (data) {
      setQuestionTitle(data.questionText);
      const totalSeconds = data.questionTime;
      setMinutes(Math.floor(totalSeconds / 60));
      setSeconds(totalSeconds % 60);
    }
  }, [data]);

  const handleAddQuestion = async () => {
    if (!questionTitle.trim() || (minutes === 0 && seconds === 0)) {
      setError("Please enter a valid question and time.");
      return;
    }
    const question = {
      text: questionTitle,
      time: minutes * 60 + seconds,
    };
    if (data) {
      updateQuestionInPackage(id, { _id: data._id, ...question }).then(() => {
        onClose();
      });
    } else {
      await addQuestionToPackage(id, question).then(() => {
        onClose();
      });
    }
  };

  const handleSecondsChange = (e) => {
    const value = Math.floor(e.target.value / 5) * 5;
    setSeconds(value);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white w-[30%] rounded-lg shadow-lg relative">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-rtw text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Add Question</h2>
          <button onClick={onClose} className="text-white font-bold">
            X
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Question</label>
            <Textarea
              placeholder="Enter Question"
              value={questionTitle}
              onChange={(e) => {
                setQuestionTitle(e.target.value);
                setError("");
              }}
              className="w-full h-[100px] border border-gray-300 rounded px-3 py-2"
              maxLength={200}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Time</label>
            <div className="flex items-center space-x-2">
              <div className="text-center">
                <label className="block text-sm font-medium">Minutes</label>
                <input
                  type="number"
                  min="0"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-[60px] text-center border border-gray-300 rounded p-2"
                  placeholder="Minutes"
                />
              </div>
              <span className="font-bold">:</span>
              <div className="text-center">
                <label className="block text-sm font-medium">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="55"
                  step="5"
                  value={seconds}
                  onChange={handleSecondsChange}
                  className="w-[60px] text-center border border-gray-300 rounded p-2"
                  placeholder="Seconds"
                />
              </div>
            </div>
          </div>
          {error && (
            <div className="mb-4 text-red-500 font-medium">{error}</div>
          )}
          <div className="flex justify-between items-center">
            <button
              onClick={handleAddQuestion}
              className="px-6 py-2 bg-rtw text-white rounded hover:bg-hoverrtw rounded-xl ml-auto"
            >
              {data ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
