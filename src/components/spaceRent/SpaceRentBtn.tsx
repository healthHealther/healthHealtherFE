import React from "react";

interface SpaceRentBtnProps {
  rentTime: number;
}

export default function SpaceRentBtn() {
  return (
    <div className="mx-auto pb-5 w-[calc(100%-40px)] left-0 right-0 ]bottom-5  ">
      <button className="w-full h-12 bg-selected-green rounded-[8px] font-bold text-base text-white">
        예약하기
      </button>
    </div>
  );
}
