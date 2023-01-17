import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import ScrollTopWhenMovePage from "./components/ScrollTopWhenMovePage";
import ScrollToTop from "./components/ScrollToTop";
import TopBar from "./components/TopBar";
export default function Root() {
  return (
    <div className="relative max-w-[475px] min-w-[390px] sm:mx-auto mt-[48px] bg-white min-h-[90vh]">
      <ScrollTopWhenMovePage />
      <TopBar />
      <Outlet />
      <ScrollToTop />
      <NavBar />
    </div>
  );
}
