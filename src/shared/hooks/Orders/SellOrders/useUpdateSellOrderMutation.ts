import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { apiSellOrders } from "../../../api";
import { ResponseSellOrderData } from "../../../interfaces";
import { useAxiosMutation } from "../../../../configs/RQT/useAxiosMutation";

interface useUpdateSellOrderMutationProps {
  refetchSellOrderDetails: () => void;
  toastMsgs: { success: string; error: string };
}

export const useUpdateSellOrderMutation = ({
  refetchSellOrderDetails,
  toastMsgs,
}: useUpdateSellOrderMutationProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

      if (response.data.createdObjectId) {
        navigate("/catalog/" + response.data.createdObjectId);
      }
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
