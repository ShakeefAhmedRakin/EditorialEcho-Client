import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetProducts = ({ filter, currentPage, itemsPerPage, searchName }) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: products = [],
    isLoading: productsLoading,
    refetch: refetchProducts,
    isRefetching: isRefetchingProducts,
  } = useQuery({
    queryKey: ["manage-product"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manage/get-products?filter=${filter}&page=${currentPage}&size=${itemsPerPage}&search=${searchName}`
      );
      return res.data;
    },
  });

  return { products, productsLoading, refetchProducts, isRefetchingProducts };
};

export default useGetProducts;
