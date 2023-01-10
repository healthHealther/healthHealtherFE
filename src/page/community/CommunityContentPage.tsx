import React from "react";
import { useParams } from "react-router-dom";
export default function CommunityContentPage() {
  const params = useParams();
  console.log(params.boardContentId);
  return <div>community {params.boardContentId}</div>;
}
