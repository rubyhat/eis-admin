import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { FormFieldsType } from "../../../shared/interfaces/EstateObjectTypes";

export const apiCreateEstateModule = {
  createObject(data: FormFieldsType) {
    return axiosBaseWrap
      .post("/catalog", data)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
