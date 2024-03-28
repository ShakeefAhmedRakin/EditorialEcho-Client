import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUsersCount = ({
  filter,
  currentPage,
  itemsPerPage,
  searchName,
}) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading: usersLoading,
    refetch: refetchUsers,
    isRefetching: isRefetchingUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manage/get-users?filter=${filter}&page=${currentPage}&size=${itemsPerPage}&search=${searchName}`
      );
      return res.data;
    },
  });

  return { users, usersLoading, refetchUsers, isRefetchingUsers };
};

export default useGetUsersCount;
