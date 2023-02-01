import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
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
// import LoginRedirect from "./page/login/LoginRedirect";
import SpaceRegisterPage from "./page/spaceRent/SpaceRegisterPage";
import CommunityRegisterPage from "./page/community/CommunityRegisterPage";
import SpaceReservation from "./page/spaceRent/SpaceReservation";
import InputMemberInfo from "./page/login/InputMemberInfo";
import Spinner from "./components/Spinner";
const LoginRedirect = lazy(() => import("./page/login/LoginRedirect"));
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
        path: "spaceContent",
        element: <SpaceContentPage />,
      },
      {
        path: "/community",
        element: <CommunityPage />,
      },
      {
        path: "/community/:boardContentId",
        element: <CommunityContentPage />,
      },
      {
        path: "/community/register",
        element: <CommunityRegisterPage />,
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
      {
        path: "/spaceRegister",
        element: <SpaceRegisterPage />,
      },
      {
        path: "/spaceReservation",
        element: <SpaceReservation />,
      },
    ],
    errorElement: <NotFound />,
  },

  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/login/callback/kakao",
    element: <LoginRedirect />,
  },
  {
    path: "/login/callback/google",
    element: <LoginRedirect />,
  },
  {
    path: "/login/signUp",
    element: <InputMemberInfo />,
  },
  // {
  //   path: '/signUp/kakao',
  //   element:
  // }
]);

// if (process.env.NODE_ENV === "development") {
//   worker.start();
// }
const bodyTag = document.body;
bodyTag.className = "bg-home bg-no-repeat bg-fixed bg-cover bg-center";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <RecoilRoot>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  </>
);
