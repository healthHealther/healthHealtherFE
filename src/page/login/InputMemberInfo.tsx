import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { inputStyle } from "../../components/spaceRent/register/style";
import { getCookie } from "../../components/login/cookie";
import { useNavigate, Navigate } from "react-router-dom";

interface formData {
  oauthId: string;
  name: string;
  nickName: string;
  phone: string;
}

export default function InputMemberInfo() {
  const { handleSubmit, register } = useForm<formData>();
  const cookie = getCookie("token");
  const navigate = useNavigate();

  const regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
  const onSubmit = async (formData: formData) => {
    try {
      await axios
        .post(
          "https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/members/signUp",
          {
            oauthId: cookie,
            name: formData.name,
            nickName: formData.nickName,
            phone: formData.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
          }
        )
        .then(() => navigate("/login"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="relative max-w-[475px] min-w-[390px] sm:mx-auto  bg-white min-h-[100vh] pt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mx-5 flex flex-col gap-10">
        <div>
          <p>이름</p>
          <input
            type="text"
            {...(register("name"), { required: true })}
            className={inputStyle}
          />
        </div>
        <div>
          <p>닉네임</p>
          <input
            type="text"
            {...(register("nickName"), { required: true })}
            className={inputStyle}
          />
        </div>
        <div>
          <p>핸드폰</p>
          <input
            type="text"
            {...(register("phone"), { required: true })}
            className={inputStyle}
          />
        </div>
        <button
          type="submit"
          className="w-full h-12 bg-selected-green rounded-[8px] font-bold text-base text-white"
        >
          등록
        </button>
      </div>
    </form>
  );
}
