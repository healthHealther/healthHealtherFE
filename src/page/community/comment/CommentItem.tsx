import axios from "axios";
import React from "react";
export interface commentTypeProps {
  commentItem: {
    commentId: number;
    nickName: string;
    comment: string;
  };
  getCommentList: () => Promise<void>;
}
export default function CommentItem(props: commentTypeProps) {
  const comment = props.commentItem;
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const handleDelete = async () => {
    try {
      await axios
        .delete(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board/comment/${comment.commentId}`,
          {
            headers: { Authorization: token },
          }
        )
        .then(() => {
          props.getCommentList();
        });
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
      <div className="flex justify-end">
        <button
          className="mt-2 bg-slate-300 text-white py-1 px-2 rounded-lg text-[14px] font-light"
          onClick={handleDelete}
        >
          삭제하기
        </button>
      </div>
    </li>
  );
}
