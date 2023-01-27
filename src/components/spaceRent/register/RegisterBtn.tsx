import React from "react";

interface RegisterBtnProps {
  finish: boolean;
}

export default function RegisterBtn({ finish }: RegisterBtnProps) {
  return (
    <button
      type="submit"
      className={`max-w-[100% - 40px] mx-5 h-12 rounded-lg  mb-5 ${
        finish === false ? "bg-non-selected-gray" : "bg-selected-green"
      }`}
      disabled={!finish}
    >
      등록
    </button>
  );
}
