import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

import InfinityScroll from "../InfinityScroll";

interface homeGym {
  space_id: number;
  member_id: string;
  title: string;
  content: string;
  address: string;
  detail_address: string;
  spaceType: Array<string>;
  note: string;
  rule: string;
  price: number;
  urls: img[];
}

interface img {
  ["url"]: string;
}

export default function SpaceContentsList() {
  const location = useLocation();
  const [homeGym, setHomeGym] = useState<homeGym[]>([]);
  const [goNextPage, setGoNextPage] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const page = useRef<number>(1);
  const param = useRef<string>("");

  const [spaceRentParams] = useSearchParams();
  const query = spaceRentParams.get("spaceType");

  const getData = async () => {
    if (!query && location.pathname !== "/") {
      if (goNextPage === true) {
        page.current += 1;
      }
      const { data } = await axios.get<homeGym[]>(
        `http://localhost:3001/space?_limit=10&_page=${page.current}`
      );
      setHomeGym((prev) => [...prev, ...data]);
      setGoNextPage(data.length === 10);
    }
    if (!query && location.pathname === "/") {
      const { data } = await axios.get<homeGym[]>(
        `http://localhost:3001/space?_page=1&_limit=4`
      );

      setHomeGym(data);
    }
    if (query !== null) {
      const { data } = await axios.get<homeGym[]>(
        `http://localhost:3001/${query}?_limit=10&_page=${page.current}`
      );
      setHomeGym((prev) => [...prev, ...data]);
      setGoNextPage(data.length === 10);
      if (data.length) {
        page.current += 1;
      }
    }
  };

  useEffect(() => {
    if (location.pathname !== "/" && scroll && goNextPage) {
      getData();
    }
  }, [scroll]);

  useEffect(() => {
    if (location.pathname !== "/" && query !== null) {
      setHomeGym([]);
      setGoNextPage(false);
      param.current = query;
      page.current = 1;
    }
    getData();
  }, [query]);

  return (
    <>
      {homeGym.map((item: homeGym) => (
        <li className="flex flex-col w-[calc(50%-6px)]" key={item.space_id}>
          <Link to={`/SpaceContent?id=${item.space_id}`}>
            <div
              style={{
                backgroundImage: `url("${item.urls[0].url}")`,
              }}
              className={`w-full h-0 pb-[57%] bg-no-repeat bg-cover bg-center bg-gradient-to-b from-cyan-700 to-blue-400 rounded-[16px]`}
            ></div>

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
        </li>
      ))}
      {location.pathname !== "/" && <InfinityScroll setScroll={setScroll} />}
    </>
  );
}
