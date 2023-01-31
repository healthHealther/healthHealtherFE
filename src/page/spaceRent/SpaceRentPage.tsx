import axios from "axios";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchTitleState, spaceContentListState } from "../../common";
import SearchBar from "../../components/spaceRent/SearchBar";
import SpaceContentsList from "../../components/spaceRent/SpaceContentsList";
import SpaceType from "../../components/spaceRent/SpaceType";
import { homeGymInfo, submitHomeGymInfo } from "../../interface/space";

interface searchForm {
  search: string;
}

// 공간대여 목록 페이지
export default function SpaceRentPage() {
  const [spaceRentParams] = useSearchParams();
  const query =
    spaceRentParams.get("spaceType") !== null
      ? spaceRentParams.get("spaceType")
      : "";
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const methods = useForm<searchForm>();
  const { handleSubmit, getValues } = methods;
  const [spaceContentList, setSpaceContentList] = useRecoilState<
    submitHomeGymInfo[]
  >(spaceContentListState);
  const [search, setSearch] = useRecoilState<string>(searchTitleState);

  const onSubmit = async (formData: searchForm) => {
    setSearch(getValues("search"));
    try {
      await axios
        .get(
          `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/spaces?page=0&size=10&searchText=${formData.search}&spaceType=${query}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setSpaceContentList(res.data.content);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative mb-12 px-[20px]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchBar />
          <SpaceType />
          <div className="flex flex-wrap gap-x-[12px]  gap-y-[24px] w-full  mx-auto mt-3">
            <SpaceContentsList />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
