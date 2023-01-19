import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GetSpaceContentDetail from "../../components/spaceRent/GetSpaceContentDetail";
import SpaceContentDetail from "../../components/spaceRent/SpaceContentDetail";
import SpaceRentBtn from "../../components/spaceRent/SpaceRentBtn";

import { homeGym } from "../../interface/space";

export default function SpaceContentPage() {
  const [spaceContentDetail, setSpaceContentDetail] = useState<homeGym>({
    spaceId: 0,
    memberId: "",
    title: "",
    content: "",
    address: "",
    detailAddress: "",
    spaceType: [],
    convenienceTypes: [],
    note: "",
    rule: "",
    price: 0,
    urls: [{ url: "" }],
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
