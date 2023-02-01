import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import StarRating from "react-svg-star-rating";

import informationIcon from "../../assets/informationIcon.png";
import { reviewState } from "../../common";
import GetSpaceReview from "./GetSpaceReview";
import NewReview from "./NewReview";
import { review } from "../../interface/space";
import { useSearchParams } from "react-router-dom";

interface ReviewProps {
  spaceId: number;
}

export default function SpaceReview() {
  const [review, setReview] = useRecoilState<review[]>(reviewState);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [param] = useSearchParams();
  const spaceId = param.get("id");

  useEffect(() => {
    spaceId && GetSpaceReview({ setReview, spaceId });
  }, []);

  useEffect(() => {
    review && review.map((item) => setTotalCount(totalCount + item.grade));
  }, [review]);

  let starCount = 0;
  review.map((item) => {
    starCount += item.grade;
  });

  return (
    <section className="w-full max-w-[435px] min-w-[280px] mx-auto mt-[26px] mb-20">
      <div className="flex gap-3 items-center text-base">
        <img src={informationIcon} alt="상세내용" />
        <span className="flex gap-1 ml-3 after:w-[1px] after:h-2 after:bg-[#C4C4C4] after:m-auto after:mx-3">
          리뷰{" "}
          <p className="text-homeGymPrice-green font-bold">{review.length}</p>
        </span>
        {/* 별점 */}
        <div className="flex items-center gap-2 text-star-yellow font-bold">
          <p>{review.length ? totalCount / review.length : 0}</p>
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
          <div className="mt-[25px] pb-4  border-b" key={item.content}>
            <span className="flex gap-1 items-center text-base text-star-yellow font-bold">
              {item.grade}
              <StarRating
                isReadOnly
                size={15}
                initialRating={item.grade}
                containerClassName="flex"
              />
            </span>
            <p className="mt-[9px]">{item.content}</p>
          </div>
        ))}
      </div>

      {spaceId && <NewReview spaceId={spaceId} />}
    </section>
  );
}
