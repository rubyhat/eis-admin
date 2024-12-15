import { useAxiosQuery } from "../../../configs/RQT/useAxiosQuery";
import { apiSellOrdersModule } from "../api";

export const useFetchAllSellOrders = () => {
  return useAxiosQuery({
    queryFn: () => apiSellOrdersModule.fetchAllSellOrders(),
    queryKey: ["sell-orders"],
  });
};
