import { create } from "zustand";
import { apiWithAuth, apiWithoutAuth } from "../config/axios.config";

const fetchInterviews = async (set) => {
  set({ interviews: [], loading: true, error: null });
  try {
    const response = await apiWithoutAuth.get("/interviews");
    set({ interviews: response.data, loading: false });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    set({ error, loading: false });
  }
};

const fetchInterviewById = async (set, id) => {
  set({ loading: true, error: null });
  try {
    const response = await apiWithoutAuth.get(`/interviews/${id}`);
    set({ interview: response.data, loading: false });
  } catch (error) {
    console.error(`Error fetching interview with id ${id}:`, error);
    set({ error, loading: false });
  }
};

const fetchInterviewByName = async (set, name) => {
  console.log("fetchInterviewByName");
  set({ interview: null, loading: true, error: null });
  try {
    const response = await apiWithoutAuth.get(`/interviews/name/${name}`);
    set({ interview: response.data, loading: false });
  } catch (error) {
    console.error(`Error fetching interview for name ${name}:`, error);
    set({ error, loading: false });
  }
};

const createInterview = async (set, interviewData) => {
  set({ loading: true, error: null });
  try {
    await apiWithAuth.post("/interviews", interviewData);
    await fetchInterviews(set);
  } catch (error) {
    console.error("Error creating interview:", error);
    set({ error, loading: false });
  }
};

const updateInterview = async (set, id, interviewData) => {
  set({ loading: true, error: null });
  try {
    await apiWithAuth.put(`/interviews/${id}`, interviewData);
    await fetchInterviews(set);
  } catch (error) {
    console.error(`Error updating interview with id ${id}:`, error);
    set({ error, loading: false });
  }
};

const deleteInterview = async (set, id) => {
  set({ loading: true, error: null });
  try {
    await apiWithAuth.delete(`/interviews/${id}`);
    set((state) => ({
      interviews: state.interviews.filter((interview) => interview._id !== id),
      loading: false,
    }));
  } catch (error) {
    console.error(`Error deleting interview with id ${id}:`, error);
    set({ error, loading: false });
  }
};

const useInterviewStore = create((set) => ({
  interviews: [],
  interview: { _id: "", name: "", packages: [] },
  loading: false,
  error: null,

  fetchInterviews: () => fetchInterviews(set),
  fetchInterviewById: (id) => fetchInterviewById(set, id),
  fetchInterviewByName: (name) => fetchInterviewByName(set, name),
  createInterview: (interviewData) => createInterview(set, interviewData),
  updateInterview: (id, interviewData) =>
    updateInterview(set, id, interviewData),
  deleteInterview: (id) => deleteInterview(set, id),
}));

export default useInterviewStore;
