import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StarRating from "react-svg-star-rating";
import { useRecoilState } from "recoil";
import { reviewState } from "../../common";

import { review } from "../../interface/space";
import { baseUrl } from "../common/common";
import GetSpaceReview from "./GetSpaceReview";

interface NewReviewProps {
  spaceId: string;
}

interface responseData {
  code: number;
  errorSimpleName: string;
  msg: string;
  timestamp: string;
}

export default function NewReview({ spaceId }: NewReviewProps) {
  const { register, handleSubmit, setValue, watch, resetField } =
    useForm<review>();
  const [review, setReview] = useRecoilState<review[]>(reviewState);
  const [rating, setRating] = useState<number>(0);
  const watchAllFields = watch();
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;

  const onSubmit = async (data: review) => {
    try {
      await axios
        .post(
          `${baseUrl}/review/`,
          {
            spaceId: spaceId,
            title: "후기",
            content: data.content,
            grade: Number(data.grade.toFixed(1)),
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(() => {
          resetField("content");
          GetSpaceReview({ setReview, spaceId });
        });
      setRating(0);
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      if (response) {
        const responseInfo = response.data as responseData;
        responseInfo.errorSimpleName === "AlreadyCreateReviewException" &&
          alert(responseInfo.msg);

        "AlreadySoldOutCouponException" && alert(responseInfo.msg);
      }
      console.log(error);
    }
  };
  const handleRating = (rate: number) => {
    setValue("grade", rate);
  };

  // 별점 최신화
  useEffect(() => {
    handleRating(rating);
  }, [rating]);

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
          className="p-[10px] resize-none break-words leading-[24px] min-h-[92px] w-[83%] border border-[#d9d9d9] rounded-[8px] mr-[10px] "
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
