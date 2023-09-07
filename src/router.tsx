import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import Review from "./page/Review";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/review",
    element: <Review />,
  },
]);

export default router;
