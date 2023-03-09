import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFound from "../components/NotFound";
import UserProtected from "./UserProtected";

const Home = lazy(() => import("../modules/Home"));
const Movie = lazy(() => import("../modules/Movie"));
const Auth = lazy(() => import("../modules/Auth"));
const Signin = lazy(() => import("../modules/Auth/Signin"));
const Signup = lazy(() => import("../modules/Auth/Signup"));
const Booking = lazy(() => import("../modules/Booking"));
const UserInfo = lazy(() => import("../modules/UserInfo"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      //Home
      { index: true, element: <Home /> },

      //Movie
      { path: "/movie/:movieId", element: <Movie /> },

      //Booking
      {
        path: "/booking/:maLichChieu",
        element: (
          <UserProtected>
            <Booking />
          </UserProtected>
        ),
      },

      //Authen
      {
        path: "",
        element: <Auth />,
        children: [
          //Sign in
          { path: "/signin", element: <Signin /> },

          //Sign up
          { path: "/signup", element: <Signup /> },
        ],
      },

      //User Info
      {
        path: "/account",
        element: (
          <UserProtected>
            <UserInfo />
          </UserProtected>
        ),
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default routes;
