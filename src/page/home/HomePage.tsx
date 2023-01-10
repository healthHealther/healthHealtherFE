import React from "react";
import { Link, useLocation } from "react-router-dom";
import BoardContentPreview from "../../components/community/BoardContentPreview";
import SpaceContentPreview from "../../components/spaceRent/SpaceContentPreview";
import CategoryLink from "./CategoryLink";
import BannerCarousel from "./BannerCarousel";

export default function HomePage() {
  return (
    <div>
      <div className="max-w-[475px] min-w-[390px] sm:mx-auto mt-[48px]">
        <BannerCarousel />
        <CategoryLink />
        <SpaceContentPreview />
        <BoardContentPreview />
      </div>
    </div>
  );
}
