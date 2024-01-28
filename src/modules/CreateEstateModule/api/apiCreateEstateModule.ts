import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import {
  DisplayEstateObject,
  FormFieldsType,
} from "../../../shared/interfaces/EstateObjectTypes";

export const apiCreateEstateModule = {
  createObject(data: FormFieldsType): Promise<DisplayEstateObject> {
    return axiosBaseWrap
      .post("/catalog", data)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data.object;
      })
      .catch((error) => {
        throw error;
      });
  },
};
