import { axiosBaseWrap } from "../../../configs/AxiosConfig";

export const apiAppModule = {
  logout() {
    return axiosBaseWrap
      .post("/auth/logout")
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        localStorage.clear();
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
