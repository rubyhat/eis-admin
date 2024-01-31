import { axiosBaseWrap } from "../../../configs/AxiosConfig";

export const apiUserEdit = {
  editUser(data: FormData, id: string) {
    return axiosBaseWrap
      .patch("/users/" + id, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status >= 500) throw new Error("Ошибка сервера!");
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
