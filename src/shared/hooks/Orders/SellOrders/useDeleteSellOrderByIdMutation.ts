import { useQueryClient } from "@tanstack/react-query";
import { useAxiosMutation } from "../../../../configs/RQT/useAxiosMutation";
import { apiSellOrders } from "../../../api";
import toast from "react-hot-toast";

export const useDeleteSellOrderByIdMutation = () => {
  const queryClient = useQueryClient();

  return useAxiosMutation({
    mutationFn: (id: string) => apiSellOrders.deleteSellOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sell-orders"],
      });

      toast.success("Заявка успешно удалена!");
    },
    onError: (error) => {
      const message = error.response?.data.message;
      const code = error.response?.data.statusCode;
      // todo: в будущем добавить какой-нибудь трекер ошибок на стороне клиента, например Sentry
      // eslint-disable-next-line no-console
      console.error(message, "Code: ", code);

      toast.error(`Ошибка при удалении заявки. ${message}`);
    },
  });
};
