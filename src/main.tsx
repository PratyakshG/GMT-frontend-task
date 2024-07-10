import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Onboarding from "./pages/Onboarding.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";

const router = createBrowserRouter([
  {
    path: "/onboarding",
    element: <Onboarding />,
    errorElement: <p>404 Not Found</p>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <p>404 Not Found</p>,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <p>404 Not Found</p>,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <p>404 Not Found</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
