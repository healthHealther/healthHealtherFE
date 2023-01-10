import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import TopBar from "./components/TopBar";
export default function Root() {
  const bodyTag = document.body;
  bodyTag.className = "bg-home bg-no-repeat bg-fixed bg-cover bg-center";
  return (
    <div>
      <TopBar />
      <Outlet />
      <ScrollToTop />
      <NavBar />
    </div>
  );
}
