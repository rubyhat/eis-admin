import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAxiosMutation } from "../../../../configs/RQT/useAxiosMutation";
import { apiSellOrders } from "../../../api";
import { ResponseSellOrderData } from "../../../interfaces";

interface useUpdateSellOrderMutationProps {
  refetchSellOrderDetails: () => void;
  toastMsgs: { success: string; error: string };
}

export const useUpdateSellOrderMutation = ({
  refetchSellOrderDetails,
  toastMsgs,
}: useUpdateSellOrderMutationProps) => {
  const queryClient = useQueryClient();

  return useAxiosMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<
        Omit<ResponseSellOrderData, "estateAgent"> & { estateAgent: string }
      >;
    }) => apiSellOrders.updateSellOrder(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["sell-order-details", response.data._id],
      });
      refetchSellOrderDetails();
      toast.success(toastMsgs.success);
    },
    onError: (error) => {
      const message = error.response?.data.message;
      const code = error.response?.data.statusCode;
      // todo: в будущем добавить какой-нибудь трекер ошибок на стороне клиента, например Sentry
      // eslint-disable-next-line no-console
      console.error(message, "Code: ", code);

      toast.error(`${toastMsgs.error} ${message}`);
    },
  });
};
