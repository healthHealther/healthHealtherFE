import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import { homeGymInfo } from "../../interface/space";

interface GetSpaceContentDetailProps {
  setSpaceContentDetail: Dispatch<SetStateAction<homeGymInfo>>;
  query: string;
}

export default async function GetSpaceContentDetail({
  setSpaceContentDetail,
  query,
}: GetSpaceContentDetailProps) {
  const { data } = await axios.get<homeGymInfo>(
    `http://localhost:3001/${query}`
  );

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
