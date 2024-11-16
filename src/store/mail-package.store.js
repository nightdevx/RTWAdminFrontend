import { create } from "zustand";
import { apiWithAuth, apiWithoutAuth } from "../config/axios.config";

const fetchAllMailPackages = async (set) => {
  set({ loading: false, error: null });
  try {
    const response = await apiWithAuth.get(`/mail-packages`);
    set({ mailPackages: response.data, loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const fetchMailPackageById = async (set, id) => {
  set({ mailPackage: null, loading: false, error: null });
  try {
    const response = await apiWithoutAuth.get(`/mail-packages/${id}`);
    set({ mailPackage: response.data, loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const fetchMailPackagesByInterviewId = async (set, interviewId) => {
  set({ loading: false, error: null });
  try {
    const response = await apiWithoutAuth.get(
      `/mail-packages/interview/${interviewId}`
    );
    set({ mailPackage: response.data, loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const createMailPackage = async (set, mailPackageData) => {
  set({ loading: false, error: null });
  try {
    const response = await apiWithAuth.post(`/mail-packages`, mailPackageData);
    set((state) => ({
      mailPackages: [...state.mailPackages, response.data],
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const deleteMailPackage = async (set, id) => {
  set({ loading: false, error: null });
  try {
    await apiWithAuth.delete(`/mail-packages/${id}`);
    set((state) => ({
      mailPackages: state.mailPackages.filter((pkg) => pkg._id !== id),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const updateMailTemplate = async (set, id, templateData) => {
  set({ loading: false, error: null });
  try {
    const response = await apiWithAuth.put(
      `/mail-packages/${id}`,
      templateData
    );
    set((state) => ({
      mailPackages: state.mailPackages.map((pkg) =>
        pkg._id === id ? { ...pkg, template: response.data.template } : pkg
      ),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

// Mail operations
const addMailsToPackage = async (set, id, mailDatas) => {
  set({ loading: false, error: null });
  try {
    await apiWithAuth.post(`/mail-packages/mail/${id}`, mailDatas);
    set((state) => ({
      mailPackage: {
        ...state.mailPackage,
        userMails: [...state.mailPackage.userMails, ...mailDatas.mails],
      },
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const updateMailInPackage = async (set, id, mailData) => {
  set({ loading: false, error: null });

  try {
    const response = await apiWithAuth.put(
      `/mail-packages/mail/${id}`,
      mailData
    );
    set((state) => ({
      mailPackages: state.mailPackages.map((pkg) =>
        pkg._id === id
          ? {
              ...pkg,
              userMails: pkg.userMails.map((mail) =>
                mail._id === mailData._id ? response.data : mail
              ),
            }
          : pkg
      ),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const updateMailStatuses = async (set, id, mailDatas) => {
  set({ loading: false, error: null });
  try {
    await apiWithAuth.put(`/mail-packages/mails/${id}`, {
      mails: mailDatas,
    });
    set((state) => ({
      mailPackage: {
        ...state.mailPackage,
        userMails: state.mailPackage.userMails.map((mail) =>
          mailDatas.find((m) => m.mail === mail.mail)
            ? {
                ...mail,
                mailStatus: mailDatas.find((m) => m.mail === mail.mail)
                  .mailStatus,
              }
            : mail
        ),
      },
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const deleteMailFromPackage = async (set, id, mailId) => {
  try {
    await apiWithAuth.delete(`/mail-packages/mail/${id}`, {
      data: { mailId },
    });
    set((state) => ({
      mailPackages: state.mailPackages.map((pkg) =>
        pkg._id === id
          ? {
              ...pkg,
              userMails: pkg.userMails.filter((mail) => mail._id !== mailId),
            }
          : pkg
      ),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const sendMails = async (set, mails, subject, message) => {
  try {
    await apiWithAuth.post(`/emails/send`, {
      to: mails,
      subject: subject,
      message: message,
    });
    set({ loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const getMailData = async (id, mail) => {
  const response = await apiWithoutAuth.get(
    `/mail-packages/mail/${id}/${mail}`
  );
  if (response.data) {
    return response.data;
  } else {
    return null;
  }
};

const markInterviewAsDone = async (set, interviewId, mail) => {
  set({ loading: false, error: null });
  try {
    await apiWithoutAuth.put(`/mail-packages/mail/${interviewId}/${mail}`);
    set((state) => ({
      mailPackages: state.mailPackages.map((pkg) =>
        pkg.interviewId === interviewId
          ? {
              ...pkg,
              userMails: pkg.userMails.map((m) =>
                m.mail === mail ? { ...m, interviewDone: true } : m
              ),
            }
          : pkg
      ),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const useMailPackageStore = create((set) => ({
  mailPackages: [],
  mailPackage: null,
  loading: false,
  error: null,

  // Mail package operations
  fetchAllMailPackages: () => fetchAllMailPackages(set),
  fetchMailPackageById: (id) => fetchMailPackageById(set, id),
  fetchMailPackagesByInterviewId: (interviewId) =>
    fetchMailPackagesByInterviewId(set, interviewId),
  createMailPackage: (mailPackageData) =>
    createMailPackage(set, mailPackageData),
  deleteMailPackage: (id) => deleteMailPackage(set, id),
  updateMailTemplate: (id, templateData) =>
    updateMailTemplate(set, id, templateData),

  sendMails: (ids, subject, message) => sendMails(set, ids, subject, message),

  // Mail operations
  addMailsToPackage: (id, mailDatas) => addMailsToPackage(set, id, mailDatas),
  updateMailInPackage: (id, mailData) => updateMailInPackage(set, id, mailData),
  updateMailStatuses: (id, mailDatas) => updateMailStatuses(set, id, mailDatas),
  deleteMailFromPackage: (id, mailId) => deleteMailFromPackage(set, id, mailId),
  getMailData: (id, mail) => getMailData(id, mail),
  markInterviewAsDone: (interviewId, mail) =>
    markInterviewAsDone(set, interviewId, mail),
}));

export default useMailPackageStore;
