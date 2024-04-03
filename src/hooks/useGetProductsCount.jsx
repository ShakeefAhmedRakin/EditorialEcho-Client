import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetProductsCount = ({ filter, searchName }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: productsCount = { count: 0 },
    isLoading: countLoading,
    refetch: refetchCount,
  } = useQuery({
    queryKey: ["manage-products-count"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manage/get-products/count?filter=${filter}&search=${searchName}`
      );
      return res.data;
    },
  });

  return { productsCount, countLoading, refetchCount };
};

export default useGetProductsCount;
