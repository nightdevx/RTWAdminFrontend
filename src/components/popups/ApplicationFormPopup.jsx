import { useState } from "react";
import useApplicationsStore from "../../store/applications.store";
import useMailPackageStore from "../../store/mail-package.store";
import Inputs from "../Inputs/Inputs";

export const ApplicationFormPopup = ({ onClose, id, setApplicationId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isKVKKApproved, setIsKVKKApproved] = useState(false);
  const [errors, setErrors] = useState({});
  const { addApplication } = useApplicationsStore();
  const { getMailData, markInterviewAsDone } = useMailPackageStore();

  const handleSubmit = async () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Invalid phone number format.";
    }
    if (!isKVKKApproved)
      newErrors.isKVKKApproved = "KVKK approval is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed if there are no errors
    const mailData = await getMailData(id, email);
    if (mailData === null) {
      alert(
        "No information for the entered email. Contact HR if this is an error."
      );
      return;
    }

    if (mailData.interviewStatus === "done") {
      alert("You have already applied for this interview!");
      return;
    }

    markInterviewAsDone(id, email);
    const application = {
      firstName,
      lastName,
      email,
      phone,
      isKVKKApproved,
      videoUrl: "non-recorded",
      interviewId: id,
      status: "Waiting",
    };
    const applicationId = addApplication(application).then((response) => {
      onClose();
      return response;
    });
    setApplicationId(applicationId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white max-md:w-full max-md:h-full w-[30%] rounded-lg shadow-lg relative">
        <div className="bg-rtw text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Personal Information Form</h2>
        </div>
        <div className="p-8">
          <Inputs
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
          />
          <Inputs
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
          />
          <Inputs
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Inputs
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
          />
          <div className="mb-4">
            <label className="flex items-center md:text-base text-sm">
              <input
                type="checkbox"
                checked={isKVKKApproved}
                onChange={() => setIsKVKKApproved(!isKVKKApproved)}
                className="mr-2"
              />
              I have read and approved the{" "}
              <a href="#" className="text-blue-600">
                KVKK text
              </a>
              .
            </label>
            {errors.isKVKKApproved && (
              <p className="text-red-500 text-sm">{errors.isKVKKApproved}</p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-rtw text-white rounded hover:bg-hoverrtw duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFormPopup;
