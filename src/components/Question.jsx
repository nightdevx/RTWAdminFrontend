import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate'i tanımla
import Button from "../components/Buttons/Button";
import imgArrowButton from "../assets/images/arrows.png";
import { AddQuestionPopup } from "../components/popups/AddQuestionPopup";

const Question = ({ data, index, onCheckboxChange, selected }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Süreyi dakika ve saniye olarak hesaplayan yardımcı fonksiyon
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="py-2 w-full min-h-[60px] bg-white justify-center items-center flex hover:bg-[#eefaf9] hover:cursor-pointer border border-b-gray-300">
      <div className="w-[12%] h-full justify-center items-center flex">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onCheckboxChange(data._id)}
          className="w-4 h-4 rounded-full border border-gray-400 checked:bg-red-600 checked:border-transparent"
          style={{ appearance: "none" }}
        />
      </div>
      <div className="w-[2%] h-full items-center  flex flex-col rounded-tl-xl rounded-bl-xl mr-10">
        <img src={imgArrowButton} alt="Arrows" />
      </div>
      <div className="w-[66%] h-full items-center flex text-[20px] text-gray-600">
        {data.questionText}
      </div>
      <div className="w-[5%] h-full justify-center items-center flex text-[20px] text-gray-600">
        {formatTime(data.questionTime)}
      </div>
      <div className="w-[18%] h-full justify-center items-center flex text-[20px] ">
        <Button
          click={handleEditClick}
          className={
            "bg-rtw hover:hoverrtw text-white font-bold px-6 rounded-xl h-9 justify-center items-center"
          }
        >
          Edit
        </Button>
      </div>
      {isPopupOpen && <AddQuestionPopup onClose={closePopup} data={data} />}
    </div>
  );
};

export default Question;
