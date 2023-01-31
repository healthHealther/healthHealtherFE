import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Link,
  parsePath,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import InfinityScroll from "../InfinityScroll";

import { homeGymInfo } from "../../interface/space";

export default function SpaceContentsList() {
  const location = useLocation();
  const [homeGym, setHomeGym] = useState<homeGymInfo[]>([]);
  const [goNextPage, setGoNextPage] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const page = useRef<number>(0);
  const dataFetchedRef = useRef(false);
  const [spaceRentParams] = useSearchParams();
  const query = spaceRentParams.get("spaceType");
  useEffect(() => {
    return () => {
      localStorage.removeItem("selectedType");
    };
  }, []);
  const getData = async () => {
    try {
      if (
        !query &&
        location.pathname !== "/"
        // JSON.parse(localStorage.getItem("selectedType") || "[]")?.length === 0
      ) {
        if (goNextPage === true) {
          page.current += 1;
        }
        localStorage.removeItem("selectedType");
        const { data } = await axios.get<homeGymInfo[]>(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/spaces?page=${page.current}&size=10`
        );
        setHomeGym((prev) => [...prev, ...data]);
        setGoNextPage(data.length === 10);
      }
      if (!query && location.pathname === "/") {
        const { data } = await axios.get<homeGymInfo[]>(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/spaces?page=0&size=4`
        );

        setHomeGym(data);
      }
      if (query !== null) {
        if (page.current === 0) console.log("g");
        const { data } = await axios.get<homeGymInfo[]>(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/spaces?spaceType=${query}&size=10&page=${page.current}`
        );
        setHomeGym((prev) => [...prev, ...data]);
        setGoNextPage(data.length === 10);
        if (data.length) {
          page.current += 1;
        }
      }
    } catch (err) {
      console.error(err);
    }
    dataFetchedRef.current = false;
  };

  useEffect(() => {
    if (location.pathname !== "/" && scroll && goNextPage) {
      getData();
    }
  }, [scroll]);

  useEffect(() => {
    page.current = 0;
    setHomeGym([]);
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getData();
    if (location.pathname !== "/") {
      setGoNextPage(false);
    }
  }, [query]);

  return (
    <>
      {/* {homeGym.map((item: homeGymInfo) => (
        <li className="flex flex-col w-[calc(50%-6px)]" key={item.spaceId}>
          <Link to={`/SpaceContent?id=${item.spaceId}`}>
            <div
              style={{
                backgroundImage: `url("${item.images[0]}")`,
              }}
              className={`w-full h-0 pb-[57%] bg-no-repeat bg-cover bg-center bg-gradient-to-b from-cyan-700 to-blue-400 rounded-[16px]`}
            ></div> */}

      {/* <img
            className="aspect-[2/1] max-h-[120px] min-h-[92px] bg-pink-100"
            src={item.img}
          /> */}

      {/* <span className="text-base font-500 mt-1.5">{item.title}</span>
            <span className="flex gap-1 text-xs mt-1.5">
              {item.spaceTypes.map((spaceType: string) => (
                <p key={spaceType}>#{spaceType}</p>
              ))}
            </span>
            <span className="text-sm font-bold mt-1.5 text-homeGymPrice-green">
              {item.price}원
            </span>
          </Link>
        </li>
      ))}
      {location.pathname !== "/" && <InfinityScroll setScroll={setScroll} />} */}
    </>
  );
}
