import React from "react";
import SpaceContentsList from "../../components/spaceRent/SpaceContentsList";
import SpaceType from "../../components/spaceRent/SpaceType";

// 공간대여 목록 페이지
export default function SpaceRentPage() {
  return (
    <div className="relative mb-12 px-[20px]">
      <SpaceType />
      <div className="flex flex-wrap gap-x-[12px]  gap-y-[24px] w-full  mx-auto mt-3">
        <SpaceContentsList />
      </div>
    </div>
  );
}
