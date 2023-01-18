import React, { Dispatch, useEffect } from "react";

import { homeGym } from "../../interface/space";

import infomationIcon from "../../assets/infomationIcon.svg";
import Coupon from "./Coupon";

interface SpaceContentDetailProps {
  spaceContentDetail: homeGym;
}

export default function SpaceContentDetail({
  spaceContentDetail,
}: SpaceContentDetailProps) {
  //   useEffect(() => {}, [spaceContentDetail]);

  return (
    <div className="flex flex-col">
      {/* 메인 사진 */}

      <div
        style={{
          backgroundImage: `url("${spaceContentDetail.urls[0].url}")`,
        }}
        className="w-full h-[270px] bg-no-repeat bg-cover bg-center bg-origin-padding"
      ></div>
      {/* 제목 영역 */}
      <div className="ml-5 mt-8">
        {/* 운동 타입 */}
        <div className="flex gap-1">
          {spaceContentDetail.spaceType.map((item: string) => (
            <p className="flex w-[49px] h-[30px] bg-detail-spaceType-bg-green text-detail-spaceType-font-green items-center justify-center rounded-[8px] text-sm ">
              {item}
            </p>
          ))}
        </div>
        {/* 회원 아이디 */}
        <div className="flex gap-1 text-m mt-4">
          <span className="font-bold">{spaceContentDetail.memberId}</span>
          <span>님의 홈짐</span>
        </div>
        {/* 제목 */}
        <div className="mt-1">
          <span className="text-xl font-bold">{spaceContentDetail.title}</span>
        </div>
        {/* 가격 */}
        <div>
          <span className="text-sm font-bold mt-4 text-homeGymPrice-green">
            {spaceContentDetail.price}원
          </span>
        </div>
      </div>
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 mt-8" />
      {/* 쿠폰 */}
      {spaceContentDetail.spaceId && <Coupon id={spaceContentDetail.spaceId} />}

      {/* 상세 내용 영역 */}
      <div className="flex flex-col gap-4 ml-5 mt-[27px]">
        {/* 제목2 */}
        <div className="flex gap-3 items-center text-base">
          <img src={infomationIcon} alt="상세내용" />
          <span>상세 설명</span>
        </div>
        {/* 예약 가능 시간 */}
        <div></div>
        {/* 상세주소 */}
        <div className="flex flex-col">
          <span className="text-neutral-400">위치</span>
          <span>{spaceContentDetail.detailAddress}</span>
        </div>
        {/* 내용 */}
        <div className="flex flex-col">
          <span className="text-neutral-400">내용</span>
          <span>{spaceContentDetail.content}</span>
        </div>
        {/* 편의사항 */}
        <div className="flex flex-col">
          <span className="text-neutral-400">편의사항</span>
          <span>{spaceContentDetail.note}</span>
        </div>
        {/* 규칙 */}
        <div className="flex flex-col ">
          <span className="text-neutral-400">규칙</span>
          <span>{spaceContentDetail.rule}</span>
        </div>
      </div>
    </div>
  );
}
