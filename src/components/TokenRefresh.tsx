import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function TokenRefresh() {
  const navigate = useNavigate();
  const refresh = async () => {
    if (sessionStorage.getItem("accessToken")) {
      const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
      const refreshToken = sessionStorage.getItem("refreshToken");
      axios.defaults.headers.common["Authorization"] = token;
      const expiredStorage = sessionStorage.getItem("expiredTime");
      const expiredTime = new Date(expiredStorage as string);
      const currentTime = new Date();
      const diffTime = expiredTime.getTime() - currentTime.getTime();
      if (diffTime < 15000) {
        axios.defaults.headers.common["X-Refresh-Token"] = refreshToken;
        await axios
          .post(
            "https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/members/reissue",
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then(
            (res) => {
              sessionStorage.setItem("accessToken", res.data.accessToken);
              sessionStorage.setItem("expiredTime", res.data.expiredTime);
            },
            (err) => {
              console.error(err);
              navigate("/login");
            }
          );
      }
      return new Promise(function (resolve, reject) {
        resolve(true);
      });
    }
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/login");
    }
  };
  const { pathname } = useLocation();

  useEffect(() => {
    refresh();
  }, [pathname]);

  return <></>;
}
// const refresh = async () => {
//   const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
//   const refreshToken = sessionStorage.getItem("refreshToken");
//   axios.defaults.headers.common["Authorization"] = token;
//   const expiredTime = await new Date("2023-01-29 21:24:00");
//   const currentTime = await new Date("2023-01-29 21:23:55");
//   const diffTime = await (expiredTime.getTime() - currentTime.getTime());
//   console.log(diffTime);
//   if (diffTime < 10000) {
//     axios.defaults.headers.common["X-Refresh-Token"] =
//       sessionStorage.getItem("refreshToken");
//     console.log(token);
//     console.log(refreshToken);
//     await axios
//       .post(
//         "https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app/members/reissue",
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       )
//       .then(
//         (res) => {
//           sessionStorage.setItem("accessToken", res.data.accessToken);
//           sessionStorage.setItem("expiredTime", res.data.expiredTime);
//         },
//         (err) => {
//           console.error(err);
//         }
//       );
//   }
//   return new Promise(function (resolve, reject) {
//     resolve(true);
//   });
// };
