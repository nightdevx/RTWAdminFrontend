import { useState, useEffect } from "react";
import Button from "../Buttons/Button";

const guideSteps = [
  {
    title: (
      <>
        Info Icon
        <i className="fas fa-info-circle text-hoverrtw ml-2"></i>
      </>
    ),
    content:
      "To see the information inside the Interview you need to click on the information icon.",
    position: { top: "45%", left: "46%", arrowPosition: "left" },
    targetId: "info-icon-btn",
  },
  {
    title: (
      <>
        Interview Edit Icon
        <i className="fa-solid fa-pen-to-square text-hoverrtw ml-2"></i>
      </>
    ),
    content: "Allows you to update Interview information.",
    position: { top: "45%", left: "46%", arrowPosition: "left" },
    targetId: "edit-icon-btn",
  },
  {
    title: (
      <>
        Interview Link Icon
        <i className="fa fa-link text-hoverrtw ml-2"></i>
      </>
    ),
    content:
      "You create and copy an Interview link that you can send to candidates.",
    position: { top: "45%", left: "46%", arrowPosition: "left" },
    targetId: "link-icon-btn",
  },
  {
    title: (
      <>
        Interview Delete Icon
        <i className="fas fa-trash-alt text-hoverrtw ml-2"></i>
      </>
    ),
    content: "You can delete the Interview with the IDelete icon",
    position: { top: "45%", left: "46%", arrowPosition: "left" },
    targetId: "delete-icon-btn",
  },
  {
    title: (
      <>
        View Videos
        <i className="fas fa-video text-hoverrtw ml-2"></i>
      </>
    ),
    content: "You can watch the interviews of the candidates with View Videos.",
    position: { top: "45%", left: "46%", arrowPosition: "left" },
    targetId: "view-videos-btn",
  },
];

const InterviewInformationPopup = ({ onClose, isOpen }) => {
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
    if (isOpen) {
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
    }
  }, [currentStep, targetId, isOpen]);

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
    <div className={`fixed inset-0 z-50  ${isOpen ? "" : "hidden"}`}>
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

export default InterviewInformationPopup;
