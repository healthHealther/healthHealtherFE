import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardContent from "./BoardContent";
import chevronIcon from "../../assets/chevron.svg";
import { contentType } from "../../page/community/CommunityPage";
import axios from "axios";

export default function BoardContentPreview() {
  const [contentList, setContentList] = useState<contentType[]>([]);
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const getContentList = async () => {
    try {
      await axios
        .get(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board?page=0&size=3`,
          { headers: { Authorization: token } }
        )
        .then((res) => {
          setContentList(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getContentList();
  }, []);
  return (
    <article className="w-full max-h-[340px] py-[32px] bg-[#fbfbfb] mb-[45px]">
      <div className="px-[20px] flex h-full justify-between items-center mb-[32px]">
        <p className="text-[18px] h-full font-[700]">오늘의 추천 게시글</p>
        <Link className="flex items-center h-full " to={"/community"}>
          <p className="text-[12px] w-[33px] whitespace-nowrap mr-[4px]">
            더보기
          </p>
          <img src={chevronIcon} alt="" />
        </Link>
      </div>
      {contentList.map((i) => {
        return <BoardContent boardContent={i} key={i.boardId} />;
      })}
    </article>
  );
}
