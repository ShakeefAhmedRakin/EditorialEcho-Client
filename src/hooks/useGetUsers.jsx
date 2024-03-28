import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUsersCount = ({ filter, currentPage, itemsPerPage }) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manage/get-users?filter=${filter}&page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });

  return { users, usersLoading, refetchUsers };
};

export default useGetUsersCount;
