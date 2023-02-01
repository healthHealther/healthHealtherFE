import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Portal from "../Portal";
interface confirmProps {
  active: boolean;
}
//prop로 넘어오는 active는 전체 칸이 채워졌을때가 아닌 하나라도 채워져 있을때 true를 나타내야함
export default function ConfirmPopUpPortal(props: confirmProps) {
  const { active } = props;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const tempBodyClass = useRef("");
  useEffect(() => {
    tempBodyClass.current = document.body.className;
  }, []);

  useEffect(() => {
    if (active) {
      history.pushState(null, "", "");
    } else {
      if (count !== 0) navigate(-1);
    }
    setCount(1);

    //active true였다 false 될때 뒤로가기 두번 눌러야함
    window.onpopstate = () => {
      if (active) {
        setVisible(false);
      } else {
        console.log("go back");
      }
    };
  }, [active]);

  return (
    <>
      {visible ? (
        <div></div>
      ) : (
        <Portal setState={setVisible} state={visible}>
          <div className="w-[280px] h-[164px] bg-white flex flex-col pt-8 pb-5 px-5 rounded-lg z-[9999]">
            <div className="mb-7">
              <p>작성중인 내용이 삭제됩니다.</p>
              <p>계속 하시겠습니까?</p>
            </div>
            <div className="flex justify-end">
              <button
                className="w-[54px] h-[36px] border border-[#8b8b8b] text-[#8b8b8b] mr-2 rounded-lg"
                onClick={() => {
                  history.pushState(null, "", "");
                  setVisible(true);
                }}
              >
                취소
              </button>
              <button
                className="w-[54px] h-[36px] bg-[#009d81] text-white rounded-lg"
                onClick={() => {
                  navigate(-1);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
