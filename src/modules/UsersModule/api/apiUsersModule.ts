import { axiosBaseWrap } from "../../../configs/AxiosConfig";

export const apiUsersModule = {
  fetchAllUsers() {
    return axiosBaseWrap
      .get("/users")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },
};
