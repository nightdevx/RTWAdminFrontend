import Button from "../Buttons/Button";
import Inputs from "../Inputs/Inputs";
const SettingPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white w-[30%] rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center bg-rtw text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Kullanıcı Oluştur</h2>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold hover:text-red-500"
          >
            X
          </button>
        </div>

        <div className="p-6">
          <Inputs placeholder="Mail" type="text" />
          <Inputs placeholder="" type="text" />
          <div className="flex justify-end">
            <Button className="bg-rtw text-white rounded-lg px-4 py-2 hover:bg-hoverrtw duration-300">
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPopup;
