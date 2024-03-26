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

// ADMIN COMPONENTS

const router = createBrowserRouter([
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
