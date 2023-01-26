import React, { useEffect, useState } from "react";

import infomationIcon from "../../../assets/infomationIcon.svg";

declare global {
  interface Window {
    kakao: any;
  }
}

interface ViewMapProps {
  address: string;
  addressDetail: string;
}

export default function ViewMap({ address, addressDetail }: ViewMapProps) {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      const geocoder = new window.kakao.maps.services.Geocoder();
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      geocoder.addressSearch(
        address + addressDetail,
        function (
          result: {
            y: number;
            x: number;
          }[],
          status: string
        ) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            const coords: { La: number; Ma: number } =
              new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        }
      );

      const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    });
  }, []);
  return (
    <section className="w-full max-w-[435px] min-w-[280px] mx-auto mt-[26px] mb-[54px]">
      <div className="flex gap-3 items-center text-base ">
        <img src={infomationIcon} alt="상세내용" />
        <span>오시는 길</span>
      </div>
      <div>
        <div id="map" className="max-w-[100% - 40px] h-40 mt-3 mb-3"></div>
        <p className="text-content text-content-box-text-gray">
          {address} {addressDetail}
        </p>
      </div>
    </section>
  );
}
