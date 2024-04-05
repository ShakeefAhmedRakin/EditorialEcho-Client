import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
// TANSTACK
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

// AXIOS
import useAxiosPublic from "./hooks/useAxiosPublic";

// ROUTES
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";

// PUBLIC COMPONENTS
import PublicRoot from "./pages/Public/PublicRoot";
import Home from "./pages/Public/Home/Home";
import Explore from "./pages/Public/Explore/Explore";
import Register from "./pages/Public/Register/Register";
import Login from "./pages/Public/Login/Login";
import AuthProvider from "./providers/AuthProvider";
import ForgotPassword from "./pages/Public/ForgotPassword/ForgotPassword";
import Error from "./components/Error/Error";

// PRIVATE COMPONENTS
import DashboardRoot from "./pages/Private/DashboardRoot";
import DashboardHome from "./pages/Private/DashboardHome/DashboardHome";
import Account from "./pages/Private/Account/Account";

// ADMIN COMPONENTS
import ManageUsers from "./pages/Private/Admin/ManageUsers/ManageUsers";
import ManageProducts from "./pages/Private/Admin/ManageProducts/ManageProducts";
import AddProduct from "./pages/Private/Admin/AddProduct/AddProduct";
import EditProduct from "./pages/Private/Admin/EditProduct/EditProduct";
import { useEffect, useState } from "react";
import ServerDownError from "./components/Error/ServerDownError";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <PublicRoot></PublicRoot>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/explore",
        element: <Explore></Explore>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  // PRIVATE ROUTES
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardRoot></DashboardRoot>
      </PrivateRoute>
    ),
    children: [
      // PRIVATE ROUTES
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/account",
        element: (
          <PrivateRoute>
            <Account></Account>
          </PrivateRoute>
        ),
      },
      // ADMIN ROUTES
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-products",
        element: (
          <AdminRoute>
            <ManageProducts></ManageProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <AdminRoute>
            <AddProduct></AddProduct>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/edit-product/:id",
        element: (
          <AdminRoute>
            <EditProduct></EditProduct>
          </AdminRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  const axiosPublic = useAxiosPublic();

  const [serverDown, setServerDown] = useState(true);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axiosPublic("/health");
        if (!response.status === 200) {
          throw new Error("Server is down");
        }
        setServerDown(false);
      } catch (error) {
        setServerDown(true);
      }
    };

    checkServerStatus();

    // 10 sec interval
    const interval = setInterval(checkServerStatus, 10000);

    return () => clearInterval(interval);
  }, [axiosPublic]);

  return (
    <>
      {serverDown ? (
        <>
          <ServerDownError></ServerDownError>
        </>
      ) : (
        <>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Toaster richColors position="bottom-right"></Toaster>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </AuthProvider>
        </>
      )}
    </>
  );
};

export default App;
