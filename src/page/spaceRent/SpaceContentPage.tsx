import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GetSpaceContentDetail from "../../components/spaceRent/GetSpaceContentDetail";
import SpaceContentDetail from "../../components/spaceRent/content/SpaceContentDetail";
import { useRecoilState } from "recoil";
import { spaceContentDetailState } from "../../common";
import SpaceRentBtn from "../../components/spaceRent/SpaceRentBtn";

import { homeGymInfo, submitHomeGymInfo } from "../../interface/space";

export default function SpaceContentPage() {
  const [spaceContentDetail, setSpaceContentDetail] =
    useState<submitHomeGymInfo>({
      spaceId: 0,
      memberId: "",
      title: "",
      content: "",
      address: "",
      addressDetail: "",
      spaceTypes: [],
      convenienceTypes: [],
      notice: "",
      rule: "",
      price: 0,
      images: [],
      openTime: 0,
      closeTime: 0,
      discountAmount: 0,
      amount: 0,
      openDate: new Date(),
      expiredDate: new Date(),
    });
  const [spaceContentDetailInfo, setSpaceContentDetailInfo] = useRecoilState(
    spaceContentDetailState
  );

  const [spaceRentParams] = useSearchParams();
  const query = spaceRentParams.get("id");

  useEffect(() => {
    query !== null &&
      GetSpaceContentDetail({
        setSpaceContentDetail,
        query,
        setSpaceContentDetailInfo,
      });
  }, [query]);

  return (
    <article className="w-full pb-14">
      <SpaceContentDetail />
    </article>
  );
}
