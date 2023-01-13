import React, { Dispatch, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface SpaceTypeProps {
  setSpaceType?: Dispatch<React.SetStateAction<string>>;
}

export default function SpaceType({ setSpaceType }: SpaceTypeProps) {
  const spaceTypeList = ["유산소", "무산소", "필라테스", "GX"];
  const categoty = ["aerobic", "anaerobic", "pilates", "GX"];
  const [spaceRentParams] = useSearchParams();
  const query = spaceRentParams.get("spaceType");
  useEffect(() => {
    query && setSpaceType && setSpaceType(query);
  }, [query]);
  return (
    <>
      <article className="relative pt-8  pb-8">
        <ul className="flex flex-nowrap items-center h-9 gap-2 font-bold text-base leading-6 box-border overflow-scroll pr-9">
          {spaceTypeList.map((item, idx) => (
            <li
              key={item}
              className={`px-[14px] h-9 py-[6px] border rounded-lg whitespace-nowrap ${
                query === categoty[idx] && "bg-selected-green text-white"
              }`}
            >
              <Link to={`/spaceRent?spaceType=${categoty[idx]}`}>{item}</Link>
            </li>
          ))}
          <div className="absolute right-0 w-9 h-9 bg-gradient-to-l from-white"></div>
        </ul>
      </article>
    </>
  );
}
