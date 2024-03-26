import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { isAdmin, firebaseLoading, mongoLoading } = useAdmin();
  const navigate = useNavigate();

  if (firebaseLoading || mongoLoading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isAdmin) {
    return children;
  }

  return (
    <div className="h-screen flex flex-col gap-y-2 justify-center items-center font-heading text-center px-2">
      <h1 className="text-red-500 font-bold text-4xl">Access Denied</h1>
      <p className="text-lg">
        Sorry, you do not have permission to access this page.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="btn bg-primary hover:bg-primary text-white max-w-sm w-full mt-4"
      >
        Go Back
      </button>
    </div>
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
