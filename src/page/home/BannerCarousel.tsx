import React, { useState, useEffect } from "react";
import bannerImg from "../../assets/banner_1.png";
import { Link } from "react-router-dom";
export default function BannerCarousel() {
  const [bannerIndex, setBannerIndex] = useState(0);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      bannerIndex === 2 ? setBannerIndex(0) : setBannerIndex(bannerIndex + 1);
    }, 4000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [bannerIndex]);
  return (
    <div className="px-[20px] relative mb-[32px]">
      {/* 캐러샐 컨테이너 */}
      <div className="w-full flex overflow-hidden">
        <Link
          className={`duration-300 min-w-full ${
            bannerIndex === 0
              ? ""
              : bannerIndex === 1
              ? "[transform:translateX(-100%)]"
              : "[transform:translateX(-200%)]"
          } `}
          to={"/event"}
        >
          <img src={bannerImg} alt="" />
        </Link>
        <Link
          className={`duration-300 min-w-full ${
            bannerIndex === 0
              ? ""
              : bannerIndex === 1
              ? "[transform:translateX(-100%)]"
              : "[transform:translateX(-200%)]"
          } `}
          to={"/event"}
        >
          <img src={bannerImg} alt="" />
        </Link>
        <Link
          className={`duration-300 min-w-full ${
            bannerIndex === 0
              ? ""
              : bannerIndex === 1
              ? "[transform:translateX(-100%)]"
              : "[transform:translateX(-200%)]"
          } `}
          to={"/event"}
        >
          <img src={bannerImg} alt="" />
        </Link>
      </div>
      {/* 인디케이터 컨테이너 */}
      <div className="absolute bottom-[5px] w-[22px] h-[4px] flex left-[calc(50%-11px)] ">
        <button
          className={`flex w-[5px] h-[5px] bg-white rounded-[100%] mx-[1px] ${
            bannerIndex === 0 ? "" : "opacity-60"
          }`}
          onClick={() => {
            setBannerIndex(0);
          }}
        ></button>
        <button
          className={`flex w-[5px] h-[5px] bg-white rounded-[100%] mx-[1px] ${
            bannerIndex === 1 ? "" : "opacity-60"
          }`}
          onClick={() => {
            setBannerIndex(1);
          }}
        ></button>
        <button
          className={`flex w-[5px] h-[5px] bg-white rounded-[100%] mx-[1px] ${
            bannerIndex === 2 ? "" : "opacity-60"
          }`}
          onClick={() => {
            setBannerIndex(2);
          }}
        ></button>
      </div>
    </div>
  );
}
