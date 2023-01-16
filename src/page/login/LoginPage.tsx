import React from "react";

export default function LoginPage() {
  const loginBtn = [
    {
      type: "google",
      coment: "구글 계정으로 로그인",
      color: "bg-google-red text-white",
    },
    {
      type: "kakao",
      coment: "카카오 계정으로 로그인",
      color: "bg-kakao-yellow text-black",
    },
    {
      type: "naver",
      coment: "네이버 계정으로 로그인",
      color: "bg-naver-green text-white",
    },
  ];
  return (
    <div className="max-w-[475px] min-w-[375px] mx-auto my-auto mt-20">
      {/* 배경 이미지 */}
      <div
        className={`w-[45%] h-0 pb-[40%]   mx-auto bg-[url("./assets/login-bg.png")] bg-no-repeat bg-contain bg-center`}
      ></div>
      {/* 로고 */}
      <div
        className={`w-[35%] h-0 pb-[10%] mt-[10%]  mx-auto bg-[url("./assets/logo.svg")] bg-no-repeat bg-contain bg-center`}
      ></div>
      {/* 설명 */}
      <div className="w-[70%]  text-center mt-[5%] mx-auto text-[75%] whitespace-nowrap">
        <span className="">
          로그인 후 헬스헬써의 <br /> 다양한 컨텐츠를 이용해보세요!
        </span>
      </div>
      {/* 소셜로그인 */}
      <div className=" right-[20px] w-[calc(100%-40px)] flex flex-col gap-3 w-full mx-auto pt-[20%] ">
        {loginBtn.map((item) => (
          <button
            key={item.type}
            className={` ${item.color} h-12 rounded-[16px] hover:scale-[1.02]`}
          >
            {item.coment}
          </button>
        ))}
        {/* 구글 */}
        {/* 카카오 */}
        {/* <button className="bg-kakao-yellow">카카오 계정으로 로그인</button> */}
        {/* 네이버 */}
        {/* <button className="bg-naver-green">네이버 계정으로 로그인</button> */}
      </div>
    </div>
  );
}
