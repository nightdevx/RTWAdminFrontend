import { create } from "zustand";
import axios from "axios";
import { apiWithAuth, apiWithoutAuth } from "../config/axios.config";

const fetchVideos = async (set) => {
  set({ video: null, videoLoading: true, error: null });
  try {
    const response = await apiWithoutAuth.get("/videos");
    set({ videos: response.data, videoLoading: false });
  } catch (error) {
    set({ error: error.message, videoLoading: false });
  }
};

const fetchVideoById = async (set, id) => {
  set({ video: null, videoLoading: true, error: null });
  try {
    const response = await apiWithoutAuth.get(`/videos/${id}`);
    set({ video: response.data, videoLoading: false });
    return response.data;
  } catch (error) {
    set({ error: error.message, videoLoading: false });
  }
};

const addVideo = async (set, videoFile) => {
  set({ videoLoading: true, error: null });
  try {
    const formData = new FormData();
    formData.append("video", videoFile);

    const response = await apiWithoutAuth.post("/videos", formData);

    set((state) => ({
      videos: [...state.videos, response.data],
      videoLoading: false,
    }));
    return response.data.files[0].fileId;
  } catch (error) {
    set({ error: error.message, videoLoading: false });
  }
};

const removeVideo = async (set, id) => {
  set({ videoLoading: true, error: null });
  try {
    await apiWithAuth.delete(`/videos/${id}`);
    set((state) => ({
      videos: state.videos.filter((video) => video.id !== id),
      videoLoading: false,
    }));
  } catch (error) {
    set({ error: error.message, videoLoading: false });
  }
};

const fetchVideosByIds = async (set, ids) => {
  set({ videos: null, videoLoading: true, error: null });
  try {
    const response = await apiWithoutAuth.post(`/videos/multiple`, { ids });
    set({ videos: response.data, videoLoading: false });
  } catch (error) {
    set({ error: error.message, videoLoading: false });
  }
};

const useVideoStore = create((set) => ({
  videos: [],
  video: null,
  videoLoading: false,
  error: null,
  fetchVideos: () => fetchVideos(set),
  fetchVideoById: (id) => fetchVideoById(set, id),
  fetchVideosByIds: (ids) => fetchVideosByIds(set, ids),
  addVideo: (videoFile) => addVideo(set, videoFile),
  removeVideo: (id) => removeVideo(set, id),
}));

export default useVideoStore;
