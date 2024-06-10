import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { SellOrderDisplay } from "../store/interfaces";

export const apiSellOrdersModule = {
  fetchSells(params: string): Promise<SellOrderDisplay[]> {
    return axiosBaseWrap
      .get("/orders/sell?" + params)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
