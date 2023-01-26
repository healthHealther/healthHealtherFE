import axios from "axios";
import { Dispatch } from "react";
import { couponType } from "../../interface/space";

interface couponProps {
  spaceId: number;
  setCouponInfo: Dispatch<React.SetStateAction<couponType>>;
}

export default async function getCoupon({
  spaceId,
  setCouponInfo,
}: couponProps) {
  try {
    const { data } = await axios.get<couponType>(
      `http://localhost:3001/coupon/${spaceId}`
    );
    setCouponInfo(data);
  } catch (error) {
    console.log(error);
  }
}
