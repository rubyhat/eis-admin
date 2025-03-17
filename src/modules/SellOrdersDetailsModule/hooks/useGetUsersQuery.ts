import { useAxiosQuery } from "../../../configs/RQT/useAxiosQuery";
import { apiFetchAllUsers } from "../../../shared/api";

export const useGetUsersQuery = () => {
  return useAxiosQuery({
    queryFn: () => apiFetchAllUsers.fetchAllUsers(),
    queryKey: ["usersItems"],
  });
};
