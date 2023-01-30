import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export interface body {
  name: string;
  nickName: string;
  oauthId: string;
}

export default async function kakaoLogin(
  kakaoAuthCode: string,
  navigate: NavigateFunction
) {
  const sessionStorage = window.sessionStorage;

  try {
    await axios
      .post(
        `http://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/members/login/callback/kakao?code=${kakaoAuthCode}`
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
      name === null && navigate("/login/signUp");
    }
  }
}
