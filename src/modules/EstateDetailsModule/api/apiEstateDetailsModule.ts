import { axiosBaseWrap } from "../../../configs/AxiosConfig";

export const apiEstateDetailsModule = {
  deleteEstate(id: string) {
    return axiosBaseWrap
      .delete("/catalog", { params: { id: id } })
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
