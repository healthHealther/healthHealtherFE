import React from "react";
import { Link } from "react-router-dom";
import SpaceContentsList from "./SpaceContentsList";
import chevronIcon from "../../assets/chevron.svg";
export default function SpaceContentPreview() {
  return (
    <article className="px-[20px] mb-[40px]">
      <div className="flex h-[24px] justify-between ">
        <div className="text-lg font-bold">오늘의 홈짐 추천</div>
        <Link to={"/spaceRent"} className="flex items-center">
          <span className="text-sm">더보기</span>
          <div>
            <img src={chevronIcon} alt="" />
          </div>
        </Link>
      </div>
      <SpaceContentsList />
    </article>
  );
}
