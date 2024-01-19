import { AxiosError } from "axios";
import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import toast from "react-hot-toast";

export interface LoginProps {
  username: string;
  password: string; // add hashed in md5
}

export interface LoginResponse {
  accessToken: string;
  accessTokenExpiration: number;
}

export const apiLoginModule = {
  login(data: LoginProps): Promise<LoginResponse> {
    return axiosBaseWrap
      .post("/auth/login", data)
      .then((response) => {
        if (response.status >= 422) throw new Error("Ошибка сервера!");
        return response.data.data;
      })
      .catch((error: AxiosError) => {
        // Проверяем наличие ответа и статус ошибки
        if (error.response) {
          const { status } = error.response;
          if (status >= 422) {
            toast.error(
              "Извините, произошла ошибка, обратитесь за помощью к разработчикам.",
            );
          }
          if (error.message && error.message === "Network Error") {
            toast.error("Нет подключения к интернету на Вашем устройстве");
          }
          // Выбрасываем исключение с дополнительной информацией
          throw { status, message: error.message };
        } else {
          // Обработка ошибок без ответа сервера
          throw { message: error.message };
        }
      });
  },
};
