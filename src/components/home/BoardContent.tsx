import React from "react";
import { Link } from "react-router-dom";
import { contentType } from "../../page/community/CommunityPage";
export interface boardContentProps {
  boardContent: contentType;
}
export default function BoardContent(props: boardContentProps) {
  const contentItem = props.boardContent;
  return (
    <article className="px-[20px] hover:bg-[rgba(0,0,0,0.1)] hover:duration-300 rounded-md">
      <Link
        className="w-full h-[82px] border-b-[1px] border-[#a5a5a5] py-[18px] flex justify-between items-center"
        to={`/community/${contentItem.boardId}`}
      >
        <div>
          <p className="w-full items-center font-[500] text-[16px] max-h-[48px] leading-[24px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            {contentItem.title}
          </p>
          <p className=" items-center text-[13px] text-[#a5a5a5]">
            {contentItem.nickName}
          </p>
        </div>
        <div className="w-9 h-9 flex justify-center items-center rounded-[100%] rounded-bl-none border-[2px] border-[#d3ebe5] text-[#08bd9d] font-[700]">
          {contentItem.commentCount}
        </div>
      </Link>
    </article>
  );
}
