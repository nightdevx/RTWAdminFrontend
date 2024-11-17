import { useNavigate } from "react-router-dom"; // useNavigate'i import et
import Button from "../components/Buttons/Button";

const QuestionPackage = ({ data, onCheckboxChange, selected, currentStep }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/admin/packages/questions/${data._id}`);
  };

  return (
    <div className="py-2 w-full min-h-[60px] bg-white justify-center items-center flex hover:bg-[#eefaf9] hover:cursor-pointer border border-b-gray-300">
      <div className="w-[9%] 2xl:w-[11%] h-full justify-center items-center flex mr-5">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onCheckboxChange(data._id)}
          className={`w-4 h-4 rounded-full border checked:bg-red-600 checked:border-transparent ${
            data.isUsed
              ? "cursor-not-allowed border-gray-200 "
              : "cursor-pointer border-gray-700 "
          }`}
          style={{ appearance: "none" }} // Tarayıcı varsayılan görünümünü kaldır
          disabled={data.isUsed}
        />
      </div>
      {/* nokta ikonu */}
      <div
        className="w-[10%] h-9 items-center flex ml-1"
        id="packages-status-btn"
        style={{
          zIndex: currentStep === 2 ? 100 : 0,
          position: "relative",
        }}
      >
        {data.isUsed ? (
          <div className="w-[620%] 2xl:w-[80%] text-[15px] text-green-600 p-1 rounded-xl border border-green-500 bg-green-200 flex items-center">
            <div
              className={`top-2 left-2 w-3 h-3 rounded-full bg-green-500`}
            ></div>
            &nbsp; In Use
          </div>
        ) : (
          <div className="w-[10%] 2xl:w-[80%] 2xl:h-8 text-[15px] text-red-600 p-1 rounded-xl border border-red-500 bg-red-200 flex items-center">
            <div
              className={`top-2 left-2 w-3 h-3 rounded-full bg-red-500`}
            ></div>
            &nbsp; Not Using
          </div>
        )}
      </div>
      <div className="w-[60%] h-full items-center flex text-[20px] text-gray-600">
        {data.title}
      </div>
      <div className="w-[10%] h-full items-center flex text-[20px] text-gray-600">
        {data.questions.length}
      </div>
      <div
        className="w-[10%] h-full items-center flex text-[20px] text-gray-600"
        id="edit-packages-btn"
        style={{
          zIndex: currentStep === 2 ? 100 : 0,
          position: "relative",
        }}
      >
        <Button
          disabled={data.isUsed}
          click={handleEditClick}
          className={`font-bold px-6 rounded-xl h-9 justify-center items-center ${
            data.isUsed ? "bg-gray-200 text-gray-400" : "bg-rtw text-white"
          }`}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default QuestionPackage;
