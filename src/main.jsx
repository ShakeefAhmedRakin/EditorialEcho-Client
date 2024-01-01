import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// PUBLIC
import PublicRoot from "./pages/Public/PublicRoot";
import PublicHome from "./pages/Public/PublicHome/PublicHome";

const router = createBrowserRouter([
  // PUBLIC
  {
    path: "/",
    element: <PublicRoot></PublicRoot>,
    children: [
      {
        path: "/",
        element: <PublicHome></PublicHome>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
