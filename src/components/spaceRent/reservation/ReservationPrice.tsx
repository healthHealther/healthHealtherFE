import React from "react";
import { useRecoilValue } from "recoil";
import { couponLabelState } from "../../../common";
import { couponType } from "../../../interface/space";

interface ReservationPriceProps {
  price: number;
  selectedCoupon: string;
}

export default function ReservationPrice({
  price,
  selectedCoupon,
}: ReservationPriceProps) {
  const couponLabel = useRecoilValue<couponType>(couponLabelState);

  return (
    <article className="max-w-[435px] min-w-[280px] mx-5 mb-[200px]">
      <h4 className="mt-6 text-content-box-text-gray mb-2">결제 금액</h4>
      <div className="font-bold text-homeGymPrice-green text-xl float-right">
        {selectedCoupon !== "" ? (
          <div className="flex items-center gap-2">
            <p className="text-content text-[#A5A5A5]">
              {price}원 - {couponLabel.discountAmount}원(할인)
            </p>
            {price - couponLabel.discountAmount}원
          </div>
        ) : (
          <p>{price}원</p>
        )}
      </div>
    </article>
  );
}
