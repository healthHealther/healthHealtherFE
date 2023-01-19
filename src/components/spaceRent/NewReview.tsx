import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import StarRating from "react-svg-star-rating";
import { useRecoilState } from "recoil";
import { reviewState } from "../../common";

import { review } from "../../interface/space";
import GetSpaceReview from "./GetSpaceReview";

interface NewReviewProps {
  spaceId: number;
  length: number;
}

export default function NewReview({ spaceId, length }: NewReviewProps) {
  const { register, handleSubmit, setValue, watch, resetField } =
    useForm<review>();
  const [review, setReview] = useRecoilState<review[]>(reviewState);
  const [rating, setRating] = useState<number>(0);
  const watchAllFields = watch();
  const onSubmit = async (data: review) => {
    try {
      await axios
        .post(`http://localhost:3001/review`, {
          id: length + 1,
          content: data.content,
          star: Number(data.star.toFixed(1)),
        })
        .then(() => {
          resetField("content");
          GetSpaceReview({ setReview });
        });
      setRating(0);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRating = (rate: number) => {
    setValue("star", rate);
  };

  // 별점 최신화
  useEffect(() => {
    handleRating(rating);
  }, [rating]);
  console.log(rating);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full mt-5"
    >
      <StarRating
        unit="half"
        handleOnClick={handleRating}
        initialRating={rating}
        containerClassName="flex mb-2"
      />
      <div className="flex items-center">
        <textarea
          className="p-[10px] resize-none break-words leading-[24px] min-h-[92px] w-[83%] border border-[#d9d9d9] rounded-[8px] mr-[10px]"
          {...register("content", { required: true })}
        />
        <input
          type="submit"
          className={`text-white rounded-[8px] w-[14%] h-[92px] ${
            !watchAllFields.content
              ? "bg-[#c4c4c4]"
              : "bg-[#08bd9d] hover:bg-[#009d81]"
          }`}
          value="등록"
        />
      </div>
    </form>
  );
}
