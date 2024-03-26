import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
// TANSTACK
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

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

// ROUTES
// import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardHome from "./pages/Private/DashboardHome/DashboardHome";
import Profile from "./pages/Private/Profile/Profile";

// ADMIN COMPONENTS

const router = createBrowserRouter([
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

  // PUBLIC
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

  // PRIVATE
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardRoot></DashboardRoot>
      </PrivateRoute>
    ),
    children: [
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
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="bottom-right"></Toaster>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
