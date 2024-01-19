import { axiosBaseWrap } from "../../../configs/AxiosConfig";

export const apiCreateEstateModule = {
  createObject() {
    return axiosBaseWrap.post("");
  },
};
