import { create } from "zustand";
import { apiWithAuth, apiWithoutAuth } from "../config/axios.config";

const getQuestionPackages = async (set) => {
  set({ loading: true, error: null, questionPackages: [] });
  try {
    const response = await apiWithAuth.get(`/question-packages`);
    set({ questionPackages: response.data, loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const getQuestionPackageById = async (set, id) => {
  set({
    loading: true,
    error: null,
    selectedPackage: { _id: "", title: "", questions: [] },
  });
  try {
    const response = await apiWithoutAuth.get(`/question-packages/${id}`);
    set({ selectedPackage: response.data, loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const addQuestionPackage = async (set, questionPackage) => {
  set({ loading: true, error: null });
  try {
    const response = await apiWithAuth.post(
      `/question-packages`,
      questionPackage
    );
    if (response.data && response.data._id) {
      set((state) => ({
        questionPackages: [...state.questionPackages, response.data],
        loading: false,
      }));
      return response.data._id;
    } else {
      throw new Error("Invalid question package saved.");
    }
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const deleteQuestionPackage = async (set, id) => {
  set({ loading: true, error: null });
  try {
    await apiWithAuth.delete(`/question-packages/${id}`);
    set((state) => ({
      questionPackages: state.questionPackages.filter((pkg) => pkg._id !== id),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const deleteQuestionPackages = async (set, ids) => {
  set({ loading: true, error: null });
  try {
    await apiWithAuth.delete(`/question-packages`, { data: { ids } });
    set((state) => ({
      questionPackages: state.questionPackages.filter(
        (pkg) => !ids.includes(pkg._id)
      ),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const updateQuestionPackage = async (set, updatedPackage) => {
  set({ loading: true, error: null });
  try {
    const response = await apiWithAuth.put(
      `/question-packages/${updatedPackage.id}`,
      updatedPackage
    );
    set((state) => ({
      selectedPackage:
        state.selectedPackage._id === response.data._id
          ? response.data
          : state.selectedPackage,
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const addQuestionToPackage = async (set, questionPackageId, question) => {
  set({ loading: true, error: null });
  try {
    const response = await apiWithAuth.put(
      `/question-packages/add-question/${questionPackageId}`,
      {
        questionText: question.text,
        questionTime: question.time,
      }
    );
    set((state) => ({
      selectedPackage:
        state.selectedPackage._id === response.data._id
          ? response.data
          : state.selectedPackage,
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};
const updateQuestionInPackage = async (set, questionPackageId, question) => {
  set({ loading: true, error: null });
  try {
    const response = await apiWithAuth.put(
      `/question-packages/update-question/${questionPackageId}/${question._id}`,
      {
        questionText: question.text,
        questionTime: question.time,
      }
    );
    set((state) => ({
      selectedPackage:
        state.selectedPackage._id === response.data._id
          ? response.data
          : state.selectedPackage,
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const removeQuestionsFromPackage = async (set, packId, questionIds) => {
  set({ loading: true, error: null });
  try {
    console.log(packId, questionIds);
    const response = await apiWithAuth.patch(
      `/question-packages/remove-question/${packId}`,
      { ids: questionIds }
    );
    set((state) => ({
      selectedPackage:
        state.selectedPackage._id === response.data._id
          ? response.data
          : state.selectedPackage,
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const useQuestionPackageStore = create((set) => ({
  questionPackages: [],
  selectedPackage: { _id: "", title: "", questions: [] },
  loading: false,
  error: null,

  getQuestionPackages: () => getQuestionPackages(set),
  getQuestionPackageById: (id) => getQuestionPackageById(set, id),
  addQuestionPackage: (questionPackage) =>
    addQuestionPackage(set, questionPackage),
  deleteQuestionPackage: (id) => deleteQuestionPackage(set, id),
  deleteQuestionPackages: (ids) => deleteQuestionPackages(set, ids),
  updateQuestionPackage: (updatedPackage) =>
    updateQuestionPackage(set, updatedPackage),
  addQuestionToPackage: (questionPackageId, question) =>
    addQuestionToPackage(set, questionPackageId, question),
  updateQuestionInPackage: (questionPackageId, question) =>
    updateQuestionInPackage(set, questionPackageId, question),
  removeQuestionsFromPackage: (questionPackageId, questionId) =>
    removeQuestionsFromPackage(set, questionPackageId, questionId),
}));

export default useQuestionPackageStore;
