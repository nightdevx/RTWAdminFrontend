import { useEffect, useState, useMemo } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import Button from "../components/Buttons/Button";
import InterviewBlock from "../components/Interview_Block";
import { CreateInterview } from "../components/popups/CreateInterviewPopup";
import useInterviewStore from "../store/interview.store";
import Spinner from "../components/Spinner";
import InterviewInformationPopup from "../components/popups/InterviewInformationPopup";
import AdminName from "../components/Admin_Name";

const InterviewList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [
    setInterviewInformationPopupOpen,
    setIsInterviewInfoInformationPopupOpen,
  ] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const { interviews, error, loading, fetchInterviews } = useInterviewStore();

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  const closePopup = () => setIsPopupOpen(false);
  const closeInfoPopup = () => setIsInterviewInfoInformationPopupOpen(false);

  const filteredInterviews = useMemo(
    () =>
      interviews.filter((interview) =>
        interview.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
      ),
    [interviews, searchTerm]
  );

  const sortedInterviews = useMemo(
    () =>
      [...filteredInterviews].sort((a, b) => {
        if (sortBy === "active")
          return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
        if (sortBy === "inactive") return a.isActive === b.isActive ? 1 : -1;
        if (sortBy === "date")
          return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      }),
    [filteredInterviews, sortBy]
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full min-h-20 bg-[#eefaf9] flex justify-between items-center ">
        <AdminName />
        <div className="flex gap-4">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search Interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hoverrtw border border-gray-300 shadow-xl"
              aria-label="Search Interviews"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative w-60">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 bg-white rounded-lg w-full px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-hoverrtw shadow-xl"
              aria-label="Sort Interviews"
            >
              <option value="default">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="date">Date (Newest First)</option>
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            click={() => setIsPopupOpen(true)}
            className="text-white w-60 mr-10 bg-rtw hover:bg-hoverrtw font-bold rounded-xl shadow-xl"
          >
            + Create Interview
          </Button>
        </div>
      </div>

      {/* Interview List Section */}
      <div className="w-full items-center h-[95%] flex flex-col bg-açıkrtw">
        <div className="w-[95%] min-h-[60px] bg-white rounded-tl-xl rounded-tr-xl flex border border-gray-300 font-bold">
          <p className="w-full h-full text-xl flex justify-center items-center font-bold text-gray-600">
            INTERVIEWS
          </p>
        </div>

        <div className="w-[95%] 3xl:min-h-[91%] 2xl:min-h-[89%] rounded-bl-xl rounded-br-xl bg-white flex flex-wrap overflow-y-scroll border border-gray-300 p-4">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : error ? (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="text-2xl font-bold text-red-500">{error}</h1>
            </div>
          ) : sortedInterviews.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center text-gray-500">
              <h1 className="text-2xl font-bold">No interviews found</h1>
            </div>
          ) : (
            sortedInterviews.map((interview, index) => (
              <div
                key={index}
                className="lg:w-1/3 xl:w-1/2 2xl:w-1/3 3xl:w-1/4 p-2"
              >
                <InterviewBlock data={interview} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Popup Component */}
      {isPopupOpen && <CreateInterview onClose={closePopup} />}

      {/* Information Popup Component */}
      {setInterviewInformationPopupOpen && (
        <InterviewInformationPopup onClose={closeInfoPopup} />
      )}
    </div>
  );
};

export default InterviewList;


