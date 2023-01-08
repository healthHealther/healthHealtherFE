import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";

export default function HomePage() {
  return (
    <div>
      <TopBar pageTitle="home" />
      <div>
        HomePage
        <div className="mt-4">
          <Link className="mx-4" to="spaceRent">
            운동공간대여
          </Link>
          <Link className="mx-4" to="community">
            커뮤니티
          </Link>
          <Link className="mx-4" to="myPage">
            마이페이지
          </Link>
          <Link className="mx-4" to="login">
            로그인
          </Link>
        </div>
        <NavBar pageTitle={"home"} />
      </div>
    </div>
  );
}
