import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface homeGym {
  id: number;
  title: string;
  price: number;
  spaceType: Array<string>;
  img: string;
}

export default function SpaceContents() {
  const location = useLocation();
  const [homeGym, setHomeGym] = useState<homeGym[]>([
    {
      id: 1,
      title: "홈짐 타이틀 영역",
      price: 32000,
      spaceType: ["유산소", "무산소"],
      img: "",
    },
    {
      id: 2,
      title: "홈짐 타이틀 영역",
      price: 32000,
      spaceType: ["유산소", "무산소"],
      img: "",
    },
    {
      id: 3,
      title: "홈짐 타이틀 영역",
      price: 32000,
      spaceType: ["유산소", "무산소"],
      img: "",
    },
    {
      id: 4,
      title: "홈짐 타이틀 영역",
      price: 32000,
      spaceType: ["유산소", "무산소"],
      img: "",
    },
  ]);

  return (
    <div className="flex flex-wrap gap-x-[12px]  gap-y-[24px] w-full  mx-auto mt-3">
      {homeGym.map((item: homeGym) => (
        <Link
          to={`/SpaceContent/${item.id}`}
          className="flex flex-col w-[calc(50%-6px)]"
          key={item.id}
        >
          <div className="w-full h-0 pb-[57%] bg-gradient-to-b from-cyan-700 to-blue-400 bg-center bg-cover rounded-[16px]"></div>

          {/* <img
              className="aspect-[2/1] max-h-[120px] min-h-[92px] bg-pink-100"
              src={item.img}
            /> */}

          <span className="text-base font-500 mt-1.5">{item.title}</span>
          <span className="flex gap-1 text-xs mt-1.5">
            {item.spaceType.map((spaceType: string) => (
              <p key={spaceType}>#{spaceType}</p>
            ))}
          </span>
          <span className="text-sm font-bold mt-1.5 text-homeGymPrice-green">
            {item.price}원
          </span>
        </Link>
      ))}
    </div>
  );
}
