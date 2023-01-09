import React, { useState, useEffect } from "react";
import arrowTopIcon from "../assets/arrow_top.svg";
export default function ScrollToTop() {
  const [scrollYValue, setscrollYValue] = useState(0);
  const [scrollActive, setscrollActive] = useState(false);
  const scrollFixed = () => {
    if (scrollYValue > 150) {
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
      className={`${
        scrollActive ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 fixed bottom-[30px] right-[20px] w-[56px] h-[56px]`}
    >
      <button onClick={handleScrollTop} className="w-full h-full">
        <img className="w-full" src={arrowTopIcon} alt="위로가기" />
      </button>
    </div>
  );
}
