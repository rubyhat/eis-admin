import { apiSellDetailsModule } from "../api";
import { useAxiosQuery } from "../../../configs/RQT/useAxiosQuery";

export const useGetSellDetailsQuery = (
  id: string | undefined,
  enabled: boolean,
) => {
  return useAxiosQuery({
    queryFn: () => apiSellDetailsModule.getSellOrderDetails(id as string),
    queryKey: ["sell-order-details", id],
    enabled, // Выполняем запрос, только если enabled = true
  });
};
