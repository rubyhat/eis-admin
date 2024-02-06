import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH;

export const axiosBaseWrap = axios.create({
  baseURL: API_BASE_PATH,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Утилиты для управления токенами
const tokenUtils = {
  getAccessToken: (): string | null => localStorage.getItem("accessToken"),
  getAccessTokenExpiration: (): string | null =>
    localStorage.getItem("accessTokenExpiration"),
  setAccessToken: (token: string, expiration: string): void => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("accessTokenExpiration", expiration);
  },
  clearAccessToken: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiration");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuth");
  },
};

// Функция для обновления accessToken
const updateAccessToken = async () => {
  try {
    const response = await axiosBaseWrap.post("/auth/refresh");
    tokenUtils.setAccessToken(
      response.data.accessToken,
      response.data.accessTokenExpiration,
    );

    return response.data.accessToken;
  } catch (error) {
    // Обработка ошибок обновления токена
    toast.error(
      "Не удалось автоматически обновить сесиию. Пожалуйста, авторизуйтесь в системе повторно.",
    );
    // Очистка данных о сессии пользователя
    tokenUtils.clearAccessToken();
    // Перенаправление пользователя на страницу входа
    // window.location.href = "/login";
  }
};

// Axios interceptor
axiosBaseWrap.interceptors.request.use(
  async (config) => {
    const token = tokenUtils.getAccessToken();
    const expiration = tokenUtils.getAccessTokenExpiration();

    // Проверяем есть ли токен в локальном сторе
    if (
      token &&
      expiration &&
      config.url !== "/auth/refresh" &&
      config.url !== "/auth/login"
    ) {
      const now = new Date().getTime();
      // Если токен протух, то обновляем его
      if (now > parseInt(expiration)) {
        const newToken = await updateAccessToken();
        if (newToken) {
          config.headers["Authorization"] = `Bearer ${newToken}`;
        }
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Axios response interceptor
axiosBaseWrap.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token (status code 401)
    if (
      error.response &&
      error.response.status === 401 &&
      error.config.url !== "/auth/login" &&
      error.config.url !== "/auth/refresh" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        const response = await updateAccessToken();

        // If the refresh is successful, retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${response}`;
        return axiosBaseWrap(originalRequest);
      } catch (refreshError) {
        // If the refresh fails, handle the error and redirect the user
        handleAuthenticationError();
        return Promise.reject(refreshError);
      }
    }

    // Check if the error is due to a forbidden access (status code 403)
    if (error.response && error.response.status === 403) {
      // Handle 403 error, e.g., clear localStorage and redirect to login
      handleForbiddenError();
      return Promise.reject(error);
    }

    // If it's not a 401 or 403 error, simply reject the promise with the error
    return Promise.reject(error);
  },
);

// Function to handle authentication errors (e.g., clear localStorage and redirect to login)
const handleAuthenticationError = () => {
  toast.error(
    "Не удалось автоматически обновить сессию. Пожалуйста, авторизуйтесь в системе повторно.",
    { duration: 10000 },
  );
  setTimeout(() => {
    tokenUtils.clearAccessToken();
    window.location.href = "/login";
  }, 10000);
};

// Function to handle forbidden errors (e.g., clear localStorage and redirect to login)
const handleForbiddenError = () => {
  toast.error(
    "У вас нет доступа к этому ресурсу. Пожалуйста, авторизуйтесь для продолжения.",
    { duration: 10000 },
  );

  setTimeout(() => {
    tokenUtils.clearAccessToken();
    window.location.href = "/login";
  }, 10000);
};
