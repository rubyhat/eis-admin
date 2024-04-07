import { axiosBaseWrap } from "../../../configs/AxiosConfig";
import { FeedbackOrder } from "../store";

export const apiFeedbackOrdersModule = {
  fetchFeedbacks(params: string) {
    return axiosBaseWrap
      .get(`/orders/feedback?${params}`)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  updateFeedback(feedback: FeedbackOrder) {
    return axiosBaseWrap
      .put("/orders/feedback/" + feedback._id, feedback)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  deleteFeedbackOrderById(_id: string) {
    return axiosBaseWrap
      .delete("/orders/feedback/" + _id)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
