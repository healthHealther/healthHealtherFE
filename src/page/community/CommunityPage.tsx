import React from "react";
import CommunityContents from "../../components/community/CommunityContents";
import CommunitySearchBar from "./CommunitySearchBar";
export default function CommunityPage() {
  return (
    <div className="relative">
      <CommunitySearchBar />
      <CommunityContents />
    </div>
  );
}
