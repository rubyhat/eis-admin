import { useSearchParams } from "react-router-dom";
import { useAxiosQuery } from "../../../configs/RQT/useAxiosQuery";
import { apiSellOrdersModule } from "../api";

export const useFetchAllSellOrders = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") || "";

  return useAxiosQuery({
    queryFn: () => apiSellOrdersModule.fetchAllSellOrders(`?status=${status}`),
    queryKey: ["sell-orders", status],
  });
};
