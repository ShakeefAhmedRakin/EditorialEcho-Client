import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUsersCount = ({ filter, searchName }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: usersCount = { count: 0 },
    isLoading: countLoading,
    refetch: refetchCount,
  } = useQuery({
    queryKey: ["users-count"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manage/get-users/count?filter=${filter}&search=${searchName}`
      );
      return res.data;
    },
  });

  return { usersCount, countLoading, refetchCount };
};

export default useGetUsersCount;
