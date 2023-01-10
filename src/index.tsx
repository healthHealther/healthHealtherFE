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
import SpaceContentPage from "./page/spaceRent/SpaceContentPage";
import path from "path";
import CommunityContentPage from "./page/community/CommunityContentPage";

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
    path: "spaceContent/:spaceContentId",
    element: <SpaceContentPage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "community/:boardContentId",
    element: <CommunityContentPage />,
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
