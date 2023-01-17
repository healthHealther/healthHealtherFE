import React from "react";
import { Link } from "react-router-dom";
export interface boardContentProps {
  boardContent: {
    board_id: number;
    nickname: string;
    title: string;
    content: string;
  };
}
export default function BoardContent(props: boardContentProps) {
  const contentItem = props.boardContent;
  return (
    <article className="px-[20px]   hover:bg-[rgba(0,0,0,0.1)] hover:duration-300 rounded-md">
      <div className="border-b-[1px] border-[#a5a5a5] py-[18px]">
        <Link
          className="w-full h-[82px] "
          to={`/community/${contentItem.board_id}`}
        >
          <p className="w-full items-center font-[500] text-[16px] max-h-[48px] leading-[24px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            {contentItem.title}
          </p>
          <p className=" items-center text-[13px] text-[#a5a5a5]">
            {contentItem.nickname} | 2022-02-09
          </p>
        </Link>
      </div>
    </article>
  );
}
