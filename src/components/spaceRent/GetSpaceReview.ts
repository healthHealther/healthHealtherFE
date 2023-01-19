import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";

interface review {
  reviewId: number;
  content: string;
  star: number;
}

interface GetSpaceContentDetailProps {
  setReview: Dispatch<SetStateAction<review[]>>;
  spaceId?: number;
}

export default async function GetSpaceReview({
  setReview,
  spaceId,
}: GetSpaceContentDetailProps) {
  const { data } = await axios.get(`http://localhost:3001/review`);
  setReview(data);
  //   console.log(data.list);
}
