import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import scrollToTopIcon from "../assets/scrollToTop.png";

export default function ScrollToTop() {
  const [scrollYValue, setscrollYValue] = useState(0);
  const [scrollActive, setscrollActive] = useState(false);
  const [pageHeight, setPageHeight] = useState(
    document.documentElement.scrollHeight
  );
  const [throttle, setThrottle] = useState(false);
  const location = useLocation();
  const index = location.pathname.indexOf("/", 1);
  const currentPath =
    index !== -1
      ? location.pathname.slice(1, index)
      : location.pathname.slice(1);
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
      } transition-opacity duration-300 fixed ${
        currentPath === "community"
          ? "bottom-[120px]"
          : currentPath === "spaceRent"
          ? "bottom-[120px]"
          : "bottom-0"
      } right-0 `}
    >
      <button onClick={handleScrollTop} className="w-full h-full">
        <img className="w-full" src={scrollToTopIcon} alt="위로가기" />
      </button>
    </div>
  );
}
