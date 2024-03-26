import useUserInfo from "./useUserInfo";

const useAdmin = () => {
  const { userInfo, firebaseLoading, mongoLoading } = useUserInfo();
  let isAdmin = false;

  if (userInfo.userInfo?.role === "admin") {
    isAdmin = true;
  }
  return { isAdmin, firebaseLoading, mongoLoading };
};

export default useAdmin;
