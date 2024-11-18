import { useState, useEffect } from "react";
import Button from "../components/Buttons/Button";
import { FaSearch } from "react-icons/fa";
import UsersMails from "../components/UsersMails";
import AddMailPopup from "../components/popups/AddMailPopup";
import useMailPackageStore from "../store/mail-package.store";
import { useParams } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import AdminName from "../components/Admin_Name";

const MailsPage = () => {
  const { id } = useParams();
  const [filterTerm, setFilterTerm] = useState("");
  const {
    mailPackage,
    fetchMailPackageById,
    updateMailTemplate,
    sendMails,
    sendApprovalMails,
    updateMailStatuses,
  } = useMailPackageStore();

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [infoButtonText, setInfoButtonText] = useState(
    "Send Information Mails"
  );
  const [approvalButtonText, setApprovalButtonText] = useState(
    "Send Approval Status Mails"
  );
  const [selectedMails, setSelectedMails] = useState({});
  const [isAddMailPopupOpen, setIsAddMailPopupOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [mailType, setMailType] = useState("info");

  const [infoMailText, setInfoMailText] = useState("");
  const [infoMailSubject, setInfoMailSubject] = useState("");

  const [acceptMailText, setAcceptMailText] = useState("");
  const [acceptMailSubject, setAcceptMailSubject] = useState("");

  const [rejectMailText, setRejectMailText] = useState("");
  const [rejectMailSubject, setRejectMailSubject] = useState("");

  const closeAddMailPopup = () => setIsAddMailPopupOpen(false);

  useEffect(() => {
    fetchMailPackageById(id);
  }, [fetchMailPackageById, id]);

  useEffect(() => {
    if (mailPackage) {
      setInfoMailText(mailPackage.infoTemplate.text || "");
      setInfoMailSubject(mailPackage.infoTemplate.subject || "");
      setAcceptMailText(mailPackage.acceptTemplate.text || "");
      setAcceptMailSubject(mailPackage.acceptTemplate.subject || "");
      setRejectMailText(mailPackage.rejectTemplate.text || "");
      setRejectMailSubject(mailPackage.rejectTemplate.subject || "");
    }
  }, [mailPackage]);

  const validateForm = (checkMails = true, subject, text) => {
    console.log("subject", subject);
    console.log("text", text);
    const newErrors = {};
    if (subject.trim() === "") {
      console.log("subject", subject);
      newErrors.subject = "Subject is required";
    }
    if (text.trim() === "") {
      console.log("text", text);
      newErrors.text = "Message is required";
    }
    if (checkMails && mailPackage.userMails.length === 0) {
      newErrors.mails = "There is no mail to send";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTemplateSave = async () => {
    var newText = "";
    var newSubject = "";
    if (mailType === "info") {
      console.log("info mail");
      newText = infoMailText;
      newSubject = infoMailSubject;
      console.log("info mail", infoMailText, infoMailSubject);
    } else if (mailType === "accept") {
      console.log("accept mail");
      newText = acceptMailText;
      newSubject = acceptMailSubject;
    } else if (mailType === "reject") {
      console.log("reject mail");
      newText = rejectMailText;
      newSubject = rejectMailSubject;
    }
    if (!validateForm(false, newSubject, newText)) return;
    await updateMailTemplate(id, {
      type: mailType,
      template: {
        subject: newSubject,
        text: newText,
      },
    });
  };

  const sendInformationMails = async () => {
    setSending(true);
    setInfoButtonText("Sending...");
    await handleTemplateSave();
    const filteredMails = mailPackage.userMails
      .filter((userMail) => userMail.mailStatus === "not-sended")
      .map((userMail) => userMail.mail);
    await sendMails(filteredMails, infoMailSubject, infoMailText);
    await updateMailStatuses(
      id,
      filteredMails.map((mail) => ({
        mail: mail,
        mailStatus: "sended",
      }))
    );
    setInfoButtonText("Sended");
    setTimeout(() => {
      setInfoButtonText("Send Information Mails");
    }, 2000);
    setSending(false);
  };

  const sendApprovalStatusMails = async () => {
    setSending(true);
    setApprovalButtonText("Sending...");
    await handleTemplateSave();

    const preparedMails = mailPackage.userMails
      .filter((userMail) => userMail.approvalStatus !== "waiting")
      .map((userMail) => ({
      mail: userMail.mail,
      subject:
        userMail.approvalStatus === "accepted"
        ? acceptMailSubject
        : rejectMailSubject,
      text:
        userMail.approvalStatus === "accepted"
        ? acceptMailText
        : rejectMailText,
      }));

    await sendApprovalMails(preparedMails);

    setApprovalButtonText("Sended");
    setTimeout(() => {
      setApprovalButtonText("Send Information Mails");
    }, 2000);
    setSending(false);
  };

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
        <div className="flex gap-1">
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
          {selectedMails.length > 0 ? (
            <Button
              click={() => setIsAddMailPopupOpen(true)}
              className="text-white w-60 mr-10 bg-red-500 hover:bg-hoverrtw rounded-xl shadow-lg"
            >
              Delete Mails
            </Button>
          ) : (
            <Button
              click={() => setIsAddMailPopupOpen(true)}
              className="text-white w-60 mr-10 bg-rtw hover:bg-hoverrtw rounded-xl shadow-lg"
            >
              Add Mail
            </Button>
          )}
          <Button
            click={sendInformationMails}
            className="text-white w-60 mr-10 bg-rtw hover:bg-hoverrtw rounded-xl shadow-lg"
            disabled={sending}
          >
            {infoButtonText}
          </Button>
          <Button
            click={sendApprovalStatusMails}
            className="text-white w-60 mr-10 bg-rtw hover:bg-hoverrtw rounded-xl shadow-lg"
            disabled={sending}
          >
            {approvalButtonText}
          </Button>
        </div>
      </div>

      <div className="w-full items-center min-h-[92%] max-h-[92%] bg-açıkrtw flex">
        <div className="w-[50%] flex flex-col h-full p-4">
          <div className="w-full min-h-[60px] bg-white rounded-tl-xl rounded-tr-xl flex border border-gray-300 font-bold items-center">
            <p className="w-[10%] h-full text-xl flex ml-2 items-center font-bold text-gray-600">
              SELECT
            </p>
            <p className="w-[50%] h-full text-xl flex ml-3 items-center font-bold text-gray-600">
              E-MAIL
            </p>
            <p className="w-[80%] h-full text-xl flex items-center text-gray-600 justify-center">
              MAIL / INTERVIEW / USER STATUS
            </p>
          </div>
          <div className="w-full h-full rounded-bl-xl rounded-br-xl bg-white flex flex-col border border-gray-300 overflow-y-scroll">
            {filteredMails.length > 0 ? (
              filteredMails.map((userMail, index) => (
                <UsersMails key={index} data={userMail} />
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

              <select
                className="w-1/3 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hoverrtw"
                onChange={(e) => setMailType(e.target.value)}
                value={mailType}
              >
                <option value="info">Information Mail</option>
                <option value="accept">Accepted Mail</option>
                <option value="reject">Rejected Mail</option>
              </select>
            </div>
            {mailType === "info" && (
              <>
                <p className="text-gray-600 text-xl font-bold">
                  Information Mail
                </p>
                <p className="text-gray-600 text-xl">Subject</p>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hoverrtw"
                  value={infoMailSubject}
                  onChange={(e) => setInfoMailSubject(e.target.value)}
                />
                {errors.subject && (
                  <p className="text-red-600">{errors.subject}</p>
                )}
                <p className="text-gray-600 text-xl mt-4">Message</p>
                <TextEditor text={infoMailText} setText={setInfoMailText} />
              </>
            )}

            {mailType === "accept" && (
              <>
                <p className="text-gray-600 text-xl font-bold">Accepted Mail</p>
                <p className="text-gray-600 text-xl">Subject</p>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hoverrtw"
                  value={acceptMailSubject}
                  onChange={(e) => setAcceptMailSubject(e.target.value)}
                />
                {errors.subject && (
                  <p className="text-red-600">{errors.subject}</p>
                )}
                <p className="text-gray-600 text-xl mt-4">Message</p>
                <TextEditor text={acceptMailText} setText={setAcceptMailText} />
              </>
            )}

            {mailType === "reject" && (
              <>
                <p className="text-gray-600 text-xl font-bold">Rejected Mail</p>
                <p className="text-gray-600 text-xl">Subject</p>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hoverrtw"
                  value={rejectMailSubject}
                  onChange={(e) => setRejectMailSubject(e.target.value)}
                />
                {errors.subject && (
                  <p className="text-red-600">{errors.subject}</p>
                )}
                <p className="text-gray-600 text-xl mt-4">Message</p>
                <TextEditor text={rejectMailText} setText={setRejectMailText} />
              </>
            )}

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
