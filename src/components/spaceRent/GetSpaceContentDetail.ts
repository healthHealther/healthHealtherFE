import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { spaceContentDetailState } from "../../common";
import { homeGymInfo } from "../../interface/space";

interface GetSpaceContentDetailProps {
  setSpaceContentDetail: Dispatch<SetStateAction<homeGymInfo>>;
  query: string;
  setSpaceContentDetailInfo: SetterOrUpdater<homeGymInfo>;
}

export default async function GetSpaceContentDetail({
  setSpaceContentDetail,
  query,
  setSpaceContentDetailInfo,
}: GetSpaceContentDetailProps) {
  const { data } = await axios.get<homeGymInfo>(
    `http://localhost:3001/${query}`
  );

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
  });
}
