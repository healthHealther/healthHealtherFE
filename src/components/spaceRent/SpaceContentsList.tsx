import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import InfinityScroll from "../InfinityScroll";

interface homeGym {
  id: number;
  title: string;
  price: number;
  spaceType: Array<string>;
  img: string;
}

export default function SpaceContentsList() {
  const location = useLocation();
  const [homeGym, setHomeGym] = useState<homeGym[]>([]);

  const [goNextPage, setGoNextPage] = useState<boolean>(true);
  const [scroll, setScroll] = useState<boolean>(false);
  const page = useRef<number>(1);

  const getSpaceContentsList = useCallback(async () => {
    try {
      if (location.pathname !== "/") {
        const { data } = await axios.get<homeGym[]>(
          `http://localhost:3001/space?_limit=10&_page=${page.current}`
        );
        setHomeGym((prev) => [...prev, ...data]);
        setGoNextPage(data.length === 10);
        if (data.length) {
          page.current += 1;
        }
      }
      if (location.pathname === "/") {
        const response = await axios.get<homeGym[]>(
          `http://localhost:3001/space?_page=1&_limit=4`
        );
        setHomeGym(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (scroll && goNextPage) {
      getSpaceContentsList();
    }

    if (location.pathname === "/") {
      getSpaceContentsList();
    }
  }, [fetch, goNextPage, scroll]);

  return (
    <div className="flex flex-wrap gap-x-[12px]  gap-y-[24px] w-full  mx-auto mt-3 relative">
      {homeGym.map((item: homeGym) => (
        <li className="flex flex-col w-[calc(50%-6px)]" key={item.id}>
          <Link to={`/SpaceContent/${item.id}`}>
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
        </li>
      ))}
      {location.pathname !== "/" && <InfinityScroll setScroll={setScroll} />}
    </div>
  );
}
