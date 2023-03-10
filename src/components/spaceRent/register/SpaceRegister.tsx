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

import { homeGymInfo, submitHomeGymInfo } from "../../../interface/space";
import SelectCoupon from "./SelectCoupon";
import OpenExpiredDate from "./OpenExpiredDate";
import { baseUrl } from "../../common/common";
import ConfirmPopUp from "../../ConfirmPopUp";
import ConfirmPopUpPortal from "../../ConfirmPopUpPortal";

export default function SpaceRegister() {
  const methods = useForm<submitHomeGymInfo>();
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
    "discountAmount",
    "amount",
  ]);

  useEffect(() => {
    imgPreviewOnOff === true
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [imgPreviewOnOff]);

  const [finish, setFinish] = useState<boolean>(false);
  const [filled, setFilled] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    watchAllFields.filter(
      (item) =>
        item === "" ||
        item === undefined ||
        item === Number(NaN) ||
        (item as Array<string>).length === 0
    ).length === 0
      ? setFinish(true)
      : setFinish(false);
  }, [watchAllFields]);

  useEffect(() => {
    watchAllFields.filter(
      (item) =>
        item === "" ||
        item === undefined ||
        item === Number(NaN) ||
        (item as Array<string>).length === 0
    ).length < 12
      ? setFilled(true)
      : setFilled(false);
  }, [watchAllFields]);

  const onSubmit = async (data: submitHomeGymInfo) => {
    try {
      await axios
        .post(
          `${baseUrl}/spaces`,
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
        )
        .then(() => {
          navigate("/spaceRent");
        });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ?????? ?????? ??????
  const objectSpaceType = [
    { value: "AEROBIC", label: "?????????" },
    { value: "ANAEROBIC", label: "?????????" },
    { value: "PILATES", label: "????????????" },
    { value: "GX", label: "GX" },
  ];

  // ?????? ?????? ??????
  const objectConvenienceType = [
    { value: "SHOWER", label: "??????" },
    { value: "PARKING", label: "????????????" },
    { value: "CHANGINGROOM", label: "?????????" },
    { value: "FULLBODYMIROR", label: "????????????" },
    { value: "WIFI", label: "????????????" },
    { value: "FOOD", label: "?????????????????????" },
    { value: "SCALE", label: "?????????" },
    { value: "TOWEL", label: "??????" },
  ];

  return (
    <div
      className={`w-full min-w-[280px]  mx-auto mt-[26px] pb-10 ${
        imgPreviewOnOff ? "overflow-y-hidden" : ""
      }`}
    >
      <ConfirmPopUpPortal active={filled} />
      <h1 className="text-xl mx-5 font-bold pt-8">?????? ??????</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          {/* ?????? ?????? */}
          <InputTitle />

          {/* ?????? */}
          <TextAreaContent spaceType="content" spaceTypeTitle="??????" />

          {/* ?????? */}
          <InputAddress />

          <OpenExpiredDate control={control} />

          {/* ???????????? */}
          <RegisterSelectBox
            option={objectConvenienceType}
            placeholder="??????????????? ??????????????????"
            spaceType="convenienceTypes"
            spaceTypeTitle="????????????"
          />

          {/* ???????????? */}
          <TextAreaContent spaceType="notice" spaceTypeTitle="????????????" />

          {/* ???????????? */}
          <TextAreaContent spaceType="rule" spaceTypeTitle="????????????" />

          {/* ??????  */}
          <InputPrice control={control} />

          {/* ?????? ?????? */}
          <SelectTime />

          {/* ?????? ?????? */}
          <RegisterSelectBox
            option={objectSpaceType}
            placeholder="??????????????? ??????????????????"
            spaceType="spaceTypes"
            spaceTypeTitle="????????????"
          />

          {/* ?????? */}
          <SelectCoupon />

          {/* ?????? ?????? */}
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
