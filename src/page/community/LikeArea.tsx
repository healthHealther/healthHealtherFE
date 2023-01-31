import React, { useCallback, useState, useEffect } from "react";
import likeIcon from "../../assets/likeIcon.png";
import cancelLikeIcon from "../../assets/cancelLikeIcon.png";
import doLikeIcon from "../../assets/doLikeIcon.png";
import { contentType } from "./CommunityPage";
import axios from "axios";
interface LikeAreaProps {
  contentId: number;

  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LikeArea(props: LikeAreaProps) {
  const { contentId, isLiked, setIsLiked } = props;

  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const handleLikeBtn = async () => {
    if (!isLiked) {
      try {
        await axios
          .post(
            `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board/like/${contentId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then(() => {
            setIsLiked(true);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      await axios
        .delete(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board/like/${contentId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(() => {
          setIsLiked(false);
        });
    }
  };

  const getLikeInfo = useCallback(async () => {
    try {
      await axios
        .get(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/board/like/${contentId}`
        )
        .then((res) => {
          setIsLiked(res.data.liked);
          console.log(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    getLikeInfo();
  }, [isLiked]);
  return (
    <div className="py-[26px] border-b-4 border-[#efefef] flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-4">
          <img src={likeIcon} alt="" />
        </div>
        <p className="font-[700]">추천&nbsp;</p>
        <p className="text-[#08bd9d] font-[700]">2</p>
      </div>
      <div>
        <button>
          <img
            src={isLiked ? cancelLikeIcon : doLikeIcon}
            onClick={handleLikeBtn}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
