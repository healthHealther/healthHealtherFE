import React from "react";
import { Link } from "react-router-dom";
import SpaceContents from "./SpaceContentsList";

export default function SpaceContentPreview() {
  return (
    <article className="mx-[20px]">
      <div className="flex h-[24px] justify-between ">
        <div className="text-lg font-bold">오늘의 홈짐 추천</div>
        <Link to={"/spaceRent"} className="flex items-center">
          <span className="text-sm">더보기</span>
          <p className="w-[6px] h-[6px] border-t-2 border-r-2 border-solid border-black origin-center rotate-45"></p>
        </Link>
      </div>
      <SpaceContents />
    </article>
  );
}
