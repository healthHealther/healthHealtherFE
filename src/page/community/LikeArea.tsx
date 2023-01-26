import React, { useState } from "react";
import likeIcon from "../../assets/likeIcon.png";
import cancelLikeIcon from "../../assets/cancelLikeIcon.png";
import doLikeIcon from "../../assets/doLikeIcon.png";

export default function LikeArea() {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeBtn = () => {
    isLiked ? setIsLiked(false) : setIsLiked(true);
  };
  return (
    <div className="py-[26px] border-b-4 border-[#efefef] flex justify-between items-center  px-5">
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
