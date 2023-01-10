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
import CommunityContentPage from "./page/community/CommunityContentPage";
import Root from "./Root";
import NotFound from "./components/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
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
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFound />,
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
