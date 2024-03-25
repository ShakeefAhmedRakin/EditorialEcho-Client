import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// PUBLIC
import PublicRoot from "./pages/Public/PublicRoot";
import Home from "./pages/Public/Home/Home";
import Explore from "./pages/Public/Explore/Explore";
import Register from "./pages/Public/Register/Register";
import Login from "./pages/Public/Login/Login";

const router = createBrowserRouter([
  // PUBLIC
  {
    path: "/",
    element: <PublicRoot></PublicRoot>,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
