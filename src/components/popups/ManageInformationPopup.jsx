import { useState, useEffect } from "react";
import Button from "../Buttons/Button";

const guideSteps = [
  {
    title: "Welcome to the Admin Panel! 🎉 Manage Question Package",
    content: "This panel allows you to manage question packages.",
    position: { top: "31%", left: "24%", arrowPosition: "left" },
    targetId: "manage-questions-btn",
  },
  {
    title: "Interview List",
    content: "This panel allows you to manage postings.",
    position: { top: "38%", left: "24%", arrowPosition: "left" },
    targetId: "interview-list-btn",
  },
  {
    title: "Manage Mails",
    content: "This panel allows you to manage mails.",
    position: { top: "45.5%", left: "24%", arrowPosition: "left" },
    targetId: "manage-mails-btn",
  },
  {
    title: "Delete Packages",
    content: "Select packages and click here to delete them.",
    position: { top: "24%", left: "81.8%", arrowPosition: "top" },
    targetId: "delete-packages-btn",
  },
  {
    title: "Search Packages",
    content: "Use the search bar to find specific packages.",
    position: { top: "24%", left: "56.5%", arrowPosition: "top" },
    targetId: "search-packages-btn",
  },
  {
    title: "Packages Status",
    content:
      "The packages used in the ads are in In Use status and you cannot change the content of the question package. For this, you need to make the ad Inactive.",
    position: { top: "40%", left: "27%", arrowPosition: "top" },
  },
  {
    title: "Edit Packages",
    content:
      "To change and view the questions inside the question packs, you need to press the Edit button.",
    position: { top: "30%", left: "80%", arrowPosition: "right" },
  },
];

const ManageInformationPopup = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const { title, content, position, targetId } = guideSteps[currentStep];

  useEffect(() => {
    // Reset all buttons' z-index to default
    guideSteps.forEach((step) => {
      const element = document.getElementById(step.targetId);
      if (element) {
        element.style.zIndex = "1";
      }
    });

    // Set the current step's button z-index to 100
    const currentElement = document.getElementById(targetId);
    if (currentElement) {
      currentElement.style.zIndex = "100";
    }
  }, [currentStep, targetId]);

  const handleClose = () => {
    // Reset all buttons' z-index to default when the popup is closed
    guideSteps.forEach((step) => {
      const element = document.getElementById(step.targetId);
      if (element) {
        element.style.zIndex = "1";
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Background blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />

      <div
        className="fixed w-80 bg-white p-4 shadow-lg rounded-xl z-50 relative shadow-xl shadow-gray-400"
        style={{
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Arrow indicator */}
        <div
          className={`absolute w-4 h-4 bg-white transform rotate-45 ${
            position.arrowPosition === "top"
              ? "-top-2 left-1/2 -translate-x-1/2"
              : position.arrowPosition === "bottom"
              ? "-bottom-2 left-1/2 -translate-x-1/2"
              : position.arrowPosition === "left"
              ? "-left-2 top-1/2 -translate-y-1/2"
              : "-right-2 top-1/2 -translate-y-1/2"
          }`}
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <h2 className="text-lg font-bold text-hoverrtw">{title}</h2>
        <p>{content}</p>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>
            Steps {currentStep + 1} of {guideSteps.length}
          </span>
          <div className="flex">
            <Button
              click={handleClose}
              className="mr-2 text-white bg-gray-500 rounded-xl"
            >
              Skip
            </Button>

            <Button
              click={nextStep}
              className="bg-rtw text-white rounded-xl hover:bg-hoverrtw"
            >
              {currentStep < guideSteps.length - 1 ? "Next" : "Close"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInformationPopup;
