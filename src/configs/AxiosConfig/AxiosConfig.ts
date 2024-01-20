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
    window.location.href = "/login";
  }
};

// Axios interceptor
axiosBaseWrap.interceptors.request.use(
  async (config) => {
    const token = tokenUtils.getAccessToken();
    const expiration = tokenUtils.getAccessTokenExpiration();

    // Проверяем есть ли токен в локальном сторе
    if (token && expiration && config.url !== "/auth/refresh") {
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
