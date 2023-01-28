import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { inputStyle } from "../../components/spaceRent/register/style";
import kakaoLogin from "../../components/login/kakaoLogin";
import { getCookie, setCookie } from "../../components/login/cookie";
import { useCookies } from "react-cookie";

interface formData {
  name: string;
  nickName: string;
  phone: string;
}

export default function LoginRedirect() {
  const [param] = useSearchParams();
  const kakaoAuthCode = param.get("code");
  const navigate = useNavigate();
  const cookie = getCookie("token");

  console.log(param.get("code"));
  const [name, setName] = useState<string>("");
  const [cookies, setCookie] = useCookies(["accessToken", "oauthId"]);
  // const kakaoLogin = async () => {
  //   try {
  //     await axios
  //       .post(
  //         `http://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/members/login/callback/kakao?code=${kakaoAuthCode}`
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         sessionStorage.setItem("accessToken", res.data.accessToken);
  //         sessionStorage.setItem("refreshToken", res.data.refreshToken);
  //         setCookie("accessToken", res.data.accessToken);
  //         // setCookie("refreshToken", res.data.refreshToken);
  //         navigate("/");
  //       });
  //   } catch (err) {
  //     const { response } = err as unknown as AxiosError;
  //     if (response) {
  //       const { name, oauthId } = response.data as any;
  //       setCookie("oauthId", oauthId);
  //       name === null && navigate("/login/signUp");
  //     }
  //   }
  // };

  useEffect(() => {
    kakaoLogin(kakaoAuthCode as string, navigate);
  }, []);
  return <div></div>;
}
