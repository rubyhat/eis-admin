import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { ResponseSellOrderData } from "../../../shared/interfaces";

export const apiSellDetailsModule = {
  getSellOrderDetails(id: string): Promise<ResponseSellOrderData> {
    return axiosBaseWrap
      .get("/orders/sell/" + id)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
