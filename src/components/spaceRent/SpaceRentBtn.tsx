import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SpaceRentBtnProps {
  price: number;
  openTime: number;
  closeTime: number;
}

export default function SpaceRentBtn({}) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-10 mx-auto pb-5 max-w-[435px] left-0 right-0 bottom-5  ">
      {location.pathname !== "/spaceReservation" ? (
        <button
          type="button"
          className="w-full h-12 bg-selected-green rounded-[8px] font-bold text-base text-white"
          onClick={() => navigate("/spaceReservation")}
        >
          예약하기
        </button>
      ) : (
        <button
          type="submit"
          className="w-full h-12 bg-selected-green rounded-[8px] font-bold text-base text-white"
        >
          예약하기
        </button>
      )}
    </div>
  );
}
