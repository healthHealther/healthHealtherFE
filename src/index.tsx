import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./page/home/HomePage";
import SpaceRentPage from "./page/spaceRent/SpaceRentPage";
import CommunityPage from "./page/community/CommunityPage";
import MyPage from "./page/myPage/MyPage";
import LoginPage from "./page/login/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/spaceRent",
    element: <SpaceRentPage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "/myPage",
    element: <MyPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
