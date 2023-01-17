import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
export default function LoginRedirect() {
  const [param] = useSearchParams();
  const kakaoAuthCode = param.get("code");
  console.log(param.get("code"));
  const kakaoLogin = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://상세주소가 들어가야할 자리/login/callback/kakao?code=${kakaoAuthCode}`
      );
      const ACCESS_TOKEN = res.data.accessToken;
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <div>redirect</div>;
}
