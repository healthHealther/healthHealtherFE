import React from "react";
import { useRecoilValue } from "recoil";
import { communityState } from "../../common";
import { useParams } from "react-router-dom";
import CommentArea from "./comment/CommentArea";

export default function CommunityContentPage() {
  const params = useParams();
  const contentId = Number(params.boardContentId);
  const communityContentList = useRecoilValue(communityState);
  //api호출로 변경 예정
  const contentItem = communityContentList.find(
    (i) => i.board_id === contentId
  );

  return (
    <div className="px-[20px] max-w-[475px] min-w-[390px] min-h-screen sm:mx-auto mt-[48px] bg-white m">
      <div className="py-[32px] border-b-4 border-[#efefef] mb-[40px]">
        <p className="mb-[12px] rounded-[8px] w-[85px] h-[30px] bg-[#d3ebe5] text-[#51776e] text-[10px] text-center leading-[24px] px-[8px] py-[3px]">
          전체 카테고리
        </p>
        <p className="h-[32px] font-bold text-[24px] mb-[4px]">
          {contentItem?.title}
        </p>
        <p className="h-[18px] font-normal text-[14px] text-[#a5a5a5]">
          {contentItem?.nickname} | {/* 생성일자 */}
        </p>
      </div>
      <div className="pb-[80px] border-b-4 border-[#efefef]">
        <p className="text-[16px]">{contentItem?.content} 내용</p>
      </div>
      <CommentArea contentId={contentId} />
    </div>
  );
}
