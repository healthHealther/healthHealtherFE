import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { memberInfoType } from "../MyPage";
import { baseUrl } from "../../../components/common/common";
import axios from "axios";
export default function ChangeMemberInfo() {
  const navigate = useNavigate();
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  const [memberInfo, setMemberInfo] = useState<memberInfoType>({
    name: "",
    nickName: "",
    phone: "",
  });

  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const getMemberInfo = async () => {
    try {
      await axios
        .get<memberInfoType>(`${baseUrl}/members`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setMemberInfo(res.data);
        })
        .then(() => {
          setName(memberInfo.name);
          setNickName(memberInfo.nickName);
          setPhone(memberInfo.phone);
        });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMemberInfo();
  }, []);
  const handleBtn = async () => {
    if (phone.replace(/[^0-9]/g, "").length === 11) {
      try {
        axios
          .put(
            `${baseUrl}/members`,
            {
              name: name,
              nickName: nickName,
              phone: phone
                .replace(/[^0-9]/g, "")
                .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`),
            },
            {
              headers: { Authorization: token },
            }
          )
          .then(() => {
            navigate("/myPage");
          });
      } catch (err) {
        console.error(err);
      }
    } else {
      window.alert("올바른 전화번호를 입력하세요");
    }
  };
  return (
    <div className="relative max-w-[475px] min-w-[390px] sm:mx-auto  bg-white min-h-[100vh] pt-10">
      <div className="mx-5 flex flex-col gap-5">
        <label className="relative" htmlFor="memberName">
          이름
          <div className="absolute w-1 h-1 bg-[#08bd9d] rounded-full top-0 left-8"></div>
        </label>
        <input
          id="memberName"
          placeholder={memberInfo.name}
          onChange={(e) => {
            if (e.target.value.replaceAll(/\s/gi, "").length > 0) {
              setName(e.target.value);
            } else {
              setName(memberInfo.name);
            }
          }}
          type="text"
          className="border border-[#d9d9d9] rounded-lg h-10 px-3"
        />
        <label className="relative" htmlFor="memberNickName">
          닉네임
          <div className="absolute w-1 h-1 bg-[#08bd9d] rounded-full top-0 left-12"></div>
        </label>
        <input
          id="memberNickName"
          placeholder={memberInfo.nickName}
          onChange={(e) => {
            if (e.target.value.replaceAll(/\s/gi, "").length > 0) {
              setNickName(e.target.value);
            } else {
              setNickName(memberInfo.nickName);
            }
          }}
          type="text"
          className="border border-[#d9d9d9] rounded-lg h-10 px-3"
        />
        <label className="relative" htmlFor="memberPhone">
          전화번호
          <div className="absolute w-1 h-1 bg-[#08bd9d] rounded-full top-0 left-16"></div>
        </label>
        <input
          id="memberPhone"
          placeholder={memberInfo.phone}
          onChange={(e) => {
            if (e.target.value.replaceAll(/\s/gi, "").length > 0) {
              setPhone(e.target.value);
            } else {
              setPhone(memberInfo.phone);
            }
          }}
          type="text"
          className="border border-[#d9d9d9] rounded-lg h-10 px-3"
        />

        <button
          type="button"
          onClick={handleBtn}
          className="w-full h-12 bg-selected-green rounded-[8px] font-bold text-base text-white hover:bg-[#009d81]"
        >
          등록
        </button>
      </div>
    </div>
  );
}
