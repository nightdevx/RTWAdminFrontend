import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuestionPackageStore from "../../store/questionpackages.store";
import Textarea from "../../components/Inputs/Textarea";

export const AddQuestionPackagePopup = ({ onClose }) => {
  const [packageTitle, setPackageTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addQuestionPackage } = useQuestionPackageStore();

  const handleAddQuestion = async () => {
    if (!packageTitle.trim()) {
      setError("Please enter a valid question package name.");
      return;
    }
    const pack = {
      title: packageTitle,
      questions: [],
    };
    const packId = await addQuestionPackage(pack);
    console.log("packId", packId);
    onClose();
    navigate(`/admin/packages/questions/${packId}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[30%] rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center bg-rtw text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Add Question Package</h2>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold hover:text-red-500"
          >
            X
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              Package Title
            </label>
            <Textarea
              placeholder="Enter package title"
              value={packageTitle}
              onChange={(e) => {
                setPackageTitle(e.target.value);
                setError("");
              }}
              className="w-full h-[100px] border border-gray-300 rounded px-3 py-2v focus:outline-none focus:ring-2 focus:ring-hoverrtw"
              maxLength={200}
            />
          </div>
          {error && (
            <div className="mb-4 text-red-500 font-medium">{error}</div>
          )}
          <div className="flex justify-between items-center">
            <button
              onClick={handleAddQuestion}
              className="px-6 py-2 bg-rtw text-white rounded hover:bg-hoverrtw rounded-xl ml-auto"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
