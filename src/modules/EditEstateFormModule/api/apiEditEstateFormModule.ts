import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { DisplayEstateObject } from "../../../shared/interfaces/EstateObjectTypes";

export const apiEditEstateFormModule = {
  editObject(data: FormData, _id: string): Promise<DisplayEstateObject> {
    return axiosBaseWrap
      .put("/catalog/" + _id, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data.object;
      })
      .catch((error) => {
        throw error;
      });
  },
};
