import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import InfinityScroll from "../InfinityScroll";

import { homeGymInfo, submitHomeGymInfo } from "../../interface/space";
import { baseUrl } from "../common/common";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  searchTitleLabelState,
  spaceContentDetailState,
  spaceContentListState,
} from "../../common";

interface searchForm {
  search: string;
}

export default function SpaceContentsList() {
  const location = useLocation();
  const [homeGym, setHomeGym] = useState<submitHomeGymInfo[]>([]);
  const [goNextPage, setGoNextPage] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  // const [page, setPage] = useState<number>(0);
  const page = useRef(0);
  const dataFetchedRef = useRef(false);
  const [spaceRentParams] = useSearchParams();
  const query =
    spaceRentParams.get("spaceType") !== null
      ? spaceRentParams.get("spaceType")
      : "";
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const [spaceContentList, setSpaceContentList] = useRecoilState<
    submitHomeGymInfo[]
  >(spaceContentListState);
  const searchTitleLabel = useRecoilValue<string>(searchTitleLabelState);
  const [spaceContentDetailInfo, setSpaceContentDetailInfo] =
    useRecoilState<submitHomeGymInfo>(spaceContentDetailState);
  useEffect(() => {
    return () => {
      setSpaceContentDetailInfo({
        spaceId: 0,
        memberId: "",
        title: "",
        content: "",
        address: "",
        addressDetail: "",
        spaceTypes: [],
        convenienceTypes: [],
        notice: "",
        rule: "",
        price: 0,
        images: [],
        openTime: 0,
        closeTime: 0,
        discountAmount: 0,
        amount: 0,
        openDate: new Date(),
        expiredDate: new Date(),
      });
      localStorage.removeItem("selectedType");
    };
  }, []);
  const getData = async () => {
    try {
      if (goNextPage === true) {
        page.current += 1;
      }
      if (!query && location.pathname !== "/") {
        localStorage.removeItem("selectedType");
        const { data } = await axios.get(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/spaces?page=${page.current}&size=10&searchText=${searchTitleLabel}&spaceType=${query}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSpaceContentList((prev) => [...prev, ...data.content]);
        setGoNextPage(data.content.length === 10);
      }
      if (!query && location.pathname === "/") {
        const { data } = await axios.get<submitHomeGymInfo[]>(
          `http://localhost:3001/space?_page=1&_limit=4`
        );

        setHomeGym(data);
      }
      if (query !== null) {
        const { data } = await axios.get(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/spaces?page=${page.current}&size=10&searchText=${searchTitleLabel}&spaceType=${query}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setSpaceContentList((prev) => [...prev, ...data.content]);

        setGoNextPage(data.content.length === 10);
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
    setSpaceContentList([]);
  }, [query]);

  return (
    <>
      {spaceContentList.map((item: submitHomeGymInfo) => (
        <li className="flex flex-col w-[calc(50%-6px)]" key={item.spaceId}>
          <Link to={`/SpaceContent?id=${item.spaceId}`}>
            <div
              style={{
                backgroundImage: `url("${item.images}")`,
              }}
              className={`w-full h-0 pb-[57%] bg-no-repeat bg-cover bg-center bg-gradient-to-b from-cyan-700 to-blue-400 rounded-[16px]`}
            ></div>

            {/* <img
            className="aspect-[2/1] max-h-[120px] min-h-[92px] bg-pink-100"
            src={item.img}
          /> */}

            <span className="text-base font-500 mt-1.5">{item.title}</span>
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
      {location.pathname !== "/" && <InfinityScroll setScroll={setScroll} />}
    </>
  );
}
