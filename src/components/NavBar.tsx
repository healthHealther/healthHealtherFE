import React from "react";
import { Link } from "react-router-dom";
import reservationListIcon from "../assets/reservation-list.svg";
interface pageTitleProps {
  pageTitle: "home" | "spaceRent" | "community" | "myPage";
}
export default function NavBar(props: pageTitleProps) {
  const currentPage = props.pageTitle;
  return (
    <div className="fixed mx-auto left-0 right-0 bottom-0 max-w-[744px] min-w-[390px] flex justify-around ">
      <Link
        to={"/"}
        className={`${
          currentPage === "home" ? "text-green-300" : "text-black"
        } w-[24] h-[39] flex justify-center items-center flex-col`}
      >
        <div>
          <img src={reservationListIcon} alt="홈" className="w-full" />
        </div>
        <p className="text-xs ">홈</p>
      </Link>
      <Link
        to={"/spaceRent"}
        className={`${
          currentPage === "spaceRent" ? "text-green-300" : "text-black"
        } w-[24] h-[39] flex justify-center items-center flex-col`}
      >
        <div>
          <img src={reservationListIcon} alt="예약" />
        </div>
        <p className="text-xs ">예약</p>
      </Link>
      <Link
        to={"/community"}
        className={`${
          currentPage === "community" ? "text-green-300" : "text-black"
        } w-[24] h-[39] flex justify-center items-center flex-col`}
      >
        <div>
          <img src={reservationListIcon} alt="커뮤니티" />
        </div>
        <p className="text-xs ">커뮤니티</p>
      </Link>
      <Link
        to={"/myPage"}
        className={`${
          currentPage === "myPage" ? "text-green-300" : "text-black"
        } w-[24] h-[39] flex justify-center items-center flex-col`}
      >
        <div>
          <img src={reservationListIcon} alt="내정보" />
        </div>
        <p className="text-xs ">내정보</p>
      </Link>
    </div>
  );
}
