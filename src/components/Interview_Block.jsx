import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import useInterviewStore from "../store/interview.store";
import Button from "../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { CreateInterview } from "../components/popups/CreateInterviewPopup";
import ReactTooltip from "react-tooltip";

const InterviewBlock = ({ data }) => {
  const navigate = useNavigate();
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { deleteInterview, updateInterview } = useInterviewStore();
  const [currentStep, setCurrentStep] = useState(0);

  // Create a ref for the info popup
  const infoPopupRef = useRef(null);

  const copyLink = () => {
    const text = `${window.location.origin}/interview/${data.title}`;
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard");
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const toggleActiveStatus = async () => {
    console.log("Toggle active status");
    try {
      await updateInterview(data._id, { isActive: !data.isActive });
    } catch (error) {
      console.error("Error updating interview:", error);
    }
  };

  const toggleInfoPopup = () => {
    setIsInfoPopupOpen((prev) => !prev);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  // Handle clicks outside the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        infoPopupRef.current &&
        !infoPopupRef.current.contains(event.target)
      ) {
        setIsInfoPopupOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-[100%] bg-white h-[400px] 2xl:h-[350px] rounded-xl p-4 shadow-sm shadow-gray-500 ml-2 mr-2 hover:cursor-pointer relative border-t-4 ${
        data.isActive ? "border-green-500" : "border-red-500"
      }`}
    >
      {/* Üst ikonlar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <div
            id="info-icon-btn"
            style={{
              zIndex: currentStep === 1 ? 100 : 0,
              position: "relative",
            }}
          >
            <button
              data-tip="Interview Info"
              className="text-black mx-2"
              onClick={toggleInfoPopup}
            >
              <i className="fas fa-info-circle hover:text-gray-800"></i>
            </button>
          </div>

          <div
            id="edit-icon-btn"
            style={{
              zIndex: currentStep === 2 ? 100 : 0,
              position: "relative",
            }}
          >
            <ReactTooltip place="top" type="dark" effect="solid" />
            <button
              className="text-gray-500 mx-2"
              onClick={() => setIsEditPopupOpen(true)}
            >
              <i className="fa-solid fa-pen-to-square text-black"></i>
            </button>
          </div>
        </div>

        <div className="flex space-x-2">
          <div
            id="link-icon-btn"
            style={{
              zIndex: currentStep === 3 ? 100 : 0,
              position: "relative",
            }}
          >
            <button
              className={`text-blue-500 ${
                isLinkCopied ? "text-green-500" : ""
              }`}
              onClick={copyLink}
            >
              <i
                className={`fas ${
                  isLinkCopied
                    ? "fa-check animate-bounce"
                    : "fa-link hover:text-blue-500"
                }`}
              ></i>
            </button>
          </div>

          <div
            id="delete-icon-btn"
            style={{
              zIndex: currentStep === 4 ? 100 : 0,
              position: "relative",
            }}
          >
            <button
              className="text-gray-500"
              onClick={() => deleteInterview(data._id)}
            >
              <i className="fas fa-trash-alt text-red-500 hover:text-red-800"></i>
            </button>
          </div>
        </div>
      </div>

      {data.title && (
        <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
      )}

      {data.packages && (
        <p className="text-gray-600 mb-2">
          Packages: {data.packages.map((pkg) => pkg.title).join(", ")}
        </p>
      )}

      {/* içerik popupı */}
      <CSSTransition
        in={isInfoPopupOpen}
        timeout={700}
        classNames="popup"
        unmountOnExit
      >
        <div
          ref={infoPopupRef}
          className="fixed inset-0  flex justify-end items-center h-full z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[30%] h-auto max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rtw scrollbar-track-açıkrtw relative">
            {/* Styled Close Button */}
            <button
              className="absolute top-2 right-2 w-8 h-8 bg-gray-200 text-black rounded-full shadow-md hover:bg-gray-300 transition duration-200 flex justify-center items-center "
              onClick={toggleInfoPopup}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="shadow-xl bg-hoverrtw rounded-t-lg top-0 w-full h-20 flex justify-center items-center text-3xl font-bold text-white">
              Interview Details
            </div>

            <div className="mt-4 p-4 text-gray-600 text-lg font-bold">
              Name:
              <div>{data.title}</div>
            </div>

            <div className="mt-4 p-4 text-gray-600 text-lg font-bold">
              Expire Date:
              <div>{data.expireDate.split("T")[0]}</div>
            </div>

            <div className="mt-4 p-4 text-gray-600 text-lg font-bold">
              Question Skippable:
              <div>{data.canSkip ? "Yes" : "No"}</div>
            </div>

            <div className="mt-4 p-4 text-gray-600 text-lg font-bold">
              Questions Showed at Once:
              <div>{data.showAtOnce ? "Yes" : "No"}</div>
            </div>
            <div className="mt-4 p-4 text-gray-600 text-lg font-bold">
              Question Count:
              <div>
                {data.packages.reduce(
                  (total, pkg) => total + pkg.questions.length,
                  0
                )}
              </div>
            </div>
            <div>
              <div className="mt-4 p-4 text-gray-600 text-lg font-bold">
                Including Questions:
                <ul className="list-disc list-inside text-gray-600">
                  {data.packages.map((pkg) =>
                    pkg.questions.map((question) => (
                      <li key={question.questionText}>
                        {question.questionText} -{" "}
                        {formatTime(question.questionTime)}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>

      {/* Fixed "Candidates" and "View Videos" sections */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white">
        {/* Adaylar */}
        <p className="text-gray-600 mb-2 text-center">Candidates</p>
        <div className="w-full h-[70px] bg-gray-100  rounded-xl flex items-center justify-around p-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-600">TOTAL</p>
            <p className="text-2xl font-bold text-gray-800">
              {data.applyCount}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-600">WAITING</p>
            <p className="text-2xl font-bold text-gray-800">
              {data.waitingCount}
            </p>
          </div>
        </div>

        {/* Alt kısım */}
        <div className="flex justify-between items-center mt-6 rounded-xl">
          <Button click={toggleActiveStatus}>
            {data.isActive ? (
              <>
                <i className="fas fa-globe text-green-500 mr-2"></i>
                <span className="text-green-500">Active</span>
              </>
            ) : (
              <>
                <i className="fas fa-globe text-red-500 mr-2"></i>
                <span className="text-red-500">Inactive</span>
              </>
            )}
          </Button>
          <div
            id="view-videos-btn"
            style={{
              zIndex: currentStep === 5 ? 100 : 0,
              position: "relative",
            }}
          >
            <Button
              children={"View Videos"}
              className={"text-hoverrtw hover:text-rtw text-sm font-semibold w-80"}
              click={() =>
                navigate(`/admin/interview/video-collection/${data._id}`)
              }
            ></Button>
          </div>
        </div>
      </div>

      {/* Popup bileşeni */}
      {isEditPopupOpen && (
        <CreateInterview onClose={closeEditPopup} data={data} />
      )}
    </div>
  );
};

export default InterviewBlock;
