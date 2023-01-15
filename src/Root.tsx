import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import TopBar from "./components/TopBar";
export default function Root() {
  const bodyTag = document.body;
  bodyTag.className =
    "bg-home bg-no-repeat bg-fixed bg-cover bg-center overflow-x-hidden";
  return (
    <div className="relative max-w-[475px] min-w-[390px] sm:mx-auto pt-[48px] bg-white  min-h-[100vh]">
      <TopBar />
      <Outlet />
      <ScrollToTop />
      <NavBar />
    </div>
  );
}
