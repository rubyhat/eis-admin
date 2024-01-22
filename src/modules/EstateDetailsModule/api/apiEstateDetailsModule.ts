import { axiosBaseWrap } from "../../../configs/AxiosConfig";

export const apiEstateDetailsModule = {
  deleteEstate(id: string) {
    return axiosBaseWrap.delete("/catalog", { params: { id: id } });
  },
};
