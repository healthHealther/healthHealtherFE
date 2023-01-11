import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import TopBar from "./components/TopBar";
export default function Root() {
  const bodyTag = document.body;
  bodyTag.className = "bg-home bg-no-repeat bg-fixed bg-cover bg-center";
  return (
    <div className="max-w-[475px] min-w-[390px] sm:mx-auto mt-[48px] bg-white">
      <TopBar />
      <Outlet />
      <ScrollToTop />
      <NavBar />
    </div>
  );
}
