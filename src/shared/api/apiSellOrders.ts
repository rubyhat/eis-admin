import { axiosBaseWrap } from "../../configs/AxiosConfig";
import { ResponseSellOrderData } from "../interfaces";

export const apiSellOrders = {
  deleteSellOrder(id: string) {
    return axiosBaseWrap
      .delete("/orders/sell/" + id)
      .then((response) => response.data);
  },
  updateSellOrder(
    id: string,
    data: Partial<
      Omit<ResponseSellOrderData, "estateAgent"> & { estateAgent: string }
    >,
  ) {
    return axiosBaseWrap.patch<ResponseSellOrderData>(
      "/orders/sell/" + id,
      data,
    );
  },
};
