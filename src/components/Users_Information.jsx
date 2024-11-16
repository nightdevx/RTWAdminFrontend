import { useNavigate } from "react-router-dom"; // useNavigate'i tanımla
import Button from "../components/Buttons/Button";
import CreateUserPopup from "../components/popups/CreateUserPopup";
import { useState } from "react";

const UsersInformation = ({
  data,
  index,
  onCheckboxChange,
  selected,
  isUsed,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => setIsPopupOpen(false);
  const openPopup = () => setIsPopupOpen(true);

  return (
    <div className="py-2 w-full min-h-[60px] bg-white justify-center items-center flex hover:bg-[#eefaf9] hover:cursor-pointer border border-b-gray-300">
      <div className="w-[45%] h-full items-center flex text-[20px] text-gray-500 ml-10">
        {data.username}
      </div>
      <div className="w-[40%] h-full items-center flex text-[20px] text-gray-500">
        {data.email}
      </div>{" "}
      <div className="w-[27%] h-full items-center flex text-[20px] text-gray-500">
        {data.company}
      </div>
      <div className="w-[20%] h-full justify-center items-center flex text-[20px] text-gray-500">
        <Button
          disabled={isUsed}
          click={openPopup}
          className={`font-bold px-6 rounded-xl h-9 justify-center items-center ${
            isUsed ? "bg-gray-200 text-gray-400" : "bg-rtw text-white"
          }`}
        >
          Edit
        </Button>
        <Button
          click={() => onDelete(data._id)}
          className="ml-2 bg-red-500 text-white font-bold  rounded-xl h-9 justify-center items-center"
        >
          Delete
        </Button> 
      </div>
      {isPopupOpen && <CreateUserPopup onClose={closePopup} data={data} />}
    </div>
  );
};

export default UsersInformation;
