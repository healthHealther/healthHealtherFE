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
  const { data } = await axios.get<homeGym[]>(`http://localhost:3001/${query}`);
  console.log(data[0]);
  setSpaceContentDetail({
    space_id: data[0].space_id,
    member_id: data[0].member_id,
    title: data[0].title,
    content: data[0].content,
    address: data[0].address,
    detail_address: data[0].detail_address,
    spaceType: data[0].spaceType,
    convenienceTypes: data[0].convenienceTypes,
    note: data[0].note,
    rule: data[0].rule,
    price: data[0].price,
    urls: data[0].urls,
    openTime: data[0].openTime,
    closeTime: data[0].closeTime,
  });
}
