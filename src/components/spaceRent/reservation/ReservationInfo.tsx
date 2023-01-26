import React from "react";

interface ReservationInfoProps {
  title: string;
  price: number;
  openTime: number;
  closeTime: number;
}

export default function ReservationInfo({
  title,
  price,
  openTime,
  closeTime,
}: ReservationInfoProps) {
  return (
    <article className="max-w-[435px] min-w-[280px] mt-[26px] mb-20 bg-content-box-gray rounded-[8px] text-content text-content-box-text-gray mx-5">
      <div className="px-5 py-5">
        <h4>{title}</h4>
        <div className="flex justify-between mt-[6px] pb-[6px] border-b">
          <p>시간당 가격</p> <p>{price}원</p>
        </div>
        <div className="flex justify-between mt-3">
          <p>예약 가능 시작 시간</p>
          <p>
            {openTime < 12 ? "오전" : "오후"} {openTime}시
          </p>
        </div>
        <div className="flex justify-between mt-[6px]">
          <p>예약 가능 종료 시간</p>
          <p>
            {closeTime < 12 ? "오전" : "오후"} {closeTime}시
          </p>
        </div>
      </div>
    </article>
  );
}
