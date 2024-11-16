import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useVideoCollectionsStore from "../store/applications.store";
import useInterviewStore from "../store/interview.store";
import useVideoStore from "../store/video.store";
import Button from "../components/Buttons/Button";
import dateConverter from "../utils/dateConverter";
import Spinner from "../components/Spinner";

const InterviewCandidateVideoCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    notes,
    selectedApplication,
    fetchApplicationById,
    updateApplication,
    addNoteToApplication,
  } = useVideoCollectionsStore();
  const { interview, fetchInterviewById } = useInterviewStore();
  const { video, videoLoading, fetchVideoById } = useVideoStore();
  const [status, setStatus] = useState("Waiting");
  const [note, setNote] = useState(""); // Notları tutmak için state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeTab, setActiveTab] = useState("info"); // Aktif sekme state

  useEffect(() => {
    try {
      fetchApplicationById(id);
    } catch (err) {
      console.log("Error: ", err);
      setError("Data could not be loaded");
    } finally {
      setLoading(false); // Loading completed
    }
  }, [fetchApplicationById, id]);

  useEffect(() => {
    if (selectedApplication) {
      fetchInterviewById(selectedApplication.interviewId);
      setStatus(selectedApplication.status);

      if (selectedApplication.videoUrl !== "non-recorded") {
        fetchVideoById(selectedApplication.videoUrl);
      }
    }
  }, [selectedApplication, fetchInterviewById, fetchVideoById]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    updateApplication(selectedApplication._id, {
      status: newStatus,
    });
  };

  const handleSaveNotes = () => {
    if (note.trim() === "") return; // Boş not eklenemez
    addNoteToApplication(selectedApplication._id, note);
    setNote(""); // Notu temizle
  };

  const handleClose = () => {
    navigate(-1); // Geri sayfaya dön
  };

  if (loading) return <Spinner />; // Show loading spinner
  if (error) return <div>{error}</div>; // Display error message

  return (
    <div className="w-full h-full flex flex-col bg-açıkrtw">
      <div className="w-full  max-h-20 min-h-20 bg-white flex justify-between items-center">
        <h1 className="text-2xl font-bold ml-10">Candidate Video Collection</h1>
        <button
          onClick={handleClose}
          className="absolute top-[90px] right-[60px] text-gray-700 hover:text-red-500"
        >
          <i className="fas fa-times text-2xl hover:text-red-500 cursor-pointer hover:scale-125" />
        </button>
      </div>
      <div className="w-full items-center h-[95%] bg-white flex flex-col">
        <div className="w-[95%] h-[98%] rounded-xl bg-açıkrtw items-center">
          <div className="relative flex w-[98%] h-[98%]">
            {/* Sol Kısım: Video */}
            <div className="w-3/5 flex flex-col h-full p-4">
              <>
                <h1 className="text-xl font-bold mb-3 ml-3">
                  {selectedApplication?.firstName}{" "}
                  {selectedApplication?.lastName}
                </h1>
                <div className="relative w-full h-full rounded-xl bg-white">
                  {videoLoading ? (
                    <Spinner />
                  ) : selectedApplication?.videoUrl === "non-recorded" ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl">
                      <p className="text-xl font-semibold text-gray-700">
                        There is no recorded video.
                      </p>
                    </div>
                  ) : (
                    <video
                      src={video?.url?.replace(
                        "http://tkk04oksokwwgwswgg84cg4w.5.253.143.162.sslip.io",
                        ""
                      )}
                      controls
                      className="absolute inset-0 w-full h-full rounded-xl object-cover"
                    ></video>
                  )}
                </div>
              </>
              <div className="flex justify-between items-center w-full mt-4">
                <div className="flex items-center space-x-4">
                  <Button
                    click={() => handleStatusChange("Rejected")}
                    className={`py-2 px-4 w-32 rounded justify-center items-center flex ${
                      status === "Rejected"
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    Rejected
                  </Button>
                  <Button
                    click={() => handleStatusChange("Waiting")}
                    className={`py-2 px-4 w-32 rounded justify-center items-center flex ${
                      status === "Waiting"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    Waiting
                  </Button>
                  <Button
                    click={() => handleStatusChange("Accepted")}
                    className={`py-2 px-4 w-32 rounded justify-center items-center flex ${
                      status === "Accepted"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    Accepted
                  </Button>
                </div>
              </div>
            </div>
            {/* Sağ Kısım: Aday Bilgileri, Sorular ve Notlar */}
            <div className="w-2/5 h-[87%] flex flex-col bg-white p-4 mt-[3.9%] rounded-xl">
              <div className="flex justify-between mb-4 ">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`w-80 px-4 py-2 text-2xl ${
                    activeTab === "info"
                      ? "text-rtw border-b border-rtw border-2-b"
                      : "bg-white text-gray-400"
                  }`}
                >
                  Candidate Information
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`w-80 px-4 py-2 text-2xl ${
                    activeTab === "notes"
                      ? "text-rtw border-b border-rtw border-2-b"
                      : "bg-white text-gray-400"
                  }`}
                >
                  Notes
                </button>
              </div>
              {activeTab === "info" && (
                <>
                  <div className="h-[20%] w-full">
                    <div className="text-xl font-bold text-center border-b border-b-gray-300">
                      Candidate Information
                    </div>
                    <div className="flex justify-between mt-4 bg-açıkrtw p-2 rounded-xl">
                      <div className="flex flex-col">
                        <span className="font-semibold">Email :</span>
                        <span>{selectedApplication?.email}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Phone no :</span>
                        <span>{selectedApplication?.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[100%] w-full overflow-y-auto">
                    <div className="text-xl font-bold text-center border-b border-b-gray-300 sticky top-0 bg-white">
                      Questions
                    </div>
                    <div className="flex justify-between mt-4">
                      <div className="w-full overflow-y-auto h-full">
                        <ul className="list-none list-inside">
                          {interview?.packages.map((pkg) => (
                            <li key={pkg._id} className="mb-2">
                              <h2 className="font-semibold">
                                Paket Adı: {pkg.title}
                              </h2>
                              {pkg.questions.map((question, index) => (
                                <div
                                  className="mt-2 bg-açıkrtw p-2 rounded-xl"
                                  key={question._id}
                                >
                                  <p>
                                    {index + 1}- {question.questionText}
                                  </p>
                                </div>
                              ))}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "notes" && (
                <>
                  <div className="h-[10%] w-full">
                    <h1 className="text-xl font-bold">Notes</h1>
                  </div>
                  <div className="h-[60%] w-full overflow-y-auto">
                    {notes && notes.length > 0 ? (
                      notes.map((note, index) => (
                        <div key={index} className="mb-4">
                          <p className="text-sm text-gray-500">
                            {dateConverter(note.createdAt)}
                          </p>
                          <p>{note.note}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No notes added yet.</p>
                    )}
                  </div>
                  <div className="h-[20%] w-full">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full h-full p-4 border border-gray-300 rounded resize-none"
                      placeholder="Note..."
                      rows="10"
                    />
                  </div>
                  <Button
                    click={handleSaveNotes}
                    className="bg-rtw hover:bg-hoverrtw text-white py-2 px-4 rounded mt-2"
                  >
                    Add
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCandidateVideoCollection;
