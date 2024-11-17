import { useState, useEffect } from "react";
import Button from "../Buttons/Button";

const guideSteps = [
  {
    title: "Welcome to the Admin Panel! 🎉 Users Information",
    content: "This panel allows you to manage users.",
    position: { top: "41%", left: "24%", arrowPosition: "left" },
    targetId: "users-information-btn",
  },
  {
    title: "Manage Question Package",
    content: "This panel allows you to manage question packages.",
    position: { top: "41%", left: "24%", arrowPosition: "left" },
    targetId: "manage-questions-btn",
  },
  {
    title: "Interview List",
    content: "This panel allows you to manage postings.",
    position: { top: "41%", left: "24%", arrowPosition: "left" },
    targetId: "interview-list-btn",
  },
  {
    title: "Manage Mails",
    content: "This panel allows you to manage mails.",
    position: { top: "41%", left: "24%", arrowPosition: "left" },
    targetId: "manage-mails-btn",
  },
  {
    title: "Search Users",
    content: "Use the search bar to find specific users.",
    position: { top: "25%", left: "61.5%", arrowPosition: "top" },
    targetId: "search-users-btn",
  },
  {
    title: "Edit Users",
    content: "You can change the user's information.",
    position: { top: "26%", left: "77%", arrowPosition: "right" },
    targetId: "edit-users-btn",
  },
  {
    title: "Delete Users",
    content: "You can delete users.",
    position: { top: "26%", left: "77%", arrowPosition: "right" },
    targetId: "delete-users-btn",
  },
];

const MasterAdminInformationPopup = ({
  onClose,
  isOpen,
  showQuestionPackage,
}) => {
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
      guideSteps.forEach((step) => {
        const element = document.getElementById(step.targetId);
        if (element) {
          element.style.zIndex = "0"; // Tüm butonların z-index'ini sıfırla
        }
      });

      const currentElement = document.getElementById(targetId);
      if (currentElement) {
        currentElement.style.zIndex = "100"; // Sadece aktif olan butonu öne al
      }
    }
  }, [currentStep, targetId, isOpen]);

  const handleClose = () => {
    // Reset all buttons' z-index to default when the popup is closed
    guideSteps.forEach((step) => {
      const element = document.getElementById(step.targetId);
      if (element) {
        element.style.zIndex = "0";
      }
    });
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}>
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
        {showQuestionPackage && currentStep === 5 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-hoverrtw">
              Question Package
            </h3>
            <p>This is a placeholder for the Question Package component.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterAdminInformationPopup;
