import React, { Dispatch, useEffect, useState, useRef } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function SpaceType() {
  const ref = useRef(0);
  const location = useLocation();
  const spaceTypeList = ["유산소", "무산소", "필라테스", "GX"];
  const categoty = ["AEROBIC", "ANAEROBIC", "PILATES", "GX"];
  const [spaceRentParams] = useSearchParams();
  const query = spaceRentParams.get("spaceType");
  localStorage.setItem("selectedType", JSON.stringify([query]));
  const [selectedType, setSelectedType] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("selectedType") || "[]");
  });
  const [tempQuery, setTempQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedType", JSON.stringify(selectedType));
    setTempQuery(selectedType.join(","));
  }, [selectedType]);
  useEffect(() => {
    if (tempQuery.length > 0) {
      navigate(`/spaceRent?spaceType=${tempQuery}`);
      console.log("location", location);
    } else {
      navigate("/spaceRent");
      if (ref.current === 0) {
        navigate(-1);
        ref.current = 1;
      }
    }
  }, [tempQuery]);
  return (
    <>
      <article className="relative pt-8  pb-8">
        <ul className="flex flex-nowrap items-center h-9 gap-2 font-bold text-base leading-6 box-border overflow-scroll scrollbar-hide pr-9">
          {spaceTypeList.map((item, idx) => (
            <li
              key={item}
              className={`px-[14px] h-9 py-[6px] border rounded-lg whitespace-nowrap ${
                selectedType.length === 0
                  ? "bg-white text-black"
                  : selectedType.includes(categoty[idx]) &&
                    "bg-selected-green text-white"
              }`}
            >
              {/* 버튼으로 바꾸고 onclick=(clicked<boolean> 경우 나눠서 하나의 state에 str[] 관리, 넘겨줄때 join으로 하나의 쿼리스트링으로 url에 담아 보내기  ) */}
              <button
                type="button"
                onClick={() => {
                  if (!selectedType.includes(categoty[idx])) {
                    setSelectedType([...selectedType, categoty[idx]]);
                  } else {
                    setSelectedType(
                      selectedType.filter((i) => {
                        return i !== categoty[idx];
                      })
                    );
                  }
                }}
              >
                {item}
              </button>
              {/* to={`/spaceRent?spaceType=${categoty[idx]}`} */}
            </li>
          ))}
          <div className="absolute right-0 w-9 h-9 bg-gradient-to-l from-white"></div>
        </ul>
      </article>
    </>
  );
}
