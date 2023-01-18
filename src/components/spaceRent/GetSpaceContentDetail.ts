import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import { homeGym } from "../../interface/space";

interface GetSpaceContentDetailProps {
  setSpaceContentDetail: Dispatch<SetStateAction<homeGym>>;
  query: string;
}

export default async function GetSpaceContentDetail({
  setSpaceContentDetail,
  query,
}: GetSpaceContentDetailProps) {
  const { data } = await axios.get<homeGym>(
    `http://localhost:3001/space/${query}`
  );

  setSpaceContentDetail({
    spaceId: data.spaceId,
    memberId: data.memberId,
    title: data.title,
    content: data.content,
    address: data.address,
    detailAddress: data.detailAddress,
    spaceType: data.spaceType,
    convenienceTypes: data.convenienceTypes,
    note: data.note,
    rule: data.rule,
    price: data.price,
    urls: data.urls,
    openTime: data.openTime,
    closeTime: data.closeTime,
  });
}
