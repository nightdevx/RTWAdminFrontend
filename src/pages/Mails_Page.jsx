import { useState, useEffect } from "react";
import Button from "../components/Buttons/Button";
import { FaSearch } from "react-icons/fa";
import useMenuStore from "../store/menu.store";
import UsersMails from "../components/UsersMails";
import AddMailPopup from "../components/popups/AddMailPopup";
import useMailPackageStore from "../store/mail-package.store";
import { useParams } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import AdminName from "../components/Admin_Name";

const MailsPage = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const isMenuCollapsed = useMenuStore((state) => state.isMenuCollapsed);
  const {
    mailPackage,
    fetchMailPackageById,
    updateMailTemplate,
    sendMails,
    updateMailStatuses,
  } = useMailPackageStore();
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [buttonText, setButtonText] = useState("Send Mails");
  const [selectedMails, setSelectedMails] = useState({});
  const [isAddMailPopupOpen, setIsAddMailPopupOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const closeAddMailPopup = () => setIsAddMailPopupOpen(false);

  const validateForm = (checkMails = true) => {
    const newErrors = {};
    if (subject.trim() === "") {
      newErrors.subject = "Subject is required";
    }
    if (text.trim() === "") {
      newErrors.text = "Message is required";
    }
    if (checkMails && mailPackage.userMails.length === 0) {
      newErrors.mails = "There is no mail to send";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTemplateSave = async () => {
    if (!validateForm(false)) return;
    if (
      subject === mailPackage.template.subject &&
      text === mailPackage.template.text
    )
      return;
    updateMailTemplate(id, {
      template: {
        subject: subject,
        text: text,
      },
    });
  };

  const handleMailSend = async () => {
    setSending(true);
    setButtonText("Sending...");
    if (!validateForm()) {
      setSending(false);
      setButtonText("Send Mails");
      return;
    }
    await handleTemplateSave();
    const filteredMails = mailPackage.userMails
      .filter((userMail) => userMail.mailStatus === "not-sended")
      .map((userMail) => userMail.mail);
    await sendMails(filteredMails, subject, text);
    await updateMailStatuses(
      id,
      filteredMails.map((mail) => ({
        mail: mail,
        mailStatus: "sended",
      }))
    );
    setButtonText("Sended");
    setTimeout(() => {
      setButtonText("Send Mails");
    }, 2000);
    setSending(false);
  };

  useEffect(() => {
    fetchMailPackageById(id);
  }, [fetchMailPackageById]);

  useEffect(() => {
    if (mailPackage) {
      setSubject(mailPackage.template.subject);
      setText(mailPackage.template.text);
    }
  }, [mailPackage]);

  const filteredMails =
    mailPackage?.userMails.filter((userMail) =>
      userMail.mail.toLowerCase().includes(filterTerm.toLowerCase())
    ) || [];

  const toggleSelectMail = (mailId) => {
    setSelectedMails((prev) => ({
      ...prev,
      [mailId]: !prev[mailId],
    }));
  };

  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy link: ", err));
  };

  return (
    <div className="w-full h-[92%] flex flex-col bg-red-500">
      <div className="w-full min-h-20 bg-açıkrtw flex justify-between items-center">
        <AdminName />
        <div className="flex gap-4">
          <div className="relative mr-10">
            <input
              type="text"
              placeholder="Search Mails..."
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              className="rounded-lg w-80 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-hoverrtw border border-gray-300 shadow-xl"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            click={() => setIsAddMailPopupOpen(true)}
            className="text-white w-60 mr-10 bg-rtw hover:bg-hoverrtw rounded-xl shadow-lg"
          >
            Add Mail
          </Button>
          <Button
            click={handleMailSend}
            className="text-white w-60 mr-10 bg-rtw hover:bg-hoverrtw rounded-xl shadow-lg"
          >
            {buttonText}
          </Button>
        </div>
      </div>

      <div className="w-full items-center min-h-[92%] max-h-[92%] bg-açıkrtw flex">
        <div className="w-[50%] flex flex-col h-full p-4">
          <div className="w-full min-h-[60px] bg-white rounded-tl-xl rounded-tr-xl flex border border-gray-300 font-bold items-center">
            <p className="w-[10%] h-full text-xl flex ml-2 items-center font-bold text-gray-600">
              SELECT
            </p>
            <p className="w-[50%] h-full text-xl flex ml-2 items-center font-bold text-gray-600">
              E-MAIL
            </p>
            <p className="w-[80%] h-full text-xl flex items-center text-gray-600 justify-center">
              MAIL / INTERVIEW STATUS
            </p>
          </div>
          <div className="w-full h-full rounded-bl-xl rounded-br-xl bg-white flex flex-col border border-gray-300 overflow-y-scroll">
            {filteredMails.length > 0 ? (
              filteredMails.map((userMail, index) => (
                <UsersMails
                  key={index}
                  data={userMail}
                  isSelected={!!selectedMails[userMail.id]}
                  onSelect={() => toggleSelectMail(userMail.id)}
                />
              ))
            ) : (
              <p
                className={`text-center text-xl ${
                  errors.mails ? "text-red-600" : "text-gray-600"
                }`}
              >
                No mails to send
              </p>
            )}
          </div>
        </div>

        <div className="w-[50%] flex flex-col h-full p-4">
          <div className="w-full bg-white rounded-xl flex flex-col border border-gray-300 p-4 flex-grow">
            <div className="w-full flex justify-between items-center">
              <p className="text-2xl mb-4 text-center font-bold">
                Mail Template
              </p>
              <button
                className={`relative group text-blue-500 ml-auto px-2 ${
                  isLinkCopied ? "text-green-500" : ""
                }`}
                onClick={copyLink}
              >
                <i
                  className={`fas ${
                    isLinkCopied
                      ? "fa-check animate-bounce"
                      : "fa-link hover:text-blue-500"
                  }`}
                ></i>

                <span className="absolute bottom-full mb-2 hidden group-hover:flex w-max px-2 py-1 text-sm text-white bg-gray-800 rounded-md shadow-lg transform -translate-x-1/2 left-1/2">
                  {isLinkCopied ? "Link copied!" : "Copy Interview link"}
                </span>
              </button>

              <select className="w-1/3 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hoverrtw">
                <option value="default">Information Mail</option>
                <option value="interview">Accepted Mail</option>
                <option value="rejected">Rejected Mail</option>
              </select>
            </div>
            <p className="text-gray-600 text-xl">Subject</p>
            <input
              type="text"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hoverrtw"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            {errors.subject && <p className="text-red-600">{errors.subject}</p>}
            <p className="text-gray-600 text-xl mt-4">Message</p>
            <TextEditor text={text} setText={setText} />
            {errors.text && <p className="text-red-600">{errors.text}</p>}
            <button
              className="bg-rtw text-white px-4 py-2 rounded-lg shadow-md hover:bg-hoverrtw duration-300 mt-auto w-80 mx-auto"
              onClick={handleTemplateSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {isAddMailPopupOpen && (
        <AddMailPopup
          onClose={closeAddMailPopup}
          id={id}
          mails={mailPackage.userMails}
        />
      )}
    </div>
  );
};

export default MailsPage;
