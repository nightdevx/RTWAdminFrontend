import Button from "../components/Buttons/Button";
import CreateUserPopup from "../components/popups/CreateUserPopup";
import { useState } from "react";
import DeletePopup from "./popups/DeletePopup";
import useUserStore from "../store/user.store";

const UsersInformation = ({ data }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [error, setError] = useState("");
  const { deleteUser } = useUserStore();

  const openDeletePopup = () => setIsDeletePopupOpen(true);
  const closeDeletePopup = () => setIsDeletePopupOpen(false);

  const closePopup = () => setIsPopupOpen(false);
  const openPopup = () => setIsPopupOpen(true);
  const [currentStep] = useState(0);

  const handleDelete = async () => {
    try {
      console.log("Deleting user:", data._id);
      await deleteUser(data._id);
      setIsDeletePopupOpen(false);
    } catch (error) {
      console.error("User deletion failed:", error);
      setError("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="py-2 w-full min-h-[60px] bg-white justify-center items-center flex hover:bg-[#eefaf9] hover:cursor-pointer border border-b-gray-300">
      <div className="w-[45%] h-full items-center flex text-[20px] text-gray-500 ml-10">
        {data.username}
      </div>
      <div className="w-[40%] h-full items-center flex text-[20px] text-gray-500">
        {data.email}
      </div>{" "}
      <div className="w-[27%] h-full items-center flex text-[20px] text-gray-500"></div>
      <div className="w-[20%] h-full justify-center items-center flex text-[20px] text-gray-500">
        <div
          id="edit-users-btn"
          style={{
            zIndex: currentStep === 1 ? 100 : 0,
            position: "relative",
          }}
        >
          <Button
            click={openPopup}
            className={`font-bold px-6 rounded-xl h-9 justify-center items-center bg-rtw text-white`}
          >
            Edit
          </Button>
        </div>
        <div
          id="delete-users-btn"
          style={{
            zIndex: currentStep === 1 ? 100 : 0,
            position: "relative",
          }}
        >
          <Button
            click={openDeletePopup}
            className="ml-2 bg-red-500 text-white font-bold  rounded-xl h-9 justify-center items-center"
          >
            Delete
          </Button>
        </div>
      </div>
      {isDeletePopupOpen && (
        <DeletePopup
          onCancel={closeDeletePopup}
          onConfirm={handleDelete}
          error={error}
        />
      )}
      {isPopupOpen && <CreateUserPopup onClose={closePopup} data={data} />}
    </div>
  );
};

export default UsersInformation;
