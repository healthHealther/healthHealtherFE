import React from "react";

import infomationIcon from "../../../assets/infomationIcon.svg";
import { image } from "../../../interface/space";

interface DetailInfoProps {
  content: string;
  images: string[];
}

export default function DetailInfo({ content, images }: DetailInfoProps) {
  return (
    <section className="w-full max-w-[435px] min-w-[280px] mx-auto mt-[26px] mb-20">
      <div className="flex gap-3 items-center text-base">
        <img src={infomationIcon} alt="상세내용" />
        <span>상세 내용</span>
      </div>
      <div className="w-ful text-content text-content-box-text-gray mt-6 ">
        {content}
      </div>
      {/* 이미지 */}
      <div className="mt-4">
        {images.map((item, idx) => (
          <img
            src={item as string}
            alt="상세이미지"
            key={idx}
            className="mb-4"
          />
        ))}
      </div>
    </section>
  );
}
