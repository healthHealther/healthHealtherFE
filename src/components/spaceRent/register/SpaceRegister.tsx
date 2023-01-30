import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import InputTitle from "./InputTitle";
import TextAreaContent from "./TextAreaContent";
import InputAddress from "./InputAddress";
import RegisterSelectBox from "./RegisterSelectBox";
import InputPrice from "./InputPrice";
import SelectTime from "./SelectTime";
import ImageUpload from "./ImageUpload";
import RegisterBtn from "./RegisterBtn";

import { homeGymInfo } from "../../../interface/space";
import SelectCoupon from "./SelectCoupon";
import OpenExpiredDate from "./OpenExpiredDate";

export default function SpaceRegister() {
  const methods = useForm<homeGymInfo>();
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;

  const [imgPreviewOnOff, setImgPreviewOnOff] = useState<boolean>(false);

  const { watch, handleSubmit, control } = methods;

  const watchAllFields = watch([
    "title",
    "content",
    "address",
    "addressDetail",
    "spaceTypes",
    "convenienceTypes",
    "notice",
    "rule",
    "price",
    "images",
    "closeTime",
    "openTime",
  ]);

  useEffect(() => {
    imgPreviewOnOff === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [imgPreviewOnOff]);

  const [finish, setFinish] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    watchAllFields.filter(
      (item) =>
        item === "" ||
        item === undefined ||
        (item as Array<string>).length === 0
    ).length === 0
      ? setFinish(true)
      : setFinish(false);
  }, [watchAllFields]);

  const onSubmit = async (data: homeGymInfo) => {
    try {
      await axios.post(
        `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/spaces`,
        {
          title: data.title,
          content: data.content,
          address: data.address,
          addressDetail: data.addressDetail,
          convenienceTypes: data.convenienceTypes,
          notice: data.notice,
          rule: data.rule,
          price: data.price,
          images: data.images,
          openTime: data.openTime,
          closeTime: data.closeTime,
          spaceTypes: data.spaceTypes,
          discountAmount: data.discountAmount,
          amount: data.amount,
          openDate: data.openDate.toISOString().split("T")[0],
          expiredDate: data.expiredDate.toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate("/spaceRent");
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  // 운동 타입 객체
  const objectSpaceType = [
    { value: "AEROBIC", label: "유산소" },
    { value: "ANAEROBIC", label: "무산소" },
    { value: "PILATES", label: "필라테스" },
    { value: "GX", label: "GX" },
  ];

  // 편의 시설 객체
  const objectConvenienceType = [
    { value: "SHOWER", label: "샤워" },
    { value: "PARKING", label: "주차시설" },
    { value: "CHANGINGROOM", label: "탈의실" },
    { value: "FULLBODYMIROR", label: "전신거울" },
    { value: "WIFI", label: "와이파이" },
    { value: "FOOD", label: "음식물반입여부" },
    { value: "SCALE", label: "체중계" },
    { value: "TOWEL", label: "수건" },
  ];

  return (
    <div
      className={`w-full min-w-[280px]  mx-auto mt-[26px] pb-10 ${
        imgPreviewOnOff ? "overflow-y-hidden" : ""
      }`}
    >
      <h1 className="text-xl mx-5 font-bold pt-8">홈짐 등록</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          {/* 제목 입력 */}
          <InputTitle />

          {/* 내용 */}
          <TextAreaContent spaceType="content" spaceTypeTitle="내용" />

          {/* 주소 */}
          <InputAddress />

          <OpenExpiredDate control={control} />

          {/* 편의사항 */}
          <RegisterSelectBox
            option={objectConvenienceType}
            placeholder="편의사항을 선택해주세요"
            spaceType="convenienceTypes"
            spaceTypeTitle="편의사항"
          />

          {/* 공지사항 */}
          <TextAreaContent spaceType="notice" spaceTypeTitle="공지사항" />

          {/* 이용규칙 */}
          <TextAreaContent spaceType="rule" spaceTypeTitle="이용규칙" />

          {/* 가격  */}
          <InputPrice control={control} />

          {/* 시간 입력 */}
          <SelectTime />

          {/* 공간 타입 */}
          <RegisterSelectBox
            option={objectSpaceType}
            placeholder="공간타입을 선택해주세요"
            spaceType="spaceTypes"
            spaceTypeTitle="공간타입"
          />

          {/* 쿠폰 */}
          <SelectCoupon />

          {/* 사진 입력 */}
          <ImageUpload
            setImgPreviewOnOff={setImgPreviewOnOff}
            imgPreviewOnOff={imgPreviewOnOff}
          />

          <RegisterBtn finish={finish} />
        </form>
      </FormProvider>
    </div>
  );
}
