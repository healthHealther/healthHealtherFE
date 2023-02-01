import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { couponType } from "../../interface/space";
import { useRecoilState } from "recoil";
import { coupon } from "../../common";

import giftIcon from "../../assets/giftIcon.png";
import { baseUrl } from "../common/common";

interface couponProps {
  id: number;
}

interface responseData {
  code: number;
  errorSimpleName: string;
  msg: string;
  timestamp: string;
}
export default function Coupon({ id }: couponProps) {
  const [couponInfo, setCouponInfo] = useRecoilState<couponType>(coupon);
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;

  // const getCouponData = async () => {
  //   try {
  //     const { data } = await axios.get(`${baseUrl}/coupon/${id}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });

  //     // setCouponInfo(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onClickHandler = async () => {
    try {
      await axios
        .put(`${baseUrl}/coupon/download/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => console.log(res));
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      if (response) {
        const responseInfo = response.data as responseData;
        responseInfo.errorSimpleName === "AlreadyDownloadCouponException" &&
          alert(responseInfo.msg);

        "AlreadySoldOutCouponException" && alert(responseInfo.msg);
      }
    }
  };

  // useEffect(() => {
  //   getCouponData();
  // }, [couponInfo.amount]);

  return (
    <section>
      {/* 쿠폰 */}
      {/* {couponInfo.spaceId && ( */}
      <div className="flex items-center justify-between mx-5 h-16 ">
        <div className="flex items-center gap-2">
          <img src={giftIcon} alt="쿠폰" />
          {/* <p className="font-bold">{couponInfo.discountAmount}원</p> */}
          <p>할인 쿠폰</p>
          {/* <p className="text-neutral-300 text-sm">
            {couponInfo.amount > 0 ? `${couponInfo.amount}매 남음` : "매진"}
          </p> */}
        </div>
        <button
          onClick={onClickHandler}
          className={`bg-selected-green text-white h-9 w-[72px] rounded-[8px] `}
          // disabled={couponInfo.amount === 0}
        >
          다운받기
        </button>
      </div>
      {/* )} */}

      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 " />
    </section>
  );
}
