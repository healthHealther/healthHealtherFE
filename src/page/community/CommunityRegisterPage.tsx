import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import ConfirmPopUp from "../../components/ConfirmPopUp";

export default function CommunityRegisterPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [filled, setFilled] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const spaceReg = / /g;
  useEffect(() => {
    if (
      title?.replaceAll(spaceReg, "").length !== 0 &&
      description?.replaceAll(spaceReg, "").length !== 0
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
    if (
      title?.replaceAll(spaceReg, "").length !== 0 ||
      description?.replaceAll(spaceReg, "").length !== 0
    ) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [title, description]);

  const handlePostBtn = async () => {
    if (
      title?.replaceAll(spaceReg, "").length !== 0 &&
      description?.replaceAll(spaceReg, "").length !== 0
    ) {
      try {
        return await axios
          .post("http://localhost:3001/board", {
            id: 100,
            board_id: 100,
            nickname: "하영",
            title: title,
            content: description,
            // createdAt: new Date(),
          })
          .then(() => {
            navigate("/community");
          });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="relative max-w-[475px] min-w-[390px] sm:mx-auto  bg-white min-h-[100vh]">
      <ConfirmPopUp active={filled} />
      <TopBar />
      <div className="px-[20px] pt-[48px]">
        <p className="pt-[32px] font-bold text-[24px] mb-6">커뮤니티 등록</p>
        <form action="">
          <div className="mb-[24px]">
            <label
              htmlFor="newContentTitle"
              className="w-[30px] h-[22px] text-[#8b8b8b] font-bold text-[14px] relative flex mb-[8px]"
            >
              제목
              <div className="absolute w-1 h-1 bg-[#08bd9d] rounded-full top-0 right-0"></div>
            </label>
            <textarea
              className="resize-none border rounded-[8px] h-11 text-[16px] px-[12px] py-[10px] overflow-hidden w-full"
              rows={1}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="제목을 입력해주세요"
              required
              name="Title"
              id="newContentTitle"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="newContentDescription"
              className="w-[30px] h-[22px] text-[#8b8b8b] font-bold text-[14px] relative flex mb-[8px]"
            >
              내용
              <div className="absolute w-1 h-1 bg-[#08bd9d] rounded-full top-0 right-0"></div>
            </label>
            <textarea
              className="resize-none border rounded-[8px] h-[260px] text-[16px] px-[12px] py-[10px] overflow-hidden w-full"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
              placeholder="내용을 입력해주세요"
              name="Description"
              id="newContentDescription"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handlePostBtn}
            className={`fixed bottom-5 w-[435px] h-[48px] rounded-[8px] text-white ${
              active
                ? "bg-[#08bd9d] hover:bg-[#009d81]"
                : "bg-[#c4c4c4] hover:bg-[#a5a5a5]"
            }`}
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}
