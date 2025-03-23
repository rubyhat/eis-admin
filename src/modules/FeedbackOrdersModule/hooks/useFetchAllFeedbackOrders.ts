import { useAxiosQuery } from "../../../configs/RQT/useAxiosQuery";
import { apiFeedbackOrdersModule } from "../api";

export const useFetchAllFeedbackOrders = (searchParams: string) => {
  return useAxiosQuery({
    queryFn: () => apiFeedbackOrdersModule.fetchFeedbacks(searchParams),
    queryKey: ["feedback-orders"],
  });
};
