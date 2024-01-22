import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { DisplayEstateObject } from "../../CreateEstateModule/store";

export const apiEstateDetailsModule = {
  getDetailsById(id: string): Promise<DisplayEstateObject> {
    return axiosBaseWrap
      .get(`/catalog/${id}`)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  deleteEstate(id: string) {
    return axiosBaseWrap
      .delete(`/catalog/${id}`)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
