import React from "react";
import { Link, useLocation } from "react-router-dom";
import createContentButton from "../assets/createButton.png";
import createRentButton from "../assets/createButton_1.png";
export default function CreateNewContentBtn() {
  const location = useLocation();
  const index = location.pathname.indexOf("/", 1);
  console.log(location.pathname);
  const currentPath =
    index !== -1
      ? location.pathname.slice(1, index)
      : location.pathname.slice(1);
  console.log(currentPath);
  return (
    <div
      className={`${
        location.pathname === "/community"
          ? "visible"
          : location.pathname === "/spaceRent"
          ? "visible"
          : "hidden"
      } fixed bottom-[40px] right-0 sm:right-[calc(50%-475px/2+9px)]`}
    >
      <Link
        to={
          currentPath === "community"
            ? "/community/register"
            : currentPath === "spaceRent"
            ? "/spaceRegister"
            : "/"
        }
      >
        <img
          src={
            currentPath === "community"
              ? createContentButton
              : currentPath === "spaceRent"
              ? createRentButton
              : undefined
          }
          alt=""
        />
      </Link>
    </div>
  );
}
