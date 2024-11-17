import { useState, useEffect } from "react";
import Button from "../components/Buttons/Button";
import QuestionPackage from "../components/Question_Package";
import useQuestionPackageStore from "../store/questionpackages.store";
import { AddQuestionPackagePopup } from "../components/popups/AddQuestionPackagePopup";
import { FaSearch, FaFilter } from "react-icons/fa";
import ManageInformationPopup from "../components/popups/ManageInformationPopup";
import Spinner from "../components/Spinner";
import AdminName from "../components/Admin_Name";
import DeletePopup from "../components/popups/DeletePopup"; // DeletePopup'ı import et
import useInterviewStore from "../store/interview.store";

const ManageQuestionPackage = () => {
  const { questionPackages, getQuestionPackages, deleteQuestionPackages } =
    useQuestionPackageStore();
  const { interviews, fetchInterviews } = useInterviewStore();

  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isManageInformationPopupOpen, setIsManageInformationPopupOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true); // Loading state for spinner
  const [currentStep] = useState(0);

  const closeAddPopup = () => setIsAddPopupOpen(false);
  const closeManageInformationPopup = () =>
    setIsManageInformationPopupOpen(false);

  useEffect(() => {
    setLoading(true);
    getQuestionPackages().finally(() => setLoading(false)); // Set loading to false after fetching data
    fetchInterviews();
  }, [getQuestionPackages, fetchInterviews]);

  const handleCheckboxChange = (packageId) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId]
    );
  };

  const handleDeleteClick = () => {
    if (selectedPackages.length === 0) {
      return;
    }
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    await deleteQuestionPackages(selectedPackages);
    setSelectedPackages([]);
    setIsDeletePopupOpen(false);
  };

  const cancelDelete = () => {
    setError("");
    setSelectedPackages([]);
    setIsDeletePopupOpen(false);
  };

  const handleAddButtonClick = () => {
    setIsAddPopupOpen(true);
  };

  // Dummy data for package usage info
  const packageUsageInfo = questionPackages.map((pack) => ({
    ...pack,
    isUsed: interviews.some((interview) =>
      interview.packages.some((pkg) => pkg._id === pack._id)
    ),
  }));

  // Filter packages based on search term
  const filteredPackages = packageUsageInfo.filter((pack) =>
    pack.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  // Sorting logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full min-h-20 bg-açıkrtw flex justify-between items-center">
        <AdminName />
        <div className="flex gap-4">
          <div
            className="relative"
            id="search-packages-btn"
            style={{
              zIndex: currentStep === 5 ? 100 : 0,
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Search Question Packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg w-80 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-hoverrtw border border-gray-300 shadow-xl"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 bg-white rounded-lg w-60 px-2 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-hoverrtw shadow-xl"
            >
              <option value="default">All</option>
              <option value="inUse">In Use</option>
              <option value="notUsing">Not Using</option>
              <option value="date">Date (Newest First)</option>
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div
            id="delete-packages-btn"
            style={{
              zIndex: currentStep === 4 ? 100 : 0,
              position: "relative",
            }}
          >
            <Button
              click={handleDeleteClick}
              className="bg-red-300 text-red-800 font-bold rounded-xl shadow-xl mr-5"
            >
              Delete
            </Button>
          </div>
        </div>

        <Button
          className="text-white w-60 mr-10 bg-rtw hover:bg-hoverrtw rounded-xl shadow-xl"
          click={handleAddButtonClick}
        >
          + Create Question Package
        </Button>
      </div>

      <div className="w-full items-center min-h-[92%] max-h-[92%] bg-açıkrtw flex flex-col">
        {/* Main content */}
        <div className="w-[95%] min-h-[60px] bg-white rounded-tl-xl rounded-tr-xl flex border border-gray-300 font-bold">
          <p className="w-[10%] h-full text-xl flex justify-center items-center text-gray-600">
            SELECT
          </p>
          <p className="w-[12%] h-full text-xl flex justify-center items-center text-gray-600">
            STATUS
          </p>
          <p className="w-[50%] h-full text-xl flex items-center text-gray-600">
            PACKAGE NAME
          </p>
          <p className="w-[20%] h-full text-xl flex justify-center items-center text-gray-600">
            QUESTION COUNT
          </p>
          <p className="w-[10%] h-full text-xl flex items-center text-gray-600">
            ACTION
          </p>
        </div>

        <div className="w-[95%] items-center 3xl:min-h-[90%] 2xl:min-h-[85%] rounded-bl-xl rounded-br-xl bg-white flex flex-col border border-gray-300 overflow-y-scroll">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <Spinner />
            </div>
          ) : (
            <>
              {sortedPackages.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                  No questions available
                </div>
              ) : (
                sortedPackages.map((pack) => (
                  <QuestionPackage
                    key={pack._id}
                    data={pack}
                    onCheckboxChange={handleCheckboxChange}
                    selected={selectedPackages.includes(pack._id)}
                    currentStep={currentStep}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>

      {isDeletePopupOpen && (
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          error={error}
        />
      )}
      {isAddPopupOpen && <AddQuestionPackagePopup onClose={closeAddPopup} />}
      {isManageInformationPopupOpen && (
        <ManageInformationPopup
          onClose={closeManageInformationPopup}
          isOpen={isManageInformationPopupOpen}
          showQuestionPackage={sortedPackages.length === 0}
        />
      )}
    </div>
  );
};

export default ManageQuestionPackage;
