import React from "react";

import infomationIcon from "../../../assets/infomationIcon.svg";

import { homeGymInfo } from "../../../interface/space";

interface SpaceRuleProps {
  rule: string;
  openTime: number;
  closeTime: number;
}

export default function SpaceRule({
  rule,
  openTime,
  closeTime,
}: SpaceRuleProps) {
  return (
    <section className="w-full max-w-[435px] min-w-[280px] mx-auto mt-[26px]">
      <div className="flex gap-3 items-center text-base ">
        <img src={infomationIcon} alt="상세내용" />
        <span>예약 정책</span>
      </div>

      <div className="w-full mt-[13px] bg-content-box-gray rounded-[8px]">
        <div className="w-full  p-5 text-content text-content-box-text-gray">
          <div className="border-b mb-2">
            <div className="flex mb-[6px] justify-between">
              <p>예약 가능 시작 시간</p>
              <p>
                {openTime < 12 ? `오전 ${openTime}` : `오후 ${openTime - 12}`}시
              </p>
            </div>
            <div className="flex mb-3 justify-between">
              <p>예약 가능 종료 시간</p>
              <p>
                {closeTime < 12 ? `오전 ${closeTime}` : `오후 ${closeTime}`}시
              </p>
            </div>
          </div>
          <div>
            <p className="mb-[6px]">이용규칙</p>
            <p>{rule}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
