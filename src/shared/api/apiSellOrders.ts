import { axiosBaseWrap } from "../../configs/AxiosConfig";

export const apiSellOrders = {
  deleteSellOrder(id: string) {
    return axiosBaseWrap
      .delete("/orders/sell/" + id)
      .then((response) => response.data);
  },
};
