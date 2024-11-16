import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { FaUsersCog, FaListAlt, FaSignOutAlt, FaUsers } from "react-icons/fa";
import useUserStore from "../store/user.store";
import imgRemoteTechLogo from "../assets/images/remote-tech-logo.png";
import useMenuStore from "../store/menu.store";
import HeaderPage from "../components/HeaderPage";
import InterviewInformationPopup from "../components/popups/InterviewInformationPopup";
import ManageInformationPopup from "../components/popups/ManageInformationPopup";
import imgArrowLeft from "../assets/images/sidebaraçık.svg";
import imgArrowRight from "../assets/images/sidebarkapalı.svg";

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useUserStore();
  const { isMenuCollapsed, toggleMenu } = useMenuStore();
  const [user, setUser] = useState(null);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("/admin/packages");
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("packages");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    setSelectedButton(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const handleButtonClick = (path) => {
    setSelectedButton(path);
    navigate(path);
  };

  const openPopup = () => {
    if (location.pathname.includes("packages")) {
      setIsInfoPopupOpen(true);
    } else if (location.pathname.includes("interview")) {
      setIsInfoPopupOpen(true);
    }
  };

  return (
    <div className="w-full h-screen bg-[#f8f9fa] flex">
      <div
        className={`transition-all duration-300 p-4 ${
          isMenuCollapsed ? "w-20" : "w-[15%]"
        } h-full bg-white flex flex-col justify-start items-center relative`}
      >
        <div
          className="w-full flex justify-center items-center mb-8 transition-all duration-300"
          style={{ marginTop: isMenuCollapsed ? "3rem" : "0" }}
        >
          <img
            src={imgRemoteTechLogo}
            alt="Logo"
            className={`transition-all duration-300 3xl:mt-20 ${
              isMenuCollapsed ? "w-14 h-14" : "w-32 h-32"
            }`}
          />
        </div>

        <div className="w-full h-full flex flex-col items-center justify-start">
          {localStorage.getItem("isMaster") === "true" && (
            <div
              className={`flex items-center w-full h-16 cursor-pointer px-4 py-2 rounded-2xl bg-rtw ${
                selectedButton === "/admin/users"
                  ? "text-white"
                  : "hover:bg-hoverrtw text-white"
              } ${isMenuCollapsed ? "mt-50" : ""}`}
              onClick={() => handleButtonClick("/master/users")}
            >
              {isMenuCollapsed ? (
                <FaUsers className="text-2xl text-white" />
              ) : (
                <span className="font-medium justify-center items-center flex">
                  <FaUsers className="text-xl text-white" />
                  &nbsp; Users Information
                </span>
              )}
            </div>
          )}
          <div className="h-1"></div>
          <div
            id="manage-questions-btn"
            className={`flex items-center w-full h-16 cursor-pointer px-4 py-2 rounded-2xl bg-rtw ${
              selectedButton === "/admin/packages"
                ? "text-white"
                : "hover:bg-hoverrtw text-white"
            } ${isMenuCollapsed ? "mt-50" : ""}`}
            onClick={() => handleButtonClick("/admin/packages")}
            style={{
              zIndex: currentStep === 0 ? 100 : 0,
              position: "relative",
            }}
          >
            {isMenuCollapsed ? (
              <FaListAlt className="text-2xl text-white" />
            ) : (
              <span className="font-medium justify-center items-center flex">
                <FaListAlt className="text-xl text-white" />
                &nbsp; Manage Questions
              </span>
            )}
          </div>

          <div className="h-1"></div>
          <div
            id="interview-list-btn"
            className={`flex items-center w-full h-16 cursor-pointer px-4 py-2 rounded-2xl bg-rtw ${
              selectedButton === "/admin/interview/list"
                ? "bg-hoverrtw text-white"
                : "hover:bg-hoverrtw text-white"
            }`}
            onClick={() => handleButtonClick("/admin/interview/list")}
            style={{
              zIndex: currentStep === 1 ? 100 : 0,
              position: "relative",
            }}
          >
            {isMenuCollapsed ? (
              <FaUsersCog className="text-2xl text-red" />
            ) : (
              <span className="font-medium justify-center items-center flex">
                <FaUsersCog className="text-xl text-white" />
                &nbsp; Interview List
              </span>
            )}
          </div>
          <div className="h-1"></div>
          <div
            id="manage-mails-btn"
            className={`flex items-center w-full h-16 cursor-pointer px-4 py-2 rounded-2xl bg-rtw ${
              selectedButton === "/admin/manage-mails"
                ? "text-white"
                : "hover:bg-hoverrtw text-white"
            } ${isMenuCollapsed ? "mt-50" : ""}`}
            onClick={() => handleButtonClick("/admin/manage-mails")}
            style={{
              zIndex: currentStep === 3 ? 100 : 0,
              position: "relative",
            }}
          >
            {isMenuCollapsed ? (
              <FaUsers className="text-2xl text-white" />
            ) : (
              <span className="font-medium justify-center items-center flex">
                <FaUsers className="text-xl text-white" />
                &nbsp; Manage Mails
              </span>
            )}
          </div>

          <div className="w-full flex-grow"></div>

          <div className="w-full flex items-center justify-center mt-auto">
            <div
              className={`flex flex-col w-full p-6 rounded-xl transition-all duration-300${
                isMenuCollapsed
                  ? "h-20 bg-rtw items-center justify-center"
                  : "h-40 bg-hoverrtw border border-gray-300 shadow-md"
              }`}
            >
              {isMenuCollapsed ? (
                <FaSignOutAlt
                  className="text-xl cursor-pointer text-white hover:text-red-600"
                  onClick={() => handleButtonClick("/admin-login")}
                />
              ) : (
                <>
                  <div className="text-lg font-medium text-white">
                    {user?.username}
                  </div>
                  <div className="text-lg text-white">Administrator</div>
                  <button
                    className="hover:text-red-600"
                    onClick={() => {
                      logout();
                      navigate("/admin-login");
                    }}
                  >
                    <div className="flex items-center mt-4">
                      <FaSignOutAlt className="text-2xl mr-2 text-white" />
                      <span className="text-lg font-medium text-white">
                        Log Out
                      </span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          isMenuCollapsed ? "w-[calc(100%-5rem)]" : "w-[85%]"
        } h-full flex flex-col justify-center items-center transition-all duration-300 overflow-y-hidden`}
      >
        <HeaderPage
          isMenuCollapsed={isMenuCollapsed}
          toggleMenu={toggleMenu}
          setIsInfoPopupOpen={setIsInfoPopupOpen}
          imgArrowRight={imgArrowRight}
          imgArrowLeft={imgArrowLeft}
          openPopup={openPopup} // openPopup fonksiyonunu HeaderPage'e ilet
        />

        <Outlet />

        {isInfoPopupOpen && location.pathname.includes("packages") && (
          <ManageInformationPopup
            isOpen={isInfoPopupOpen}
            onClose={() => setIsInfoPopupOpen(false)}
          />
        )}

        {isInfoPopupOpen && location.pathname.includes("interview") && (
          <InterviewInformationPopup
            isOpen={isInfoPopupOpen}
            onClose={() => setIsInfoPopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
