import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { homeGymInfo } from "../../../interface/space";
import Portal from "../../../Portal";
import { inputStyle, subTitleStyle } from "./style";

export default function SelectCoupon() {
  const { register, setValue, getValues } = useFormContext<homeGymInfo>();
  const [couponModal, setCouponModal] = useState<boolean>(false);
  const [couponText, setCouponText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    couponModal === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [couponModal]);

  useEffect(() => {
    Number(getValues("discountAmount")) > 0 &&
      setCouponText(
        `${String(getValues("discountAmount")).replace(
          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
          ","
        )}원 할인 쿠폰 - ${getValues("amount")}매`
      );
    Number(getValues("discountAmount")) === 0 && setCouponText("");
  }, [getValues("discountAmount"), getValues("amount")]);

  return (
    <div>
      <p className={subTitleStyle}>쿠폰</p>
      <div className="mt-2 mx-5 flex gap-2">
        <input
          type="text"
          placeholder="쿠폰을 등록하세요"
          className="w-[80%] h-11 border rounded-lg p-[10px] bg-black/[.03]"
          readOnly
          onClick={() => setCouponModal(!couponModal)}
          value={couponText}
        />
        <button
          type="button"
          className="w-[20%] rounded-lg h-11 bg-homeGymPrice-green text-white"
          onClick={() => {
            setCouponModal(!couponModal);
          }}
        >
          등록
        </button>
      </div>
      {couponModal && (
        <Portal setState={setCouponModal} state={couponModal}>
          <div className="relative z-[9999]">
            <div className="w-[280px] h-[360px] bg-white flex flex-col pt-8 pb-5 px-5 rounded-lg">
              <h4 className="font-bold text-lg">쿠폰 등록</h4>
              <p className={`${subTitleStyle} mx-0`}>할인가격</p>
              <input
                className={inputStyle}
                placeholder="할인 가격을 입력해주세요."
                type="number"
                {...register("discountAmount", { min: 1, valueAsNumber: true })}
              />
              <p className={`${subTitleStyle} mx-0`}>쿠폰수량</p>
              <input
                className={inputStyle}
                placeholder="쿠폰 수량을 입력해주세요."
                type="number"
                {...register("amount", { min: 1, valueAsNumber: true })}
              />
              {error && (
                <p className="text-base text-red-500 mt-2">
                  가격과 수량을 입력하세요
                </p>
              )}
              <div className="mt-4">
                <button
                  type="button"
                  className="w-[20%] rounded-lg h-11 bg-homeGymPrice-green text-white float-right"
                  onClick={() => {
                    if (
                      getValues("amount") > 0 &&
                      getValues("discountAmount") > 0
                    ) {
                      setError(false);
                      setCouponModal(!couponModal);
                    } else {
                      setError(!error);
                    }
                  }}
                >
                  등록
                </button>
                <button
                  type="button"
                  className="w-[20%] rounded-lg h-11 border text-[#8B8B8B] float-right mr-2"
                  onClick={() => {
                    setCouponModal(!couponModal);
                    setValue("discountAmount", 0);
                    setValue("amount", 0);
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
