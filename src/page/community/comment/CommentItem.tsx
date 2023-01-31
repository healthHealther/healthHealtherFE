import axios from "axios";
import React from "react";
export interface commentTypeProps {
  commentItem: {
    commentId: number;
    nickName: string;
    comment: string;
  };
}
export default function CommentItem(props: commentTypeProps) {
  const comment = props.commentItem;
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board/comment/${comment.commentId}`,
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <li className="py-[16px] border-b border-[#efefef]">
      <div className="h-[24px] mb-[8px]">
        <p className="text-[14px]">{comment.nickName}</p>
      </div>
      <div className="min-h-[24px]">
        <p className="text-[16px]">{comment.comment}</p>
      </div>
      <button className="mt-2" onClick={handleDelete}>
        삭제하기
      </button>
    </li>
  );
}
