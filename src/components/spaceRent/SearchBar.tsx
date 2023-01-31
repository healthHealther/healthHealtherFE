import React from "react";
import { useFormContext } from "react-hook-form";
import { inputStyle, maxWidth } from "./register/style";
import searchIcon from "../../assets/search.png";

export default function SearchBar() {
  const { register } = useFormContext();
  return (
    <div className="">
      <div className="relative w-full h-full">
        <button type="submit" className="absolute top-[43px] left-5">
          <img src={searchIcon} alt="search" />
        </button>
        <input
          type="text"
          {...register("search")}
          placeholder="찾고 싶은 홈짐을 검색해보세요!"
          className="w-full h-13 px-12 mt-8 py-[9px] border rounded-xl"
        />
      </div>
    </div>
  );
}
