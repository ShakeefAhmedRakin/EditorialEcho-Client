import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading: isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      if (user) {
        try {
          const res = await axiosSecure.get(`/get-user/${user.uid}`);
          return { userInfo: res.data };
        } catch (error) {
          return { userInfo: {} };
        }
      } else {
        return { userInfo: {} };
      }
    },
    enabled: !!user,
  });

  return { userInfo, firebaseLoading: loading, mongoLoading: isLoading };
};

export default useUserInfo;
