import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GetSpaceContentDetail from "../../components/spaceRent/GetSpaceContentDetail";
import SpaceContentDetail from "../../components/spaceRent/SpaceContentDetail";
import SpaceRentBtn from "../../components/spaceRent/SpaceRentBtn";

import { homeGym } from "../../interface/space";

export default function SpaceContentPage() {
  const [spaceContentDetail, setSpaceContentDetail] = useState<homeGym>({
    space_id: 0,
    member_id: "",
    title: "",
    content: "",
    address: "",
    detail_address: "",
    spaceType: [],
    note: "",
    rule: "",
    price: 0,
    urls: [{ url: "" }],
  });
  const [spaceRentParams] = useSearchParams();
  const query = spaceRentParams.get("id");

  const [rentTime, setRentTime] = useState<number>(0);

  useEffect(() => {
    query !== null && GetSpaceContentDetail({ setSpaceContentDetail, query });
    console.log(spaceContentDetail);
  }, [query]);
  return (
    <article className="w-full pb-14">
      <SpaceContentDetail
        spaceContentDetail={spaceContentDetail}
        setRentTime={setRentTime}
      />
    </article>
  );
}
