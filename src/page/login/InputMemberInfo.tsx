import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { inputStyle } from "../../components/spaceRent/register/style";
import { useNavigate } from "react-router-dom";
import { errorSelector } from "recoil";

interface formData {
  oauthId: string;
  name: string;
  nickName: string;
  phone: string;
}

export default function InputMemberInfo() {
  const { handleSubmit, register, setValue, formState } = useForm<formData>();
  const { errors } = formState;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const onSubmit = async (data: formData) => {
    const phoneNum = data.phone
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    try {
      await axios
        .post(
          "https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/members/signUp",
          {
            oauthId: token,
            name: data.name,
            nickName: data.nickName,
            phone: phoneNum,
          }
        )
        .then((res) => {
          console.log(res);
          sessionStorage.setItem("accessToken", res.data.accessToken);
          sessionStorage.setItem("expiredTime", res.data.expiredTime);
          sessionStorage.setItem("refreshToken", res.data.refreshToken);
          sessionStorage.removeItem("token");
          navigate("/");
        });
    } catch (err) {
      console.log(errors);
      console.log(data.name);
      console.log(err);
    }
  };

  return (
    <div className="relative max-w-[475px] min-w-[390px] sm:mx-auto  bg-white min-h-[100vh] pt-10">
      <form
        className="mx-5 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="relative" htmlFor="memberName">
          이름
          <div className="absolute w-1 h-1 bg-[#08bd9d] rounded-full top-0 left-8"></div>
        </label>
        <input
          id="memberName"
          placeholder="이름"
          type="text"
          {...register("name", { minLength: 2, required: true })}
          className="border border-[#d9d9d9] rounded-lg h-10 px-3"
        />
        <label className="relative" htmlFor="memberNickName">
          닉네임
          <div className="absolute w-1 h-1 bg-[#08bd9d] rounded-full top-0 left-12"></div>
        </label>
        <input
          id="memberNickName"
          placeholder="닉네임"
          type="text"
          {...register("nickName", { minLength: 2, required: true })}
          className="border border-[#d9d9d9] rounded-lg h-10 px-3"
        />
        <label className="relative" htmlFor="memberPhone">
          전화번호
          <div className="absolute w-1 h-1 bg-[#08bd9d] rounded-full top-0 left-16"></div>
        </label>
        <input
          id="memberPhone"
          placeholder="000-0000-0000"
          type="text"
          {...register("phone", {
            maxLength: 13,
            minLength: 11,
            required: true,
          })}
          className="border border-[#d9d9d9] rounded-lg h-10 px-3"
        />

        <button
          type="submit"
          className="w-full h-12 bg-selected-green rounded-[8px] font-bold text-base text-white"
        >
          등록
        </button>
      </form>
    </div>
  );
}
