import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import useQuestionPackageStore from "../../store/questionpackages.store";
import useInterviewStore from "../../store/interview.store";
import DropdownBox from "../DropdownBox";

export const CreateInterview = ({ onClose, data }) => {
  const [title, setTitle] = useState("");
  const [packages, setPackages] = useState([]);
  const [expireDate, setExpireDate] = useState("");
  const [canSkip, setCanSkip] = useState(false);
  const [showAtOnce, setShowAtOnce] = useState(false);
  const [errors, setErrors] = useState({});
  const { createInterview, updateInterview, interviews } = useInterviewStore();
  const { questionPackages, getQuestionPackages } = useQuestionPackageStore();

  useEffect(() => {
    getQuestionPackages();
  }, [getQuestionPackages]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setTitle(data.title);
      setPackages(data.packages);
      setExpireDate(data.expireDate);
      setCanSkip(data.canSkip);
      setShowAtOnce(data.showAtOnce);
    }
  }, [data]);

  const handleAddOrUpdatePackage = async () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!expireDate) newErrors.expireDate = "Expire date is required.";
    if (packages.length === 0)
      newErrors.packages = "At least one package is required.";

    const isDuplicateTitle = interviews.some(
      (interview) =>
        interview.title === title && (!data || interview._id !== data._id)
    );
    if (isDuplicateTitle) newErrors.title = "Title already exists.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const interviewData = {
      title,
      packages: packages.map((pack) => pack._id),
      expireDate,
      canSkip,
      showAtOnce,
      applyCount: 0,
      waitingCount: 0,
    };

    try {
      if (data) {
        await updateInterview(data._id, interviewData);
      } else {
        await createInterview(interviewData);
      }
      onClose();
    } catch (error) {
      console.error("Error creating interview:", error);
      alert(
        "An error occurred while creating the interview. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white w-[30%] rounded-lg shadow-lg relative">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-rtw text-white p-4 rounded-t-lg">
          {data ? (
            <h1 className="text-3xl font-bold">Update Interview</h1>
          ) : (
            <h1 className="text-3xl font-bold">Create Interview</h1>
          )}
          <button
            onClick={onClose}
            className="text-white text-xl font-bold hover:text-red-500"
          >
            X
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <input
            type="text"
            placeholder="Interview Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-hoverrtw"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
          <div className="mb-4 mt-4 w-full">
            <DropdownBox
              options={questionPackages}
              onSelect={setPackages}
              selected={packages}
            />
            {errors.packages && (
              <p className="text-red-500 text-sm">{errors.packages}</p>
            )}
          </div>
          <input
            type="date"
            min={
              new Date(new Date().setDate(new Date().getDate() + 3))
                .toISOString()
                .split("T")[0]
            }
            value={expireDate ? expireDate.split("T")[0] : ""}
            onChange={(e) => {
              const year = e.target.value.split("-")[0];
              if (year.length <= 4) {
                setExpireDate(e.target.value);
              }
            }}
            className="border p-2 rounded w-full"
          />
          {errors.expireDate && (
            <p className="text-red-500 text-sm">{errors.expireDate}</p>
          )}
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={() => {
                setCanSkip(!canSkip);
                if (!canSkip) setShowAtOnce(false);
              }}
              className={`px-4 py-2 rounded ${
                canSkip
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              Can Skip
            </button>
            <button
              onClick={() => {
                setShowAtOnce(!showAtOnce);
                if (!showAtOnce) setCanSkip(false);
              }}
              className={`px-4 py-2 rounded ${
                showAtOnce
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              Show All At Once
            </button>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              click={handleAddOrUpdatePackage}
              className="bg-rtw hover:bg-hoverrtw text-white p-2 rounded "
            >
              {data ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterview;
