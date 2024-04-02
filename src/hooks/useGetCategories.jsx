import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetCategories = () => {
  const axiosSecure = useAxiosSecure();
  const { data: categories = [], refetch: refetchCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manage/get-categories`);
      return res.data;
    },
  });

  return { categories, refetchCategories };
};

export default useGetCategories;
