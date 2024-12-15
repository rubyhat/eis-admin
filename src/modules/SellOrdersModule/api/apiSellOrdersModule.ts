import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { DisplayEstateObject } from "../../../shared/interfaces";

export const apiSellOrdersModule = {
  fetchAllSellOrders(): Promise<DisplayEstateObject[]> {
    return axiosBaseWrap.get("/orders/sell").then((response) => response.data);
  },
};
