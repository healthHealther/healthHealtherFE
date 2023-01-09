import React from "react";
import { Link } from "react-router-dom";
import BoardContent from "./BoardContent";
import chevronIcon from "../../assets/chevron.svg";
const fakeContent = [
  {
    board_id: 1,
    nickname: "하영",
    title: "제목1입니다",
    content: "내용입니다",
  },
  {
    board_id: 2,
    nickname: "이영",
    title: "제목2입니다",
    content: "내용입니다",
  },
  {
    board_id: 3,
    nickname: "삼영",
    title: "제목3입니다",
    content: "내용입니다",
  },
];
export default function BoardContentPreview() {
  return (
    <article className="w-full max-h-[340px] py-[32px] bg-[#fbfbfb] mb-[80px]">
      <div className="px-[20px] flex h-full justify-between items-center mb-[32px]">
        <p className="text-[18px] h-full font-[700]">오늘의 추천 게시글</p>
        <Link className="flex items-center h-full " to={"/community"}>
          <p className="text-[12px] w-[33px] whitespace-nowrap mr-[4px]">
            더보기
          </p>
          <img src={chevronIcon} alt="" />
        </Link>
      </div>
      {fakeContent.map((i) => {
        return <BoardContent boardContent={i} />;
      })}
    </article>
  );
}
