import React, { useState } from "react";
import Button from "../Buttons/Button";
import useMailPackageStore from "../../store/mail-package.store";

const AddMailPopup = ({ onClose, id, mails }) => {
  const [mail, setMail] = useState("");
  const [error, setError] = useState(null);

  const { addMailsToPackage } = useMailPackageStore();

  const handleAddMail = () => {
    console.log("Mail:", mails);
    try {
      if (!mail.trim()) {
        throw new Error("Mail content cannot be empty.");
      }
      const mailDatas = mail
        .split(",")
        .map((m) => ({
          mail: m.trim(),
          mailStatus: "not-sended",
          interviewStatus: "not-done",
        }));

      const existingMails = mails.map((m) => m.mail);
      const newMails = mailDatas.filter((m) => !existingMails.includes(m.mail));
      const duplicateMails = mailDatas.filter((m) =>
        existingMails.includes(m.mail)
      );
      var errMessage = "";
      if (duplicateMails.length > 0) {
        errMessage = `The following mails already exist: ${duplicateMails
          .map((m) => m.mail)
          .join(", ")}`;
      }

      if (newMails.length > 0) {
        if (errMessage !== "") {
          errMessage += `\n Other mails added successfully.`;
        }
        addMailsToPackage(id, { mails: newMails });
        console.log("Mail Content:", newMails);
      }

      if (errMessage !== "") {
        setError(errMessage);
      }

      if (duplicateMails.length === 0) {
        onClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white w-[30%] rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center bg-rtw text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Kullanıcı Oluştur</h2>
          <button onClick={onClose} className="text-white font-bold">
            X
          </button>
        </div>

        <div className="p-6">
          {error && <p className="text-yellow-500 mb-4">{error}</p>}
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded-lg mb-6 focus:border-hoverrtw focus:ring-hoverrtw focus:outline-none resize-none"
            placeholder="Enter mails separated by comma..."
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <Button
              className="bg-rtw text-white rounded-lg px-4 py-2 hover:bg-hoverrtw duration-300"
              click={handleAddMail}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMailPopup;
