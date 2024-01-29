import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export const apiUsersModule = {
  fetchAllUsers(): Promise<EstateAgentInfo[]> {
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
  deleteUserById(_id: string) {
    return axiosBaseWrap
      .delete("/users/" + _id)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
