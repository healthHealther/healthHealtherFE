import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SpaceContentsList from "../../components/spaceRent/SpaceContentsList";
import SpaceType from "../../components/spaceRent/SpaceType";

// 공간대여 목록 페이지
export default function SpaceRentPage() {
  const [spaceType, setSpaceType] = useState<string>("");
  const [spaceRentParams] = useSearchParams();
  const query = spaceRentParams.get("spaceType");
  return (
    <div className="relative pb-12 px-[20px]">
      <SpaceType setSpaceType={setSpaceType} />
      <div className="flex flex-wrap gap-x-[12px]  gap-y-[24px] w-full  mx-auto mt-3">
        <SpaceContentsList />
      </div>
    </div>
  );
}
