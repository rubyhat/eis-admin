import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { User } from "../interfaces/User";

export const apiUsersModule = {
  fetchAllUsers(): Promise<User[]> {
    return axiosBaseWrap
      .get("/users")
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
