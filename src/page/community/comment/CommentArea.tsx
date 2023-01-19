import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { commentListState } from "../../../common";
import CommentItem from "./CommentItem";
import informationIcon from "../../../assets/informationIcon.png";
import NewComment from "./NewComment";
export interface commentType {
  id: number;
  commentId: number;
  nickname: string;
  comment: string;
}
interface commentAreaProps {
  contentId: number;
}
export default function CommentArea(props: commentAreaProps) {
  const [commentList, setCommentList] =
    useRecoilState<commentType[]>(commentListState);
  const getCommentList = useCallback(async () => {
    try {
      const { data } = await axios.get<commentType[]>(
        `http://localhost:3001/comment`
      );
      setCommentList([...data]);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getCommentList();
  }, []);
  const renderingComments = () => {
    return (
      <ul className=" mb-[20px]">
        {commentList.map((i) => {
          return <CommentItem commentItem={i} key={i.commentId} />;
        })}
      </ul>
    );
  };
  const renderingEmpty = () => {
    return (
      <div className="flex flex-col items-center text-[#a5a5a5] text-[14px] py-[40px] mb-[40px]">
        <p>등록된 댓글이 없습니다.</p>
        <p>첫 번째 댓글을 달아주세요!</p>
      </div>
    );
  };

  return (
    <div className="pt-[32px]">
      <div className="flex items-center">
        <img className="mr-[12px]" src={informationIcon} alt="" />
        <p>댓글</p>
        <p className="text-[#08BD9D]">&nbsp;{commentList.length}</p>
      </div>
      {commentList.length === 0 ? renderingEmpty() : renderingComments()}
      <NewComment
        commentId={commentList.length + 1}
        getCommentList={getCommentList}
      />
    </div>
  );
}
