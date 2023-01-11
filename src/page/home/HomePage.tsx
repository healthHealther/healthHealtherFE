import React from "react";
import BoardContentPreview from "../../components/community/BoardContentPreview";
import SpaceContentPreview from "../../components/spaceRent/SpaceContentPreview";
import CategoryLink from "./CategoryLink";
import BannerCarousel from "./BannerCarousel";

export default function HomePage() {
  return (
    <div>
      <BannerCarousel />
      <CategoryLink />
      <SpaceContentPreview />
      <BoardContentPreview />
    </div>
  );
}
