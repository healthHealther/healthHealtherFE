import React from "react";
import { useRecoilValue } from "recoil";
import { communityState } from "../../common";
export default function CommunitySearchBar() {
  const communityList = useRecoilValue(communityState);
  return <div></div>;
}
