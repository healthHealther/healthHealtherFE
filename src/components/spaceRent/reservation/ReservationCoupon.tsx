import React, { Dispatch, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import Select from "react-select";
import { couponType } from "../../../interface/space";
import getCoupon from "../GetCoupon";

interface SpaceReservationForm {
  date: Date;
  reservationTime: number;
  coupon: couponType;
}

interface label {
  value: number;
  label: string;
}

interface ReservationCouponProps {
  control: Control<SpaceReservationForm>;
  spaceId: number;
  setSelectedCoupon: Dispatch<React.SetStateAction<string>>;
  couponInfo: couponType[];
  setCouponInfo: React.Dispatch<React.SetStateAction<couponType[]>>;
}

export default function ReservationCoupon({
  control,
  spaceId,
  setSelectedCoupon,
  couponInfo,
  setCouponInfo,
}: ReservationCouponProps) {
  const [selectOption, setSelectOption] = useState<
    [
      {
        value: number;
        label: string;
      }
    ]
  >([
    {
      value: 0,
      label: "",
    },
  ]);

  useEffect(() => {
    getCoupon({ spaceId, setCouponInfo });
  }, []);

  useEffect(() => {
    couponInfo[0]?.couponId !== 0 &&
      setSelectOption([
        {
          value: couponInfo[0]?.couponId,
          label: `${couponInfo[0]?.discountAmount}원 쿠폰`,
        },
      ]);
  }, [couponInfo]);
  console.log("couponinfo", couponInfo[0]);
  return (
    <article className="max-w-[435px] min-w-[280px] mx-5">
      <h4 className="mt-6 text-content-box-text-gray mb-2">쿠폰</h4>
      <Controller
        name="coupon"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            isDisabled={
              couponInfo[0]?.discountAmount === undefined ? true : false
            }
            options={selectOption}
            value={selectOption.find((c: { value: number; label: string }) => {
              console.log("c.value", c.value);
              return c.value === spaceId;
            })}
            onChange={(val) => {
              onChange(val);
              setSelectedCoupon(val?.label as string);
            }}
            styles={{
              control: (base) => ({
                ...base,
                border: `1px soild`,
                height: "44px",
              }),
              option: (base) => ({
                ...base,
                border: `1px dotted`,
                height: "100%",
              }),
            }}
            placeholder="쿠폰을 선택해주세요."
          />
        )}
      />
    </article>
  );
}
