import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { review } from "../../interface/space";
import { baseUrl } from "../common/common";

interface GetSpaceContentDetailProps {
  setReview: Dispatch<SetStateAction<review[]>>;
  spaceId: string;
}

export default async function GetSpaceReview({
  setReview,
  spaceId,
}: GetSpaceContentDetailProps) {
  const token = `Bearer ${sessionStorage.getItem("accessToken")}`;

  try {
    const { data } = await axios.get(`${baseUrl}/review/${spaceId}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(data);
    setReview(data);
  } catch (err) {
    console.log(err);
  }
  //   console.log(data.list);
}
