import React from "react";
import { Link, useLocation } from "react-router-dom";
import createContentButton from "../assets/createButton.png";
import createRentButton from "../assets/createButton_1.png";
export default function CreateNewContentBtn() {
  const location = useLocation();
  const index = location.pathname.indexOf("/", 1);
  const currentPath =
    index !== -1
      ? location.pathname.slice(1, index)
      : location.pathname.slice(1);
  return (
    <div
      className={`${
        currentPath === "community"
          ? "visible"
          : currentPath === "spaceRent"
          ? "visible"
          : "hidden"
      } fixed bottom-11 right-0 sm:right-[calc(50%-475px/2+9px)]`}
    >
      <Link
        to={
          currentPath === "community"
            ? "/contentRegisterPage"
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
