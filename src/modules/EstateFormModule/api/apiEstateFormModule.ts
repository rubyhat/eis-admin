import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export const apiEstateFormModule = {
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
