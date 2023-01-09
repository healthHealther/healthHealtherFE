import React from "react";
import { useNavigate } from "react-router-dom";
import { pageTitleProps } from "./NavBar";
import bellIcon from "../assets/bell.svg";
import bellActiveIcon from "../assets/bell_active.svg";
import arrowBackIcon from "../assets/arrow_back.svg";
import logoIcon from "../assets/logo.svg";
export default function TopBar(props: pageTitleProps) {
  const navigate = useNavigate();
  //임시 알림 값
  const notification = true;
  /**알림 렌더링 */
  const BellRendering = () => {
    return <img src={notification ? bellActiveIcon : bellIcon} alt="알림" />;
  };
  /**home일 시 렌더링 */
  const homeRendering = () => {
    return (
      <div className="flex justify-between w-full py-[14px] px-[20px] h-full">
        {/* 아이콘 추가시 텍스트 제거후 변경 예정 */}
        <div className="w-[82px] h-[17px]">
          <img className="w-full h-full" src={logoIcon} alt="" />
        </div>
        <BellRendering />
      </div>
    );
  };
  /**home이 아닐 시 렌더링 */
  const otherRendering = () => {
    const pageStr =
      props.pageTitle === "community"
        ? "커뮤니티"
        : props.pageTitle === "spaceRent"
        ? "홈짐 예약"
        : props.pageTitle === "myPage"
        ? "내정보"
        : "로그인";
    return (
      <div className="flex justify-between items-center w-full py-[14px] px-[20px] h-full">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={arrowBackIcon} alt="뒤로가기" />
        </button>
        <p className="text-[16px]">{pageStr}</p>
        <BellRendering />
      </div>
    );
  };
  return (
    <div className="max-w-[475px] min-w-[320px] h-[48px] fixed mx-auto left-0 right-0 top-0 ">
      {props.pageTitle === "home" ? homeRendering() : otherRendering()}
    </div>
  );
}
