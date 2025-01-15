import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { ResponseSellOrderData } from "../../../shared/interfaces";

export const apiSellOrdersModule = {
  fetchAllSellOrders(params: string): Promise<ResponseSellOrderData[]> {
    return axiosBaseWrap
      .get("/orders/sell" + params)
      .then((response) => response.data);
  },
};
