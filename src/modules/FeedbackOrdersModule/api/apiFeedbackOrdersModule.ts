import { axiosBaseWrap } from "../../../configs/AxiosConfig";

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
};
