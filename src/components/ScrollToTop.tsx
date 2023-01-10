import React, { useState, useEffect } from "react";
import arrowTopIcon from "../assets/arrow_top.svg";

export default function ScrollToTop() {
  const [scrollYValue, setscrollYValue] = useState(0);
  const [scrollActive, setscrollActive] = useState(false);
  const [pageHeight, setPageHeight] = useState(
    document.documentElement.scrollHeight
  );
  const [throttle, setThrottle] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log(pageHeight);
  //     setPageHeight(document.documentElement.scrollHeight);
  //     throttle ? setThrottle(false) : setThrottle(true);
  //   }, 500);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [throttle]);
  const handleThrottle = () => {
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      setTimeout(async () => {
        setThrottle(false);
      }, 500);
    }
  };
  //높이가 변할때 쓰로틀 실행
  useEffect(() => {
    handleThrottle();
  }, [document.documentElement.scrollHeight]);
  //쓰로틀 값이 변할때마다 (500ms) 높이 재 설정
  useEffect(() => {
    console.log(pageHeight);
    setPageHeight(document.documentElement.scrollHeight);
  }, [throttle]);

  const scrollFixed = () => {
    if (scrollYValue > 500) {
      setscrollYValue(window.scrollY);
      setscrollActive(true);
    } else {
      setscrollYValue(window.scrollY);
      setscrollActive(false);
    }
  };
  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", scrollFixed);
    };
    scrollListener();
    return () => {
      window.removeEventListener("scroll", scrollFixed);
    };
  });
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={`${scrollActive ? "opacity-100" : "opacity-0"} ${
        pageHeight > 1500 ? "visible" : "hidden"
      } transition-opacity duration-300 fixed bottom-[30px] right-[20px] w-[56px] h-[56px]`}
    >
      <button onClick={handleScrollTop} className="w-full h-full">
        <img className="w-full" src={arrowTopIcon} alt="위로가기" />
      </button>
    </div>
  );
}
