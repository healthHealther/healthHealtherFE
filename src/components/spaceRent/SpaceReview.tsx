import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import StarRating from "react-svg-star-rating";

import informationIcon from "../../assets/informationIcon.png";
import { reviewState } from "../../common";
import GetSpaceReview from "./GetSpaceReview";
import NewReview from "./NewReview";

interface review {
  reviewId: number;
  content: string;
  star: number;
}

export default function Review() {
  const [review, setReview] = useRecoilState<review[]>(reviewState);

  const homeGymInfo = {
    spaceId: 1,
    title: "더스타핏 필라앤요가",
    content:
      "1. 오픈 1년이 된 프리미엄 급 기구 필라테스, 요가 스튜디오입니다. 2. 기구 필라테스 개인 룸 2개, 6:1 그룹 룸 - 타워 리포머 룸 1개, 바렐&체어 룸 1개 3. 요가룸 1개 – 최대 10명 이 이용할수 있는 공간 4. 여성 느낌의 휴게실과 개인 룸 형식의 부스룸 3개 편안하고 따뜻한 공간을 맘 편하게 이용하세요. 하남 미사 헬스장, 필라테스장, 요가원 대관 진행합니다. 많이들 오셔서 이용해주세요^^",
    address: "경기 하남시 망월동 979-1",
    addressDetail: "청담프라자 4층",
    convenienceTypes: ["SHOWER", "WIFI"],
    notice:
      "하남 미사 헬스장, 필라테스장, 요가원 대관 진행합니다. 많이들 오셔서 이용해주세요^^",
    rule: "1.사용하신 기구는 제자리에 놓아주세요. 2.센터 내에서 고객 영업은 불가능합니다. 3.비매너 무책임한 행동 금지 4.사전에 공지 없이 사용시 패널티 부과 (1회 요금의 10배 배상) 5. 토삭스,양말 또는 맨발 이용 6.시설,장비의 파손시 손해배상 청구",
    price: 30000,
    images: [
      "https://user-images.githubusercontent.com/64088250/212278869-00925805-a752-4ff1-a1e3-0719e0191ec9.png",
      "https://user-images.githubusercontent.com/64088250/212278828-9121d983-df26-4340-9e64-893f78cd6643.png",
    ],
    openTime: 9,
    closeTime: 22,
    spaceTypes: ["YOGA", "GX"],
  };

  const spaceId = homeGymInfo.spaceId;

  useEffect(() => {
    GetSpaceReview({ setReview, spaceId });
  }, []);

  let starCount = 0;
  review.map((item) => {
    starCount += item.star;
  });

  console.log(review);
  return (
    <section className="w-full max-w-[435px] min-w-[280px] mx-auto mt-[26px] mb-20">
      <div className="flex gap-3 items-center text-base">
        <img src={informationIcon} alt="상세내용" />
        <span className="flex gap-1 ml-3 after:w-[1px] after:h-2 after:bg-[#C4C4C4] after:m-auto after:mx-3">
          리뷰{" "}
          <p className="text-homeGymPrice-green font-bold">{review.length}</p>
        </span>
        {/* 별점 */}
        <div className="flex items-center gap-1 text-star-yellow font-bold">
          {(starCount / review.length).toFixed(1)}
          <StarRating
            isReadOnly
            size={15}
            initialRating={starCount / review.length}
            containerClassName="flex"
          />
        </div>
      </div>
      <div className="">
        {review.map((item: review) => (
          <div className="mt-[25px] pb-4  border-b">
            <span className="flex gap-1 items-center text-base text-star-yellow font-bold">
              {item.star.toFixed(1)}
              <StarRating
                isReadOnly
                size={15}
                initialRating={item.star}
                containerClassName="flex"
              />
            </span>
            <p className="mt-[9px]">{item.content}</p>
          </div>
        ))}
      </div>

      <NewReview spaceId={homeGymInfo.spaceId} length={review.length} />
    </section>
  );
}
