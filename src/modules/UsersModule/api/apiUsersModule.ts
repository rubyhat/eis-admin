import { axiosBaseWrap } from "../../../configs/AxiosConfig";

export const apiUsersModule = {
  deleteUserById(_id: string) {
    return axiosBaseWrap
      .delete("/users/" + _id)
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
