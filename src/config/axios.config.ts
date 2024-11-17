import axios from "axios";

// Token gerektiren işlemler için Axios instance'ı oluşturun
const apiWithAuth = axios.create({
  baseURL: "https://rtwbackend.onrender.com/api", // API'nizin base URL'sini buraya ekleyin
});

// Request interceptor ekleyin
apiWithAuth.interceptors.request.use(
  (config) => {
    // JWT token'ı localStorage'dan alın
    const token = sessionStorage.getItem("token");

    // Eğer token varsa, Authorization header'ına ekleyin
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Token gerektirmeyen işlemler için Axios instance'ı oluşturun
const apiWithoutAuth = axios.create({
  baseURL: "https://rtwbackend.onrender.com/api", // API'nizin base URL'sini buraya ekleyin
});

export { apiWithAuth, apiWithoutAuth };
