import React from "react";
export interface commentTypeProps {
  commentItem: {
    commentId: number;
    nickname: string;
    comment: string;
  };
}
export default function CommentItem(props: commentTypeProps) {
  const comment = props.commentItem;
  return (
    <li className="py-[16px] border-b border-[#efefef]">
      <div className="h-[24px] mb-[8px]">
        <p className="text-[14px]">{comment.nickname}</p>
      </div>
      <div className="min-h-[24px]">
        <p className="text-[16px]">{comment.comment}</p>
      </div>
    </li>
  );
}
