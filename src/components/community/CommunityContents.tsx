import axios from "axios";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { communityState } from "../../common";
import InfinityScroll from "../InfinityScroll";
import BoardContent from "./BoardContent";
export interface contentType {
  board_id: number;
  nickname: string;
  title: string;
  content: string;
}
export default function CommunityContents() {
  const page = useRef<number>(1);
  const [communityContentList, setCommunityContentList] =
    useRecoilState(communityState);
  const [goNextPage, setGoNextPage] = useState(true);
  const [scroll, setScroll] = useState(false);
  const getCommunityContentsList = useCallback(async () => {
    try {
      const { data } = await axios.get<contentType[]>(
        `http://localhost:3001/community?_limit=15&_page=${page.current}`
      );
      window.scrollTo({ top: 0 });
      setCommunityContentList((prev) => [...prev, ...data]);
      setGoNextPage(data.length === 15);
      if (data.length) page.current += 1;
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (scroll && goNextPage) {
      getCommunityContentsList();
    }
  }, [fetch, goNextPage, scroll]);
  return (
    <div className="max-w-[475px] min-w-[390px]  sm:mx-auto mt-[48px] bg-white">
      {communityContentList.length === 0 ? (
        <div>
          <p>등록된 게시글이 없습니다.</p>
          <p>첫 번째 게시글을 작성해주세요.</p>
        </div>
      ) : (
        <div className="w-full py-[20px] bg-[#fbfbfb] mb-[45px]">
          {communityContentList.map((i: contentType) => {
            return <BoardContent boardContent={i} key={i.board_id} />;
          })}
        </div>
      )}
      <InfinityScroll setScroll={setScroll} />
    </div>
  );
}
