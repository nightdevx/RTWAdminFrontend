import { useState, useEffect } from "react";
import { FaCogs, FaSearch } from "react-icons/fa";
import InterviewBlockUsers from "../components/Interview_Block_Users";
import useMailPackageStore from "../store/mail-package.store";
import AdminName from "../components/Admin_Name";
import SettingPopup from "../components/popups/Setting_Popup";

const ManageMailsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchAllMailPackages, mailPackages } = useMailPackageStore();
  const [isSettingPopupOpen, setIsSettingPopupOpen] = useState(false);
  useEffect(() => {
    fetchAllMailPackages();
  }, [fetchAllMailPackages]);

  const closeSettingPopup = () => setIsSettingPopupOpen(false);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full min-h-20 bg-açıkrtw flex justify-between items-center">
        <AdminName />
        <div className="flex gap-4">
          <div className="relative mr-10">
            <input
              type="text"
              placeholder="Search Interview Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg w-80 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-hoverrtw border border-gray-300 shadow-xl"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="w-full items-center min-h-[92%] max-h-[92%] bg-[#eefaf9] flex flex-col">
        <div className="w-[95%] min-h-[60px] bg-white rounded-tl-xl rounded-tr-xl flex border border-gray-300 font-bold">
          <p className="w-full h-full text-xl flex justify-center items-center font-bold text-gray-600">
            INTERVIEW NAME
          </p>
          <button
            type="button"
            onClick={() => setIsSettingPopupOpen(true)}
            className="right-10 mt-3 mr-3 absolute"
          >
            <FaCogs className="w-8 h-8 text-xl flex justify-center items-center text-gray-600" />
          </button>
        </div>

        <div className="w-[95%] 3xl:min-h-[90%] 2xl:min-h-[85%] rounded-bl-xl rounded-br-xl bg-white flex flex-grid border border-gray-300 overflow-y-scroll p-2">
          {mailPackages?.map((mailPackage) => (
            <InterviewBlockUsers key={mailPackage._id} data={mailPackage} />
          ))}
        </div>
      </div>
      {isSettingPopupOpen && <SettingPopup onClose={closeSettingPopup} />}
    </div>
  );
};

export default ManageMailsPage;
