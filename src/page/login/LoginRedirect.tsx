import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { inputStyle } from "../../components/spaceRent/register/style";
import kakaoLogin from "../../components/login/kakaoLogin";

interface formData {
  name: string;
  nickName: string;
  phone: string;
}

export default function LoginRedirect() {
  const [param] = useSearchParams();
  const kakaoAuthCode = param.get("code");
  const navigate = useNavigate();

  console.log(param.get("code"));
  const [name, setName] = useState<string>("");
  // const kakaoLogin = async () => {
  //   try {
  //     await axios
  //       .post(
  //         `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/members/login/callback/kakao?code=${kakaoAuthCode}`
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //         setName(res.data.name);
  //         setCookie("token", res.data.oauthId);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    kakaoLogin(kakaoAuthCode as string, navigate);
  }, []);
  return <div></div>;
}
