import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
// import axios, { AxiosError } from "axios";
// import { useForm } from "react-hook-form";
// import { inputStyle } from "../../components/spaceRent/register/style";
import kakaoLogin from "../../components/login/kakaoLogin";
// import { getCookie, setCookie } from "../../components/login/cookie";
// import { useCookies } from "react-cookie";

interface formData {
  name: string;
  nickName: string;
  phone: string;
}

export default function LoginRedirect() {
  const location = useLocation();
  const [param] = useSearchParams();
  const authCode = param.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    kakaoLogin(authCode as string, navigate);
  }, []);
  return <div></div>;
}
