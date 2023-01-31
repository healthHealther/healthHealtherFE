import React, { useState } from "react";
import CommunityContents from "./CommunityContents";
import CommunitySearchBar from "./CommunitySearchBar";
export interface contentType {
  boardId: number;
  nickName: string;
  title: string;
  content: string;
  commentCount: number;
}
export default function CommunityPage() {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchContext, setSearchContext] = useState("");
  const [communityContentList, setCommunityContentList] = useState<
    contentType[]
  >([]);

  return (
    <div className="relative">
      <CommunitySearchBar
        searchActive={searchActive}
        setSearchActive={setSearchActive}
        searchContext={searchContext}
        setSearchContext={setSearchContext}
        setCommunityContentList={setCommunityContentList}
      />
      <CommunityContents
        searchActive={searchActive}
        searchContext={searchContext}
        communityContentList={communityContentList}
        setCommunityContentList={setCommunityContentList}
      />
    </div>
  );
}
