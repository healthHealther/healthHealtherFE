import React, { useEffect } from "react";
import axios from "axios";
import { couponType } from "../../interface/space";
import { useRecoilState } from "recoil";
import { coupon } from "../../common";

import giftIcon from "../../assets/giftIcon.png";

interface couponProps {
  id: number;
}
export default function Coupon({ id }: couponProps) {
  const [couponInfo, setCouponInfo] = useRecoilState(coupon);

  const getCoupon = async () => {
    try {
      const { data } = await axios.get<couponType>(
        `http://localhost:3001/coupon/${id}`
      );

      setCouponInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = async () => {
    try {
      const { data } = await axios.put(`http://localhost:3001/coupon/${id}`, {
        ...couponInfo,
        amount: couponInfo.amount - 1,
      });
      setCouponInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoupon();
  }, [couponInfo.amount]);

  return (
    <section>
      {/* 쿠폰 */}
      {couponInfo.spaceId && (
        <div className="flex items-center justify-between mx-5 h-16 ">
          <div className="flex items-center gap-2">
            <img src={giftIcon} alt="쿠폰" />
            <p className="font-bold">{couponInfo.discountAmount}원</p>
            <p>할인 쿠폰</p>
            <p className="text-neutral-300 text-sm">
              {couponInfo.amount}매 남음
            </p>
          </div>
          <button
            onClick={onClickHandler}
            className="bg-selected-green text-white h-9 w-[72px] rounded-[8px]"
          >
            다운받기
          </button>
        </div>
      )}

      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 " />
    </section>
  );
}
