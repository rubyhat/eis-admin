import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { DisplayEstateObject } from "../../../shared/interfaces/EstateObjectTypes";

export const apiCatalogModule = {
  fetchCatalog(params: string): Promise<DisplayEstateObject[]> {
    return axiosBaseWrap
      .get(`/catalog?${params}`)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
