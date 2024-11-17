import { useLocation } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

const HeaderPage = ({
  isMenuCollapsed,
  toggleMenu,
  setIsInfoPopupOpen,
  imgArrowRight,
  imgArrowLeft,
  openPopup, // Yeni prop
}) => {
  const location = useLocation();

  // URL yoluna göre başlığı belirle
  const pageTitle = location.pathname.includes("/packages/questions/")
    ? "Edit Page"
    : location.pathname.includes("packages")
    ? "Manage Questions"
    : location.pathname.includes("interview")
    ? "Interview List"
    : location.pathname.includes("users")
    ? "Users"
    : location.pathname.includes("manage-mails")
    ? "Manage Mails"
    : "Dashboard";

  return (
    <div className="w-full min-h-[8%] max-h-[8%] bg-white items-center flex sticky top-0 z-10">
      {isMenuCollapsed ? (
        <img
          src={imgArrowRight}
          alt="Toggle Menu"
          className="ml-10 w-10 h-10 cursor-pointer"
          onClick={toggleMenu}
        />
      ) : (
        <img
          src={imgArrowLeft}
          alt="Toggle Menu"
          className="ml-10 w-10 h-10 cursor-pointer"
          onClick={toggleMenu}
        />
      )}
      <h1 className="ml-10">Admin Page / {pageTitle}</h1>

      <div className="ml-auto mr-10">
        <button
          className="bg-transparent text-rtw hover:text-hoverrtw rounded-xl flex items-center"
          onClick={openPopup} // openPopup fonksiyonunu çağır
        >
          <FaInfoCircle className="mr-2 text-4xl" />
          Info
        </button>
      </div>
    </div>
  );
};

export default HeaderPage;
