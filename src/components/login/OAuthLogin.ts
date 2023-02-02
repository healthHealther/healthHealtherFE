import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export interface body {
  name: string;
  nickName: string;
  oauthId: string;
}

export default async function kakaoLogin(
  authCode: string,
  navigate: NavigateFunction,
  loginType: string
) {
  const sessionStorage = window.sessionStorage;

  try {
    await axios
      .post(
        `https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/members/login/callback/${loginType}?code=${authCode}`
      )
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("accessToken", res.data.accessToken);
        sessionStorage.setItem("expiredTime", res.data.expiredTime);
        sessionStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/");
      });
  } catch (err) {
    const { response } = err as unknown as AxiosError;
    if (response) {
      const { name, oauthId } = response.data as body;
      sessionStorage.setItem("token", oauthId);
      navigate("/login/signUp");
    }
  }
}
