import React, { useState, useEffect, useRef } from "react";
import searchIcon from "../../assets/searchIcon.png";
import { contentType } from "./CommunityPage";
export interface setSearchProps {
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchContext: React.Dispatch<React.SetStateAction<string>>;
  setCommunityContentList: React.Dispatch<React.SetStateAction<contentType[]>>;
  searchContext: string;
  searchActive: boolean;
}
export default function CommunitySearchBar(props: setSearchProps) {
  const {
    setSearchActive,
    setSearchContext,
    setCommunityContentList,
    searchContext,
    searchActive,
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const handleSearchBtn = () => {
    if (typeof ref.current?.value === "string") {
      const value = ref.current.value;
      if (value.length > 0 && searchContext !== value) {
        setCommunityContentList([]);
        setSearchActive(true);
        setSearchContext(value);
      }
      if (value.length === 0 && searchActive) {
        setCommunityContentList([]);
        setSearchActive(false);
        setSearchContext("");
      }
    }
  };
  return (
    <div className="px-[20px] pt-[20px]">
      <div className="min-w-[284px] max-w-[435px] px-[16px] py-[9px] flex items-center bg-[#fbfbfb] rounded-2xl">
        <button className="mr-[6px]" type="button" onClick={handleSearchBtn}>
          <img src={searchIcon} alt="" />
        </button>
        <input
          ref={ref}
          className="bg-transparent outline-none placeholder:text-[16px] w-full"
          type="text"
          placeholder="찾고싶은 게시글을 검색해보세요!"
          onKeyDown={(e) => {
            e.key === "Enter" ? handleSearchBtn() : null;
          }}
        />
      </div>
    </div>
  );
}
