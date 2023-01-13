import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import bellIcon from "../assets/bell.svg";
import bellActiveIcon from "../assets/bell_active.svg";
import arrowBackIcon from "../assets/arrow_back.svg";
import logoIcon from "../assets/logo.svg";
export default function TopBar() {
  const location = useLocation();
  const index = location.pathname.indexOf("/", 1);
  const currentPath =
    index !== -1
      ? location.pathname.slice(1, index)
      : location.pathname.slice(1);
  const currentPage = currentPath.toLowerCase().includes("space")
    ? "spaceRent"
    : currentPath.toLowerCase().includes("community")
    ? "community"
    : currentPath.toLowerCase().includes("mypage")
    ? "myPage"
    : "home";
  const navigate = useNavigate();
  //임시 알림 값
  const notification = true;
  /**알림 렌더링 */
  const BellRendering = () => {
    return (
      <Link to={"/alarmPage"}>
        <img src={notification ? bellActiveIcon : bellIcon} alt="알림" />
      </Link>
    );
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
      currentPage === "community"
        ? "커뮤니티"
        : currentPage === "spaceRent"
        ? "홈짐 예약"
        : currentPage === "myPage"
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
    <div className="bg-white max-w-[475px] min-w-[320px] h-[48px] fixed mx-auto left-0 right-0 top-0 z-10 border-b border-[#efefef]">
      {currentPage === "home" ? homeRendering() : otherRendering()}
    </div>
  );
}
