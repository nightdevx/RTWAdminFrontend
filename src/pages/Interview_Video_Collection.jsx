import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VideoCollection from "../components/Video_Collection";
import useApplicationsStore from "../store/applications.store";
import { FaSearch, FaFilter } from "react-icons/fa"; // Search and Filter icons
import useInterviewStore from "../store/interview.store";
import useVideoStore from "../store/video.store";
import Spinner from "../components/Spinner";

const InterviewVideoCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, applications, fetchApplications } = useApplicationsStore();
  const { videos, fetchVideosByIds } = useVideoStore();
  const [selectedButton, setSelectedButton] = useState("/admin/interview/list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const { interview, fetchInterviewById } = useInterviewStore();

  useEffect(() => {
    fetchApplications(id);
    fetchInterviewById(id);
  }, [id, fetchApplications, fetchInterviewById]);

  useEffect(() => {
    if (applications.length > 0) {
      const ids = applications.map((application) => application.videoUrl);
      fetchVideosByIds(ids);
    }
  }, [applications, fetchVideosByIds]);

  const handleNavigateButtonClick = (path) => {
    setSelectedButton(path);
    navigate(path);
  };

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" || application.status === filterBy;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full h-full flex flex-col bg-gray-200">
      <div className="w-full min-h-20 bg-açıkrtw flex justify-between items-center">
        <h1 className="text-2xl font-bold ml-10">
          {interview?.title} Interview Video Collection
        </h1>
        <div className="flex items-center mr-10">
          <div className="relative mr-5">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg w-80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hoverrtw border border-gray-300 shadow-xl"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-gray-300 bg-white rounded-lg w-40 px-2 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-hoverrtw shadow-xl"
            >
              <option value="all">All</option>
              <option value="Waiting">Waiting</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="w-full min-h-[93%] bg-açıkrtw flex flex-col items-center">
        <div className="w-[95%] min-h-[60px] bg-white rounded-tl-xl rounded-tr-xl flex border border-gray-300 font-bold">
          <p className="w-full h-full text-xl flex justify-center items-center font-bold text-gray-600">
            VIDEO COLLECTION
          </p>
        </div>
        <div className="w-[95%] 3xl:min-h-[90%] 2xl:min-h-[85%] rounded-bl-xl rounded-br-xl bg-white flex flex-wrap overflow-y-scroll border border-gray-300 gap-5">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : filteredApplications.length > 0 && videos ? (
            filteredApplications.map((videoCollection, index) => (
              <VideoCollection
                key={index}
                data={videoCollection}
                video={videos[index]}
              />
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              No video available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewVideoCollection;
