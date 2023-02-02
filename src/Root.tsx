import React from "react";
import { Outlet } from "react-router-dom";
import CreateNewContentBtn from "./components/CreateNewContentBtn";
import NavBar from "./components/NavBar";
import ScrollTopWhenMovePage from "./components/ScrollTopWhenMovePage";
import ScrollToTop from "./components/ScrollToTop";
import TokenRefresh from "./components/TokenRefresh";
import TopBar from "./components/TopBar";
export default function Root() {
  return (
    <div className="relative max-w-[475px] min-w-[390px] sm:mx-auto mt-[48px] bg-white min-h-[90vh]">
      {/* <TokenRefresh /> */}
      <ScrollTopWhenMovePage />
      <TopBar />
      <Outlet />
      <ScrollToTop />
      <CreateNewContentBtn />
      <NavBar />
    </div>
  );
}
