import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GetSpaceContentDetail from "../../components/spaceRent/GetSpaceContentDetail";
import SpaceContentDetail from "../../components/spaceRent/content/SpaceContentDetail";
import SpaceRentBtn from "../../components/spaceRent/SpaceRentBtn";

import { homeGymInfo } from "../../interface/space";

export default function SpaceContentPage() {
  const [spaceContentDetail, setSpaceContentDetail] = useState<homeGymInfo>({
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
  });
  const [spaceRentParams] = useSearchParams();
  const query = spaceRentParams.get("id");

  const [rentTime, setRentTime] = useState<number>(0);

  useEffect(() => {
    query !== null && GetSpaceContentDetail({ setSpaceContentDetail, query });
  }, [query]);
  return (
    <article className="w-full pb-14">
      <SpaceContentDetail spaceContentDetail={spaceContentDetail} />
    </article>
  );
}
