import { useState } from "react";
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
    position: { top: "0%", left: "4%", arrowPosition: "left" },
  },
  {
    title: (
      <>
        Interview Edit Icon
        <i className="fa-solid fa-pen-to-square text-hoverrtw ml-2"></i>
      </>
    ),
    content: "Allows you to update Interview information.",
    position: { top: "0%", left: "4%", arrowPosition: "left" },
  },
  {
    title: "Create Interview",
    content: "Click on 'Create Interview' to add a new interview.",
    position: { top: "0%", left: "4%", arrowPosition: "left" },
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
    position: { top: "0%", left: "4%", arrowPosition: "left" },
  },

  {
    title: (
      <>
        Interview Delete Icon
        <i className="fas fa-trash-alt text-hoverrtw ml-2"></i>
      </>
    ),
    content: "You can delete the Interview with the IDelete icon",
    position: { top: "0%", left: "4%", arrowPosition: "left" },
  },
  {
    title: (
      <>
        View Videos
        <i className="fas fa-video text-hoverrtw ml-2"></i>
      </>
    ),
    content: "You can watch the interviews of the candidates with View Videos.",
    position: { top: "0%", left: "4%", arrowPosition: "left" },
  },
];

const InterviewInformationPopup = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const { title, content, position } = guideSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
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
              click={onClose}
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
