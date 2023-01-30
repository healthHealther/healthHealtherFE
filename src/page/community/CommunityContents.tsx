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
  const page = useRef<number>(1);
  const {
    searchActive,
    searchContext,
    communityContentList,
    setCommunityContentList,
  } = props;
  const [goNextPage, setGoNextPage] = useState(true);
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    page.current = 1;
    if (communityContentList.length === 0) getCommunityContentsList();
  }, [searchContext]);
  const getCommunityContentsList = useCallback(async () => {
    try {
      const { data } = await axios.get<contentType[]>(
        searchActive
          ? `http://localhost:3001/boardSearch?_title=${searchContext}&_limit=15&_page=${page.current}`
          : `http://localhost:3001/board?_limit=15&_page=${page.current}`
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
            return <BoardContent boardContent={i} key={i.board_id} />;
          })}
        </div>
      )}
      <InfinityScroll setScroll={setScroll} />
    </div>
  );
}
