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

interface ReservationCouponProps {
  control: Control<SpaceReservationForm>;
  spaceId: number;
  setSelectedCoupon: Dispatch<React.SetStateAction<string>>;
}

export default function ReservationCoupon({
  control,
  spaceId,
  setSelectedCoupon,
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
  const [couponInfo, setCouponInfo] = useState<couponType>({
    spaceId: 0,
    discountAmount: 0,
    openDate: "",
    expiredDate: "",
    amount: 0,
  });

  useEffect(() => {
    getCoupon({ spaceId, setCouponInfo });
  }, []);

  useEffect(() => {
    couponInfo.spaceId !== 0 &&
      setSelectOption([
        {
          value: couponInfo.spaceId,
          label: `${couponInfo.discountAmount}원 쿠폰`,
        },
      ]);
  }, [couponInfo]);

  return (
    <article className="max-w-[435px] min-w-[280px] mx-5">
      <h4 className="mt-6 text-content-box-text-gray mb-2">쿠폰</h4>
      <Controller
        name="coupon"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={selectOption}
            value={selectOption.find(
              (c: { value: unknown }) => c.value === value
            )}
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
