import React from "react";
import { Link } from "react-router-dom";
import randomProfileMan from "../../assets/randomProfileMan.png";
import randomProfileWoman from "../../assets/randomProfileWoman.png";
import logoutIcon from "../../assets/logoutIcon.svg";
import messageIcon from "../../assets/messageIcon.png";
import rentIcon from "../../assets/rentIcon.png";
import writeIcon from "../../assets/writeIcon.png";
export default function MyPage() {
  interface buttonRenderingType {
    buttonType: "notification" | "myRent" | "myPost";
  }
  const renderingArr: ["notification", "myRent", "myPost"] = [
    "notification",
    "myRent",
    "myPost",
  ];
  const MyPageButtonRendering = (props: buttonRenderingType) => {
    const { buttonType } = props;
    const icon =
      buttonType === "notification"
        ? messageIcon
        : buttonType === "myRent"
        ? rentIcon
        : writeIcon;
    const title =
      buttonType === "notification"
        ? "알림함"
        : buttonType === "myRent"
        ? "대여 현황"
        : "내가 쓴 글";

    return (
      <Link
        className="py-[20px] h-[66px] flex items-center border-b border-[#efefef] hover:bg-[rgba(0,0,0,0.03)] transition-colors"
        to={`/myPage/${buttonType}`}
      >
        <div className="mr-[10px]">
          <img src={icon} alt="" />
        </div>
        <p className="font-[500] text-[16px]">{title}</p>
      </Link>
    );
  };
  return (
    <div className="px-[20px]">
      <div className="py-[32px] border-b border-[#efefef]">
        <div className="mb-[12px]">
          <img
            src={
              Math.round(Math.random()) ? randomProfileMan : randomProfileWoman
            }
            alt="프로필사진"
          />
        </div>
        <div className="w-[80px] h-[32px] flex items-end mb-[8px]">
          <p className="font-[700] text-[20px] mr-[2px]">홍길동</p>
          <p className="font-[700] text-[16px]">님</p>
        </div>
        <button className="flex items-center text-[#a5a5a5]">
          <img className="mr-[4px]" src={logoutIcon} alt="" />
          <p className="font-[500] text-[13px]">로그아웃</p>
        </button>
      </div>
      {renderingArr.map((i) => {
        return <MyPageButtonRendering buttonType={i} key={i} />;
      })}
    </div>
  );
}
