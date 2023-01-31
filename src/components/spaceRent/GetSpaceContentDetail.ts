import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { spaceContentDetailState } from "../../common";
import { homeGymInfo, submitHomeGymInfo } from "../../interface/space";
import { baseUrl } from "../common/common";

interface GetSpaceContentDetailProps {
  setSpaceContentDetail: Dispatch<SetStateAction<submitHomeGymInfo>>;
  query: string;
  setSpaceContentDetailInfo: SetterOrUpdater<submitHomeGymInfo>;
}

export default async function GetSpaceContentDetail({
  setSpaceContentDetail,
  query,
  setSpaceContentDetailInfo,
}: GetSpaceContentDetailProps) {
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const { data } = await axios.get<submitHomeGymInfo>(
    `${baseUrl}/spaces/${query}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(data);

  setSpaceContentDetailInfo(data);

  setSpaceContentDetail({
    spaceId: data.spaceId,
    memberId: data.memberId,
    title: data.title,
    content: data.content,
    address: data.address,
    addressDetail: data.addressDetail,
    spaceTypes: data.spaceTypes,
    convenienceTypes: data.convenienceTypes,
    notice: data.notice,
    rule: data.rule,
    price: data.price,
    images: data.images,
    openTime: data.openTime,
    closeTime: data.closeTime,
    discountAmount: data.discountAmount,
    amount: data.amount,
    openDate: data.openDate,
    expiredDate: data.expiredDate,
  });
}
