import { useQuery } from "@tanstack/react-query";

import { apiSellOrdersModule } from "../api/apiSellOrdersModule";

export const useFetchSellOrders = () => {
  return useQuery({
    queryFn: () => apiSellOrdersModule.fetchSells(""),
    queryKey: ["sellOrders"],
  });
};
