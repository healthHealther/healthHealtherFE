import React from "react";
import { Link } from "react-router-dom";
import aerobicIcon from "../../assets/aerobicExerciseIcon.png";
// import anaerobicIcon from "../../assets/anaerobicExerciseIcon.png";
import gxIcon from "../../assets/gxIcon.png";
import pilatesIcon from "../../assets/pilatesIcon.png";
export default function CategoryLink() {
  return (
    <div className="w-full px-[20px] flex justify-between mb-[39px]">
      <Link
        className="flex w-[calc(25%-8px)] flex-col items-center"
        to={"/spaceRent?category=aerobic"}
      >
        <div className="mb-[12px]">
          <img className="w-full" src={aerobicIcon} alt="유산소" />
        </div>
        <p className="text-[#a5a5a5]">유산소</p>
      </Link>
      <Link
        className="flex w-[calc(25%-8px)] flex-col items-center"
        to={"/spaceRent?category=anaerobic"}
      >
        <div className="mb-[12px]">
          <img className="w-full" src={aerobicIcon} alt="무산소" />
        </div>
        <p className="text-[#a5a5a5]">무산소</p>
      </Link>
      <Link
        className="flex w-[calc(25%-8px)] flex-col items-center"
        to={"/spaceRent?category=pilates"}
      >
        <div className="mb-[12px]">
          <img className="w-full" src={pilatesIcon} alt="필라테스" />
        </div>
        <p className="text-[#a5a5a5]">필라테스</p>
      </Link>
      <Link
        className="flex w-[calc(25%-8px)] flex-col items-center"
        to={"/spaceRent?category=gx"}
      >
        <div className="mb-[12px]">
          <img className="w-full" src={gxIcon} alt="GX" />
        </div>
        <p className="text-[#a5a5a5]">GX</p>
      </Link>
    </div>
  );
}
