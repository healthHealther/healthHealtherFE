import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
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
import MyRent from "./page/myPage/myPageLink/MyRent";
import MyPost from "./page/myPage/myPageLink/MyPost";
import Notification from "./page/myPage/myPageLink/Notification";
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
      {
        path: "/myPage/notification",
        element: <Notification />,
      },
      {
        path: "/myPage/myRent",
        element: <MyRent />,
      },
      {
        path: "/myPage/myPost",
        element: <MyPost />,
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

// if (process.env.NODE_ENV === "development") {
//   worker.start();
// }

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </>
);
