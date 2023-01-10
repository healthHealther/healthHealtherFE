import React from "react";
import { Link } from "react-router-dom";
import BoardContentPreview from "../../components/community/BoardContentPreview";
import SpaceContentPreview from "../../components/spaceRent/SpaceContentPreview";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import CategoryLink from "./CategoryLink";
import BannerCarousel from "./BannerCarousel";

export default function HomePage() {
  return (
    <div>
      <TopBar pageTitle="home" />
      <div className="max-w-[475px] min-w-[390px] sm:mx-auto mt-[48px]">
        <BannerCarousel />
        <CategoryLink />
        <SpaceContentPreview />
        <BoardContentPreview />
      </div>
      <NavBar pageTitle={"home"} />
    </div>
  );
}
