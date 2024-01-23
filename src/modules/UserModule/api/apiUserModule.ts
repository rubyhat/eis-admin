import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export const apiUserModule = {
  fetchUser(username: string): Promise<EstateAgentInfo> {
    return axiosBaseWrap
      .get("/users/" + username)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
