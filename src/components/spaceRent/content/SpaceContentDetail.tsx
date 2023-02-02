import React, { Dispatch, useEffect } from "react";

import { homeGymInfo } from "../../../interface/space";

import infomationIcon from "../../assets/infomationIcon.svg";
import Coupon from "../SpaceCoupon";
import SpaceRule from "./SpaceRule";
import DetailInfo from "./SpaceDetailInfo";
import ViewMap from "./SpaceMap";
import SpaceReview from "../SpaceReview";
import NewReview from "../NewReview";
import SpaceConvenience from "./SpaceConvenience";
import SpaceRentBtn from "../SpaceRentBtn";
import axios from "axios";
import { baseUrl } from "../../common/common";
import { useRecoilState } from "recoil";
import { spaceContentDetailState, spaceIdState } from "../../../common";
import { useSearchParams } from "react-router-dom";

export default function SpaceContentDetail() {
  //   useEffect(() => {}, [spaceContentDetail]);

  const [spaceIdParam] = useSearchParams();
  const [spaceId, setSpaceId] = useRecoilState(spaceIdState);
  const [spaceContentDetailInfo, setSpaceContentDetailInfo] = useRecoilState(
    spaceContentDetailState
  );

  useEffect(() => {
    spaceIdParam.get("id") !== null &&
      setSpaceId(Number(spaceIdParam.get("id")));
  }, []);

  // useEffect(() => {
  //   getSpaceDetailData();
  // }, [spaceId]);

  const spaceTypeArr = [
    { value: "유산소", type: "AEROBIC" },
    { value: "무산소", type: "ANAEROBIC" },
    { value: "필라테스", type: "PLIATES" },
    { value: "GX", type: "GX" },
  ];

  return (
    <div className="">
      {/* 메인 사진 */}
      <div
        style={{
          backgroundImage: `url("${spaceContentDetailInfo.images[0]}")`,
        }}
        className="w-full h-[270px] bg-no-repeat bg-cover bg-center bg-origin-padding"
      ></div>
      {/* 제목 영역 */}
      <div className="ml-5 mt-8">
        {/* 운동 타입 */}
        <div className="flex gap-1">
          {spaceContentDetailInfo.spaceTypes.map((item: string) => {
            const type = spaceTypeArr.filter((data) => data.type === item);
            return (
              <p
                className="flex p-2 h-[30px] bg-detail-spaceType-bg-green text-detail-spaceType-font-green items-center justify-center rounded-[8px] text-sm "
                key={item}
              >
                {type[0].value}
              </p>
            );
          })}
        </div>
        {/* 회원 아이디 */}
        {/* <div className="flex gap-1 text-m mt-4">
          <span className="font-bold">{spaceContentDetailInfo.memberId}</span>
          <span>님의 홈짐</span>
        </div> */}
        {/* 제목 */}
        <div className="mt-4">
          <span className="text-xl font-bold">
            {spaceContentDetailInfo.title}
          </span>
        </div>
        {/* 가격 */}
        <div className="mt-4">
          <span className="text-lg font-bold text-homeGymPrice-green">
            {spaceContentDetailInfo.price}원
          </span>
        </div>
      </div>
      <div className="w-full h-1 bg-neutral-100 mt-8" />
      <SpaceConvenience convenience={spaceContentDetailInfo.convenienceTypes} />
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100" />
      {/* 쿠폰 */}
      {spaceContentDetailInfo.spaceId && (
        <Coupon id={spaceContentDetailInfo.spaceId} />
      )}

      {/* 정책 내용 영역 */}
      <SpaceRule
        rule={spaceContentDetailInfo.rule}
        openTime={spaceContentDetailInfo.openTime}
        closeTime={spaceContentDetailInfo.closeTime}
      />
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 mt-8" />

      {/* 상세 내용 영역 */}
      <DetailInfo
        content={spaceContentDetailInfo.content}
        images={spaceContentDetailInfo.images}
      />
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 mt-8" />

      {/* 지도 영역 */}
      {spaceContentDetailInfo.address && (
        <ViewMap
          address={spaceContentDetailInfo.address}
          addressDetail={spaceContentDetailInfo.addressDetail}
        />
      )}
      {/* 구역 나눔 선 */}
      <div className="w-full h-1 bg-neutral-100 mt-8" />

      {/* 리뷰 영역 */}
      <SpaceReview />
      {/* 구역 나눔 선 */}
      {/* <NewReview spaceId={spaceContentDetail.spaceId} /> */}
      <SpaceRentBtn />
    </div>
  );
}
