import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { communityState } from "../../common";
import { useParams, useNavigate } from "react-router-dom";
import CommentArea from "./comment/CommentArea";
import axios from "axios";
import { contentType } from "./CommunityPage";
import LikeArea from "./LikeArea";

export default function CommunityContentPage() {
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const params = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const contentId = Number(params.boardContentId);
  const [contentItem, setContentItem] = useState<contentType>({
    boardId: 0,
    title: "",
    nickName: "",
    content: "",
    commentCount: 0,
  });
  const getContentItem = async () => {
    try {
      await axios
        .get<contentType>(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board/${contentId}`,
          { headers: { Authorization: token } }
        )
        .then((res) => {
          console.log(res.data);
          setContentItem(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getContentItem();
  }, []);
  const handleDelete = async () => {
    try {
      await axios
        .delete(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board/${contentId}`,
          { headers: { Authorization: token } }
        )
        .then(() => {
          navigate("/community");
        });
    } catch (err) {
      console.error(err);
    }
  };
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
          {contentItem?.nickName}
        </p>
      </div>
      <div className="pb-[80px] border-b-4 border-[#efefef]">
        <p className="text-[16px]">{contentItem?.content}</p>
        <div className="flex justify-end mt-10">
          <button
            className="text-[white] bg-slate-300 py-1 px-2 rounded-lg text-[14px] font-light"
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
      <LikeArea
        contentId={contentId}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
      <CommentArea
        contentId={contentId}
        commentCount={contentItem.commentCount}
      />
    </div>
  );
}
