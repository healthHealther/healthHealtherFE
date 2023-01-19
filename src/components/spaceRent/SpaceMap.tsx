import React, { useEffect, useState } from "react";

import infomationIcon from "../../assets/infomationIcon.svg";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function ViewMap() {
  const homeGymInfo = {
    spaceId: 42,
    title: "더스타핏 필라앤요가",
    content:
      "1. 오픈 1년이 된 프리미엄 급 기구 필라테스, 요가 스튜디오입니다. 2. 기구 필라테스 개인 룸 2개, 6:1 그룹 룸 - 타워 리포머 룸 1개, 바렐&체어 룸 1개 3. 요가룸 1개 – 최대 10명 이 이용할수 있는 공간 4. 여성 느낌의 휴게실과 개인 룸 형식의 부스룸 3개 편안하고 따뜻한 공간을 맘 편하게 이용하세요. 하남 미사 헬스장, 필라테스장, 요가원 대관 진행합니다. 많이들 오셔서 이용해주세요^^",
    address: "경기 하남시 망월동 979-1",
    addressDetail: "청담프라자 4층",
    convenienceTypes: ["SHOWER", "WIFI"],
    notice:
      "하남 미사 헬스장, 필라테스장, 요가원 대관 진행합니다. 많이들 오셔서 이용해주세요^^",
    rule: "1.사용하신 기구는 제자리에 놓아주세요. 2.센터 내에서 고객 영업은 불가능합니다. 3.비매너 무책임한 행동 금지 4.사전에 공지 없이 사용시 패널티 부과 (1회 요금의 10배 배상) 5. 토삭스,양말 또는 맨발 이용 6.시설,장비의 파손시 손해배상 청구",
    price: 30000,
    images: [
      "https://user-images.githubusercontent.com/64088250/212278869-00925805-a752-4ff1-a1e3-0719e0191ec9.png",
      "https://user-images.githubusercontent.com/64088250/212278828-9121d983-df26-4340-9e64-893f78cd6643.png",
    ],
    openTime: 9,
    closeTime: 22,
    spaceTypes: ["YOGA", "GX"],
  };
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
        homeGymInfo.address + homeGymInfo.addressDetail,
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
          {homeGymInfo.address} {homeGymInfo.addressDetail}
        </p>
      </div>
    </section>
  );
}
