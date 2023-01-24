import React from "react";
import ReservationCoupon from "../../components/spaceRent/reservation/ReservationCoupon";
import ReservationInfo from "../../components/spaceRent/reservation/ReservationInfo";
import ReservationPrice from "../../components/spaceRent/reservation/ReservationPrice";
import ReservationTimeSelect from "../../components/spaceRent/reservation/ReservationTimeSelect";

export default function SpaceReservation() {
  return (
    <div>
      <h1 className="text-xl mx-5 font-bold pt-8">홈짐 예약</h1>
      <ReservationInfo />
      <ReservationTimeSelect />
      <ReservationCoupon />
      <ReservationPrice />
    </div>
  );
}
