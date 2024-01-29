import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export const apiUserCreate = {
  createUser(data: FormData): Promise<EstateAgentInfo> {
    return axiosBaseWrap
      .post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
