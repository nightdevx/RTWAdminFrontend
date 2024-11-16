import { create } from "zustand";
import { apiWithAuth, apiWithoutAuth } from "../config/axios.config";

const fetchApplications = async (set, interviewId) => {
  console.log(interviewId);
  set({ applications: [], loading: true, error: null });
  try {
    const response = await apiWithAuth.get(
      `/application/interviews/${interviewId}`
    );
    set({ applications: response.data, loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const fetchApplicationById = async (set, id) => {
  set({ selectedApplication: null, loading: true, error: null });
  try {
    const response = await apiWithAuth.get(`/application/${id}`);
    set({
      selectedApplication: response.data,
      notes: response.data.notes,
      loading: false,
    });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const addApplication = async (set, newCollection) => {
  set({ loading: true, error: null });
  try {
    const response = await apiWithoutAuth.post(`/application`, newCollection);
    set((state) => ({
      applications: [...state.applications, newCollection],
      loading: false,
    }));
    return response.data._id;
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const updateApplication = async (set, id, updatedCollection) => {
  set({ loading: true, error: null });
  try {
    const response = await apiWithoutAuth.put(
      `/application/${id}`,
      updatedCollection
    );
    set((state) => ({
      applications: state.applications.map((collection) =>
        collection._id === id ? response.data : collection
      ),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const deleteApplication = async (set, id) => {
  set({ loading: true, error: null });
  try {
    await apiWithAuth.delete(`/application/${id}`);
    set((state) => ({
      applications: state.applications.filter(
        (collection) => collection._id !== id
      ),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};
const addNoteToApplication = async (set, id, note) => {
  set({ loading: true, error: null });
  try {
    await apiWithAuth.post(`/application/${id}/notes`, { note: note });
    set((state) => ({
      notes: [...state.notes, { note: note, createdAt: new Date() }],
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

// Not silme fonksiyonu
const deleteNoteFromApplication = async (set, id, noteIndex) => {
  set({ loading: true, error: null });
  try {
    await apiWithAuth.delete(`/application/${id}/notes/${noteIndex}`);
    set((state) => ({
      notes: state.notes.filter((note, index) => index !== noteIndex),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

// Not güncelleme fonksiyonu
const updateNoteInApplication = async (set, id, noteIndex, updatedNote) => {
  set({ loading: true, error: null });
  try {
    const response = await apiWithAuth.put(
      `/application/${id}/notes/${noteIndex}`,
      updatedNote
    );
    set((state) => ({
      notes: state.notes.map((note, index) =>
        index === noteIndex ? response.data : note
      ),
      loading: false,
    }));
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

const useApplicationsStore = create((set) => ({
  applications: [],
  selectedApplication: null,
  notes: [],
  videos: [],
  loading: false,
  error: null,
  fetchApplications: (interviewId) => fetchApplications(set, interviewId),
  fetchApplicationById: (id) => fetchApplicationById(set, id),
  addApplication: (newCollection) => addApplication(set, newCollection),
  updateApplication: (id, updatedCollection) =>
    updateApplication(set, id, updatedCollection),
  deleteApplication: (id) => deleteApplication(set, id),
  addNoteToApplication: (id, note) => addNoteToApplication(set, id, note),
  deleteNoteFromApplication: (id, noteIndex) =>
    deleteNoteFromApplication(set, id, noteIndex),
  updateNoteInApplication: (id, noteIndex, updatedNote) =>
    updateNoteInApplication(set, id, noteIndex, updatedNote),
  fetchVideos: () => fetchVideos(set),
  addVideo: (newVideo) => addVideo(set, newVideo),
  deleteVideo: (id) => deleteVideo(set, id),
}));

export default useApplicationsStore;
