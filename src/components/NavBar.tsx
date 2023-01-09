import React from "react";
import { Link } from "react-router-dom";
import communtiyOffIcon from "../assets/community_off.svg";
import communtiyOnIcon from "../assets/community_on.svg";
import homeOffIcon from "../assets/home_off.svg";
import homeOnIcon from "../assets/home_on.svg";
import mypageOffIcon from "../assets/mypage_off.svg";
import mypageOnIcon from "../assets/mypage_on.svg";
import reservationListOffIcon from "../assets/reservation_list_off.svg";
import reservattionListOnIcon from "../assets/reservation_list_on.svg";
export interface pageTitleProps {
  pageTitle: "home" | "spaceRent" | "community" | "myPage" | "login";
}
export default function NavBar(props: pageTitleProps) {
  const currentPage = props.pageTitle;
  return (
    <nav className="fixed mx-auto left-0 right-0 bottom-0 max-w-[475px] min-w-[320px] flex justify-around ">
      <Link
        to={"/"}
        className={`${
          currentPage === "home" ? "text-selected-green" : "text-black"
        } w-[24] h-[39] flex justify-center items-center flex-col`}
      >
        <div className="w-[24px] h-[24px]">
          <img
            src={currentPage === "home" ? homeOnIcon : homeOffIcon}
            alt="홈"
            className="w-full"
          />
        </div>
        <p className="text-xs ">홈</p>
      </Link>
      <Link
        to={"/spaceRent"}
        className={`${
          currentPage === "spaceRent" ? "text-selected-green" : "text-black"
        } w-[24] h-[39] flex justify-center items-center flex-col`}
      >
        <div className="w-[24px] h-[24px]">
          <img
            src={
              currentPage === "spaceRent"
                ? reservattionListOnIcon
                : reservationListOffIcon
            }
            alt="예약"
          />
        </div>
        <p className="text-xs ">예약</p>
      </Link>
      <Link
        to={"/community"}
        className={`${
          currentPage === "community" ? "text-selected-green" : "text-black"
        } w-[24] h-[39] flex justify-center items-center flex-col`}
      >
        <div className="w-[24px] h-[24px]">
          <img
            src={
              currentPage === "community" ? communtiyOnIcon : communtiyOffIcon
            }
            alt="커뮤니티"
          />
        </div>
        <p className="text-xs ">커뮤니티</p>
      </Link>
      <Link
        to={"/myPage"}
        className={`${
          currentPage === "myPage" ? "text-selected-green" : "text-black"
        } w-[24] h-[39] flex justify-center items-center flex-col`}
      >
        <div className="w-[24px] h-[24px]">
          <img
            src={currentPage === "myPage" ? mypageOnIcon : mypageOffIcon}
            alt="내정보"
          />
        </div>
        <p className="text-xs ">내정보</p>
      </Link>
    </nav>
  );
}
