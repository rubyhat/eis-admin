import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useAxiosMutation } from "../../../configs/RQT/useAxiosMutation";
import { apiFeedbackOrdersModule } from "../../FeedbackOrdersModule/api";
import { FeedbackOrder } from "../../FeedbackOrdersModule/store";

export const useUpdateFeedbackMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useAxiosMutation({
    mutationFn: (filteredData: FeedbackOrder) =>
      apiFeedbackOrdersModule.updateFeedback(filteredData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["feedback-orders"] });
      toast.success("Заявка успешно обновлена!");
      navigate("/orders/feedback");
    },
    onError() {
      toast.error("Извините, произошла ошибка, обратитесь в тех. поддержку.");
    },
  });
};
