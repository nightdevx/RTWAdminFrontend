import { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import useUserStore from "../store/user.store";
import Button from "../components/Buttons/Button";
import UsersInformation from "../components/Users_Information";
import CreateUserPopup from "../components/popups/CreateUserPopup";
import Spinner from "../components/Spinner";

const Users = () => {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedUser, setSelectedUser] = useState(null); // Add selected user state
  const { users, fetchAllUsers, deleteUser } = useUserStore();
  const [currentStep] = useState(0);

  useEffect(() => {
    setLoading(true); // Start loading
    fetchAllUsers()
      .then(() => setLoading(false)) // End loading after fetch
      .catch(() => setLoading(false)); // Ensure loading ends even on error

    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, [fetchAllUsers]);

  const handleButtonClick = () => {
    setIsAddPopupOpen(true);
  };

  const handleCheckboxChange = (id) => {
    // Checkbox handling code
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setIsDeletePopupOpen(false);
      setSelectedUser(null);
      fetchAllUsers(); // Kullanıcı listesini güncellemek için
    } catch (error) {
      console.error("User deletion failed:", error);
      setError("Failed to delete user. Please try again.");
    }
  };

  const openDeletePopup = (user) => {
    setSelectedUser(user);
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full min-h-20 bg-[#eefaf9] flex justify-between items-center">
        <h1 className="text-2xl ml-8 w-full text-black p-2 rounded-xl">
          <span className="font-Roboto">Hello, </span>
          <span className="font-Roboto font-bold">
            {user?.username.toUpperCase()}
          </span>
        </h1>
        <div className="justify-center items-center flex gap-4">
          <div
            className="relative"
            id="search-users-btn"
            style={{
              zIndex: currentStep === 1 ? 100 : 0,
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Search Users, Companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg w-80 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-hoverrtw border border-gray-300 shadow-xl"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative mr-5">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 bg-white rounded-lg w-60 px-2 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-hoverrtw shadow-xl"
            >
              <option value="default">All</option>
              <option value="date">Date (Newest First)</option>
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <Button
          className="text-white w-60 mr-10 bg-rtw hover:bg-hoverrtw font-bold rounded rounded-xl shadow-xl duration-300 "
          click={handleButtonClick}
        >
          + Create Users
        </Button>
      </div>

      <div className="w-full items-center min-h-[92%] max-h-[92%] bg-açıkrtw flex flex-col">
        <div className="w-[95%] min-h-[60px] bg-white rounded-tl-xl rounded-tr-xl justify-center items-center flex border border-gray-300 font-bold">
          <p className="w-[33%] h-full items-center flex text-xl text-gray-600">
            USER NAME
          </p>
          <p className="w-[30%] h-full items-center flex text-xl text-gray-600">
            E-MAIL
          </p>
          <p className="w-[21.5%] h-full items-center flex text-xl text-gray-600">
            COMPANY
          </p>
          <p className="w-[11%] h-full items-center justify-center flex text-xl text-gray-600">
            ACTION
          </p>
        </div>

        <div className="w-[95%] items-center 3xl:min-h-[90%] 2xl:min-h-[85%] rounded-bl-xl rounded-br-xl bg-white flex flex-col border border-gray-300 overflow-y-scroll">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <Spinner /> {/* Add your spinner component */}
            </div>
          ) : users && users.length > 0 ? (
            users.map((user, index) => (
              <UsersInformation
                key={index}
                data={user}
                onCheckboxChange={handleCheckboxChange}
                selected={false}
                onDelete={openDeletePopup} // Pass openDeletePopup instead of handleDelete
              />
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              No users available
            </div>
          )}
        </div>
      </div>

      {isDeletePopupOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg shadow-gray-500 rounded-xl z-50">
            <h2 className="text-lg font-bold">
              Are you sure you want to delete the user?
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end mt-4">
              <Button
                click={closeDeletePopup}
                className="mr-2 bg-gray-500 text-white rounded-xl"
              >
                Cancel
              </Button>
              <Button
                click={() => handleDelete(selectedUser._id)}
                className="bg-red-500 text-white rounded-xl"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {isAddPopupOpen && <CreateUserPopup onClose={closeAddPopup} />}
    </div>
  );
};

export default Users;
