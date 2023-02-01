import axios from "axios";
import { Dispatch } from "react";
import { couponType } from "../../interface/space";
import { baseUrl } from "../common/common";

interface couponProps {
  spaceId: number;
  setCouponInfo: React.Dispatch<React.SetStateAction<couponType[]>>;
}

export default async function getCoupon({
  spaceId,
  setCouponInfo,
}: couponProps) {
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;
  try {
    await axios
      .get<couponType[]>(`${baseUrl}/coupon/${spaceId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setCouponInfo(res.data);
        console.log(res.data);
      });
  } catch (error) {
    console.log(error);
  }
}
