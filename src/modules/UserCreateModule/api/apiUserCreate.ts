import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export const apiUserCreate = {
  createUser(data: EstateAgentInfo): Promise<EstateAgentInfo> {
    return axiosBaseWrap
      .post("/auth/register", data)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
