import React, { Dispatch, useEffect } from "react";

import { homeGym } from "../../interface/space";

import infomationIcon from "../../assets/infomationIcon.svg";
import Coupon from "./SpaceCoupon";
import SpaceRule from "./SpaceRule";
import DetailInfo from "./SpaceDetailInfo";
import ViewMap from "./SpaceMap";
import Review from "./SpaceReview";
import NewReview from "./NewReview";
import SpaceConvenience from "./SpaceConvenience";

interface SpaceContentDetailProps {
  spaceContentDetail: homeGym;
}

export default function SpaceContentDetail({
  spaceContentDetail,
}: SpaceContentDetailProps) {
  //   useEffect(() => {}, [spaceContentDetail]);

  return (
    <div className="">
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
      <div className="w-full h-1 bg-neutral-100 mt-8" />
      <SpaceConvenience />
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 mt-8" />
      {/* 쿠폰 */}
      {spaceContentDetail.spaceId && <Coupon id={spaceContentDetail.spaceId} />}

      {/* 정책 내용 영역 */}
      <SpaceRule />
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 mt-8" />

      {/* 상세 내용 영역 */}
      <DetailInfo />
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 mt-8" />

      {/* 지도 영역 */}
      <ViewMap />
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 mt-8" />

      {/* 리뷰 영역 */}
      <Review />
      {/* 구역 나눔 선 */}
      {/* <NewReview spaceId={spaceContentDetail.spaceId} /> */}
    </div>
  );
}
