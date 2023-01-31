import axios from "axios";
import React, { useCallback, useRef, useState, useEffect } from "react";
import InfinityScroll from "../../components/InfinityScroll";
import BoardContent from "../../components/home/BoardContent";
import { contentType } from "./CommunityPage";
interface searchProps {
  searchActive: boolean;
  searchContext: string;
  communityContentList: contentType[];
  setCommunityContentList: React.Dispatch<React.SetStateAction<contentType[]>>;
}
export default function CommunityContents(props: searchProps) {
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const page = useRef<number>(0);
  const {
    searchActive,
    searchContext,
    communityContentList,
    setCommunityContentList,
  } = props;
  const [goNextPage, setGoNextPage] = useState(true);
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    page.current = 0;
    if (communityContentList.length === 0) getCommunityContentsList();
  }, [searchContext]);
  const getCommunityContentsList = useCallback(async () => {
    console.log(searchContext);
    try {
      const { data } = await axios.get<contentType[]>(
        searchActive
          ? `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board/search?page=${page.current}&size=15&keyword=${searchContext}`
          : `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board?page=${page.current}&size=15`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCommunityContentList((prev) => [...prev, ...data]);
      setGoNextPage(data.length === 15);
      if (data.length) page.current += 1;
    } catch (err) {
      console.error(err);
    }
  }, [searchContext]);
  useEffect(() => {
    if (scroll && goNextPage && communityContentList.length !== 0) {
      getCommunityContentsList();
    }
  }, [fetch, goNextPage, scroll]);

  return (
    <div className="max-w-[475px] min-w-[390px]  sm:mx-auto  bg-white">
      {communityContentList.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-[#a5a5a5] text-[14px] leading-7 pt-7">
            {searchActive
              ? "찾으시는 게시글이 없습니다"
              : "등록된 게시글이 없습니다."}
          </p>
          <p className="text-[#a5a5a5] text-[14px] leading-7">
            첫 번째 게시글을 작성해주세요.
          </p>
        </div>
      ) : (
        <div className="w-full py-[20px] mb-[45px]">
          {communityContentList.map((i: contentType) => {
            return <BoardContent boardContent={i} key={i.boardId} />;
          })}
        </div>
      )}
      <InfinityScroll setScroll={setScroll} />
    </div>
  );
}
