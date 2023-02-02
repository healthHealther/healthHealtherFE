import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { coupon, spaceContentDetailLabelState } from "../../common";
import ReservationCoupon from "../../components/spaceRent/reservation/ReservationCoupon";
import ReservationInfo from "../../components/spaceRent/reservation/ReservationInfo";
import ReservationPrice from "../../components/spaceRent/reservation/ReservationPrice";
import ReservationTimeSelect from "../../components/spaceRent/reservation/ReservationTimeSelect";
import SpaceRentBtn from "../../components/spaceRent/SpaceRentBtn";

import {
  couponType,
  homeGymInfo,
  submitHomeGymInfo,
} from "../../interface/space";
import axios from "axios";
import { baseUrl } from "../../components/common/common";

interface SpaceReservationForm {
  date: Date;
  reservationTime: number;
  coupon: couponType;
}

export default function SpaceReservation() {
  const { handleSubmit, control } = useForm<SpaceReservationForm>();
  const [selectedCoupon, setSelectedCoupon] = useState<string>("");
  // const [couponInfo, setCouponInfo] = useRecoilState<couponType>(coupon);
  const [couponInfo, setCouponInfo] = useState<couponType[]>([]);

  const navigate = useNavigate();
  const spaceContentDetailLabel = useRecoilValue<submitHomeGymInfo>(
    spaceContentDetailLabelState
  );

  const spaceId = spaceContentDetailLabel.spaceId;

  // 새로고침해서 state 값이 비어있으면 페이지 뒤로가기
  const goback = () => {
    navigate(-1);
  };

  useEffect(() => {
    spaceId === 0 && goback();
  }, []);
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const onSubmit = async (formData: any) => {
    console.log(formData.reservationTime.value);
    try {
      await axios
        .post(
          `${baseUrl}/reservations`,
          {
            spaceId: spaceContentDetailLabel.spaceId,
            couponId: couponInfo[0].couponId,
            reservationDate: formData.date
              .toISOString()
              .split("T")[0] as string,
            reservationTime: formData.reservationTime.value,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          console.log(res);
          navigate("/spaceRent");
        });
      // const { data } = await axios.put(
      //   `${baseUrl}/coupon/${spaceContentDetailLabel.spaceId}`,
      //   {
      //     ...couponInfo,
      //     amount:
      //       selectedCoupon !== "" ? couponInfo.amount - 1 : couponInfo.amount,
      //   }
      // );
      // setCouponInfo(data);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("selectedCoupon", selectedCoupon);
  return (
    <section className="w-full mt-[26px] pb-10 min-h-[214px]">
      <h1 className="text-xl font-bold pt-8 mx-5">홈짐 예약</h1>
      <ReservationInfo
        title={spaceContentDetailLabel.title}
        price={spaceContentDetailLabel.price}
        openTime={spaceContentDetailLabel.openTime}
        closeTime={spaceContentDetailLabel.closeTime}
      />
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 mt-6" />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 날짜 선택 */}
        <ReservationTimeSelect control={control} />

        {/* 구역 나눔 선 */}
        <div className="w-full h-1 bg-neutral-100 mt-8" />
        <ReservationCoupon
          control={control}
          spaceId={spaceContentDetailLabel.spaceId}
          setSelectedCoupon={setSelectedCoupon}
          couponInfo={couponInfo}
          setCouponInfo={setCouponInfo}
        />
        <ReservationPrice
          couponInfo={couponInfo}
          price={spaceContentDetailLabel.price}
          selectedCoupon={selectedCoupon}
        />
        <SpaceRentBtn />
      </form>
    </section>
  );
}
