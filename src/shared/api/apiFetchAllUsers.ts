import { axiosBaseWrap } from "../../configs/AxiosConfig";
import { EstateAgentInfo } from "../interfaces/EstateObjectTypes";

export const apiFetchAllUsers = {
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
};
