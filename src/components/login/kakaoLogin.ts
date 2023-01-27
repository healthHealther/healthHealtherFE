import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  NavigateFunction,
} from "react-router-dom";
import { setCookie } from "../../components/login/cookie";

interface body {
  name: string;
  nickName: string;
  oauthId: string;
}

export default async function kakaoLogin(
  kakaoAuthCode: string,
  navigate: NavigateFunction
) {
  try {
    await axios
      .post(
        `http://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/members/login/callback/kakao?code=${kakaoAuthCode}`
      )
      .then((res) => {
        console.log(res);
        setCookie("accessToken", res.data.accessToken);
        setCookie("refreshToken", res.data.refreshToken);
        navigate("/");
      });
  } catch (err) {
    const { response } = err as unknown as AxiosError;
    if (response) {
      const { name, oauthId } = response.data as body;
      setCookie("token", oauthId);
      name === null && navigate("/login/signUp");
    }
  }
}
