import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Onboarding from "./components/Onboarding.tsx";
import Login from "./components/auth/Login.tsx";
import SignUp from "./components/auth/SignUp.tsx";
import Home from "./components/Home.tsx";
// import { AuthProvider } from "./context/AuthContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/home",
    element: <Home />,
    errorElement: <p>404 Not Found</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
