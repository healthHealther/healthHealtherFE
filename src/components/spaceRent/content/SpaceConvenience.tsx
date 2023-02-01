import React from "react";

interface SpaceConvenienceProps {
  convenience: string[];
}

export default function SpaceConvenience({
  convenience,
}: SpaceConvenienceProps) {
  const objectConvenienceType = [
    { value: "SHOWER", label: "샤워" },
    { value: "PARKING", label: "주차시설" },
    { value: "CHANGINGROOM", label: "탈의실" },
    { value: "FULLBODYMIROR", label: "전신거울" },
    { value: "WIFI", label: "WIFI" },
    { value: "FOOD", label: "음식물 반입 가능" },
    { value: "SCALE", label: "체중계" },
    { value: "TOWEL", label: "수건" },
  ];
  return (
    <div className="flex gap-2 flex-nowrap mx-5 items-center my-6 overflow-scroll scrollbar-hide overflow-y-hidden">
      {convenience.map((item: string) => {
        const label = objectConvenienceType.filter(
          (data) => data.value === item
        );
        return (
          <div className="flex flex-col gap-1 " key={item}>
            <div className="w-12 h-12 border flex items-center justify-center rounded-[18px]">
              <img
                src={`images/${item.toLowerCase()}Icon.svg`}
                alt={`${item.toLowerCase()}`}
                className="w-6 h-6"
              />
            </div>
            <p className="text-sm w-full h-[14px] text-center text-content-box-text-gray">
              {label[0].label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
